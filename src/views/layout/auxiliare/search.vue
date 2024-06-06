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
const searchableFields = ['name_umuti', 'price_out', 'type_out', 
            'type_umuti', 'description_umuti']
const allowSelect = ref(false)
const clickSelect = ref(null)
const emit = defineEmits(['valueSearch'])

let imiti_injected = inject('imiti_downloaded')
console.log("The imiti first injected are: ", imiti_injected)


const turnSelect = async()=>{
    // allowSelect.value = true
    clickSelect.value.firstChild.click()
    actualField.value = await (clickSelect.value.firstChild.value)
    console.log("Your selected : ", clickSelect.value.firstChild, 'or: ', actualField.value, 'OU: ', clickSelect.value.firstChild.value)
    
}
watch(actualField, value=>{
    actualField.value = value
    console.log("The new value is : ", value)
})
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
    white-space: nowrap;
    overflow: hidden; 
    text-overflow: ellipsis;
}
</style>

