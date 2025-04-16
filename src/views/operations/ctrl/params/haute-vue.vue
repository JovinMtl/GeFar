<template>
    <div class="c-w">
        <!-- Here we will enter an ID of a med and:
        be able to see wether its presence in umutiEntree, UmutiSold, UmutiSet.
        and be able to modify (prix_achat or prix_vente or date) -->
        <h3>Trouvez n'importe quel produit par son identifiant.</h3>
        <div class="mb-5">
            <input class="inp inpShape" type="text" v-model="actualId"> 
            <button>Compilé</button>
            <button>Achats</button>
            <button>Autre</button>
        </div>
        <div>
            <compIled/>
            <achAt />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useKurungika } from '../../../hooks/kuvoma'

import compIled from './htv/comp-iled.vue'
import achAt from './htv/ach-at.vue'

const actualId:Ref<string> = ref('')

const oneCompiled_url = 'api/rep/getAllFine/'
const oneCompiledData = ref(null)
const [oneCompiled, getOneCompiled] = useKurungika(oneCompiledData, oneCompiled_url)
</script>

<style scoped>
.inp{
    width: 150px;
    color: black;
    padding: 15px;
    text-align: center;
}
button{
    margin: 0 20px;
    padding: 10px;
    background-color: grey;
    border-radius: 8px;
}
</style>