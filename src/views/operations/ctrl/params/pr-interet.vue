<template>
    <div>
        <h3 style="color: white;">Vous pouvez mettre à jour votre principe d'Intéret.</h3>
        <div class="co-inte">
            <div>
                <input style="text-align: center; font-weight: 800;" :value="JSON.stringify(actual_prInterest?.pr_interest)" disabled><br>
                <label>Actuel</label>
            </div>
            <div>
                <input style="text-align: center;" 
                    placeholder="??" type="number"
                    v-model="newPrInterest"/><br>
                <label>Nouveau</label>
            </div>
            <div>
                <input type="button" 
                    @click="setPrInterest" 
                    value="Approuver"/>
                
            </div>
            <div>
                <oK v-show="report_setPrInterest?.status"/>
                <nO v-show="falseInput"/>
            </div>
            
            

        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, watch } from 'vue';
    import oK from './o-k.vue';
    import nO from './n-o.vue';
    import { useKurungika, useKuvoma } from '../../../hooks/kuvoma';

    const emits = defineEmits(['quit'])

    const newPrInterest = ref<number|any>()
    const falseInput = ref<boolean>(false)
    const url_getPrInterest = "api/gOps/getPrInterest/"
    const [ actual_prInterest, askPrInterest] = useKuvoma(url_getPrInterest)

    const url_setPrInterest = "api/gOps/setPrInterest/"
    const [report_setPrInterest, setPrInterestComposable] = useKurungika(newPrInterest, url_setPrInterest)

    const setPrInterest = ()=>{
        falseInput.value = false
        if (newPrInterest.value >10 && newPrInterest.value < 100){
            newPrInterest.value = 1 + (newPrInterest.value / 100)
        }
        if (newPrInterest.value > 0 && newPrInterest.value <2){
            console.log("Les choses sont bonnes.")
            setPrInterestComposable()
        } else{
            falseInput.value = true;
        }
    }

    askPrInterest()

    watch(report_setPrInterest, (value)=>{
        console.log("The prInteret says: " + value?.status)
        if(value?.status){
            setTimeout(()=>{
                emits("quit")
            }, 1000)
        }
    })
</script>