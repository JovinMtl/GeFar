<template>
    <ion-page>
        <ion-content>
            <div style="position: relative;overflow: hidden; width: 100%; height: 100%;">
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
                        <div v-for="(lot, index) in activeLot" class="lote">
                            <div class="head" style="padding-top: 3px; font-size: .88rem">
                                {{ lot.qte }} <br>
                                {{ (lot.date).slice(5,8) }}_{{ (lot.date).slice(0,4) }}
                            </div>
                            <div class="sub">
                                <ion-icon :src="removeCircleOutline" @click="decrementQte" style="font-size: large;"></ion-icon>
                                <span style="margin-right: .1rem;">&nbsp;</span>
                            <input @click="changeQte($event)" @blur="showChange($event)" :value="lot.to_panier" :id="'q' + index"
                                style="background-color: white; width: 25px; height: 20px; position: relative; top: -4px; left: 1px"/>
                            <span style="margin-right: .1rem;">&nbsp;</span>
                            <ion-icon :src="addCircleOutline" @click="incrementQte" style="font-size: large;"></ion-icon>
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
                    <div class="menuHau magnetic"  style="">
                        <ion-icon :src="magnetOutline" @click="compileImitiSet"></ion-icon>
                    </div>
                    <teleport to="body">
                        <div v-if="show_facture" class="facturierContainer" @click="closeFacture">
                            <factu-rier @facture-active="closeFacture" :commande-patient="[panier_client, total_panier_client]"></factu-rier>
                        </div>
                    </teleport>
                </div>
            </div>
                
        </ion-content>
    </ion-page>
</template>

<script>
import { 
    defineAsyncComponent,
    reactive, ref,
    watch, provide,
} from 'vue'
import search from './auxiliare/search.vue';
import menu from './auxiliare/menu.vue';
import approv from '../operations/approv.vue';
import approvFile from '../operations/approv-file.vue';
import joveLoader from './auxiliare/jove-loader.vue';
import controle from '../operations/controle.vue'
import facturier from '../operations/facturier.vue';
import { useKurungika, useNoteUmuti } from '../hooks/kuvoma.js'
// import useCloseApprov from '../hooks/jove'

const listImiti = defineAsyncComponent(()=>import('../operations/list-imiti.vue'))
import { 
    IonContent, IonPage, IonIcon, 
} from '@ionic/vue';
import { close, addCircleOutline, removeCircleOutline, magnetOutline, add } from 'ionicons/icons'
// import { PanierAPI, PanierClient} from '../layout/types'
export default {
    components:{
        'sea-rch': search,
        'me-nu': menu,
        'list-imiti': listImiti,
        'app-rov': approv,
        'appro-file': approvFile,
        'jove-loader': joveLoader,
        'cont-role': controle,
        'factu-rier': facturier,
        IonContent, IonPage, 
        IonIcon,
    },
    setup() {
        // const [approvStatus] = useCloseApprov()

        const selectedUmuti = reactive({})
        const panier_client = ref([])
        const panier_api = ref([])
        const activeLot = ref([])
        const actualQte = ref(1)
        const actualValue = ref(0)
        const total_panier_client = ref(0)
        const approvStatus = ref(false)
        const approFileStatus = ref(false)
        const need_to_updade = ref(false)
        const controleStatus = ref(false)
        const all_imiti = ref([])
        const umuti_new = ref(false)

        const server_process = ref(false)

        const query_search = reactive({})
        const umuti_single = ref(false)
        const show_facture = ref(false)
        const clear_search = ref(0)
        
        let url_sell = "/api/out/sell/"
        const [sell_report, toSell ] = useKurungika(panier_api, url_sell)

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
            // const server = '//127.0.0.1:8002'
            const base = '//muteule.pythonanywhere.com'
            const endpoint = '/api/in/compileImitiSet/'

            try {
                const response = await fetch(`${server}${endpoint}`)
                // const server_data = await response.json()
                if(response.ok){
                    console.log("The response is okay:", server_process.value)
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
            const base = '//muteule.pythonanywhere.com'
            const endpoint = '/api/in/kurangura/'

            try {
                const response = await fetch(`${server}${endpoint}`,{
                    method: 'POST',
                    headers: {
                        'Content-type' : 'application/json'
                    },
                    body: JSON.stringify({
                        'jov': dataArray
                    })
                })
                const server_data = await response.json()
                if(response.ok){
                    console.log("The response is okay:", server_process.value)
                    setTimeout(()=>{
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

        // const toSell = () => {
        //     // need fist to update panier_api according to panier_client
        //     // send panier_api to sell endpoint
        //     // panier_client.value.forEach()
        //     need_to_updade.value = true
        //     server_process.value = true
        //     let url_sell ="/api/out/sell/"
            
        //     console.log("The result of toSell is: ", rungika.value)
        //     setTimeout(() => {
        //         server_process.value = false
        //     }, 3000);

        // }

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

        const lot_array = ()=> {
            // This functions builds and array which differentiates the lots have been selected on a same umuti.
            let lote = []
            let value = 0
            activeLot.value.forEach((element)=>{
                let obj = {
                    'code_operation' : element.code_operation,
                    'qte' : element.to_panier,
                }
                value += element.to_panier
                lote.push(obj)
            })

            if(value){
                return lote
            } else {
                lote[0].qte = 1
                return lote
            }
            
        }

        const check_panier = (umuti_name) => {
            // This function checks the existence of umuti on panier in order not to duplicate it.
            let panier_length = (panier_client.value).length
            let i = 0
            console.log("Panier had length of : ", panier_length)
            for(i = 0; i < panier_length; i++){
                console.log("T: ", panier_client.value[i],'>>',umuti_name, '<<', i )
                if(panier_client.value[i].name_umuti == umuti_name){
                    return 0
                }
            }
            return 1
        }

        const update_total_client = () => {
            // This function updates the sum of the imiti in the panier
            let somme = 0
            panier_client.value.forEach((element)=>{
                let p_T = element.price_out * element.qte
                somme += p_T
            })
            let somme_formatted = number_To_string(somme) //formatting by three digits
            return somme_formatted
        }

        const somme_lote = ()=>{
            let somme_qte = 0
            activeLot.value.forEach((element)=>{
                somme_qte += Number(element.to_panier)
            })
            if(somme_qte == 0){
                return 1
            } else {
                return somme_qte
            }
        }

        const moveToPanier = () => {
            // this function manages to move umuti from selected into panier
            let jove = check_panier(selectedUmuti.value.name_umuti)
            if(jove){
                console.log("The umuti is new in the Panier : ", jove)
                let qte = actualQte.value
                let obj_Client = {
                    'name_umuti' : selectedUmuti.value.name_umuti,
                    // 'qte' : actualValue.value || somme_to_panier() || 1,
                    'qte' : somme_lote(),
                    'price_out' : Number(selectedUmuti.value.price_out),
                }
                let obj_API = {
                    'code_umuti' : selectedUmuti.value.code_umuti,
                    // 'qte' : actualValue.value || somme_to_panier() || 1,
                    'qte' : somme_lote(),
                    'lot' : lot_array()
                }

                panier_client.value.push(obj_Client)
                panier_api.value.push(obj_API)
                total_panier_client.value = update_total_client()
                // REinitializing
                if (panier_client.value && panier_api.value){
                    // selectedUmuti.value = {}
                    selectedUmuti.value = undefined
                    activeLot.value = []
                    actualQte.value = 1
                    actualValue.value = 0
                    // console.log("for Client: ", panier_client.value)
                    // console.log("for API: ", panier_api.value)
                }
            } else {
                console.log("No, the umuti already exist in Panier ", jove)
            }
            
        }
        
        const getUmuti = (umuti) => {
            // THis one handles the umuti when it was emitted from list-imiti component.
            console.log("Gotten:", umuti, 'and:', selectedUmuti.value)
            if(selectedUmuti.value == undefined){
                console.log("It is not the same: ", selectedUmuti.value, 'and', umuti.code_umuti)
                selectedUmuti.value = umuti
                let lots_json = (selectedUmuti.value.lot).replaceAll("'", "\"")
                activeLot.value = JSON.parse(lots_json) //setting the activeLot
                need_to_updade.value = false  // to command not to provide an update from list-imiti
            } else if(selectedUmuti.value.code_umuti === umuti.code_umuti){
                console.log("It is the same: ", selectedUmuti.value, 'and', umuti)
                selectedUmuti.value = undefined
                activeLot.value = []
            } else {
                selectedUmuti.value = umuti
                let lots_json = (selectedUmuti.value.lot).replaceAll("'", "\"")
                activeLot.value = JSON.parse(lots_json) //setting the activeLot
                need_to_updade.value = false 
            }
            
        }


        watch(sell_report, value=>{
            // Do something when the status response is OK
            console.log("Maintenant nous pouvons VOIR: facturier")
            show_facture.value = true
            console.log("Le facturier: ", show_facture.value)
        })
        provide('needUpdate_list', need_to_updade) // in list-imiti component
        provide('needSearch', query_search) // in list-imiti component
        provide('imiti_search', all_imiti) // in approv component
        provide('need_upload', umuti_single) // in approv component
        provide('imiti_downloaded', all_imiti.value) // in search component
        // provide('commandePatient', panier_client.value) // in facturier component
        provide('need_clear', clear_search) // in search component

        return {
            selectedUmuti, panier_client, activeLot, actualValue,
            actualQte, total_panier_client,
            approvStatus, approFileStatus, server_process,
            controleStatus, noteUmuti, umuti_new,
            close, addCircleOutline, removeCircleOutline,
            magnetOutline, add,
            getUmuti, moveToPanier, removeUmuti, changeQte,
            incrementQte,decrementQte, showChange,
            show_facture,
            actualOption, closeApprov, getAllImiti, toSell,
            searchManager, openApproFile, closeApproFile,
            getFileDataLoaded, compileImitiSet, closeControle,
            requestUpload, SearchBarManager, closeFacture,
            noteUmuti, alertUmutiNew,
        }
    },
}
</script>

<style scoped>
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
.magnetic{
    background-color: transparent; 
    height: 20px; 
    width: 20px; 
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

