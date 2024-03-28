<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md" style="width: 400px">
      <q-card-section>
        <div class="text-h6" style="text-align: center">Авторизация</div>
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
export default {
  name: "LoginUsers",
  data() {
    return {
      name: "",
      password: "",
    };
  },
  methods: {
    onSubmit() {
      // Обрабатываем данные формы
      console.log("Вход:", this.name, this.password);
      // Здесь должен быть ваш метод авторизации, например API-запрос
    },
    onReset() {
      this.name = "";
      this.password = "";
    },
  },
};
</script>
