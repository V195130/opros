<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md" style="width: 400px">
      <q-card-section>
        <div class="text-h6" style="text-align: center">Авторизация</div>
        <div style="color: red; font-size: 18px">
          {{ message }}
        </div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            filled
            v-model="name"
            label="Имя пользователя"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Пожалуйста, введите имя пользователя',
            ]"
          />

          <q-input
            filled
            v-model="password"
            type="password"
            label="Пароль"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 5) ||
                'Пароль должен быть больше 5 символов',
            ]"
          />

          <div>
            <q-btn label="Вход" @click="onSubmit" color="primary" />
            <q-btn
              label="Очистить"
              type="reset"
              color="primary"
              flat
              class="q-ml-md"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
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
import { useUserStore } from "stores/userStore";

export default {
  name: "LoginUser",
  setup() {
    const router = useRouter();
    const name = ref("");
    const password = ref("");
    const message = ref("");
    const userStore = useUserStore();

    function onSubmit() {
      console.log("Вход:", name.value, password.value);
      api
        .get("/records/users?filter=login,eq," + name.value)
        .then((response) => {
          if (response.data) {
            console.log("user", response.data.records);
            if (
              response.data?.records.length &&
              response.data?.records[0].password == password.value
            ) {
              //пишем в pinia
              userStore.setUser(response.data?.records[0]);
              router.push({ path: "/ListArticles" });
            } else {
              message.value =
                "Пользователь не найден. Зарегистрируйтесь или восстановите пароль.";
            }
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
    function onReset() {
      name.value = "";
      password.value = "";
      message.value = "";
    }

    return {
      onSubmit,
      onReset,
      password,
      name,
      message,
    };
  },
};
</script>
