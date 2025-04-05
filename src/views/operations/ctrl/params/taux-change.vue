<template>
    <div>
        <h3 style="color: white;">Vous pouvez actualiser le taux de change.</h3>
        <div class="co-inte">
            <div>
                <input style="text-align: center; font-weight: 800;" :value="JSON.stringify(actual_prInterest?.txChange)" disabled><br>
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
    import joveLoader from '../../../layout/auxiliare/jove-loader.vue';
    import oK from './o-k.vue';
    import nO from './n-o.vue';
    import { useKurungika, useKuvoma } from '../../../hooks/kuvoma';

    const newPrInterest = ref<number|any>()
    const falseInput = ref<boolean>(false)
    const url_getPrInterest = "api/gOps/getTxChange/"
    const [ actual_prInterest, askPrInterest] = useKuvoma(url_getPrInterest)

    const url_setPrInterest = "api/gOps/setTxChange/"
    const [report_setPrInterest, setPrInterestComposable] = useKurungika(newPrInterest, url_setPrInterest)

    const setPrInterest = ()=>{
        falseInput.value = false
        // if (newPrInterest.value >10 && newPrInterest.value < 100){
        //     newPrInterest.value = 1 + (newPrInterest.value / 100)
        // }
        if (newPrInterest.value > 1000 && newPrInterest.value < 10000){
            console.log("Les choses sont bonnes.")
            setPrInterestComposable()
        } else{
            falseInput.value = true;
        }
    }


    askPrInterest()

    watch(actual_prInterest, (val)=>{})
</script>