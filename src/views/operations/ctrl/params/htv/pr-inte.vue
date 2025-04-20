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
            <!-- <tr>
                <td>Quantité</td>
                <td class="c-w">{{ oneCompiledData.quantite_restant }}</td>
            </tr> -->
            <tr>
                <td>Prix de vente</td>
                <td class="c-w">{{ oneCompiledData.prix_vente }}</td>
            </tr>
            <tr>
                <td>Intéret individuel?</td>
                <td class="c-w"><input v-model="oneCompiledData.is_pr_interest" style="scale: 1.8; transform: translate(-20%);" type="checkbox"></td>
            </tr>
            <tr v-if="oneCompiledData.is_pr_interest">
                <td>Nouveau taux</td>
                <td class="c-w"><input v-model="oneCompiledData.pr_interest" style="width: 100px;" type="number"></td>
                <td class="sm-l"  :class="[changeSuccessfull == 1 ? 'c-w':'', changeSuccessfull == 404 ? 'c-r':'']"><span class="c-t">____</span>ex: 1.2 ~ 1.99 ou bien 11 ~ 99</td>
            </tr>
        </table>
        
    </div>
        <div style="display: block;">
            <button v-if="allowChange" class="btnComp" :class="[changeSuccessfull == 2 ? 'bg-o':'', changeSuccessfull == 404 ? 'bg-r':'']" @click="changeOneCompiled">Changer</button>
        </div>

        
    </div>
</template>

<script setup lang="ts">
import { reactive,ref, toValue, watch } from 'vue'
import { useKurungika } from '../../../../hooks/kuvoma'
import { useCounter } from '../../../../../store/incrementCounter'

const props = defineProps(['code_med'])
const allowChange = ref(true)
const changeSuccessfull = ref(0)

const { incrementCounter } = useCounter()

const oneCompiled_url = 'api/gOps/setIndivPrInterest/'
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
    // setting conditions
    let c1_1 = oneCompiledData.pr_interest > 1;
    let c1_2 = oneCompiledData.pr_interest < 2;
    let c1 = c1_1 && c1_2;

    let c2_1 = oneCompiledData.pr_interest > 10;
    let c2_2 = oneCompiledData.pr_interest < 99;
    let c2 = c2_1 && c2_2

    if (c2_1){
        oneCompiledData.pr_interest = 1 + (oneCompiledData.pr_interest / 100)
    }

    // The combined condition
    let condCombined =  c1 || c2
    let allConditions = oneCompiledData.is_pr_interest && condCombined
    console.log("Should pass? " + condCombined + ":" + allConditions)

    // oneCompiled.code_med = 
    oneCompiledData.request = 'post'
    oneCompiledData.code_med = oneCompiledData.code_med;
    oneCompiledData.is_pr_interest = oneCompiledData.is_pr_interest
    
    if (!(oneCompiledData.is_pr_interest)){
        // Should come to normal
        changeSuccessfull.value = 2
    } else if (allConditions){
        oneCompiledData.pr_interest = oneCompiledData.pr_interest
        changeSuccessfull.value = 2;
    } else if (!condCombined){
        changeSuccessfull.value = 404;
        return
    }
    
    getOneCompiled()
}
watch(oneCompiled, (value)=>{
    if(value?.response == 0){
        allowChange.value = false;
    }else if(value?.response == 1){
        changeSuccessfull.value = 1;
        incrementCounter()
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