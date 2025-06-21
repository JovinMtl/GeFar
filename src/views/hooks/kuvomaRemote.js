import { ref, toValue } from "vue";
import { baseURL, remoteURL } from "@/store/host";
import { useUserStore } from "../../store/user";
import { useNotif } from "../../store/useNotif"
import { useError500 } from '../../store/generalErrors'

// const { getAccessToken } = useUserStore()
const isAdmin = ref(false);




async function refreshTokenRemote(){
    const { getRefreshToken, setAccessToken } = useUserStore();
    // console.log("Using RefreshToken: " + getRefreshToken())
    const prefix = 'api/refresh/'

    try{
        let newToken = ''
        const response = await fetch(`${baseURL}/${prefix}`,{
            method: "POST",
            headers: {
                "Content-type": "application/json",
                // Authorization: "Bearer " + getRefreshToken(),
            },
            body: JSON.stringify({
                'refresh': getRefreshToken()
            })
        });
        newToken = await response.json()
        if (response.ok){
            // console.log("The new access Token: " + newToken.access)
            setAccessToken(newToken.access)
            console.log("Refresh done successfully.")
        } else{
            console.warn("No new access token: " + newToken)
        }
    }catch(e){
        console.warn(e)
    }
    return 0
}


export function useKuvomaRemote(prefix, remote = "") {
    const data = ref(null);
    const { getAccessToken } = useUserStore();

    const kuvomaImiti = async (val='', val2='', isFilter=false) => {
        if (!getAccessToken()){
            return 0
        }
        // const base = '//127.0.0.1:8002'
        try {
            let response = "";
            const url = `${remoteURL}/${prefix}` 
            if (toValue(isFilter)){
                const params = new URLSearchParams({
                    'date_debut': toValue(val),
                    'date_fin' : toValue(val2)
                })
                url = `${url}?${params.toString()}`
                console.log("the Param: " + toValue(val) + ' and ' + toValue(val2))
            }
            response = await fetch(`${url}`, {
                headers: {
                    Authorization: "Bearer " + getAccessToken(),
                },
            });

            if (response.ok) {
                data.value = await response.json();
            }  else{
                // console.log("The response is not OK")
                refreshToken()
                let secondData = kuvomaImiti()
                // console.log("The returned secondData: " + secondData[0])
                data.value = secondData
            }
        } catch (value) {
            console.log("somehting may not be well because :", value);
        }
    };

    return [data, kuvomaImiti];
}

