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
                debut
                <input type="date" v-model="date_debut" class="dateInput" >
            </div>
            <div v-if="selected_type != 'date'" class="inTitle">
                fin
                <input type="date" v-model="date_fin"  class="dateInput">
            </div>
            <div class="inTitle">
                
                <input type="button" value="Filter" @click="applyFilter"/>
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

                <div class="circlesMenu" style="text-align: center; 
                justify-content: center; align-items: center; padding-top: 15%">
                    <div class="mainContainerCircle">
                        <!-- Here are the circles -->
                        <div class="item violet" @click="getLowStock"></div>
                        <div class="item yellow" @click="getEndStock"></div>
                        <div class="item red" @click="getOutDate"></div>
                        <div class="item black" @click="getAllFine"></div>
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

                        <div class="contentElement3">
                            Prix de V.
                        </div>

                        <div class="contentElement3">
                            Total
                        </div>

                        <div class="contentElement4">
                            <span v-if="isAdmin">Px.Achat</span>
                            <span v-else>T. Med.</span>
                            
                        </div>

                        <div class="contentElement4">
                        <span v-if="isAdmin">Bénéfice</span>
                        <span v-else>Loc.</span>  
                        </div>

                        <div class="contentElement4">
                            Date
                        </div>
                        <div class="contentElement4">
                            Author
                        </div>
                    </div>
                </div>

                <div class="controlBody">
                    <div v-for="(umuti, index) in actual_imitiS" class="controlContent" style="display: block;width: 100%; height: 20px; background-color: rgba(255, 255, 255, 0.5);margin-bottom: 5px;
                        border: 1px solid white;">
                        <div class="contentElement11">
                            {{ index + 1 }}
                        </div> 
                        <div class="contentElement2">
                            {{ umuti.nom_med }}
                        </div> <div class="contentElement3">
                            {{ (umuti.quantite_restant || umuti.quantity ) }}
                        </div>

                        <div class="contentElement3">
                            {{ umuti.prix_out }}
                        </div>

                        <div class="contentElement3 total">
                            {{ umuti.prix_out * (umuti.quantite_restant || umuti.quantity) }}
                        </div> 

                        <div class="contentElement4 type_med">
                            <span v-if="isAdmin">{{ umuti.prix_in }}</span>
                            <span v-else>{{ umuti.type_med }}</span>
                            
                        </div>

                        <div class="contentElement4"> 
                        <span v-if="isAdmin">{{ (umuti.prix_out - umuti.prix_in) * (umuti.quantite_restant || umuti.quantity) }}</span> 
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
                              ----
                        </div>

                        <div class="contentElement3">
                            {{ totaux[1] }}
                        </div>

                        <div class="contentElement4">
                            <span v-if="isAdmin">{{ totaux[2] }}</span>
                            <span v-else>----</span>
                            
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
        'quantite_restant','prix_out', 'date_winjiriyeko',]
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
        'quantite_restant','prix_out', 'date_winjiriyeko',]
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
        'quantite_restant','prix_out', 'date_last_vente',]
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
        'quantite_restant','prix_out', 'date_last_vente',]
        actual_type.value = ['text','text','text','date']
        title_operation.value = "Low Stock"
    }
})
watch(actual_suggest, (value)=>{
    if (value){
        actual_obj.value = value
        actual_imitiS.value = value
        actual_opt.value = ['nom_med', 
        'quantite_restant','prix_out', 'date_winjiriyeko',]
        actual_type.value = ['text','text','text','date']
        title_operation.value = "Suggestion"
    }
})
watch(actual_entree, (value)=>{
    if (value){
        actual_obj.value = value
        actual_imitiS.value = value
        actual_opt.value = ['nom_med', 
        'quantite_restant','prix_out', 'date_winjiriyeko',]
        actual_type.value = ['text','text','text','date']
        title_operation.value = "Achats"
    }
})
watch(actual_vente, (value)=>{
    if (value){
        actual_obj.value = value
        actual_imitiS.value = value
        actual_opt.value = ['nom_med', 
        'quantity','prix_out', 'date_operation',]
        actual_type.value = ['text','text','text','date']
        title_operation.value = "Ventes"
    }
})
watch(actual_imiti, (value)=>{
    if (value){
        actual_obj.value = value.data
        actual_imitiS.value = value.data
        actual_opt.value = ['nom_med','description_med', 
        'quantite_restant','prix_out', 'date_last_vente',]
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
            console.log("Quantite restant  pa:",  element.prix_out)
            total += (element.prix_out * (element.quantite_restant))
            pt_a += element.prix_in * (element.quantite_restant)
            benefice += (element.prix_out - element.prix_in) * (element.quantite_restant) 
        } else {
            console.log("Quantity pa :", element.prix_out )
            total += (element.prix_out * (element.quantity))
            pt_a += element.prix_in * (element.quantity)
            benefice += (element.prix_out - element.prix_in) * (element.quantity) 
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
.mainContainerCircle{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    /* background: #333; */
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    grid-auto-rows: 20px;
    justify-items: center;
}
.item{
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 15px;
}
.item:active{
    background-color: transparent;
    scale: 1.4;
}
.black{
    background-color: black;
    border: 2px solid black;
}
.yellow{
    background-color: rgb(117, 9, 206);
    box-shadow: 0 0 10px greenyellow;
    border: 2px solid rgb(117, 9, 206);
}
.violet{
    background-color: rgb(12, 124, 216);
    border: 2px solid rgb(12, 124, 216);
}
.red{
    background-color: rgb(206, 9, 35);
    border: 2px solid rgb(206, 9, 35);
}
::-webkit-scrollbar-thumb {
    background-color: black;
    border-radius: 15px;
  }
  ::-webkit-scrollbar {
    width: 3px;
    color: green;
  }
  ::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
.controle{
    background-color: white; 
    position: relative; 
    height: 95%; 
    width: 90vw;
    left: 5vw; top: 2vh;
}
.controTitle{
    background-color: white;
    height: 8%; 
    width: 100%; 
    text-align: left; 
    align-content: center; 
    color: black;
}
.inTitle{
    display: inline-flex; 
    margin: 0px 10px;
}
.dateInput{
    margin-top: -2px; 
    width: 120px;
}

.controlIcons{
    display: inline-block; 
    width: 20%; 
    height: 100%; 
    border:2px solid white; 
}
.circlesMenu{
    display: block;
    background-color: transparent; 
    width: 100%;height: 20%; 
    padding: 5px 5px; 
    border-bottom: 2px solid white;
}
.logoMenu{
    display: block;
    background-color: transparent; 
    width: 100%;height: 20%; 
    padding: 5px 5px; 
    border-bottom: 2px solid white;
}
.logoMenu:active{
    display: block;
    background-color: greenyellow; 
    width: 100%;height: 20%; 
    padding: 5px 5px; 
    border-bottom: 2px solid white;
}
.textMenu{
    position: absolute;
    font-size: 15pt ;
    left: 9vw; 
    margin-top: 5vh;
}

.controlContent{
    display: block;
    width: 100%; height: 20px; 
    background-color: transparent;
    margin-bottom: 5px;
    border: 1px solid white;
}
.contentElement1{
    display: inline-flex;
    background-color: white; 
    width: 4%;height: 100%; 
    color: green;
}
.contentElement11{
    display: inline-flex;
    background-color: grey; 
    width: 4%;height: 100%; 
    color: white;
    justify-content: center;
    border-radius: 4px;
}
.contentElement2{
    display: inline-flex;
    background-color: transparent; 
    width: 18%;height: 100%;
}
.contentElement3{
    display: inline-flex;
    background-color: transparent; 
    width: 14%;height: 100%;
}
.contentElement4{
    display: inline-flex;
    background-color: transparent; 
    width: 8%;height: 100%;
}
.controlBody{
    height: 90%; width: 100%; 
    overflow: auto;
}
.controlFooter{
    background-color: white;
     height: 5%; width: 100%;
}
</style>

