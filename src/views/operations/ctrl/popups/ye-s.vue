<template>
    <div style="display: flex; 
                    background-color: transparent;
                    justify-content: center; 
                    align-items: center;" >
        <div class=" bg-w b-r-8 p-h-5">
            Vous êtes sûr de vouloir enlever 
            <span v-if="String(props.nom_med).length <= 8" style="font-weight: 600;color: red">{{ String(props.nom_med).slice(0, 10) }}</span>
            <span v-else style="font-weight: 600;color: red">{{ String(props.nom_med).slice(0, 10) }}...</span>
             ?   
            Oui (
                <span class="c-r">o</span>
                 
                )  /   
            Non (
                <span class="c-r">n</span>  
                ) ?
            
        </div>
        <div>
            <input type="text" 
                class="cnf-cancl" placeholder="?"
                v-model="answer" />
        </div>
        <div>
            <button class="b-r-8 clk bg-b-1" 
                @click="checkAnswer">
                Soumettre
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, toValue } from 'vue'

const emit = defineEmits(['answer'])
const props = defineProps(['nom_med'])

const answer = ref(null)

// Functions
const checkAnswer = ()=>{
    if (toValue(answer) == 'o'){
        emit('answer', 'o')
    } else{
        emit('answer', 'n')
    }
}
</script>
<style scoped>
button{
    padding: 5px 10px;
}
input{
    margin: 0 10px;
    text-align: center;
}
input::placeholder{
    text-align: center;
}
.b-r-8{
    border-radius: 5px;
}
.p-h-5{
    padding: 0 5px;
}
</style>