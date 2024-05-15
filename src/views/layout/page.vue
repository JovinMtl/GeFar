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
                <div class="infoUmuti umutiLot" style="overflow: auto;">
                    <!-- {{ selectedUmuti.value.lot }} -->
                    <div v-for="(lot, index) in activeLot" class="lote" style="background-color: rgba(128, 128, 128, 0.527); ;
                        height: 100%; width: 93%; margin-bottom: 15px; text-align: center; font-size: .9rem; border-radius: 15px;">
                        <div class="head" style="width: 100%; height: 60%; background-color: transparent;
                            color: white;">
                            
                            <!-- <span style="margin-right: .3rem;">&nbsp;</span> -->
                            {{ lot.qte }} <br>
                            {{ (lot.date).slice(5,8) }}_{{ (lot.date).slice(0,4) }}
                        </div>
                        <div class="sub" style="width: 100%; height: 40%;background-color: transparent;text-align: center;">
                            <!-- {{ selectedUmuti.value.quantite_restant }} -->
                            <ion-icon :src="removeCircleOutline" @click="decrementQte"></ion-icon>
                            <span style="margin-right: .1rem;">&nbsp;</span>
                           <input @click="changeQte($event)" :value="lot.to_panier" :id="'q' + index"
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
                            
                           <!-- <br> -->
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
                           <!-- {{ index + 1 }}. {{ (umuti.name_umuti).slice(0,8) }} : {{ umuti.qte }} x 
                           {{ umuti.price_out }} 
                           <button style="padding: 5px 5px; margin-left: 10px; 
                           background-color: seagreen; border-radius: 20px;"><ion-icon :src="close"></ion-icon></button>
                           
                           <br> {{ umuti.qte *  umuti.price_out }} -->
                    </div>
                    <!-- <ion-list>
                        <ion-item v-for="umuti in panier_client" mode="ios" :inset="true" style="--ion-item-background: green">
                            <ion-label>
                                {{ (umuti.name_umuti).slice(0,8) }} : {{ umuti.qte }} x 
                           {{ umuti.price_out }} 
                           <button style="padding: 5px 5px; margin-left: 10px; 
                           background-color: seagreen; border-radius: 20px;"><ion-icon :src="close"></ion-icon></button>
                           
                           <br> {{ umuti.qte *  umuti.price_out }}
                            </ion-label>
                           
                           
                        </ion-item>
                    </ion-list> -->
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
                <!-- <div class="menuLeft"></div> -->
                <div class="menuHau"></div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
import { 
    defineAsyncComponent,
    reactive, ref,
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

        const changeQte = (value)=>{
            //
            console.log("You want to change : ", value.target.getAttribute('id'))
        }
        const incrementQte = (value)=>{
            //
            console.log("You want to change : ", value.target.previousSibling.previousSibling.getAttribute('id'))

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
            //
            // console.log("You want to change : ", value.target.nextSibling.nextSibling.getAttribute('id'), "has:", actualQte)

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

        const removeUmuti = (obj) => {
            console.log("You are about to remove : ", obj.target.getAttribute('id'))
            const code_s = obj.target.getAttribute('id')
            const code = Number(code_s.slice(1))
            console.log("THe code sliced: ", code)
            panier_client.value.splice(code,1)
        }

        const somme_to_panier = () => {
            let somme = 0
            activeLot.value.forEach((element)=>{
                somme += element.to_panier
            })
            return somme
        }
        // const init_to_panier = ()=> {
        //     activeLot.value.forEach((element)=>{
        //         element.to_panier = 0
        //     })
        //     return 0
        // }

        const moveToPanier = () => {
            // kumenya ivyo dukenera kurungika kuri sell(endpoint)
            // code_umuti, code_operation(lot), qte
            let qte = actualQte.value
            let obj_Client = {
                'name_umuti' : selectedUmuti.value.name_umuti,
                'qte' : somme_to_panier() | 1,
                'price_out' : Number(selectedUmuti.value.price_out),
            }
            let obj_API = {
                'code_umuti' : selectedUmuti.value.code_umuti,
                'qte' : qte,
            }

            panier_client.value.push(obj_Client)
            panier_api.value.push(obj_API)
            if (panier_client.value && panier_api.value){
                selectedUmuti.value = {}
                activeLot.value = []
                actualQte.value = 1
            }
        }
        const getUmuti = (umuti) => {
            selectedUmuti.value = umuti
            let lots_json = (selectedUmuti.value.lot).replaceAll("'", "\"")
            console.log("we are working on : ", lots_json)
            activeLot.value = JSON.parse(lots_json)
        }

        return {
            selectedUmuti, panier_client, activeLot,
            actualQte,
            close,  addCircleOutline, removeCircleOutline,
            getUmuti, moveToPanier, removeUmuti, changeQte,
            incrementQte,decrementQte,
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

