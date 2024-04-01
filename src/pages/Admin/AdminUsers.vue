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
      <q-btn flat icon="delete" color="red" @click="deleteuser(props.row)" />
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
    const currentusers = ref(2);
    const Listusers = ref([]);
    const ListSections = ref([]);
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
        name: "actions",
        label: "Действия",
        field: "actions",
        sortable: false,
      },
    ]);

    const $q = useQuasar();
    const newusers = ref({
      name_test: "",
      description_test: "",
      id_test: currentTest.value,
      id_section: null,
      article: "",
    });
    const search = ref("");

    onMounted(() => {
      getDataSections();
      setTimeout(() => {}, 500);
      getDataList();
    });

    function deleteuser(users) {
      $q.dialog({
        title: "Подтвердить удаление",
        message: `Вы уверены, что хотите удалить запись "${users.name}"?`,
        cancel: true,
        persistent: true,
      }).onOk(() => {
        let user = toRaw(test);
        api
          .delete("/records/users/" + test_.id_test)
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
      //router.push({ path: "/Admin/ListResults/" + id });
    }

    function getDataList() {
      api
        .get("/records/tests")
        .then((response) => {
          if (response.data) {
            let List = toRaw(response.data.records);
            ListTest.value = List.map((x) => {
              let name_s =
                ListSections.value.filter(
                  (s) => s.id_section == x.id_section
                )[0].name_section || "";
              let t = {
                name_section: name_s,
                article: x.article,
                description_test: x.description_test,
                id_section: x.id_section,
                id_test: x.id_test,
                name_test: x.name_test,
              };
              return t;
            });
          }
        })
        .catch(() => {
          console.log("error list tests");
        });
    }

    function getDataSections() {
      api
        .get("/records/sections")
        .then((response) => {
          if (response.data) {
            ListSections.value = JSON.parse(
              JSON.stringify(toRaw(response.data.records))
            );
          }
        })
        .catch(() => {
          console.log("error list sections");
        });
    }

    return {
      ListTest,
      columns,
      search,
      newusers,
      deleteuser,
      gotoResults,
    };
  },
};
</script>
