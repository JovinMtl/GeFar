<template>
    <div>
        <h3 style="color: white;">Vous pouvez mettre à jour votre principe d'Intéret.</h3>
        <div class="co-inte">
            <div>
                <input style="text-align: center; font-weight: 800;" :value="JSON.stringify(actual_prInterest.pr_interest)" disabled><br>
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
            

        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, watch } from 'vue';
    import joveLoader from '../../../layout/auxiliare/jove-loader.vue';
    import { useKurungika, useKuvoma } from '../../../hooks/kuvoma';

    const newPrInterest = ref<number|any>()
    const url_getPrInterest = "api/gOps/getPrInterest/"
    const [ actual_prInterest, askPrInterest] = useKuvoma(url_getPrInterest)

    const url_setPrInterest = "api/"
    const [report_setPrInterest, setPrInterest] = useKurungika(newPrInterest, url_setPrInterest)

    askPrInterest()

    watch(actual_prInterest, (val)=>{})
</script>