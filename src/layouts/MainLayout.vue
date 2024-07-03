<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title @click="openpath('/')">
          <q-avatar>
            <img
              style="height: 40px"
              src="https://yt3.googleusercontent.com/FxcDtD2QUqbeI5c11PJD5shgUPOK_zahi3ebXHOjqV8WONAmUgTRR6nIwTitd1kezpARtcIvvT4=s900-c-k-c0x00ffffff-no-rj"
            />
          </q-avatar>
          IT-школа программирования для детей
        </q-toolbar-title>
        <div v-if="userLogin != null">
          {{ userLogin }}, <br /><span @click="logout()"> Выйти</span>
        </div>
        <div v-if="!userLogin">
          <q-btn
            :color="!$q.dark.isActive ? 'primary' : 'orange'"
            icon="person_add"
            @click="openpath('/SignUp')"
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
          @click="openpath('/LoginUser')"
        />
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/ListArticles" label="Курсы" />
        <q-route-tab to="/ListURL" label="Полезные ресурсы" />
        <q-route-tab to="/AboutMe" label="Об Авторе" />
        <q-route-tab
          v-if="userLogin"
          :to="'/Admin/ListLogins/' + id_user"
          label="Заметки"
          style="color: #0000ff"
        />
        <q-route-tab
          v-if="role_user === 'admin'"
          to="/Admin/Listsections"
          label="Разделы"
          style="color: #0000ff"
        />
        <q-route-tab
          v-if="role_user === 'admin'"
          to="/Admin/AdminArticles"
          label="Статьи"
          style="color: #0000ff"
        />
        <q-route-tab
          v-if="role_user === 'admin'"
          to="/Admin/AdminUsers"
          label="Пользователи"
          style="color: #0000ff"
        />
        <q-route-tab
          v-if="userLogin"
          :to="'/Admin/ListResults/' + id_user"
          label="Результаты"
          style="color: #0000ff"
        />
        <q-route-tab
          v-if="userLogin"
          :to="'/Admin/UserProfile'"
          label="Профиль"
          style="color: #0000ff"
        />
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
    const role_user = computed(() => userStore.role || null);

    function logout() {
      userStore.clearUser();
    }

    function toggleTheme() {
      currentTheme.value = currentTheme.value === "dark" ? "light" : "dark";
      $q.dark.toggle();
    }

    function openpath(str) {
      router.push({ path: str });
    }

    return {
      toggleTheme,
      currentTheme,
      openpath,
      userLogin,
      id_user,
      logout,
      role_user,
    };
  },
};
</script>
