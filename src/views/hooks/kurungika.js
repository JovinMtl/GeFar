import { ref } from 'vue'
import { baseURL } from '../../store/host'
import { useUserStore} from '../../store/user'

// const { getAccessToken } = useUserStore()
const isAdmin = ref(false)


export function useKurungika(prefix, bothData){
    // This will be sending the data to the server
    const data = ref(null)
    const { getAccessToken } = useUserStore()

    const kurungikaImiti = async () => {
        const url_remote = "https://muteule.pythonanywhere.com"
        try {
            let response = ''
            response = await fetch(`${baseURL}/${prefix}`,{
                method: POST,
                headers: {
                    Authorization: 'Bearer ' + getAccessToken()
                },
                body: JSON.stringify({
                    'data': bothData
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
}