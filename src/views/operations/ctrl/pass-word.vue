<template>
    <div style="width: 80%; 
                display: flex; justify-content: center;align-items: center;">
                <div style="height: max-content;">
                    <h3 style="text-align: center;">Vous voulez changer le mot de passe ?</h3>
                    <!-- <input placeholder="Ancien mot de passe"/> -->
                    <input class="bg-b-1" placeholder="nouveau mot de passe" type="password" v-model="pwd1"/>
                    <input class="bg-b-1" placeholder="Retapez le mot de passe" type="password" v-model="pwd2"/>
                    <input class="c-b" type="submit" @click="checkPwd" :class="[pwdMatch == false ? 'bg-r':'',pwdMatch ? 'bg-g-1':'']" value="Confirmer"/>

                </div>
        
    </div>
</template>

<script setup lang="ts">
import { reactive ,ref, toValue } from 'vue'
import type { Ref } from 'vue'
import { useKurungika } from '../../hooks/kuvoma';

const pwd1: Ref<string> = ref('');
const pwd2: Ref<string> = ref('');
const passwords = reactive({
    'pwd1': pwd1,
    'pwd2': pwd2
})
const pwdMatch: Ref<boolean | any> = ref(null)

const changePasswUrl = 'api/gOps/changePasswd/'
const [responsePwd, changePasswd] = useKurungika(passwords, changePasswUrl)

const checkPwd = ()=>{
    let c1_1 = String(toValue(pwd1)).length == 8;
    let c1_2 = String(toValue(pwd1)).length == 8;
    let c1_3 = (toValue(pwd1) == toValue(pwd2))
    let allConditionsMatch = c1_1 && c1_2 && c1_3
    
    if (allConditionsMatch){
        pwdMatch.value = true;
        changePasswd()
    } else{
        pwdMatch.value = false;
        return 0
    }

}
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