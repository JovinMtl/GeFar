<template>
    <div class="dynContent p-2">

        <!-- Different settings will appear here
         as individual components -->
         <nav>
            <button @click="selectSetting('prInteret')">Principe Intéret</button>
            <button @click="selectSetting('hauteVue')">Haute Vue</button>
            <!-- <button @click="selectSetting('tauxChange')">Taux de Change</button> -->
            <!-- <button @click="selectSetting('clssThera')">Prix de Vente</button> -->
            <button @click="selectSetting('assuRances')">Assurances</button>
            <button @click="selectSetting('ut')">Utilisateurs</button>
         </nav>
         <section  id="paraContainer" >
            <div>
                <!-- <component :is="actualComponent"></component> -->

                <prInteret v-if="actualComponent=='prInteret'" @quit="closeComp"/>
                <hauteVue v-if="actualComponent=='hauteVue'"/>
                <!-- <tauxChange v-if="actualComponent=='tauxChange'" /> -->
                <clssThera v-if="actualComponent=='clssThera'" />
                <assuRances v-if="actualComponent=='assuRances'" />
                <utiliSateurs v-if="actualComponent=='utiliSateurs'" />
            </div>
         </section>
                            
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import prInteret from './params/pr-interet.vue';
    import hauteVue from './params/haute-vue.vue';
    // import tauxChange from './params/taux-change.vue';
    import clssThera from './params/clss-thera.vue';
    import assuRances from './params/assu-rances.vue';
    import utiliSateurs from './params/utili-sateurs.vue';

    const actualComponent = ref<string|any>(null)

    // Functions
    const closeComp = ()=>{
        actualComponent.value = ""
    }
    const selectSetting = (opt:string)=>{
        actualComponent.value = String(opt)
    }
</script>