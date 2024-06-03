<template>
    <div>
        <h6>Ici on gère des approvisionnements</h6>
        <div v-if="!selected_search">
            <a title="Importer les medicaments dans un fichier " 
                target="_blank" rel="noopener noreferrer"
                style="color: black;">
                <ion-icon :src="fileTray" @click="openApproFile"></ion-icon>
            </a>
            <br> <br>
            <input v-model="umutiName" type="text" placeholder="Nom du medicament">
            <br>
            <ul style="text-align: right;" v-if="!selected_search">
                <button class="btnResearch" v-for="(umuti, index) in imiti_result" 
                    :id="'a' + index" @click="selectSearch">
                    {{ umuti.name_umuti }} {{ umuti.code_umuti }} {{ umuti.description_umuti }}
                </button>
            </ul>
            <input type="text" placeholder="Price in: (Type_in)">
            <br> <br>
            <input type="text" placeholder="Price out : (Type_in)">
            <br> <br>
            <input type="text" placeholder="Quantite Initial">
            <br> <br>
            <label>Date d'exp. </label> 
            <!-- <br> -->
            <input v-model="date_exp" type="date" placeholder="Nom du medicament">
            <br> <br>
            <label v-if="date_exp">Type de medicament</label>
            <span style="margin-right: .1rem;">&nbsp;</span>
            <select v-if="date_exp" style="background-color: white" placeholder="Type" value="Ovule">
                <option>Cp</option>
                <option>Gel</option>
                <option>Ovule</option>
                <option>Sirop</option>
                <option>Inj</option>
                <!-- <option>Inj</option> -->
            </select>
            <br> <br>
            <textarea v-if="date_exp" style="border-radius: 15px;" name="description" placeholder="Description du medicament" id="" cols="20" rows="3"></textarea>
            <input v-if="date_exp" type="text" placeholder="ratio: 1 : 1">
            <br><br>
            <input v-if="date_exp" type="text" placeholder="Type in: Carton">
            <br> <br>
            <input v-if="date_exp" type="text" placeholder="Type out : Plaquette">
            <br><br>
            <input v-if="date_exp" type="text" style="margin-bottom: 5px;" placeholder="Localisation">
            <br><br>
        </div>
        <div v-if="selected_search">
            <br> <br>
            <label>Nom </label>
            <input :value="selected_search.name_umuti" type="text" 
                disabled="true" placeholder="Nom du medicament">
                <br> <br>
                <label>Qnte </label>  
            <input v-model="selected_search.quantite_initial" type="number" 
                placeholder="Quantite Initial">
                <br> <br>
                <label>Px. A </label>  
            <input v-model="selected_search.price_in" type="number" 
                placeholder="Price in: (Type_in)">
            <br> <br>
            <label>Px. V </label> 
            <input v-model="selected_search.price_out" type="number" 
                placeholder="Price out : (Type_in)">
            <br> <br>
            <label>Date d'éxpiration </label> 
            <!-- <span style="margin-right: .1rem;">&nbsp;</span> -->
            <input v-model="date_exp" type="date" placeholder="Nom du medicament">
            <br> <br>
        </div>
    </div>
</template>
<script>
import { watch, ref, inject, reactive } from 'vue'
import { fileTray } from 'ionicons/icons'
import { IonIcon } from '@ionic/vue'
export default {
    components:{
        IonIcon,
    },
    setup(_, {emit}) {
        var umutiName = ref('')
        const imiti_result = ref([]) 
        const selected_search = ref(null)
        const search_approve = reactive({})
        const date_exp = ref(null)
        let umuti_obj = {
                'code_umuti': '',
                'date_winjiriyeko': new Date(),
                'date_uzohererako': undefined,
                'name_umuti': '',
                'description_umuti': '',
                'type_umuti': '',
                'type_in': '',
                'ratio_type': '',
                'type_out': '',
                'price_in': null,
                'price_out': undefined,
                'quantite_initial': undefined,
                'location': undefined,
            }

        let need_to_upload = inject('need_upload')
        var result = inject('imiti_search')

        const openApproFile = ()=>{
            emit('approFileOpen', 1)
        }
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
                'price_in': null,
                'price_out': undefined,
                'quantite_initial': undefined,
                'location': undefined,
            }
            search_approve.value = obj
        }

        const checkBeforeUpload = ()=>{
            // This function will be executed when received order to upload
            if(selected_search.value){
                // Update umuti_obj according to selected_search
                umuti_obj.code_umuti = selected_search.value.code_umuti
                umuti_obj.date_uzohererako = date_exp.value
                // umuti_obj.date_winjiriyeko = new Date()
                umuti_obj.price_in = selected_search.value.price_in
                umuti_obj.price_out = selected_search.value.price_out
                umuti_obj.quantite_initial = selected_search.value.quantite_initial
                umuti_obj.ratio_type = selected_search.value.ratio_type
                umuti_obj.location = selected_search.value.location
                umuti_obj.type_in = selected_search.value.type_in
                umuti_obj.type_out = selected_search.value.type_out
                umuti_obj.description_umuti = selected_search.value.description_umuti
            } else{
                // Fill Umuti_obj from the vmodels set in template
            }
        }
        const selectSearch = (event)=>{
            console.log("You selected ID: ", event.target.getAttribute('id'))
            let code_s = Number((event.target.getAttribute('id')).slice(1))
            selected_search.value = imiti_result.value[code_s]
            console.log("You selected umuti : ", selected_search.value)
            approve_handler()
        }
        
        watch(need_to_upload, (value)=>{
            // console.log("Want to emit from APPROV")
            checkBeforeUpload()
            emit('fileDataLoaded', [umuti_obj,])
    })
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
            date_exp,
            fileTray, 
            selectSearch, openApproFile,
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