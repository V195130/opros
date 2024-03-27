<template>
 <div class="q-pa-md">
    <div class="q-col-gutter-md row items-start">
      <div class="col-md-2 col-xs-12">
        <q-img width="250px" src="~assets/images/tresh.jpg">
          
        </q-img>
      </div>

      <div class="col-md-10 col-xs-12 text-h6">
        Меня зовут Иван, мне 14 лет, и я увлечен программированием. С самого детства я был заинтересован в технологиях и компьютерах, и мое увлечение только усилилось со временем. 
Мое изучение программированием началось с простых языков, таких как Scratch и Python, а затем я расширил свои навыки, изучая С#(Unity), JavaScript и HTML/CSS. Я люблю решать сложные задачи и находить элегантные решения для проблем, с которыми сталкиваюсь. 
В свободное время я часто участвую в онлайн-курсах и изучаю новые технологии, чтобы быть в курсе последних трендов в мире программирования. 
Кроме программирования, я также интересуюсь компьютерными играми (Minecraft, Command & Conquer: Generals, Мир танков) и люблю готовить, изучать кулинарные секреты.
      </div>
      <div class = "fit row justify-center text-h4">Мои проекты</div>

      <div class = "fit row justify-center">
      <div @click="openLink('https://servut.npksarmat.ru/montaz/#/')" class="col-md-3 col-xs-6 q-mr-md">
        <q-img src="~assets/images/sarmat.jpg">
          <div class="absolute-bottom-right text-subtitle2">
            Сармат
          </div>
        </q-img>
        Верстка для Онлайн магазина
      </div>
      
    
      <div @click="openLink('https://glazunovy.ru/crossfitness/')" class="col-md-3 col-xs-6 q-mr-md">
        <q-img src="~assets/images/crossfitnes.jpg">
          <div class="absolute-bottom-right text-subtitle2">
            Фитнесс
          </div>
        </q-img>
        Верстка сайта для спортзал
      </div>

      <div @click="openLink('https://glazunovy.ru/verstka/')" class="col-md-3 col-xs-6">
        <q-img src="~assets/images/verstka.jpg">
          <div class="absolute-bottom-right text-subtitle2">
            
          </div>
        </q-img>
        Сайт для строительной компании
      </div>
    </div>

      <div class = "q-ml-md q-mt-xl fit row text-h4">Пройденные курсы:</div>
      <div class="q-pa-md q-gutter-sm">
        <q-item to="/" @click="openLink('https://stepik.org/course/63054/promo#toc')" dense>
          <q-item-section class="text-h5">Интерактивный тренажер по SQL</q-item-section>
        </q-item>

        <q-item to="/" @click="openLink('https://www.youtube.com/watch?v=OkNfBnq_c7c')" dense>
          <q-item-section class="text-h5">Верстка сайта с нуля из Figma для начинающих</q-item-section>
        </q-item>

        <q-item to="/" @click="openLink('https://www.youtube.com/watch?v=AUdW01JQFME')" dense>
          <q-item-section class="text-h5">Адаптивная верстка сайта с нуля для начинающих | HTML, CSS, Figma практика</q-item-section>
        </q-item>
        <q-item to="/" @click="openLink('https://www.youtube.com/playlist?list=PLuY6eeDuleINcGnhxCG6U0kzja1Wh7fcd')" dense>
          <q-item-section class="text-h5">Адаптивная верстка сайта с нуля по макету из Figma </q-item-section>
        </q-item>
      </div>
    </div>
  </div>


</template>
<script>


export default {
   name: 'AboutMe',
  setup(){
    function openLink(linkstr) {
      window.open(linkstr, '_blank');
    }
    

    return {
        openLink
    }
   }
}
</script>