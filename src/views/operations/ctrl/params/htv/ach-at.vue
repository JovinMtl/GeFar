<template>
    <div class="bg-w bg-ht se bdbmr-5">
        <div class="c-b" style="display: flex; justify-content: center; max-height: 80px; overflow: scroll;">

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
                        :data-index="index" @click="openData">
                        <span v-if="!mAchatIsOpen">Modifier</span>
                        <span v-else>Annuler</span>
                    </button>
                    </td>
                </tr>
            </table>
            
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
    }, 3000)
}
const openData = (e)=>{
    const id = e.target.getAttribute('data-index');
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