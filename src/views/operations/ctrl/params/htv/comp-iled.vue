<template>
    <div class="bg-w bg-ht">
    <div class="c-b" style="display: flex; justify-content: center;">
        <!-- Ici on va modifier le produits compile -->
         
        <table style="text-align: right;">
            <tr>
                <th>Element</th>
                <th><span class="c-t">____</span>Valeur</th>
            </tr>
            <tr>
                <td>ID</td>
                <td class="c-w">{{ oneCompiledData.code_med }}</td>
            </tr>
            <tr>
                <td>Quantité</td>
                <td class="c-w">{{ 0 }}</td>
            </tr>
            <tr>
                <td>Prix de vente</td>
                <td class="c-w">{{ 1300 }}</td>
            </tr>
            <tr>
                <td>Fractionner?</td>
                <td class="c-w"><input style="scale: 1.8;" type="checkbox"></td>
            </tr>
        </table>
        
    </div>
        <div style="display: block;">
            <button class="btnComp" @click="getOneCompiled">Changer</button>
        </div>

        
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useKurungika } from '../../../../hooks/kuvoma'

const props = defineProps(['code_med'])

const oneCompiled_url = 'api/rep/getAllFine/'
const oneCompiledData = ref({
    code_med : props.code_med,
})
const [oneCompiled, getOneCompiled] = useKurungika(oneCompiledData, oneCompiled_url)
</script>

<style scoped>
th{
    margin: 0 15px;
}
.btnComp{
    margin: 15px;
    padding: 5px;
}
</style>