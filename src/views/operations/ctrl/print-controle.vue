<template>
    <div class="prMainContainer">
        <!-- Manage to receive the inputs likely imiti_S,
         and adapt for printing -->
        <div>
            <h3>Here for printing. 
                <button @click="emits('exit')">Quitter</button>
                <button @click="printf">Imprimer</button>
            </h3> 
        </div>
        <div>
            <slot></slot>
        </div>
         
    </div>
</template>
<script setup lang="ts">
import { useTitle } from '@vueuse/core'
import { body } from 'ionicons/icons'

const props = defineProps(['pageTitle',])
const emits = defineEmits(['exit'])

const actualTime = new Date()
const d = actualTime.getDate()
const m = actualTime.getMonth()
const y = String(actualTime).slice(11, 15)
const h = actualTime.getHours()
const m_ = actualTime.getMinutes()
const timing:string = `__du_${d}/${m}/${y}_${h}h${m_}min`
const title = useTitle()
title.value = props['pageTitle'] + timing;

console.log("The actual Time is: " + actualTime)

const activateControl = ()=>{
    let x = window.matchMedia("print")
    console.log("THe mediaQuery found: " + x)
    if (x.matches) {
        const body = document.getElementsByTagName('body');
        console.log("The body: " + JSON.stringify(document.body))
        document.body.style.position = "initial !important";
        document.body.style.maxHeight = "initial !important";
        document.body.style.overflow = "auto !important";
        document.body.style.margin = "0";

        const ion = document.getElementsByTagName('ion-router-outlet');
        console.log("the ion: " + ion)
        ion[0].style.overflow = "auto !important";
        ion[0].style.contain = "none !important";
        ion[0].style.position = "initial !important";
    } else{
        console.log("The mediaQuery 'print' didn't match.")
    }
}

// window.addEventListener('beforeprint', activateControl)

const  printf = ()=>{
    window.print()
    // setTimeout(()=>{
    //     window.print()
    // }, 3000)
    
}
</script>
<style scoped>
.prMainContainer{
    width: 100%;
    /* height: 100%; */
    background-color: rgba(255, 255, 255, 1);
    color: black;
    position: absolute;
    overflow: visible;
    page-break-after: auto;
  }


    /* .prMainContainer{
      width: 100%;
      width: 100vw;
      background-color: rgba(255, 255, 255, 1);
      color: black;
      position: absolute;
      overflow: visible;
    } */
    /* .controlIcons, .controTitle, 
    .searchBar, .menuHau,.exit, .user,
    .sectB, .mainContainer{
        display: none;
    }
    .dynContent{
        width: 100%;
    }
    .controlBody{
        height: auto;
        margin-top: -1cm;
    } */
  /* } */
</style>