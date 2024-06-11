<template>
    <div class="factureContainer">
        <div class="factuTitle">
            <h3>DAWA - PHARMA: FACTURE</h3>
        </div>
        <div class="factuContent">
            Voici: {{ message }}
        </div>
    </div>
</template>

<script setup>
const message = "facture"
const props = defineProps(['commandePatient'])
</script>