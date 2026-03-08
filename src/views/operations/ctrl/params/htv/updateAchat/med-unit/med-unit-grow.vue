
<template>
    <div>
        <p class="c-b-1">
            Cette fonctionnalité sera bientôt disponible. —grow
        </p>
        <input @focus="removePlaceHolder" @blur="addPlaceHolder" type="number" class="inp-med-unit" placeholder="??"/>
        <div>
            <button class="btn bg-b-1">Ok</button>
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps(['oldUnit'])

function addPlaceHolder(e){
    e.target.placeholder = "??"
}
function removePlaceHolder(e){
    e.target.placeholder = ""
}

</script>
<style scoped>
.inp-med-unit{
    width: 6rem;
    text-align: center;
    background-color: #5eef3c;
    border: 1px solid transparent;
    box-shadow: 0 0 7px black;
}
.inp-med-unit::placeholder{
    color: black;
}
</style>