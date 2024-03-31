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
            v-model="email"
            label="Email"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Пожалуйста, введите email',
              (val) =>
                /.+@.+..+/.test(val) || 'Пожалуйста, введите корректный email',
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

          <q-input
            filled
            v-model="confirmPassword"
            type="password"
            label="Подтвердите пароль"
            lazy-rules
            :rules="[(val) => val === password || 'Пароли не совпадают']"
          />

          <div>
            <q-btn label="Регистрация" type="submit" color="primary" />
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
  setup() {},
};

// <script>
// export default {
//   name: "SignUp",
//   data() {
//     return {
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     };
//   },
//   methods: {
//     onSubmit() {
//       // Обрабатываем данные формы
//       console.log("Регистрация:", this.name, this.email, this.password);
//       // Здесь должен быть ваш метод регистрации, например API-запрос
//     },
//     onReset() {
//       this.name = "";
//       this.email = "";
//       this.password = "";
//       this.confirmPassword = "";
//     },
//   },
// };
</script>
