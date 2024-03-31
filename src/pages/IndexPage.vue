<template>
  <q-page class="">
    <div style="margin-top: 10px; margin-bottom: 40px">
      <img
        src="https://copyassignment.com/wp-content/uploads/2022/11/JavaScript.jpg"
      />
    </div>
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
      "https://junior3d.ru/wp-content/uploads/2023/01/foto-210123_6.jpg",
      "https://softmap.ru/upload/uf/4cc/4cc7732def86bf69bb2091337570327f.png",
      "https://i.ytimg.com/vi/ezqFLjuHrjo/maxresdefault.jpg",
      "https://clipart.info/images/ccovers/1499794874html5-js-css3-logo-png.png",
      "https://www.mytechlogy.com/upload/by_users/JasmineEmans/161703101024phplenguaje.jpg",
      "https://fuzeservers.ru/wp-content/uploads/6/d/d/6dd95798cae12d5ae564db68d3000cb4.png",
      "https://avatars.mds.yandex.net/i?id=c50aa9b9a8aeff638efabbd91e43e3464fc81556-12481490-images-thumbs&n=13",
      "https://www.coveros.com/wp-content/uploads/2016/09/sourceTreeIcon.jpg",
      "https://avatars.mds.yandex.net/i?id=266cfe679382763233eb63b209ad89340638b21c-9106769-images-thumbs&n=13",
    ]);

    return {
      img_list,
    };
  },
};
</script>
