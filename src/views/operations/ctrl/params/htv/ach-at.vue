<template>
    <div class="bg-w bg-ht se bdbmr-5">
        <div class="c-b" style="display: flex; justify-content: center; max-height: 80px; overflow: scroll;">

            <table style="text-align: right;">
                <tr>
                    <th >Date entrant</th>
                    <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Date Per.</th>
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
        <mAchat v-if="mAchatIsOpen"
            @done-update="closemAchat"
            @close-mod-achat="closemAchat" 
            :umutiData="oneCompiled[actualId]"/> 
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

// const { incrementCounter } = useCounter()

const oneCompiled_url = 'api/gOps/setPachatEntree/'
const oneCompiledData = reactive({
    'code_med' : props.code_med,
    'request': 'get',
})
const actualId = ref(0)


const [oneCompiled, getOneCompiled] = useKurungika(oneCompiledData, oneCompiled_url)
setTimeout(()=>{
    getOneCompiled()
}, 300)

const mAchatIsOpen: Ref<boolean> = ref(false)

// Functions
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
    padding: 5px;
}
td > button{
    border-radius: 5px;
    margin: 0 10px;
    padding: 5px;
}
</style>