<template>
    <ion-page>
        <ion-content>
            <div class="LogContainer" id="authe">
                ICi authentification
                <div class="authentif">
                    <div class="username">
                        <label class="se" for="input">Nom d'Utilisateur</label> <br>
                        <input id="el1" v-model="username" class="loInp" 
                            type="text" autocomplete="off">
                    </div>
                    <div class="username">
                        <label class="se" for="input">Mot de Passe</label> <br>
                            <input id="el2" v-model="mPassword" 
                                class="loInp loInp2"  autocomplete="off"
                                @keyup="getPassword" type="text">
                    </div>
                    <div class="confirmationContainer" :class="wrongPassword ? 'bg-r':''">
                    </div>
                    <div @click="login_hook" class="enter">
                        <div class="btn">se connecter</div>
                    </div>
                    <div class="loFooter"> © {{ year }}, Pharmacie UBUZIMA</div>
                </div>
                
            </div>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
    IonContent, IonPage
} from '@ionic/vue';
// import { useStore } from 'vuex'
import { useUserStore } from '../../store/user.js'
// import { baseURL } from '../../store/host'
import { baseURL } from '@/store/host'
import axios from 'axios'

const store = useUserStore()
const { getUsername, getAccessToken, getRefreshToken,
    setUsername, setAccessToken, setRefreshToken } = store
const router = useRouter()
const username = ref(null)
// const password = ref(null)
// const oneChar = ref(null)
const maskedPassword = []
const wrongPassword = ref(false)


const truePassword = []
const mPassword = ref<string>('')
const tPassword = ref<string>('')

const year = (String(new Date())).slice(10, 15)

const getPassword = (e)=>{
    // truePassword.
    let k = String(e.key)
    if (k == 'Backspace'){
        truePassword.pop()
        maskedPassword.pop()
    } else if (k.length == 1){
        truePassword.push(k)
        maskedPassword.push('•')
    }
    setTimeout(()=>{
        mPassword.value = maskedPassword.join('')
        tPassword.value = truePassword.join('')
    }, 30)
}

let logs = ''

const axiosInstance = axios.create({
    baseURL: '//127.0.0.1:8002', // Base URL for your API
    headers: {
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN' // Add your authorization token here
    }
});

const login_hook = () => {
    const base = '//127.0.0.1:8002'
    const prefix = "api/login/"

    axios.post(`${baseURL}/${prefix}`, {
        "username": username.value,
        "password": tPassword.value
    }
    ).then((response) => {
        wrongPassword.value = false;
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
        wrongPassword.value = true;
    })
}

</script>
<style scoped lang="scss">

    .LogContainer {
        display: flex;
        width: 100%;
        height: 100%;
        background-color: rgba(59, 192, 59, 0.69);
        position: relative;
        justify-content: center;
        align-items: center;

        .authentif {
            // width: 30%;
            height: 90%;
            background-color: black;
            position: absolute;
            border-radius: 15px;
            box-shadow: 0 0 45px black;
            text-align: center;
            align-content: center;
            // z-index: -5;

            .username {
                margin: 10px 50px;
                color: white;

                .inpEl {
                    // padding: 15px 30px;
                    padding: 0.5rem 1rem;
                    border-radius: 15px;
                    border-spacing: 5px;
                    border-style: hidden;
                    background-color: rgb(28, 35, 49);
                    background-color: grey;
                    font-size: 1.2rem;
                }

                .bg-l {
                    color: lime;
                }
            }

            .confirmationContainer {
                

                &:hover {
                    font-weight: 800;
                }

                .one {
                    width: 50%;
                    height: 100%;
                    align-content: center;

                    &:hover {
                        // background: rgba(0, 255, 0, 0.692);
                        font-weight: 800;
                    }
                }
            }

            .enter {
                display: flex;
                width: 100%;
                height: 40px;
                margin-top: 30px;
                justify-content: center;

                .btn {
                    display: flex;
                    width: 50%;
                    height: 100%;
                    border-radius: 15px;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    box-shadow: 0 0 5px white;
                    align-content: center;
                    background: linear-gradient(to right, black, rgb(99, 97, 97), white, gray);
                    background-clip: text;
                    -webkit-text-fill-color: transparent;

                    &:active {
                        background: rgba(255, 255, 255, 0.13);

                    }

                    &:hover {
                        font-weight: 700;
                        transform: rotateX(15deg);
                    }

                }
            }
        }
    }
</style>