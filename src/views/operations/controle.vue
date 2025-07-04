<template>
    <div class="controle">
        <div class="controTitle">
            <ion-icon :src="close" style="position: absolute; left: 95%; top: 1px;
                font-size: 30pt" @click="closeControle"></ion-icon>
            <div class="inTitle">
                <h3>Vérification & Contrôle</h3>
            </div>
            <div class="inTitle" v-show="searchEable">
                <input :type="selected_type" placeholder="Rechercher" 
                    v-model="need_search">
            </div>
            <div class="inTitle" v-show="searchEable">
                <select v-model="selected_field" style="background-color: white" placeholder="Type" value="Ovule">
                    <option v-for="opt in actual_opt">{{ opt }}</option>
                </select>
            </div>
            <div v-if="selected_type != 'date'" class="inTitle">
                début<span class="c-t">_</span>
                <input type="date" v-model="date_debut" class="dateInput" >
            </div>
            <div v-if="selected_type != 'date'" class="inTitle">
                fin<span class="c-t">_</span>
                <input type="date" v-model="date_fin"  class="dateInput">
            </div>
            <div class="inTitle">
                
                <!-- <input type="button" value="Filtrer" @click="applyFilter"/> -->
                <input type="checkbox" v-model="isFilter"/>
            </div>
            <div class="inTitle" style="font-weight: 600; color: green">
                {{ title_operation }}
            </div>
            <div  class="inTitle prIcon" :title="'Imprimer: ' + title_operation"
                @click="openPrint">
                <ion-icon :src="printOutline"></ion-icon>
            </div>
            
        </div>
        <div class="ctrlContent" style="">
            <div class="controlIcons">
                <div class="logoMenu" @click="ukuvoma_dispo">
                    <ion-icon :src="statsChartOutline" class="logoIcon"></ion-icon>
                    <span class="textMenu">Disponible</span>
                </div>
                
                <div class="logoMenu" @click="kuvoma_vente">
                    <ion-icon :src="snowOutline" class="logoIcon"></ion-icon>
                    <span class="textMenu">Ventes</span>
                </div>
                
                <div class="logoMenu" @click="kuvoma_bons">
                    <ion-icon :src="libraryOutline"  class="logoIcon"></ion-icon>
                    <span class="textMenu">Bons</span>
                </div>

                <div class="logoMenu" @click="kuvoma_entree">
                    <ion-icon :src="pricetagOutline" class="logoIcon"></ion-icon>
                    <span class="textMenu">Achats</span>
                </div>

                <div class="logoMenu" @click="ukuvoma_suggest">
                    <ion-icon :src="thermometer" class="logoIcon"></ion-icon>
                    <span class="textMenu">Suggérer</span>
                </div>

                <div class="circlesMenu">
                    <div style="display:flex; justify-content: center; 
                    margin: 5px auto">Péremption</div>
                    <div class="mainContainerCircle">
                        <a title="En Future (24+ mois)" @click="getMedFuture">
                            <div class="item cyan " :class="title_operation == '+2 ans'? 'bd-w':''"></div>
                        </a>
                        <a title="En bonne état (12-24mois)" @click="getMedGreen">
                            <div class="item green" :class="title_operation == 'Bonne état'? 'bd-w':''"></div>
                        </a>
                        <a title="Date en état alerte (6-12mois)" @click="getMedMedium">
                            <div class="item yellow" :class="title_operation == 'Date critique'? 'bd-w':''"></div>
                        </a>
                        <a title="Date en état critique (1-5mois)" @click="getMedYellow">
                            <div class="item mid-red" :class="title_operation == 'En alerte'? 'bd-b':''"></div>
                        </a>
                        <a title="Périmé" @click="getMedRed">
                            <div class="item red" :class="title_operation == 'Med périmé'? 'bd-w':''"></div>
                        </a>
                        <!-- <div class="item black" @click="getAllFine"></div> -->
                    </div>
                </div>

                <div class="circlesMenu">
                    <div style="display:flex; justify-content: center; 
                    margin: 5px auto">Etat de Stock</div>
                    <div class="mainContainerCircle">
                        <a title="Stock normale" @click="getStockGreen">
                            <div class="item cyan" :class="title_operation == 'Stock normale'? 'bd-w':''"></div>
                        </a>
                        <a title="En état critique" @click="getStockYellow">
                            <div class="item green" :class="title_operation == 'Niveau Critique'? 'bd-w':''"></div>
                        </a>
                        <a title="Stock en alerte" @click="getStockRed">
                            <div class="item yellow" :class="title_operation == 'En Alerte'? 'bd-b':''"></div>
                        </a>
                        <a title="Stock epuisé" @click="getStockZero">
                            <div class="item red" :class="title_operation == 'Stock epuisé'? 'bd-w':''"></div>
                        </a>
                    </div>
                </div>

                <div class="logoMenu c-b" @click="openSettings">
                    <ion-icon :src="settingsSharp" class="logoIcon"></ion-icon>
                    <span class="textMenu textMenu-p t-m-skin">Paramètres</span>
                </div>

                <div class="logoMenu c-b" @click="recorded_operations">
                    <ion-icon :src="notifications" class="logoIcon"></ion-icon>
                    <span class="textMenu textMenu-p t-m-skin">Notifications</span>
                </div>

                <div class="logoMenu c-b" @click="setPassword">
                    <ion-icon :src="lockClosed" class="logoIcon"></ion-icon>
                    <span class="textMenu textMenu-p t-m-skin">Mot de passe</span>
                </div>

                <div class="logoMenu c-b" @click="getPertes">
                    <ion-icon :src="trashBin" class="logoIcon"></ion-icon>
                    <span class="textMenu textMenu-p t-m-skin">Pertes</span>
                </div>
            </div>
            <!-- The dynamic content will be here. -->
            
            <disPo :med="actual_imitiS" 
                :admin="isAdmin"
                v-if="title_operation == 'Disponibles'"/>
            <veNte :med="actual_imitiS" 
                :admin="isAdmin"
                v-if="title_operation == 'Ventes'"/>
            <bonS :med="actual_imitiS" 
                :admin="isAdmin"
                v-if="title_operation == 'Bons'"
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
            <disPo :med="actual_imitiS" 
                :admin="isAdmin"
                v-if="title_operation == 'En Alerte'"/>
            <disPo :med="actual_imitiS" 
                :admin="isAdmin"
                v-if="title_operation == 'Stock epuisé'"/>
                <!-- Peremption -->
            <achAts1 :med="actual_imitiS" 
                :admin="isAdmin"
                v-if="title_operation == '+2 ans'"/>
            <achAts1 :med="actual_imitiS" 
                :admin="isAdmin"
                v-if="title_operation == 'Bonne état'"/>
            <achAts1 :med="actual_imitiS" 
                :admin="isAdmin"
                v-if="title_operation == 'Date critique'"/>
            <achAts1 :med="actual_imitiS" 
                :admin="isAdmin"
                v-if="title_operation == 'En alerte'"/>
            <pereMption :med="actual_imitiS" 
                :admin="isAdmin"
                v-if="title_operation == 'Med périmé'"/>
            <paraMetres 
                :admin="isAdmin"
                v-if="title_operation == 'Paramètres'"/>
            <passWord @op-done="title_operation = ''"
                v-if="title_operation == 'PassWord'"/>

            <notifCations :med="actual_imitiS" 
                v-if="title_operation == 'Notifications'"/>

            <perTes :med="actual_imitiS" 
                v-if="title_operation == 'Pertes'"/>
            <!-- <printControle v-if="onPrint" /> -->
            
        </div>
        <div v-if="onPrint">
            <teleport to="body">
                <print-controle @exit="closePrint" :pageTitle="title_operation">
                    <div>
                        <disPo :med="actual_imitiS" 
                            :admin="isAdmin"
                            v-if="title_operation == 'Disponibles'"/>
                        <veNte :med="actual_imitiS" 
                            :admin="isAdmin"
                            v-if="title_operation == 'Ventes'"/>
                        <bonS :med="actual_imitiS" 
                            :admin="isAdmin"
                            v-if="title_operation == 'Bons'"
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
                            <disPo :med="actual_imitiS" 
                                :admin="isAdmin"
                                v-if="title_operation == 'En Alerte'"/>
                            <disPo :med="actual_imitiS" 
                                :admin="isAdmin"
                                v-if="title_operation == 'Stock epuisé'"/>
                                <!-- Peremption -->
                            <achAts1 :med="actual_imitiS" 
                                :admin="isAdmin"
                                v-if="title_operation == '+2 ans'"/>
                            <achAts1 :med="actual_imitiS" 
                                :admin="isAdmin"
                                v-if="title_operation == 'Bonne état'"/>
                            <achAts1 :med="actual_imitiS" 
                                :admin="isAdmin"
                                v-if="title_operation == 'Date critique'"/>
                            <achAts1 :med="actual_imitiS" 
                                :admin="isAdmin"
                                v-if="title_operation == 'En alerte'"/>
                            <achAts1 :med="actual_imitiS" 
                                :admin="isAdmin"
                                v-if="title_operation == 'Med périmé'"/>

                            <notifCations :med="actual_imitiS" 
                                v-if="title_operation == 'Notifications'"/>
            
            
                    </div>
                </print-controle>
            </teleport>
        </div>
        <teleport to="body">
            <div v-show="shouldNotif" class="notif notifCtl">{{ message }}</div>
        </teleport>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch, toValue, computed, nextTick, inject, provide } from 'vue'
import type { Ref } from 'vue'
import { IonIcon } from '@ionic/vue'
import { 
    close, statsChartOutline, snowOutline, thermometer, pricetagOutline,
    calendarClearOutline, libraryOutline,
    settingsSharp, lockClosed, printOutline, 
    notifications, trashBin
    } from 'ionicons/icons'
import { useKuvoma, useSearchUmuti, useFilterRange, useAskPriviledge } from '../hooks/kuvoma'
import cirCle from './circle.vue'
import disPo from './ctrl/dis-po.vue'
import veNte from './ctrl/ve-nte.vue'
import bonS from './ctrl/bon-s.vue'
import achAts from './ctrl/ach-ats.vue'
import achAts1 from './ctrl/ach-ats-1.vue'
import pereMption from './ctrl/pere-mption.vue'
import suggEst from './ctrl/sugg-est.vue'
import dateGreen from './ctrl/date-green.vue'
import paraMetres from './ctrl/para-metres.vue'
import passWord from './ctrl/pass-word.vue'
import printControle from './ctrl/print-controle.vue'
import notifCations from './ctrl/notif-cations.vue'
import perTes from './ctrl/per-tes.vue'


const emit = defineEmits(['turnControl',])
const title_operation = ref('Opérations')

const message: Ref<string> = ref("zéro element.")
const shouldNotif: Ref<boolean> = ref(false)
const isFilter: Ref<boolean> = ref(false)
const searchEable: Ref<boolean> = ref(true)
const onPrint: Ref<boolean> = ref(false)
const actualPrinting: Ref<string> = ref('')

const actual_obj = ref(null) // holds the Imiti downloaded to be used for Search and Filter
const actual_opt = ref([]) // Tells the base fields we have for research
const actual_type = ref([]) // Tells the input types we support for search
const selected_field = ref('nom_med') // The state that tells the base field for search.
const selected_type = ref('text') // the state that tells the input type of RECHERCHE.
const need_search = ref(null) // the state that mentions the need to perfom the search.
const actual_imitiS = ref([]) // Contains the content to be displayed.
const totaux = ref([0,0]) // To display totals on the footer.

let temp_title = ''

const [date_debut, date_fin] = [ref(''), ref('')]

const setOpTitle = (val:string)=>{
    searchEable.value = true;
    setTimeout(()=>{
        title_operation.value = val
    }, 10)
}
const turnOnNotif = (msg:string)=>{
    if(msg){
        message.value = msg
    }
    shouldNotif.value = true
    setTimeout(()=>{
        shouldNotif.value = false
        message.value = "zéro element."
    }, 1500)
}

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

const vente_url = 'api/rep/reportVentes/'
const [actual_vente, ukuvoma_vente] = useKuvoma(vente_url)
const kuvoma_vente =  ukuvoma_vente.bind(
    null, date_debut, date_fin, 
    isFilter) // In case we want additional parameters

const bons_url = 'api/rep/reportBons/'
// const vente_url = 'api/rep/reportVentes/'
const [actual_bons, ukuvoma_bons] = useKuvoma(bons_url)
const kuvoma_bons =  ukuvoma_bons.bind(
    null, date_debut, date_fin, 
    isFilter) // In case we want additional parameters


const entree_url = 'api/rep/reportEntree/'
const [actual_entree, ukuvoma_entree] = useKuvoma(entree_url)
const kuvoma_entree =  ukuvoma_entree.bind(
    null, date_debut, date_fin, 
    isFilter) // In case we want additional parameters

const operations_url = 'api/rep/report_operations/'
const [operations, report_operations] = useKuvoma(operations_url)
const recorded_operations =  report_operations.bind(
    null, date_debut, date_fin, 
    isFilter) // In case we want additional parameters

const url_pertes = 'api/rep/get_pertes/'
const [pertes, get_pertes] = useKuvoma(url_pertes)
const getPertes =  get_pertes.bind(
    null, date_debut, date_fin, 
    isFilter) // In case we want additional parameters

const suggest_url = 'api/rep/workOn35/'
const [actual_suggest, ukuvoma_suggest] = useKuvoma(suggest_url)

// the newer links
const getStockRed_url = 'api/rep/getStockRed/'
const [stockRed, getStockRed] = useKuvoma(getStockRed_url)

const getStockYellow_url = 'api/rep/getStockYellow/'
const [stockYellow, getStockYellow] = useKuvoma(getStockYellow_url)

const getStockGreen_url = 'api/rep/getStockGreen/'
const [stockGreen, getStockGreen] = useKuvoma(getStockGreen_url)

const getStockZero_url = 'api/rep/getStockZero/'
const [stockZero, getStockZero] = useKuvoma(getStockZero_url)

const getMedFuture_url = 'api/rep/getMedFuture/'
const [medFuture, getMedFuture] = useKuvoma(getMedFuture_url)

const getMedGreen_url = 'api/rep/getMedGreen/'
const [medGreen, getMedGreen] = useKuvoma(getMedGreen_url)

const getMedMedium_url = 'api/rep/getMedMedium/'
const [medMedium, getMedMedium] = useKuvoma(getMedMedium_url)

const getMedYellow_url = 'api/rep/getMedYellow/'
const [medYellow, getMedYellow] = useKuvoma(getMedYellow_url)

const getMedRed_url = 'api/rep/getMedRed/'
const [medRed, getMedRed] = useKuvoma(getMedRed_url)



// functions
const closePrint = ()=>{
    onPrint.value = false;
    title_operation.value = 'Opérations';
}
const openPrint = ()=>{
    onPrint.value = true;
    actualPrinting.value = 'pass-word';
}
// const  openOperations = ()=>{
//     // console.log("title: " + toValue(title_operation) + " ==> " + 'PassWord')
//     title_operation.value = 'Notifications';
//     searchEable.value = true;
// }
const setPassword = ()=>{
    // console.log("title: " + toValue(title_operation) + " ==> " + 'PassWord')
    title_operation.value = 'PassWord';
    searchEable.value = false;
}
const openSettings = ()=>{
    title_operation.value = "Paramètres";
    searchEable.value = false;

}
const nRoutine = (value)=>{
    actual_obj.value = value
    actual_imitiS.value = value
    actual_opt.value = ['nom_med', 
    'quantite_restant','prix_vente', 'date_winjiriyeko',]
    actual_type.value = ['text','text','text','date']
}


// watchers
watch(pertes, (value)=>{
    actual_obj.value = value?.response;
    actual_imitiS.value = value?.response;
    searchEable.value = true;
    actual_opt.value = ['operation', 'who_did_it'];
    actual_type.value = ['text','text'];
    title_operation.value = 'Pertes';
})
watch(operations, (value)=>{
    actual_obj.value = value?.response;
    actual_imitiS.value = value?.response;
    searchEable.value = true;
    actual_opt.value = ['operation', 'who_did_it'];
    actual_type.value = ['text','text'];
    title_operation.value = 'Notifications';
})
watch(isFilter, (value)=>{
    console.log("isFilter: " + value)
})
watch(medFuture, (value)=>{
    console.log("medFuture: " + JSON.stringify(value))
    if (value[0] == undefined){
        console.log("medGreen is likely to be empty.")
        turnOnNotif()
    } 
    else{
        // title_operation.value = ""
        nRoutine(value)
        title_operation.value = "+2 ans"
        // nextTick(()=>{
        //     title_operation.value = "jove"
        // })
    }
})
watch(medGreen, (value)=>{
    if (value[0] == undefined){
        console.log("medGreen is likely to be empty.")
        turnOnNotif()
    } 
    else{
        console.log("Bonne état")
        nRoutine(value)
        title_operation.value = "Bonne état"
    }
})
watch(medMedium, (value)=>{
    if (value[0] == undefined){
        console.log("medMedium is likely to be empty.")
        turnOnNotif()
    } 
    else{
        console.log("Date critique")
        nRoutine(value)
        title_operation.value = "Date critique"
    }
})
watch(medYellow, (value)=>{
    console.log("medYellow : " + JSON.stringify(value))
    if (value[0] == undefined){
        console.log("medYellow is likely to be empty.")
        turnOnNotif()
    } 
    else{
        console.log("Date alerte")
        nRoutine(value)
        title_operation.value = "En alerte"
    }
})
watch(medRed, (value)=>{
    console.log("medRed : " + JSON.stringify(value))
    if (value[0] == undefined){
        console.log("medRed is likely to be empty.")
        turnOnNotif()
    } 
    else{
        console.log("Med périmé")
        nRoutine(value)
        title_operation.value = "Med périmé"
    }
})

watch(stockGreen, (value)=>{
    console.log("stockGreen : " + JSON.stringify(value))
    if (value[0] == undefined){
        console.log("stockGreen is likely to be empty.")
        turnOnNotif()
    } 
    else{
        shouldNotif.value = false
        console.log("Stock normale")
        nRoutine(value)
        title_operation.value = "Stock normale"
    }
})
watch(stockZero, (value)=>{
    console.log("stockZero : " + JSON.stringify(value))
    if (value[0] == undefined){
        console.log("stockZero is likely to be empty.")
        turnOnNotif()
    } 
    else{
        console.log("Stock epuise")
        nRoutine(value)
        title_operation.value = "Stock epuisé"
    }
})
watch(stockYellow, (value)=>{
    console.log("stockYellow : " + JSON.stringify(value))
    if (value[0] == undefined){
        console.log("stockYellow is likely to be empty.")
        turnOnNotif()
    } 
    else{
        console.log("Niveau Critique")
        nRoutine(value)
        title_operation.value = "Niveau Critique"
    }
})
watch(stockRed, (value)=>{
    console.log("stockRed : " + JSON.stringify(value))
    if (value[0] == undefined){
        console.log("stockRed is likely to be empty.")
        turnOnNotif()
    } 
    else{
        console.log("En Alerte")
        nRoutine(value)
        title_operation.value = "En Alerte"
    }
})
watch(allFine, (value)=>{
    if(value.data == 'empty'){
        console.log("It is empty")
        title_operation.value = "Pas Bon"
        turnOnNotif()
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
        turnOnNotif()
    }
    else{
        actual_obj.value = value
        actual_imitiS.value = value
        actual_opt.value = ['nom_med', 
        'quantite_restant','prix_vente', 'date_winjiriyeko',]
        actual_type.value = ['text','text','text','date']
        title_operation.value = "Expiré"
        console.log("new title...: " + title_operation.value)
    }})
watch(endStock, (value)=>{
    if(value.data == 'empty'){
        console.log("It is empty")
        title_operation.value = "Pas zéro Stock"
        turnOnNotif()
    }
    else{
        actual_obj.value = value
        actual_imitiS.value = value
        actual_opt.value = ['nom_med','description_med', 
        'quantite_restant','prix_vente', 'date_last_vente',]
        actual_type.value = ['text','text','text','date']
        title_operation.value = "Zéro Stock"
        // console.log("new title...: " + title_operation.value)
    }})
watch(lowStock, (value)=>{
    if(value.data == 'empty'){
        console.log("It is empty")
        title_operation.value = "Pas low Stock"
        // console.log("new title...: " + title_operation.value)
        turnOnNotif()
    }
    else{
        actual_obj.value = value
        actual_imitiS.value = value
        actual_opt.value = ['nom_med','description_med', 
        'quantite_restant','prix_vente', 'date_last_vente',]
        actual_type.value = ['text','text','text','date']
        title_operation.value = "Low Stock"
        // console.log("new title...: " + title_operation.value)
    }
})
watch(actual_suggest, (value)=>{
    if (value[0] == undefined){
        console.log("Achats is likely to be empty.")
        turnOnNotif()
    } 
    else{
        actual_obj.value = value
        actual_imitiS.value = value
        actual_opt.value = ['nom_med', 
        'quantite_restant','prix_vente', 'date_winjiriyeko',]
        actual_type.value = ['text','text','text','date']
        title_operation.value = "Suggestion"
        // console.log("new title...: " + title_operation.value)
    }
})
watch(actual_entree, (value)=>{
    title_operation.value = ''
    console.log("Achats: " + value)
    if (value[0] == undefined){
        console.log("Achats is likely to be empty.")
        turnOnNotif()
    } 
    else{
        actual_obj.value = value
        actual_imitiS.value = value
        actual_opt.value = ['nom_med', 
        'quantite_restant','prix_vente', 'date_winjiriyeko',]
        actual_type.value = ['text','text','text','date']
        title_operation.value = "Achats"
        searchEable.value = true
    }
})
watch(actual_vente, (value)=>{
    title_operation.value = ''
    console.log("The imitiSold: " + value)
    if (value.response == undefined){
        console.log("Ventes are likely to be empty.")
        turnOnNotif()
    } 
    else{
        actual_obj.value = value.response
        actual_imitiS.value = value.response
        actual_opt.value = ['nom_med', 
        'quantity','prix_vente', 'date_operation', 'caissier']
        actual_type.value = ['text','text','text','date', 'text']
        // setOpTitle("Ventes")
        searchEable.value = true;
        title_operation.value = "Ventes"
        // console.log("Titlte is actual_vente...: " + title_operation.value)
        // console.log("new title...: " + title_operation.value)
    }
})
watch(actual_bons, (value)=>{
    title_operation.value = ''
    console.log("The bons: " + value)
    if (value.response == undefined){
        console.log("Ventes are likely to be empty.")
        turnOnNotif()
    } 
    else{
        actual_obj.value = value
        actual_imitiS.value = value.response
        actual_opt.value = ['nom_med', 
        'quantity','prix_vente', 'date_operation',]
        actual_type.value = ['text','text','text','date']
        // 
        setOpTitle("Bons")
        searchEable.value = false
        // console.log("Titlte is actual_vente...: " + title_operation.value)
        // console.log("new title...: " + title_operation.value)
    }
})
watch(actual_imiti, (value)=>{
    title_operation.value = ""
    if (value.data == undefined){
        console.log("Dispo is likely to be empty.")
        turnOnNotif()
    } 
    else{
        actual_obj.value = value.data
        actual_imitiS.value = value.data
        actual_opt.value = ['nom_med','description_med', 
        'quantite_restant','prix_vente', 'date_last_vente',]
        actual_type.value = ['text','text','text','text','date']
        // setOpTitle("Disponibles")
        searchEable.value = true
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
    // console.log("Actual_imitiS is " + JSON.stringify(actual_imitiS.value))
    if(actual_imitiS.value == undefined){
        console.log("Can't go further.")
        title_operation.value = "Opérations"
        // return 0
    } else{
        temp_title = title_operation.value
        title_operation.value = ''
        setTimeout(()=>{
            title_operation.value = temp_title
        }, 5)
    }
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
        title_operation.value = "Bons"
    }, 0)
}

provide('admin', isAdmin?.value)
</script>

<style scoped>

</style>

