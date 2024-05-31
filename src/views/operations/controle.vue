<template>
    <div class="Controle" style="background-color: white; 
        position: relative; height: 95%; width: 90vw;
        left: 5vw; top: 2vh;">
        <div class="controTitle" style="background-color: white;
            height: 8%; width: 100%; text-align: left; align-content: center; color: black">

            <ion-icon :src="close" style="position: absolute; left: 95%; top: 1px;
                font-size: 30pt"></ion-icon>
            <div class="Title" style="display: inline-flex; margin: 0px 10px;">
                <h3>Vérification & Contrôle</h3>
            </div>
            <div class="recherche" style="display: inline-flex; margin: 0px 10px;">
                <input :type="selected_type" placeholder="Rechercher" 
                    v-model="need_search">
            </div>
                <div class="actualField" style="display: inline-flex; margin: 0px 10px;">
                    <select v-model="selected_field" style="background-color: white" placeholder="Type" value="Ovule">
                    <option v-for="opt in actual_opt">{{ opt }}</option>
                    <!-- <option>Gel</option>
                    <option>Ovule</option>
                    <option>Sirop</option>
                    <option>Inj</option> -->
                    <!-- <option>Inj</option> -->
                    </select>
                </div>
            <div v-if="selected_type != 'date'" class="recherche" style="display: inline-flex; margin: 0px 20px;">
                debut
                <input type="date"  style="margin-top: -2px; width: 80px;">
            </div>
            <div v-if="selected_type != 'date'" class="recherche" style="display: inline-flex; margin: 0px 10px;">
                fin
                <input type="date" style="margin-top: -2px; width: 80px;">
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
            <div class="controlContent" style="display:block ; width: 80%; height: 100%; border:2px solid white; background-color: transparent; 
                float: right; color: black;">
                <!-- <div style="width: 100%; height: 20px; background-color: gray;"></div>
                <div style="width: 100%; height: 20px; background-color: gray;"></div> -->
                <!-- <div class="controlContent" style="display: block;width: 100%; height: 20px; background-color: transparent;margin-bottom: 5px;
                    border: 1px solid blue;">
                    something1
                </div> -->
                
                <div class="controlHeader" style="height: 5%; width: 100%;">
                    <div  class="controlContent" style="display: block;width: 100%; height: 20px; background-color: transparent;margin-bottom: 5px;
                        border: 1px solid white;">
                        <div class="contentElement1" style="display: inline-flex;background-color: transparent; width: 4%;height: 100%; color: green; ">
                            #
                        </div> 
                        <div class="contentElement1" style="display: inline-flex;background-color: transparent; width: 20%;height: 100%;">
                            Nom du Med.
                        </div> 
                        <div class="contentElement1" style="display: inline-flex;background-color: transparent; width: 15%;height: 100%;">
                            Quantite
                        </div>

                        <div class="contentElement1" style="display: inline-flex;background-color: transparent; width: 15%;height: 100%;">
                            Prix de V.
                        </div>

                        <div class="contentElement1" style="display: inline-flex;background-color: transparent; width: 15%;height: 100%;">
                            Total
                        </div>

                        <div class="contentElement1" style="display: inline-flex;background-color: transparent; width: 10%;height: 100%;">
                            Date vendu
                        </div>

                        <div class="contentElement1" style="display: inline-flex;background-color: transparent; width: 10%;height: 100%;">
                        Localisation
                        </div>

                        <div class="contentElement1" style="display: inline-flex;background-color: transparent; width: 10%;height: 100%;">
                            Type du Med.
                        </div>
                    </div>
                </div>

                <div class="controlBody" style="height: 90%; width: 100%; overflow: auto">
                    <div v-for="(umuti, index) in actual_imitiS" class="controlContent" style="display: block;width: 100%; height: 20px; background-color: transparent;margin-bottom: 5px;
                        border: 1px solid white;">
                        <div class="contentElement1" style="display: inline-flex;background-color: transparent; width: 4%;height: 100%;color: white;margin-left: 5px;">
                            {{ index + 1 }}
                        </div> 
                        <div class="contentElement1" style="display: inline-flex;background-color: transparent; width: 20%;height: 100%;">
                            {{ umuti.name_umuti }}
                        </div> <div class="contentElement1" style="display: inline-flex;background-color: transparent; width: 15%;height: 100%;">
                            {{ umuti.quantite_restant }}
                        </div>

                        <div class="contentElement1" style="display: inline-flex;background-color: transparent; width: 15%;height: 100%;">
                            {{ umuti.price_out }}
                        </div>

                        <div class="contentElement1" style="display: inline-flex;background-color: transparent; width: 15%;height: 100%;">
                            {{ umuti.price_out * umuti.quantite_restant }}
                        </div>

                        <div class="contentElement1" style="display: inline-flex;background-color: transparent; width: 10%;height: 100%;">
                            {{ (umuti.date_last_vente).slice(6,10) }}
                        </div>

                        <div class="contentElement1" style="display: inline-flex;background-color: transparent; width: 10%;height: 100%;">
                        {{ umuti.location }}
                        </div>

                        <div class="contentElement1" style="display: inline-flex;background-color: transparent; width: 10%;height: 100%;">
                            {{ umuti.type_umuti }}
                        </div>
                    </div>
                </div>

                <div class="controlFooter" style="background-color: white;
                    height: 5%; width: 100%;">
                    <div  class="controlContent" style="display: block;width: 100%; height: 20px; background-color: transparent;margin-bottom: 5px;
                        border: 1px solid white;">
                        <div class="contentElement1" style="display: inline-flex;background-color: transparent; width: 4%;height: 100%; color: green; ">
                            #
                        </div> 
                        <div class="contentElement1" style="display: inline-flex;background-color: transparent; width: 20%;height: 100%;">
                            TOTAL
                        </div> 
                        <div class="contentElement1" style="display: inline-flex;background-color: transparent; width: 15%;height: 100%;">
                            8
                        </div>

                        <div class="contentElement1" style="display: inline-flex;background-color: transparent; width: 15%;height: 100%;">
                            ----
                        </div>

                        <div class="contentElement1" style="display: inline-flex;background-color: transparent; width: 15%;height: 100%;">
                            34000
                        </div>

                        <div class="contentElement1" style="display: inline-flex;background-color: transparent; width: 10%;height: 100%;">
                            ----
                        </div>

                        <div class="contentElement1" style="display: inline-flex;background-color: transparent; width: 10%;height: 100%;">
                            ----
                        </div>

                        <div class="contentElement1" style="display: inline-flex;background-color: transparent; width: 10%;height: 100%;">
                            -----
                        </div>
                    </div>
                </div>
                                   
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { IonIcon } from '@ionic/vue'
import { close, statsChartOutline, snowOutline, thermometer, pricetagOutline} from 'ionicons/icons'
import { useKuvoma, useSearchUmuti } from '../hooks/kuvoma'

const [actual_imiti, ukuvoma] = useKuvoma()
// console.log("THe actual imiti is : ", actual_imiti.value)

const actual_obj = ref(null)
const actual_opt = ref([])
const actual_type = ref([])
const selected_field = ref('name_umuti')
const selected_type = ref('text')
const need_search = ref(null)
const actual_imitiS = ref([])

watch(actual_imiti, (value)=>{
    console.log("We got really new imiti")
    if (value){
        actual_obj.value = value
        actual_imitiS.value = value
        // actual_opt.value = Object.keys(value[0]) 
        actual_opt.value = ['name_umuti','description_umuti', 
        'quantite_restant','price_out', 'date_last_vente',]
        actual_type.value = ['text','text','text','text','date']
    }
})
watch(selected_field, (value)=>{
    console.log("You selected: ", selected_field.value)
    let index_type =  (actual_opt.value).indexOf(value)
    selected_type.value = actual_type.value[index_type]
    console.log("Tshe actual keys are: ", actual_opt.value)
    console.log("The selected TYPE is :", selected_type.value)
})
watch(need_search, (value)=>{
    
    console.log("We want to search with this keyword: ", value)
    actual_imitiS.value = useSearchUmuti(actual_obj.value, value, selected_field.value )
    console.log("The result is : ", actual_imitiS.value)
})
</script>
