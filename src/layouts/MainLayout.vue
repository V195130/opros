<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
           Информационные технологии
        </q-toolbar-title>
        <q-btn flat @click="toggleTheme">
   <q-icon :name="currentTheme === 'dark' ? 'light_mode' : 'dark_mode'" />
 </q-btn> 
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/TestDNS" label="Тестирование" />
        <q-route-tab to="/ListArticles" label="статьи" />
        <q-route-tab to="/UniqTesting/1" label="Тестирование" />
        <q-route-tab to="/AboutMe" label="О себе" />
      </q-tabs>
      
    </q-header>
    

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
  
</template>

<script>
import { useQuasar } from 'quasar'
import { ref, onMounted } from 'vue'
export default {
  setup () {
 const currentTheme = ref('light')
 const $q = useQuasar()
    function toggleTheme() {
      currentTheme.value = currentTheme.value === 'dark' ? 'light' : 'dark';
      $q.dark.toggle()    
      

        }
    return {
      toggleTheme ,currentTheme
    }
  }
}
</script>


