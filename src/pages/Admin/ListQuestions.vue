<template>
  <q-table
    title="Список вопросов"
    :rows="ListQuestions"
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
          icon="edit"
          color="green"
          @click="editQuestions(props.row)"
        />
        <q-btn
          flat
          icon="delete"
          color="red"
          @click="deleteQuestions(props.row)"
        />
      </q-td>
    </template>
  </q-table>
  <div class="flex flex-center q-mt-md">
    <q-form
      @submit="addQuestions()"
      @reset="resetForm"
      class="q-gutter-md"
      style="width: 400px"
    >
      <q-input
        filled
        v-model="ListQuestions.question_text"
        label="Текст вопроса"
        required
      />

      <div>
        <q-btn
          :label="isEdit ? 'Изменить' : 'Добавить'"
          @click="addQuestions()"
          color="primary"
          class="q-mr-md"
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
import useClipboard from "vue-clipboard3";

export default {
  name: "ListQuestions",
  props: ["id_test"],
  setup(props) {
    const router = useRouter();
    const ListQuestions = ref([]);
    const isEdit = ref(false);
    const columns = ref([
      {
        name: "question_text",
        required: true,
        label: "Вопрос",
        align: "left",
        field: "question_text",
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
    const search = ref("");

    const newQuestions = ref({
      question_text: "",
      id_test: props.id_test,
    });

    onMounted(() => {
      getDataList();
    });

    function editQuestions(data) {
      console.log("editQuestions", data);
      isEdit.value = true;
      newQuestions.value = JSON.parse(JSON.stringify(toRaw(data)));
    }

    function deleteQuestions(Question) {
      $q.dialog({
        title: "Подтвердить удаление",
        message: `Вы уверены, что хотите удалить запись "${Question.question_text}"?`,
        cancel: true,
        persistent: true,
      }).onOk(() => {
        let Quest = toRaw(Question);

        api
          .delete("/records/Questions/" + Quest.id_question)
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
    function addQuestions() {
      if (isEdit.value) {
        api
          .put("/records/questions/", newQuestions.value)
          .then((response) => {
            if (response.data) {
              getDataList();
              newQuestions.value = {
                question_text: "",
              };
              isEdit.value = false;
            }
          })
          .catch(() => {
            console.log("error");
          });
      } else {
        api
          .post("/records/questions", newQuestions.value)
          .then((response) => {
            if (response.data) {
              getDataList();
              newQuestions.value = {
                question_text: "",
                id_user: props.id_user,
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
        .get("/records/questions?filter=id_test,eq," + props.id_test)
        .then((response) => {
          if (response.data) {
            ListQuestions.value = response.data.records;
          }
        })
        .catch(() => {
          console.log("error");
          $q.notify({
            color: "negative",
            position: "top",
            message: "Ошибка загрузки списка",
            icon: "report_problem",
          });
        });
    }

    return {
      ListQuestions,
      columns,
      newQuestions,
      deleteQuestions,
      addQuestions,
      isEdit,
      editQuestions,
    };
  },
};
</script>
