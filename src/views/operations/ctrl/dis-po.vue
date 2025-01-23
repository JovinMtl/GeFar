<template>
    <div class="dynContent" style="">
        
        <div class="controlHeader" style="height: 5%; width: 100%;">
            <div  class="controlContent" style="font-size: .8rem;
                background-color: navy; color: white">
                <div class="contentElement1" style="display: inline-flex;background-color: transparent; width: 4%;height: 100%; color: green; ">
                    #
                </div> 
                <div class="contentElement2">
                    Nom du Med.
                </div> 
                <div class="contentElement3">
                    Qte
                </div>

                <div class="contentElement4">
                    <span v-if="isAdmin">P. Achat</span>
                    <!-- <span v-else>T. Med.</span>  -->
                </div>

                <div class="contentElement4">
                    P. Vente
                </div>

                <div class="contentElement4">
                    Total
                </div>

                <div class="contentElement4">
                <span v-if="isAdmin">Bénéfice</span> 
                </div>

                <div class="contentElement4">
                    Date
                </div>
                <div class="contentElement4">
                    Classe
                </div>
            </div>
        </div>

        <div class="controlBody">
            <div v-for="(umuti, index) in (actual_imitiS)" 
                class="d-f"
                :class="index%2 ? 'ln-1':'ln-2'">
                <div class="contentElement11">
                    {{ index + 1 }}
                </div> 
                <div class="contentElement2">
                    {{ umuti.nom_med }}
                </div> <div class="contentElement3">
                    {{ (umuti.quantite_restant || umuti.quantity ) }}
                </div> 

                <div class="contentElement4 famille_med">
                    <span v-if="isAdmin" >{{ umuti.prix_achat }}</span>
                    
                </div>

                <div class="contentElement4">
                    {{ umuti.prix_vente }}
                </div>

                <div class="contentElement4 total">
                        {{ umuti.prix_vente * (umuti.quantite_restant || umuti.quantity || 1) }}
                </div>

                <div class="contentElement4"> 
                <span v-if="isAdmin">{{ (umuti.prix_vente - umuti.prix_achat) * (umuti.quantite_restant || umuti.quantity || 1) }}</span> 
                <span v-else>{{ umuti.location }}</span>
                </div>

                <div class="contentElement4">
{{ (umuti.date_last_vente).slice(8,10) }}/{{ (umuti.date_last_vente).slice(5,7) }}/{{ (umuti.date_last_vente).slice(2,4) }}
                </div>
                <div class="contentElement4">
                    {{ (umuti.classe_med).slice(0,15) }}
                </div>
                
            </div>
        </div>

        <div class="controlFooter">
            <div  class="controlContent" style="font-weight: 700;">
                <div class="contentElement1">
                    #
                </div> 
                <div class="contentElement2">
                    TOTAL
                </div> 
                <div class="contentElement1">
                    {{ totaux[0] }}
                </div>

                <div class="contentElement4">
                    <!-- {{ (totaux[1] / (totaux[0] || 1)).toFixed(1) }} -->
    
                    <!-- {{ totaux[2] }} -->
                    {{ useReadable(totaux[2]) }}
                    
                </div>

                <div class="contentElement4">
                    <!-- {{ totaux[1] }} -->
                    {{ useReadable(totaux[1]) }}
                </div>

                <div class="contentElement4">
                    -----
                </div>

                <div class="contentElement4">
                    <!-- {{ totaux[3] }} -->
                    {{ useReadable(totaux[3]) }}
                </div>

                <div class="contentElement4">
                    ----
                </div>
            </div>
        </div>
                            
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import useReadable from '../../hooks/useReadable'
const props = defineProps(['med','admin'])
const actual_imitiS = ref(props.med)
const isAdmin = props.admin
const totaux = ref([0,0]) // To display totals on the footer.

console.log("THe props: ",actual_imitiS.value[3])

const updateTotaux = ()=>{
    console.log("Attempt to build totaux",)
    let [ number, total, pt_a, benefice ] = [0, 0, 0, 0]

    actual_imitiS.value.forEach(element => {
        // console.log("Quantite restant  pa:",  element.prix_vente)
        let tot = Number(element.prix_vente * (element.quantite_restant))
        let achat = Number(element.prix_achat * (element.quantite_restant))
        if (tot && achat){
            pt_a += achat
            total += tot
            benefice += (element.prix_vente - element.prix_achat) * (element.quantite_restant) 
        }

        
        
        
        
        console.log("total: ", total)
        number += 1
    });

    totaux.value = [number, total, pt_a, benefice]

}

updateTotaux()


</script>