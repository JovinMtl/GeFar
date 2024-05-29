

export default function useKuvoma(){
    return kuvomaImiti
}

const kuvomaImiti = async () => {
    const base = '//127.0.0.1:8002'
    const prefix = 'api/out/dispo/'

    try {
        const response = await fetch(`${base}/${prefix}`)
        
        if (response.ok){
            let data = await response.json()
            return data
            // console.log("ImitiSet has lenght: ", data.value.length)
        }
    } catch (value){
        console.log("somehting may not be well because :", value)
    }
}