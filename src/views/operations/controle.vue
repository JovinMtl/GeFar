<template>
    <div class="Controle" style="background-color: white; 
        position: relative; height: 95%; width: 90vw;
        left: 5vw; top: 2vh;">
        <div class="controTitle" style="background-color: white;
            height: 8%; width: 100%; text-align: center; align-content: center; color: black">
            <ion-icon :src="close" style="position: absolute; left: 95%; top: 3px;
                font-size: 30pt"></ion-icon>
            <h3>Vérification & Contrôle</h3>
        </div>
        <div class="controBody" style="background-color: yellowgreen; height: 92%; width: 100%;">
            <div class="controlIcons" style="display: inline-flex; width: 20%; height: 100%; border:2px solid white "></div>
            <div class="controlIcons" style="display: inline-flex; width: 80%; height: 100%; border:2px solid white "></div>
        </div>
    </div>
</template>

<script setup>
import { IonIcon } from '@ionic/vue'
import { close } from 'ionicons/icons'
</script>
