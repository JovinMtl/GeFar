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
        <input v-show="need_new_client" type="button" 
            @click="need_new_client=false;
                selectedClient=''"
            value="x" class="s1-cl bg-r"/>
        <!-- clInfo component should be here. -->
        <createClient v-if="need_new_client" @clData="getclData"/>
        
        <div  v-if="existingClient && !need_add_client && selectedClient">
            <input type="number"
                v-model="previous_rate_assure"
                placeholder="Taux d'assurance">
            <input type="number" v-model="numBon"
                placeholder="Numero du Bon" />
                <br>
            <label class="little-lab">Date préscr.</label>
            <input type="date" 
                class="w-7"
                v-model="date_prescr"/>
            <input type="button" class="ml-5" 
                value="Ok" 
                @click="checkCliAssu"/>
            <span v-show="message1"
                class="c-r sm-l ml-5">{{ message1 }}</span>
            <span v-show="message2"
                class="c-g sm-l ml-5 fw-8">{{ message2 }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref, Ref, watch } from 'vue'
import { 
    useKurungika, useKuvoma
} from '../../hooks/kuvoma.js'
import { baseURL } from '../../../store/host.js'
import { 
    KnownClient, CreatedClient
} from '../../layout/types'
import createClient from './create-client.vue'

// Communication way
const props = defineProps(['rate_assu_p'])
const emit = defineEmits(['rate_assu_e', 'cli-assu-data'])

// Refs
const selectedClient: Ref<string | null> = ref(null)
const dataClient = null
const need_new_client: Ref<boolean> = ref(false)
const need_add_client: Ref<boolean> = ref(false)
const previous_rate_assure:Ref<number|null> = ref(null)
const existingClient: Ref<boolean> = ref(false)
const numBon: Ref<number|null> = ref(null)
const message1: Ref<string> = ref('')
const message2: Ref<string> = ref('')
const date_prescr = ref(null)

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
const checkCliAssu = ()=>{
    // Here should emit after a solid check when the
    // client already existed
    let obj:KnownClient = {} as KnownClient
    let dateBon = new Date(date_prescr.value)
    let today = new Date()
    let status = true
    clients.value.forEach((elm)=>{
        if (elm.beneficiaire == selectedClient.value){
            obj = elm
        }
    })
    if(dateBon && 
        (dateBon > today)){
            status = false
            message1.value = " Date invalide"
        }
    if(Number(numBon.value) && date_prescr.value &&
        (Number(previous_rate_assure.value )>= 0) &&
        status){ // checks if numBon is a number
        message2.value = "Ok"
        emit("cli-assu-data", {
            'nomAd': obj.nom_adherant,
            'employeur': obj.employeur,
            'relation' : obj.relation,
            'nomBen': obj.beneficiaire,
            'rateAssu': previous_rate_assure.value,
            'datePrescr': date_prescr.value
        })
    } else{
        message1.value = "Informations invalides"
    }
    setTimeout(()=>{
        message1.value = ''
        message2.value = ''
    }, 1500)
}
const getclData = (data:CreatedClient)=>{
    // We catch the emitted data from createClient component
    nom_adherant = data.nomAd
    employeur = data.employeur
    relation = data.relation
    nom_beneficiaire = data.nomBen
    rateAssu = data.rateAssu

    // Compiling other user data to be emitted
    // and gets linked too panier_api
    console.log("Now the assuRate:", rateAssu)
    emit('rate_assu_e', rateAssu)
    emit('cli-assu-data', data)
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