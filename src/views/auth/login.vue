<template>
    <div class="LogContainer">
        ICi authentification
        <div class="authentif">
            <div class="username">
                <label for="input">Username</label> <br>
                <input type="text" style="padding: 15px 30px; border-radius: 15px;border-style: hidden;">
            </div>
            <div class="username">
                <label for="input">Password</label> <br>
                <input type="password" style="padding: 15px 30px; 
                    border-radius: 15px; border-spacing: 5px; 
                    border-style: hidden; background-color: rgb(28, 35, 49);">
            </div>
            <div class="confirmationContainer">
                <div class="one" style="border-right: 1px solid black;">s'inscrire</div>
                <div class="one">se connecter</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts"></script>
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

            .username{
                margin: 10px 50px;
            }
            .confirmationContainer{
                display: flex;
                width: 100%;
                height: 40px;
                background: white;
                color: black;

                .one{
                    width: 50%;
                    height: 100%;
                    align-content: center;
                }
            }
        }
    }
}
</style>