<template>
    <div class="LogContainer">
        ICi authentification
        <div class="authentif"></div>
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
        background-color: black;
        background-color: rgba(0, 255, 0, 0.692);
        position: relative;
        justify-content: center;
        align-items: center;

        .authentif{
            width: 30%;
            height: 90%;
            background-color: white;
            position: absolute;
            border-radius: 15px;
            box-shadow: 0 0 45px black;
        }
    }
}
</style>