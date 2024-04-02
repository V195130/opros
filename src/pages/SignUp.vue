<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md" style="width: 400px">
      <q-card-section>
        <div class="text-h6" style="text-align: center">Форма Регистрации</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            filled
            v-model="user.login"
            label="Имя пользователя"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Пожалуйста, введите имя пользователя',
            ]"
          />

          <q-input filled v-model="user.family" label="Фамилия" />

          <q-input filled v-model="user.name" label="Имя" />

          <q-input
            filled
            v-model="user.password"
            type="password"
            label="Пароль"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 5) ||
                'Пароль должен быть больше 5 символов',
            ]"
          />

          <q-input
            filled
            v-model="user.confirmPassword"
            type="password"
            label="Подтвердите пароль"
            lazy-rules
            :rules="[(val) => val === user.password || 'Пароли не совпадают']"
          />

          <div>
            <q-btn label="Регистрация" @click="AddUser()" color="primary" />
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
  name: "SignUp",
  setup() {
    const router = useRouter();
    const user = ref({
      login: "",
      family: "",
      name: "",
      role: "user",
      password: "",
      confirmPassword: "",
    });

    function AddUser() {
      let u = {
        login: user.value.login,
        family: user.value.family,
        name: user.value.name,
        role: user.value.role,
        password: user.value.password,
        description: "",
      };
      api
        .post("/records/users", u)
        .then((response) => {
          if (response.data) {
            $q.notify({
              color: "green",
              position: "top",
              message: "Вы успешно зарегистрированы",
            });
          }
        })
        .catch(() => {
          console.log("error list tests");
        });
    }

    return {
      user,
      AddUser,
    };
  },
};
</script>
