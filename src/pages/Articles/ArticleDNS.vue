<template>
<q-page class = "q-ml-md q-mt-md">
    <q-btn class = "q-ml-md q-mt-md" color="primary" label="Тренировочный тест" @click="navigate('/TestDNS','true')"/>
    <q-btn class = "q-ml-md q-mt-md" color="red" label="Пройти тест" @click="navigate('/TestDNS','false')"/>
      
    <h4>{{ test_data.name_test }}</h4>
    
    <div v-html ="test_data.article" ></div>
        
    
</q-page>
</template>
<script>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router';
  import { api } from 'boot/axios'

export default {
   name: 'ArticleDNS',
   setup(){
      const router = useRouter();

      const test_data = ref('null')
  
        function navigate(path, tren) {
          router.push({
            path: path, 
            params: {typeTren: tren}
            })
        }

        onMounted(() => {
            getDataTest()
        })

        function getDataTest() {
            api.get('/records/tests')
                .then((response) => {
                    if (response.data) {
                        
                        console.log('getDataTest', response.data.records)
                        test_data.value = response.data.records[0]
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
        navigate, test_data
      }
     }
}

</script>
     