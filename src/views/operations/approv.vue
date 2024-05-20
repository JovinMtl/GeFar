<template>
    <div>
        <h6>Ici on gere des approvisionnement</h6>
        
        <br> <br>
        <input v-model="umutiName" type="text" placeholder="Nom du medicament">
        <hr>
        <ul style="text-align: right;" v-if="!selected_search">
            <button class="btnResearch" v-for="(umuti, index) in imiti_result" 
                :id="'a' + index" @click="selectSearch">
                {{ umuti.name_umuti }} {{ umuti.code_umuti }} {{ umuti.description_umuti }}
            </button>
        </ul>
        
        <br> <br>
        <label>Type de medicament</label>
        <span style="margin-right: .1rem;">&nbsp;</span>
        <select style="background-color: white" placeholder="Type" value="Ovule">
            <option>Cp</option>
            <option>Gel</option>
            <option>Ovule</option>
            <option>Sirop</option>
            <option>Inj</option>
            <!-- <option>Inj</option> -->
        </select>
        <br> <br>
        <textarea style="border-radius: 15px;" name="description" placeholder="Description du medicament" id="" cols="20" rows="3"></textarea>
        <input type="text" placeholder="ratio: 1 : 1">
        <br><br>
        <input type="text" placeholder="Type in: Carton">
        <br> <br>
        <input type="text" placeholder="Type out : Plaquette">
        <br><br>
        <br> <br>
        <input type="text" placeholder="Price in: (Type_in)">
        <br> <br>
        <input type="text" placeholder="Price out : (Type_in)">
        <br> <br>
        <input type="text" placeholder="Quantite Initial">
        <br> <br>
        <input type="text" style="margin-bottom: 5px;" placeholder="Localisation">
        <br>
        <label>Date d'exp. </label> 
        <!-- <br> -->
        <input type="date" placeholder="Nom du medicament">
        <br><hr>
    </div>
</template>
<script>
import { watch, ref, inject, reactive } from 'vue'
export default {
    setup(_, {emit}) {
        var umutiName = ref('')
        const imiti_result = ref([]) 
        const selected_search = ref(null)
        const search_approve = reactive({})
        var result = inject('imiti_search')

        const approve_handler = ()=>{
            let obj = {
                'code_umuti': selected_search.value.code_umuti,
                'date_winjiriyeko': new Date(),
                'date_uzohererako': undefined,
                'name_umuti': selected_search.value.name_umuti,
                'description_umuti': selected_search.value.description_umuti,
                'type_umuti': selected_search.value.type_umuti,
                'type_in': selected_search.value.type_in,
                'ratio_type': selected_search.value.ratio_type,
                'type_out': selected_search.value.type_out,
                'price_in': undefined,
                'price_out': undefined,
                'quantite_initial': undefined,
                'location': undefined,
            }
            search_approve.value = obj
        }
        const selectSearch = (event)=>{
            console.log("You selected ID: ", event.target.getAttribute('id'))
            let code_s = Number((event.target.getAttribute('id')).slice(1))
            selected_search.value = imiti_result.value[code_s]
            console.log("You selected umuti : ", selected_search.value)
            approve_handler()
        }
        
        watch(umutiName, (value)=>{
            let obj = {
                'query': value,
                'response': 1 // 1 mentionning that the response should come here
            }
            emit('inputApprov', obj)
        })
        watch(result, (value)=>{
            imiti_result.value = value
        })
        return {
            umutiName, imiti_result, selected_search,
            selectSearch,
        }
    },
}
</script>

<style scoped>
input, textarea{
    background-color: rgba(25, 255, 25, 0.521);
    color: black;
    padding: 5px 5px;
    /* margin: 0px 15px; */
    border-color: transparent;
}
.btnResearch{
    background-color: transparent;
    border: 2px dashed black;
    color: black;
    margin-bottom: 5px;
    padding: 5px 5px;
}
.btnResearch:active{
    background-color: greenyellow;
    border: 2px dashed black;
    color: black;
    margin-bottom: 5px;
    padding: 5px 5px;
}
</style>