<template>
    <div style="position: absolute;
        /* transform: translate(0%, 50%); */
        margin-top: 15px;
        width: 100%; height: 60%; display: flex;
        justify-content: right;"> 
        <div class="bg-ht" style="max-width: 30%; max-height: 150%;overflow: scroll;">
            <!-- here we modify achats: {{ props.umutiData }} -->
             <!-- <br> -->
             <label for="">Date Per.</label>
             <input class="bg-b-1" type="date" v-model="date_peremption" /><br>
             <label for="">Prix A.</label>
             <input class="bg-b-1" type="number" v-model="prix_achat"/><br>
             <label for="">Qte</label>
             <input class="bg-b-1" type="number" v-model="quantite_initial"><br>
             <input class="bg-b-1" type="button" value="Confirmer"
                :class="[oneCompiled?.response==200 ? 'bg-g-1':'', oneCompiled?.response==404 ? 'bg-r':'']"
                @click="updateAchat"/><br>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, toValue, watch } from 'vue'
import { useKurungika } from '../../../../../hooks/kuvoma'

const props = defineProps(['umutiData']);
const emit = defineEmits(['done-update'])

const date_peremption = ref(props.umutiData.date_peremption)
const prix_achat = ref(props.umutiData.prix_achat)
const quantite_initial = ref(props.umutiData.quantite_initial)
const code_med = props.umutiData.code_med;
const code_operation = props.umutiData.code_operation;

const objAPI = reactive({
    'request': 'post',
    'code_med': props.umutiData.code_med,
    'code_operation':  props.umutiData.code_operation,
    'quantite_initial': 0,
    'prix_achat': 0,
    'date_peremption': 0
})
const updateAchat = ()=>{
    objAPI.request = 'post';
    objAPI.quantite_initial = toValue(quantite_initial);
    objAPI.prix_achat = toValue(prix_achat);
    objAPI.date_peremption = toValue(date_peremption);

    updateAchatEntree()
}
const oneCompiled_url = 'api/gOps/setPachatEntree/'
const [oneCompiled, updateAchatEntree] = useKurungika(objAPI, oneCompiled_url)


watch(oneCompiled, (value)=>{
    if (value.response == 200){
        console.log("It is well done")
        emit('done-update')
    } else if(value.response == 404){
        console.log("Not found")
    }
})
</script>

<style scoped>
label{
    color: blue;
}
</style>