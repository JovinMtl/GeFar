<template>
    <div style="width: 80%; 
                display: flex; justify-content: center;align-items: center;">
                <div style="height: max-content;">
                    <h3 style="text-align: center;">Vous voulez changer le mot de passe ?</h3>
                    <!-- <input placeholder="Ancien mot de passe"/> -->
                    <input placeholder="nouveau mot de passe" type="password"/>
                    <input placeholder="Retapez le mot de passe" type="password" />
                    <input type="submit" value="Confirmer"/>

                </div>
        
    </div>
</template>
<style scoped>
input{
    padding: 15px;
    margin: 10px;
    text-align: center;
    border-radius: 12px;
    background-color: black;
}
</style>