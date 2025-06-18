
import { ref } from 'vue'
import { defineStore } from 'pinia'


export const useUserStore = defineStore('user', ()=>{
    const username = ref('')
    const accessToken = ref('')
    const refreshToken = ref('')


    const accessTokenRemote = ref('')
    const refreshTokenRemote = ref('')


    const getUsername = ()=>{
        return username.value
    }
    const getAccessToken = ()=>{
        return accessToken.value
    }
    const getRefreshToken = ()=>{
        return refreshToken.value
    }
    const setUsername = (value)=>{
        username.value = value
    }
    const setAccessToken = (value)=>{
        accessToken.value = value
    }
    const setRefreshToken = (value)=>{
        refreshToken.value = value
    }

    const getAccessTokenRemote = ()=>{
        return accessTokenRemote.value
    }
    const getRefreshTokenRemote = ()=>{
        return refreshTokenRemote.value
    }
    const setAccessTokenRemote = (value)=>{
        accessTokenRemote.value = value
    }
    const setRefreshTokenRemote = (value)=>{
        refreshTokenRemote.value = value
    }

    return {
        getUsername, getAccessToken, getRefreshToken,
        setUsername, setAccessToken, setRefreshToken,

        getAccessTokenRemote, getRefreshTokenRemote,
        setAccessTokenRemote, setRefreshTokenRemote,
    }
})

