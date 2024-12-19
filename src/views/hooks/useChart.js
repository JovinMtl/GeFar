// This module is designed to consume data for Chart purpose

import { ref } from "vue";
import { baseURL } from "@/store/host";
import { useUserStore } from "../../store/user";

const data = ref(null) 

export function useChart(prefix='', command=null){
    const { getAccessToken } = useUserStore();
    console.log("Sending: ", command)

    const askData = async (prefix, command)=>{
        console.log("f-Sending: ", command)
        let response = ''
        try{
            response = await fetch(`${baseURL}/${prefix}`, {
                method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        Authorization: "Bearer " + getAccessToken(),
                    },
                    body: JSON.stringify({
                        dates: command,
                    }),
            });
            if(response.ok){
                data.value = await response.json()
            }
        } catch(error){
            console.log("Failed because:", error)
        }
    }
    return [data, askData]
}