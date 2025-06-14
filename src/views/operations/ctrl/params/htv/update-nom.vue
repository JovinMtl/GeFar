<template>
    <div class="bg-w bg-ht se bdbmr-5">
    <div class="c-b" style="display: flex; justify-content: center;">
        <!-- Ici on va modifier le produits compile -->
         
        <table style="text-align: right;">
            <tr>
                <th>Element</th>
                <th><span class="c-t">____</span>Valeur</th>
            </tr>
            <tr>
                <td>ID</td>
                <td class="c-w">{{ oneCompiledData.code_med }}</td>
            </tr>
            <tr>
                <td>Désignation</td>
                <td class="c-w"><span class="c-t">____</span>{{ oneCompiledData.nom_med }}</td>
            </tr>
            <tr>
                <td>Prix de vente</td>
                <td class="c-w">{{ oneCompiledData.prix_vente }}</td>
            </tr>
        </table>
        
    </div>
        <div>
            <input id="nomMed" type="text" 
                placeholder="nouveau nom"
                v-model="nomMed">
            <label v-if="medExist" for="" class="ml-5 sm-l c-r">Ce nom existe déjà.</label>
        </div>
        <div style="display: block;">
            <button v-if="allowChange" class="btnComp" :class="[changeSuccessfull == 1 ? 'bg-g-1':'', changeSuccessfull == 404 ? 'bg-r':'']" @click="changeOneCompiled">Changer</button>
        </div>

        
    </div>
</template>

<script setup lang="ts">
import { nextTick, reactive,ref, toValue, watch } from 'vue'
import { useKurungika } from '../../../../hooks/kuvoma'
import { useCounter } from '../../../../../store/incrementCounter'

const props = defineProps(['code_med'])
const emits = defineEmits(['quit'])

const allowChange = ref(true)
const changeSuccessfull = ref(0)
const nomMed = ref(null)
const medExist = ref(false)

const { incrementCounter } = useCounter()

const oneCompiled_url = 'api/gOps/setIndivPrInterest/'
const oneCompiledData = reactive({
    'code_med' : props.code_med,
    'request': 'get',
})
const dataToSend = reactive({})
const [oneCompiled, getOneCompiled] = useKurungika(oneCompiledData, oneCompiled_url)

const updateNomMed_url = 'api/gOps/update_nom_med/'
const [repNomMed, updateNomMed] = useKurungika(dataToSend, updateNomMed_url)


setTimeout(()=>{
    console.log("CPIL: " + oneCompiledData.code_med)
    
    getOneCompiled()
}, 300)


// Functions
const nomMedExist = ()=>{
    medExist.value = true
    setTimeout(()=>{
        medExist.value = false
    }, 1300)
}
const changeOneCompiled = ()=>{
    // setting conditions
    dataToSend.code_med = props.code_med
    dataToSend.nom_med = nomMed.value
    updateNomMed()
}
// Watchers
watch(repNomMed, (value)=>{
    if (value?.response == 1){
        changeSuccessfull.value = 1;
        incrementCounter()
        setTimeout(()=>{
                emits("quit")
            }, 1000)
    }else if(value?.response == 404){
        changeSuccessfull.value = 404;
    }else if(value?.response == 0){
        nomMedExist()
    }
})
watch(oneCompiled, (value)=>{
    if(value?.response == 0){
        allowChange.value = false;
    }else if(value?.response == 1){
        changeSuccessfull.value = 1;
        incrementCounter()
        setTimeout(()=>{
                emits("quit")
            }, 1000)
    }else if(value?.response == 404){
        changeSuccessfull.value = 404;
    }
    console.log("One compiled : " + JSON.stringify(value))
    oneCompiledData.nom_med = value?.nom_med
    oneCompiledData.code_med = value?.code_med;
    oneCompiledData.quantite_restant = value?.quantite_restant;
    oneCompiledData.prix_vente = value?.prix_vente;
    oneCompiledData.is_pr_interest = value?.is_pr_interest;
    oneCompiledData.pr_interest = value?.pr_interest;
})
nextTick(()=>{
    document.getElementById('nomMed').focus()
})

</script>

<style scoped>
th{
    margin: 0 15px;
}
.btnComp{
    margin: 5px;
    padding: 5px;
}
input::placeholder{
    color: gray;
    font-size: 0.8rem;
}
</style>