
import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'


export const useError500 = defineStore('error500', ()=>{
    const error = ref(false)
    const errorMessage = ref('')


    const getError500 = ()=>{
        return error.value
    }
    const getError500Msg = ()=>{
        return errorMessage
    }
    const setError500True = ()=>{
        error.value = true;
    }
    const setError500Msg = (msg)=>{
        errorMessage.value = `Une erreur est survenu. 
            Contactez nsanzumukizath@gmail.com  et signaler (500): ${msg}`;
    }
    const clearError500 = ()=>{
        error.value = false;
        errorMessage.value = '';
    }


    return {
        getError500, getError500Msg,
        setError500True,setError500Msg, 
        clearError500,
    }
})

