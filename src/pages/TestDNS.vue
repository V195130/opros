<template>
  <q-page>
    <div v-for="(q,index) in questions" class="q-pa-md" :key="index">
      {{ index+1 }}.{{ " "+q.text }}
      <q-option-group
      v-if="tt === 'true'"
      :options="q.options"
      type="radio"
      v-model="group[index]"
      />
      <q-option-group
      v-else
      :options="q.options"
      color="primary"
      v-model="group[index]"
      />
      <span v-if="tt === 'true'" :style="'color: ' + (group[index] == q.correct ? 
      'green' : 
      'red')">
        {{ group[index] ? 
          (group[index] == q.correct ? 'Правильный ответ!' : 'Неправильный ответ!') : 
          '' }}
      </span>
      
    </div>
    {{ group }}
   
  </q-page>
  
</template>

<script>
import { ref, onMounted } from 'vue'
export default {
   name: 'TestDNS',
   props: ['typeTren'],

  setup(){
    const group = ref([])
    const msgText = ref('')
    const tt = ref('true')

    const questions=ref([
      {
        text: 'Правильная расшифровка аббривеатуры DNS ',
        options: [
          { label: 'Dinosaur Napping Service', value: 0, color: 'red' },
          { label: 'Delicious Nutella Spread', value: 1, color: 'red' },
          { label: 'Domain Name System', value: 2, color: 'green' },
          { label: 'Dancing Ninja Squad', value: 3, color: 'red' }
        ],
        correct: 2
      },
      {
        text: 'Какие типы IP-адресов существуют?',
        options: [
          { label: 'IPv2', value: 0, color: 'red' },
          { label: 'IPv3', value: 1, color: 'red' },
          { label: 'IPv5', value: 2, color: 'red' },
          { label: 'IPv6', value: 3, color: 'green' }
        ],
        correct:3
      },
      {
        text: 'Что такое DNS-сервер?',
        options: [
          { label: 'Система поиска контактов в смартфоне', value: 0, color: 'red' },
          { label: 'Список контактов в телефонном справочнике', value: 1, color: 'red' },
          { label: 'Сервер, содержащий сведения о доменах и их соответствующих IP-адресах.', value: 2, color: 'green' },
          { label: 'Кеширование записей других серверов', value: 3, color: 'red' }
        ],
        correct:2
      },
      {
        text: 'Выберите правильное утверждение ',
        options: [
          { label: 'Существует два типа адресов IPv4 IPv6', value: 0, color: 'green' },
          { label: 'Существует два типа адресов IPv1 IPv2', value: 1, color: 'red' },
          { label: 'Существует два типа адресов IPv3 IPv4', value: 2, color: 'red' },
          { label: 'Существует два типа адресов IPv7 IPv8', value: 3, color: 'red' }
        ],
        correct:0
      },
      {
        text: 'Какой это формат IP-адреса 000.111.222.123?',
        options: [
          { label: 'IPv4', value: 0, color: 'green' },
          { label: 'IPv1', value: 1, color: 'red' },
          { label: 'IPv3', value: 2, color: 'red' },
          { label: 'IPv6', value: 3, color: 'red' }
        ],
        correct: 0
      },
      {
        text: 'Какой это формат IP-адреса 1234:abcd:1b4d:000a:987c:5555:a2d8:bcd6',
        options: [
          { label: 'IPv2', value: 0, color: 'red' },
          { label: 'IPv8', value: 1, color: 'red' },
          { label: 'IPv64', value:2, color: 'red' },
          { label: 'IPv6', value: 3, color: 'green' }
        ],
        correct:3
      },
      {
        text: 'Тип адреса, который представляет собой 8 групп по 4 символа(8 четырёхзначных шестнадцатеричных чисел), разделённых двоеточием',
        options: [
          { label: 'IPv2', value: 0, color: 'red' },
          { label: 'IPv8', value: 1, color: 'red' },
          { label: 'IPv64', value:2, color: 'red' },
          { label: 'IPv6', value: 3, color: 'green' }
        ],
        correct:3
      },
      {
        text: 'Что прописывается в ресурсных записях:',
        options: [
          { label: 'Информация о доменах, поддоменах и их IP', value: 0, color: 'red' },
          { label: 'только информация о доменах', value: 1, color: 'red' },
          { label: 'только данные поддоменов', value:2, color: 'red' },
          { label: 'только IP адреса', value: 3, color: 'green' }
        ],
        correct:3
      },
      {
        text: 'Какой вид днс сервера не существует',
        options: [
          { label: 'кеширующий', value: 0, color: 'red' },
          { label: 'авторитетный', value: 1, color: 'red' },
          { label: 'скоростной', value:2, color: 'green' },
          { label: 'корневой', value: 3, color: 'red' }
        ],
        correct:2
      },
      {
        text: 'выбери правильный IP адрес',
        options: [
          { label: '78:67:3', value: 0, color: 'red' },
          { label: '101.111.222.123', value: 1, color: 'green' },
          { label: '1234:abcd', value:2, color: 'red' },
          { label: '1234:abcd1234:abcd', value: 3, color: 'red' }
        ],
        correct:1
      },
    ])

    


    


    return {
      questions,group,msgText, tt
    }
   }
}
</script>
