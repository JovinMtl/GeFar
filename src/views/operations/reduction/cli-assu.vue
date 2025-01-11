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
    
        <input  v-if="existingClient"
            type="number"
            v-model="previous_rate_assure"
            placeholder="Taux d'assurance">
    </div>
</template>

<script setup lang="ts">
import {ref, Ref } from 'vue'
import { 
    useKurungika, useKuvoma
} from '../../hooks/kuvoma.js'

const selectedClient: Ref<string | null> = ref(null)
const dataClient = null
const need_new_client: Ref<boolean> = ref(false)
const need_add_client: Ref<boolean> = ref(false)
const previous_rate_assure:Ref<number|null> = ref(null)
const existingClient: Ref<boolean> = ref(false)

// Composables
const url_addClient = "api/gOps/addClient/"
const [addCliResp, addClient] = useKurungika(dataClient, url_addClient)

const url_getClients = "api/gOps/getClients/"
const [clients, getClients] = useKuvoma(url_getClients, url_local)
</script>