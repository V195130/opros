<template>
  <q-table
    title="Список Разделов"
    :rows="Listsections"
    :columns="columns"
    row-key="id"
    flat
    bordered
    virtual-scroll
  >
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn flat icon="edit" color="green" @click="editSection(props.row)" />
        <q-btn
          flat
          icon="delete"
          color="red"
          @click="deletesection(props.row)"
        />
      </q-td>
    </template>
  </q-table>
  <div class="flex flex-center q-mt-md">
    <q-form
      @submit="addsection()"
      @reset="resetForm"
      class="q-gutter-md"
      style="width: 400px"
    >
      <q-input
        filled
        v-model="newsection.name_section"
        label="Название Раздела"
        required
      />

      <div>
        <q-btn
          :label="isEdit ? 'Изменить' : 'Добавить'"
          @click="addsection()"
          color="primary"
          class="q-mr-md"
        />
        <q-btn label="Сбросить" type="reset" color="secondary" />
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
  name: "ListSections",
  setup() {
    const router = useRouter();
    const Listsections = ref([]);
    const isEdit = ref(false);

    const columns = ref([
      {
        name: "name_section",
        required: true,
        label: "Сервис",
        align: "left",
        field: "name_section",
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
    const newsection = ref({
      name_section: "",
    });
    const search = ref("");

    onMounted(() => {
      getDataList();
    });

    function editSection(data) {
      isEdit.value = true;
      newsection.value = JSON.parse(JSON.stringify(toRaw(data)));
    }

    function deletesection(section) {
      $q.dialog({
        title: "Подтвердить удаление",
        message: `Вы уверены, что хотите удалить запись "${section.name_section}"?`,
        cancel: true,
        persistent: true,
      }).onOk(() => {
        let sect = toRaw(section);

        api
          .delete("/records/sections/" + sect.id_section)
          .then((response) => {
            if (response.data) {
              getDataList();
            }
          })
          .catch(() => {
            console.log("error");
          });
      });
    }
    function addsection() {
      if (isEdit.value) {
        api
          .put(
            "/records/sections/" + newsection.value.id_section,
            newsection.value
          )
          .then((response) => {
            if (response.data) {
              getDataList();
              newsection.value = {
                name_section: "",
              };
              isEdit.value = false;
            }
          })
          .catch(() => {
            console.log("error");
          });
      } else {
        api
          .post("/records/sections", newsection.value)
          .then((response) => {
            if (response.data) {
              getDataList();
              newsection.value = {
                name_sections: "",
              };
            }
          })
          .catch(() => {
            console.log("error");
          });
      }
    }

    function getDataList() {
      api
        .get("/records/sections")
        .then((response) => {
          if (response.data) {
            Listsections.value = response.data.records;
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
      Listsections,
      columns,
      search,
      newsection,
      deletesection,
      addsection,
      isEdit,
      editSection,
    };
  },
};
</script>
