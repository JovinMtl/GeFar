<template>
  <div style="height:39vh;margin-top:15px;
                                overflow: auto;">
    <!-- THis is a reduction component -->
    <label for="metiers"
        style="font-size: .8rem">Choisissez sa profession:</label>

    <select v-model="selectedProf" name="metiers" id="profes">
        <option v-for="profession in professions" :value="profession.value">{{ profession.name
        }}
        </option>
    </select> <span style="color:brown"> {{ rate_assure }}%</span> 
    <div v-if="selectedProf != 'au' && selectedProf" class="inpName">
        <input class="inpName-1" placeholder="mubaze izina ryiwe"
            v-model="clName"/>
        <input class="inpName-1" placeholder="numero ya telefone yiwe" 
            v-model="clPhone" type="number" />
        <input type="button" :class="clClean ? 'BtnClean':''" 
        value="Valider" @click="simplValid">
    </div>
    <div v-if="selectedProf == 'au'">
        <div>
            <label for="assur"
                    style="font-size: .8rem;
                    color: black;margin-right: 4px;">Son assureur:</label>
            <select  id="assur" v-model="assureur">
                <option v-for="assurance in assurances">
                    {{ (assurance.name).slice(0,20) }}
                </option>
            </select>
            <a title="Ajouter une nouvelle assurance">
                <input
                type="button" v-show="!need_assureur"
                    @click="need_assureur=true" 
                    value="+"/>
            </a>
        </div>
        
        <div class="newAssu" v-if="!assureur && need_assureur">
            <label for="nAssu">Ajouter une nouvelle assurance</label>
            <input type="text" id='nAssu'
                v-model="assu_name"
            placeholder="Nom de l'assurance">
            <input type="button" value="No" 
                class="ml-10" @click="need_assureur=false">
            <hr>
            <input type="number"  v-model="assu_rate"
            placeholder="Taux d'assurance. e.x: 20">
            <input type="button" value="Ok" 
                class="ml-10" @click="checkAssu">
            
            <div>{{ message }}</div>
        </div>
        
        <div v-if="stage_redu==3 && assureur" 
            style="margin: 20px 0">
            <input type="text"
                class="inpBl"
                style="color: rgb(12, 124, 216); font-weight: 700;"
                :value="'   '+ assureur.slice(0,20)" disabled>
            <input type="text" placeholder="Nom du beneficiaire"
                v-model="clName1">
            <input type="text" placeholder="Numero Carte"
                v-model="clCardNumber">
            <input type="text" placeholder="Numero bon"
                v-model="clBonNumber">
            <input type="date" name="" id=""
                v-model="bonDate">
            <input type="button" :class="clClean ? 'BtnClean':''"  
                value="Valider" @click="complValid"
                style="margin-left: 10px;">
        </div>
    </div>
    <div v-if="isWarning" class="warning">
            {{ warnDateMessage}}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const toPage = defineEmits([])
const fromPage = defineProps([])
</script>

<style>

</style>