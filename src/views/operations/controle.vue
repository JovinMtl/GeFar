<template>
    <div class="controle">
        <div class="controTitle">
            <ion-icon :src="close" style="position: absolute; left: 95%; top: 1px;
                font-size: 30pt" @click="closeControle"></ion-icon>
            <div class="inTitle">
                <h3>Vérification & Contrôle</h3>
            </div>
            <div class="inTitle">
                <input :type="selected_type" placeholder="Rechercher" 
                    v-model="need_search">
            </div>
            <div class="inTitle">
                <select v-model="selected_field" style="background-color: white" placeholder="Type" value="Ovule">
                    <option v-for="opt in actual_opt">{{ opt }}</option>
                </select>
            </div>
            <div v-if="selected_type != 'date'" class="inTitle">
                début
                <input type="date" v-model="date_debut" class="dateInput" >
            </div>
            <div v-if="selected_type != 'date'" class="inTitle">
                fin
                <input type="date" v-model="date_fin"  class="dateInput">
            </div>
            <div class="inTitle">
                
                <input type="button" value="Filtrers" @click="applyFilter"/>
            </div>
            <div class="inTitle" style="font-weight: 600; color: green">
                {{ title_operation }}
            </div>
            
        </div>
        <div style="background-color: yellowgreen; height: 92%; width: 100%;display: flex;">
            <div class="controlIcons">
                <div class="logoMenu" @click="ukuvoma_dispo">
                    <ion-icon :src="statsChartOutline" style="position: absolute; font-size: 50pt;margin-left: 3vw;"></ion-icon>
                    <span class="textMenu">Disponible</span>
                </div>
                
                <div class="logoMenu" @click="ukuvoma_vente">
                    <ion-icon :src="snowOutline" style="position: absolute; font-size: 50pt;margin-left: 3vw;"></ion-icon>
                    <span class="textMenu">Ventes</span>
                </div>

                <div class="logoMenu" @click="ukuvoma_entree">
                    <ion-icon :src="pricetagOutline" style="position: absolute; font-size: 50pt;margin-left: 3vw;"></ion-icon>
                    <span class="textMenu">Achats</span>
                </div>

                <div class="logoMenu" @click="ukuvoma_suggest">
                    <ion-icon :src="thermometer" style="position: absolute; font-size: 50pt;margin-left: 3vw;"></ion-icon>
                    <span class="textMenu">Suggérer</span>
                </div>

                <div class="circlesMenu">
                    <div style="display:flex; justify-content: center; 
                    margin: 5px auto">Péremption</div>
                    <div class="mainContainerCircle">
                        <a title="En bonne état">
                            <div class="item green" @click="getLowStock"></div>
                        </a>
                        <a title="Date en état critique">
                            <div class="item yellow" @click="getEndStock"></div>
                        </a>
                        <a title="Périmé">
                            <div class="item red" @click="getOutDate"></div>
                        </a>
                        <!-- <div class="item black" @click="getAllFine"></div> -->
                    </div>
                </div>

                <div class="circlesMenu">
                    <div style="display:flex; justify-content: center; 
                    margin: 5px auto">Etat de Stock</div>
                    <div class="mainContainerCircle">
                        <a title="Stock normale">
                            <div class="item green" @click="getStockGreen"></div>
                        </a>
                        <a title="En état critique" @click="getStockYellow">
                            <div class="item yellow"></div>
                        </a>
                        <a title="Stock en alerte" @click="getStockRed">
                            <div class="item red"></div>
                        </a>
                        <a title="Stock epuisé" @click="getStockZero">
                            <div class="item black"></div>
                        </a>
                    </div>
                </div>
            </div>
            <!-- The dynamic content will be here. -->
            
            <disPo :med="actual_imitiS" 
                :admin="isAdmin"
                v-if="title_operation == 'Disponibles'"/>
            <veNte :med="actual_imitiS" 
                :admin="isAdmin"
                v-if="title_operation == 'Ventes'"
                @lsIndex="refreshVente"/>
            <achAts :med="actual_imitiS" 
                :admin="isAdmin"
                v-if="title_operation == 'Achats'"/>
            <suggEst :med="actual_imitiS" 
                v-if="title_operation == 'Suggestion'"/>
            <dateGreen :med="actual_imitiS" 
                :admin="isAdmin"
                v-if="title_operation == 'Low Stock'"/>
            
                <!-- Etat de stock will use disPo component -->
            <disPo :med="actual_imitiS" 
                :admin="isAdmin"
                v-if="title_operation == 'Stock normale'"/>
            <disPo :med="actual_imitiS" 
                :admin="isAdmin"
                v-if="title_operation == 'Niveau Critique'"/>
            
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { IonIcon } from '@ionic/vue'
import { 
    close, statsChartOutline, snowOutline, thermometer, pricetagOutline,
    calendarClearOutline,
    } from 'ionicons/icons'
import { useKuvoma, useSearchUmuti, useFilterRange, useAskPriviledge } from '../hooks/kuvoma'
import cirCle from './circle.vue'
import disPo from './ctrl/dis-po.vue'
import veNte from './ctrl/ve-nte.vue'
import achAts from './ctrl/ach-ats.vue'
import suggEst from './ctrl/sugg-est.vue'
import dateGreen from './ctrl/date-green.vue'


const emit = defineEmits(['turnControl',])
const title_operation = ref('Opérations')

const [ isAdmin, askPriviledge] = useAskPriviledge()
askPriviledge()
console.log("THe User is admin ? ", isAdmin.value)
watch(isAdmin, (value)=>{
    console.log("THe user finally got: ", value)
})

const allFine_url = 'api/rep/getAllFine/'
const [allFine, getAllFine] = useKuvoma(allFine_url)

const outDate_url = 'api/rep/getOutDate/'
const [outDate, getOutDate] = useKuvoma(outDate_url)

const endStock_url = 'api/rep/getEndStock/'
const [endStock, getEndStock] = useKuvoma(endStock_url)

const lowStock_url = 'api/rep/getLowStock/'
const [lowStock, getLowStock] = useKuvoma(lowStock_url)

const dispo_url = 'api/out/dispo/'
const [actual_imiti, ukuvoma_dispo] = useKuvoma(dispo_url)

// const vente_url = 'api/rep/reportSold/'
const vente_url = 'api/rep/reportVentes/'
const [actual_vente, ukuvoma_vente] = useKuvoma(vente_url)

const entree_url = 'api/rep/reportEntree/'
const [actual_entree, ukuvoma_entree] = useKuvoma(entree_url)

const suggest_url = 'api/rep/workOn35/'
const [actual_suggest, ukuvoma_suggest] = useKuvoma(suggest_url)

// the newer links
const getStockRed_url = 'api/rep/getStockRed/'
const [stockRed, getStockRed] = useKuvoma(getStockRed_url)

const getStockYellow_url = 'api/rep/getStockYellow/'
const [stockYellow, getStockYellow] = useKuvoma(getStockYellow_url)

const getStockGreen_url = 'api/rep/getStockGreen/'
const [stockGreen, getStockGreen] = useKuvoma(getStockGreen_url)

const getStockZero_url = 'api/rep/getStockZero/ '
const [stockZero, getStockZero] = useKuvoma(getStockZero_url)


const getMedGreen_url = 'api/rep/getMedGreen/ '
const [medGreen, getMedGreen] = useKuvoma(getMedGreen_url)

const getMedMedium_url = 'api/rep/getMedMedium/'
const [medMedium, getMedMedium] = useKuvoma(getMedMedium_url)

const getMedYellow_url = 'api/rep/getMedYellow/'
const [medYellow, getMedYellow] = useKuvoma(getMedYellow_url)

const getMedRed_url = 'api/rep/getMedRed/'
const [medRed, getMedRed] = useKuvoma(getMedRed_url)


const actual_obj = ref(null) // holds the Imiti downloaded to be used for Search and Filter
const actual_opt = ref([]) // Tells the base fields we have for research
const actual_type = ref([]) // Tells the input types we support for search
const selected_field = ref('nom_med') // The state that tells the base field for search.
const selected_type = ref('text') // the state that tells the input type of RECHERCHE.
const need_search = ref(null) // the state that mentions the need to perfom the search.
const actual_imitiS = ref([]) // Contains the content to be displayed.
const totaux = ref([0,0]) // To display totals on the footer.

let [date_debut, date_fin] = [null, null]
// functions
const nRoutine = (value)=>{
    actual_obj.value = value
    actual_imitiS.value = value
    actual_opt.value = ['nom_med', 
    'quantite_restant','prix_vente', 'date_winjiriyeko',]
    actual_type.value = ['text','text','text','date']
}

// watchers
watch(stockGreen, (value)=>{
    if (value){
        console.log("Stock normale")
        nRoutine(value)
        title_operation.value = "Stock normale"
    }
})
watch(stockZero, (value)=>{
    if (value){
        console.log("Stock epuise")
        nRoutine(value)
        title_operation.value = "Stock epuisé"
    }
})
watch(stockYellow, (value)=>{
    if (value){
        console.log("Niveau Critique")
        nRoutine(value)
        title_operation.value = "Niveau Critique"
    }
})
watch(stockRed, (value)=>{
    if (value){
        console.log("En Alerte")
        nRoutine(value)
        title_operation.value = "En Alerte"
    }
})
watch(allFine, (value)=>{
    if(value.data == 'empty'){
        console.log("It is empty")
        title_operation.value = "Pas Bon"
    }
    else{
        actual_obj.value = value
        actual_imitiS.value = value
        actual_opt.value = ['nom_med', 
        'quantite_restant','prix_vente', 'date_winjiriyeko',]
        actual_type.value = ['text','text','text','date']
        title_operation.value = "Bon"
    }})
watch(outDate, (value)=>{
    if(value.data == 'empty'){
        console.log("It is empty")
        title_operation.value = "Zéro Expiré"
    }
    else{
        actual_obj.value = value
        actual_imitiS.value = value
        actual_opt.value = ['nom_med', 
        'quantite_restant','prix_vente', 'date_winjiriyeko',]
        actual_type.value = ['text','text','text','date']
        title_operation.value = "Expiré"
    }})
watch(endStock, (value)=>{
    if(value.data == 'empty'){
        console.log("It is empty")
        title_operation.value = "Pas zéro Stock"
    }
    else{
        actual_obj.value = value
        actual_imitiS.value = value
        actual_opt.value = ['nom_med','description_med', 
        'quantite_restant','prix_vente', 'date_last_vente',]
        actual_type.value = ['text','text','text','date']
        title_operation.value = "Zéro Stock"
    }})
watch(lowStock, (value)=>{
    if(value.data == 'empty'){
        console.log("It is empty")
        title_operation.value = "Pas low Stock"
    }
    else{
        actual_obj.value = value
        actual_imitiS.value = value
        actual_opt.value = ['nom_med','description_med', 
        'quantite_restant','prix_vente', 'date_last_vente',]
        actual_type.value = ['text','text','text','date']
        title_operation.value = "Low Stock"
    }
})
watch(actual_suggest, (value)=>{
    if (value){
        actual_obj.value = value
        actual_imitiS.value = value
        actual_opt.value = ['nom_med', 
        'quantite_restant','prix_vente', 'date_winjiriyeko',]
        actual_type.value = ['text','text','text','date']
        title_operation.value = "Suggestion"
    }
})
watch(actual_entree, (value)=>{
    if (value){
        actual_obj.value = value
        actual_imitiS.value = value
        actual_opt.value = ['nom_med', 
        'quantite_restant','prix_vente', 'date_winjiriyeko',]
        actual_type.value = ['text','text','text','date']
        title_operation.value = "Achats"
    }
})
watch(actual_vente, (value)=>{
    if (value){
        // title_operation.value = "Ventes"
        actual_obj.value = value
        actual_imitiS.value = value.response
        actual_opt.value = ['nom_med', 
        'quantity','prix_vente', 'date_operation',]
        actual_type.value = ['text','text','text','date']
        title_operation.value = "Ventes"
    }
})
watch(actual_imiti, (value)=>{
    if (value){
        actual_obj.value = value.data
        actual_imitiS.value = value.data
        actual_opt.value = ['nom_med','description_med', 
        'quantite_restant','prix_vente', 'date_last_vente',]
        actual_type.value = ['text','text','text','text','date']
        title_operation.value = "Disponibles"
    }
})
watch(selected_field, (value)=>{
    let index_type =  (actual_opt.value).indexOf(value)
    selected_type.value = actual_type.value[index_type]
})
watch(need_search, (value)=>{
    actual_imitiS.value = useSearchUmuti(actual_obj.value, value, selected_field.value )
})
watch(actual_imitiS, (value)=>{
    console.log("We got this: ", value)
    let [ number, total, pt_a, benefice ] = [0, 0, 0, 0]

    actual_imitiS.value.forEach(element => {
        if(element.quantite_restant){
            console.log("Quantite restant  pa:",  element.prix_vente)
            total += (element.prix_vente * (element.quantite_restant))
            pt_a += element.prix_in * (element.quantite_restant)
            benefice += (element.prix_vente - element.prix_in) * (element.quantite_restant) 
        } else {
            console.log("Quantity pa :", element.prix_vente )
            total += (element.price_out * (element.quantity))
            pt_a += element.price_in * (element.quantity)
            benefice += (element.price_out - element.price_in) * (element.quantity) 
        }
        
        number += 1
    });

    totaux.value = [number, total, pt_a, benefice]
})

const applyFilter = ()=>{
    // calling a composable and pass date_debut & date_fin as parameter
    let filteredResult = useFilterRange(actual_obj.value, date_debut, date_fin)
    actual_imitiS.value = filteredResult
}
const closeControle = ()=>{
    //emitting 0, to close the component
    emit("turnControl")
}
const refreshVente = ()=>{
    title_operation.value = ""
    setTimeout(()=>{
        title_operation.value = "Ventes"
    }, 0)
}
</script>

<style scoped>

</style>

