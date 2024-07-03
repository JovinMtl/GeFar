
import { ref } from 'vue'
import { defineStore } from 'pinia'


export const useUserStore = defineStore('user', ()=>{
    const username = ref('')
    const accessToken = ref('')
    const refreshToken = ref('')

    const setUsername = (value)=>{
        username.value = value
    }
    const setAccessToken = (value)=>{
        accessToken.value = value
    }
    const setRefreshToken = (value)=>{
        refreshToken.value = value
    }

    return {
        username, accessToken, refreshToken,
        setUsername, setAccessToken, setRefreshToken
    }
})