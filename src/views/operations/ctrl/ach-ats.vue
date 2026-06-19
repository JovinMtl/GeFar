<template>
    <div class="dynContent" style="">
        
        <div class="controlHeader" style="height: 5%; width: 100%;">
            <div  class="controlContent" style="font-size: .8rem;
                background-color: navy; color: white">
                <div class="elt contentElement1" style="display: inline-flex;background-color: transparent; width: 4%;height: 100%; color: green; ">
                    #
                </div> 
                <div class="elt contentElement2">
                    Nom du Med.
                </div> 
                <div class="elt contentElement3">
                    Qte
                </div>

                <div v-if="isAdmin" class="elt contentElement4">
                    <span>P. Achat</span>
                    <!-- <span v-else>T. Med.</span>  -->
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
                    Date Achat
                </div>
                <div class="elt elt5">
                    Classe Thér.
                </div>
            </div>
        </div>

        <div class="controlBody  t-m-skin">
            <div v-for="(umuti, index) in (actual_imitiS)" 
                class="d-f"
                :class="index%2 ? 'ln-1':'ln-2'">
                <div class="contentElement11" :title="'Par : ' + umuti?.operator">
                    {{ index + 1 }}
                </div> 
                <div class="elt contentElement2"
                    :class="annotatedIndexes.has(index) ? 'c-b-1 fw-8':''" 
                    :data-index="index" @click="changeBg"
                    :title="annotatedIndexes.has(index) == 0 ? 'Ajouter le marqueur':'Enlever le marqueur'">
                    {{ String(umuti.nom_med).slice(0, 25) }}
                </div> <div class="elt contentElement3">
                    {{ umuti.quantite_initial  }}
                </div> 

                <div class="elt contentElement4 famille_med">
                    <span v-if="isAdmin" >{{ useReadable(umuti.prix_achat) }}</span>
                    
                </div>

                <div class="elt contentElement4">
                    {{ umuti.prix_vente }}
                </div>

                <div class="elt contentElement4 total">
                        {{ useReadable(umuti.prix_vente * (umuti.quantite_restant || umuti.quantity || 1) )}}
                </div>

                <div v-if="isAdmin" class="elt contentElement4">
                    <span v-if="turnDateChange && (index==selectedIndex)">
                        <button @click="turnNoDate" class="sm-bt bg-r2">No</button>
                    </span>
                    <!-- <span>{{ (umuti.prix_vente - umuti.prix_achat) * (umuti.quantite_restant || umuti.quantity || 1) }}</span>  -->
                </div>

                <div class="elt contentElement4" :data-b="index +';'+umuti.code_med + ';' + umuti.code_operation"  @click="changeDate">
                      <span :id="'achat'+index" v-if="!turnDateChange || (index!=selectedIndex)">
                        {{ (umuti.date_entrant).slice(8,10) }}/{{ (umuti.date_entrant).slice(5,7) }}/{{ (umuti.date_entrant).slice(2,4) }}
                    </span>
                    <span v-else-if="turnDateChange && (index==selectedIndex)">
                        <input :ref="dateInp" v-model="newDate" type="date">
                    </span>
                </div>
                <div  v-if="turnDateChange && (index==selectedIndex)">
                    <button v-show="isInvalidDate"
                            class="sm-bt" :class="dataSending==1 ? 'flashi':''"
                            @click="takeNewDate">Ok</button>
                </div>
                <div v-else class="elt contentElement4">
                    {{ (umuti.classe_med).slice(0,15) }}
                    
                </div>
                
            </div>
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

                <div v-if="isAdmin" class="elt contentElement4">
                    <!-- {{ (totaux[1] / (totaux[0] || 1)).toFixed(1) }} -->
    
                    {{ useReadable(totaux[2]) }}
                    
                </div>

                <div class="elt contentElement4 ml-5">
                    ----------
                </div>

                <div class="elt contentElement4 c-b-1">
                    {{ useReadable(totaux[1]) }}
                </div>

                <div v-if="isAdmin" class="elt contentElement4">
                    {{ useReadable(totaux[3]) }}
                </div>

                <div class="elt contentElement4">
                    <!-- ---- -->
                </div>
            </div>
        </div>
                            
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch, toValue, nextTick } from 'vue'
import type { Ref } from 'vue'
import { useKurungika } from '../../hooks/kuvoma'
import useReadable from '../../hooks/useReadable'

interface dateDataType{
    'newDate': Date;
    'codeMed': string;
    'codeOperation': string;
}

const props = defineProps(['med','admin'])
const actual_imitiS = ref(props.med)
const isAdmin = props.admin
const totaux = ref([0,0]) // To display totals on the footer.

const annotatedIndexes = ref(null);
annotatedIndexes.value = new Set;
const newDate:Ref<Date> = ref(new Date())
const codeMed: Ref<string> = ref('')
const codeOperation: Ref<string> = ref('')
const dateData:dateDataType = reactive({
    'newDate': toValue(newDate),
    'codeMed': '',
    'codeOperation': '',
})
const selectedIndex: Ref<number> = ref(-1);
const actualId: Ref<string> = ref('');
const turnDateChange: Ref<boolean> = ref(false);
const dataSending: Ref<boolean> = ref(false);
const isInvalidDate:Ref<boolean> = ref(true)


const url_moveAchat = 'api/gOps2/move_achat/'
const [repMoveAchat, moveAchat] = useKurungika(dateData, url_moveAchat)

// Functions
const takeNewDate = ()=>{
    dateData.codeMed = toValue(codeMed)
    dateData.codeOperation = toValue(codeOperation)
    dateData.newDate = toValue(newDate)
    
    if (toValue(isInvalidDate) && 
        (dateData.newDate && 
        dateData.codeMed && 
        dateData.codeOperation)){
        dataSending.value = true;
        moveAchat()
    } else{
        console.log("THe new day is invalid : " + JSON.stringify(dateData))
    }
}
const changeDate = (e)=>{
    
    const data = e.target.parentNode.getAttribute('data-b')
    
    const code_operation = String(data).split(';')[2]
    const code_med = String(data).split(';')[1]
    const index = String(data).split(';')[0]

    if (code_med){
        codeOperation.value = code_operation
        codeMed.value = code_med
        selectedIndex.value = Number(index)
        actualId.value = `achat${index}`
    }
    
    turnDateChange.value = true;
}
const changeBg = (e)=>{
    const selectedIndex = Number(e.target.getAttribute('data-index'));
    if (!(annotatedIndexes.value.has(selectedIndex))){
        annotatedIndexes.value.add(selectedIndex);
    } else{
        annotatedIndexes.value.delete(selectedIndex)
    }
}

const updateTotaux = ()=>{

    let [ number, total, pt_a, benefice ] = [0, 0, 0, 0]

    actual_imitiS.value.forEach(element => {
        let tot = Number(element.prix_vente * (element.quantite_restant))
        let achat = Number(element.prix_achat * (element.quantite_restant))
        if (tot && achat){
            pt_a += achat
            total += tot
            benefice += (element.prix_vente - element.prix_achat) * (element.quantite_restant) 
        }
        number += 1
    });

    totaux.value = [number, total, pt_a, benefice]

}

// Initialization
updateTotaux()


// Watcher
watch(codeOperation, (v1, v2)=>{
    console.log(v1 + " : " + v2)
})
watch(newDate, (value)=>{
    const today = new Date()
    const newDateObj = new Date(value)
    
    if(newDateObj.getTime() <= today.getTime()){
        isInvalidDate.value = true
    }else{
        isInvalidDate.value = false
    }
})
watch(repMoveAchat, (value)=>{
    turnDateChange.value = false;
    nextTick(()=>{
        const elmInp = document.getElementById(toValue(actualId))
        elmInp.innerHTML = toValue(newDate)
    })
    dataSending.value = false;
})

</script>