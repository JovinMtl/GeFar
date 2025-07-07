<template>
    <div class="dynContent" style="">
        <div v-if="showPopup" style="position:absolute; 
                    width: 100%;height: 100%;
                    background-color: transparent;">
            <div style="display: flex; 
                        background-color: transparent;
                        justify-content: center; 
                        align-items: center;
                        position: relative;
                        transform: translateX(-15%);
                        width: 100%; height: 100%;
                        flex-direction: column;">
                <yesVue @answer="getAnswer" :nom_med='nomMed'/>
            </div>
        </div>
        <div class="controlHeader" style="height: 5%; width: 100%;">
            <div  class="controlContent" style="font-size: .8rem;
                background-color: navy; color: white">
                <div class="elt contentElement1" style="display: inline-flex;background-color: transparent; width: 4%;height: 100%; color: green; ">
                    #
                </div> 
                <div class="elt contentElement2">
                    Nom du Med.
                </div> 
                <div class="elt contentElement3 deci-nu">
                    Qte
                </div>
                <div v-if="isAdmin" class="elt contentElement4">
                    <span>P. Achat</span>
                </div>
                <div v-else class="elt contentElement4">
                    _
                </div>

                <div class="elt contentElement4">
                    P. Vente
                </div>

                <div class="elt contentElement4">
                    Total
                </div>

                <div v-if="isAdmin" class="elt contentElement4">
                <span>Bénéfice</span> 
                </div>

                <div class="elt contentElement4">
                    Date A.
                </div>
                <div class="elt contentElement4">
                    Classe
                </div>
            </div>
        </div>
        
        <div class="controlBody  t-m-skin">
            <transition-group name="jove">
            <div v-for="(umuti, index) in (actual_imitiS)" 
                class="d-f"
                :class="index%2 ? 'ln-1':'ln-2'"
                :key="umuti.code_med + '-' + umuti.code_operation">
                <div class="contentElement11">
                    {{ index + 1 }}
                </div> 
                <div class="elt contentElement2">
                    {{ String(umuti.nom_med).slice(0, 25) }}
                </div> 
                <div :data-scr="umuti.code_med + ';' + umuti.code_operation + ';' + umuti.quantite_restant + ';' + index + ';' + umuti.nom_med" 
                    class="elt contentElement3 deci-nu mk-btn pointer clk" 
                    title="Dans le futur, vous pourrez Enlever ce médicament dans le stock." @click="clearRedMed">
                    {{ umuti.quantite_restant  }}
                </div> 
                <div class="elt contentElement4 famille_med">
                    <span v-if="isAdmin" >{{ umuti.prix_achat }}</span>
                    
                </div>

                <div class="elt contentElement4">
                    {{ umuti.prix_vente }}
                </div>

                <div class="elt contentElement4 total">
                        {{ umuti.prix_vente * (umuti.quantite_restant || umuti.quantity || 1) }}
                </div>

                <div v-if="isAdmin" class="elt contentElement4"> 
                <span>{{ (umuti.prix_vente - umuti.prix_achat) * (umuti.quantite_restant || umuti.quantity || 1) }}</span> 
                </div>

                <div class="elt contentElement4">
{{ (umuti.date_peremption).slice(8,10) }}/{{ (umuti.date_peremption).slice(5,7) }}/{{ (umuti.date_peremption).slice(2,4) }}
                </div>
                <div class="elt contentElement4">
                    {{ (umuti.classe_med).slice(0,15) }}
                </div>
                
            </div>
            </transition-group>
        </div>

        <div class="controlFooter">
            <div  class="controlContent" style="font-weight: 700;">
                <div class="elt contentElement1">
                    #
                </div> 
                <div class="elt contentElement2">
                    TOTAL
                </div> 
                <div class="elt contentElement1">
                    {{ totaux[0] }}
                </div>

                <div class="elt contentElement4">
                    <!-- {{ (totaux[1] / (totaux[0] || 1)).toFixed(1) }} -->
                    <span v-if="isAdmin">{{ useReadable(totaux[2]) }}</span>
                    
                    
                </div>

                <div class="elt contentElement4 ml-5">
                    -------
                </div>

                <div class="elt contentElement4 c-b-1">
                    {{ useReadable(totaux[1]) }}
                </div>

                <div class="elt contentElement4">
                    <span v-if="isAdmin">
                        {{ useReadable(totaux[3]) }}
                    </span>
                    
                </div>

                <div class="elt contentElement4">
                    ----
                </div>
            </div>
        </div>
        <!-- dyn popup -->
         
         
                            
    </div>
</template>

<script setup lang="ts">
import { reactive,ref, toValue, watch } from 'vue'
import useReadable from '../../hooks/useReadable';
import { useKurungika } from '../../hooks/kuvoma';
import yesVue from './popups/ye-s.vue'

const props = defineProps(['med','admin'])
const actual_imitiS = ref(props.med)
const isAdmin = props.admin
const totaux = ref([0,0]) // To display totals on the footer.
const medToClear = reactive({
    'code_med': '',
    'code_operation': '',
    'qte': 0
})
const nomMed = ref('')
const cleared = ref(false)
const showPopup = ref(false)
let actualIndex = 0


const url_add_perte = 'api/out/add_perte/'
const [rep_add_perte, addPerte] = useKurungika(medToClear, url_add_perte)

// console.log("THe props: ",actual_imitiS.value[3])

//Functions
const getAnswer = (value)=>{
    console.log("yes said: " + value)
    showPopup.value = false
    if (value == 'o'){
        addPerte()
    }
}
const removeElm = ()=>{

    // removing the clicked index
    let oldData = toValue(actual_imitiS)
    let newArr = oldData
    if (actualIndex == 0){
        newArr = oldData.slice(1)
    } else if ((actualIndex > 0)){
        let arr1 = oldData.slice(0, actualIndex)
        let arr2 = oldData.slice(actualIndex+1)
        newArr = arr1.concat(arr2)
    }
    actual_imitiS.value = newArr
}
const clearRedMed = (e)=>{
    const data = e.target.getAttribute('data-scr')
    console.log("The src: " + data)
    const dataArray = String(data).split(';')
    const code_med = dataArray[0]
    const code_operation = dataArray[1]
    const qte = dataArray[2]
    medToClear.code_med = code_med;
    medToClear.code_operation = code_operation;
    medToClear.qte = qte
    actualIndex = Number(dataArray[3])
    nomMed.value = dataArray[4]

    showPopup.value = true;
    
    // addPerte()
}
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

// Watchers
watch(rep_add_perte, (value)=>{
    if (value?.response == 1){
        removeElm()
    }
})
</script>

<style >
/* .jove-enter-from{
    opacity: 1;
    transform: translateY(0);
}
.jove-enter-active{
    transition: all 1s ease-in;
}
.jove-enter-to{
    opacity: 1;
    border: 2px solid red;
} */

.jove-leave-from{
    opacity: 1;
    transform: translateY(0);
}
.jove-leave-active{
    transition: all 0.6s ease-in;
}
.jove-leave-to{
    opacity: 0;
    transform: translateY(-30px);
    filter: blur(12px);
}
</style>