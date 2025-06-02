<template>
    <div class="bg-ht se  bdbmr-5">
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
                <td>Quantité</td>
                <td class="c-w">{{ oneCompiledData.quantite_restant }}</td>
            </tr>
            <tr>
                <td>Prix de vente</td>
                <td class="c-w">{{ oneCompiledData.prix_vente }}</td>
            </tr>
            <tr>
                <td>Fractionner?</td>
                <td class="c-w"><input v-model="isDecimal" style="scale: 1.8;" type="checkbox"></td>
            </tr>
        </table>
        
    </div>
        <div style="display: block;">
            <button v-if="allowChange" class="btnComp" :class="[changeSuccessfull == 1 ? 'bg-g':'', changeSuccessfull == 404 ? 'bg-r':'']" @click="changeOneCompiled">Changer</button>
        </div>

        
    </div>
</template>

<script setup lang="ts">
import { reactive,ref, toValue, watch } from 'vue'
import { useKurungika } from '../../../../hooks/kuvoma'
import { useCounter } from '../../../../../store/incrementCounter'

const props = defineProps(['code_med'])
const emits = defineEmits(['quit'])

const allowChange = ref(true)
const codeMed = ref('')
const nomMed = ref('')
const isDecimal = ref(false)
const changeSuccessfull = ref(0)

const { incrementCounter } = useCounter()

const oneCompiled_url = 'api/gOps/setDecimal/'
const oneCompiledData = reactive({
    'code_med' : props.code_med,
    'request': 'get',
})


const [oneCompiled, getOneCompiled] = useKurungika(oneCompiledData, oneCompiled_url)
setTimeout(()=>{
    console.log("CPIL: " + oneCompiledData.code_med)
    
    getOneCompiled()
}, 300)

const changeOneCompiled = ()=>{
    // 
    // oneCompiled.code_med = 
    oneCompiledData.request = 'post'
    oneCompiledData.code_med = toValue(codeMed);
    oneCompiledData.is_decimal = toValue(isDecimal)
    getOneCompiled()
}
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
    oneCompiledData.is_decimal = value?.is_decimal;

    codeMed.value = value?.code_med ?? '';
    isDecimal.value = value?.is_decimal ?? false;
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
</style>