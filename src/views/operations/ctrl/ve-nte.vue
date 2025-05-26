<template>
    <div class="dynContent" style="">
        
        <div class="controlHeader" style="height: 5%; width: 100%;">
            <div  class="controlContent" style="font-size: .8rem;
                background-color: navy; color: white; display:flex;">
                <div class="elt contentElement1" style="display: inline-flex;background-color: transparent; width: 4%;height: 100%; color: inherit; ">
                    #
                </div> 
                <div class="elt contentElement2">
                    Nom du Med.
                </div> 
                <div class="elt contentElement3">
                    Qte
                </div>

                <div v-if="isAdmin" class="elt contentElement3">
                    <span>P. A.</span>
                </div>

                <div class="elt contentElement3">
                    P. V.
                </div>

                <div class="elt contentElement3">
                    Total
                </div>

                <div v-if="isAdmin" class="elt contentElement3">
                    <span>Bnf</span> 
                </div>
                <div class="elt elt5">
                    Caisse
                </div>
                <div title="Assurance Montant" class="elt elt5">
                    ASM
                </div>
                <div title="Assurance Nom" class="elt elt5">
                    ASN
                </div>
                <div class="elt elt5">
                    Catég.
                </div>

                <div class="elt elt5">
                    Date
                </div>
                <div class="elt elt7"></div>
                <div class="elt elt6">
                    Id Bon
                </div>
            </div>
        </div>

        <div class="controlBody  t-m-skin">
            <div v-for="(umuti, index) in (actual_imitiS)" 
                :class="index%2 ? 'ln-1':'ln-2'"
                class="d-f"
                :key="index">
                <div :title="isAdmin ? 'Annuler cette opération.':''"  :data-id="umuti.id" :data-index="index"
                    class="contentElement11"
                    :class="[isAdmin ? 'bg-b-1 pointer bg-r-h':'', deletedIndexes?.indexOf(index) >= 0 ? 'bg-r':'',failedDelIndex?.indexOf(index) >= 0 ? 'bg-y':'']"
                    @click="getInfos">
                    {{ index + 1 }}
                </div> 
                <div class="elt contentElement2"
                    :class="annotatedIndexes.has(index) ? 'c-b-1 fw-8':''" 
                    :data-index="index" @click="changeBg"
                    :title="annotatedIndexes.has(index) == 0 ? 'Ajouter le marquuer':'Enlever le marqueur'">
                    {{ String(umuti.nom_med).slice(0, 25) }}
                </div> <div class="elt contentElement3">
                    {{ (umuti.qte ) }}
                </div> 

                <div v-if="isAdmin" class="elt contentElement3 famille_med">
                    <span >{{ umuti.prix_achat }}</span>
                    
                </div>

                <div class="elt contentElement3">
                    {{ umuti.prix_vente }}
                </div>

                <div class="elt contentElement3 total">
                        {{ umuti.total }}
                </div>

                <div v-if="isAdmin" class="elt contentElement3"> 
                <span>{{ (umuti.prix_vente - umuti.prix_achat) * (umuti.qte || 1) }}</span> 
                
                </div>
                <div class="elt elt5">
                     <span >{{umuti.caisse}}</span>
                </div>
                <div class="elt elt5">
                    <span :class="umuti.assu=='Pharmacie Ubuzima' ? 'c-g':''">
                        {{ umuti.dette }}</span>
                     
                </div>
                <div class="elt elt5 pointer">
                    <span :title="umuti.assu" v-show="umuti.assu !='Sans'">
                        {{ (umuti.assu).slice(0,3) }}...(<span class="bg-a-1">{{ umuti.rate }}</span>%)
                    </span>
                </div>
                <div class="elt elt5">
                    <span v-show="umuti.categ!='null'">{{ umuti.categ }}</span>
                     
                </div>

                <div class="elt elt5">
{{ (umuti.date_served).slice(8,10) }}/{{ (umuti.date_served).slice(5,7) }}/{{ (umuti.date_served).slice(2,4) }}
                </div>
                <div class="elt elt7"></div>
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

                <div class="elt elt8">
                </div>

                <div v-if="isAdmin" class="elt contentElement3">
                    <!-- P.A -->
                    {{ useReadable(totaux[2]) }}
                    
                </div>

                <div class="elt contentElement3">
                    ----
                </div>

                <div class="elt contentElement3 total" style="margin-right: 5px;">
                    <!-- P.V -->
                    {{ useReadable(totaux[1]) }}
                </div>

                <div v-if="isAdmin" class="elt contentElement3">
                    <!-- Benefice -->
                    {{ useReadable(totaux[3]) }}
                </div>
                <div class="elt elt5">
                    <!-- Caisse -->
                     {{ useReadable(totaux[4]) }}
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
                    ----------
                </div>
            </div>
        </div>
        <teleport to="body">
            <confirmCancel v-if="shouldConfirm" 
                :actualOp="actualSell"
                @reportConfirm="handleReportConfirm"/>
        </teleport>
                            
    </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, toValue } from 'vue'
import { useKurungika, usePostRequest } from '../../hooks/kuvoma'
import useReadable from '../../hooks/useReadable'
import confirmCancel from './params/confirm-cancel.vue'
const props = defineProps(['med','admin'])
// const emit = defineEmits(['lsIndex'])
const actual_imitiS = ref(props.med)
const isAdmin = props.admin
const totaux = ref([0,0]) // To display totals on the footer.
const selectIndex =ref(new Set())
const repStatus  = ref<number>(0)
const idBons = ref([])
let tempSelected = 0
let numsBon: number[] = []
const canDeleteTitle = ref(true)
const deletedIndexes = ref([])
const failedDelIndex = ref([])
const umutiSoldId = ref(0)
const indexToRemove = ref(0)
const actualSell = ref()
const statusRemove = ref(0)
const shouldConfirm = ref(false)
const shouldStopCancelling = ref(false)

const url_sendIndex = 'api/gOps/setBons/'
const [repIndex, sendIndex] = usePostRequest()

const url_sendBons = 'api/gOps/getBons/'
const [repBons, sendBons] = usePostRequest()

const url_cancelSell = 'api/out/cancelSell/'
const [repCancel, cancelOp] = useKurungika(umutiSoldId, url_cancelSell)

const annotatedIndexes = ref(null);
annotatedIndexes.value = new Set;
// Functions
const changeBg = (e)=>{
    const selectedIndex = Number(e.target.getAttribute('data-index'));
    console.log("The selected: ", selectedIndex)
    if (!(annotatedIndexes.value.has(selectedIndex))){
        annotatedIndexes.value.add(selectedIndex);
    } else{
        annotatedIndexes.value.delete(selectedIndex)
    }
}
const getInfos = (elm)=>{
    if (!(toValue(isAdmin))){
        canDeleteTitle.value = false
        return
    }
    umutiSoldId.value = elm.target.getAttribute('data-id')
    indexToRemove.value = Number(elm.target.getAttribute('data-index'))

    if(deletedIndexes.value.indexOf(indexToRemove.value) >= 0){
        return
    }
    actualSell.value = actual_imitiS.value[indexToRemove.value]
    shouldConfirm.value = true
}

// const cancelOperation = ()=>{
//     cancelOp()
    
// }
const handleReportConfirm = (val:number)=>{
    if (val == 1){
        shouldStopCancelling.value = true
        shouldConfirm.value = false
    } else if (val == 2){
        shouldConfirm.value = false
        // cancelOperation()
        cancelOp()
    }

}
const fIndex = ()=>{
    console.log("Really wish to send: ", selectIndex.value)
    numsBon = removeBadBons()
    sendIndex(numsBon, url_sendIndex)
}
const updateTotaux = ()=>{
    // console.log("Attempt to build totaux",)
    let [ number, total, pt_a, benefice, caisse, dette ] = [0, 0, 0, 0, 0, 0]

    actual_imitiS.value.forEach(element => {
        // console.log("Quantite restant  pa:",  element.prix_vente)
        let tot = Number(element.prix_vente * (element.qte))
        let achat = Number(element.prix_achat * (element.qte))
        if (tot && achat){
            pt_a += achat
            total += tot
            benefice += (element.prix_vente - element.prix_achat) * (element.qte) 
            caisse += element.caisse
            dette += element.dette
            number += element.qte
        }

        // number += 1
    });

    totaux.value = [number, total, pt_a, benefice, caisse, dette]

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



updateTotaux()
// buildBons()

// Watchers
watch(repCancel, (value)=>{
    if (value.response == 200){
        deletedIndexes.value.push(indexToRemove.value)
        indexToRemove.value = null
    } else if (value.response == 403){
        failedDelIndex.value.push(indexToRemove.value)
        indexToRemove.value = null
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
        // setTimeout(()=>{
        //     emit('lsIndex', selectIndex)
        // }, 2000)
    } else{
        repStatus.value = 2
    }
})
</script>