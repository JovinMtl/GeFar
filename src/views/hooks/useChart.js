// This module is designed to consume data for Chart purpose

import { ref } from "vue";
import { baseURL } from "@/store/host";
import { useUserStore } from "../../store/user";

const data = ref(null) 

export function useChart(prefix='', command=null){
    const { getAccessToken } = useUserStore();

    const askData = async (prefix)=>{
        let response = ''
        try{
            response = await fetch(`${baseURL}/${prefix}`, {
                headers: {
                    Authorization: "Bearer " + getAccessToken(),
                },
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