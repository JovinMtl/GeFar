
import { ref } from 'vue'
import { defineStore } from 'pinia'


export const useInfos = defineStore('infos', ()=>{
    const address = ref('')


    const getAddress = ()=>{
        return address.value
    }
    const setAddress = (street='13Av, Twiny', 
            quarter="Kamenge", commune='Ntahangwa', 
            province='Bujumbura')=>{
        address.value = `${String(street).slice(0, 10)}, ${String(quarter).slice(0, 5)}, ${String(commune).slice(0, 5)}, ${String(province).slice(0, 5)}`;
    }


    return {
        getAddress,
        setAddress, 
    }
})

