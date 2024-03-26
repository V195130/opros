<template>
  <q-page>
    <div v-for="(l,index) in ListTests" :key="index" class="q-ml-md q-mt-md" :class="!$q.dark.isActive ? 'lightstyle-a' : 'darkstyle-a'" @click="GoToPath(l)" >{{ l.name_test}} </div>
    
    <!-- <div v-for="(l,index) in ListArticles" :key="index" class="q-ml-md q-mt-md" :class="!$q.dark.isActive ? 'lightstyle-a' : 'darkstyle-a'" @click="clickPath(l)" > -->
<!--       
      {{ l.name}}
    </div> -->
    
  </q-page>  
</template>

<script>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router';
  import { useQuasar } from 'quasar'
  import { api } from 'boot/axios'
export default {
   name: 'ArticleDNS',
   setup(){
      const router = useRouter();
      const currentTheme = ref('light')
      const ListTests = ref([])
      const $q = useQuasar()
      const ListArticles = ref([
        {name: 'DNS', url: 'ArticleDNS'},
        {name:'Локальные сети', url: 'LocalNetwork'},
        {name:'JavaScript', url: 'JavaScript'},
        {name:'Интернет', url: 'Internet'},
        {name:'Модемы', url: 'Modem'},
        {name:'Соединительные кабели', url: 'ConnectingCables'},
        {name:'Серверы', url: 'Server'},
        {name:'Протоколы', url: 'Protokol'},
        {name:'Сетевые адаптеры.', url: 'NetworkAdapters'},
        {name:'Программы работы в сети', url: 'ProgramWorkInNetwork'},
        {name:'Статья', url: 'UniqArticle'},])

    function clickPath(l){
      router.push({path: '/Articles/' + l.url});
    }
    function GoToPath(l){
      router.push({path: '/Articles/UniqArticle/'+l.id_test});
    }


  
      onMounted(() => {
            getDataTest()
        })

        function getDataTest() {
            api.get('/records/tests')
                .then((response) => {
                    if (response.data) {
                        ListTests.value = response.data.records
                        console.log('getDataTest', response.data.records)
                        
                    }
                })
                .catch(() => {
                    console.log('error')
                    // $q.notify({
                    //     color: 'negative',
                    //     position: 'top',
                    //     message: 'Ошибка загрузки списка установок',
                    //     icon: 'report_problem'
                    // })
                    })
            }
  
      return {
        ListArticles, clickPath , currentTheme,ListTests,GoToPath
      }
     }
}

</script> 
<style scoped>
.body--dark a {
  color: #1976d2;
  text-decoration:
   underline; 
   cursor: pointer
  /* цвет ссылки в темной теме */
}
.lightstyle-a {
  color: blue; 
  text-decoration:
   underline; 
   cursor: pointer
}
.darkstyle-a {
  color: #1976d2; 
  text-decoration:
   underline; 
   cursor: pointer
}
</style> 