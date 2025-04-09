import { ref, toValue } from "vue";
import { baseURL } from "@/store/host";
import { useUserStore } from "../../store/user";
import { useNotif } from "../../store/useNotif"
import { useError500 } from '../../store/errors'

// const { getAccessToken } = useUserStore()
const isAdmin = ref(false);


async function refreshToken(){
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

export function useKuvoma(prefix, remote = "") {
    const data = ref(null);
    const { getAccessToken } = useUserStore();

    const kuvomaImiti = async (val='', val2='', isFilter=false) => {
        if (!getAccessToken()){
            return 0
        }
        // const base = '//127.0.0.1:8002'
        try {
            let response = "";
            let url = null;
            if (!remote) {
                url = `${baseURL}/${prefix}`
            } else {
                url = `${remote}/${prefix}`
            }
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

export function useSearchUmuti(imiti_for_search, value, field) {
    return imiti_for_search.filter((element) => {
        return String(element[field]).toLowerCase().match(value.toLowerCase());
    });
}

export function useFilterRange(imiti_for_search, dateDebut, dateFin) {
    if (!dateFin) {
        // handling the case dateFin was not given
        return imiti_for_search.filter((element) => {
            return element.date_last_vente > dateDebut;
        });
    } else {
        return imiti_for_search.filter((element) => {
            return (
                element.date_last_vente > dateDebut &&
                element.date_last_vente < dateFin
            );
        });
    }
}

export function useKurungika(
    imitiArray,
    prefix,
    shouldNotify=false,
    otherData1 = null,
) {
    let shouldRefresh = false
    const { setOperationTrue,
        setOperationEncoursTrue,
        setOperationEncoursFalse,
     } = useNotif()
    const { setError500True, getError500 } = useError500()
    do{
        if (shouldRefresh){
            console.log("Refreshing once again ...")
        }
        const data = ref(null);
        const isError = ref(false)
        const error_message = ref(null)
        const { getAccessToken } = useUserStore();
        // console.log("Attempting to send:", imitiArray)
        // return prefix
        if (!(otherData1 && otherData2)) {
            const kurungikaImiti = async () => {
                if (!getAccessToken()){
                    return 0
                }
                if (shouldNotify){
                    setOperationEncoursTrue
                } else{
                    setOperationEncoursFalse
                }
                // const base = '//muteule.pythonanywhere.com'

                try {
                    const response = await fetch(`${baseURL}/${prefix}`, {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json",
                            Authorization: "Bearer " + getAccessToken(),
                        },
                        body: JSON.stringify({
                            imiti: imitiArray,
                        }),
                    });
                    data.value = await response.json();
                    if((response.ok) && shouldNotify){
                        setOperationTrue()
                        console.log("THe response is OK")
                    } else{
                        console.log("The response is not OK")
                        refreshToken()
                        let secondData = kurungikaImiti()
                        console.log("The returned secondData: " + secondData[0])
                        data.value = secondData
                    }
                } catch (error) {
                    console.log("Calling 1: setError500True, with state: ", getError500)
                    setError500True(error);
                    isError.value =true
                    error_message.value = error
                    console.log("something has not be well because :", error);
                    console.log("3. Finished Calling setError500True, with state: ", getError500)
                }
            };
            if(isError.value){
                return [error_message, kurungikaImiti]
            } else{
                return [data, kurungikaImiti];
            }

        } else {
            return "not really";
        }
    }while(shouldRefresh)
}

export function usePostRequest(
    otherData1 = null,
    otherData2 = null,
) {
    const data = ref(null);
    const isError = ref(false)
    const error_message = ref(null)
    const { getAccessToken } = useUserStore();
    // console.log("Attempting to send:", imitiArray)
    // return prefix
    if (!(otherData1 && otherData2)) {
        const kurungikaImiti = async (
            imitiArray,
            prefix,) => {
            // const base = '//muteule.pythonanywhere.com'

            try {
                const response = await fetch(`${baseURL}/${prefix}`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        Authorization: "Bearer " + getAccessToken(),
                    },
                    body: JSON.stringify({
                        imiti: imitiArray,
                    }),
                });
                data.value = await response.json();
            } catch (error) {
                isError.value =true
                error_message.value = error
                console.log("something has not be well because :", error);
            }
        };
        if(isError.value){
            return [error_message, kurungikaImiti]
        } else{
            return [data, kurungikaImiti];
        }

    } else {
        return "not really";
    }
}


export async function useNoteUmuti(value) {
    // send that value to the url endpoint, it is the latter to decide
    // wether to keep it or not.
    // This will serve in noting a new umuti that needs to be purchased.

    const data = ref(null);
    // const base = '//muteule.pythonanywhere.com'
    const prefix = "api/in/requested/";

    try {
        const response = await fetch(`${baseURL}/${prefix}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                umuti: value,
            }),
        });

        if (response.ok) {
            data.value = await response.json();
        }
    } catch (error) {
        console.log("somehting may not be well because :", error);
    }

    return data;
}

export async function useLogin(username, password) {
    const data = ref(null);
    const prefix = "api/login/";

    axios
        .post(`${baseURL}/${prefix}`, {
            username: username,
            password: password,
        })
        .then((response) => {
            //  store.state.user = response.data
            // console.log("the data: ", response.data);
        })
        .catch((error) => {
            let logs = error.response.data;
        });

    // return 'ok's
}

export function useAskPriviledge() {
    // const isAdmin = ref(false)
    const { getAccessToken } = useUserStore();

    const askPriviledge = async () => {
        const prefix = "api/rep/isAdmin/";
        try {
            const response = await fetch(`${baseURL}/${prefix}`, {
                headers: {
                    Authorization: "Bearer " + getAccessToken(),
                },
            });

            if (response.ok) {
                let data = await response.json();
                if (data.isAdmin) {
                    isAdmin.value = true;
                } else {
                    isAdmin.value = false;
                }
            }
        } catch (value) {
            console.log("somehting may not be well because :", value);
        }
    };
    return [isAdmin, askPriviledge];
}

export function useAddAssu(){}