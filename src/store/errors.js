
import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'


export const useError500 = defineStore('error500', ()=>{
    const errorObj = ref({
        'state': false,
        'detail': '',
    })


    const getError500 = ()=>{
        return errorObj;
    }
    const setError500True = (msg)=>{
        console.log("Inside setError500True: " + errorObj.state)
        errorObj.state = true;
        errorObj.detail = `Une erreur est survenu. 
            Contactez nsanzumukizath@gmail.com  et signaler (500): ${msg}`;
        console.log("Calling 2: setError500True, see state ", errorObj.state)
    }
    const clearError500 = ()=>{
        errorObj.state = false;
        errorObj.detail = ''
    }


    return {
        getError500,
        setError500True, clearError500,
    }
})

