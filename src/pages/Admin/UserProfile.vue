<template>
  <q-card class="q-ma-md q-pa-md" style="width: 300px; margin: 0 auto">
    <q-card-section>
      <q-form @submit="submitForm">
        <img src="getImageUrl()" alt="avatar" />
        {{ listData.level }} Уровень
        <q-input
          v-model="listData.name"
          label="Имя"
          outlined
          dense
          clearable
          required
        />

        <q-input
          v-model="listData.family"
          label="Фамилия"
          outlined
          dense
          clearable
          required
        />

        <q-input
          v-model="listData.login"
          label="Логин"
          outlined
          dense
          clearable
          required
        />

        <q-input
          v-model="listData.password"
          label="Пароль"
          type="password"
          outlined
          dense
          clearable
          required
        />

        <q-input
          v-model="listData.description"
          label="Описание"
          outlined
          dense
          clearable
        />

        <q-card-actions align="right">
          <q-btn type="submit" color="primary" label="Сохранить" />
        </q-card-actions>
      </q-form>
    </q-card-section>
  </q-card>
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
  name: "UserProfile",
  setup() {
    const router = useRouter();
    const listData = ref({});
    const userStore = useUserStore();
    const userId = computed(() => userStore.id_user || null);
    const listAvatars = [
      { level: 25, image: "level1.png" },
      { level: 50, image: "level2.png" },
      { level: 100, image: "level3.png" },
    ];

    const columns = ref([
      {
        name: "name_test",
        required: true,
        label: "Название теста",
        align: "left",
        field: "name_test",
        sortable: true,
      },
      {
        name: "result",
        required: true,
        label: "Результат",
        align: "left",
        field: "result",
        sortable: true,
      },
      {
        name: "login",
        required: true,
        label: "Никнейм",
        align: "left",
        field: "login",
        sortable: true,
      },
      {
        name: "date_test",
        label: "дата",
        field: "date_test",
        sortable: false,
      },
      {
        name: "actions",
        label: "Действия",
        field: "actions",
        sortable: false,
      },
    ]);

    const $q = useQuasar();

    onMounted(() => {
      getUser();
    });

    function getImageUrl() {
      if (this.level === 25) {
        return "https://example.com/image25.png"; // Замените на URL вашей картинки для уровня 25
      } else if (this.level === 50) {
        return "https://example.com/image50.png"; // Замените на URL вашей картинки для уровня 50
      } else if (this.level === 100) {
        return "https://example.com/image100.png"; // Замените на URL вашей картинки для уровня 100
      } else {
        return "https://example.com/default.png"; // Замените на URL вашей картинки по умолчанию
      }
    }
    function getUser() {
      api
        .get("/records/users?filter=id_user,eq," + userId.value)
        .then((response) => {
          if (response.data) {
            listData.value = response.data.records[0];
            console.log(listData.value);
          }
        })
        .catch(() => {
          console.log("error");
        });
    }

    return {
      userId,
      listData,
      getImageUrl,
      listAvatars,
    };
  },
};
</script>
