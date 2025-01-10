<template>
    <div>
        <input v-model="nomAd" type="text" 
            placeholder="Nom de l'adhérant" />
        <input v-model="employeur" type="text"
            placeholder="Employeur" />
        <select v-model="relation">
            <option>Lui-même</option>
            <option>Conjoint</option>
            <option>Enfant</option>
        </select>
        <br>
        <label class="little-lab" for="">Nom du benéficiaire</label>
        <input v-model="nomBen" type="text"
            placeholder="beneficiaire" />
        <input v-model="rateAssu" type="number"
            placeholder="Taux d'assurance" />
        <input type="button" 
            value="Ok"
            @click="checkBen"/>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['clData'])

// Variables
const nomAd = ref<string>('')
const employeur = ref<string>('')
const relation = ref<string>("Lui-même")
const nomBen = ref<string>('')
const rateAssu = ref<number | null>(null)
const  message = ref<string>('')

// Functions
const checkBen = ()=>{
    let status = true
    if ((String(nomAd.value).length < 4) 
        || (String(employeur.value).length < 4)
        || (String(nomBen.value).length) < 4){
        status = false
        message.value = "Nom invalide;"
    }
    if(Number(rateAssu.value) < 0 ||
        Number(rateAssu.value) > 100){
            status = false
            message.value += "Taux invalide"
        }
    if (status){
        // should emit the gathered data as an object
        emit('clData',{
            'nomAd': nomAd,
            'employeur': employeur,
            'relation' : relation,
            'nomBen': nomBen,
            'rateAssu': rateAssu
        })
    }
}
</script>