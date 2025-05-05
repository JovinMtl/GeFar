<template>
    <div class="prMainContainer">
        <!-- Manage to receive the inputs likely imiti_S,
         and adapt for printing -->
        <div>
            <h3>Here for printing</h3>
        </div>
        <div>
            <slot></slot>
        </div>
         
    </div>
</template>
<script setup lang="ts">
import { useTitle } from '@vueuse/core'

const props = defineProps(['pageTitle',])

const title = useTitle()
title.value = props['pageTitle']
</script>
<style scoped>
.prMainContainer{
    width: 100%;
    /* height: 100%; */
    background-color: rgba(255, 255, 255, 1);
    color: black;
    position: absolute;
    overflow: visible;
    page-break-after: auto;
  }
  
</style>