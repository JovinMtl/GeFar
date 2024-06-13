<template>
    <div class="dispoContainer">
        Here we print disponible data
        <div class="dispoHeader"></div>
        <div class="dispoBody"></div>
        <div class="dispoFooter"></div>
    </div>
</template>
<script setup lang="ts">
</script>
<style scoped lang="scss">

@media only print {
    .dispoContainer{
        background: gray;
        width: 100%;
        height: 100%;
    }
}
</style>
