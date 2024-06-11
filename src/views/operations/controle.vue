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
                            Date vendu
                        </div>

                        <div class="contentElement4">
                        Localisation
                        </div>

                        <div class="contentElement4">
                            Type du Med.
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
                            {{ umuti.name_umuti }}
                        </div> <div class="contentElement3">
                            {{ (umuti.quantite_restant || umuti.quantity ) }}
                        </div>

                        <div class="contentElement3">
                            {{ umuti.price_out }}
                        </div>

                        <div class="contentElement3">
                            {{ umuti.price_out * (umuti.quantite_restant || umuti.quantity) }}
                        </div> 

                        <div class="contentElement4">
                            {{ (umuti.date_last_vente 
                            || umuti.date_operation || 
                            umuti.date_winjiriyeko ||
                            '_____________').slice(6,10) }}
                        </div>

                        <div class="contentElement4">
                        {{ umuti.location }}
                        </div>

                        <div class="contentElement4">
                            {{ umuti.type_umuti }}
                        </div>
                    </div>
                </div>

                <div class="controlFooter">
                    <div  class="controlContent">
                        <div class="contentElement1">
                            #
                        </div> 
                        <div class="contentElement1" style="display: inline-flex;background-color: transparent; width: 20%;height: 100%;">
                            TOTAL
                        </div> 
                        <div class="contentElement3">
                            {{ totaux[0] }}
                        </div>

                        <div class="contentElement3">
                            {{ (totaux[1] / (totaux[0] || 1)).toFixed(1) }}
                        </div>

                        <div class="contentElement3">
                            {{ totaux[1] }}
                        </div>

                        <div class="contentElement4">
                            ----
                        </div>

                        <div class="contentElement4">
                            ----
                        </div>

                        <div class="contentElement4">
                            -----
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
import { useKuvoma, useSearchUmuti, useFilterRange } from '../hooks/kuvoma'

const emit = defineEmits(['turnControl',])

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
const selected_field = ref('name_umuti') // The state that tells the base field for search.
const selected_type = ref('text') // the state that tells the input type of RECHERCHE.
const need_search = ref(null) // the state that mentions the need to perfom the search.
const actual_imitiS = ref([]) // Contains the content to be displayed.
const totaux = ref([0,0]) // To display totals on the footer.

let [date_debut, date_fin] = [null, null]

watch(actual_suggest, (value)=>{
    if (value){
        actual_obj.value = value
        actual_imitiS.value = value
        actual_opt.value = ['name_umuti', 
        'quantite_restant','price_out', 'date_winjiriyeko',]
        actual_type.value = ['text','text','text','date']
    }
})
watch(actual_entree, (value)=>{
    if (value){
        actual_obj.value = value
        actual_imitiS.value = value
        actual_opt.value = ['name_umuti', 
        'quantite_restant','price_out', 'date_winjiriyeko',]
        actual_type.value = ['text','text','text','date']
    }
})
watch(actual_vente, (value)=>{
    if (value){
        actual_obj.value = value
        actual_imitiS.value = value
        actual_opt.value = ['name_umuti', 
        'quantity','price_out', 'date_operation',]
        actual_type.value = ['text','text','text','date']
    }
})
watch(actual_imiti, (value)=>{
    if (value){
        actual_obj.value = value
        actual_imitiS.value = value
        actual_opt.value = ['name_umuti','description_umuti', 
        'quantite_restant','price_out', 'date_last_vente',]
        actual_type.value = ['text','text','text','text','date']
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
    let [ number, total ] = [0, 0]

    actual_imitiS.value.forEach(element => {
        total += (element.price_out * (element.quantite_restant || element.quantity))
        number += 1
    });

    totaux.value = [number, total]
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
    background-color: black; 
    width: 4%;height: 100%; 
    color: white;
}
.contentElement2{
    display: inline-flex;
    background-color: transparent; 
    width: 20%;height: 100%;
}
.contentElement3{
    display: inline-flex;
    background-color: transparent; 
    width: 15%;height: 100%;
}
.contentElement4{
    display: inline-flex;
    background-color: transparent; 
    width: 10%;height: 100%;
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

