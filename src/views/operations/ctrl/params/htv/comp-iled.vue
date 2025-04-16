<template>
    <div class="bg-w c-b" style="display: flex; justify-content: center;">
        <!-- Ici on va modifier le produits compile -->
         
        <table style="text-align: right;">
            <tr>
                <th>Element</th>
                <th><span class="c-t">____</span>Valeur</th>
            </tr>
            <tr>
                <td>Quantité</td>
                <td>{{ 0 }}</td>
            </tr>
            <tr>
                <td>Fractionner?</td>
                <td><input type="checkbox"></td>
            </tr>
        </table>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useKurungika } from '../../../../hooks/kuvoma'

const oneCompiled_url = 'api/rep/getAllFine/'
const oneCompiledData = ref(null)
const [oneCompiled, getOneCompiled] = useKurungika(oneCompiledData, oneCompiled_url)
</script>

<style scoped>
th{
    margin: 0 15px;
}
</style>