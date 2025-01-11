<template>
    <div>
        <label class="little-lab" for="client">Client:</label>
        <input
            v-model="selectedClient"
            style="width: 100px;margin:0 20px;"
            list="clients" name="client" id="client">

        <datalist id="clients">
            <option v-for="client in clients" :value="client.beneficiaire">{{ client.nom_adherant }}</option>
        </datalist>
        <input v-if="need_add_client" type="button" @click="need_new_client=true"
            value="+" class="bg-g" />
        <input v-show="need_new_client" type="button" @click="need_new_client=false"
            value="x" class="s1-cl bg-r"/>
        <!-- clInfo component should be here. -->
        <createClient v-if="need_new_client" @clData="getclData"/>
        
        <div  v-if="existingClient && !need_add_client && selectedClient">
            <input type="number"
                v-model="previous_rate_assure"
                placeholder="Taux d'assurance">
            <input type="button" value="Ok" />
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref, Ref, watch } from 'vue'
import { 
    useKurungika, useKuvoma
} from '../../hooks/kuvoma.js'
import { baseURL } from '../../../store/host.js'
import createClient from './create-client.vue'

// Communication way
const props = defineProps(['rate_assu_p'])
const emit = defineEmits(['rate_assu_e'])

// Refs
const selectedClient: Ref<string | null> = ref(null)
const dataClient = null
const need_new_client: Ref<boolean> = ref(false)
const need_add_client: Ref<boolean> = ref(false)
const previous_rate_assure:Ref<number|null> = ref(null)
const existingClient: Ref<boolean> = ref(false)

// Simple Variables
let nom_adherant: string = ''
let employeur: string = ''
let nom_beneficiaire: string = ''
let relation: string = ''
let rateAssu: number = 0

// Simple console.log for test
console.log("the rate_assure:", props.rate_assu_p)

// Composables
const url_local: string = baseURL
const url_addClient = "api/gOps/addClient/"
const [addCliResp, addClient] = useKurungika(dataClient, url_addClient)

const url_getClients = "api/gOps/getClients/"
const [clients, getClients] = useKuvoma(url_getClients, url_local)
getClients()

// Functions
const getclData = (data:CreatedClient)=>{
    // We catch the emitted data from createClient component
    nom_adherant = data.nomAd
    employeur = data.employeur
    relation = data.relation
    nom_beneficiaire = data.nomBen
    rateAssu = data.rateAssu
    console.log("Now the assuRate:", rateAssu)
    emit('rate_assu_e', rateAssu)
}

// Watchers
watch(previous_rate_assure, (value)=>{
    if((Number(value))>=0 && 
        (Number(value))<=100){
        // signal the change of rate_assure
        emit('rate_assu_e', value)
    }
})
watch(selectedClient, (value)=>{
    if(value=='Nouveau'){
        need_add_client.value = true
    } else{
        need_add_client.value = false
        need_new_client.value = false
        existingClient.value = true

        setTimeout(()=>{
            previous_rate_assure.value = props.rate_assu_p
        }, 1500)
    }
    if(! value){
        previous_rate_assure.value = null
    }
})
</script>