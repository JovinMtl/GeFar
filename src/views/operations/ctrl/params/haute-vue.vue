<template>
    <div class="c-w">
        <!-- Here we will enter an ID of a med and:
        be able to see wether its presence in umutiEntree, UmutiSold, UmutiSet.
        and be able to modify (prix_achat or prix_vente or date) -->
        <h3>Trouvez n'importe quel produit par son identifiant.</h3>
        <div class="mb-5">
            <input class="inp inpShape" type="text" v-model="actualId"> 
            <button :class="actualComp=='compile' ? 'bg-b btnEffect':''" 
                @click="setComp('compile')">
                1 + 0,2
            </button>
            <button v-if="isAdmin" :class="actualComp=='prInte' ? 'bg-b btnEffect':''" @click="setComp('prInte')">
                Pr Intéret
            </button>
            <button :class="actualComp=='pxV' ? 'bg-b btnEffect':''" @click="setComp('pxV')">
                Px.Vente
            </button>
            <button v-if="isAdmin" :class="actualComp=='achat' ? 'bg-b btnEffect':''" @click="setComp('achat')">
                Achats</button>
            <button :class="actualComp=='histo' ? 'bg-b btnEffect':''" @click="setComp('histo')">
                Ventes
            </button>
            <button v-if="isAdmin" :class="actualComp=='nom' ? 'bg-b btnEffect':''" @click="setComp('nom')">
                Nom
            </button> 
            <button :class="actualComp=='Double' ? 'bg-b btnEffect':''" 
                @click="setComp('Double')">
                Dble
            </button>
            <!-- <button :class="actualComp=='derPrix' ? 'bg-g-1 btnEffect':''" @click="setComp('derPrix')">
                Dernier prix
            </button> -->
            
        </div>
        <div>
            <!-- Should mount these in suspense -->
            <compIled v-if="actualComp=='compile'" :code_med="actualId"
                @quit="closeComp"/>
            <prInte v-if="actualComp=='prInte'" :code_med="actualId"
                @quit="closeComp"/>
            <pxVente v-if="actualComp=='pxV'" :code_med="actualId"
                @quit="closeComp"/>
            <achAt v-if="actualComp=='achat'" :code_med="actualId"
                @refresh="refreshComp" :key="achatKey"/>
            <updateNom v-if="actualComp=='nom'" :code_med="actualId"
                @quit="closeComp"/>
            <derPrix v-if="actualComp=='derPrix'" :code_med="actualId"
                @quit="closeComp"/>
            <histo v-if="actualComp=='histo'" :code_med="actualId"
                @quit="closeComp"/>
            <douBle v-if="actualComp=='Double'" :code_med="actualId"
                @quit="closeComp"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, inject, watch } from 'vue'
import type { Ref } from 'vue'

import compIled from './htv/comp-iled.vue'
import prInte from './htv/pr-inte.vue'
import pxVente from './htv/px-vente.vue'
import achAt from './htv/ach-at.vue'
import updateNom from './htv/update-nom.vue'
import derPrix from './htv/der-prix.vue'
import histo from './htv/histo.vue'
import douBle from './htv/dou-ble.vue'

const props = defineProps(['admin'])

const actualId:Ref<string> = ref('')
const actualComp:Ref<string> = ref('')
const achatKey:Ref<number> = ref(0)

const isAdmin = props.admin

// Functions
function refreshComp(){
    achatKey.value += 1
}
const closeComp = ()=>{
    actualComp.value = ""
    }
const setComp = (val)=>{
    actualComp.value = val
}

// Watchers
watch(actualId, ()=>{
    closeComp();
})

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