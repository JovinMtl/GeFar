<template>
    <ion-page>
        <ion-content>
            <div class="LogContainer" id="authe">
                ICi authentification
                <div class="authentif">
                    <div class="username">
                        <label for="input">Username</label> <br>
                        <input v-model="username" type="text" style="padding: 15px 30px; 
                            border-radius: 15px;border-style: hidden;
                            background-color: rgb(28, 35, 49);">
                    </div>
                    <div class="username">
                        <label for="input">Password</label> <br>
                        <input v-model="password" type="password" style="padding: 15px 30px; 
                            border-radius: 15px; border-spacing: 5px; 
                            border-style: hidden; background-color: rgb(28, 35, 49);">
                    </div>
                    <div class="confirmationContainer">
                        <!-- <div class="one" style="border-right: 1px solid black;">s'inscrire</div>
                        <div class="one">se connecter</div> -->
                        <!-- se connecter -->
                    </div>
                    <div @click="login_hook" class="enter">
                        <div class="btn">se connecter</div>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { 
    IonContent, IonPage
} from '@ionic/vue';
// import { useStore } from 'vuex'
import { useUserStore } from '../../store/user.js'
import { baseURL } from '../../store/host'
import axios from 'axios'

const store = useUserStore()
const {getUsername,getAccessToken,getRefreshToken,
    setUsername,setAccessToken, setRefreshToken} = store
const router = useRouter()
const username = ref(null)
const password = ref(null)

let logs = ''


const axiosInstance = axios.create({
  baseURL: '//127.0.0.1:8002', // Base URL for your API
  headers: {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN' // Add your authorization token here
  }
});

const login_hook = ()=>{
    const base = '//127.0.0.1:8002'
    const prefix = "api/login/"

    axios.post(`${baseURL}/${prefix}`,{"username": username.value,
        "password":password.value}
       ).then((response) => {
        setUsername(username.value)
        setAccessToken(response.data.access)
        setRefreshToken(response.data.refresh)
        localStorage.setItem('username', username.value)
        localStorage.setItem('accessToken', response.data.access)
        localStorage.setItem('refreshToken', response.data.refresh)
        // hide_authe()
        router.push('/home')
       }).catch((error) => {
         logs = error.response.data
       })
}
// const hide_authe = ()=>{
//     const container = document.getElementById('authe')
//     container.style.display = 'none'
// }

// watch(data, (value)=>{
//     console.log("The LOGIN component got: ", value)
// })
</script>
<style scoped lang="scss">
@media screen and (max-width: 400px) {
    .LogContainer{
        background-color: white;
    }
}
@media screen and (min-width: 800px) {
    .LogContainer{
        display: flex;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 255, 0, 0.692);
        // background-color: rgba(128, 128, 128, 0.397);
        position: relative;
        justify-content: center;
        align-items: center;

        .authentif{
            width: 30%;
            height: 90%;
            background-color: black;
            position: absolute;
            border-radius: 15px;
            box-shadow: 0 0 45px black;
            text-align: center;
            align-content: center;
            // z-index: -5;

            .username{
                margin: 10px 50px;
            }
            .confirmationContainer{
                display: flex;
                width: 100%;
                height: 40px;
                background: white;
                color: black;
                justify-content: center;
                align-items: center;

                &:hover{
                    font-weight: 800;
                }
                .one{
                    width: 50%;
                    height: 100%;
                    align-content: center;

                    &:hover{
                        // background: rgba(0, 255, 0, 0.692);
                        font-weight: 800;
                    }
                }
            }
            .enter{
                display: flex;
                width: 100%;
                height: 40px;
                margin-top: 30px;
                justify-content: center;

                .btn{
                    display: flex;
                    width: 50%;
                    height: 100%;
                    border-radius: 15px;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    box-shadow: 0 0 5px white;
                    align-content: center;
                    background: linear-gradient(to right,black,rgb(99, 97, 97), white, gray);
                    background-clip: text;
                    -webkit-text-fill-color: transparent;

                    &:active{
                        background: rgba(255, 255, 255, 0.13);
                        
                    }
                    &:hover{
                        font-weight: 700;
                        transform: rotateX(15deg);
                    }

                }
            }
        }
    }
}
</style>