
import { ref } from 'vue'
import { defineStore } from 'pinia'


export const useUserStore = defineStore('user', ()=>{
    const username = ref('')
    const accessToken = ref('')
    const refreshToken = ref('')

    const saveUsername = (value)=>{
        username.value = value
    }
    const saveAccessToken = (value)=>{
        accessToken.value = value
    }
    const saveRefreshToken = (value)=>{
        refreshToken.value = value
    }
    
    return {
        username, accessToken, refreshToken,
        saveUsername, saveAccessToken, saveRefreshToken
    }
})