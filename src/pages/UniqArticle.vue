<template>
    <div>
        <h4>{{ ArticleName }}</h4>
        <div v-html='ArticleText'></div>  
        
    </div>
    
 </template>
 
 <script>
import { ref, onMounted, toRefs, defineProps } from 'vue'
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

 export default {
    
   name: 'UniqArticle',
   props: ['id_test'],
   setup(props){
    const ArticleText = ref(null)
    const ArticleName = ref('')
    onMounted(() => {
            getDataTest()
        })
    function getDataTest() {
            api.get('/records/tests')
                .then((response) => {
                    if (response.data) {
                        ArticleText.value = response.data.records.filter(x => x.id_test == props.id_test)[0].article
                        ArticleName.value = response.data.records.filter(x => x.id_test == props.id_test)[0].name_test
                        //console.log('getDataTest', response.data.records.filter(x => x.id_test == props.id_test))
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
                getDataTest,ArticleText, ArticleName
      }
   }
   
}
 </script>