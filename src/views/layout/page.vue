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
                <div class="infoUmuti umutiLot">{{ selectedUmuti.value.lot }}</div>
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
                    <ol>
                        <li v-for="umuti in panier_client">
                           {{ (umuti.name_umuti).slice(0,8) }} : {{ umuti.qte }} x 
                           {{ umuti.price_out }} <br> {{ umuti.qte *  umuti.price_out }}
                        </li>
                    </ol>
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
// import base from './base.vue';
import { 
    defineAsyncComponent,
    reactive, ref,
} from 'vue'
import search from './auxiliare/search.vue';
import menu from './auxiliare/menu.vue';

const listImiti = defineAsyncComponent(()=>import('../operations/list-imiti.vue'))
import { IonContent, IonPage, } from '@ionic/vue';
// import { PanierAPI, PanierClient} from '../layout/types'
export default {
    components:{
        'sea-rch': search,
        'me-nu': menu,
        'list-imiti': listImiti,
        IonContent, IonPage,
    },
    setup() {
        const selectedUmuti = reactive({})
        const panier_client = ref([])
        const panier_api = ref([])

        const moveToPanier = () => {
            // kumenya ivyo dukenera kurungika kuri sell(endpoint)
            // code_umuti, code_operation(lot), qte
            let obj_Client = {
                'name_umuti' : selectedUmuti.value.name_umuti,
                'qte' : 1,
                'price_out' : Number(selectedUmuti.value.price_out),
            }
            let obj_API = {
                'code_umuti' : selectedUmuti.value.code_umuti,
                'qte' : 1,
            }

            panier_client.value.push(obj_Client)
            panier_api.value.push(obj_API)
            if (panier_client.value && panier_api.value){
                selectedUmuti.value = {}
            }
        }
        const getUmuti = (umuti) => {
            selectedUmuti.value = umuti
            console.log("The umuti emitted is : ", selectedUmuti.value.id)
        }

        return {
            selectedUmuti, panier_client,
            getUmuti, moveToPanier,
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
.sell:active{
    padding: 5px 15px; 
    background-color: rgba(0, 0, 0, 0.568);
}
</style>

