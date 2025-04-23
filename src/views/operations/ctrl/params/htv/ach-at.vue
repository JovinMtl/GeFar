<template>
    <div class="bg-w bg-ht se bdbmr-5">
        <div class="c-b" style="display: flex; justify-content: center; max-height: 80px; overflow: scroll;">
            <!-- Ici on va modifier le produits compile -->
            
            <table style="text-align: right;">
                <tr>
                    <th >Date entrant</th>
                    <th><span class="c-t">____</span>Date Per.</th>
                    <th><span class="c-t">____</span>Prix A.</th>
                    <th><span class="c-t">____</span>Prix V.</th>
                    <th><span class="c-t">____</span>Forme</th>
                    <th><span class="c-t">____</span>Nom med.</th>
                </tr>
                <tr v-for="(umuti, index) in oneCompiled">
                    <td class="c-g-2">{{ String(umuti.date_entrant).slice(0, 10) }}</td>
                    <td class="pointer" title="Modifier cette opération." 
                        :data-index="index" @click="openData">
                        <span class="c-t">____</span>
                        {{ (umuti.date_peremption).slice(0, 10) }}
                    </td>
                    <td class="pointer"><span class="c-t">____</span>{{ umuti.prix_achat }}</td>
                    <td class="c-g-2"><span class="c-t">____</span>{{ umuti.prix_vente }}</td>
                    <td class="c-w"><span class="c-t">____</span>{{ umuti.forme }}</td>
                    <td class="c-w"><span class="c-t">____</span>{{ String(umuti.nom_med).slice(0, 20) }}</td>
                    <td><button class="bg-a-1" title="Modifier cette opération." 
                        :data-index="index" @click="openData">Modifier</button>
                    </td>
                </tr>
            </table>
            
        </div>
        <div style="display: block;">
            <button v-if="allowChange" class="btnComp" 
                :class="[changeSuccessfull == 2 ? 'bg-o':'', changeSuccessfull == 404 ? 'bg-r':'']" 
                @click="changeOneCompiled">
                Changer
            </button>
        </div>
        <mAchat v-if="mAchatIsOpen"
            @done-update="closemAchat" :umutiData="oneCompiled[actualId]"/> 
    </div>
</template>

<script setup lang="ts">
import { reactive,ref, toValue, watch } from 'vue'
import type { Ref } from 'vue'
import { useKurungika } from '../../../../hooks/kuvoma'
import { useCounter } from '../../../../../store/incrementCounter'
import mAchat from './updateAchat/m-achat.vue'

const props = defineProps(['code_med'])
const allowChange = ref(true)
const changeSuccessfull = ref(0)
const inputValue = ref(null)
const cellIndex = ref(null)
const dataAttribute = ref(null)
const modifiedIndexes = ref([])
const modifiedObj = reactive({})

const { incrementCounter } = useCounter()

const oneCompiled_url = 'api/gOps/setPachatEntree/'
const oneCompiledData = reactive({
    'code_med' : props.code_med,
    'request': 'get',
})
const medAchats = ref([])
const actualId = ref(0)


const [oneCompiled, getOneCompiled] = useKurungika(oneCompiledData, oneCompiled_url)
setTimeout(()=>{
    console.log("CPIL: " + oneCompiledData.code_med)
    
    getOneCompiled()
}, 300)

const inpuTypes = {
    'date_peremption': 'date',
    'prix_achat': 'number',
}
const createdNodes = ref([])
const mAchatIsOpen: Ref<boolean> = ref(false)

// Functions
const closemAchat = ()=>{
    setTimeout(()=>{
        mAchatIsOpen.value=false
    }, 3000)
}
const openData = (e)=>{
    const id = e.target.getAttribute('data-index');
    actualId.value = Number(id)
    console.log("The id: " + id)
    mAchatIsOpen.value = true;
}
const editData = (e)=>{
    if (toValue(e.target.getAttribute('data-index'))){
        cellIndex.value = e.target.getAttribute('data-index')
        dataAttribute.value = e.target.getAttribute('data-attr')
    }
    const idElm = toValue(cellIndex) + toValue(dataAttribute)

    console.log("THe fresh attr: " + toValue(dataAttribute))

    if (createdNodes.value.indexOf(idElm) >= 0){
        return
    }

    const newInputElm = document.createElement('input');
    // let editDatanewInputElmValue = null;
    newInputElm.setAttribute('type', inpuTypes[toValue(dataAttribute)]);
    newInputElm.setAttribute('id', `i_${idElm}`)
    newInputElm.addEventListener('blur', ()=>{
        inputValue.value = newInputElm.value
        newInputElm.style.display = 'none';
        let id_index = createdNodes.value.indexOf(idElm);
        delete createdNodes.value[id_index];
        if (modifiedObj[toValue(cellIndex)]){
            console.log("now does exist." + toValue(dataAttribute))
            // modifiedObj[toValue(cellIndex)].add(toValue(dataAttribute))
            modifiedObj['0'].add(toValue(dataAttribute))
            console.log("result: " + JSON.stringify(modifiedObj['0']))
        } else{
            console.log("did not exist")
            modifiedObj[toValue(cellIndex)] = new Set()
        }
        })
    newInputElm.removeEventListener('click', this)
    newInputElm.style.width = '9vw';

    const elm = document.getElementById(idElm)
    const elm_ = elm.append(newInputElm)
    createdNodes.value.push(idElm)

    
    modifiedIndexes.value.push(toValue(cellIndex));
    // elm.appendChild = newInputElm;
    // elm.style.display = 'none';
    console.log("we want to edit: " + 
        cellIndex + ':' + dataAttribute + 
        ' forms id: ' + idElm + " the Elm:" + 
        elm + ' and: ' + newInputElm);
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
watch(dataAttribute, (value)=>{
    console.log("The dataAttribute changes into :" + value)
})
watch(inputValue, (value)=>{
    // console.log("The input changes into : " + toValue(inputValue))
    // let cleanData = null;
    // if (toValue(dataAttribute) == 'date_peremption'){
    //     cleanData = new Date(toValue(inputValue))
    // } else if (toValue(dataAttribute) == 'number'){
    //     cleanData = Number(toValue(inputValue))
    // }
    console.log("modified on: " + JSON.stringify(medAchats.value[toValue(cellIndex)][toValue(dataAttribute)]))
    // console.log("The attr: " + JSON.stringify(toValue(dataAttribute)))
    medAchats.value[toValue(cellIndex)][toValue(dataAttribute)] = toValue(inputValue);
    console.log("The all: " + JSON.stringify(toValue(modifiedObj)))

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
    medAchats.value = value;
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
td > button{
    border-radius: 5px;
    margin: 0 10px;
    padding: 5px;
}
</style>