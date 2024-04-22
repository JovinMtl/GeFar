<template>
    <div @click="console.log('Hello world')" style="display: inline-flex;">
        <!-- Here we will display icon -->
        <ion-icon :src="search" style="font-size: larger;"></ion-icon>
        <span style="margin-right: .4rem;">&nbsp;</span> 
        <!-- <ion-searchbar show-cancel-button="focus" placeholder="Show on Focus"
        mode="ios"></ion-searchbar> -->
        <!-- <ion-searchbar 
            class="custom"
            animated="true"
            :debounce="1000" 
            placeholder="Rechercher le medicament"
            showCancelButton="focus"
            cancel-button-text="Rechercher"
            @ionCancel="aboutUser($event)"
            @keyup="checkEnter($event)"
            enterkeyhint="search"
            mode="ios"
            v-model="dataInput"
            >
        </ion-searchbar> -->

        <div>
            <input type="text" class="SearchMed" placeholder="Rechercher le medicament"/>
        </div>
    </div>
</template>

<script>
import { 
    search
} from 'ionicons/icons'
import {
    IonIcon, IonSearchbar
} from '@ionic/vue'
export default {
    components:{
        IonIcon, IonSearchbar,
    },
    setup() {
        return {
            search,
        }
    },
}
</script>

<style scoped>
.SearchMed{
    border-radius: 15px; 
    background-color: transparent;
    border-color: greenyellow; 
    padding: 0px 8px;
}
</style>

