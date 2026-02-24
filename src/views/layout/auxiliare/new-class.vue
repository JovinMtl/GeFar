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
                    @focus="clearSearch"
                /> <br>
                <button>Ignorer ce resultat</button>
        </div>
        <div v-if="(! existingClass?.status)" class="sep">
            <h5 v-show="showResult">Classe avec ce nom existant déjà.</h5>
            <div class="results-ctn">
                <p class="result-item" 
                    v-for="(classe, index) in results" 
                    :key="classe.id">
                    {{ classe.name }}
                </p>    
            </div>
        </div>
        <div v-else>
            <h5>Cette classe n'existe pas encore.</h5>
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
import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import { useKurungika } from '../../hooks/kuvoma'

const newClassName: Ref<string | null> = ref(null)
const showResult: Ref<boolean> = ref(false)
const results = ref([])

const url_checkClass = 'api/gOps/check_class/'
const [existingClass, checkClass] = useKurungika(newClassName, url_checkClass)


// Functions
const clearSearch = ()=>{
    // existingClass.value = null;
    showResult.value = false;
    results.value = []
}



watch(existingClass, (value)=>{
    showResult.value = true;
    results.value = value
})
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
.results-ctn{
    max-height: 200px; overflow-y: auto;
}
.result-item{
    border-bottom: 1px dashed black;
    margin: 0;
    margin-right: 5px; 
    padding: 4px;
    cursor: pointer;
    color: rgb(0, 0, 185);
}
</style>