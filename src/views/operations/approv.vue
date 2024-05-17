<template>
    <div>
        Ici on gere des approvisionnement
        <br> <br>
        <input class="inp" type="text" placeholder="Nom du medicament">
        <br><br>
        <input class="inp" @click="console.log('You clicked an input')" type="text" placeholder="Nom du medicament">
        <br>
    </div>
</template>

<style scoped>
.inp{
    color: white;
}
</style>