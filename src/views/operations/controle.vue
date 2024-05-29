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
            <div class="controlIcons" style="display: inline-block; width: 20%; height: 100%; border:2px solid white ">
                <div class="logoOne" @click="useKuvoma"
                    style="display: block;background-color: transparent; 
                    width: 100%;height: 20%; padding: 5px 5px; border-bottom: 2px solid white">
                    <ion-icon :src="statsChartOutline" style="position: absolute; font-size: 50pt;margin-left: 3vw;"></ion-icon>
                    <span style="position: absolute;font-size: 15pt ;left: 9vw; margin-top: 5vh;">Les ventes</span>
                </div>
                
                <div class="logoTwo" style="display: block;background-color: transparent; 
                width: 100%;height: 20%; padding: 5px 5px; border-bottom: 2px solid white">
                    <ion-icon :src="snowOutline" style="position: absolute; font-size: 50pt;margin-left: 3vw;"></ion-icon>
                    <span style="position: absolute;font-size: 15pt ;left: 9vw; margin-top: 5vh;">Les ventes</span>
                </div>

                <div class="logoThree" style="display: block;background-color: transparent; 
                    width: 100%;height: 20%; padding: 5px 5px; border-bottom: 2px solid white">
                    <ion-icon :src="thermometer" style="position: absolute; font-size: 50pt;margin-left: 3vw;"></ion-icon>
                    <span style="position: absolute;font-size: 15pt ;left: 9vw; margin-top: 5vh;">Les ventes</span>
                </div>

                <div class="logoFour" style="display: block;background-color: transparent; 
                    width: 100%;height: 20%; padding: 5px 5px; border-bottom: 2px solid white">
                    <ion-icon :src="pricetagOutline" style="position: absolute; font-size: 50pt;margin-left: 3vw;"></ion-icon>
                    <span style="position: absolute;font-size: 15pt ;left: 9vw; margin-top: 5vh;">Les ventes</span>
                </div>
            </div>
            <div class="controlIcons" style="display: inline-flex; width: 80%; height: 100%; border:2px solid white ">
               <div class="controlContent" style="position: absolute;">
                THese <br>
                {{ umuti }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { IonIcon } from '@ionic/vue'
import { close, statsChartOutline, snowOutline, thermometer, pricetagOutline} from 'ionicons/icons'
import useKuvoma from '../hooks/kuvoma'

const actual_imiti = ref([])
actual_imiti.value = useKuvoma()


</script>
