<template>
    <div style="width: 80%; 
                display: flex; justify-content: center;align-items: center;">
                <div style="height: max-content;">
                    <h3 style="text-align: center;">Vous voulez changer le mot de passe ?</h3>
                    <!-- <input placeholder="Ancien mot de passe"/> -->
                    <input class="bg-b-1" placeholder="nouveau mot de passe" type="password" v-model="pwd1"/>
                    <input class="bg-b-1" placeholder="Retapez le mot de passe" type="password" v-model="pwd2"/>
                    <input class="c-b" type="submit" @click="checkPwd" :class="[pwdMatch == false ? 'bg-r':'',pwdMatch ? 'bg-a':'', responseState==403 ? 'bg-r':'', responseState==200 ? 'bg-g-1':'' ]" value="Confirmer"/>
                    <span class="t-m-skin sm-l">
                        <span v-show="responseState==1">En cours...</span>
                        <span v-show="responseState==200" class="c-g">Ok</span>
                        <span v-show="responseState==403" class="c-r">No</span>  
                    </span>
                </div>
        
    </div>
</template>

<script setup lang="ts">
import { reactive ,ref, toValue, watch } from 'vue'
import type { Ref } from 'vue'
import { useKurungika } from '../../hooks/kuvoma';

const pwd1: Ref<string> = ref('');
const pwd2: Ref<string> = ref('');
const passwords = reactive({
    'pwd1': pwd1,
    'pwd2': pwd2
})
const pwdMatch: Ref<boolean | any> = ref(null);
const responseState: Ref<number> = ref(0)

const changePasswUrl = 'api/gOps/changePasswd/'
const [responsePwd, changePasswd] = useKurungika(passwords, changePasswUrl)

const checkPwd = ()=>{
    responseState.value = 1;
    let c1_1 = String(toValue(pwd1)).length > 7;
    let c1_2 = String(toValue(pwd1)).length > 7;
    let c1_3 = (toValue(pwd1) == toValue(pwd2))
    let allConditionsMatch = c1_1 && c1_2 && c1_3
    
    if (allConditionsMatch){
        pwdMatch.value = true;
        changePasswd()
    } else{
        pwdMatch.value = false;
        responseState.value = 403;
        return 0
    }

}

// Watchers
watch(responsePwd, (value)=>{
    if(value.response == 200){
        responseState.value = 200;
    }else if (value.response == 403){
        responseState.value = 403;
    }
})
</script>

<style scoped>
input{
    padding: 15px;
    margin: 10px;
    text-align: center;
    border-radius: 12px;
    /* background-color: black; */
}
</style>