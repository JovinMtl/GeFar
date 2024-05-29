
const updateImitiSet = ()=>{
    imitiset.value = []
    // console.log("ImitiSet has lenght: ", data.value.length)
    let  i = 1
    data.value.forEach(element => {
        let obj:UmutiSet = {
            'code_umuti' : element.code_umuti,
            'id' : i,
            'name_umuti' : element.name_umuti,
            'description_umuti' : element.description_umuti,
            'date_last_vente' : new Date(element.date_last_vente),
            'price_in' : element.price_in,
            'price_out' : element.price_out,
            'difference' : element.difference,
            'qte_entrant_big' : element.qte_entrant_big,
            'quantite_restant' : element.quantite_restant,
            'ratio_type' : element.ratio_type,
            'type_in' : element.type_in,
            'type_out' : element.type_out,
            'type_umuti' : element.type_umuti,
            'location' : element.location,
            'lot' : element.lot
        }
        imitiset.value.push(obj)
        // console.log("voici: ", obj)
    });
    console.log("Compiled : ", imitiset.value)
}


const update_imiti_for_search = ()=>{
    imitiset.value.forEach(element => {
        let obj = {
            'code_umuti' : element.code_umuti,
            'date_last_vente' : element.date_last_vente,
            'description_umuti' : element.description_umuti,
            'location': element.location,
            'lot': element.lot,
            'name_umuti': (element.name_umuti),
            'price_in' : element.price_in,
            'price_out' : element.price_out,
            'qte_entrant_big' : element.qte_entrant_big,
            'quantite_restant': element.quantite_restant,
            'type_in': element.type_in,
            'type_out' : element.type_out
        }
        
        imiti_for_search.push(obj)
    });
}

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