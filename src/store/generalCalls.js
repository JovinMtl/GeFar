
import { ref } from 'vue'
import { defineStore } from 'pinia'


export const usegeneralCalls = defineStore('generalCalls', ()=>{
    const dispo = ref(false)
    const compile = ref(false)


    const getDispo = ()=>{
        return dispo.value
    }
    const getCompile = ()=>{
        return dispo.value
    }
    
    const setDispo = (val=true)=>{
        dispo.value = val;
        console.log("Setting dispo to :" + dispo.value)
    }
    const setCompile = (val=true)=>{
        compile.value = val;
    }


    return {
        getDispo, getCompile,
        setDispo,setCompile
    }
})

