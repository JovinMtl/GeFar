<template>
    <div style="position: absolute;background-color: white;
        width: 100%; height: 100%;z-index: 1;">
        <p>
            <h2>Classe Thérapeutique</h2>
        </p>
        <div class="sep">
            <label for="classeTher">
                Nom de la classe
                </label> <br>
                <input id="classeTher" 
                    type="text" 
                    v-model="newClassName"
                    @blur="checkClassFn"
                    @focus="clearSearch"
                /> <br>
                <button v-show="ignoreResults==1" 
                    @click="ignoreResults=2"
                    class="btn bg-r2">
                    Ignorer ce résultat
                </button>
        </div>
        <div v-if="(! existingClass?.status) && (ignoreResults != 2)" class="sep">
            <h5 v-show="showResultClass">Classe avec ce nom existant déjà.</h5>
            <div v-if="showResultClass" class="results-ctn">
                <p class="result-item" @click="getSubClass"
                    :data-n_group="classe?.n_group"
                    :data-name="classe?.name"
                    v-for="(classe, index) in resultsClass" 
                    :key="classe.id">
                    {{ classe.name }}
                </p>    
            </div>
            <div v-else-if="ignoreResults != 3" class="results-ctn">
                <p class="result-item italic" 
                    :data-n_group="classe?.n_group"
                    v-for="(subClasse, index) in existingSubClass" 
                    :key="subClasse.id">
                    {{ subClasse.name }}
                </p>
                <button 
                    v-show="ignoreResults==4"
                    class="btn bg-b"
                    @click="ignoreResults=5">Nouveau sous-classe</button> 
            </div>
        </div>
        <!-- <div v-else>
            <h5 v-show="(ignoreResults != 2)">Cette classe n'existe pas encore.</h5>
        </div> -->
        <div class="sep">
            <label for="classe">
            Sous classe
            </label> <br>
            <input type="text" :disabled="inputEnabled">
            
        </div>
        <div>
            <button 
                class="btn"
                :class="inputEnabled? 'bg-g2':'bg-b-1'"
                >Ajouter</button>
        </div>
    </div>
</template>
<script setup lang="ts">
import {computed, ref, toValue, watch } from 'vue'
import type { Ref } from 'vue'
import { useKurungika } from '../../hooks/kuvoma'

const newClassName: Ref<string | null> = ref(null)
const showResultClass: Ref<boolean> = ref(false)
const resultsClass = ref([])

const url_checkClass = 'api/gOps/check_class/'
const [existingClass, checkClass] = useKurungika(newClassName, url_checkClass)

const n_group = ref('')
const url_checkSubClass = 'api/gOps/check_subclass/'
const [existingSubClass, checkSubClass] = useKurungika(n_group, url_checkSubClass)

// Functions
function checkClassFn(){
    if(String(toValue(newClassName)).length > 2){
        alert("longueur: "+String(toValue(newClassName)).length)
        checkClass()
    }else{
        document.getElementById('classeTher').placeholder = "Trois lettres, SVP"
        alert("-longueur: "+String(toValue(newClassName)).length)
        ignoreResults.value = 6
    }
}
const clearSearch = ()=>{
    // existingClass.value = null;
    showResultClass.value = false;
    resultsClass.value = [];
}
const getSubClass = (event: any)=>{
    n_group.value = event.target.getAttribute('data-n_group');
    newClassName.value = event.target.getAttribute('data-name')
    checkSubClass();
    ignoreResults.value = 4
}

const resultsSubClass = ref([])
const showResultSubClass: Ref<boolean> = ref(false)

const ignoreResults = ref(0)
// Watchers
watch(existingSubClass, (value)=>{
    // resultsSubClass.value = value;
    showResultClass.value = false
})
watch(existingClass, (value)=>{
    showResultClass.value = true;
    resultsClass.value = value
    if(value?.status != 404){
        if(value?.status == 403){
            ignoreResults.value = 6
        }else{
            ignoreResults.value = 1
        }
    }else{
        ignoreResults.value = 5
    }

})

const inputEnabled = computed(()=>{
    if((ignoreResults.value==2) || (ignoreResults.value==5)){
        return false
    }else{
        return true
    }
})
</script>
<style scoped>
.sep{
    margin: 1rem;
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
.italic{font-style: italic;}
</style>