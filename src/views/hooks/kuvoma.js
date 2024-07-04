
import { ref, watch } from 'vue'
import { baseURL } from '../../store/host'
import { useUserStore} from '../../store/user'

// const { getAccessToken } = useUserStore()
const isAdmin = ref(false)


export function useKuvoma(prefix){
    const data = ref(null)
    const { getAccessToken } = useUserStore()

    const kuvomaImiti = async () => {
        // const base = '//127.0.0.1:8002'
        try {
            const response = await fetch(`${baseURL}/${prefix}`,{
                headers: {
                    Authorization: 'Bearer ' + getAccessToken()
                }
            })
            
            if (response.ok){
                data.value = await response.json()
            }
        } catch (value){
            console.log("somehting may not be well because :", value)
        }
    }

    console.log("useKuvoma got: ", data.value)
    return [data, kuvomaImiti]
    
}

export function useSearchUmuti(imiti_for_search, value, field){
        return imiti_for_search.filter((element)=>{
            return (String(element[field])).toLowerCase().match((value).toLowerCase())
        })
}

export function useFilterRange(imiti_for_search, dateDebut, dateFin){
    if(!dateFin){ // handling the case dateFin was not given
        return imiti_for_search.filter((element)=>{
            return (element.date_last_vente > dateDebut)
        })
    } else {
        return imiti_for_search.filter((element)=>{
            return ((element.date_last_vente > dateDebut) && (element.date_last_vente < dateFin))
        })
    }
    
}

export function useKurungika(imitiArray, prefix,
     otherData1=null, otherData2=null){
    const data = ref(null)
    // return prefix
    if(!(otherData1 && otherData2)){
        const kurungikaImiti = async () => {
            // const base = '//muteule.pythonanywhere.com'
            console.log("prefix dukorerako: ", prefix)
    
            try {
                const response = await fetch(`${baseURL}/${prefix}`,{
                    method: 'POST',
                    headers:{
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        'imiti': imitiArray.value
                    })
                    
                })
                
                if (response.ok){
                    data.value = await response.json()
                }
            } catch (value){
                console.log("somehting may not be well because :", value)
            }
        }
        return [data, kurungikaImiti]
    } else{
        return "not really"
    }
}

export async function useNoteUmuti(value){
    // send that value to the url endpoint, it is the latter to decide
    // wether to keep it or not.
    // This will serve in noting a new umuti that needs to be purchased.

    const data = ref(null)
    // const base = '//muteule.pythonanywhere.com'
    const prefix = 'api/in/requested/'
    console.log("Using umuti_new as: ", value)

    try {
        const response = await fetch(`${baseURL}/${prefix}`,{
            method: 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                'umuti': value
            })
            
        })
        
        if (response.ok){
            data.value = await response.json()
        }
    } catch (error){
        console.log("somehting may not be well because :", error)
    }

    return data
}


export async function useLogin(username, password){
    const data = ref(null)
    const prefix = "api/login/"

    axios.post(`${baseURL}/${prefix}`,{"username": username,
        "password":password}
       ).then((response) => {
        //  store.state.user = response.data
         console.log("the data: ", response.data)
       }).catch((error) => {
         let logs = error.response.data
       })
    
    // return 'ok's
}

export function useAskPriviledge(){
    // const isAdmin = ref(false)
    const { getAccessToken } = useUserStore()

    const askPriviledge = async () => {
        const prefix = 'api/rep/isAdmin/'
        try {
            const response = await fetch(`${baseURL}/${prefix}`,{
                headers: {
                    Authorization: 'Bearer ' + getAccessToken()
                }
            })
            
            if (response.ok){
                let data = await response.json()
                if(data.isAdmin){
                    isAdmin.value = true
                } else{
                    isAdmin.value = false
                }
            }
        } catch (value){
            console.log("somehting may not be well because :", value)
        }
    }
    return [ isAdmin, askPriviledge ]
}