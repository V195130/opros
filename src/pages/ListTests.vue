<template>
    <q-page>
      <div v-for="(l,index) in list" class="q-pa-md" :key="index">
        <div class="sr" @click="navigate(l.path)" style="color:blue; text-decoration: underline; cursor: pointer; " >{{ index+1 }}.{{ " "+l.name }}</div>
      </div>
      {{ group }}
     
    </q-page>
    
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router';
  export default {
     name: 'ListTests',
    setup(){
      const router = useRouter();
      const list=ref([
        {
          name: 'Тест по теме "DNS"',
          path:'/TestDNS'
        },
        {
          name: 'Тест №2',
          path:'/TestDNS'
        },
      ])
  
        function navigate(path) {
          router.push(path)
        }
  
  
  
      return {
        list,navigate
      }
     }
  }
  </script>
  