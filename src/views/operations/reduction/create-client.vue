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
        <label for="">Nom du benéficiaire</label>
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

// Variables
const nomAd = ref<string>('')
const employeur = ref<string>('')
const relation = ref<string>("Lui-même")
const nomBen = ref<string>('')
const rateAssu = ref<number | null>(null)

// Functions
const checkBen = ()=>{
    if (nomAd.value)
}
</script>