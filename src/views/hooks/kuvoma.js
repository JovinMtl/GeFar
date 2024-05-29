


const kuvomaImiti = async () => {
    const base = '//127.0.0.1:8002'
    const prefix = 'api/out/dispo/'

    try {
        const response = await fetch(`${base}/${prefix}`)
        
        if (response.ok){
            data.value = await response.json()
            console.log("THings are well received", data.value)
            updateImitiSet()
            update_imiti_for_search()
            // console.log("ImitiSet has lenght: ", data.value.length)
        }
    } catch (value){
        console.log("somehting may not be well because :", value)
    }
}
kuvomaImiti ()