<template>
    <div style="display: inline-flex;">
        <select ref="clickSelect" 
                    style="position: absolute; 
                    transform: translate(-60%);
                    width: 20px;padding: 0;"
                    v-model="actualField">
            <option 
                v-for="(jove, index) in searchableFields">
                {{jove}}</option>
        </select>
        <span style="margin-right: .4rem;">&nbsp;</span> 

        <div>
            <input v-model="search_value" type="text" class="SearchMed" :placeholder="'Rechercher par ' + actualField"/>
        </div>
    </div>
</template>
<script setup>
import { inject, ref, watch} from 'vue'
import { useSearchUmuti } from '../../hooks/kuvoma.js'

const search_value = ref(null)
const search_result = ref([])
const actualField = ref('nom_med')
const clickSelect = ref(null)
const searchableFields = ['nom_med', 'prix_vente', 'quantite_restant',
        'code_med', 'classe_med', 'sous_classe_med', 'forme']
const emit = defineEmits(['valueSearch'])

let imiti_injected = inject('imiti_downloaded')
let order_search = inject('need_clear')

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
    color: black;
}
.SearchMed::placeholder{
    color: rgb(199, 238, 160)
}
</style>

