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
                    <button class="sell">Vendre</button>
                </div>
            </div>
            <div class="mainContainer" >
                <div class="sectA" style="text-align: center;">
                    <list-imiti @actualUmuti="getUmuti" ></list-imiti>
                </div>
                <div class="sectB"></div>
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
export default {
    components:{
        'sea-rch': search,
        'me-nu': menu,
        'list-imiti': listImiti,
        IonContent, IonPage,
    },
    setup() {
        const selectedUmuti = reactive({})
        const show = ref(false)
        const getUmuti = (umuti) => {
            selectedUmuti.value = umuti
            show.value = !show.value
            console.log("The umuti emitted is : ", selectedUmuti.value.id)
        }

        return {
            selectedUmuti, show,
            getUmuti,
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
    background-color: brown;
}
.sell:active{
    padding: 5px 15px; 
    background-color: rgba(14, 14, 211, 0.384);
}
</style>

