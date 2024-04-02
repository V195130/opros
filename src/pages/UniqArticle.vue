<template>
  <div class="q-ml-md q-mt-md">
    <q-btn
      v-if="ListQuestions"
      class="q-ml-md q-mt-md"
      color="primary"
      label="Тренировочный тест"
      @click="navigate('/UniqTesting/' + id_test)"
    />
    <q-btn
      v-if="ListQuestions"
      class="q-ml-md q-mt-md"
      color="red"
      label="Пройти тест"
      @click="navigate('/TestingControl/' + id_test)"
    />
    <div v-html="ArticleText"></div>
  </div>
</template>

<script>
import { ref, onMounted, toRefs, defineProps } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { api } from "boot/axios";

export default {
  name: "UniqArticle",
  props: ["id_test"],
  setup(props) {
    const ArticleText = ref(null);
    const ArticleName = ref("");
    const ListQuestions = ref(0);
    const router = useRouter();
    function navigate(path) {
      router.push(path);
    }

    onMounted(() => {
      getDataTest();
      getListQuestions();
    });
    function getDataTest() {
      api
        .get("/records/tests")
        .then((response) => {
          if (response.data) {
            ArticleText.value = response.data.records.filter(
              (x) => x.id_test == props.id_test
            )[0].article;
            ArticleName.value = response.data.records.filter(
              (x) => x.id_test == props.id_test
            )[0].name_test;
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
    function getListQuestions() {
      api
        .get("/records/questions?filter=id_test,eq," + props.id_test)
        .then((response) => {
          if (response.data) {
            ListQuestions.value = response.data.records.length;
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
      getDataTest,
      ArticleText,
      ArticleName,
      navigate,
      ListQuestions,
    };
  },
};
</script>
