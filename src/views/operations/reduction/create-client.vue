<template>
    <div>
        <input type="text" 
            placeholder="Nom de l'adhérant" />
        <input type="text"
            placeholder="Employeur" />
        <select v-model="relation">
            <option>Lui-même</option>
            <option>Conjoint</option>
            <option>Enfant</option>
        </select>
        <br>
        <label for="">Nom du benéficiaire</label>
        <input type="text"
            placeholder="beneficiaire" />
        <input type="number"
            placeholder="Taux d'assurance" />
        <input type="button" value="Ok"/>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const relation = ref("Lui-même")
</script>