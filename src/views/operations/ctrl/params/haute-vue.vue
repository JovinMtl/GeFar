<template>
    <div class="c-w">
        <!-- Here we will enter an ID of a med and:
        be able to see wether its presence in umutiEntree, UmutiSold, UmutiSet.
        and be able to modify (prix_achat or prix_vente or date) -->
        <h3>Trouvez n'importe quel produit par son identifiant.</h3>
        <div class="mb-5">
            <input class="inp inpShape" type="text" v-model="actualId"> 
            <button :class="actualComp=='compile' ? 'bg-g-1 btnEffect':''" 
                @click="setComp('compile')">
                1 + 0,2
            </button>
            <button :class="actualComp=='prInte' ? 'bg-g-1 btnEffect':''" @click="setComp('prInte')">
                Pr Intéret
            </button>
            <button :class="actualComp=='achat' ? 'bg-g-1 btnEffect':''" @click="setComp('achat')">Achats</button>
            <button :class="actualComp=='prInte' ? 'bg-g-1 btnEffect':''" @click="setComp('nom')">
                Nom
            </button>
            <button :class="actualComp=='derPrix' ? 'bg-g-1 btnEffect':''" @click="setComp('derPrix')">
                Dernier prix
            </button>
            
            <!-- <button>Autre</button> -->
        </div>
        <div>
            <!-- Should mount these in suspense -->
            <compIled v-if="actualComp=='compile'" :code_med="actualId"
                @quit="closeComp"/>
            <prInte v-if="actualComp=='prInte'" :code_med="actualId"
                @quit="closeComp"/>
            <achAt v-if="actualComp=='achat'" :code_med="actualId"/>
            <updateNom v-if="actualComp=='nom'" :code_med="actualId"
                @quit="closeComp"/>
            <derPrix v-if="actualComp=='derPrix'" :code_med="actualId"
                @quit="closeComp"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'

import compIled from './htv/comp-iled.vue'
import prInte from './htv/pr-inte.vue'
import achAt from './htv/ach-at.vue'
import updateNom from './htv/update-nom.vue'
import derPrix from './htv/der-prix.vue'

const actualId:Ref<string> = ref('')
const actualComp:Ref<string> = ref('')

    // Functions
const closeComp = ()=>{
    actualComp.value = ""
    }
const setComp = (val)=>{
    actualComp.value = val
}

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
    /* background-color: grey; */
    border-radius: 8px;
}
</style>