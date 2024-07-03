<!-- //TODO сделать компонент, забирать список результатов //взять список результатов
//id_user - взять список пользователей //id_test - взять список тестов, и отду
название теста, количество всего вопросов // взять список вопросов для теста
id_test -->
<template>
  <q-table
    title="Результаты"
    :rows="ListResults"
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
          icon="delete"
          color="red"
          @click="deleteResult(props.row)"
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
  name: "ListResults",
  props: ["id_user"],
  setup(props) {
    const router = useRouter();
    const ListResults = ref([]);
    const ListTests = ref([]);
    const ListQuestions = ref([]);
    const ListUser = ref([]);
    
    const columns = ref([
      {
        name: "name_test",
        required: true,
        label: "Название теста",
        align: "left",
        field: "name_test",
        sortable: true,
      },
      {
        name: "result",
        required: true,
        label: "Результат",
        align: "left",
        field: "result",
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
        name: "date_test",
        label: "дата",
        field: "date_test",
        sortable: false,
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
      getDataTests();
      getUser();
      setTimeout(() => {}, 500);
      getDataQuestions();
      setTimeout(() => {}, 500);
      getDataList();
    });

    function deleteResult(user) {
      $q.dialog({
        title: "Подтвердить удаление",
        message: `Вы уверены, что хотите удалить запись "${user.name}"?`,
        cancel: true,
        persistent: true,
      }).onOk(() => {
        api
          .delete("/records/results/" + user.id_result)
          .then((response) => {
            if (response.data) {
              getDataList();
            }
          })
          .catch(() => {
            console.log("error delete result");
          });
      });
    }

    function getDataList() {
      //let str = role_user.value == 'admin' ? '/records/results' : '/records/results' + props.id_user;
      api
        .get("/records/results?filter=id_user,eq," + props.id_user)
        .then((response) => {
          if (response.data) {
            let res = toRaw(response.data.records);
            console.log(res);
            ListResults.value = res.map((x) => {
              // let name_test = ListTests.value.filter(
              //   (t) => t.id_test == x.id_test
              // )[0].name_test;
              console.log(
                ListTests.value,
                ListTests.value.filter((t) => t.id_test == x.id_test)[0]
              );
              // let n = ListQuestions.value.filter(
              //   (t) => t.id_test == x.id_test
              // ).length;
              return {
                name_test: ListTests.value.filter(
                  (t) => t.id_test == x.id_test
                )[0].name_test,
                login: ListUser.value.filter((u) => u.id_user == x.id_user)[0]
                  .login,
                // n_q: n,
                ...x,
              };
            });
          }
        })
        .catch(() => {
          console.log("error list results");
        });
    }
    function getUser() {
      api
        .get("/records/users")
        .then((response) => {
          if (response.data) {
            ListUser.value = response.data.records;
          }
        })
        .catch(() => {
          console.log("error");
        });
    }

    function getDataQuestions() {
      api
        .get("/records/questions")
        .then((response) => {
          if (response.data) {
            ListQuestions.value = toRaw(response.data.records);
          }
        })
        .catch(() => {
          console.log("error list tests");
        });
    }
    function getDataTests() {
      api
        .get("/records/tests")
        .then((response) => {
          if (response.data) {
            ListTests.value = toRaw(response.data.records);
          }
        })
        .catch(() => {
          console.log("error list tests");
        });
    }

    return {
      getDataList,
      getUser,
      getDataTests,
      ListResults,
      ListQuestions,
      ListTests,
      columns,
      deleteResult,
    };
  },
};
</script>
