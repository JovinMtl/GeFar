<template>
    <div class="dynContent" style="">
        
        <div class="controlHeader" style="height: 5%; width: 100%;">
            <div  class="controlContent" style="font-size: .8rem;
                background-color: navy; color: white">
                <div class="elt contentElement1" style="display: inline-flex;background-color: transparent; width: 4%;height: 100%; color: inherit; ">
                    #
                </div> 
                <div class="elt contentElement3">
                    Bons
                </div> 
                <div class="elt contentElement2">
                <!-- <span v-if="isAdmin">Benéficiaire</span>  -->
                    Client
                </div>
                <div class="elt contentElement3 ac">
                    Tél
                </div>
                <div title="Assurance Nom" class="elt contentElement3 ac">
                    ASN
                </div>
                <div class="elt contentElement3">
                    Total
                </div>
                <div class="elt elt5">
                    Caisse
                </div>
                <div title="Assurance Montant" class="elt elt5">
                    ASM
                </div>
                <div class="elt elt5">
                    Regléé
                </div>
                <div class="elt elt5">
                    Catég.
                </div>

                <div class="elt elt5 ac">
                    Date
                </div>
                <div class="elt elt6">
                    Payer
                </div>
                <div class="elt elt6">
                    Id Bon
                </div>
            </div>
        </div>

        <div class="controlBody  t-m-skin">
            <div v-show="shouldPop" popover id="pop" class="mv-pop">
                 <span> 
                    <table>
                        <caption class="captBon">Bon de Commande: {{ numberIndex }}</caption>
                        <tr>
                            <th>#<span class="c-t">_</span></th>
                            <th>Nom du Med.<span class="c-t">_</span></th>
                            <th>Qte<span class="c-t">_</span></th>
                            <th>Prix V.<span class="c-t">_</span></th>
                            <th><span class="c-t">_</span> Total</th>
                            <th><span class="c-t">_</span>Autheur</th>
                        </tr>
                        <tr v-for="(elm, index) in updatedImiti"
                            :class="index%2==0 ? 'bg-g2':'bg-g1'"
                            style="justify-content: right;">
                            <td>{{ index+1 }}.</td>
                            <td class="pr-5">{{ String(elm.nom_med).slice(0, 18) }}</td>
                            <td class="c-b-1">{{ elm.quantity }}</td>
                            <td>{{ elm.prix_vente }}</td>
                            <td class="ta-r">{{ elm.prix_vente * elm.quantity }}</td>
                            <td class="ta-r"> {{( String(elm.operator)).charAt(0).toUpperCase().concat((String(elm.operator)).slice(1)) }}</td>
                        </tr>  
                    </table>
                    <div class="ta-c mt-3">
                        <button @click="printFacture" class="pa-3 clk">Imprimer</button>
                    </div>
                </span>
            </div>
            <div v-for="(umuti, index) in (actual_imitiS)" 
                :class="index%2 ? 'ln-1':'ln-2'"
                class="d-f"
                :key="index">
                <div class="contentElement11">
                    {{ index + 1 }}
                </div> 
                
                <div class="elt contentElement3" style="cursor: pointer;">
                    <button popovertarget="pop" :data-ids="umuti.meds" 
                        :data-store="[umuti.num_facture, umuti.total, 
                                        umuti.cout, umuti.assu_rate, 
                                        umuti.montant_dette,
                                        getOneAssurance(umuti.organization),
                                        umuti.date_served,
                                        getOneclient(umuti.beneficiaire), ]" 
                        :data-index="index+1" @click="showData">Ouvrir</button>
                </div> 

                <div class="elt contentElement2"> 
                    {{ getOneclient(umuti.beneficiaire) }}
                </div>
                <div class="elt contentElement3">
                    <span v-if="getOneclientPhone(umuti.beneficiaire)">
                        {{ (getOneclientPhone(umuti.beneficiaire)) }}
                    </span>
                    
                </div>


                <div class="elt contentElement3">
                    <span v-show="getOneAssurance(umuti.organization)">
                        {{ String(getOneAssurance(umuti.organization)).slice(0, 8) }}
                    </span>
                </div>
                <div class="elt contentElement3 total">
                        {{ useReadable(umuti.total) }}
                </div>
                <div class="elt elt5">
                     <span >{{ useReadable(umuti.cout) }}</span>
                </div>
                <div class="elt elt5" style="color: blue;">
                    <span v-show="(umuti.is_paid)==false" :class="umuti.assu=='Pharmacie Ubuzima' ? 'c-g':''">
                        {{ useReadable(umuti.montant_dette) }}</span>
                     
                </div>
                <div class="elt elt5" style="color: green; font-weight: bold;">
                    <span v-show="umuti.is_paid">
                        {{ useReadable(umuti.montant_dette) }}
                    </span>
                </div>
                <div class="elt elt5">
                    <span v-show="umuti.categ!='null'">{{ umuti.categorie }}</span>
                     
                </div>

                <div class="elt elt5">
{{ (umuti.date_served).slice(8,10) }}/{{ (umuti.date_served).slice(5,7) }}/{{ (umuti.date_served).slice(2,4) }}
                </div>
                <div class="elt elt6">
                     <span v-if="!umuti.is_paid" class="btn2 br mt w-22 bg-b"
                        :id="'j'+index"
                        :class="selectIndex.has(index)? 'bg-g':''"
                       @click="checkBon"></span>
                </div>
                <div class="elt elt7">
                    {{ (umuti.num_bon).slice(0,7) }}
                </div>
                
            </div>
        </div>

        <div class="controlFooter">
            <div  class="controlContent" style="font-weight: 700;font-size: .8rem;">
                <div class="elt contentElement1">
                    #
                </div> 
                <div class="elt contentElement2">
                    TOTAL
                </div> 
                <div class="elt contentElement1">
                    <!-- Nombre -->
                    {{ totaux[0] }}
                </div>

                <div class="elt contentElement3">
                    ---
                </div>

                <div class="elt contentElement3">
                    ---
                </div>
                <div class="elt elt9">
                </div>
                <div class="elt contentElement3 total" style="margin: 5px;">
                    <!-- P.V -->
                    {{ useReadable(totaux[1]) }}
                </div>
                <div class="elt elt7">
                </div>

                <div class="elt contentElement3">
                    <!-- Benefice -->
                    {{ useReadable(totaux[2]) }}
                </div>
                <div class="elt elt5">
                    <!-- Caisse -->
                     {{ useReadable(totaux[3]) }}
                </div>
                <div class="elt elt5">
                    <!-- Dette -->
                     {{ useReadable(totaux[5]) }}
                </div>
                <div class="elt elt5">
                     <!-- assu -->
                     ------
                </div>
                <div class="elt elt5">
                     <!-- categ -->
                     ------
                </div>

                <div class="elt elt5">
                    <span v-show="repStatus==0 && selectIndex.size" class="pay bg-g" @click="fIndex">
                        Payer
                    </span>
                    <span v-if="repStatus">
                        <span v-if="repStatus==1">Ok</span>
                        <span v-if="repStatus==2">No</span>
                    </span>
                </div>
                <div class="elt elt5">
                </div>
            </div>
        </div>
        <teleport to="body">
            <div v-if="openFacturier" class="facturierContainer" @click="closeFacture">
                <facturier @facture-active="closeFacture"
                    :commande-patient="[updatedImiti, dataStore[1]]" 
                    :num_facture="dataStore[0]"
                    :username="dataStore[7]"
                    :assure_rate="dataStore[3]"
                    :assureur="dataStore[5]"
                    :imperfections="[0, 0]"
                    :date="dataStore[6]"

                />
            </div>
        </teleport>
                            
    </div>
</template>

<script setup lang="ts">
import { ref, toValue, watch } from 'vue'
import {  usePostRequest, useKuvoma, useKurungika } from '../../hooks/kuvoma'
import useReadable from '../../hooks/useReadable'
import { useAssuStore } from '../../../store/assu'
import { useClientStore } from '../../../store/clients'
import { baseURL } from '../../../store/host.js'
import facturier from '../facturier.vue'
const props = defineProps(['med','admin'])
const emit = defineEmits(['lsIndex'])
const actual_imitiS = ref(props.med)
const isAdmin = props.admin
const totaux = ref([0,0]) // To display totals on the footer.
const selectIndex =ref(new Set())
const repStatus  = ref<number>(0)
const {setAssurance, getOneAssurance} = useAssuStore()
const {setclient, getOneclient, getOneclientPhone} = useClientStore()


const idBons = ref([])
const dataStore = ref([])
const whoDidIt = ref('')
const openFacturier = ref(false)

let tempSelected = 0
let numsBon: number[] = []

const url_sendIndex = 'api/gOps/setBons/'
const [repIndex, sendIndex] = usePostRequest()

const url_sendBons = 'api/gOps/getBons/'
const [repBons, sendBons] = usePostRequest()

const url_getAssurances = "api/gOps/getAssu/"
const url_local: string = baseURL
const [assurances, getAssurances] = useKuvoma(url_getAssurances, url_local)

const url_getClients = "api/gOps/getClients/"
const [clients, getClients] = useKuvoma(url_getClients, url_local)

const url_getInfo = "api/gOps/getInfo/"
const ids = ref('')
const [response, getInfo] = useKurungika(ids, url_getInfo)


getAssurances()
getClients()

//Functions
const closeFacture = ()=>{
    console.log("Should close the facture")
    openFacturier.value = false
}
const printFacture = ()=>{
    console.log("Should open Facture: ")
    openFacturier.value = true
}
const showData = (e)=>{
    // console.log("your Data: " + e.target.getAttribute("data-ids"))
    ids.value = e.target.getAttribute("data-ids")
    numberIndex.value = e.target.getAttribute("data-index")
    let dataStoreString = e.target.getAttribute("data-store")
    dataStore.value = String(toValue(dataStoreString)).split(',')
    // console.log("data-store: " + toValue(dataStore) + 'NumFacture: ' + String(toValue(dataStore)).split(',')[0])
    setTimeout(getInfo, 10)
}
const fIndex = ()=>{
    console.log("Really wish to send: ", selectIndex.value)
    numsBon = removeBadBons()
    sendIndex(numsBon, url_sendIndex)
}
const updateTotaux = ()=>{
    // console.log("Attempt to build totaux",)
    let [ number, total, cout, dette, caisse, paid ] = [0, 0, 0, 0, 0, 0]
    let tot = 0
    let c = 0

    actual_imitiS.value.forEach(element => {
        tot = Number(element.total)
        c = Number(element.cout)
        if((element.is_paid) && tot ){
            paid += element.montant_dette
        } else if(!element.is_paid){
            dette += element.montant_dette
            console.log("Found: " + tot )
        }
        if (tot ){
            total += tot
            cout += c
            caisse += element.caisse
        }

        number += 1
    });
    totaux.value = [number, total, cout, dette, caisse, paid]

}

const checkBon = (e)=>{
    let index = Number((e.target.id).slice(1))
    if(e.shiftKey && index >= tempSelected){
        for(let i= tempSelected; i <= index; i++){
            selectIndex.value.add(i)
        }
        tempSelected = index
    }else if(e.shiftKey && index <= tempSelected ){
        for(let i=index; i <= tempSelected; i++){
            selectIndex.value.add(i)
        }
        tempSelected = index
    } else{
        if (!selectIndex.value.has(index)){
            selectIndex.value.add(index)
            tempSelected = index
        } else{
            selectIndex.value.delete(index)
            tempSelected = index
        }
    }
    tempSelected = index
}
const removeBadBons = ()=>{
    // removeBadBons returns the clean list of id's needed
    // find falses
    let i = 0;

    // to fish the bad ones
    actual_imitiS.value.forEach(elm=>{
        if(elm.is_paid){
            selectIndex.value.delete(i)
        }
        i +=1
    })
            
    let arr = []
    selectIndex.value.forEach(elm=>{
        arr.push(actual_imitiS.value[elm].num_bon)
    })
    return arr
}
const buildBons = ()=>{
    let arr = []
    actual_imitiS.value.forEach((elm)=>{
        arr.push(elm.bon_de_commande)
    })
    idBons.value = arr
    // removeBadBons()
    // sendBons(selectIndex.value, url_sendBons)
}

const shouldPop = ref<boolean>(true)
const defaultPop = ref<string>('')
const updatedImiti = ref(null)
const numberIndex = ref(0)

updateTotaux()
// buildBons()
watch(response, (value)=>{
    shouldPop.value = true
    if(value.response[0] != undefined){
        updatedImiti.value = value.response
        whoDidIt.value = (value.response[0].operator)
        // console.log("whoDidIt ? " + JSON.stringify(value.response[0].operator))
        
        defaultPop.value = 'something'

    } else{
        defaultPop.value = "La liste est vide."
    }
    console.log("The rep from getInfo: " + JSON.stringify(value))
})
watch(clients, (value)=>{
    if(value[0] != undefined){
        value.forEach((elm)=>{
            setclient(elm.id, [elm.beneficiaire, elm.phone_number])
        })
    }
})
watch(assurances, (value)=>{
    if(value[0] != undefined){
        value.forEach((elm)=>{
            setAssurance(elm.id, elm.name)
        })
    }
})
watch(repBons, (value)=>{
    console.log("SendBon: ", value)
    // removeBadBons()
})
watch(repIndex, (value)=>{
    // console.log("La reponse: ", value)
    if(value.status==1){
        repStatus.value = 1
        // console.log("Succes")
        console.log("Numbons are:", numsBon)
        console.log("all: ",actual_imitiS.value)
        let i = 0
        selectIndex.value.forEach((num)=>{
            actual_imitiS.value[num].is_paid = true
        })
        setTimeout(()=>{
            emit('lsIndex', selectIndex)
        }, 2000)
    } else{
        repStatus.value = 2
    }
})
</script>