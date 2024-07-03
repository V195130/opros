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
          icon="list"
          color="green"
          @click="ShowAnswers(props.row.id_question)"
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
      @submit="addQuestion()"
      @reset="resetForm"
      class="q-gutter-md"
      style="width: 400px"
    >
      <q-input
        filled
        v-model="newQuestion.question_text"
        label="Текст вопроса"
        required
      />

      <div>
        <q-btn
          :label="isEdit ? 'Изменить' : 'Добавить'"
          @click="addQuestion()"
          color="primary"
          class="q-mr-md"
        />
        <q-btn label="Сбросить" type="reset" color="secondary" />
      </div>
    </q-form>
  </div>
  <div v-if="showedAnswers" class="flex flex-center q-mt-md">
    <div class="q-gutter-sm">
      <div
        v-for="(option, index) in ListAnswers"
        :key="index"
        class="row items-center q-gutter-sm"
      >
        <q-radio v-model="option.is_correct" :val="index" />
        <q-input
          v-model="option.text_answer"
          label="Вариант ответа"
          filled
          style="width: 500px"
        />
        <q-btn
          icon="delete"
          round
          dense
          flat
          color="negative"
          @click="deleteOption(index)"
        />
      </div>
    </div>
  </div>
  <div class="flex flex-center q-mt-md q-mb-md" v-if="showedAnswers">
    <q-btn
      label="Добавить вариант"
      icon="add"
      @click="addOption"
      color="primary"
    />
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
    const ListAnswers = ref([]);
    const isEdit = ref(false);
    const showedAnswers = ref(false);
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

    const newQuestion = ref({
      question_text: "",
      id_test: props.id_test,
    });

    onMounted(() => {
      getDataList();
    });

    function editQuestions(data) {
      isEdit.value = true;
      newQuestion.value = JSON.parse(JSON.stringify(toRaw(data)));
    }

    function ShowAnswers(id) {
      showedAnswers.value = true;
      getDataListAnswers(id);
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
          .delete("/records/questions/" + Quest.id_question)
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
    function addQuestion() {
      if (isEdit.value) {
        api
          .put(
            "/records/questions/" + newQuestion.value.id_question,
            newQuestion.value
          )
          .then((response) => {
            if (response.data) {
              getDataList();
              newQuestion.value = {
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
          .post("/records/questions", newQuestion.value)
          .then((response) => {
            if (response.data) {
              getDataList();
              newQuestion.value = {
                question_text: "",
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
    function getDataListAnswers(id_question) {
      api
        .get("/records/answers?filter=id_question,eq," + id_question)
        .then((response) => {
          if (response.data) {
            ListAnswers.value = response.data.records;
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
      newQuestion,
      deleteQuestions,
      addQuestion,
      isEdit,
      editQuestions,
      getDataListAnswers,
      showedAnswers,
      ShowAnswers,
      ListAnswers,
    };
  },
};
</script>
