<template>
    <div @click="turnSelect" style="display: inline-flex;">
        <!-- Here we will display icon -->
        <ion-icon :src="search" style="font-size: larger;"></ion-icon>
        <span style="margin-right: .4rem;">&nbsp;</span> 

        <div>
            <input v-model="search_value" type="text" class="SearchMed" placeholder="Rechercher le medicament"/>
        </div>
        <span>
            <ion-select aria-label="Fruit" interface="popover" 
            placeholder="choisir" ref="clickSelect" cancel-text="Annuler" v-model="somme">
                <ion-select-option
                    v-for="(jove, index) in ['one', 'two', 'three']" :value="index" > 
                    {{ jove }}
                </ion-select-option>
            </ion-select>
        </span>
    </div>
</template>
<script setup>
import { inject, ref, watch} from 'vue'
import { IonSelect, IonSelectOption } from '@ionic/vue'
import { useSearchUmuti } from '../../hooks/kuvoma.js'

const search_value = ref(null)
const search_result = ref([])
const somme = ref(null)
const allowSelect = ref(false)
const emit = defineEmits(['valueSearch'])

let imiti_injected = inject('imiti_downloaded')
console.log("The imiti first injected are: ", imiti_injected)


const turnSelect = ()=>{
    allowSelect.value = true
}

watch(search_value, (value)=>{
    console.log("THe search value should be : ", value)
    console.log("The imiti injected are: ", imiti_injected.value)
    // let result = useSearchUmuti(imiti_injected, value, 'name_umuti')
    // console.log("the result is : ", result)
    let obj = {
                'query': value,
                'response': 0 // 0 mentionning that the response should stay in imiti-list
            }
    emit('valueSearch', obj)
})
watch(search_result, (value)=>{
    // have to emit the result
})
watch(imiti_injected, (value)=>{
    console.log("The change in search: ", value)
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

