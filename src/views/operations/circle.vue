<template>
    <div class="mainContainerCircle">
        <!-- Here are circle -->
         <div class="item1"></div>
         <div class="item1"></div>
         <div class="item1"></div>
         <div class="item1"></div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.mainContainerCircle{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    background: #333;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    grid-auto-rows: 20px;
    justify-content: center;
    align-content: center;
}
.item1{
    background-color: aqua;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 15px;
}
</style>