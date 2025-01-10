<template>
    <div>
        <input v-model="nomAd" type="text" 
            placeholder="Nom de l'adhérant" />
        <input v-model="employeur" type="text"
            placeholder="Employeur" />
        <label class="little-lab">Benéficiaire</label>
        <select v-model="relation">
            <option>Lui-même</option>
            <option>Conjoint</option>
            <option>Enfant</option>
        </select>
        <label v-if="message" class="sm-l c-r ml-5">{{ message }}</label>
        <label v-if="success" class="c-g ml-5 fw-8">{{ success }}</label>
        <br>
        <span v-if="relation != 'Lui-même'">
            <label class="little-lab" for="">Nom du benéficiaire</label>
            <input v-model="nomBen" type="text"
                placeholder="beneficiaire" />
        </span>
        <input v-model="rateAssu" type="number"
            placeholder="Taux d'assurance" />
        <input type="button" 
            value="Ok"
            @click="checkBen"/>
    </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue'

const emit = defineEmits(['clData'])

// Variables
const nomAd = ref<string>('')
const employeur = ref<string>('')
const relation = ref<string>("Lui-même")
const nomBen = ref<string>('')
const rateAssu = ref<number | null>(null)
const  message = ref<string>('')
const success: Ref<string> = ref('')

// Functions
const checkBen = ()=>{
    console.log("Calling checkBon function")
    let status = true
    if ((String(nomAd.value).length < 4) 
        || (String(employeur.value).length < 4)){
        status = false
        message.value = "Nom invalide;"
    }
    if (relation.value != "Lui-même" && 
        (String(nomBen.value).length) < 4){
            status = false
            message.value = " Nom du benéficiaire invalide;"
        }
    if(!rateAssu.value || ((Number(rateAssu.value)) < 0 ||
        (Number(rateAssu.value) > 100))){
            status = false
            message.value = " Taux invalide"
        }
    if (status){
        // should emit the gathered data as an object
        success.value = 'OK'
        emit('clData',{
            'nomAd': nomAd.value,
            'employeur': employeur.value,
            'relation' : relation.value,
            'nomBen': nomBen.value,
            'rateAssu': rateAssu.value
        })
    }
    setTimeout(()=>{
        message.value = ''
        success.value = ''
    }, 3000)
}
</script>