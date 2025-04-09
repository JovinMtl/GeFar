
import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'


export const useNotif = defineStore('notif', ()=>{
    const stateOperations = reactive({
        'enCours': false,
        'completed': false
    })


    const getStateOperations = ()=>{
        return stateOperations
    }
    const setOperationTrue = ()=>{
        stateOperations.completed = true;
    }
    const setOperationFalse = ()=>{
        stateOperations.completed = false;
    }
    const setOperationEncoursTrue = ()=>{
        stateOperations.enCours = true;
    }
    const setOperationEncoursFalse = ()=>{
        stateOperations.enCours = false;
    }


    return {
        getStateOperations,
        setOperationTrue, setOperationFalse,
        setOperationEncoursTrue, setOperationEncoursFalse,
    }
})

