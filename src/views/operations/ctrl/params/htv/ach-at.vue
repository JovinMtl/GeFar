<template>
    <div class="bg-w bg-ht se bdbmr-5">
    <div class="c-b" style="display: flex; justify-content: center;">
        <!-- Ici on va modifier le produits compile -->
         
        <table style="text-align: right;">
            <tr>
                <th >Date entrant</th>
                <th><span class="c-t">____</span>Date Per.</th>
                <th><span class="c-t">____</span>Prix A.</th>
                <th><span class="c-t">____</span>Prix V.</th>
                <th><span class="c-t">____</span>Forme</th>
                <th><span class="c-t">____</span>Classe Ther.</th>
            </tr>
            <tr v-for="(umuti, index) in oneCompiled">
                <td class="c-g-2">{{ String(umuti.date_entrant).slice(0, 10) }}</td>
                <td class="pointer" @click="editData" :id="index + 'date_peremption'" :data-index="index" data-attr="date_peremption"><span class="c-t">____</span>{{ (umuti.date_peremption).slice(0, 10) }}</td>
                <td class="pointer" @click="editData" :id="index + 'prix_achat'" :data-index="index" data-attr="prix_achat"><span class="c-t">____</span>{{ umuti.prix_achat }}</td>
                <td class="c-g-2"><span class="c-t">____</span>{{ umuti.prix_vente }}</td>
                <td class="c-w"><span class="c-t">____</span>{{ umuti.forme }}</td>
                <td class="c-w"><span class="c-t">____</span>{{ umuti.classe_med }}</td>
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
const inputValue = ref(null)

const { incrementCounter } = useCounter()

const oneCompiled_url = 'api/gOps/setPachatEntree/'
const oneCompiledData = reactive({
    'code_med' : props.code_med,
    'request': 'get',
})


const [oneCompiled, getOneCompiled] = useKurungika(oneCompiledData, oneCompiled_url)
setTimeout(()=>{
    console.log("CPIL: " + oneCompiledData.code_med)
    
    getOneCompiled()
}, 300)

const inpuTypes = {
    'date_peremption': 'date',
    'prix_achat': 'number',
}

// Functions
const editData = (e)=>{
    const cellIndex = e.target.getAttribute('data-index')
    const dataAttribute = e.target.getAttribute('data-attr')
    const idElm = cellIndex + dataAttribute

    let newInputElm = document.createElement('input');
    // let newInputElmValue = null;
    newInputElm.setAttribute('type', inpuTypes[dataAttribute]);
    newInputElm.setAttribute('id', `i_${idElm}`)
    newInputElm.addEventListener('blur', ()=>{
        inputValue.value = newInputElm.value
    })
    newInputElm.style.width = '9vw';

    const elm = document.getElementById(idElm)
    const elm_ = elm.append(newInputElm)
    // elm.appendChild = newInputElm;
    // elm.style.display = 'none';
    console.log("we want to edit: " + cellIndex + ':' + dataAttribute + ' forms id: ' + idElm + " the Elm:" + elm + ' and: ' + newInputElm)
}

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
    oneCompiledData.code_operation = 'jove';
    
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

//watchers
watch(inputValue, (value)=>{
    console.log("The input changes into : " + toValue(inputValue))
})
watch(oneCompiled, (value)=>{
    if(value?.response == 0){
        allowChange.value = false;
    }else if(value?.response == 1){
        changeSuccessfull.value = 1;
        // incrementCounter()
    }else if(value?.response == 404){
        changeSuccessfull.value = 404;
    }
    console.log("One compiled : " + JSON.stringify(value))
    // oneCompiledData.nom_med = value?.nom_med
    // oneCompiledData.code_med = value?.code_med;
    // oneCompiledData.prix_achat = value?.prix_achat;
    // oneCompiledData.prix_vente = value?.prix_vente;
    // oneCompiledData.quantite_restant = value?.quantite_restant;
    // oneCompiledData.date_entrant = value?.date_entrant;
    // oneCompiledData.date_peremption = value?.date_peremption;
    // oneCompiledData.forme = value?.forme;
    // oneCompiledData.classe_med = value?.classe_med;
    // oneCompiledData.sous_classe_med = value?.sous_classe_med;
})
</script>

<style scoped>
th{
    margin: 0 15px;
}
.btnComp{
    margin: 15px;
    padding: 5px;
}
</style>