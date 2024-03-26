<template>
    {{  group }}
    <q-page v-if="list_test">
        <div v-for="(q,index) in list_test" class="q-pa-md" :key="index">
            {{ index+1 }}.{{ " "+q.question_text }}
            <q-option-group
            :options="q.answers"
            color="primary"
            v-model="group[index]"
            />
            <span :style="'color: ' + (group[index] == q.correct ? 
                'green' : 
                'red')">
                    {{ group[index] >=0 ? 
                    (group[index] == q.correct ? 'Правильный ответ!' : 'Неправильный ответ!') : 
                    '' }}
            </span>
        
        </div>
    </q-page>
</template>
<script>
import { ref, onMounted, toRefs, defineProps, watchEffect } from 'vue'
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

 export default {
    
   name: 'UniqArticle',
   props: ['id_test'],
   setup(props){
    
    const ListQuestions = ref([])
    const ListAnswers = ref([])
    const list_test = ref([])
    const group = ref([])

    onMounted(() => {
            getDataTest()
            getAnswers()
        })
    watchEffect(()=>{
        if (ListQuestions.value.length && ListAnswers.value){
            list_test.value = ListQuestions.value.map(x => {
                let quests = ListAnswers.value.filter(a => a.id_question == x.id_question).map((q,index)=>{
                    return {
                        label: q.text_answer,
                        value: index,
                        color: q.is_correct ? 'green' : 'red',
                        is_correct : q.is_correct
                    }
                })
                let correct = quests.findIndex(a => a.is_correct === true)
                return {
                    correct: correct,
                    answers: quests,
                    ...x
                }
            })
            console.log('lt',list_test)
        }
    })
    function getDataTest() {
        api.get('/records/questions?id_test='+props.id_test)
                .then((response) => {
                    if (response.data) {
                        
                        ListQuestions.value = response.data.records//.filter(x => x.id_test == props.id_test)
                        console.log('getDataTest' , ListQuestions.value)
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
            
    function getAnswers() {
        api.get('/records/answers')
                .then((response) => {
                    if (response.data) {
                        
                        ListAnswers.value = response.data.records
                        console.log('getDataTest' , ListAnswers.value)
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
                getDataTest,ListQuestions,ListAnswers, getAnswers, list_test, group
      }
   }
   
}
 </script>