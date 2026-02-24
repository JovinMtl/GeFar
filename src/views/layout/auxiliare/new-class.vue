<template>
    <div style="position: absolute;background-color: white;
        width: 100%; height: 100%;z-index: 1;">
        <p>
            <h2>Classe Therapeutique</h2>
        </p>
        <div class="sep">
            <label for="classeTher">
                Nom de la classe
                </label> <br>
                <input id="classeTher" 
                    type="text" 
                    v-model="newClassName"
                    @blur="checkClass"
                />
                <span></span>
        </div>
        <div class="sep">
            <label for="classe">
            Sous classe
            </label> <br>
            <input type="text">
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useKurungika } from '../../hooks/kuvoma'

const newClassName: Ref<string | null> = ref(null)

const url_checkClass = 'api/gOps/check_class/'
const [statusClass, checkClass] = useKurungika(newClassName, url_checkClass)
</script>
<style scoped>
.sep{
    margin: 2rem;
}
input{
    padding: 0.5rem 0;
    padding: 0.5rem;
    background-color: rgba(25, 255, 25, 0.5);
    width: 100%;
}
</style>