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
            <input v-model="umuti_price_in" type="text" placeholder="Price in: (Type_in)">
            <br> <br>
            <input v-model="umuti_price_out" type="text" placeholder="Price out : (Type_in)">
            <br> <br>
            <input v-model="umuti_quantite_initial" type="text" placeholder="Quantite Initial">
            <br> <br>
            <label>Date d'exp. </label> 
            <!-- <br> -->
            <input v-model="umuti_date_exp" type="date" placeholder="Nom du medicament">
            <br> <br>
            <label v-if="date_exp">Type de medicament</label>
            <span style="margin-right: .1rem;">&nbsp;</span>
            <select v-model="type_umuti" v-if="date_exp" style="background-color: white" placeholder="Type" value="Ovule">
                <option>Cp</option>
                <option>Gel</option>
                <option>Ovule</option>
                <option>Sirop</option>
                <option>Inj</option>
                <!-- <option>Inj</option> -->
            </select>
            <br> <br>
            <textarea v-model="description_umuti" v-if="date_exp" style="border-radius: 15px;" name="description" placeholder="Description du medicament" id="" cols="20" rows="3"></textarea>
            <input v-model="ratio_type" v-if="date_exp" type="text" placeholder="ratio: 1 : 1">
            <br><br>
            <input v-model="type_in" v-if="date_exp" type="text" placeholder="Type in: Carton">
            <br> <br>
            <input v-model="type_out" v-if="date_exp" type="text" placeholder="Type out : Plaquette">
            <br><br>
            <input v-model="location" v-if="date_exp" type="text" style="margin-bottom: 5px;" placeholder="Localisation">
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
            <input @blur="saveDate" v-model="date_exp" type="date" placeholder="Nom du medicament">
            <br> <br>
        </div>
        <teleport to="body">
            <div class="notif" v-if="notifStatus">
                <p>{{ message }}</p>
            </div>
        </teleport>
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
        const umuti_price_in = ref(null)
        const umuti_price_out = ref(null)
        const umuti_quantite_initial = ref(null)
        const umuti_date_exp = ref(null)
        const date_exp = ref(null)
        const date_init = ref(new Date)
        const type_umuti = ref('Cp')
        const ratio_type = ref(null)
        const type_in = ref(null)
        const type_out = ref(null)
        const location = ref(null)
        const description_umuti = ref(null)

        const notifStatus = ref(false)
        const message = ref('message initial')
        
        
        console.log("La date de debut: ", date_init.value)
        const  umuti_obj = reactive ({
                'code_umuti': '',
                'date_winjiriyeko': new Date().toISOString(),
                'date_uzohererako': umuti_date_exp.value,
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
            })

        let need_to_upload = inject('need_upload')
        var result = inject('imiti_search')
        
        const saveDate = ()=>{
            console.log("You're trying to Update de DATE")
        }
        const openApproFile = ()=>{
            emit('approFileOpen', 1)
        }
        const approve_handler = ()=>{
            let obj = {
                'code_umuti': selected_search.value.code_umuti,
                'date_winjiriyeko': new Date().toISOString(),
                'date_uzohererako': '',
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

                return umuti_obj
            } else{
                // Fill Umuti_obj from the vmodels set in template
                if((String(umutiName.value)) && (Number(umuti_price_in.value))
                    && (Number(umuti_price_out.value)) 
                    && (Number(umuti_quantite_initial.value)) 
                    && (Date(date_exp.value))
                ){
                    console.log("PASSABLE")
                    umuti_obj.name_umuti = String(umutiName.value)
                    umuti_obj.code_umuti = ''
                    umuti_obj.date_uzohererako = umuti_date_exp.value
                    // umuti_obj.date_winjiriyeko = Date(new Date().toISOString().substring(0,10))
                    umuti_obj.price_in = Number(umuti_price_in.value)
                    umuti_obj.price_out = Number(umuti_price_out.value)
                    umuti_obj.quantite_initial = Number(umuti_quantite_initial.value)
                    umuti_obj.ratio_type = ratio_type.value || 1
                    umuti_obj.location = location.value || 'vide'
                    umuti_obj.type_in = type_in.value || 'vide'
                    umuti_obj.type_out =  type_out.value || 'vide'
                    umuti_obj.description_umuti = description_umuti.value || "vide"

                    return umuti_obj
                } else{
                    console.log("NON PASSABLE")
                    console.log(umutiName.value, umuti_price_in.value,
                    umuti_price_out.value, umuti_quantite_initial.value,
                    date_exp.value
                    )
                    let info = "Veuillez saisir les données correctes."
                    showMessage(info)
                    return undefined
                }
            }
        }

        const showMessage = (info)=>{
            message.value = info
            notifStatus.value = true
            setTimeout(()=>{
                notifStatus.value = false
            }, 1800)
        }
        const selectSearch = (event)=>{
            console.log("You selected ID: ", event.target.getAttribute('id'))
            let code_s = Number((event.target.getAttribute('id')).slice(1))
            selected_search.value = imiti_result.value[code_s]
            console.log("You selected umuti : ", selected_search.value)
            approve_handler()
        }
        
        
        watch(date_exp, (value)=>{
            umuti_obj.date_uzohererako = value
            console.log("Date_exp: ", value)
        })
        watch(need_to_upload, (value)=>{
            // console.log("Want to emit from APPROV")
            let reponse = checkBeforeUpload()
            console.log("Attempting to send: ", reponse)
            if(reponse){
                emit('fileDataLoaded', [umuti_obj,])
            }
            
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
            date_exp, umuti_price_in, umuti_price_out, umuti_date_exp,
            umuti_quantite_initial, description_umuti,
            type_umuti, ratio_type, type_in, type_out, location,
            fileTray, notifStatus, message,
            selectSearch, openApproFile, saveDate,
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