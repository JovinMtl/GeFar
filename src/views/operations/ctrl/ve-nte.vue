<template>
    <div class="dynContent" style="">
        
        <div class="controlHeader" style="height: 5%; width: 100%;">
            <div  class="controlContent" style="font-size: .8rem;
                background-color: navy; color: white">
                <div class="contentElement1" style="display: inline-flex;background-color: transparent; width: 4%;height: 100%; color: inherit; ">
                    #
                </div> 
                <div class="contentElement2">
                    Nom du Med.
                </div> 
                <div class="contentElement3">
                    Qte
                </div>

                <div class="contentElement3">
                    <span v-if="isAdmin">P. A.</span>
                    <!-- <span v-else>T. Med.</span>  -->
                </div>

                <div class="contentElement3">
                    P. V.
                </div>

                <div class="contentElement3">
                    Total
                </div>

                <div class="contentElement3">
                <span v-if="isAdmin">Bnf</span> 
                </div>
                <div class="elt5">
                    Caisse
                </div>
                <div class="elt5">
                    Dette
                </div>
                <div class="elt5">
                    Assu.
                </div>
                <div class="elt5">
                    Catég.
                </div>

                <div class="elt5">
                    Date
                </div>
                <div class="elt5">
                    Payer
                </div>
            </div>
        </div>

        <!-- <div class="controlBody" style="display: none;">
            <div v-for="(umuti, index) in (actual_imitiS)" 
                :class="index%2 ? 'ln-1':'ln-2'"
                class="d-f"
                :key="index">
                <div class="contentElement11">
                    {{ index + 1 }}
                </div> 
                <div class="contentElement2">
                    {{ umuti.nom_med }}
                </div> <div class="contentElement3">
                    {{ (umuti.quantity || umuti.quantity ) }}
                </div> 

                <div class="contentElement3 famille_med">
                    <span v-if="isAdmin" >{{ umuti.prix_achat }}</span>
                    
                </div>

                <div class="contentElement3">
                    {{ umuti.prix_vente }}
                </div>

                <div class="contentElement3 total">
                        {{ umuti.prix_vente * (umuti.quantity || umuti.quantity || 1) }}
                </div>

                <div class="contentElement3"> 
                <span v-if="isAdmin">{{ (umuti.prix_vente - umuti.prix_achat) * (umuti.quantity || 1) }}</span> 
                <span v-else>{{ umuti.location }}</span>
                </div>
                <div class="elt5">
                     <span v-if="repBons[index].is_paid">{{umuti.prix_vente * (umuti.quantity || 1)}}</span>
                     <span v-else>
                          20
                     </span>
                </div>
                <div class="elt5">
                     dette
                </div>
                <div class="elt5">
                     assu
                </div>
                <div class="elt5">
                     categ
                </div>

                <div class="elt5">
{{ (umuti.date_operation).slice(8,10) }}/{{ (umuti.date_operation).slice(5,7) }}/{{ (umuti.date_operation).slice(2,4) }}
                </div>
                <div class="elt5">
                     <span v-if="!repBons[index].is_paid" :id="'i'+ index" class="btn2 br mt w-22 bg-g"
                        :class="selectIndex.has(index)? 'bg-b':''"
                       @click="checkBon"></span>
                </div>
                
            </div>
        </div> -->

        <div class="controlBody">
            <div v-for="(umuti, index) in (actual_imitiS)" 
                :class="index%2 ? 'ln-1':'ln-2'"
                class="d-f"
                :key="index">
                <div class="contentElement11">
                    {{ index + 1 }}
                </div> 
                <div class="contentElement2">
                    {{ umuti.nom_med }}
                </div> <div class="contentElement3">
                    {{ (umuti.qte ) }}
                </div> 

                <div class="contentElement3 famille_med">
                    <span v-if="isAdmin" >{{ umuti.prix_achat }}</span>
                    
                </div>

                <div class="contentElement3">
                    {{ umuti.prix_vente }}
                </div>

                <div class="contentElement3 total">
                        {{ umuti.total }}
                </div>

                <div class="contentElement3"> 
                <span v-if="isAdmin">{{ (umuti.prix_vente - umuti.prix_achat) * (umuti.qte || 1) }}</span> 
                
                </div>
                <div class="elt5">
                     <span >{{umuti.caisse}}</span>
                </div>
                <div class="elt5">
                    <span :class="umuti.assu=='Pharmacie Ubuzima' ? 'c-g':''">
                        {{ umuti.dette }}</span>
                     
                </div>
                <div class="elt5">
                    <span v-show="umuti.assu !='Sans'">
                        {{ (umuti.assu).slice(0,5) }}...
                    </span>
                </div>
                <div class="elt5">
                    <span v-show="umuti.categ!='null'">{{ umuti.categ }}</span>
                     
                </div>

                <div class="elt5">
{{ (umuti.date_operation).slice(8,10) }}/{{ (umuti.date_operation).slice(5,7) }}/{{ (umuti.date_operation).slice(2,4) }}
                </div>
                <div class="elt5">
                     <span v-if="!umuti.is_paid" class="btn2 br mt w-22 bg-g"
                        :id="'j'+index"
                        :class="selectIndex.has(index)? 'bg-b':''"
                       @click="checkBon"></span>
                </div>
                
            </div>
        </div>

        <div class="controlFooter">
            <div  class="controlContent" style="font-weight: 700;font-size: .8rem;">
                <div class="contentElement1">
                    #
                </div> 
                <div class="contentElement2">
                    TOTAL
                </div> 
                <div class="contentElement1">
                    {{ totaux[0] }}
                </div>

                <div class="contentElement3">
                    <!-- {{ (totaux[1] / (totaux[0] || 1)).toFixed(1) }} -->
    
                    {{ totaux[2] }}
                    
                </div>

                <div class="contentElement3">
                    ----
                </div>

                <div class="contentElement3 total" style="margin-right: 5px;">
                    {{ totaux[1] }}
                </div>

                <div class="contentElement3">
                    {{ totaux[3] }}
                </div>
                <div class="elt5">
                     caisse
                </div>
                <div class="elt5">
                     dette
                </div>
                <div class="elt5">
                     assu
                </div>
                <div class="elt5">
                     categ
                </div>

                <div class="elt5">
                    ----------
                </div>
                <div class="elt5">
                    <span v-show="repStatus==0 && selectIndex.size" class="pay" @click="fIndex">
                        Payer
                    </span>
                    <span v-if="repStatus">
                        <span v-if="repStatus==1">Ok</span>
                        <span v-if="repStatus==2">No</span>
                    </span>
                </div>
            </div>
        </div>
                            
    </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useKurungika, usePostRequest } from '../../hooks/kuvoma'
import { Value } from 'sass'
const props = defineProps(['med','admin'])
const emit = defineEmits(['lsIndex'])
const actual_imitiS = ref(props.med)
const isAdmin = props.admin
const totaux = ref([0,0]) // To display totals on the footer.
const selectIndex =ref(new Set())
const repStatus  = ref<number>(0)

const idBons = ref([])

let tempSelected = 0

const url_sendIndex = 'api/gOps/setBons/'
const [repIndex, sendIndex] = usePostRequest()

const url_sendBons = 'api/gOps/getBons/'
const [repBons, sendBons] = usePostRequest()

const fIndex = ()=>{
    console.log("Really wish to send: ", selectIndex.value)
   const bon_ids = removeBadBons()
    sendIndex(bon_ids, url_sendIndex)
}
const updateTotaux = ()=>{
    // console.log("Attempt to build totaux",)
    let [ number, total, pt_a, benefice ] = [0, 0, 0, 0]

    actual_imitiS.value.forEach(element => {
        // console.log("Quantite restant  pa:",  element.prix_vente)
        let tot = Number(element.prix_vente * (element.quantity))
        let achat = Number(element.prix_achat * (element.quantity))
        if (tot && achat){
            pt_a += achat
            total += tot
            benefice += (element.prix_vente - element.prix_achat) * (element.quantity) 
        }

        
        
        
        
        // console.log("total: ", total)
        number += 1
    });

    totaux.value = [number, total, pt_a, benefice]

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
    let indexes1 = selectIndex.value
    // find falses
    let false_ids = []
    let i = 0
    console.log("Rep Bons", repBons.value, 
    "selInd:", selectIndex.value)
    // repBons.value.forEach(elm=>{
    //     if(!elm.is_paid){
    //         console.log("Not paid:", elm.is_paid)
    //         false_ids.push(i)
    //         // remove that index in selectIndex
            
    //     } else{
    //         selectIndex.value.delete(i)
    //     }
    //     i += 1
    // })
    console.log("The remaining Indexes:", selectIndex.value,
        ":removed:", false_ids
    )
    // building new and related bon ids
    let arr = []
    // selectIndex.value.forEach(elm=>{
    //     console.log("Consider:", repBons.value[elm].id)
    //     arr.push(repBons.value[elm].id)
    // })
    return arr
}
const buildBons = ()=>{
    let arr = []
    actual_imitiS.value.forEach((elm)=>{
        arr.push(elm.bon_de_commande)
    })
    idBons.value = arr
    console.log("Bons to request:", idBons.value)
    sendBons(idBons.value, url_sendBons)
    // removeBadBons()
}



updateTotaux()
buildBons()

watch(repBons, (value)=>{
    console.log("SendBon: ", value)
    // removeBadBons()
})
watch(repIndex, (value)=>{
    // console.log("La reponse: ", value)
    if(value.status==1){
        repStatus.value = 1
        // console.log("Succes")
        setTimeout(()=>{
            emit('lsIndex', selectIndex)
        }, 2000)
    } else{
        repStatus.value = 2
    }
})
</script>