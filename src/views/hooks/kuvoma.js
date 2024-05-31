
import { ref, watch } from 'vue'


export function useKuvoma(){
    const data = ref(null)

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

    console.log("useKuvoma got: ", data.value)
    return [data, kuvomaImiti]
    
}

export function useSearchUmuti(imiti_for_search, value, field){
        // return imiti_for_search.filter((element)=>{
        //     return element[field].toLowerCase().match((value).toLowerCase())
        // })
        return value
}