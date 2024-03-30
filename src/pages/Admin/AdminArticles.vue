<template>
  <q-table
    title="Статьи"
    :rows="ListTest"
    :columns="columns"
    row-key="id"
    flat
    bordered
    virtual-scroll
  >
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn flat icon="edit" color="green" @click="editTest(props.row)" />
        <q-btn
          flat
          icon="help_outline"
          color="blue"
          @click="gotoQuestions(props.row.id_test)"
        />
        <q-btn flat icon="delete" color="red" @click="deleteTest(props.row)" />
      </q-td>
    </template>
  </q-table>
  <div class="flex flex-center q-mt-md">
    <q-form
      @submit="addTest()"
      @reset="resetForm"
      class="q-gutter-md"
      style="width: 400px"
    >
      <q-input
        filled
        v-model="newTest.name_test"
        label="Название Статьи"
        required
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length > 0) || 'Пожалуйста, введите название статьи',
        ]"
      />

      <q-input filled v-model="newTest.description_test" label="Описание" />
      <q-input
        filled
        v-model="newTest.article"
        label="Содержание статьи"
        type="textarea"
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length > 0) || 'Пожалуйста, введите содержание статьи',
        ]"
      />
      <div>
        <q-btn
          :label="isEdit ? 'Изменить' : 'Добавить'"
          @click="addTest()"
          color="primary"
          class="q-mr-md"
        />
        <q-btn
          label="Очистить"
          @click="resetForm"
          type="reset"
          color="secondary"
        />
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
  name: "AdminArticle",
  setup() {
    const router = useRouter();
    const currentTest = ref(2);
    const ListTest = ref([]);
    const isEdit = ref(false);
    const columns = ref([
      {
        name: "name_test",
        required: true,
        label: "Название статьи",
        align: "left",
        field: "name_test",
        sortable: true,
      },
      {
        name: "description_test",
        align: "left",
        label: "Описание статьи",
        field: "description_test",
        sortable: true,
      },
      {
        name: "actions",
        label: "Действия",
        field: "actions",
        sortable: false,
      },
    ]);
    // const columns = ref([
    //   {
    //     name: "service_name",
    //     required: true,
    //     label: "Сервис",
    //     align: "left",
    //     field: "service_name",
    //     sortable: true,
    //   },
    //   {
    //     name: "login",
    //     align: "left",
    //     label: "Логин",
    //     field: "login",
    //     sortable: true,
    //   },
    //   { name: "password", label: "Пароль", field: "password" },
    //   {
    //     name: "comment",
    //     label: "Комментарий",
    //     field: "comment",
    //     sortable: true,
    //   },
    //   {
    //     name: "actions",
    //     label: "Действия",
    //     field: "actions",
    //     sortable: false,
    //   },
    // ]);
    const $q = useQuasar();
    const newTest = ref({
      name_test: "",
      description_test: "",
      id_test: currentTest.value,
      article: "",
    });
    const search = ref("");

    onMounted(() => {
      getDataList();
    });

    function editTest(data) {
      console.log("editTest", data);
      isEdit.value = true;
      newTest.value = JSON.parse(JSON.stringify(toRaw(data)));
    }

    function resetForm() {
      newTest.value = {
        name_test: "",
        description_test: "",
        id_test: currentTest.value,
        article: "",
      };
      isEdit.value = false;
    }

    function deleteTest(test) {
      $q.dialog({
        title: "Подтвердить удаление",
        message: `Вы уверены, что хотите удалить запись "${test.name_test}"?`,
        cancel: true,
        persistent: true,
      }).onOk(() => {
        let test_ = toRaw(test);
        api
          .delete("/records/tests/" + test_.id_test)
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

    function gotoQuestions(id) {
      router.push({ path: "/Admin/ListQuestions/" + id });
    }

    function addTest() {
      if (isEdit.value) {
        api
          .put("/records/tests/" + newTest.value.id_test, newTest.value)
          .then((response) => {
            if (response.data) {
              getDataList();
              newTest.value = {
                name_test: "",
                description_test: "",
                id_test: currentTest.value,
              };
              isEdit.value = false;
            }
          })
          .catch(() => {
            console.log("error");
          });
      } else {
        if (newTest.value.name_test != "" && newTest.value.article != "") {
          console.log("test", newTest.value);
          api
            .post("/records/tests", {
              name_test: newTest.value.name_test,
              article: newTest.value.article,
              description_test: newTest.value.description_test,
              id_section: 0,
            })
            .then((response) => {
              if (response.data) {
                getDataList();
                newTest.value = {
                  name_test: "",
                  description_test: "",
                  id_test: currentTest.value,
                  article: "",
                };
              }
            })
            .catch(() => {
              console.log("error");
            });
        }
      }
    }
    function getDataList() {
      api
        .get("/records/tests")
        .then((response) => {
          if (response.data) {
            ListTest.value = response.data.records;
          }
        })
        .catch(() => {
          console.log("error");
        });
    }

    return {
      ListTest,
      columns,
      search,
      newTest,
      deleteTest,
      addTest,
      isEdit,
      editTest,
      gotoQuestions,
      resetForm,
    };
  },
};
</script>
