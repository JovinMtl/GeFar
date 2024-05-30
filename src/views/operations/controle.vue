<template>
    <div class="Controle" style="background-color: white; 
        position: relative; height: 95%; width: 90vw;
        left: 5vw; top: 2vh;">
        <div class="controTitle" style="background-color: white;
            height: 8%; width: 100%; text-align: left; align-content: center; color: black">

            <ion-icon :src="close" style="position: absolute; left: 95%; top: 3px;
                font-size: 30pt"></ion-icon>
            <div class="Title" style="display: inline-flex; margin: 0px 10px;">
                <h3>Vérification & Contrôle</h3>
            </div>
            <div class="recherche" style="display: inline-flex; margin: 0px 10px;">
                <input type="text" placeholder="Rechercher">
            </div>
            <div class="actualField" style="display: inline-flex; margin: 0px 10px;">
                nom
            </div>
            <div class="recherche" style="display: inline-flex; margin: 0px 20px;">
                debut
                <input type="date"  style="margin-top: -2px;">
            </div>
            <div class="recherche" style="display: inline-flex; margin: 0px 10px;">
                fin
                <input type="date" style="margin-top: -2px;">
            </div>
            <div class="recherche" style="display: inline-flex; margin: 0px 10px;">
                
                <input type="button" style="background-color: green;" value="Rechercher"/>
            </div>
            
        </div>
        <div class="controBody" style="background-color: yellowgreen; height: 92%; width: 100%;">
            <div class="controlIcons" style="display: inline-block; width: 20%; height: 100%; border:2px solid white ">
                <div class="logoOne" @click="ukuvoma"
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
            <div class="controlIcons" style="display:block ; width: 80%; height: 100%; border:2px solid white; background-color: yellow; float: right;">
                <!-- <div style="width: 100%; height: 20px; background-color: gray;"></div>
                <div style="width: 100%; height: 20px; background-color: gray;"></div> -->
                <!-- <div class="controlContent" style="display: block;width: 100%; height: 20px; background-color: grey;margin-bottom: 5px;
                    border: 3px solid blue;">
                    something1
                </div> -->

                <div  class="controlContent" style="display: block;width: 100%; height: 20px; background-color: grey;margin-bottom: 5px;
                    border: 3px solid blue;">
                    <div class="contentElement1" style="display: inline-flex;background-color: #333; width: 20%;height: 100%;">
                         Nom du Med.
                    </div> <div class="contentElement1" style="display: inline-flex;background-color: #333; width: 15%;height: 100%;">
                        Quantite
                    </div>

                    <div class="contentElement1" style="display: inline-flex;background-color: #333; width: 15%;height: 100%;">
                        Prix de V.
                    </div>

                    <div class="contentElement1" style="display: inline-flex;background-color: #333; width: 10%;height: 100%;">
                        Date vendu
                    </div>

                    <div class="contentElement1" style="display: inline-flex;background-color: #333; width: 10%;height: 100%;">
                       Localisation
                    </div>

                    <div class="contentElement1" style="display: inline-flex;background-color: #333; width: 10%;height: 100%;">
                        Type du Med.
                    </div>
                </div>

                <div v-for="umuti in actual_imiti" class="controlContent" style="display: block;width: 100%; height: 20px; background-color: grey;margin-bottom: 5px;
                    border: 3px solid blue;">
                    <div class="contentElement1" style="display: inline-flex;background-color: #333; width: 20%;height: 100%;">
                         {{ umuti.name_umuti }}
                    </div> <div class="contentElement1" style="display: inline-flex;background-color: #333; width: 15%;height: 100%;">
                        {{ umuti.quantite_restant }}
                    </div>

                    <div class="contentElement1" style="display: inline-flex;background-color: #333; width: 15%;height: 100%;">
                        {{ umuti.price_out }}
                    </div>

                    <div class="contentElement1" style="display: inline-flex;background-color: #333; width: 10%;height: 100%;">
                        {{ (umuti.date_last_vente).slice(6,10) }}
                    </div>

                    <div class="contentElement1" style="display: inline-flex;background-color: #333; width: 10%;height: 100%;">
                       {{ umuti.location }}
                    </div>

                    <div class="contentElement1" style="display: inline-flex;background-color: #333; width: 10%;height: 100%;">
                        {{ umuti.type_umuti }}
                    </div>
                </div>


               <!-- <div class="controlContent" style="width: 100%; height: 20px;">
                    <div class="contentElement1" style="display: inline-flex;background-color: #333; width: 20%;height: 100%;">
                         umuti.name_umuti
                    </div>
                    <div class="contentElement1" style="display: inline-flex;background-color: #333; width: 15%;height: 100%;">
                        umuti.quantite_restant
                    </div>
                    <div class="contentElement1" style="display: inline-flex;background-color: #333; width: 15%;height: 100%;">
                        umuti.price_out
                    </div>
                    <div class="contentElement1" style="display: inline-flex;background-color: #333; width: 10%;height: 100%;">
                        umuti.date_last_vente
                    </div>
                    <div class="contentElement1" style="display: inline-flex;background-color: #333; width: 10%;height: 100%;">
                        umuti.location 
                    </div>

                    <div class="contentElement1" style="display: inline-flex;background-color: #333; width: 10%;height: 100%;">
                        umuti.type_umuti
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { IonIcon } from '@ionic/vue'
import { close, statsChartOutline, snowOutline, thermometer, pricetagOutline} from 'ionicons/icons'
import { useKuvoma } from '../hooks/kuvoma'

const [actual_imiti, ukuvoma] = useKuvoma()
console.log("THe actual imiti is : ", actual_imiti.value)

</script>
