<template>
  <q-input filled v-model="search" placeholder="Поиск..." style="width: 100%">
    <template v-slot:prepend>
      <q-icon name="search" />
    </template>
  </q-input>

  <q-table
    title="Список Сервисов"
    :rows="ListLogins"
    :columns="columns"
    row-key="id"
    flat
    bordered
    virtual-scroll
  >
    <!-- Слот для кастомного отображения ячеек пароля -->
    <!-- <template v-slot:body-cell-password="props">
      <q-td :props="props">
        {{ props.row.password.replace(/./g, "*") }}
      </q-td>
    </template> -->
    <!-- Слот для кастомизации действий -->
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn flat icon="edit" color="green" @click="editService(props.row)" />
        <q-btn
          flat
          icon="delete"
          color="red"
          @click="deleteService(props.row)"
        />
      </q-td>
    </template>
  </q-table>
  <div class="flex flex-center q-mt-md">
    <q-form
      @submit="addService()"
      @reset="resetForm"
      class="q-gutter-md"
      style="width: 400px"
    >
      <q-input
        filled
        v-model="newService.service_name"
        label="Название сервиса"
        required
      />
      <q-input filled v-model="newService.login" label="Логин" />
      <q-input
        filled
        v-model="newService.password"
        label="Пароль"
        type="password"
      />
      <q-input
        filled
        v-model="newService.comment"
        label="Комментарий"
        type="textarea"
      />
      <div>
        <q-btn
          :label="isEdit ? 'Изменить' : 'Добавить'"
          @click="addService()"
          color="primary"
        />
        <q-btn label="Сбросить" type="reset" color="secondary" />
      </div>
    </q-form>
  </div>
</template>

<script>
import {
  ref,
  onMounted,
  toRefs,
  defineProps,
  watchEffect,
  computed,
  toRaw,
} from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { api } from "boot/axios";

export default {
  name: "ListLogins",
  setup() {
    const router = useRouter();
    const currentUser = ref(2);
    const ListLogins = ref([]);
    const isEdit = ref(false);
    const columns = ref([
      {
        name: "service_name",
        required: true,
        label: "Сервис",
        align: "left",
        field: "service_name",
        sortable: true,
      },
      {
        name: "login",
        align: "left",
        label: "Логин",
        field: "login",
        sortable: true,
      },
      { name: "password", label: "Пароль", field: "password" },
      {
        name: "comment",
        label: "Комментарий",
        field: "comment",
        sortable: true,
      },
      {
        name: "actions",
        label: "Действия",
        field: "actions",
        sortable: false,
      },
    ]);
    const $q = useQuasar();
    const newService = ref({
      service_name: "",
      login: "",
      password: "",
      comment: "",
      id_user: currentUser.value,
    });
    const search = ref("");

    onMounted(() => {
      getDataList();
    });

    function editService(data) {
      console.log("editService", data);
      isEdit.value = true;
      newService.value = JSON.parse(JSON.stringify(toRaw(data)));
    }

    function deleteService(service) {
      $q.dialog({
        title: "Подтвердить удаление",
        message: `Вы уверены, что хотите удалить запись "${service.service_name}"?`,
        cancel: true,
        persistent: true,
      }).onOk(() => {
        let serv = toRaw(service);

        api
          .delete("/records/logins/" + serv.id_login)
          .then((response) => {
            if (response.data) {
              getDataList();
            }
          })
          .catch(() => {
            console.log("error");
          });
      });
    }
    function addService() {
      if (isEdit.value) {
        api
          .put("/records/logins/" + newService.value.id_login, newService.value)
          .then((response) => {
            if (response.data) {
              getDataList();
              newService.value = {
                service_name: "",
                login: "",
                password: "",
                comment: "",
                id_user: currentUser.value,
              };
              isEdit.value = false;
            }
          })
          .catch(() => {
            console.log("error");
          });
      } else {
        api
          .post("/records/logins", newService.value)
          .then((response) => {
            if (response.data) {
              getDataList();
              newService.value = {
                service_name: "",
                login: "",
                password: "",
                comment: "",
                id_user: currentUser.value,
              };
            }
          })
          .catch(() => {
            console.log("error");
          });
      }
    }

    function getDataList() {
      api
        .get("/records/logins?filter=id_user,eq," + currentUser.value)
        .then((response) => {
          if (response.data) {
            ListLogins.value = response.data.records;
            console.log("getDataList", response.data.records);
          }
        })
        .catch(() => {
          console.log("error");
          // $q.notify({
          //     color: 'negative',
          //     position: 'top',
          //     message: 'Ошибка загрузки списка установок',
          //     icon: 'report_problem'
          // })
        });
    }

    return {
      ListLogins,
      columns,
      search,
      newService,
      deleteService,
      addService,
      isEdit,
      editService,
    };
  },
};
</script>
