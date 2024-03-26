<template>
  <div><div class="h4">
JavaScript. Язык сценариев. Вставка скриптов в Web- страницу.</div>
<br>
JavaScript-язык программирования для написания сценариев (скриптов).
<br>
JavaScript- является расширением HTML, поэтому скрипт записывается как обычный HTML-файл. <b>{{ '<script Javascript...>.....</script>' }}</b>- теги скрипта, написанного на JavaScript.
<br>
Скрипт обычно описывает какой-либо эффект на странице (мерцание, перелистывание, горящие буквы, круги на воде, пламя и т.д.) или организует ее
<br>
интерактивный режим работы (счетчики посещений, регистрация, таймеры, создание и обработка онлайн - тестов и т.д.)
<br>
Эффекты могут быть непосредственно написаны на HTML с помощью тега
<br>
Скрипты - способ написания эффектов, вставленных в Web- страницу.
</div>
</template>
<script>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router';

export default {
   name: 'ArticleDNS',
   setup(){
      const router = useRouter();
  
        function navigate(path, tren) {
          router.push({
            path: path, 
            params: {typeTren: tren}
            })
        }
  
  
  
      return {
        navigate
      }
     }
}

</script>
     