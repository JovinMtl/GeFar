<template>
    <div class="prMainContainer">
        <!-- Manage to receive the inputs likely imiti_S,
         and adapt for printing -->
        <div class="btns">
            <button @click="emits('exit')">Quitter</button>
            <button @click="printf">Imprimer</button>
        </div>
        <div class="print-title"> 
            <h1>Pharmacie Ubuzima</h1>
            <h3>Etat des lieux: {{ props['pageTitle'] }}, du {{ titleTime }}</h3>
        </div>
        <div style="background-color: greenyellow;">
            <slot></slot>
        </div>
         
    </div>
</template>
<script setup lang="ts">
import { useTitle } from '@vueuse/core'

const props = defineProps(['pageTitle',])
const emits = defineEmits(['exit'])

const actualTime = new Date()
const d = actualTime.getDate()
const m = actualTime.getMonth()
const y = String(actualTime).slice(11, 15)
const h = actualTime.getHours()
const m_ = actualTime.getMinutes()
const timing:string = `__du_${d}/${m}/${y}_${h}h${m_}min`
const titleTime:string = `${d}/${m}/${y}  ${h}:${m_}`

const title = useTitle()
title.value = props['pageTitle'] + timing;


const  printf = ()=>{
    window.print()
}
</script>
<style scoped>
.prMainContainer{
    width: 100%;
    background-color: rgba(255, 255, 255, 1);
    color: black;
    position: absolute;
    overflow: visible;
    page-break-after: auto;
  }
.dynContent{
    width: auto;
}
.btns{
    width: max-content;
    /* background-color: yellow; */
    position: fixed;
    transform: translate(79.5vw);
}
button{
    margin: 1vw;
    padding: 5px 15px;
    font-size: 1.5em;
    border-radius: 6px;
}
button:nth-child(1){
    background-color: brown;
}
button:nth-child(2){
    background-color: rgb(85, 224, 143);
    color: black;
}

.print-title{
    text-align: center;
}

</style>