<template>
    <ion-page>
        <ion-content>
            <div class="mP">
                <div v-show="server_process" class="loader" style="z-index: 15;position:absolute">
                    <jove-loader></jove-loader>
                </div>
                <div class="dashBoardContainer"
                    v-if="dBOpen">
                    <dash-board @closD="closeD"></dash-board>
                </div>
                <div v-if="controleStatus" class="controleWrapper"
                    style="position: absolute;height: 100vh; width: 100vw; z-index: 17;">
                    <cont-role @turn-control="closeControle"></cont-role>
                </div>

                <div class="mainApprob" v-if="approvStatus">

                    <div class="approFile" v-if="approFileStatus">
                        <div class="approFileHeader">
                        </div>
                        <div class="approfileBody">
                            <appro-file @approFileClose="closeApproFile" 
                                @reportAchat="reportAchatHandler"></appro-file>
                        </div>

                    </div>
                    <div class="approClass">
                        <div class="headerApprov"
                            style="display: block;position: sticky; top: 0px; width: 100%; height: 10%; background-color: white; align-items: center; align-content: center; text-align: center;">

                            <span class="closeBtne" style="">
                                <ion-icon :src="close" @click="closeApprov"></ion-icon>
                            </span>
                            <h3>Entrée en Stock</h3>
                        </div>
                        <div class="bodyApprov">
                            <div class="bodyApprov2">
                                <app-rov @inputApprov="searchManager" @approFileOpen="openApproFile"
                                    @reportAchat="reportAchatHandler"></app-rov>
                            </div>
                        </div>
                        <div class="footerApprov"
                            style="display: block;position: sticky; bottom: 0px; width: 100%; height: 10%; background-color: white; align-content: center;">

                            <button class="btnSave" @click="requestUpload">Enregister</button>
                        </div>
                    </div>
                </div>
                <!-- details for umuti were displayed here -->
                <div class="fami"></div>
                <div class="mainContainer">
                    <div class="famil">
                        <input type="text" value="Classe therap."
                            class="inpBl w-90"
                            style="color: black;scale: .8;" disabled>
                        <input type="text" class="w-90"
                        placeholder="Trouver classe" disabled>
                        <!-- All familles will be displayed here. -->
                        <div class="fami-1"
                            v-for="(classe, index) in classes"
                            :key="index" :id="'s'+index"
                            :title="useCapitalLetter(classe.classe_med)"
                            @click="openFamilly">{{ useCapitalLetter((classe.classe_med).slice(0, 12)) }}
                            <span v-show="(classe.classe_med).length > 12" class="c-b-2">...</span>
                        </div>
                    </div>
                    <div class="sectA" :class="selectedUmuti.value ? '':'sectA-1'" style="text-align: center;">
                        <list-imiti @actualUmuti="getUmuti" @allImiti="getAllImiti"
                            @emptyResult="alertUmutiNew" @families="getFamilies"></list-imiti>
                    </div>
                    <div :class="selectedUmuti.value ? '':'noDisp'" style="width: 15vw; padding: 1rem 5px;">
                        <!-- details for selected umuti should appeal here -->
                        <div v-if="selectedUmuti.value" :class="selectedUmuti.value ? 'menuLeft' : ''">
                            <div class="infoUmuti"></div>
                            <div class="infoUmuti umutiTitle">{{ useCapitalLetter((selectedUmuti.value.nom_med).slice(0, 14)) }}</div>
                            <div class="infoUmuti umutiTitle umutiCode">{{ selectedUmuti.value.code_med }}</div>
                            <div class="infoUmuti umutiTitle umutiFamille">{{ selectedUmuti.value.classe_med }}</div>
                            <div class="infoUmuti umutiTitle umutiDescription">{{ selectedUmuti.value.forme || 'forme:vide' }}</div>
                            <div class="infoUmuti umutiTitle umutiQteRest">{{ selectedUmuti.value.quantite_restant }}</div>
                            <div class="infoUmuti umutiTitle umutiPrice">{{ selectedUmuti.value.prix_vente }}</div>
                            <!-- Need to display the number of lots -->
                            <div v-if="activeLot.length" style="text-align: right;" class="c-g">{{ activeLot.length }}</div>
                            <div class="umutiLot">
                                <!--  :class="lot.qte == 0? 'hide':''"   bellow -->
                                <div v-for="(lot, index) in activeLot" class="lote" :class="lot.qte == 0? 'hide':''"  :key="index">
                                    <div class="head" style="padding-top: 3px; font-size: .88rem; ">
                                        {{ lot.qte }} 
                                       <div class="se c-b" style="transform: translate(0%, -30%);"> {{ (String(lot.date)).slice(4, 8) }} {{ (String(lot.date)).slice(11, 16) }} </div>
                                    </div>
                                    <!-- Here should not display Med with qte zero -->
                                    <div class="sub" v-if="today < lot.date">
                                        <!-- <ion-icon :src="removeCircleOutline" @click="decrementQte"
                                            style="font-size: large;"></ion-icon> -->
                                            <button class="paB"  @click="decrementQte">--</button>
                                        <span style="margin-right: .1rem;">&nbsp;</span>
                                        <input @click="changeQte($event)" @blur="showChange($event)" :value="lot.to_panier"
                                            :id="'q' + index" class="se"
                                            style="background-color: rgba(14, 14, 211, 0.384); width: 25px; height: 25px; position: relative; top: -4px; left: 1px;padding: 0.3rem; font-size: 1rem;" />
                                        <span style="margin-right: .1rem;">&nbsp;</span>
                                        <!-- <ion-icon :src="addCircleOutline" @click="incrementQte"
                                            style="font-size: large;"></ion-icon> -->
                                        <button class="paB" @click="incrementQte">+</button>
                                    </div>
                                    <div v-else class="sub red">
                                        déjà perimé
                                    </div>
                                </div>
                            </div>
                            <div class="infoUmuti vendre" v-show="selectedUmuti.value.quantite_restant > 0"
                                style="text-align: right;">
                                <button class="sell" @click="moveToPanier">Ajouter</button>
                            </div>
                        </div>
                    </div>
                    <div class="sectB">
                        <div style="max-height: 41vh; overflow: auto;">
                            <div style="text-align: center; margin: 10px 0px; font-weight: 900;">
                                <u>ORDONNANCE DU PATIENT:</u>
                            </div>
                            <div class="itemPanier"
                             v-for="(umuti, index ) in panier_client">
                                <div class="nomination">
                                    {{ index + 1 }}. {{ (umuti.nom_med).slice(0, 8) }} : {{ umuti.prix_vente }} x {{ umuti.qte
                                    }}

                                    <span style="margin-right: .3rem;">&nbsp;</span>
                                    <span style="margin-right: .3rem;">&nbsp;</span>
                                    <div>{{ umuti.qte * umuti.prix_vente }}</div>
                                </div>
                                <div class="cancelButto" :id="'i' + index">
                                    <ion-icon :id="'j' + index" @click="removeUmuti($event)" :src="close"
                                        style="top: 0px; position: relative;">
                                    </ion-icon>
                                </div>
                            </div>
                            <br>
                            <p v-show="show_total" :class="[rdBtnActive && selectedProf != '' ? 'tot-1' : 'c-b']" style="margin-left: .5rem;">
                                Total : <span>{{ (String(total_panier_client.value).replaceAll("\"",'')) }} Fbu</span>
                            </p>
                            <p v-if="rdBtnActive && selectedProf != ''" style="margin-left: .5rem;">
                                Total : <span style="color: black;">{{ (String(total_panier_client_r.value).replaceAll("\"",'')) }} Fbu</span>
                            </p>
                            <div v-if="confirmRdBtn && show_total && clClean" 
                                @click="server_process=true"
                                class="ending" style="text-align: left;">
                                <button class="confirmButton" @click="toSell">Confirmer</button>
                            </div>
                            <div v-else class="ending" style="text-align: left;">
                                <button class="confirmButton">Veuillez valider les infos du Patient</button>
                            </div>
                        </div>
                        <div v-show="total_panier_client != '0'">
                            <div class="reduction">
                                <div style="font-style:italic;
                                    align-self:center;">
                                    Un client spécial?

                                </div>
                                <div class="rdBtn" :class="rdBtnActive ? 'rdBtn-1' : 'rdBtn-2'" @click="isSpecial">
                                </div>
                            </div>
                            <!-- Begin of reduCtion -->             
                            <reduCtion v-if="rdBtnActive" 
                                :rdBtn="rdBtnActive"
                                @assuRatel="getassuRate"
                                @seleProf=getSelectProf
                                @cfrBtn="setCfrBtn"
                                @objCli="getobjCli"
                                @stateBtn="getstateBtn"/>
                            <!-- end of reduCtion -->
                        </div>
                    </div>

                    <div class="signeRecherche"></div>
                    <div class="searchBar">
                        <sea-rch @valueSearch="SearchBarManager"></sea-rch>
                    </div>
                    <a title="Ajouter pour suggestion ultérieure">
                        <div class="addElement" v-if="umuti_new" @click="noteUmuti">
                            <ion-icon :src="add"></ion-icon>
                        </div>
                    </a>
                    <div class="namePharma nm-p2 nm-s2">
                        <!-- This space is for the name of Pharmacy -->
                         Pharmacie Ubuzima
                    </div>
                    <div class="menuBar">
                        <me-nu @actualMenu="actualOption"></me-nu>
                    </div>
                    <div class="menuHau exit">
                        <circum-power @click="logout"></circum-power>
                    </div>
                    <div class="menuHau user" style="">
                        <a title="uyu ni Wewe nyene" class="c-b">
                            {{ useCapitalLetter((String(getUsername())).slice(0, 10)) }}
                        </a>
                    </div>
                    <div class="menuHau addr" style="">
                            13è Av, Q. Twinyoni, Kamenge. Ntahangwa - Bujumbura
                    </div>
                    <div class="menuHau sync">
                        <a title="ku Mwanya (Sync)" class="c-b">
                            <fluent-cloud-sync28-regular @click="askIndex">
                            </fluent-cloud-sync28-regular>
                        </a>
                    </div>
                    <div class="menuHau magnetic">
                        <a title="ku Gihe (Update)" class="c-b">
                            <circum-pill @click="callCompileImitiSet"></circum-pill>
                        </a>
                    </div>
                    <div v-show="inWaiting" class="menuHau compLoader">
                        <a title="Nimurindire gato" class="c-b">
                            <EnCours />
                        </a>
                    </div>
                    <div v-show="inReady" class="menuHau compLoader">
                        <a title="Ubu murashobora gukubandanya." class="c-b">
                            <prEt />
                        </a>
                    </div>
                    <teleport to="body">
                        <div v-if="show_facture" class="facturierContainer" @click="closeFacture">
                            <factu-rier @facture-active="closeFacture"
                                :commande-patient="[panier_client, total_panier_client]" 
                                :num_facture="numero_facture"
                                :username="getUsername()"
                                :assure_rate="rate_assure"
                                :assureur="panier_api.client.assureur"
                                :imperfections="[succededIndex, formerFactureLength]"></factu-rier>
                        </div>
                    </teleport>
                    <teleport to="body">
                        <div class="notif" v-if="notifStatus">
                            <p>{{ message }}</p>
                        </div>
                    </teleport>

                </div>
            </div>

        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import {
    defineAsyncComponent,
    reactive, ref, shallowRef,
    watch, provide, computed,
    toValue,
} from 'vue'
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'
import seaRch from './auxiliare/search.vue';
import meNu from './auxiliare/menu.vue';
import appRov from '../operations/approv.vue';
import approFile from '../operations/approv-file.vue';
import joveLoader from './auxiliare/jove-loader.vue';
import contRole from '../operations/controle.vue'
import factuRier from '../operations/facturier.vue';
import { useKurungika, useKuvoma, useNoteUmuti } from '../hooks/kuvoma.js'
import { useCapitalLetter } from '../hooks/useReadable.js';
import { baseURL } from '../../store/host'
import { useUserStore } from '../../store/user'
import { useError500 } from '../../store/generalErrors'

import {
    PanierAPI, PanierClient, ActiveLot
} from '../types'
import CircumPower from '../layout/icon/CircumPower.vue'
import CircumPill from '../layout/icon/pill.vue'
import BiCollection from '../layout/icon/collect.vue'
import FluentCloudSync28Regular from '../layout/icon/cloud.vue'
import dashBoard from '@/views/dashBoard.vue';
import reduCtion from '../operations/reduction/redu-ction.vue';

const listImiti = defineAsyncComponent(() => import('../operations/list-imiti.vue'))
import {
    IonContent, IonPage, IonIcon,
} from '@ionic/vue';
import {
    close, addCircleOutline, removeCircleOutline, magnetOutline,
    add, exitOutline, syncOutline
} from 'ionicons/icons'
import { 
    Lot, clInfo, Medi, DataToAPI, 
    DataAssurance,Assu
} from './types';
import EnCours from '../operations/en-cours.vue';
import prEt from '../operations/pr-et.vue';

const router = useRouter()

const today: Date = new Date

const selectedUmuti: Medi = reactive({}) as Medi
const panier_client: Ref<PanierClient[]> = ref([])
const panier_api: DataToAPI = reactive({
    'panier': [],
    'client': {}
})
const message = shallowRef<string>('')
const activeLot: Ref<ActiveLot[]> = ref([])
const actualQte: Ref<number> = ref(1)
const actualValue: Ref<number> = ref(0)
const total_panier_client: Ref<string> = ref('0')
const total_panier_client_r: Ref<string> = ref('0')
const approvStatus: Ref<boolean> = ref(false)
const approFileStatus: Ref<boolean> = ref(false)
const need_to_updade: Ref<boolean> = ref(false)
const controleStatus: Ref<boolean> = ref(false)
const all_imiti: Ref<Medi[]> = ref([])
const umuti_new: Ref<boolean> = ref(false)

const server_process: Ref<boolean> = ref(false)
const notifStatus: Ref<boolean> = ref(false)
const rdBtnActive: Ref<boolean> = ref(false)
const dBOpen: Ref<boolean> = ref(false)
const confirmRdBtn:Ref<boolean> = ref(true)
const clClean: Ref<boolean> = ref(true)

const query_search:Medi = reactive({}) as Medi
const umuti_single: Ref<boolean> = ref(false)
const show_facture: Ref<boolean> = ref(false)
const show_total : Ref<boolean> = ref(false)
const clear_search: Ref<number> = ref(0)
const listImiti_update: Ref<number> = ref(0)
const numero_facture: Ref<number> = ref(0)

const last_medEntree: Ref<number> = ref(0)
const last_medSold: Ref<number> = ref(0)
const should_sync: Ref<number> = ref(0)
const total_r: Ref<number> = ref(2)
const selectedProf: Ref<string> = ref('')
const rate_assure: Ref<number> = ref(0)
const suggest:Ref<string> = ref("Votre assureur")
const classes:Ref<Medi[]> = ref([])

const selectedQte = reactive({
    'id': '',
    'val': 0
})
const succededIndex:Ref<number> = ref(0)
const formerFactureLength:Ref<number> = ref(0)
const actualFactureLength:Ref<number> = ref(0)

// Store
const { getError500, getError500Msg,
    clearError500
 } = useError500()

// Setting of Composables
const url_reportIndex: string = "api/rep/giveLastIndex/"
// const url_remote = "//muteule.pythonanywhere.com"
// const url_local:string = "//127.0.0.1:8002"
const url_local: string = baseURL
const url_askInstances: string = "api/rep/getForSync/"
const [last_indexes, askIndex] = useKuvoma(url_reportIndex, url_local)
const [bothData, askInstances] = useKurungika(last_indexes.value, url_askInstances) // on local server.

const url_syncFromLocal: string = "api/rep/syncFromLocal/"
const [rep_update, kurungika] = useKurungika(bothData.value, url_syncFromLocal)

const url_sell: string = "api/out/sell/"
const [sell_report, toSell] = useKurungika(panier_api, url_sell)
const { getUsername, setUsername,
    setAccessToken, setRefreshToken } = useUserStore()


// from reduction
const getstateBtn = (value:boolean)=>{
    clClean.value = value
}
const getobjCli = (obj)=>{
    panier_api.client = obj
}

const setCfrBtn = (value)=>{
    // receiving the value emitted from reduCtion
}
const getSelectProf = (value)=>{
    selectedProf.value = value
}
const getassuRate = (value)=>{
    rate_assure.value = value
}

setTimeout(()=>{
    dBOpen.value = true // making dashboard to open successfully
}, 1)
const closeD = () => {
    // Closing DashBoard
    dBOpen.value = false
}
const isSpecial = () => {
    rdBtnActive.value = !rdBtnActive.value
    if (rdBtnActive) {
        total_r.value = 1
    } else {
        total_r.value = 2
    }
}

const logout = () => {
    // proceed to logout
    setUsername('')
    setAccessToken('')
    setRefreshToken('')
    localStorage.setItem('username', '')
    localStorage.setItem('accessToken', '')
    localStorage.setItem('refreshToken', '')
    router.push('/')
}
const noteUmuti = async () => {
    server_process.value = true
    let response = await useNoteUmuti(query_search.value.query)
    if (response.ok) {
        console.log("Reussi")
        umuti_new.value = false
        server_process.value = false
    } else {
        console.log("Echoue")

    }
    umuti_new.value = false // in case of success
    server_process.value = false
    clear_search.value = 2 // in case of success

}
const alertUmutiNew = async (value) => {
    // send that value to the url endpoint, it is the latter to decide
    // wether to keep it or not
    if (value == 1) {
        umuti_new.value = true
    } else {
        umuti_new.value = false
    }

}
const closeFacture = () => {
    show_facture.value = false
    // Reinitializing panier_client and panier_api to start a new commande.
    panier_client.value = []
    panier_api.panier = []
    total_panier_client.value = computed(()=>{ return update_total_client()}) 
    total_panier_client_r.value =  computed(()=>{ return update_total_client(1)}) 
    actualFactureLength.value = 0;
    formerFactureLength.value = 0;
    succededIndex.value = 0
    // Here should be initializing sell_report
    // console.log("The sell_report is: " + JSON.stringify(sell_report))
    // sell_report.value = {}
}
const SearchBarManager = (value) => {
    query_search.value = value
}
const requestUpload = () => {
    umuti_single.value = !umuti_single.value
}
const closeControle = () => {
    controleStatus.value = false
}
const  url_compile_imiti_set = 'api/in/compileImitiSet/'
const[reportCompileImitiSet, compileImitiSet] = useKuvoma(url_compile_imiti_set)

const inWaiting = ref(false)
const inReady = ref(false)
const callCompileImitiSet = ()=>{
    inWaiting.value = true;
    compileImitiSet()
    listImiti_update.value += 1
}
// const compileImitiSet = async () => {
//     const endpoint = '/api/in/compileImitiSet/'

//     try {
//         const response = await fetch(`${baseURL}${endpoint}`, {
//             headers: {
//                 Authorization: 'Bearer ' + getAccessToken()
//             }
//         })
//         if (response.ok) {
//             listImiti_update.value += 1
//         }
//     } catch (value) {
//         console.log("The error has occured:", value)
//     }

// }

const reportAchatHandler = (reportAchat:number)=>{
    if(reportAchat == 1){
        server_process.value = true
    } else if (reportAchat == 2){
        server_process.value = false
    }
}

const url_achat = 'api/in/kurangura/'
const inputData = ref(null)
const [report_achat, sendFileDataLoaded] = useKurungika(inputData.value, url_achat)

// const getFileDataLoaded = async (dataArray) => {
//     // submitting the data to the server
//     // provide send-status and inject it in approv-file
//     inputData.value = dataArray
//     console.warn("About to send inputData : " + JSON.stringify(dataArray))
//     return 0
//     server_process.value = true
//     const endpoint = '/api/in/kurangura/'

//     try {
//         const response = await fetch(`${baseURL}${endpoint}`, {
//             method: 'POST',
//             headers: {
//                 'Content-type': 'application/json',
//                 Authorization: 'Bearer ' + getAccessToken()
//             },
//             body: JSON.stringify({
//                 'jov': dataArray
//             })
//         })
//         const server_data = await response.json()
//         if (response.ok) {
//             setTimeout(() => {
//                 compileImitiSet()
//                 server_process.value = false
//             }, 1500)
//             approvStatus.value = false
//             approFileStatus.value = false
//         } else {
//             message.value = "The response hasn't reached here yet"
//             server_process.value = false
//             notifStatus.value = true
//             setTimeout(()=>{
//                 notifStatus.value = false
//             }, 1500)
//         }
//     } catch (value) {
//         message.value = "The error has occured:"
//         server_process.value = false
//         notifStatus.value = true
//         setTimeout(()=>{
//             notifStatus.value = false
//         }, 1500)
//     }
// }
const openApproFile = () => {
    approFileStatus.value = true
}
const closeApproFile = () => {
    approFileStatus.value = false
}
const searchManager = (value) => {
    query_search.value = value

}
const getAllImiti = (imiti) => {
    // Has to gets all imiti gathered by list-imiti
    // once they are assigned then they are ready to be injected into approv componenet.
    all_imiti.value = imiti
}
const getFamilies = (famillies)=>{
    classes.value = famillies
}
const openedFamilly = ref(0)
const openFamilly = (e)=>{
    let index = (e.target.id).slice(1)
    openedFamilly.value = index
}

const closeApprov = () => {
    approvStatus.value = false
}
const actualOption = (value) => {
    console.log("THe actual menu is : ", value)
    if(value == 1){
        dBOpen.value = true
    }
    else if (value == 2) {
        approvStatus.value = true
    } else if (value == 3) {
        controleStatus.value = true
    }
}
const showChange = (event) => {
    // This function takes the number which is in input and
    // makes it the actual value to be first considered when put to the panier
    if (Number(event.target.value)) {
        actualValue.value = event.target.value
        const code_s = event.target.getAttribute('id')
        const code = Number(code_s.slice(1))
        activeLot.value[code].to_panier = Number(event.target.value)
    } else {
        console.log("You should type a Number: ", typeof (event.target.value))
    }

}
const changeQte = (value) => {
    // this function is to ignore
    // console.log("You want to change : ", value.target.getAttribute('id'))
    console.log("You changed : ", value.target.value)

}
const incrementQte = (value) => {
    // THis function is called when pressing the '+' button on lot

    // const code_s = value.target.previousSibling.previousSibling.getAttribute('id')
    const code_s = value.target.previousSibling.previousSibling.previousSibling.getAttribute('id')
    const code = Number(code_s.slice(1))
    let jov = (activeLot.value[code]).length
    let prevVal = activeLot.value[code].to_panier
    if (activeLot.value[code].qte > activeLot.value[code].to_panier) {
        selectedQte.id = code_s
        activeLot.value[code].to_panier += 1
    } 
    
    if ((Number(activeLot.value[code].to_panier) == 10)
        && Number(prevVal) == 9){
            selectedQte.val = Number(activeLot.value[code].to_panier)
    } 
}
const decrementQte = (value) => {
    const code_s = value.target.nextSibling.nextSibling.getAttribute('id')
    const code = Number(code_s.slice(1))
    let prevVal = activeLot.value[code].to_panier
    if (activeLot.value[code].to_panier > 0) {
        selectedQte.id = code_s
        actualQte.value -= 1
        activeLot.value[code].to_panier -= 1
    }
    if ((Number(activeLot.value[code].to_panier) == 9)
        && Number(prevVal) == 10){
            selectedQte.val = Number(activeLot.value[code].to_panier)   
    } 

}

const readableNumber = (value:number=1000):String=>{
    // makes 1000000 into a string of 1.000.000
    let data = String(value)
    let r_data = data.split('').reverse()
    let len = data.length
    let result = ''
    for(let i=0; i <= len-1; i++){
        if(i && i%3==0){
            result = result.concat(`.${r_data[i]}`)
        } else{
            result = result.concat(r_data[i])
        }
    }
    let len2 = result.length
    let result2 = new String()
    for (let i=len2-1; i>=0; i--){
        result2 = result2.concat(result[i])
    }
    return result2
}
const removeUmuti = (obj) => {
    // This function handles the removal of umuti in panier.
    const code_s = obj.target.getAttribute('id')
    const code = Number(code_s.slice(1))
    panier_client.value.splice(code, 1)
    panier_api.panier.splice(code, 1)
    total_panier_client.value = computed(()=>{ return update_total_client()}) 
    total_panier_client_r.value = computed(()=>{ return update_total_client(1)}) 
    actualFactureLength.value = (panier_client.value).length
}
const somme_to_panier = () => {
    // This functions evaluates the sum of quantity chosen in different lots on a same umuti.
    let somme = 0
    activeLot.value.forEach((element) => {
        somme += element.to_panier
    })
    return somme
}
const lot_array = (): PanierAPI[] => {
    // This functions builds and array which differentiates the lots have been selected on a same umuti.
    let lote: PanierAPI[] = []
    let value: number = 0  // counting number of requested items
    let right_date: number = 0 //counting items with right date of expirity
    // console.log("ActiveLot is:", activeLot.value)
    let with_qte = 0
    let i = 0
    let j = 0
    activeLot.value.forEach((element) => {
        if (element.date > today) {
            let obj = {
                'code_operation': element.code_operation,
                'qte': element.to_panier,
            }
            value += element.to_panier // gathering the requested qte
            lote.push(obj)
            right_date += 1
        }
        if(element.qte && (j == 0)){
            with_qte = i
            j += 1
        }
        i += 1

    })

    if (value) { // in case there are requested qte
        console.log("The default lote:", lote)
        return lote
    } else{
        lote[with_qte].qte = 1
        // console.log("The withQte is:", with_qte, "now:", lote)
        return lote
    }
    // else if (right_date) {
    //     lote[0].qte = 1
    //     return lote
    // } else {
    //     lote
    // }

}
const check_panier = (umuti_name) => {
    // This function checks the existence of umuti on panier in order not to duplicate it.
    let panier_length: number = (panier_client.value).length
    let i: number = 0
    // console.log("Panier had length of : ", panier_length)
    for (i = 0; i < panier_length; i++) {
        console.log("T: ", panier_client.value[i], '>>', umuti_name, '<<', i)
        if (panier_client.value[i].nom_med == umuti_name) {
            notifStatus.value = true
            message.value = "Ce medicament existe deja sur le panier."
            setTimeout(() => {
                notifStatus.value = false
            }, 1500)
            return 0
        }
    }
    return 1
}
const update_total_client = (reduction: number = 0): string => {
    // This function updates the sum of the imiti in the panier
    let somme: number = 0
    let somme_formatted: number = 0
    panier_client.value.forEach((element) => {
        let p_T = element.prix_vente * element.qte
        somme += p_T
    })
    // somme = ((somme / 97)+1) * 97 // should round the number
    // console.log("Assurance rate :", rate_assure.value)
    if (reduction == 0) {
        somme_formatted = readableNumber(somme) //formatting by three digits
    } else if (reduction == 1) {
        somme = somme - (somme *( rate_assure.value / 100)).toFixed()
        somme = ((somme / 100).toFixed() ) * 100
        somme_formatted = readableNumber(somme) //formatting by three digits
    } else {
        somme = 0
        somme_formatted = readableNumber(somme) //formatting by three digits
    }
    if(somme){
        show_total.value = true
    } else{
        show_total.value = false
    }
    return somme_formatted
}
const somme_lote = (): number => {
    let somme_qte: number = 0
    let date_exp: number = 0
    activeLot.value.forEach((element) => {
        somme_qte += Number(element.to_panier)
        if ((element.date >= today) && (element.qte > 0)) {
            date_exp += 1
        }
    })
    if (somme_qte == 0) {
        if (date_exp) {
            return 1
        } else {
            return 0
        }
    } else {
        return somme_qte
    }
}
const moveToPanier = (): number => {
    // this function manages to move umuti from selected into panier
    let jove: string = check_panier(selectedUmuti.value.nom_med)
    if (jove) {
        let obj_Client = {
            'nom_med': selectedUmuti.value.nom_med,
            'qte': somme_lote(),
            'prix_vente': Number(selectedUmuti.value.prix_vente),
        }
        let obj_API = {
            'code_med': selectedUmuti.value.code_med,
            'qte': somme_lote(),
            'lot': lot_array()
        }

        if (!obj_Client.qte) {
            notifStatus.value = true
            message.value = "Ce medicament est perimé. Veuillez le mettre a coté."
            setTimeout(() => {
                notifStatus.value = false
            }, 1500)
            return 0
        }
        panier_client.value.push(obj_Client)
        panier_api.panier.push(obj_API)
        total_panier_client.value = computed(()=>{ return update_total_client()}) 
        total_panier_client_r.value = computed(()=>{return update_total_client(1)}) 
        actualFactureLength.value = (panier_client.value).length
        // REinitializing
        if (panier_client.value && panier_api.panier) {
            selectedUmuti.value = undefined
            activeLot.value = []
            actualQte.value = 1
            actualValue.value = 0
        }
    } else {
        console.log("No, the umuti already exist in Panier ", jove)
    }
    return 1
}
const strDate = (lot: Lot[]): Lot[] => {
    let lot_length: number = lot.length
    for (let i = 0; i < lot_length; i++) {
        let converted_date = new Date(lot[i].date)
        lot[i].date = converted_date
    }
    return lot
}
const getUmuti = (umuti) => {
    // THis one handles the umuti when it was emitted from list-imiti component.
    let temp_lot: Lot[] = []
    console.log("The umuti Gotten: " + JSON.stringify(umuti))
    if (selectedUmuti.value == undefined) {
        selectedUmuti.value = umuti
        let lote = umuti.lot
        let lot_elm = {}
        for (let elmDate in lote){
            lot_elm['date'] = new Date(elmDate)
            lot_elm['qte'] = 0
            let sub_lot_elm = []
            for (let sub_elm in lote[elmDate]){
                // fill the qte
                lot_elm['qte'] += lote[elmDate][sub_elm]
            }
            activeLot.value.push(lot_elm)
        }
        let lots_json = (selectedUmuti.value.lot).replaceAll("'", "\"")
        temp_lot = JSON.parse(lots_json) //setting the activeLot
        activeLot.value = strDate(temp_lot)
        need_to_updade.value = false  // to command not to provide an update from list-imiti
    } else if (selectedUmuti.value.code_med === umuti.code_med) {
        selectedUmuti.value = undefined
        activeLot.value = []
    } else {
        selectedUmuti.value = umuti
        let lots_json = (selectedUmuti.value.lot).replaceAll("'", "\"")
        temp_lot = JSON.parse(lots_json) //setting the activeLot
        activeLot.value = strDate(temp_lot)
        need_to_updade.value = false
    }
    // console.log("THe selected umuti: ", selectedUmuti.value)
}
const show_suggest = (e)=>{
    console.log("You entered assureur: ", e.target.value)
    assureur.value = e.target.value
    stage_redu.value = 3
    clClean.value = false
}
const shouldPop = ref(false)
// Watchers
watch(getError500, (val)=>{
    console.log("The error 500 may be detected: " + val)
    if(val){
        console.log("The error 500 is detected")
        server_process.value = false;
        message.value = toValue(getError500Msg);
        notifStatus.value = true;
        setTimeout(()=>{
            notifStatus.value = false
            clearError500()
        }, 8000)
        
    }
})
watch(()=>selectedQte.val, (val)=>{
    let elm = ''
    console.log("Do smething")
    if (Number(val) > 9){
        elm = document.getElementById(selectedQte.id)
        elm.style.paddingLeft  = "0";
        elm.style.fontSize = "0.9rem"
    } else if(Number(val) == 9){
        elm = document.getElementById(selectedQte.id)
        elm.style.paddingLeft  = "0.3rem";
        elm.style.fontSize = "1rem"
    }
})
watch(reportCompileImitiSet, (value)=>{
    if (value.detail == 'ok'){
        listImiti_update.value += 1
        inWaiting.value = false;
        inReady.value = true;
        setTimeout(()=>{
            inReady.value = false
        }, 5000)
    } else{
        // console.warn("CompileSet strange" + JSON.stringify(value))
    }
})
watch(report_achat, (value)=>{
    console.log("The report achat: " + value.detail)
    if(value.detail == 'ok'){
        setTimeout(() => {
            compileImitiSet()
            server_process.value = false
        }, 1500)
        approvStatus.value = false
        approFileStatus.value = false
    }
})
watch(inputData, (value)=>{
    server_process.value = true
    setTimeout(sendFileDataLoaded, 300)
})
watch(rdBtnActive, (value)=>{
    if (!value){
        clClean.value = true
        panier_api.client = {}
        rate_assure.value = 0
    }
})
watch(clClean, (value)=>{
    console.log("clClean status is: ", clClean.value)
})
watch(rate_assure, (value)=>{
    console.log("rate_assure does change into:", value)
})
watch(suggest, (value)=>{
    console.log("The selected option: ", suggest.value)
})
watch(bothData, (value) => {
    // should now send them to the remote server.
    kurungika()
    server_process.value = false
})
watch(should_sync, (value) => {
    askInstances()
})
watch(last_indexes, (value) => {
    server_process.value = true
    last_medEntree.value = value.last_medEntree
    last_medSold.value = value.last_medSold
    should_sync.value += 1
})
watch(sell_report, value => {
    server_process.value = true
    if (value.sold == "FailedBecauseAlreadyExist"){
        // notify the user to change the Numero du Bon
        message.value = "Operation echouée, car ce numero du Bon a été enregistré."
        server_process.value = false
        notifStatus.value = true;
        setTimeout(()=>{
            notifStatus.value = false
        }, 2500)
    }
    else if (value.imperfect){
        // should get the starting index of imperfection
        // to be removed on Client Panier,
        // and show on facturier modal something like 3/5
        console.log("Sorry that we have IMPERFECTION: " + JSON.stringify(value))
        server_process.value = false;
        if(value.suceeded){
            succededIndex.value = value.suceeded;
            formerFactureLength.value =  actualFactureLength.value;
            (panier_client.value).splice(succededIndex.value);
            callCompileImitiSet()
            numero_facture.value = value.num_facture;
            show_facture.value = true;
        } else{
            message.value = "Operation echouée, La quantite de ce produit peut etre indisponible."
            server_process.value = false
            notifStatus.value = true
            setTimeout(()=>{
                notifStatus.value = false
            }, 2500)
        }

    }
    else if (value.sold){
        // Do something when the status response is OK
        console.log("Maintenant nous pouvons VOIR: facturier")
        listImiti_update.value += 1  // Triggering update
        server_process.value = false
        callCompileImitiSet()
        console.warn("end: " + server_process.value)
        show_facture.value = true
        numero_facture.value = value.sold
        console.log("Le facturier: ", show_facture.value)
    }
})
provide('needUpdate_list', need_to_updade) // in list-imiti component
provide('needSearch', query_search) // in list-imiti component
provide('needUpdate_server', listImiti_update) // in list-imiti component
provide('imiti_search', all_imiti) // in approv component
provide('need_upload', umuti_single) // in approv component
provide('imiti_downloaded', all_imiti.value) // in search component
provide('need_clear', clear_search) // in search component
provide('familly_displ', openedFamilly)

</script>

<style scoped>
.mP {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
}

.addElement {
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: rgb(211, 243, 27);
    border-radius: 20px;
    left: 23vw;
    top: -4.5vh;
    color: black;
    text-align: center;
    align-content: center;
    padding-top: 3px;
    margin: 0;
}

.facturierContainer {
    display: flex;
    position: absolute;
    width: 100vw;
    height: 100vh;
    background: transparent;
    color: black;
    justify-content: center;
    justify-items: center;
    align-items: center;
}

.umutiLot {
    overflow: auto;
    height: 80px;
    width: 60%;
    width: 10vw;
    margin-left: 5px;
}
.exit {
    background-color: transparent;
    height: 50px;
    width: 50px;
    display: flex;
    position: absolute;
    left: 86vw;
    top: 89vh;
    top: -4.9vh;
    font-size: xx-large;
    color: black;
}
.user {
    background-color: transparent;
    height: 20px;
    width: 150px;
    display: flex;
    position: absolute;
    left: 53vw;
    top: 90.8vh;
    font-size: 0.9rem;
    font-weight: 800;
    color: black;
}
.addr {
    background-color: transparent;
    height: 20px;
    /* width: 150px; */
    /* display: flex; */
    position: absolute;
    left: 5vw;
    top: 90.8vh;
    font-size: normal;
    color: rgb(46, 45, 45);
    font-size: 0.8rem;
    font-weight: 800;
}
.sync {
    background-color: transparent;
    height: 25px;
    width: 25px;
    display: flex;
    position: absolute;
    left: 62vw;
    top: 89vh;
    font-size: xx-large;
    color: black;
}
.magnetic {
    background-color: transparent;
    height: 25px;
    width: 25px;
    display: flex;
    position: absolute;
    left: 66vw;
    top: 89vh;
    font-size: xx-large;
    color: black;
    cursor: pointer;
}
.magnetic:active{
    transform: scale(0.8);
    /* scale: 1.5; */
}
.compLoader {
    background-color: transparent;
    height: 25px;
    /* width: 25px; */
    display: flex;
    position: absolute;
    left: 69vw;
    top: 90.5vh;
    font-size: xx-large;
    color: black;
    cursor: pointer;
}

.infoUmuti {
    width: 100%;
    height: 10%;
    margin-bottom: 5px;
    align-content: center;
}
.umutiTitle {
    background-color: rgba(0, 50, 255, 0.315);
    height: 5%;
    font-weight: 700;
    padding: 4px 10px;
    border-top-left-radius: 15px;
    border-bottom-right-radius: 15px;
    color: black;
}
.umutiDescription {
    height: 10%;
}
.umutiFamille{
    border: 2px solid green
}

.approFileHeader {
    width: 100%;
    height: 8%;
    background-color: gray;
    display: block;
    align-content: center
}

.approfileBody {
    display: block;
    position: absolute;
    background-color: rgba(79, 92, 75, 0.9);
    width: 100%;
    height: 90%;
    z-index: 2;
    overflow: auto;
}
.approFile {
    display: block;
    position: absolute;
    background-color: rgba(79, 92, 75, 0.9);
    width: 60vw;
    height: 90vh;
    z-index: 2;
    left: 20vw;
}
.mainApprob {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.5);
    text-align: center;
    z-index: 2;
}
.bodyApprov2 {
    overflow: auto;
    border-top: 2px double black;
}
.bodyApprov {
    height: 80%;
    width: 100%;
    overflow: auto;
}
.closeBtn:active {
    position: absolute;
    left: 88%;
    top: 10px;
    font-size: 2rem;
    color: red;
}
.btnSave {
    padding: 5px 15px;
    font-size: large;
    background-color: transparent;
    color: black;
    box-shadow: 0 0 25px rgb(112, 110, 110);
}
.btnSave:active {
    padding: 5px 15px;
    font-size: large;
    background-color: transparent;
    background-color: rgba(25, 255, 25, 0.521);
    color: black;
}
.approClass {
    width: 27.3vw;
    height: 97%;
    background-color: rgb(255, 255, 255);
    position: relative;
    z-index: 1;
    top: 5px;
    text-align: center;
    transform: translate(134%);
    border-radius: 15px;
    overflow: auto;
    color: black;
}
.hMenuLeft {
    display: none;
}
.lote {
    background-color: rgba(128, 128, 128, 0.527);
    height: 80%;
    width: 83%;
    margin-bottom: 15px;
    text-align: center;
    font-size: .9rem;
    border-radius: 15px;
    margin-left: 10px;
    margin-top: 10px;
}
.head {
    width: 100%;
    height: 60%;
    background-color: transparent;
    color: white;
}
.sub {
    width: 100%;
    height: 40%;
    background-color: transparent;
    text-align: center;
}
.sell {
    padding: 5px 15px;
    margin-right: 12px;
    background-color: rgba(14, 14, 211, 0.384);
}
.confirmButton {
    padding: 5px 15px;
    border: 1px dashed seagreen;
    background-color: rgba(255, 255, 255, 0.4);
    color: seagreen;
}
.itemPanier {
    height: 25px;
    width: 100%;
    color: black;
    font-size: 0.85rem;
    position: relative;
    margin-bottom: 5px;
    background-color: rgba(255, 255, 255, 0.568);
    align-content: center;
}
.nomination {
    width: 80%;
    height: 100%;
    display: inline-flex;
    position: absolute;
}
.cancelButto {
    background-color: rgb(236, 93, 93);
    width: 13px;
    height: 13px;
    border-radius: 7px;
    display: inline-flex;
    position: relative;
    left: 85%;
    top: 2px;
}
.sell:active {
    padding: 5px 15px;
    background-color: rgba(0, 0, 0, 0.568);
}
.confirmButton:active {
    padding: 5px 15px;
    border: 1px dashed seagreen;
    background-color: rgba(0, 0, 0, 0.404);
    color: white;
}
.red {
    color: red;
    font-size: .8rem;
}

::-webkit-scrollbar-thumb {
    background-color: black;
    border-radius: 15px;
}
::-webkit-scrollbar {
    width: 3px;
    width: 5px;
    color: green;
}
::-webkit-scrollbar-track {
    background-color: #f1f1f1;
}
.approClass::-webkit-scrollbar-thumb {
    background-color: black;
    border-radius: 15px;
}
.approClass::-webkit-scrollbar {
    width: 3px;
    color: green;
}
.approClass::-webkit-scrollbar-track {
    background-color: #f1f1f1;
    margin: 35px 0px;
}
</style>

