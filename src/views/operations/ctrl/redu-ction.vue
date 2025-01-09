<template>
  <div style="height:39vh;margin-top:15px;
                                overflow: auto;">
    <!-- THis is a reduction component -->
    <label for="metiers"
        style="font-size: .8rem">Choisissez sa profession:</label>

    <select v-model="selectedProf" name="metiers" id="profes">
        <option v-for="profession in professions" :value="profession.value">{{ profession.name
        }}
        </option>
    </select> <span style="color:brown"> {{ rate_assure }}%</span> 
    <div v-if="selectedProf != 'au' && selectedProf" class="inpName">
        <input class="inpName-1" placeholder="mubaze izina ryiwe"
            v-model="clName"/>
        <input class="inpName-1" placeholder="numero ya telefone yiwe" 
            v-model="clPhone" type="number" />
        <input type="button" :class="clClean ? 'BtnClean':''" 
        value="Valider" @click="simplValid">
    </div>
    <div v-if="selectedProf == 'au'">
        <div>
            <label for="assur"
                    style="font-size: .8rem;
                    color: black;margin-right: 4px;">Son assureur:</label>
            <select  id="assur" v-model="assureur">
                <option v-for="assurance in assurances">
                    {{ (assurance.name).slice(0,20) }}
                </option>
            </select>
            <a title="Ajouter une nouvelle assurance">
                <input
                type="button" v-show="!need_assureur"
                    @click="need_assureur=true" 
                    value="+"/>
            </a>
        </div>
        
        <div class="newAssu" v-if="!assureur && need_assureur">
            <label for="nAssu">Ajouter une nouvelle assurance</label>
            <input type="text" id='nAssu'
                v-model="assu_name"
            placeholder="Nom de l'assurance">
            <input type="button" value="No" 
                class="ml-10" @click="need_assureur=false">
            <hr>
            <input type="number"  v-model="assu_rate"
            placeholder="Taux d'assurance. e.x: 20">
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
    </div>
    <div v-if="isWarning" class="warning">
            {{ warnDateMessage}}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, reactive, watch } from 'vue'
import { useKurungika, useKuvoma} from '../../hooks/kuvoma.js'

const toPage = defineEmits(['rdBtn'])
const fromPage = defineProps([])

const stage_redu: Ref<number> = ref(0)
const selectedProf: Ref<string> = ref('')
const assureur: Ref<string> = ref('')
const clName: Ref<string> = ref('')
const clName1: Ref<string> = ref('')
const clCardNumber: Ref<string> = ref('')
const clBonNumber: Ref<string> = ref('')
const assu_name: Ref<string> = ref('')
const bonDate = ref(new Date)
const clPhone: Ref<number> = ref() // omitting initial value for placeholder
const message = shallowRef<string>('')
const clClean: Ref<boolean> = ref(false)
const isWarning: Ref<boolean> = ref(false)
const need_assureur: Ref<boolean> = ref(false)
const assu_state: Ref<boolean> = ref(false)
const assu_rate: Ref<number> = ref()
const rate_assure: Ref<number> = ref(1)
// const somme_formatted: Ref<string> = ref('')
const clientInfo: clInfo = reactive({
    'nom_client': '',
    'numero_tel': '',
    'categorie': '',
    'assureur': '',
    'numero_carte': '',
    'numero_bon': '',
    'date_bon': '',
})
const suggest:Ref<string> = ref("Votre assureur")
const warnDateMessage: Ref<string> = ref('')

const classes:Ref<Medi[]> = ref([])
const datAssu: DataAssurance = reactive({
    'assu': []
})

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
        'value': 'au',
        'name': 'Assuré'
    },
]

// Composables 

const url_addAssu: string = "api/gOps/addAssu/"
const [addAssuResp, addAssu] = useKurungika(datAssu, url_addAssu)

const url_getAssurances = "api/gOps/getAssu/"
const [assurances, getAssurances] = useKuvoma(url_getAssurances, url_local)


// Function definition
const checkAssu = ()=>{
    // will check the validity of assurance fields
    let status = false
    let rate = Number(assu_rate.value)
    if ((assu_name.value).length > 3){
        status = true
    }
    if(rate < 0 || rate > 100){
        status = false
    }
    // status = true //temporary
    if ( status){
            datAssu.assu[0] = assu_name.value
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
    if(!clName.value){
        clName.value = "inconnu"
    } else if (!clPhone.value){
        clPhone.value = 1111
    }
    clientInfo.nom_client = clName.value;
    clientInfo.numero_tel = String(clPhone.value);
    clientInfo.categorie = String(selectedProf.value);
    clientInfo.assureur = 'Pharmacie Ubuzima';
    panier_api.client = clientInfo
    clClean.value = true
    confirmRdBtn.value = true

    console.log("Simp Validated: ", panier_api.client)
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
        panier_api.client = clientInfo
        warnDateMessage.value = ""
        clClean.value = true
        confirmRdBtn.value = true

        console.log("Validated: ", panier_api)
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
}

watch(assureur, (value)=>{
    assurances.value.forEach((elm)=>{
        if(elm.name == value){
            rate_assure.value = elm.rate_assure
        }
    })
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
})
watch(toPage.rdBtn, (value)=>{
    if(!value){
        initClient()
        console.log("Now the Panier2API: ", panier_api)
        clClean.value = true
    } else{
        getAssurances()
        console.log("Assurances we have:", assurances.value)
    }
    if(clClean.value){
        confirmRdBtn.value = true
    } else{
        confirmRdBtn.value = false
    }
})
watch(selectedProf, (value) => {
    // Now apply the reduction according to benefit of value 'md,tv'
    if(selectedProf.value == 'tv' ||
        selectedProf.value == 'mt' ||
        selectedProf.value == 'md'
    ){
        assurances.value.forEach((elm)=>{
        if(elm.name == 'Pharmacie Ubuzima'){
            rate_assure.value = elm.rate_assure
        }
    })
    }
    console.log("The selected profession : ", selectedProf.value, "total:", total_panier_client)
    initClient()
    clClean.value = false
    confirmRdBtn.value = false
})
</script>

<style>

</style>