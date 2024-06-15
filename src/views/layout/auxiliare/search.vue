<template>
    <div style="display: inline-flex;">

        <ion-icon @click="turnSelect" :src="search" style="font-size: larger;"></ion-icon>

        <span  ref="clickSelect" style="position: absolute;left: -31vw; font-size: .9rem; z-index: -9;">
            <ion-select aria-label="Fruit" interface="popover"
            placeholder="choisir" cancel-text="Annuler" v-model="actualField" >
                <ion-select-option
                    v-for="(jove, index) in searchableFields"> 
                    {{ jove }}
                </ion-select-option>
            </ion-select>
        </span>
        <span style="margin-right: .4rem;">&nbsp;</span> 

        <div>
            <input v-model="search_value" type="text" class="SearchMed" :placeholder="'Rechercher par ' + actualField"/>
        </div>
    </div>
</template>
<script setup>
import { inject, ref, watch} from 'vue'
import { IonSelect, IonSelectOption } from '@ionic/vue'
import { useSearchUmuti } from '../../hooks/kuvoma.js'

const search_value = ref(null)
const search_result = ref([])
const actualField = ref('name_umuti')
const clickSelect = ref(null)
const searchableFields = ['name_umuti', 'price_out', 'quantite_restant',
        'description_umuti', 'type_out', 'type_umuti']
const emit = defineEmits(['valueSearch'])

let imiti_injected = inject('imiti_downloaded')
let order_search = inject('need_clear')
console.log("The imiti first injected are: ", imiti_injected)


const turnSelect = async()=>{
    clickSelect.value.firstChild.click()
    actualField.value = await (clickSelect.value.firstChild.value)
    
}
watch(order_search, value=>{
    if(value == 2){
        console.log("Now we need to clear the input search.")
        search_value.value = ''
    }
})
watch(actualField, value=>{
    actualField.value = value
    console.log("The new value is : ", value)
})
watch(search_value, (value)=>{
    let obj = {
                'query': value,
                'response': 0, // 0 mentionning that the response should stay in imiti-list
                'field': actualField.value
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
    white-space: nowrap;
    overflow: hidden; 
    text-overflow: ellipsis;
}
</style>

