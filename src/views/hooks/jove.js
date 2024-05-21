
import { ref } from 'vue'
export default {
    setup(){
        const approvStatus = ref(false)

        const closeApprov = ()=>{
            approvStatus.value = false
        }

        return {
            closeApprov
        }
    }
}