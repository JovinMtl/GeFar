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
            <tr>
                <td>Voulez-vous prix de vente fixe ?</td>
                <td class="c-w"><input v-model="oneCompiledData.is_prix_vente_fixed" style="scale: 1.8; transform: translate(-20%);" type="checkbox"></td>
            </tr>
            <tr class="c-w" v-if="oneCompiledData.is_prix_vente_fixed">
                <td>Nouveau Prix de vente</td>
                <td><input v-model="oneCompiledData.new_prix_vente" style="width: 100px;" type="number"></td>
            </tr>
        </table>
        
    </div>
        <div style="display: block;">
            <button v-if="allowChange" class="btnComp" :class="[changeSuccessfull == 2 ? 'bg-o':'', changeSuccessfull == 404 ? 'bg-r':'']" @click="setFixedPriceFn">Changer</button>
        </div>
        <div class="c-r" v-if="errorMessage">{{ errorMessage }}</div>

        
    </div>
</template>

<script setup lang="ts">
import { reactive,ref, watch } from 'vue'
import type { Ref } from 'vue'
import { useKurungika } from '../../../../hooks/kuvoma'
import { useCounter } from '../../../../../store/incrementCounter'

const props = defineProps(['code_med'])
const emits = defineEmits(['quit'])

const allowChange = ref(true)
const changeSuccessfull = ref(0)
const errorMessage: Ref<string> = ref('')

const { incrementCounter } = useCounter()

const oneCompiled_url = 'api/gOps/setIndivPrInterest/'
const oneCompiledData = reactive({
    'code_med' : props.code_med,
    'request': 'get',
})

const setFixedPriceUrl = 'api/gOps2/set_fixed_prix_vente/'
const [setFixedPriceUrlResponse, setFixedPrice] = useKurungika(oneCompiledData, setFixedPriceUrl)

const [oneCompiled, getOneCompiled] = useKurungika(oneCompiledData, oneCompiled_url)
setTimeout(()=>{
    console.log("CPIL: " + oneCompiledData.code_med)
    
    getOneCompiled()
}, 300)

//Functions
function setFixedPriceFn(){
    oneCompiledData.request = undefined
    oneCompiledData.quantite_restant = undefined
    oneCompiledData.prix_achat = undefined
    oneCompiledData.nom_med = undefined
    
    setFixedPrice()
}


//Watchers
watch(setFixedPriceUrlResponse, (value)=>{
    if(value?.status == 200){
        emits('quit')
    }else if(value?.status == 401){
        errorMessage.value = value?.message
        setTimeout(()=>{
            errorMessage.value = ''
        }, 1200)
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
    oneCompiledData.prix_achat = value?.prix_achat;
    oneCompiledData.prix_vente = value?.prix_vente;
    oneCompiledData.is_prix_vente_fixed = value?.is_prix_vente_fixed;
    oneCompiledData.new_prix_vente = value?.prix_vente;
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