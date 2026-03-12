<template>
    <div class="bg-w bg-ht se bdbmr-5">
        <div class="c-b" style="display: flex; justify-content: center; max-height: 120px; overflow: scroll;">

            <table style="text-align: right;">
                <tr>
                    <th >Date entrant</th>
                    <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Date Per.</th>
                    <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Unité</th>
                    <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Prix A.</th>
                    <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Prix V.</th>
                    <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Qte 1.</th>
                    <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Qte 2.&nbsp;</th>
                    <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nom med.</th>
                </tr>
                <tr v-for="(umuti, index) in oneCompiled">
                    <td class="c-g-2" :title="'Avec code: ' + umuti.code_operation">{{ String(umuti.date_entrant).slice(0, 10) }}</td>
                    <td class="pointer" title="Modifier cette opération." 
                        :data-index="index" @click="openDataR">
                        &nbsp;
                        {{ (umuti.date_peremption).slice(0, 10) }}
                    </td>
                    <td class="pointer sm-l c-w" title="considerer cette unité">&nbsp;
                        <button @click="confirmUnitFn" :data-b="umuti.code_med+';'+umuti.med_unit" class="btn bg-b-1">{{ getMedUnitName(medUnits, umuti.med_unit) }}</button>
                        
                    </td>
                    <td class="pointer">&nbsp;{{ umuti.prix_achat }}</td>
                    <td class="c-g-2">&nbsp;{{ umuti.prix_vente }}</td>
                    <td class="c-w">&nbsp;{{ umuti?.quantite_initial }}</td>
                    <td class="c-w">&nbsp;{{ umuti?.quantite_restant }}&nbsp;</td>
                    <td class="c-g-2">&nbsp;{{ String(umuti.nom_med).slice(0, 20) }}</td>
                    <td :data-index="index"><button class="bg-a-1" title="Modifier cette opération." 
                        @click="openDataB">
                        <span v-if="!mAchatIsOpen">Modifier</span>
                        <span v-else>Annuler</span>
                    </button>
                    </td>
                </tr>
            </table>
            
        </div>
        <button id="confirm" 
            command="show-modal" 
            commandfor="my-dialog"
            style="display: none;">Open dialog</button>

        <dialog id="my-dialog">
        <p>Voulez-vous vraiment utiliser <span class="c-b-1">{{ getMedUnitName(medUnits, data.med_unit_id) }} </span> comme unité principale?</p>
        <button @click="confirm=true" class="btn bg-b m-10" commandfor="my-dialog" command="close">Oui</button>
        <button @click="confirm=false" class="btn m-10" commandfor="my-dialog" command="close">Non</button>
        </dialog>
        <mAchat v-if="mAchatIsOpen"
            @done-update="closemAchat"
            @close-mod-achat="closemAchat" 
            :umutiData="oneCompiled[actualId]"/> 
    </div>
</template>

<script setup lang="ts">
import { reactive,ref, toValue, watch } from 'vue'
import type { Ref } from 'vue'
import { useKurungika , useKuvoma} from '../../../../hooks/kuvoma'
import { useCounter } from '../../../../../store/incrementCounter'
import mAchat from './updateAchat/m-achat.vue'

import { getMedUnitName } from '../../../../hooks/useGetMedUnit' 

const props = defineProps(['code_med'])
const emit = defineEmits(['quit'])
const allowChange = ref(true)
const changeSuccessfull = ref(0)
const mAchatIsOpen: Ref<boolean> = ref(false)
const confirm: Ref<boolean> = ref(false)
const actualId = ref(0)
const data = reactive({
    code_med : '',
    med_unit_id : ''
})

// const { incrementCounter } = useCounter()

const oneCompiled_url = 'api/gOps/setPachatEntree/'
const oneCompiledData = reactive({
    'code_med' : props.code_med,
    'request': 'get',
})

const url_local = '//127.0.0.1:8002'
const url_getMedUnit = 'api/gOps/getMedUnit/'
const [medUnits, getMedUnit] = useKuvoma(url_getMedUnit, url_local)
getMedUnit()


const [oneCompiled, getOneCompiled] = useKurungika(oneCompiledData, oneCompiled_url)
setTimeout(()=>{
    getOneCompiled()
}, 300)

const url_confirmUnit = 'api/gOps/unit_confirm/'
const [confirmUnitResponse, confirmUnit] = useKurungika(data, url_confirmUnit)


// Functions
function confirmUnitFn(elm){
    const dataB = elm.target.getAttribute('data-b')
    data.code_med = dataB.split(';')[0]
    data.med_unit_id = dataB.split(';')[1]
    document.getElementById('confirm').click()
}
const closemAchat = ()=>{
    setTimeout(()=>{
        mAchatIsOpen.value=false
    }, 1000)
}
const openDataR = (e)=>{
    const id = e.target.getAttribute('data-index');
    actualId.value = Number(id)
    console.log("The id: " + id)
    mAchatIsOpen.value = !mAchatIsOpen.value;
}
const openDataB = (e)=>{
    const id = e.target.parentNode.parentNode.getAttribute('data-index');
    actualId.value = Number(id)
    console.log("The id: " + id)
    mAchatIsOpen.value = !mAchatIsOpen.value;
}
//watchers
watch(confirmUnitResponse, (value)=>{
    if(value?.status==200){
        setTimeout(()=>{
            emit('quit')
        }, 1000)   
    }
})
watch(confirm, (value)=>{
    if(value){
        confirmUnit()
        confirm.value = false
    }
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
})
</script>

<style scoped>
th{
    margin: 0 15px;
}
.btnComp{
    margin: 15px;
    /* padding: 5px; */
}
td > button{
    border-radius: 5px;
    margin: 0 10px;
    padding: 2px 5px;
}
</style>