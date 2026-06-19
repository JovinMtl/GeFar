<template>
    <div style="position: absolute;background-color: white;
        width: 100%; height: 100%;z-index: 1;">
        
        <h2>Classe Thérapeutique</h2>
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
                    v-for="(classe, index) in resultsClass" 
                    :key="index"
                    :data-n_group="classe?.n_group"
                    :data-name="classe?.name">
                    {{ classe?.name }}
                </p>    
            </div>
            <div v-else-if="ignoreResults != 3" class="results-ctn">
                <p class="result-item italic" 
                    v-for="(subClasse, index) in existingSubClass" 
                    :key="index">
                    {{ subClasse.name }}
                    <span>
                        &nbsp;
                        <button class="btn bg-r2" 
                            @click="clearSearch">
                            -
                        </button>
                    </span>
                </p>
                <button 
                    v-show="ignoreResults==4"
                    class="btn bg-b"
                    @click="ignoreResults=5">Nouveau sous-classe</button> 
            </div>
        </div>
        <div @click="checkInputDisabled">
            <div class="sep">
                <label for="classe">
                Sous classe
                </label> <br>
                <input type="text" 
                    :disabled="inputDisabled"
                    v-model="data.newSubClassName">
                
            </div>
            <div>
                <button 
                    class="btn"
                    :class="[inputDisabled? 'bg-g2':'bg-b-1', status==200? 'bg-g-1':'', status==403?'bg-r2':'']"
                    @click="addInfos">Ajouter</button>
            </div>
        </div>
        <div v-show="message" 
            class="sep sm-l c-danger"
            :class="status==200 ? 'c-g-1 fw-8':''">
            <p>{{ message }}</p>
        </div>
    </div>
</template>
<script setup lang="ts">
import {computed, reactive, ref, toValue, watch } from 'vue'
import type { Ref } from 'vue'
import { useKurungika } from '../../hooks/kuvoma'
import { set } from '@vueuse/core'

const emit = defineEmits(['close'])

const newClassName: Ref<string | null> = ref(null)
const newSubClassName: Ref<string | null> = ref(null)
const showResultClass: Ref<boolean> = ref(false)
const resultsClass = ref([])
const message = ref('')

const url_checkClass = 'api/gOps/check_class/'
const [existingClass, checkClass] = useKurungika(newClassName, url_checkClass)

const n_group = ref('')
const url_checkSubClass = 'api/gOps/check_subclass/'
const [existingSubClass, checkSubClass] = useKurungika(n_group, url_checkSubClass)


const data = reactive({
    newClassName: newClassName, // null when newClassName is really new
    newSubClassName: null,
    n_group: n_group // null when newClassName is really new
})

const url_addClassSubClass = 'api/gOps/add_class_subclass/'
const [responseAddClassSubClass, addClassSubClass] = useKurungika(data, url_addClassSubClass)
const status = ref(0)

// Functions
function addInfos(){
    //Validations
    // and send data
    addClassSubClass()
}
function checkInputDisabled(){
    if((inputDisabled.value)){
        writeMsg("Veuillez confirmer la classe thérapeutique")
    }
}
function writeMsg(msg:string){
    message.value = msg;
    setTimeout(()=>{
        message.value = '';
    }, 2000)
}
function checkClassFn(){
    if(String(toValue(newClassName)).length > 2){
        checkClass()
    }else{
        writeMsg("Longueur de la classe doit être supérieure à 2 caractères.")
        document.getElementById('classeTher').placeholder = "Trois lettres, SVP"
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
watch(responseAddClassSubClass, (value)=>{
    if(value?.status == 200){
        status.value = 200;
        writeMsg("Classe et sous-classe ajoutées avec succès.")
        newClassName.value = null;
        newSubClassName.value = null;
        n_group.value = '';
        setTimeout(()=>{
            emit('close')
        }, 1500)
    }else if(value?.status == 403){
        status.value = 403;
        writeMsg(value?.message)
    }
})
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

const inputDisabled = computed(()=>{
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
    text-align: center;
}
input:disabled{
    background-color: wheat;
}
.results-ctn{
    max-height: 230px; overflow-y: auto;
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