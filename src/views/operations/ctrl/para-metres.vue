<template>
    <div class="dynContent p-2">

        <!-- Different settings will appear here
         as individual components -->
         <nav>
            <button>Principe Intéret</button>
            <button>Taux de Change</button>
            <button>Classes Thérapeutiques</button>
            <button>Assurances</button>
            <button>Utilisateurs</button>
         </nav>
         <section>
            <h3>The title here</h3>
            <div>
                <!-- The Settings here -->
                 <!-- iscompon -->
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

    const actualComponent = ref(null)
</script>