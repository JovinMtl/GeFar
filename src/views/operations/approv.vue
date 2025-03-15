<template>
    <div>
        <!-- <h6>Ici on gère des approvisionnements</h6> -->
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
                    {{ umuti.nom_med }} {{ umuti.code_med }} {{ umuti.description_med }}
                </button>
            </ul>
            <span class="s-cl">
                <label for="">Classe therap.</label> <br>
                <select v-model="classeRef">
                    <option v-for="(classe,index) in allClasses"
                        :id="'c'+index">{{ (classe).slice(0,30) }}</option>
                </select>
            </span>
            <hr>
            <span v-if="classeRef" class="s-cl">
                <label for="">S-Classe therap.</label><br>
                <select v-model="sClasseRef">
                    <option v-for="subClasse in selectedSubClass">{{ (subClasse).slice(0,30) }}</option>
                </select>
            </span>
            <br> <br>
            <label>Forme du medicament</label>
            <span style="margin-right: .1rem;">&nbsp;</span>
            <select v-model="forme_med" style="background-color: white" placeholder="Type" value="Ovule">
                <option>Cp</option>
                <option>Gel</option>
                <option>Ovule</option>
                <option>Sirop</option>
                <option>Inj</option>
            </select>
            <br> <br>
            <input v-model="umuti_quantite_initial" type="number" placeholder="Quantite Initial">
            <br> <br>
            <input v-model="umuti_prix_achat" type="number" placeholder="P.A: (Unité sortant)">
            <br> <br>
            <input v-model="umuti_prix_vente" type="number" placeholder="P.V : (Unité sortant)">
            <br> <br>
            <label>Date d'exp. </label> 
            <input v-model="umuti_date_exp" type="date" placeholder="Nom du medicament">
            
            <!-- <input v-model="ratio" v-if="umuti_date_exp" type="text" placeholder="ratio: 1 : 1">
            <br><br>
            <input v-model="type_achat" v-if="umuti_date_exp" type="text" placeholder="Unité entrant: Carton">
            <br> <br>
            <input v-model="type_vente" v-if="umuti_date_exp" type="text" placeholder="Unité Sortant: Plaquette">
            <br><br>
            <input v-model="location" v-if="umuti_date_exp" type="text" style="margin-bottom: 5px;" placeholder="Localisation"> -->
            <br><br>
        </div>
        <div v-if="selected_search">
            <br> <br>
            <label>Nom </label>
            <input v-model="selected_search.nom_med" type="text" 
                disabled="true" placeholder="Nom du medicament">
                <hr>
                <label>Qnte </label>  
            <input v-model="selected_search.quantite_initial" type="number" 
                placeholder="Quantite Initial">
                <hr> 
                <label>Px. A </label>  
            <input v-model="selected_search.prix_achat" type="number" 
                placeholder="P.A: (Unité sortant)">
            <hr> 
            <label>Px. V </label> 
            <input v-model="selected_search.prix_vente" type="number" 
                placeholder="P.V: (Unité sortant)">
            <hr>
            <label>Date d'exp. </label> 
            <!-- <span style="margin-right: .1rem;">&nbsp;</span> -->
            <input @blur="saveDate" v-model="date_exp" type="date" placeholder="Nom du medicament">
        </div>
        <teleport to="body">
            <div class="notif" v-if="notifStatus">
                <p>{{ message }}</p>
            </div>
        </teleport>
    </div>
</template>
<script setup lang="ts">
import { watch, ref, inject, reactive } from 'vue'
import { fileTray } from 'ionicons/icons'
import { IonIcon } from '@ionic/vue'
import { useKuvoma, useKurungika } from '../hooks/kuvoma.js'
import { MedApprov } from '../layout/types'

const emit = defineEmits(['inputApprov', 'approFileOpen',
    'fileDataLoaded', 'reportAchat'
])
var umutiName = ref('')
const imiti_result = ref([]) 
const selected_search = ref(null)
const search_approve = reactive({})
const umuti_prix_achat = ref(null)
const umuti_prix_vente = ref(null)
const umuti_quantite_initial = ref(null)
const umuti_date_exp = ref(null)
const date_exp = ref(null)
const date_init = ref(new Date)
const forme_med = ref('Cp')
const ratio = ref(null)
const type_achat = ref(null)
const type_vente = ref(null)
const location = ref(null)
const description_med = ref(null)

const notifStatus = ref(false)
const message = ref('message initial')
const allClasses = ref(null)
const allSubClasses = ref(null)
const selectedSubClass = ref(null)
const classeRef = ref(null)
const sClasseRef = ref(null)

const url_local = '//127.0.0.1:8002'
const url_reportIndex = 'api/gOps/getClasses/'
const [cls, getClasses] = useKuvoma(url_reportIndex, url_local)
getClasses()
const  umuti_obj: MedApprov = reactive ({
        'code_med': '',
        'date_entrant': new Date().toISOString(),
        'date_peremption': umuti_date_exp.value,
        'nom_med': '',
        'classe_med': '',
        'sous_classe_med': '',
        'type_achat': '',
        'ratio': '',
        'forme': '',
        'prix_achat': null,
        'prix_vente': undefined,
        'quantite_initial': undefined,
        'location': undefined,
    })

let need_to_upload = inject('need_upload')
let long_name:string = ''
var result = inject('imiti_search')

const url_achat = 'api/in/kurangura/'
const [report_achat, sendFileDataLoaded] = useKurungika([umuti_obj,], url_achat)

const openApproFile = ()=>{
    emit('approFileOpen', 1)
}
const approve_handler = ()=>{
    let obj = {
        'code_med': selected_search.value.code_med,
        'date_entrant': new Date().toISOString(),
        'date_peremption': '',
        'nom_med': selected_search.value.nom_med,
        'classe_med': selected_search.value.classe_med,
        'sous_classe_med': selected_search.value.sous_classe_med,
        // 'type_vente': selected_search.value.type_vente,
        // 'ratio': selected_search.value.ratio,
        // 'type_vente': selected_search.value.type_vente,
        'prix_achat': null,
        'prix_vente': undefined,
        'quantite_initial': undefined,
        'location': undefined,
    }
    search_approve.value = obj
}

const checkBeforeUpload = ()=>{
    // This function will be executed when received order to upload
    if(selected_search.value){
        // Update umuti_obj according to selected_search
        umuti_obj.code_med = selected_search.value.code_med
        umuti_obj.nom_med = selected_search.value.nom_med
        umuti_obj.date_peremption = date_exp.value
        // umuti_obj.date_entrant = new Date()
        umuti_obj.prix_achat = selected_search.value.prix_achat
        umuti_obj.prix_vente = selected_search.value.prix_vente
        umuti_obj.quantite_initial = selected_search.value.quantite_initial
        // umuti_obj.ratio = selected_search.value.ratio
        // umuti_obj.location = selected_search.value.location
        // umuti_obj.type_vente = selected_search.value.type_vente
        // umuti_obj.type_vente = selected_search.value.type_vente
        umuti_obj.classe_med = selected_search.value.classe_med
        umuti_obj.sous_classe_med = selected_search.value.sous_classe_med
        umuti_obj.forme = selected_search.value.forme

        return umuti_obj
    } else{
        // Fill Umuti_obj from the vmodels set in template
        if((String(umutiName.value)) && (Number(umuti_prix_achat.value))
            && (Number(umuti_prix_vente.value)) 
            && (Number(umuti_quantite_initial.value)) 
            && (Date(date_exp.value))
        ){
            umuti_obj.nom_med = String(umutiName.value)
            umuti_obj.date_peremption = umuti_date_exp.value
            // umuti_obj.date_entrant = Date(new Date().toISOString().substring(0,10))
            umuti_obj.classe_med = classeRef.value
            umuti_obj.sous_classe_med = sClasseRef.value
            umuti_obj.prix_achat = Number(umuti_prix_achat.value)
            umuti_obj.prix_vente = Number(umuti_prix_vente.value)
            umuti_obj.quantite_initial = Number(umuti_quantite_initial.value)
            umuti_obj.forme = forme_med.value
            // umuti_obj.ratio = ratio.value || 1
            // umuti_obj.location = location.value || 'vide'
            // umuti_obj.type_vente = type_vente.value || 'vide'
            // umuti_obj.type_vente =  type_vente.value || 'vide'

            return umuti_obj
        } else{
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
    let code_s = Number((event.target.getAttribute('id')).slice(1))
    selected_search.value = imiti_result.value[code_s]
    approve_handler()
}


watch(selected_search, (value)=>{
    console.log("The selected Search:", selected_search.value)
})
watch(classeRef, (value)=>{
    // getting the equivalence of the shorten(30char) name
    (allClasses.value).forEach((elm)=>{
        if (elm.slice(0,30) == value){
            long_name = elm
        }
    })
    let index = (allClasses.value).indexOf(long_name)
    selectedSubClass.value = (allSubClasses.value)[index]
})
watch(cls, (value)=>{
    allClasses.value = value.x
    allSubClasses.value = value.y
    console.log("The Classes are:", allClasses.value)
})
watch(date_exp, (value)=>{
    umuti_obj.date_peremption = value
})
watch(report_achat, (value)=>{
    if (value.detail == 'ok'){
        console.log("Les choses se sont bien passee")  
    } else {
        console.log("Les choses pas bien")
    }
    emit("reportAchat", 2)

})
watch(need_to_upload, (value)=>{
    let reponse = checkBeforeUpload()
    if(reponse){
        emit("reportAchat", 1)
        setTimeout(sendFileDataLoaded, 500)
        // sendFileDataLoaded()
        // emit('fileDataLoaded', [umuti_obj,])
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