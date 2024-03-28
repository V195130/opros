<template>
  <q-page class="flex flex-center">
    <img
      v-for="(img, i) in img_list"
      :key="'img' + i"
      alt="Quasar logo"
      :src="img"
      style="height: 100px"
      class="q-mr-md"
    />
  </q-page>
</template>

<script>
import { ref, onMounted, toRefs, defineProps } from "vue";

export default {
  name: "IndexPage",
  setup(props) {
    const img_list = ref([
      "https://avatars.mds.yandex.net/i?id=0968f70087ee88dbe6866ea6edbb921d604fe35b-10755803-images-thumbs&n=13",
      "https://i.ytimg.com/vi/XmGWjwMQ6YU/maxresdefault.jpg?7857057827",
      "https://avatars.mds.yandex.net/i?id=db52c4cf9186e4dee00bbcfda2259d66bc7d6192-12498917-images-thumbs&n=13",
      "https://spin.atomicobject.com/wp-content/uploads/github.png",
    ]);

    return {
      img_list,
    };
  },
};
</script>
