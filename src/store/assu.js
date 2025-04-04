import { reactive } from 'vue'
import { defineStore } from 'pinia'


export const useAssuStore = defineStore('assu',()=>{
    const assurances = reactive({})


    const getObjAssurances = ()=>{
        return assurances
    }
    const getOneAssurance = (id)=>{
        return assurances[id]
    }
    const setAssurance = (id, value)=>{
        assurances[id] = value
    }

    return {
        getObjAssurances, setAssurance,
        getOneAssurance
    }
})

