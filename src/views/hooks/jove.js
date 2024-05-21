
import { ref } from 'vue'
export default function useCloseApprov(){
    const approvStatus = ref(false)

    const closeApprov = ()=>{
        approvStatus.value = false
    }

    return closeApprov
}