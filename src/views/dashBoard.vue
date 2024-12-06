<template>
    <div>
        <div class="namePharma nm-p1 nm-s1">Dawa Pharma</div>
        <div class="bg-w c-b dB-1">
            Dashboard</div>
        <div class="c-b d-f">
            <button class="btn" @click="fermerD">
                Fermer
            </button>
        </div>
        <div class="bg-w c-b dB-3 d-f">
            <div class="d-f dB-ctn" style="align-content: center;
    justify-content: center;
    flex-wrap: wrap;">
                Rien pour le moment
            </div>
            <div class="dB-ctn"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['clos-d'])

// Begining of functions
const fermerD = ()=>{
    emit('clos-d')
}

</script>
<style>
.nm-p1{
    top: -0.3rem;
    left: 9rem;
}
.nm-s1{
    background-size: 60px 60px;
    font-size: 1.8rem;
}
.bg-w{
    background-color: white; 
}
.c-b{
    color: black;
}
.dB-1{
    position:absolute;
    left: 80%;top:4px;
    justify-items: center;
    height: 25px; padding: 3px 2rem;
    border-top-left-radius: 5px; border-top-right-radius: 5px;
}
.d-f{
    display: flex; 
}
.dB-3{
    width: 98vw; height: 95vh; 
    border-radius: 15px;
    padding: 8px; 
}
.dB-ctn{
    width: 40vw; height: 70vh; 
    background-color: grey;
    margin: 5px;
}
.btn{
    padding: 4px 15px; 
    margin: 3px auto;
    background-color: #ef4b38;
}
.btn:active{
    scale: 1.2;
}
</style>