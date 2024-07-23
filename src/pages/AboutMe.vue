<template>
  <div class="q-pa-md">
    <div class="q-col-gutter-md row items-start">
      <div class="col-md-4 col-xs-12">
        <div class="flex flex-center">
          <q-img width="330px" src="~assets/images/tresh.jpg"> </q-img>
        </div>
      </div>

      <div class="col-md-8 col-xs-12 text-h6">
        Меня зовут Иван, мне 14 лет, и я увлечен программированием. С самого
        детства я был заинтересован в технологиях и компьютерах, и мое увлечение
        только усилилось со временем. Мое изучение программированием началось с
        простых языков, таких как Scratch и Python, а затем я расширил свои
        навыки, изучая С#(Unity), JavaScript и HTML/CSS. Я люблю решать сложные
        задачи и находить элегантные решения для проблем, с которыми
        сталкиваюсь. В свободное время я часто участвую в онлайн-курсах и изучаю
        новые технологии, чтобы быть в курсе последних трендов в мире
        программирования. Кроме программирования, я также интересуюсь
        компьютерными играми (Minecraft, Command & Conquer: Generals, Мир
        танков) и люблю готовить, изучать кулинарные секреты.
      </div>
      <div class="fit row justify-center text-h4">Мои проекты</div>

      <div class="fit row justify-center">
        <div
          @click="openLink('https://servut.npksarmat.ru/montaz/#/')"
          class="col-md-3 col-xs-6 q-mr-md"
        >
          <q-img src="~assets/images/sarmat.jpg">
            <div class="absolute-bottom-right text-subtitle2">Сармат</div>
          </q-img>
          Верстка для Онлайн магазина
        </div>

        <div
          @click="openLink('https://glazunovy.ru/crossfitness/')"
          class="col-md-3 col-xs-6 q-mr-md"
        >
          <q-img src="~assets/images/crossfitnes.jpg">
            <div class="absolute-bottom-right text-subtitle2">Фитнесс</div>
          </q-img>
          Верстка сайта для спортзал
        </div>

        <div
          @click="openLink('https://glazunovy.ru/verstka/')"
          class="col-md-3 col-xs-6 q-mr-md"
        >
          <q-img src="~assets/images/verstka.jpg">
            <div class="absolute-bottom-right text-subtitle2"></div>
          </q-img>
          Сайт для строительной компании
        </div>

        <div
          @click="openLink('https://двери30.рф')"
          class="col-md-3 col-xs-6 q-mt-md q-mr-md"
        >
          <q-img src="~assets/images/doors.png">
            <div class="absolute-bottom-right text-subtitle2"></div>
          </q-img>
          Сайт Двери30.рф
        </div>

        <div
          @click="openLink('https://v195130.github.io/cookies/')"
          class="col-md-3 col-xs-6 q-mt-md q-mr-md"
        >
          <q-img src="~assets/images/cookies.png">
            <div class="absolute-bottom-right text-subtitle2"></div>
          </q-img>
          Магазин печенек
        </div>
      </div>

      <div class="q-md-2 row">
        <div class="q-pa-md q-gutter-sm text-h4">
          Пройденные курсы:
          <q-item
            to="/"
            @click="openLink('https://stepik.org/course/63054/promo#toc')"
            dense
          >
            <q-item-section class="text-h5"
              >Интерактивный тренажер по SQL</q-item-section
            >
          </q-item>
          <q-item
            to="/"
            @click="openLink('https://stepik.org/cert/2450752')"
            dense
          >
            <q-item-section class="text-h5">HTML CSS JS</q-item-section>
          </q-item>

          <q-item to="/" @click="dense">
            <q-item-section class="text-h5"
              >ИНТЕНСИВ Frontend Start</q-item-section
            >
          </q-item>
          <q-item to="/" @click="dense">
            <q-item-section class="text-h5"
              >ИНТЕНСИВ UX/UI Start</q-item-section
            >
          </q-item>

          <q-item to="/" @click="dense">
            <q-item-section class="text-h5"
              >"Поколение Python": курс для начинающих</q-item-section
            >
          </q-item>
          <q-item
            to="/"
            @click="openLink('https://www.youtube.com/watch?v=OkNfBnq_c7c')"
            dense
          >
            <q-item-section class="text-h5"
              >Верстка сайта с нуля из Figma для начинающих</q-item-section
            >
          </q-item>

          <q-item
            to="/"
            @click="openLink('https://www.youtube.com/watch?v=AUdW01JQFME')"
            dense
          >
            <q-item-section class="text-h5"
              >Адаптивная верстка сайта с нуля для начинающих | HTML, CSS, Figma
              практика</q-item-section
            >
          </q-item>
          <q-item
            to="/"
            @click="
              openLink(
                'https://www.youtube.com/playlist?list=PLuY6eeDuleINcGnhxCG6U0kzja1Wh7fcd'
              )
            "
            dense
          >
            <q-item-section class="text-h5"
              >Адаптивная верстка сайта с нуля по макету из Figma
            </q-item-section>
          </q-item>
          <q-item
            to="/"
            @click="openLink('https://youtu.be/2ebFwqjpeCs')"
            dense
          >
            <q-item-section class="text-h5"
              >Проект "Список собеседований" на Vue3, TS, Pinia
            </q-item-section>
          </q-item>
        </div>

        <div class="q-md-6 column q-mt-xs" style="align-items: center">
          <div class="column text-h4">Сертификаты</div>
          <q-btn
            style="width: 50px; height: 50px; margin: 0"
            icon="description"
            flat
            @click="showSertificat(1)"
          ></q-btn>
          <q-btn
            style="width: 50px; height: 50px; margin: 0"
            icon="description"
            flat
            @click="showSertificat(2)"
          ></q-btn>
          <q-btn
            style="width: 50px; height: 50px; margin: 0"
            icon="description"
            flat
            @click="showSertificat(3)"
          ></q-btn>
          <q-btn
            style="width: 50px; height: 50px; margin: 0"
            icon="description"
            flat
            @click="showSertificat(4)"
          ></q-btn>
          <q-btn
            style="width: 50px; height: 50px; margin: 0"
            icon="description"
            flat
            @click="showSertificat(5)"
          ></q-btn>
          <q-dialog v-model="showDialog" style="width: 1000px">
            <q-card>
              <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">Сертификат</div>
                <q-space></q-space>
                <q-btn icon="close" flat round @click="showDialog = false" />
              </q-card-section>

              <q-card-section>
                <div class="text-center">
                  <img
                    :src="imageSrc"
                    style="width: 100%; height: auto"
                    alt="Картинка"
                  />
                </div>
              </q-card-section>
            </q-card>
          </q-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { QBtn, QDialog, QCard, QCardSection, QSpace } from "quasar";
export default {
  name: "AboutMe",
  setup() {
    const showDialog = ref(false);
    const imageSrc = ref("");

    function openLink(linkstr) {
      window.open(linkstr, "_blank");
    }

    function showSertificat(id) {
      if (id == 5) {
        imageSrc.value =
          "https://stepik.org/certificate/7c5da69c09946abecbb069ad1701d9f9b57891e0.png?resolution=low";
      }
      if (id == 4) {
        imageSrc.value =
          "https://itlogia.ru/upload/images/intensive-participant-certificate/1718881487ov1Bl.jpeg";
      }
      if (id == 3) {
        imageSrc.value =
          "https://itlogia.ru/upload/images/intensive-participant-certificate/1718872796v4twX.jpeg";
      }
      if (id == 2) {
        imageSrc.value =
          "https://stepik.org/certificate/64313e7d82a6800ab8e84f3b729ebbe2b342c2b6.png";
      }
      if (id == 1) {
        imageSrc.value =
          "https://stepik.org/certificate/7c8d19c25e1429f57ceb1165fe0e4a93a5bbe5b5.png?resolution=low";
      }
      showDialog.value = true;
    }

    return {
      openLink,

      imageSrc,
      showDialog,
      showSertificat,
    };
  },
};
</script>
