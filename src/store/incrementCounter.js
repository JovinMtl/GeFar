
import { ref } from 'vue'
import { defineStore } from 'pinia'


export const useCounter = defineStore('counter', ()=>{
    const counter = ref(0);


    const getCounter = ()=>{
        return counter.value;
    }
    const incrementCounter = ()=>{
        counter.value += 1;
    }

    return {
        getCounter, incrementCounter
    }
})

