<template>
    <ion-page>
        <ion-content>
            <div class="menuLeft"></div>
            <div class="mainContainer">
                <div class="sectA" style="text-align: center;">
                    <list-imiti></list-imiti>
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
    defineAsyncComponent
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

    },
}
</script>

<style scoped>
.menuLeft{
    width: 11.5vw;
    height: 100%;
    background-color: red;
    position: absolute;
}
</style>

