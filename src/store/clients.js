import { reactive } from 'vue'
import { defineStore } from 'pinia'


export const useAssuStore = defineStore('client',()=>{
    const clients = reactive({})


    const getObjclients = ()=>{
        return clients
    }
    const getOneclient = (id)=>{
        return clients[id]
    }
    const setclient = (id, value)=>{
        clients[id] = value
    }

    return {
        getObjclients, setclient,
        getOneclient
    }
})

