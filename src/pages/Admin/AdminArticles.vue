<template>
  <q-table
    title="Статьи"
    :rows="ListTest"
    :columns="columns"
    row-key="id"
    flat
    bordered
    virtual-scroll
  >
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn flat icon="edit" color="green" @click="editTest(props.row)" />
        <q-btn
          flat
          icon="help_outline"
          color="blue"
          @click="gotoQuestions(props.row.id_test)"
        />
        <q-btn flat icon="delete" color="red" @click="deleteTest(props.row)" />
      </q-td>
    </template>
  </q-table>
  <div class="flex flex-center q-mt-md">
    <q-form @submit="addTest()" @reset="resetForm" class="q-gutter-md">
      <q-input
        filled
        v-model="newTest.name_test"
        label="Название Статьи"
        required
        lazy-rules
        style="width: 400px"
        :rules="[
          (val) =>
            (val && val.length > 0) || 'Пожалуйста, введите название статьи',
        ]"
      />

      <q-select
        filled
        :model-value="newTest.id_section"
        label="Выберите раздел"
        :options="ListSections"
        option-value="id_section"
        option-label="name_section"
        style="width: 400px"
        @update:model-value="
          (value) => {
            newTest.id_section = value;
          }
        "
        required
        :rules="[
          (val) =>
            (val !== null && val !== undefined) ||
            'Пожалуйста, выберите раздел',
        ]"
      />

      <q-input
        filled
        style="width: 400px"
        v-model="newTest.description_test"
        label="Описание"
      />
      <!-- <q-input
        filled
        v-model="newTest.article"
        label="Содержание статьи"
        type="textarea"
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length > 0) || 'Пожалуйста, введите содержание статьи',
        ]"
      /> -->
      <froala
        id="edit"
        :tag="'textarea'"
        :config="configEditor"
        v-model:value="newTest.article"
        class="froala-editor"
      ></froala>
      <div style="width: 400px" class="q-gutter-md">
        <q-btn
          :label="isEdit ? 'Изменить' : 'Добавить'"
          @click="addTest()"
          color="primary"
          class="q-mr-md"
        />
        <q-btn
          label="Очистить"
          @click="resetForm"
          type="reset"
          color="secondary"
        />
      </div>
    </q-form>
  </div>
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
  name: "AdminArticle",
  setup() {
    const router = useRouter();
    const currentTest = ref(2);
    const ListTest = ref([]);
    const ListSections = ref([]);
    const isEdit = ref(false);
    const configEditor = ref({
      heightMin: 300,
      heightMax: 700,
    });

    const columns = ref([
      {
        name: "name_test",
        required: true,
        label: "Название статьи",
        align: "left",
        field: "name_test",
        sortable: true,
      },
      {
        name: "name_section",
        required: true,
        label: "Раздел",
        align: "left",
        field: "name_section",
        sortable: true,
      },
      {
        name: "description_test",
        align: "left",
        label: "Описание статьи",
        field: "description_test",
        sortable: true,
      },
      {
        name: "actions",
        label: "Действия",
        field: "actions",
        sortable: false,
      },
    ]);

    const $q = useQuasar();
    const newTest = ref({
      name_test: "",
      description_test: "",
      id_test: currentTest.value,
      id_section: null,
      article: "",
    });
    const search = ref("");

    onMounted(() => {
      getDataSections();
      setTimeout(() => {}, 500);
      getDataList();
    });

    function editTest(data) {
      isEdit.value = true;
      newTest.value = JSON.parse(JSON.stringify(toRaw(data)));
    }

    function resetForm() {
      newTest.value = {
        name_test: "",
        description_test: "",
        id_test: currentTest.value,
        article: "",
      };
      isEdit.value = false;
    }

    function deleteTest(test) {
      $q.dialog({
        title: "Подтвердить удаление",
        message: `Вы уверены, что хотите удалить запись "${test.name_test}"?`,
        cancel: true,
        persistent: true,
      }).onOk(() => {
        let test_ = toRaw(test);
        api
          .delete("/records/tests/" + test_.id_test)
          .then((response) => {
            if (response.data) {
              getDataList();
            }
          })
          .catch(() => {
            console.log("error delete test");
          });
      });
    }

    function gotoQuestions(id) {
      router.push({ path: "/Admin/ListQuestions/" + id });
    }

    function addTest() {
      if (isEdit.value) {
        let id_section = ListSections.value.filter(
          (x) => x.name_section == newTest.value.name_section
        )[0].id_section;
        newTest.value.id_section = id_section;
        api
          .put("/records/tests/" + newTest.value.id_test, newTest.value)
          .then((response) => {
            if (response.data) {
              getDataList();
              newTest.value = {
                name_test: "",
                description_test: "",
                id_test: currentTest.value,
                id_section: null,
              };
              isEdit.value = false;
            }
          })
          .catch(() => {
            console.log("error Edit test");
          });
      } else {
        if (newTest.value.name_test != "" && newTest.value.article != "") {
          api
            .post("/records/tests", {
              name_test: newTest.value.name_test,
              article: newTest.value.article,
              description_test: newTest.value.description_test,
              id_section: newTest.value.id_section.id_section,
            })
            .then((response) => {
              if (response.data) {
                getDataList();
                newTest.value = {
                  name_test: "",
                  description_test: "",
                  id_test: currentTest.value,
                  article: "",
                  id_section: null,
                };
              }
            })
            .catch(() => {
              console.log("error add test");
            });
        }
      }
    }
    function getDataList() {
      api
        .get("/records/tests")
        .then((response) => {
          if (response.data) {
            let List = toRaw(response.data.records);
            ListTest.value = List.map((x) => {
              let name_s =
                ListSections.value.filter(
                  (s) => s.id_section == x.id_section
                )[0].name_section || "";
              let t = {
                name_section: name_s,
                article: x.article,
                description_test: x.description_test,
                id_section: x.id_section,
                id_test: x.id_test,
                name_test: x.name_test,
              };
              return t;
            });
          }
        })
        .catch(() => {
          console.log("error list tests");
        });
    }

    function getDataSections() {
      api
        .get("/records/sections")
        .then((response) => {
          if (response.data) {
            ListSections.value = JSON.parse(
              JSON.stringify(toRaw(response.data.records))
            );
          }
        })
        .catch(() => {
          console.log("error list sections");
        });
    }

    return {
      ListTest,
      columns,
      search,
      newTest,
      deleteTest,
      addTest,
      isEdit,
      editTest,
      gotoQuestions,
      resetForm,
      ListSections,
      configEditor,
    };
  },
};
</script>

<style>
.froala-editor {
  max-height: 300px; /* или любая другая фиксированная высота */
  overflow: auto;
}
</style>
