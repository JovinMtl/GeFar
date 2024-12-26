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
        <div class="controBody" style="background-color: yellowgreen; height: 92%; width: 100%;">
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
                        <a title="En bonne état">
                            <div class="item green" @click="getAllFine"></div>
                        </a>
                        <a title="En état critique" @click="getLowStock">
                            <div class="item yellow"></div>
                        </a>
                        <a title="Stock en alerte">
                            <div class="item red"></div>
                        </a>
                        <a title="Stock epuisé" @click="getEndStock">
                            <div class="item black"></div>
                        </a>
                    </div>
                </div>
            </div>
            <div class="controlContent" style="display:block ; width: 80%; height: 100%; border:2px solid white; background-color: transparent; 
                float: right; color: black;">
                
                <div class="controlHeader" style="height: 5%; width: 100%;">
                    <div  class="controlContent">
                        <div class="contentElement1" style="display: inline-flex;background-color: transparent; width: 4%;height: 100%; color: green; ">
                            #
                        </div> 
                        <div class="contentElement2">
                            Nom du Med.
                        </div> 
                        <div class="contentElement3">
                            Quantite
                        </div>

                        <div class="contentElement4">
                            <span v-if="isAdmin">Px.Achat</span>
                            <span v-else>T. Med.</span>
                            
                        </div>

                        <div class="contentElement3">
                            Px. Vente
                        </div>

                        <div class="contentElement3">
                            Total
                        </div>

                        <div class="contentElement4">
                        <span v-if="isAdmin">Bénéfice</span>
                        <span v-else>Loc.</span>  
                        </div>

                        <div class="contentElement4">
                            Date
                        </div>
                        <div class="contentElement4">
                            Auteur
                        </div>
                    </div>
                </div>

                <div class="controlBody">
                    <div v-for="(umuti, index) in actual_imitiS" 
                        class="controlContent" style="display: block;
                        width: 100%; height: 20px; background-color: rgba(255, 255, 255, 0.5);
                        margin-bottom: 5px;
                        border: 1px solid white;">
                        <div class="contentElement11">
                            {{ index + 1 }}
                        </div> 
                        <div class="contentElement2">
                            {{ umuti.name_umuti }}
                        </div> <div class="contentElement3">
                            {{ (umuti.quantite_restant || umuti.quantity ) }}
                        </div> 

                        <div class="contentElement4 famille_med">
                            <span v-if="isAdmin">{{ umuti.price_in }}</span>
                            <span v-else>{{ umuti.famille_med }}</span>
                            
                        </div>

                        <div class="contentElement3">
                            {{ umuti.price_out }}
                        </div>

                        <div class="contentElement3 total">
                            {{ umuti.price_out * (umuti.quantite_restant || umuti.quantity) }}
                        </div>

                        <div class="contentElement4"> 
                        <span v-if="isAdmin">{{ (umuti.price_out - umuti.price_in) * (umuti.quantite_restant || umuti.quantity) }}</span> 
                        <span v-else>{{ umuti.location }}</span>
                        </div>

                        <div class="contentElement4">
                            {{ (umuti.date_last_vente 
                            || umuti.date_operation || 
                            umuti.date_winjiriyeko ||
                            '_____________').slice(6,10) }}
                        </div>
                        <div class="contentElement4">
                            {{ umuti.operator }}
                        </div>
                    </div>
                </div>

                <div class="controlFooter">
                    <div  class="controlContent" style="font-weight: 700;">
                        <div class="contentElement1">
                            #
                        </div> 
                        <div class="contentElement2">
                            TOTAL
                        </div> 
                        <div class="contentElement3">
                            {{ totaux[0] }}
                        </div>

                        <div class="contentElement3">
                            <!-- {{ (totaux[1] / (totaux[0] || 1)).toFixed(1) }} -->
                              <!-- ---- -->
                              
                            <span v-if="isAdmin">{{ totaux[2] }}</span>
                            <span v-else>----</span>
                        </div>

                        <div class="contentElement3">
                            {{ totaux[1] }}
                        </div>

                        <div class="contentElement4">
                            ----
                        </div>

                        <div class="contentElement4">
                            <span v-if="isAdmin">{{ totaux[3] }}</span> 
                            <span v-else>----</span> 
                        </div>

                        <div class="contentElement4">
                            ----
                        </div>
                    </div>
                </div>
                                   
            </div>
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

const vente_url = 'api/rep/reportSold/'
const [actual_vente, ukuvoma_vente] = useKuvoma(vente_url)

const entree_url = 'api/rep/reportEntree/'
const [actual_entree, ukuvoma_entree] = useKuvoma(entree_url)

const suggest_url = 'api/rep/workOn35/'
const [actual_suggest, ukuvoma_suggest] = useKuvoma(suggest_url)

const actual_obj = ref(null) // holds the Imiti downloaded to be used for Search and Filter
const actual_opt = ref([]) // Tells the base fields we have for research
const actual_type = ref([]) // Tells the input types we support for search
const selected_field = ref('nom_med') // The state that tells the base field for search.
const selected_type = ref('text') // the state that tells the input type of RECHERCHE.
const need_search = ref(null) // the state that mentions the need to perfom the search.
const actual_imitiS = ref([]) // Contains the content to be displayed.
const totaux = ref([0,0]) // To display totals on the footer.

let [date_debut, date_fin] = [null, null]
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
        actual_obj.value = value
        actual_imitiS.value = value
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
</script>

<style scoped>

</style>

