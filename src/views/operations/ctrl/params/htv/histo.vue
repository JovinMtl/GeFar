<template>
    <div class="bg-ht se  bdbmr-5">
    <div class="c-b" style="display: flex; justify-content: center;">
        <!-- Ici on va modifier le produits compile -->
         
        <table style="text-align: right;">
            <tr>
                <th>Nom</th>
                <th><span class="c-t">____</span>Qte</th>
                <th><span class="c-t">____</span>Px.V</th>
                <th><span class="c-t">____</span>code</th>
                <th><span class="c-t">____</span>Date</th>
                <th><span class="c-t">____</span>Qui?</th>
            </tr>
            <tr v-for="med in meds">
                <td>{{ med.nom_med }}</td>
                <td><span class="c-t">____</span>{{ med.quantity }}</td>
                <td><span class="c-t">____</span>{{ med.prix_vente }}</td>
                <td><span class="c-t">____</span>{{ med.code_operation_entrant }}</td>
                <td><span class="c-t">____</span>{{ useReadableDateTimeSeparate(med.date_operation)[0] }} 
                    <span class="c-w">{{ useReadableDateTimeSeparate(med.date_operation)[1] }}</span></td>
                <td><span class="c-t">____</span>{{ med.operator }}</td>
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
import { 
    useReadableDateTime, 
    useReadableDateTimeSeparate
} from '../../../../hooks/useReadableDate'

const props = defineProps(['code_med'])
const emits = defineEmits(['quit'])

const allowChange = ref(true)
const codeMed = ref('')
const meds = ref([])

const { incrementCounter } = useCounter()

// const oneCompiled_url = 'api/gOps2/set_last_prix_vente/'
const histoVentesUrl = 'api/gOps2/histo_vente/'
const initData = reactive({
    'code_med' : props.code_med,
    'request': 'get',
})


const [histoVentes, getHistoVentes] = useKurungika(initData, histoVentesUrl)
setTimeout(()=>{
    console.log("CPIL: " + initData.code_med)
    
    getHistoVentes()
}, 300)

watch(histoVentes, (value)=>{
    meds.value = value
})
</script>

<style scoped>
th{
    margin: 0 15px;
    color: rgb(19, 54, 119);
    border: 2px solid grey;
    text-align: center;
}
.btnComp{
    margin: 5px;
    padding: 5px;
}
</style>