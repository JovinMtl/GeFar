<template>
    <div>
        <!-- <h6>Ici on gère des approvisionnements</h6> -->
        <new-class v-if="shouldAddNessClass"></new-class>
        <div v-if="!selected_search">
            <a title="Importer les medicaments dans un fichier " 
                target="_blank" rel="noopener noreferrer"
                style="color: black;">
                <ion-icon :src="fileTray" @click="openApproFile"></ion-icon>
            </a>
            <br> <br>
            <input v-model="umutiName" type="text" placeholder="Nom du produit">
            <br>
            <ul style="text-align: right;" v-if="!selected_search">
                <button class="btnResearch" v-for="(umuti, index) in imiti_result" 
                    :id="'a' + index" @click="selectSearch">
                    {{ umuti.nom_med }} {{ umuti.code_med }} {{ umuti.description_med }}
                </button>
            </ul>
            <span class="s-cl">
                <label for="">Classe therap.</label>
            <span @click="addNessClass"
                style="margin: 8px; color:green;
                    font-size: 1.5rem; cursor: pointer; 
                    align-items: center;
                    position:relative;
                    top: clamp(0.3rem, calc(0.3rem + 2px), 0.5rem)">
                <ion-icon class="scale-btn" :src="addCircleSharp"></ion-icon>
            </span> <br>
                <select v-model="classeRef">
                    <option v-for="(classe,index) in allClasses" :value="classe?.n_group"
                        :id="'c'+index">
                        {{ (classe?.name)?.slice(0,30) }}
                    </option>
                </select>
            </span>
            <br>
            <hr>
            <span v-if="classeRef" class="s-cl">
                <label for="">S-Classe therap.</label><br>
                <select v-model="sClasseRef">
                    <option v-for="sClasse in subClass">{{ (sClasse?.name)?.slice(0,30) }}</option>
                </select><br>
            </span>
            <br> <br>
            <span v-if="showForme">
                <label>Forme du produit</label>
                <span style="margin-right: .1rem;">&nbsp;</span>
                <select v-model="forme_med" placeholder="Type" class="bg-w" value="Ovule">
                    <option>Cp</option>
                    <option>Goutte</option>
                    <option>Gel</option>
                    <option>Gélule</option>
                    <option>Lotion</option>
                    <option>Ovule</option>
                    <option>Sirop</option>
                    <option>Amp.inj</option>
                    <option>Amp.buv</option>
                    <option>Suppo</option>
                    <option>Spray</option>
                    <option>Sachet</option>
                    <option>Poudre</option>
                    <option>Pmde</option>
                    <option>Crème</option>
                    <option>Savon</option>
                    <option>Autre</option>
                </select>
            </span>
            <span v-else>
                <label style="background-color: rgba(25, 255, 25, 0.521);
                padding: 0 0.3rem; border-radius: 8px;">Unité sortant</label>
                <span style="margin-right: .1rem;">&nbsp;</span>
                <select v-model="selectedMedUnit"  placeholder="Type" class="bg-w" value="Ovule">
                    <option v-for="unit in medUnits">{{ unit.unit }}</option>
                </select>
                <span v-show="selectedMedUnit"
                    @click="clearMedUnit"
                    style="cursor:pointer;
                        position:relative; 
                        top: 0.2rem;left: 0.2rem;">
                    <ion-icon :src="closeCircle" @click="clearMedUnit"></ion-icon>
                </span>
            </span>
            
            <br> <br>
            <input v-model="umuti_quantite_initial" type="number" placeholder="Quantité">
            <br> <br>
            <input v-model="umuti_prix_achat" type="number" placeholder="P.A: (Unité sortant)">
            <br> <br>
            <!-- <input v-model="umuti_prix_vente" type="number" placeholder="P.V : (Unité sortant)">
            <br> <br> -->
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
                placeholder="P.V: (Unité sortant)" 
                style="color:blue; font-family: Sen;" disabled>
            <hr>
            <span style="position: relative;">
                <label style="background-color: rgba(25, 255, 25, 0.521);
                padding: 0 0.3rem; border-radius: 8px;">Unité sortant</label>
                <span style="margin-right: .1rem;">&nbsp;</span>
                <select v-model="selectedMedUnit"  placeholder="Type" class="bg-w" value="Ovule">
                    <option v-for="unit in medUnits">{{ unit.unit }}</option>
                </select>
                <span v-show="selectedMedUnit"
                    @click="clearMedUnit"
                    style="cursor:pointer;
                        position:relative; 
                        top: 0.2rem;left: 0.2rem;">
                    <ion-icon :src="closeCircle" @click="clearMedUnit"></ion-icon>
                </span>
            </span>
            <br><br>
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
import { watch, ref, inject, reactive, toValue } from 'vue'
import { fileTray, addCircleSharp, closeCircle } from 'ionicons/icons'
import { IonIcon } from '@ionic/vue'
import { useKuvoma, useKurungika } from '../hooks/kuvoma.js'
import { MedApprov } from '../layout/types'
import newClass from '../layout/auxiliare/new-class.vue'

const emit = defineEmits(['inputApprov', 'approFileOpen',
    'fileDataLoaded', 'reportAchat', 'needRefresh'
])
var umutiName = ref('')
const imiti_result = ref([]) 
const selected_search = ref(null)
const search_approve = reactive({})
const umuti_prix_achat = ref(null)
const umuti_prix_vente = ref(1)
const umuti_quantite_initial = ref(null)
const umuti_date_exp = ref(null)
const date_exp = ref(null)
const date_init = ref(new Date)
const forme_med = ref('')
const type_med = ref('Plaquette')
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
const shouldAddNessClass = ref(false)
const showForme = ref(true)


const minimunPA:number = 200

const url_local = '//127.0.0.1:8002'
const url_reportIndex = 'api/gOps/getClasses_/'
const [cls, getClasses] = useKuvoma(url_reportIndex, url_local)

const url_checkSubClass = 'api/gOps/check_subclass/'
const [subClass, checkSubClass] = useKurungika(classeRef, url_checkSubClass)


const url_getMedUnit = 'api/gOps/getMedUnit/'
const [medUnits, getMedUnit] = useKuvoma(url_getMedUnit, url_local)
getClasses()
getMedUnit()
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

const url_today_per_to_31 = 'api/gOps/today_per_to_31/'
const [report_today_per_to_31, todayPerTo31] = useKuvoma(url_today_per_to_31)


// Functions
function nGroupToName(n_group: string): string {
    let name = '';
    (allClasses.value).forEach((elm)=>{
        if (elm.n_group == n_group){
            name = elm.name
        }
    })
    return name
}   
const clearMedUnit = ()=>{
    showForme.value = true;
    selectedMedUnit.value = '';
    forme_med.value = '';
}
const addNessClass = ()=>{
    shouldAddNessClass.value = true
    // emit('needRefresh')
}
const initInputs = ()=>{
    if(toValue(selected_search)){
        selected_search.value.nom_med = '';
        selected_search.value.quantite_initial = null;
        selected_search.value.prix_achat = null;
        selected_search.value.prix_achat = null;
        date_exp.value = null;
        emit('needRefresh')
        return
    }
    umutiName.value = '';
    classeRef.value = null;
    sClasseRef.value = null;
    forme_med.value = '';
    umuti_quantite_initial.value = null;
    umuti_prix_achat.value = null;
    umuti_date_exp.value = null;
}
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
        umuti_obj.type_med = selected_search.value.type_med
        umuti_obj.med_unit = selectedMedUnit.value

        return umuti_obj
    } else{
        // Fill Umuti_obj from the vmodels set in template
        if((String(umutiName.value)) && (Number(umuti_prix_achat.value) > minimunPA)
            && (Number(umuti_prix_vente.value)) 
            && (Number(umuti_quantite_initial.value) > 0) 
            && (Date(date_exp.value))
        ){
            umuti_obj.nom_med = String(umutiName.value)
            umuti_obj.date_peremption = umuti_date_exp.value
            // umuti_obj.date_entrant = Date(new Date().toISOString().substring(0,10))
            umuti_obj.classe_med = nGroupToName(classeRef.value)
            umuti_obj.sous_classe_med = sClasseRef.value
            umuti_obj.prix_achat = Number(umuti_prix_achat.value)
            umuti_obj.prix_vente = Number(umuti_prix_vente.value)
            umuti_obj.quantite_initial = Number(umuti_quantite_initial.value)
            umuti_obj.forme = forme_med.value
            umuti_obj.type_med = type_med.value
            umuti_obj.med_unit = selectedMedUnit.value
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
    }, 3000)
}
const selectSearch = (event)=>{
    let code_s = Number((event.target.getAttribute('id')).slice(1))
    selected_search.value = imiti_result.value[code_s]
    approve_handler()
}
const selectedMedUnit = ref('')
//Watchers
watch(forme_med, (value)=>{
    showForme.value = false;
})
watch(selected_search, (value)=>{
    console.log("The selected Search:", selected_search.value)
})
watch(classeRef, ()=>{
    checkSubClass()
})
watch(cls, (value)=>{
    allClasses.value = value
})
watch(date_exp, (value)=>{
    umuti_obj.date_peremption = value
})
watch(report_achat, (value)=>{
    if (value.detail == 'ok'){
        console.log("Les choses se sont bien passee") 
        emit("reportAchat", 2) 
        initInputs()
        todayPerTo31()
    } else if(value.detail == undefined){
        console.log("Il y aurait besoin de reconnexion.")
    } else{
        console.log("Les choses pas bien: ")
        emit("reportAchat", 2)
        let info = `Opération echouée.
            Il se peut que certaines informations sont incorrectes.`
            showMessage(info)
    }
    

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
.scale-btn:active{
    scale: 2;
    transition-duration: 2000ms;
}
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

.jove-leave-from{
    opacity: 1;
    transform: translateY(0);
    /* top: 0; */
}
.jove-leave-active{
    transition: all 0.6s ease-in;
    position: relative
}
.jove-leave-to{
    opacity: 0;
    transform: translateY(-30px);
    /* top: -30px; */
    filter: blur(12px);
}
</style>