<template>
  <q-table
    title="Пользователи"
    :rows="Listusers"
    :columns="columns"
    row-key="id"
    flat
    bordered
    virtual-scroll
  >
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn
          flat
          icon="list"
          title="Результаты"
          color="green"
          @click="gotoResults(props.row.id_user)"
        />
        <q-btn
          flat
          icon="delete"
          title="Удалить"
          color="red"
          @click="deleteuser(props.row)"
        />
      </q-td>
    </template>
  </q-table>
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
  name: "AdminArticle",
  setup() {
    const router = useRouter();
    const currentuser = ref(2);
    const Listusers = ref([]);
    const ListSections = ref([]);
    const isEdit = ref(false);
    const columns = ref([
      {
        name: "name",
        required: true,
        label: "Имя",
        align: "left",
        field: "name",
        sortable: true,
      },
      {
        name: "family",
        required: true,
        label: "Фамилия",
        align: "left",
        field: "family",
        sortable: true,
      },
      {
        name: "role",
        required: true,
        label: "Права",
        align: "left",
        field: "role",
        sortable: true,
      },
      {
        name: "login",
        required: true,
        label: "Никнейм",
        align: "left",
        field: "login",
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

    onMounted(() => {
      setTimeout(() => {}, 500);
      getDataList();
    });

    function deleteuser(user) {
      $q.dialog({
        title: "Подтвердить удаление",
        message: `Вы уверены, что хотите удалить запись "${user.name}"?`,
        cancel: true,
        persistent: true,
      }).onOk(() => {
        api
          .delete("/records/users/" + user.id_user)
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

    function gotoResults(id) {
      router.push({ path: "/Admin/ListResults/" + id });
    }

    function getDataList() {
      api
        .get("/records/users")
        .then((response) => {
          if (response.data) {
            Listusers.value = toRaw(response.data.records);
          }
        })
        .catch(() => {
          console.log("error list tests");
        });
    }

    return {
      Listusers,
      columns,
      deleteuser,
      gotoResults,
    };
  },
};
</script>
