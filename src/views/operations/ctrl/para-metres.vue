<template>
    <div class="dynContent p-2">

        <!-- Different settings will appear here
         as individual components -->
         <nav>
            <button @click="selectSetting('prInteret')">Principe Intéret</button>
            <button @click="selectSetting('tauxChange')">Taux de Change</button>
            <button @click="selectSetting('clssThera')">Classes Thérapeutiques</button>
            <button @click="selectSetting('assuRances')">Assurances</button>
            <button @click="selectSetting('ut')">Utilisateurs</button>
         </nav>
         <section>
            <div>
                <!-- <component :is="actualComponent"></component> -->

                <prInteret v-if="actualComponent=='prInteret'"/>
                <tauxChange v-if="actualComponent=='tauxChange'" />
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
    import tauxChange from './params/taux-change.vue';
    import clssThera from './params/clss-thera.vue';
    import assuRances from './params/assu-rances.vue';
    import utiliSateurs from './params/utili-sateurs.vue';

    const actualComponent = ref<string|any>(null)

    const selectSetting = (opt:string)=>{
        actualComponent.value = String(opt)
    }
</script>