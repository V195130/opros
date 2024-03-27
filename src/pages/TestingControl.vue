<template>
  <q-page class="flex flex-center">
    <div
      class="q-pa-md q-border-1"
      :style="
        !$q.dark.isActive
          ? 'background-color: #E0FFFF; border-radius: 5%; max-width: 500px'
          : 'background-color: #4682B4; border-radius: 5%; max-width: 500px'
      "
      v-if="unproxiedList.length"
    >
      <div class="text-h6 text-center q-my-md">
        {{ currentQuestion + 1 }}.
        {{ unproxiedList[currentQuestion].question_text }}
      </div>

      <q-option-group
        :options="unproxiedList[currentQuestion].answers"
        v-model="selectedOption[currentQuestion]"
        inline
        type="radio"
        color="primary"
        class="column justify-start q-my-md q-gutter-y-md"
      />

      <div class="row justify-center q-my-md">
        <q-btn
          v-if="currentQuestion != 0"
          label="Назад"
          :color="!$q.dark.isActive ? 'primary' : 'orange'"
          class="q-mx-md"
          @click="prevQuestion"
        />
        <q-btn label="Проверить" color="secondary" @click="checkAnswers" />
        <q-btn
          v-if="currentQuestion != unproxiedList.length - 1"
          label="Вперед"
          :color="!$q.dark.isActive ? 'primary' : 'orange'"
          class="q-mx-md"
          @click="nextQuestion"
        />
      </div>

      <div
        class="q-mt-md text-h5 text-center"
        v-if="isChecked"
        :style="
          unproxiedList.length / 2 <= nCorrecntAnswers
            ? 'color: green;'
            : 'color: red;'
        "
      >
        Вы ответили правильно на {{ nCorrecntAnswers }} из
        {{ unproxiedList.length }} вопросов!
      </div>
    </div>
  </q-page>
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
  name: "UniqArticle",
  props: ["id_test"],
  setup(props) {
    const ListQuestions = ref([]);
    const ListAnswers = ref([]);
    const list_test = ref([]);

    const currentQuestion = ref(0);
    const selectedOption = ref([]);
    const unproxiedList = ref([]);
    const isChecked = ref(false);
    const nCorrecntAnswers = ref(0);

    onMounted(() => {
      getDataTest();
      getAnswers();
    });

    watchEffect(() => {
      if (ListQuestions.value.length && ListAnswers.value.length) {
        list_test.value = ListQuestions.value.map((x) => {
          let quests = ListAnswers.value
            .filter((a) => a.id_question == x.id_question)
            .map((q, index) => {
              return {
                label: q.text_answer,
                value: index,
                //color: q.is_correct ? 'green' : 'red',
                is_correct: q.is_correct,
              };
            });
          let correct = quests.findIndex((a) => a.is_correct === true);
          return {
            correct: correct,
            answers: quests,
            ...x,
          };
        });
        console.log("lt", list_test.value);
        unproxiedList.value = toRaw(list_test.value);
      }
    });
    function prevQuestion() {
      if (currentQuestion.value != 0) {
        currentQuestion.value = currentQuestion.value - 1;
      }
    }

    function nextQuestion() {
      if (currentQuestion.value != unproxiedList.value.length - 1) {
        currentQuestion.value = currentQuestion.value + 1;
      }
    }

    function checkAnswers() {
      unproxiedList.value.map((x, i) => {
        if (x.is_correct == selectedOption.value[i]) {
          nCorrecntAnswers.value = nCorrecntAnswers.value + 1;
        }
        return x;
      });
      isChecked.value = true;
    }

    function getDataTest() {
      api
        .get("/records/questions?filter=id_test,eq," + props.id_test)
        .then((response) => {
          if (response.data) {
            ListQuestions.value = response.data.records; //.filter(x => x.id_test == props.id_test)
            console.log("getDataTest", ListQuestions.value);
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

    function getAnswers() {
      api
        .get("/records/answers")
        .then((response) => {
          if (response.data) {
            ListAnswers.value = response.data.records;
            console.log("getAnswers", ListAnswers.value);
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
      getDataTest,
      ListQuestions,
      ListAnswers,
      getAnswers,
      list_test,
      currentQuestion,
      selectedOption,
      prevQuestion,
      nextQuestion,
      unproxiedList,
      checkAnswers,
      nCorrecntAnswers,
      isChecked,
    };
  },
};
</script>
