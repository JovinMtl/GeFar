<template>
    <div class="reduction">
        <div style="font-style:italic;
            align-self:center;">
        Un client spécial?

            </div>
            <div class="rdBtn" 
            :class="rdBtnActive ? 'rdBtn-1':'rdBtn-2'"
            @click="isSpecial">
            </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'

//Variable declaration
const rdBtnActive: Ref<boolean> = ref(false)

//Function declaration
const isSpecial = ()=>{
    rdBtnActive.value = !rdBtnActive.value
}
</script>