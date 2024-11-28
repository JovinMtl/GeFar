<template>
    <ion-page>
        <ion-content>
            <div class="mP">
                <div v-if="server_process" class="loader" style="z-index: 15;">
                    <jove-loader></jove-loader>
                        
                </div>
                <div v-if="controleStatus" class="controleWrapper" style="position: absolute;height: 100vh; width: 100vw; z-index: 17;">
                    <cont-role @turn-control="closeControle"></cont-role>
                </div>
                
                <div class="mainApprob" v-if="approvStatus">
                    
                    <div class="approFile" v-if="approFileStatus">
                        <div class="approFileHeader">
                        </div>
                        <div class="approfileBody">
                            <appro-file @approFileClose="closeApproFile" @fileDataLoaded="getFileDataLoaded"></appro-file>
                        </div>
                        
                    </div>
                    <div class="approClass">
                        <div class="headerApprov" style="display: block;position: sticky; top: 0px; width: 100%; height: 10%; background-color: white; align-items: center; align-content: center; text-align: center;">
                            
                        <span class="closeBtne" style="">
                            <ion-icon :src="close" @click="closeApprov"></ion-icon>
                        </span>
                        <h3>Entrée en Stock</h3>
                        </div>
                        <div class="bodyApprov">
                            <div class="bodyApprov2">
                                <app-rov @inputApprov="searchManager" @approFileOpen="openApproFile" @fileDataLoaded="getFileDataLoaded"></app-rov>
                            </div>
                        </div>
                        <div class="footerApprov" style="display: block;position: sticky; bottom: 0px; width: 100%; height: 10%; background-color: white; align-content: center;">
                            
                            <button class="btnSave" @click="requestUpload">Enregister</button>
                        </div>
                    </div>
                </div>
                
                <div v-if="selectedUmuti.value" :class="selectedUmuti.value ? 'menuLeft': ''">
                    <div class="infoUmuti"></div>
                    <div class="infoUmuti umutiTitle">{{ (selectedUmuti.value.name_umuti).slice(0,14) }}</div>
                    <div class="infoUmuti umutiTitle umutiCode">{{ selectedUmuti.value.code_umuti }}</div>
                    <div class="infoUmuti umutiTitle umutiType">{{ selectedUmuti.value.type_umuti }}</div>
                    <div class="infoUmuti umutiTitle umutiDescription">{{ selectedUmuti.value.description_umuti }}</div>
                    <div class="infoUmuti umutiTitle umutiQteRest">{{ selectedUmuti.value.quantite_restant }}</div>
                    <div class="infoUmuti umutiTitle umutiPrice">{{ selectedUmuti.value.price_out }}</div>
                    <!-- Need to display the number of lots -->
                    <div v-if="activeLot.length" style="text-align: right;">{{ activeLot.length }}</div>
                    <div class="umutiLot">
                        <div v-for="(lot, index) in activeLot" class="lote" :key="index">
                            <div class="head" style="padding-top: 3px; font-size: .88rem">
                                {{ lot.qte }} <br>
                                {{ (String(lot.date)).slice(4,8) }} {{ (String(lot.date)).slice(11,16) }}
                            </div>
                            <div class="sub" v-if="today < lot.date">
                                <ion-icon :src="removeCircleOutline" @click="decrementQte" style="font-size: large;"></ion-icon>
                                <span style="margin-right: .1rem;">&nbsp;</span>
                            <input @click="changeQte($event)" @blur="showChange($event)" :value="lot.to_panier" :id="'q' + index"
                                style="background-color: white; width: 25px; height: 20px; position: relative; top: -4px; left: 1px"/>
                            <span style="margin-right: .1rem;">&nbsp;</span>
                            <ion-icon :src="addCircleOutline" @click="incrementQte" style="font-size: large;"></ion-icon>
                            </div>
                            <div v-else class="sub red">
                                déjà perimé
                            </div>
                        </div>
                    </div>
                    <div class="infoUmuti vendre" v-show="selectedUmuti.value.quantite_restant > 0"
                        style="text-align: right;">
                        <button class="sell" @click="moveToPanier">Vendre</button>
                    </div>
                </div>
                <div class="mainContainer" >
                    <div class="sectA" style="text-align: center;">
                        <list-imiti @actualUmuti="getUmuti" @allImiti="getAllImiti" @emptyResult="alertUmutiNew"></list-imiti>
                    </div>
                    <div class="sectB">
                        <div style="text-align: center; margin: 10px 0px; font-weight: 900; font-size: 1.1rem;">
                            <u>COMMANDE DU PATIENT:</u>
                        </div>
                        <div class="itemPanier" v-for="(umuti, index ) in panier_client">
                            <div class="nomination">
                                {{ index + 1 }}. {{ (umuti.name_umuti).slice(0,8) }} : {{ umuti.price_out }} x {{ umuti.qte }} 
                                
                            <span style="margin-right: .3rem;">&nbsp;</span>
                            <!-- <input style="background-color: white; width: 25px; height: 20px;"/> -->
                            <span style="margin-right: .3rem;">&nbsp;</span>
                            <div>{{ umuti.qte *  umuti.price_out }}</div>
                            </div>
                            <div 
                                class="cancelButto"  :id="'i'+index">
                                    <ion-icon :id="'j'+index" @click="removeUmuti($event)"
                                    :src="close" style="top: 0px; position: relative;">
                                    </ion-icon>
                            </div>
                        </div>
                        <br>
                        <p style="margin-left: .5rem;">
                            Total : <span style="color: black;">{{ total_panier_client }} Fbu</span> 
                        </p>
                        <div class="ending" style="text-align: left;">
                            <button class="confirmButton" @click="toSell">Confirmer</button>
                        </div>
                        <div class="separation"></div>
                        <div class="reduction">
                            <div style="font-style:italic;
                                align-self:center;">
                            Un client spécial?

                                </div>
                                <div class="rdBtn" 
                                :class="rdBtnActive ? 'rdBtn-1':'rdBtn-2'"
                                @click="isSpecial">
                                </div>
                        </div>
                        <div v-if="rdBtnActive" style="height:50px;margin-top:15px;">
                            <label for="pet-select">Choisissez sa profession:</label>

                            <select name="metiers" id="pet-select">
                                <option v-for="profession in professions" 
                                    :value="profession.value">{{profession.name}}
                                    </option>
                            </select>
                        </div>
                    </div>

                    <div class="signeRecherche"></div>
                    <div class="searchBar">
                        <sea-rch @valueSearch="SearchBarManager"></sea-rch>
                    </div>
                    <div class="addElement" v-if="umuti_new" @click="noteUmuti">
                        <ion-icon :src="add"></ion-icon>
                    </div>
                    <div class="menuBar">
                        <me-nu @actualMenu="actualOption"></me-nu>
                    </div>
                    <div class="menuHau exit"  style="">
                        <!-- <ion-icon :src="exitOutline" size="larger"></ion-icon> -->
                        <circum-power @click="logout"></circum-power>
                    </div>
                    <div class="menuHau user"  style="">
                        {{ getUsername() }}
                    </div>
                    <div class="menuHau sync"  style="">
                        <!-- <ion-icon :src="syncOutline"></ion-icon> -->
                        <!-- <Icon icon="catppuccin:python-compiled" /> -->
                        
                        <fluent-cloud-sync28-regular @click="askIndex"></fluent-cloud-sync28-regular>


                    </div>
                    <div class="menuHau magnetic"  style="">
                        <!-- <ion-icon :src="magnetOutline" @click="compileImitiSet"></ion-icon> -->
                        <circum-pill></circum-pill>
                    </div>
                    <teleport to="body">
                        <div v-if="show_facture" class="facturierContainer" @click="closeFacture">
                            <factu-rier @facture-active="closeFacture" 
                            :commande-patient="[panier_client, total_panier_client]"
                            :num_facture="numero_facture"
                            :username="getUsername()"></factu-rier>
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
    watch, provide,
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
import { baseURL } from '../../store/host'
import { useUserStore } from '../../store/user'
import { 
    PanierAPI, PanierClient, ActiveLot, Umuti
} from '../types'
import CircumPower  from '../layout/icon/CircumPower.vue'
import CircumPill from '../layout/icon/pill.vue'
import BiCollection from '../layout/icon/collect.vue'
import FluentCloudSync28Regular from '../layout/icon/cloud.vue'
// import useCloseApprov from '../hooks/jove'

const listImiti = defineAsyncComponent(()=>import('../operations/list-imiti.vue'))
import { 
    IonContent, IonPage, IonIcon, 
} from '@ionic/vue';
import { 
    close, addCircleOutline, removeCircleOutline, magnetOutline, 
    add, exitOutline, syncOutline
} from 'ionicons/icons'
import { Lot } from './types';

const router = useRouter()

const today:Date = new Date

const selectedUmuti:Umuti = reactive({})
const panier_client:Ref<PanierClient[]> = ref([])
const panier_api:Ref<PanierAPI[]> = ref([])
const activeLot:Ref<ActiveLot[]> = ref([])
const actualQte: Ref<number> = ref(1)
const actualValue: Ref<number> = ref(0)
const total_panier_client: Ref<number> = ref(0)
const approvStatus: Ref<boolean> = ref(false)
const approFileStatus: Ref<boolean> = ref(false)
const need_to_updade: Ref<boolean> = ref(false)
const controleStatus: Ref<boolean> = ref(false)
const all_imiti:Ref<Umuti[]> = ref([])
const umuti_new: Ref<boolean> = ref(false)

const server_process: Ref<boolean> = ref(false)
const notifStatus: Ref<boolean> = ref(false)
const rdBtnActive: Ref<boolean> = ref(false)

const query_search = reactive({})
const umuti_single: Ref<boolean> = ref(false)
const show_facture: Ref<boolean> = ref(false)
const clear_search: Ref<number> = ref(0)
const listImiti_update: Ref<number> = ref(0)
const numero_facture: Ref<number> = ref(0)

const last_umutiEntree: Ref<number> = ref(0)
const last_umutiSold: Ref<number> = ref(0)
const should_sync: Ref<number> = ref(0)
const message = shallowRef<string>('hello')

const professions = [
    {
        'value': '',
        'name': 'Quelle metier?'
    },
    {
        'value': 'mt',
        'name': 'Motar'
    },
    {
        'value': 'tv',
        'name': 'Taxi Velo'
    },
    {
        'value': 'md',
        'name': 'Domaine Medicale'
    },
    {
        'value': 'au',
        'name': 'Autre'
    },
]

const url_reportIndex:string = "api/rep/giveLastIndex/"
// const url_remote = "//muteule.pythonanywhere.com"
const url_local:string = "//127.0.0.1:8002"
const url_askInstances:string = "api/rep/getForSync/"
const [last_indexes, askIndex] = useKuvoma(url_reportIndex, url_local)
const [bothData, askInstances] = useKurungika(last_indexes ,url_askInstances) // on local server.

const url_syncFromLocal:string = "api/rep/syncFromLocal/"
const [rep_update, kurungika] = useKurungika(bothData, url_syncFromLocal)



const url_sell:string = "api/out/sell/"
const [sell_report, toSell ] = useKurungika(panier_api, url_sell)
const { getAccessToken, getUsername, setUsername,
        setAccessToken, setRefreshToken } = useUserStore()


const isSpecial = ()=>{
    rdBtnActive.value = !rdBtnActive.value
}

const logout = ()=>{
    // proceed to logout
    setUsername('')
    setAccessToken('')
    setRefreshToken('')
    localStorage.setItem('username', '')
    localStorage.setItem('accessToken', '')
    localStorage.setItem('refreshToken', '')
    console.log("Logging out...")
    // show_authe()
    router.push('/')
}
// const show_authe = ()=>{
//     const container = document.getElementById('authe')
//     container.style.display = 'flex'
// }
const noteUmuti = async ()=>{
    server_process.value = true
    let response = await useNoteUmuti(query_search.value.query)
    if(response.ok){
        console.log("Reussi")
        umuti_new.value = false
        server_process.value = false
    } else{
        console.log("Echoue")
        
    }
    umuti_new.value = false // in case of success
    server_process.value = false
    clear_search.value = 2 // in case of success

}
const alertUmutiNew = async (value)=>{
    // send that value to the url endpoint, it is the latter to decide
    // wether to keep it or not
    if(value == 1){
        console.log("Noticing that we have umuti_New")
        umuti_new.value = true
    } else {
        console.log("Umuti name should probably be more than 4 caracters.")
        umuti_new.value = false
    }
    // let response = await useNoteUmuti(value)s

}
const closeFacture = ()=>{
    show_facture.value = false
    // Reinitializing panier_client and panier_api to start a new commande.
    console.log("Calling closeFacture.")
    panier_client.value = []
    panier_api.value = []
    total_panier_client.value = update_total_client()
}
const SearchBarManager = (value)=>{
    query_search.value = value
}
const requestUpload = ()=>{
    umuti_single.value = !umuti_single.value 
}
const closeControle = ()=>{
    controleStatus.value = false
}
const compileImitiSet = async ()=>{
    const endpoint = '/api/in/compileImitiSet/'

    try {
        const response = await fetch(`${baseURL}${endpoint}`,{
            headers: {
                Authorization: 'Bearer ' + getAccessToken()
            }
        })
        // const server_data = await response.json()
        if(response.ok){
            console.log("The response is okay:", server_process.value)
            listImiti_update.value += 1
        } else {
            console.log("The response hasn't reached here yet")
        }
    } catch (value){
        console.log("The error has occured:", value)
    }

}
const getFileDataLoaded = async (dataArray) => {
    // submitting the data to the server
    // provide send-status and inject it in approv-file
    console.log("Taking Releve on sending DATA to API: ", dataArray)
    server_process.value = true
    const endpoint = '/api/in/kurangura/'

    try {
        const response = await fetch(`${baseURL}${endpoint}`,{
            method: 'POST',
            headers: {
                'Content-type' : 'application/json',
                Authorization : 'Bearer ' + getAccessToken()
            },
            body: JSON.stringify({
                'jov': dataArray
            })
        })
        const server_data = await response.json()
        if(response.ok){
            console.log("The response is okay:", server_process.value)
            setTimeout(()=>{
                compileImitiSet()
                server_process.value = false
            }, 1500)
            approvStatus.value = false
            approFileStatus.value = false
        } else {
            console.log("The response hasn't reached here yet")
        }
    } catch (value){
        console.log("The error has occured:", value)
    }
}
const openApproFile = ()=>{
    approFileStatus.value = true
}
const closeApproFile = ()=>{
    approFileStatus.value = false
}
const searchManager = (value)=>{
    // console.log("You typed: ", value)
    query_search.value = value
    
}
const getAllImiti = (imiti)=>{
    // Has to gets all imiti gathered by list-imiti
    // once they are assigned then they are ready to be injected into approv componenet.
    all_imiti.value = imiti
    console.log("All imiti are emitted : ", imiti)
    
}
const closeApprov = ()=>{
    approvStatus.value = false
}
const actualOption = (value)=>{
    console.log("THe actual menu is : ", value)
    if(value == 2){
        approvStatus.value = true
    } else if(value == 3){
        controleStatus.value = true
    }
}
const showChange = (event)=>{
    // This function takes the number which is in input and
    // makes it the actual value to be first considered when put to the panier
    if (Number(event.target.value)){
        actualValue.value = event.target.value
        const code_s = event.target.getAttribute('id')
        const code = Number(code_s.slice(1))
        // console.log("THe code is: ", code, 'has: ', event.target.value)
        activeLot.value[code].to_panier = Number(event.target.value)
    } else {
        console.log("You should type a Number: ", typeof(event.target.value))
    }
    
}
const changeQte = (value)=>{
    // this function is to ignore
    // console.log("You want to change : ", value.target.getAttribute('id'))
    console.log("You changed : ", value.target.value)

}
const incrementQte = (value)=>{
    // THis function is called when pressing the '+' button on lot

    const code_s = value.target.previousSibling.previousSibling.getAttribute('id')
    const code = Number(code_s.slice(1))
    let jov = (activeLot.value[code]).length
    if( activeLot.value[code].qte > activeLot.value[code].to_panier) {
        activeLot.value[code].to_panier += 1
        console.log("Yes, incrementing")
    } else {
        console.log("No, incrementing")
    }
}
const decrementQte = (value)=>{
    const code_s = value.target.nextSibling.nextSibling.getAttribute('id')
    const code = Number(code_s.slice(1))
    if(activeLot.value[code].to_panier > 0) {
        actualQte.value -= 1
        activeLot.value[code].to_panier -= 1
        console.log("ok, decrementing")
    } else {
        console.log("No, decrementing")
    }
    
}
const number_To_string = (value=10000) => {
    // This function is designed to format a number as a string
    // in a format of separation by 3digits
    let to_convert = value.toString()
    let data_length = to_convert.length
    let i = 0
    let converted = ''
    let reversed = ''
    reversed = to_convert.split('').reverse().toString().replaceAll(',','')
    for(i=0; i < data_length; i++){
        if(i%3==0){
            converted =  converted.concat(`.${reversed[i]}`)
        } else {
            converted = converted.concat(`${reversed[i]}`)
        }
    }
    converted = converted.replace('.', '').split('').reverse().toString().replaceAll(',','')
    return converted
}
const removeUmuti = (obj) => {
    // This function handles the removal of umuti in panier.
    const code_s = obj.target.getAttribute('id')
    const code = Number(code_s.slice(1))
    panier_client.value.splice(code,1)
    panier_api.value.splice(code,1)
    total_panier_client.value = update_total_client()
}
const somme_to_panier = () => {
    // This functions evaluates the sum of quantity chosen in different lots on a same umuti.
    let somme = 0
    activeLot.value.forEach((element)=>{
        somme += element.to_panier
    })
    return somme
}
const lot_array = ():PanierAPI[]=> {
    // This functions builds and array which differentiates the lots have been selected on a same umuti.
    let lote:PanierAPI[] = []
    let value:number = 0
    let right_date:number = 0
    activeLot.value.forEach((element)=>{
        if(element.date > today){
            let obj = {
            'code_operation' : element.code_operation,
            'qte' : element.to_panier,
            }
            value += element.to_panier
            lote.push(obj)
            right_date += 1
        }
        
    })

    if(value){
        return lote
    } else if(right_date) {
        lote[0].qte = 1
        return lote
    } else{
        lote
    }
    
}
const check_panier = (umuti_name) => {
    // This function checks the existence of umuti on panier in order not to duplicate it.
    let panier_length:number = (panier_client.value).length
    let i:number = 0
    console.log("Panier had length of : ", panier_length)
    for(i = 0; i < panier_length; i++){
        console.log("T: ", panier_client.value[i],'>>',umuti_name, '<<', i )
        if(panier_client.value[i].name_umuti == umuti_name){
            notifStatus.value = true
            message.value = "Ce medicament existe deja sur le panier."
            setTimeout(()=>{
                notifStatus.value = false
            }, 1500)
            return 0
        }
    }
    return 1
}
const update_total_client = ():string => {
    // This function updates the sum of the imiti in the panier
    let somme:number = 0
    panier_client.value.forEach((element)=>{
        let p_T = element.price_out * element.qte
        somme += p_T
    })
    let somme_formatted = number_To_string(somme) //formatting by three digits
    return somme_formatted
}
const somme_lote = ():number=>{
    let somme_qte:number = 0
    let date_exp:number = 0
    activeLot.value.forEach((element)=>{
        somme_qte += Number(element.to_panier)
        if((element.date >= today) && (element.qte > 0)){
            date_exp += 1
        }
    })
    if(somme_qte == 0){
        if(date_exp){
            return 1
        } else{
            return 0
        } 
    } else {
        return somme_qte
    }
}
const moveToPanier = ():number => {
    // this function manages to move umuti from selected into panier
    let jove:string = check_panier(selectedUmuti.value.name_umuti)
    if(jove){
        let obj_Client = {
            'name_umuti' : selectedUmuti.value.name_umuti,
            'qte' : somme_lote(),
            'price_out' : Number(selectedUmuti.value.price_out),
        }
        let obj_API = {
            'code_umuti' : selectedUmuti.value.code_umuti,
            'qte' : somme_lote(),
            'lot' : lot_array()
        }

        if(!obj_Client.qte){
            notifStatus.value = true
            message.value = "Ce medicament est perimé. Veuillez le mettre a coté."
            setTimeout(()=>{
                notifStatus.value = false
            }, 1500)
            return 0
        }
        panier_client.value.push(obj_Client)
        panier_api.value.push(obj_API)
        total_panier_client.value = update_total_client()
        // REinitializing
        if (panier_client.value && panier_api.value){
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
const strDate = (lot:Lot[]):Lot[]=>{
    let lot_length:number = lot.length
    for (let i=0; i<lot_length; i++){
        let converted_date = new Date(lot[i].date)
        lot[i].date = converted_date
    }
    return lot
}
const getUmuti = (umuti) => {
    // THis one handles the umuti when it was emitted from list-imiti component.
    let temp_lot:Lot[] = []
    if(selectedUmuti.value == undefined){
        selectedUmuti.value = umuti
        let lots_json = (selectedUmuti.value.lot).replaceAll("'", "\"")
        temp_lot = JSON.parse(lots_json) //setting the activeLot
        activeLot.value = strDate(temp_lot)
        need_to_updade.value = false  // to command not to provide an update from list-imiti
    } else if(selectedUmuti.value.code_umuti === umuti.code_umuti){
        selectedUmuti.value = undefined
        activeLot.value = []
    } else {
        selectedUmuti.value = umuti
        let lots_json = (selectedUmuti.value.lot).replaceAll("'", "\"")
        temp_lot = JSON.parse(lots_json) //setting the activeLot
        activeLot.value = strDate(temp_lot)
        need_to_updade.value = false 
    }
    
}

watch(bothData, (value)=>{
    // should now send them to the remote server.
    kurungika()
    server_process.value = false
})
watch(should_sync, (value)=>{
    askInstances()
})
watch(last_indexes, (value)=>{
    server_process.value = true
    last_umutiEntree.value = value.last_umutiEntree
    last_umutiSold.value = value.last_umutiSold
    should_sync.value += 1
})
watch(sell_report, value=>{
    // Do something when the status response is OK
    console.log("Maintenant nous pouvons VOIR: facturier")
    show_facture.value = true
    numero_facture.value = value.sold
    console.log("Le facturier: ", show_facture.value)
})
provide('needUpdate_list', need_to_updade) // in list-imiti component
provide('needSearch', query_search) // in list-imiti component
provide('needUpdate_server', listImiti_update) // in list-imiti component
provide('imiti_search', all_imiti) // in approv component
provide('need_upload', umuti_single) // in approv component
provide('imiti_downloaded', all_imiti.value) // in search component
// provide('commandePatient', panier_client.value) // in facturier component
provide('need_clear', clear_search) // in search component

</script>

<style scoped>
.mP{
    position: relative;overflow: hidden;
             width: 100%; height: 100%;background-color:rgb(11 245 11 / 59%);
}
.addElement {
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 20px;
    left: 24vw;
    top: -4.5vh;
    /* color: #0bf532; */
    color: black;
    text-align: center;
    align-content: center;
    padding-top: 3px;
    margin: 0;
}
.facturierContainer{
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
.umutiLot{
    overflow: auto;
    /* background-color: yellow; */
    height: 80px;
    width: 60%;
    width: 10vw;
    /* padding: 5px 5px; */
    margin-left: 5px;
}
.exit{
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
.user{
    background-color: transparent; 
    height: 20px; 
    width: 150px; 
    display: flex; 
    position: absolute;
    /* position: relative; */
    left: 55vw; 
    top: 90.5vh; 
    /* top: 87vh; */
    font-size: normal; 
    color: black;
}
.sync{
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
.sync{
    background-color: transparent; 
    height: 25px; 
    width: 25px; 
    display: flex; 
    position: absolute;
    /* position: relative; */
    left: 62vw; 
    top: 89vh; 
    /* top: 87vh; */
    font-size: xx-large; 
    color: black;
}
.magnetic{
    background-color: transparent; 
    height: 25px; 
    width: 25px; 
    display: flex; 
    position: absolute;
    /* position: relative; */
    left: 66vw; 
    top: 89vh; 
    /* top: 87vh; */
    font-size: xx-large; 
    color: black;
}
.infoUmuti{
    width: 100%;
    height: 10%;
    margin-bottom: 5px;
    align-content: center;
    /* margin-left: 1px; */
    /* background-color: green; */
}
.umutiTitle{
    background-color: rgba(128, 128, 128, 0.378); 
    background-color: rgba(255, 255, 255, 0.496);
    background-color: rgba(0, 50, 255, 0.315);
    height: 5%; 
    font-weight: 700;
    padding: 4px 10px;
    border-top-left-radius: 15px;
    border-bottom-right-radius: 15px;
    color: black;
    
}
.umutiDescription{
    height: 10%;
}
.approFileHeader{
    width: 100%;
    height: 8%;
    background-color: gray;
    display: block; 
    align-content: center
}
.approfileBody{
    display: block;
    position: absolute;
    background-color: rgba(79, 92, 75, 0.9);
    width: 100%; 
    height: 90%; 
    /* padding-top: 20%; */
    z-index: 2; 
    /* left: 15vw; */
    overflow: auto;
}
.approFile{
    display: block;
    position: absolute;
    background-color: rgba(79, 92, 75, 0.9);
    width: 60vw; 
    height: 90vh; 
    /* padding-top: 20%; */
    z-index: 2; 
    /* left: 15vw; */
    left: 20vw;
    /* overflow: auto; */
}
.mainApprob{
    position:absolute;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255,255, 0.5); 
    text-align: center;
    z-index: 2;
}
.bodyApprov2{
    overflow: auto;
    border-top: 2px double black;
}
.bodyApprov{
    height: 80%;
    width: 100%;
    overflow: auto;
}

.closeBtn:active{
    position: absolute; 
    left: 88%; 
    top: 10px; 
    font-size: 2rem;
    color: red;
}
.btnSave{
    padding: 5px 15px; 
    font-size: large; 
    background-color: transparent; 
    color: black; 
    /* border: 1px solid black; */
    box-shadow: 0 0 25px rgb(112, 110, 110);
}
.btnSave:active{
    padding: 5px 15px; 
    font-size: large; 
    background-color: transparent; 
    background-color: rgba(25, 255, 25, 0.521);
    color: black; 
    /* border: 1px solid black; */
    /* box-shadow: 0 0 20px black; */
}

.approClass{
    width: 27.3vw;
    height: 97%;
    /* height: 100%; */
    /* background-color: #ff000079; */
    background-color: rgb(255, 255, 255);
    /* position: absolute; */
    position: relative;
    /* padding: 0px 0px; */
    /* color: rgb(63, 62, 62); */
    /* color: rgba(255, 255, 255, 0.3); */
    z-index: 1;
    top: 5px;
    text-align: center;
    transform: translate(134%);
    border-radius: 15px;
    overflow: auto;
    color: black;
    /* color: green */
}
.menuLeft{
    width: 11.6vw;
    height: 100%;
    /* background-color: red; */
    position: absolute;
    /* padding: 10px 10px; */
    color: rgb(63, 62, 62);
}
.hMenuLeft{
    display: none;
}


.lote{
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
.head{
    width: 100%; 
    height: 60%; 
    background-color: transparent;
    color: white;
}
.sub{
    width: 100%; 
    height: 40%;
    background-color: transparent;
    text-align: center;
}
.sell{
    padding: 5px 15px; 
    margin-right: 12px;
    background-color: rgba(14, 14, 211, 0.384);
}
.confirmButton{
    padding: 5px 15px; 
    border: 1px dashed seagreen;
    background-color: rgba(255, 255, 255, 0.4); 
    color: seagreen ;
}
.itemPanier{
    height: 25px;
    width: 100%;
    color: black;
    font-size: 0.85rem;
    position: relative;
    margin-bottom: 5px;
    background-color: rgba(255, 255, 255, 0.568);
    align-content: center;
}
.nomination{
    width: 80%; 
    height: 100%; 
    display: inline-flex;
    position: absolute;
    /* align-items: center; */
}
.cancelButto{
    background-color: rgb(236, 93, 93); 
    /* width: 10%;  */
    /* height: 100%;  */
    width: 13px;
    height: 13px;
    border-radius: 7px;
    display: inline-flex;
    position: relative;
    left: 85%;
    /* align-content: flex-end; */
    top: 2px;
}


.sell:active{
    padding: 5px 15px; 
    background-color: rgba(0, 0, 0, 0.568);
}
.confirmButton:active{
    padding: 5px 15px; 
    border: 1px dashed seagreen;
    background-color: rgba(0, 0, 0, 0.404); 
    color: white ;
}
.red{
    color: red;
    font-size: .8rem;
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

