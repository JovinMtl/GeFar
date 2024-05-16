<template>
    <ion-page>
        <ion-content>
            <div v-if="selectedUmuti.value" :class="selectedUmuti.value ? 'menuLeft': ''">
                <div class="infoUmuti umutiTitle">{{ selectedUmuti.value.name_umuti }}</div>
                <div class="infoUmuti umutiCode">{{ selectedUmuti.value.code_umuti }}</div>
                <div class="infoUmuti umutiType">{{ selectedUmuti.value.type_umuti }}</div>
                <div class="infoUmuti umutiDescription">{{ selectedUmuti.value.description_umuti }}</div>
                <div class="infoUmuti umutiQteRest">{{ selectedUmuti.value.quantite_restant }}</div>
                <div class="infoUmuti umutiPrice">{{ selectedUmuti.value.price_out }}</div>
                <!-- Need to display the number of lots -->
                <span v-if="activeLot.length" style="margin-left: 2.1rem;">{{ activeLot.length }}</span>
                <div class="infoUmuti umutiLot">
                    <div v-for="(lot, index) in activeLot" class="lote">
                        <div class="head">
                            {{ lot.qte }} <br>
                            {{ (lot.date).slice(5,8) }}_{{ (lot.date).slice(0,4) }}
                        </div>
                        <div class="sub">
                            <ion-icon :src="removeCircleOutline" @click="decrementQte"></ion-icon>
                            <span style="margin-right: .1rem;">&nbsp;</span>
                           <input @click="changeQte($event)" @blur="showChange($event)" :value="lot.to_panier" :id="'q' + index"
                            style="background-color: white; width: 25px; height: 20px;"/>
                           <span style="margin-right: .1rem;">&nbsp;</span>
                           <ion-icon :src="addCircleOutline" @click="incrementQte"></ion-icon>
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
                    <list-imiti @actualUmuti="getUmuti" ></list-imiti>
                </div>
                <div class="sectB">
                    Panier here: <br>
                    <div class="itemPanier" v-for="(umuti, index ) in panier_client">
                        <div class="nomination">
                            {{ index + 1 }}. {{ (umuti.name_umuti).slice(0,8) }} : {{ umuti.price_out }} x {{ umuti.qte }} 
                            
                           <span style="margin-right: .3rem;">&nbsp;</span>
                           <input style="background-color: white; width: 25px; height: 20px;"/>
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
                    <sea-rch></sea-rch>
                </div>
                <div class="menuBar">
                    <me-nu></me-nu>
                </div>
                <div class="menuHau"></div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
import { 
    defineAsyncComponent,
    reactive, ref,
    watch,
} from 'vue'
import search from './auxiliare/search.vue';
import menu from './auxiliare/menu.vue';

const listImiti = defineAsyncComponent(()=>import('../operations/list-imiti.vue'))
import { 
    IonContent, IonPage, IonIcon, 
} from '@ionic/vue';
import { close, addCircleOutline, removeCircleOutline } from 'ionicons/icons'
// import { PanierAPI, PanierClient} from '../layout/types'
export default {
    components:{
        'sea-rch': search,
        'me-nu': menu,
        'list-imiti': listImiti,
        IonContent, IonPage, 
        IonIcon,
    },
    setup() {
        const selectedUmuti = reactive({})
        const panier_client = ref([])
        const panier_api = ref([])
        const activeLot = ref([])
        const actualQte = ref(1)
        const actualValue = ref(0)
        const total_panier_client = ref(0)

        const showChange = (event)=>{
            // This function takes the number which is in input and
            // makes it the actual value to be first considered when put to the panier
            if (Number(event.target.value)){
                actualValue.value = event.target.value
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
            if(activeLot.value[code].to_panier > 1) {
                actualQte.value -= 1
            } else {
                console.log("No, decrementing")
            }
            
        }

        const toSell = () => {
            // need fist to update panier_api according to panier_client
            // send panier_api to sell endpoint
            // panier_client.value.forEach()
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

        const moveToPanier = () => {
            // this function manages to move umuti from selected into panier
            let jove = check_panier(selectedUmuti.value.name_umuti)
            if(jove){
                console.log("The umuti is new in the Panier : ", jove)
                let qte = actualQte.value
                let obj_Client = {
                    'name_umuti' : selectedUmuti.value.name_umuti,
                    'qte' : actualValue.value || somme_to_panier() || 1,
                    'price_out' : Number(selectedUmuti.value.price_out),
                }
                let obj_API = {
                    'code_umuti' : selectedUmuti.value.code_umuti,
                    'qte' : actualValue.value || somme_to_panier() || 1,
                    'lot' : lot_array()
                }

                panier_client.value.push(obj_Client)
                panier_api.value.push(obj_API)
                // REinitializing
                if (panier_client.value && panier_api.value){
                    selectedUmuti.value = {}
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
        const sort_array = (given_array) => {
            // [{"date": "2025-04", "qte": 4, "code_operation": "12dxx9", "to_panier": 0}, {"date": "2024-08", "qte": -3, "code_operation": "23dd", "to_panier": 0}]

            let sorted_array = []
            sorted_array = given_array.sort((elementA, elementB)=> {
                let dateA = new Date(elementA.date)
                let dateB = new Date(elementB.date)
                
                return dateA - dateB
            })
            // current_obj = {
            //     'index'
            // }
            // let i = 0
            // let low_date = 0
            // sorted_array = []
            // given_array.forEach((obj)=>{
            //     for(i=0; i < sorted_array.length; i++){

            //     }
            // })
            if (sorted_array){
                return sort_array
            } else {
                return 0
            }
        }
        const getUmuti = (umuti) => {
            selectedUmuti.value = umuti
            let lots_json = (selectedUmuti.value.lot).replaceAll("'", "\"")
            console.log("we are working on : ", lots_json)
            activeLot.value = JSON.parse(lots_json)
            let array_obj = JSON.parse(lots_json)
            let sorted = sort_array(array_obj)
            console.log("THe SORT REPORT: ", sorted)
        }

        watch(panier_client.value, (value)=>{
            total_panier_client.value = update_total_client()
            console.log("The Panier_client has new change: ", total_panier_client.value)
        })

        return {
            selectedUmuti, panier_client, activeLot, actualValue,
            actualQte, total_panier_client,
            close,  addCircleOutline, removeCircleOutline,
            getUmuti, moveToPanier, removeUmuti, changeQte,
            incrementQte,decrementQte, showChange,
        }
    },
}
</script>

<style scoped>
.menuLeft{
    width: 11.3vw;
    height: 100%;
    /* background-color: red; */
    position: absolute;
    padding: 10px 10px;
    color: rgb(63, 62, 62);
}
.infoUmuti{
    width: 100%;
    height: 10%;
    margin-bottom: 5px;
    /* background-color: green; */
}
.umutiLot{
    overflow: auto;
}
.lote{
    background-color: rgba(128, 128, 128, 0.527);
    height: 100%; 
    width: 93%; 
    margin-bottom: 15px; 
    text-align: center; 
    font-size: .9rem; 
    border-radius: 15px;
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
</style>

