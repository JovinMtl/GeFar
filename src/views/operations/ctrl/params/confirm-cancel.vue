<template>
    <div style="display: flex; background-color: rgba(5, 5, 5, 0.4);
        justify-content: center; align-items: center;
        position: absolute;width: 100%; height: 100%;flex-direction: column;">

        <p>Veuillez confirmer cette annulation en tapant le mot: <span style="font-size: 3em; font-weight: 100;">Annuler</span> </p>
        <div>
            <input type="text">
            <button class="bg-b">Ok</button>
            <button class="bg-s" @click="emit('cancel')">No</button>
        </div>
        
    </div>
</template>
<script setup lang="ts">

const emit = defineEmits(['cancel', 'replied'])

</script>
<style scoped>
button{
    margin: 1em;
    padding: 0.5em 1em;
}
input{
    border-color: greenyellow;
    width: 5rem;
}
</style>