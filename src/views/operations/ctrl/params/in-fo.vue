<template>
    <div class="info-class">
        <table>
            <caption> <h4>Votre visibilité sur le réseau</h4>
                </caption>
            <thead>
                <tr>
                    <td>
                        <label for="">
                            Nom
                        </label>
                        <input type="text" 
                            placeholder="Nom de la Pharmacie"
                            v-model="data.name_pharma"/>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <label for="">
                            Tél
                        </label>
                        <input type="text" placeholder="Contact" v-model="data.tel"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="">
                            Avenue
                        </label>
                        <input type="text" 
                            placeholder="description courte (5 lettres)"
                            v-model="data.loc_street"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="">
                            Quartier
                        </label>
                        <input type="text" placeholder="_"
                            v-model="data.loc_quarter"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="">
                            Commune
                        </label>
                        <input type="text" placeholder="_"
                            v-model="data.loc_commune"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="">
                            Province
                        </label>
                        <input type="text" placeholder="_"
                            v-model="data.loc_Province"/>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td>
                        <label for="">
                            Mot de passe
                        </label>
                        <input type="password" placeholder="_"
                            v-model="data.remote_password"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="">
                            Mot de passe
                        </label>
                        <input type="password" placeholder="_"
                            v-model="data.remote_password2"/>
                    </td>
                </tr>
            </tfoot>
        </table>
       
    </div>
    <div> 
        <button
            class="clk"
            :class="isLoggedIn ? '':'bg-r'"
            @click="callToUpdateRemote">
            <span v-if="isLoggedIn">Confirmer</span>
            <span v-else>Veuillez assurer la connexion</span>
            
        </button>
    </div>
</template>
<script setup lang="ts">
import { reactive, ref, toValue, watch } from 'vue';
import { useKuvoma, useKurungikaRemote, useKurungika } from '../../../hooks/kuvoma';
// import { useKurungikaRemote } from '../../../hooks/kuvoma';
import { useUserStore } from '../../../../store/user';

const data = reactive({})
const { getAccessTokenRemote } = useUserStore()
const isLoggedIn = ref(false)

const url_request_info = "api/gOps2/request_infos/"
const [infos, requestInfo] = useKuvoma(url_request_info)


const url_update_info_remote = "api/in/update_infos/"
const [resp_update_remote, updateInfoRemote] = useKurungikaRemote(data, url_update_info_remote)

const url_update_info_local = "api/gOps2/update_infos/"
const [resp_update_local, updateInfoLocal] = useKurungika(data, url_update_info_local)

requestInfo()
if (String(getAccessTokenRemote()).length > 15){
        isLoggedIn.value = true;
    }

//Functions
const callToUpdateRemote = ()=>{
    if (toValue(isLoggedIn)){
        updateInfoRemote()
        console.log("Called updateInfoRemote")
    }
}

//watchers
watch(resp_update_remote, (value)=>{
    if(value?.code_pharma){
        data.code_pharma = value?.code_pharma
        updateInfoLocal()
    }else if (value?.updated==200){
        updateInfoLocal()
    }
})
watch(infos, (value)=>{
    data.name_pharma = value.response.name_pharma
    data.tel = value.response.tel
    data.loc_street = value.response.loc_street
    data.loc_quarter = value.response.loc_quarter
    data.loc_commune = value.response.loc_commune
    data.loc_Province = value.response.loc_Province
    data.remote_password = value.response.remote_password
    data.remote_password2 = value.response.remote_password
    data.code_pharma = value.response.code_pharma
    console.log("infos got: " + JSON.stringify(data.name_pharma))
})
</script>

<style scoped>
.info-class{
    display: flex;
    flex-direction: columns;
    justify-content: center;
    
    color: white;
}
table{
    text-align: right;
}
input{
    background-color: rgba(134, 252, 55, 0.911);
    margin: 3px 0;
}
button{
    position: relative;
    padding:  5px 10px;
    left: 5%;
    border-radius: 8px;
}
label{
    background: rgba(134, 252, 55, 0.911);
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    padding-left: 5px;
    font-size: 0.9rem;
}
.clk{
    transition: 800ms;
}
h4{
    text-align: right;
}
</style>