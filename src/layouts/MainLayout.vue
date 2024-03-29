<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Информационные технологии
        </q-toolbar-title>
        <div v-if="userLogin != null">
          {{ userLogin }}, <br /><span @click="logout()"> Выйти</span>
        </div>
        <div v-else>
          <q-btn
            label="Зарегистрируйтесь"
            color="primary"
            flat
            class="q-ml-md"
          />
        </div>

        <q-btn flat @click="toggleTheme">
          <q-icon
            :name="currentTheme === 'dark' ? 'light_mode' : 'dark_mode'"
          />
        </q-btn>
        <q-btn
          v-if="!userLogin"
          icon="settings"
          flat
          @click="openLoginDialog()"
        />
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/ListArticles" label="статьи" />
        <q-route-tab to="/UniqTesting/1" label="Тестирование" />
        <q-route-tab to="/AboutMe" label="Об Авторе" />
        <q-route-tab :to="'/Admin/ListLogins/' + id_user" label="Записи" />
        <q-route-tab to="/Admin/AdminArticles" label="Статьи" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { useQuasar } from "quasar";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "stores/userStore";

export default {
  setup() {
    const currentTheme = ref("light");
    const $q = useQuasar();
    const router = useRouter();

    const userStore = useUserStore();

    const userLogin = computed(() => userStore.login || null);
    const id_user = computed(() => userStore.id_user || null);
    const isAdmin = computed(() => userStore.role == "admin");

    function logout() {
      console.log("выход");
      userStore.clearUser();
    }

    function toggleTheme() {
      currentTheme.value = currentTheme.value === "dark" ? "light" : "dark";
      $q.dark.toggle();
    }

    function openLoginDialog() {
      router.push({ path: "/LoginUser" });
    }

    return {
      toggleTheme,
      currentTheme,
      openLoginDialog,
      userLogin,
      id_user,
      logout,
      isAdmin,
    };
  },
};
</script>
