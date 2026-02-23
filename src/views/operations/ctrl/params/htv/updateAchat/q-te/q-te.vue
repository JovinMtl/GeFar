<template>
    <div>
        
        <label> Ancien Qté : 
            <span class="c-b">{{ (props.umutiData?.prix_achat) }}</span> 
        </label>
        <hr>
        <input type="number" placeholder="Nouveau Px.Achat"/>
        <div>
            <button class="btn bg-b-1">Ok</button>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { ref, watch } from 'vue'
    const props = defineProps(['umutiData']);
</script>