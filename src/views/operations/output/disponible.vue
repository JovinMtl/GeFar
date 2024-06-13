<template>
    <div class="dispoContainer">
        <div class="dispoHeader">
           <span style="font-weight: 600">DAWA - PHARMA : RAPPORT</span>  <br>
           <span style="color: gray;"><u>Disponible du 01 au 15 Juin.</u> </span> 
        </div>
        <div class="dispoBody"></div>
        <div class="dispoFooter"></div>
    </div>
</template>
<script setup lang="ts">
// Date_debut & date_fin should be given through props
</script>
<style scoped lang="scss">

@media only print {
    @page{
        size: A4;
    }
    .dispoContainer{
        background: gray;
        width: 100%;
        height: 100%;
        padding: 10px;
        color: black;

        .dispoHeader{
            width: 100%;
            height: 8%;
            background-color: white;
            text-align: center;
            align-content: center;
            font-size: 1.375rem;
            font-family: monospace;
        }
    }
}
</style>
