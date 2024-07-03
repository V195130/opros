<template>
  <q-page>
    <div v-for="(s, i) in ListSections" :key="'s' + i" class="q-ml-md q-mt-md">
      <span style="font-size: 22px">{{ s.name_section }}</span>
      <div
        v-for="(l, index) in ListTests.filter(
          (x) => x.id_section == s.id_section
        )"
        :key="'t' + index"
        class="q-ml-md q-mt-md"
        :class="!$q.dark.isActive ? 'lightstyle-a' : 'darkstyle-a'"
        @click="GoToPath(l)"
      >
        {{ l.name_test }}
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted, toRaw } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { api } from "boot/axios";
export default {
  name: "ArticleDNS",
  setup() {
    const router = useRouter();
    const currentTheme = ref("light");
    const ListTests = ref([]);
    const $q = useQuasar();
    const ListArticles = ref([
      { name: "DNS", url: "ArticleDNS" },
      { name: "Локальные сети", url: "LocalNetwork" },
      { name: "JavaScript", url: "JavaScript" },
      { name: "Интернет", url: "Internet" },
      { name: "Модемы", url: "Modem" },
      { name: "Соединительные кабели", url: "ConnectingCables" },
      { name: "Серверы", url: "Server" },
      { name: "Протоколы", url: "Protokol" },
      { name: "Сетевые адаптеры.", url: "NetworkAdapters" },
      { name: "Программы работы в сети", url: "ProgramWorkInNetwork" },
      { name: "Статья", url: "UniqArticle" },
    ]);

    const ListSections = ref([]);

    function clickPath(l) {
      router.push({ path: "/Articles/" + l.url });
    }
    function GoToPath(l) {
      router.push({ path: "/UniqArticle/" + l.id_test });
    }

    onMounted(() => {
      getDataTest();
      getListSections();
    });

    function getDataTest() {
      api
        .get("/records/tests")
        .then((response) => {
          if (response.data) {
            ListTests.value = toRaw(response.data.records);
          }
        })
        .catch(() => {
          console.log("error");
        });
    }

    function getListSections() {
      api
        .get("/records/sections")
        .then((response) => {
          if (response.data) {
            ListSections.value = toRaw(response.data.records);
          }
        })
        .catch(() => {
          console.log("error");
        });
    }
    return {
      ListArticles,
      clickPath,
      currentTheme,
      ListTests,
      ListSections,
      GoToPath,
    };
  },
};
</script>
<style scoped>
.body--dark a {
  color: #1976d2;
  text-decoration: underline;
  cursor: pointer;
  /* цвет ссылки в темной теме */
}
.lightstyle-a {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
.darkstyle-a {
  color: #1976d2;
  text-decoration: underline;
  cursor: pointer;
}
</style>
