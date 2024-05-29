
import { ref } from 'vue'
const data = ref(null)

export default function useKuvoma(){
    kuvomaImiti()
    console.log("useKuvoma got: ", data.value)
    return data.value
}

const kuvomaImiti = async () => {
    const base = '//127.0.0.1:8002'
    const prefix = 'api/out/dispo/'

    try {
        const response = await fetch(`${base}/${prefix}`)
        
        if (response.ok){
            data.value = await response.json()
            // console.log("ImitiSet has lenght: ", data.value)
        }
    } catch (value){
        console.log("somehting may not be well because :", value)
    }
}