<template>
    <div @click="console.log('Hello world')" style="display: inline-flex;">
        <!-- Here we will display icon -->
        <ion-icon :src="search" style="font-size: larger;"></ion-icon>
        <span style="margin-right: .4rem;">&nbsp;</span> 

        <div>
            <input v-model="search_value" type="text" class="SearchMed" placeholder="Rechercher le medicament"/>
        </div>
    </div>
</template>
<script setup>
import { ref, watch} from 'vue'
const search_value = ref(null)
const search_result = ref([])

watch(search_value, (value)=>{
    console.log("THe search value should be : ", value)
})
watch(search_result, (value)=>{
    // have to emit the result
})
</script>


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

