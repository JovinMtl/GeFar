<template>
  <div style="height:39vh;margin-top:15px;
                                overflow: auto;">
    <label for="metiers"
        style="font-size: .8rem">Choisissez sa profession:</label>

    <select v-model="selectedProf" name="metiers" id="profes">
        <option v-for="profession in professions" :value="profession.value">
            {{ profession.name }}
        </option>
    </select> <span style="color:brown"> {{ rate_assure }}%</span> 
    <div v-if="selectedProf != 'au' && selectedProf" class="inpName">
        <input class="inpName-1" placeholder="mubaze izina ryiwe"
            v-model="clName"/>
        <input class="inpName-1" placeholder="numero ya telefone yiwe" 
            v-model="clPhone" type="number" />
        <input type="button" :class="clClean ? 'BtnClean':''" 
        value="Valider" @click="simplValid">
        <span class="c-r ml-5 sm-l">
           {{message}}
        </span>
    </div>
    <div v-if="selectedProf == 'au'">
        <div>
            <label for="assur"
                    class="little-lab">Son assureur:</label>
            <select  id="assur" v-model="assureur">
                <option v-for="assurance in assurances">
                    {{ (assurance.name).slice(0,20) }}
                </option>
            </select>
            <a title="Ajouter une nouvelle assurance">
                <input
                type="button" v-show="!need_assureur"
                    @click="need_assureur=true"
                    class="bg-g"
                    value="+"/>
            </a>
        </div>
        
        <div class="newAssu" v-if="need_assureur">
            <label for="nAssu">Ajouter une nouvelle assurance</label>
            <input type="text" id='nAssu'
                v-model="assu_name"
            placeholder="Nom de l'assurance">
            <br><br>
            <input type="button" value="No" 
                @click="need_assureur=false">
            <input type="button" value="Ok" 
                class="ml-10" @click="checkAssu">
            
            <div>{{ message }}</div>
        </div>
        
        <div v-if="stage_redu==3 && assureur" 
            style="margin: 20px 0">
            <input type="text"
                class="inpBl"
                style="color: rgb(12, 124, 216); font-weight: 700;"
                :value="'   '+ assureur.slice(0,20)" disabled>
            <input type="text" placeholder="Nom du beneficiaire"
                v-model="clName1">
            <input type="text" placeholder="Numero Carte"
                v-model="clCardNumber">
            <input type="text" placeholder="Numero bon"
                v-model="clBonNumber">
            <input type="date" name="" id=""
                v-model="bonDate">
            <input type="button" :class="clClean ? 'BtnClean':''"  
                value="Valider" @click="complValid"
                style="margin-left: 10px;">
        </div>
        <!-- assuReur component should be here -->
         <cliAssu  v-if="assureur && openCliAssu"
            @rate_assu_e="getRateAssu"
            @cliAssuData="getcliAssuData"
            :rate_assu_p="rate_assure" />
    </div>
    <div v-if="isWarning" class="warning">
            {{ warnDateMessage}}
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
    ref, reactive, watch, shallowRef
} from 'vue'
import type { Ref } from 'vue'
import { 
    useKurungika, useKuvoma
} from '../../hooks/kuvoma.js'
import { 
    clInfo, Medi, DataAssurance, CreatedClient
} from '../../layout/types.js'
import { baseURL } from '../../../store/host.js'
import cliAssu from './cli-assu.vue'
import { fa } from 'vuetify/locale'

const emit = defineEmits([
    'cfrBtn', 'seleProf', 
    'assuRatel', 'objCli',
    'stateBtn'
])
const props = defineProps({
    rdBtn:{
        type: Boolean,
        default: true,
    }
})

const stage_redu: Ref<number> = ref(0)
const selectedProf: Ref<string> = ref('')
const assureur: Ref<string> = ref('')
const clName: Ref<string> = ref('')
const clName1: Ref<string> = ref('')
const clCardNumber: Ref<string> = ref('')
const clBonNumber: Ref<string> = ref('')
const assu_name: Ref<string> = ref('')
const bonDate = ref(new Date)
const clPhone: Ref<number|null> = ref(null) // omitting initial value for placeholder
const message = shallowRef<string>('')
const clClean: Ref<boolean> = ref(false)
const isWarning: Ref<boolean> = ref(false)
const need_assureur: Ref<boolean> = ref(false)
const assu_state: Ref<boolean> = ref(false)
const assu_rate: Ref<number | null> = ref(null)
const rate_assure: Ref<number> = ref(1)
const openCliAssu: Ref<boolean> = ref(false)
const clientInfo: clInfo = reactive({
    'nom_client': '',
    'numero_tel': '',
    'categorie': '',
    'assureur': '',
    'numero_carte': '',
    'numero_bon': '',
    'date_bon': '',
})

const warnDateMessage: Ref<string> = ref('')
const datAssu: DataAssurance = reactive({
    'assu': []
})
// const selectedClient: Ref<string | null> = ref(null)
const professions = [
    {
        'value': '',
        'name': '--- Akora iki ? ---'
    },
    {
        'value': 'mt',
        'name': 'Motar'
    },
    {
        'value': 'tv',
        'name': 'Taxi Vélo'
    },
    {
        'value': 'md',
        'name': 'Domaine Médicale'
    },
    {
        'value': 'ag',
        'name': 'Personne agée'
    },
    {
        'value': 'au',
        'name': 'Assuré'
    },
]


// Composables 
const url_local: string = baseURL

const url_addAssu: string = "api/gOps/addAssu/"
const [addAssuResp, addAssu] = useKurungika(datAssu, url_addAssu)

const url_getAssurances = "api/gOps/getAssu/"
const [assurances, getAssurances] = useKuvoma(url_getAssurances, url_local)

const url_getDefRate = "api/gOps/getDefRate/"
const [defRate, getDefRate] = useKuvoma(url_getDefRate, url_local)
getDefRate()


// Function definition
const checkPhoneNumber = (val)=>{
    let status = true;
    let strVal = String(val);
    let mobCodes = ['79','77', '76', '72', '71',
        '69', '68', '66', '65','62', '61',
    ];
    if ((!(mobCodes.indexOf(strVal.slice(0,2)) > -1)) && (strVal.length == 8)){
        status = false
    }
    if (!(strVal.length == 8 || strVal.length == 11)){
        status =  false
    }
    return status
}
const getcliAssuData = (data:CreatedClient)=>{
    // Here to complile 'value' with clInfo
    clientInfo.assureur = assureur.value
    clientInfo.nom_client = data.nomBen  //beneficiaire
    clientInfo.categorie = 'au'
    clientInfo.date_bon = data.datePrescr
    clientInfo.numero_bon = data.numBon
    clientInfo.numero_carte = data.numCard
    clientInfo.rate_assure = data.rateAssu
    clientInfo.nom_adherant = data.nomAd
    clientInfo.employeur = data.employeur
    clientInfo.relation = data.relation

    emit("objCli", clientInfo)
    emit("stateBtn", true)
}
const getRateAssu = (value)=>{
    rate_assure.value = value
}
const checkAssu = ()=>{
    // will check the validity of assurance fields
    let status = false
    
    if ((assu_name.value).length > 3){
        status = true
    }
    if ( status){
            datAssu.assu[0] = assu_name.value
            addAssu()
    } else{
        message.value = "Champs invalides"
        setTimeout(()=>{
            message.value = ""
        }, 2000)
    }
}
const checkRate = ()=>{
    let status = false
    let rate = Number(assu_rate.value)
    if(rate < 0 || rate > 100){
        status = false
    }
    if ( status){
            datAssu.assu[1] = rate
            addAssu()
    } else{
        message.value = "Champs invalides"
        setTimeout(()=>{
            message.value = ""
        }, 2000)
    }
}
const simplValid = ():void=>{
    // validate Taxi moto, taxi velo and domaine medicale
    let status = true
    if(!clName.value){
        // clName.value = "inconnu"
        message.value = "Nom incorrect"
        status = false
    }
    if (!checkPhoneNumber(clPhone.value)){
        // clPhone.value = 1111
        message.value = "Numero incorrect"
        status = false
    }
    if (!status){
        return
    }
    message.value = '';
    clientInfo.nom_client = clName.value;
    clientInfo.numero_tel = String(clPhone.value);
    clientInfo.categorie = String(selectedProf.value);
    clientInfo.assureur = 'Pharmacie Ubuzima';
    clClean.value = true
    
    emit("cfrBtn", 1)
    emit("objCli", clientInfo)
    emit("stateBtn", true)
}
const complValid = ():void=>{
    let dateBon = new Date(bonDate.value)
    
    if(clName1.value && clCardNumber.value
        && clBonNumber.value 
    ){
        clClean.value = true
    } else{
        clClean.value = false
        isWarning.value = true
        warnDateMessage.value = "Données du Patient incomplets"
    }
    if (dateBon < today){
        // Starting to build up an object for client
        clientInfo.nom_client = clName1.value
        clientInfo.numero_tel = ''
        clientInfo.categorie = String(selectedProf.value)
        clientInfo.assureur = assureur.value
        clientInfo.numero_carte = clCardNumber.value
        clientInfo.numero_bon = clBonNumber.value 
        clientInfo.date_bon = String(dateBon)
        warnDateMessage.value = ""
        clClean.value = true

        emit("objCli", clientInfo)
        emit("stateBtn", true)
    }else{
        warnDateMessage.value = "La date du Bon doit être valide. "
        clClean.value = false
        isWarning.value = true
    }
    
    setTimeout(()=>{
            isWarning.value = false
            warnDateMessage.value = ""
        }, 3000)
}


const initClient = ()=>{
    clientInfo.nom_client = ''
    clientInfo.numero_tel = ''
    clientInfo.categorie = ''
    clientInfo.assureur = ''
    clientInfo.numero_carte = ''
    clientInfo.numero_bon = ''
    clientInfo.date_bon = ''

    clientInfo.rate_assure = 0
    clientInfo.nom_adherant = ''
    clientInfo.employeur = ''
    clientInfo.relation = ''
}

if(props.rdBtn){
    getAssurances()
    console.log("Assurances we have:", assurances.value)
}

watch(defRate, (value)=>{
    // should assign to assu_rate.value
    console.log("THe default rate:", value)
    rate_assure.value = value.rep
})
watch(rate_assure, ()=>{
    emit('assuRatel', rate_assure.value)
    emit("stateBtn", false)
})
watch(assureur, (value)=>{
    openCliAssu.value = false
    setTimeout(()=>{
        openCliAssu.value = true
    }, 500)
    assurances.value.forEach((elm)=>{
        if(elm.name == value){
            rate_assure.value = elm.rate_assure
        }
    })
    emit('assuRatel', rate_assure.value)
    emit("stateBtn", false)
})
watch(addAssuResp, (value)=>{
    console.log("Resp from addAssu: ", value)
    assu_state.value = value.status
    message.value = value.reason
    if(assu_state.value){
        getAssurances()
        setTimeout(()=>{
            need_assureur.value = false
        }, 2000)
    }
    if(value.code == 'token_not_valid'){
        message.value = "Veuillez vous reconnecter"
    }
    emit("stateBtn", false)
})
watch(selectedProf, (value) => {
    // Now apply the reduction according to benefit of value 'md,tv'
    if(selectedProf.value == 'tv' ||
        selectedProf.value == 'mt' ||
        selectedProf.value == 'md'
    ){
        rate_assure.value = defRate.value.rep
        assureur.value = null
    }
    initClient()
    emit("seleProf", selectedProf.value)
    emit('assuRatel', rate_assure.value) //for tv,mt, md, au
    emit("stateBtn", false)
})
</script>
