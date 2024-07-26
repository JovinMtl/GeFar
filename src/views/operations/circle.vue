<template>
    <div class="mainContainerCircle">
        <!-- Here are circle -->
         <div class="item black"></div>
         <div class="item yellow"></div>
         <div class="item violet"></div>
         <div class="item red"></div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.mainContainerCircle{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    /* background: #333; */
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    grid-auto-rows: 20px;
    justify-items: center;
}
.item{
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 15px;
}
.item:active{
    scale: 1.3;
}
.black{
    background-color: black;
}
</style>