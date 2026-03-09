
<template>
    <div>
        <p class="c-b-1">
            <!-- Cette fonctionnalité sera bientôt disponible. —grow -->
            1 {{ props.oldUnit }} = <span class="c-b"> {{ newUnitValue ? newUnitValue:'??'}} </span> {{ props.newUnit + `${newUnitValue>1 ? 's':''}` }} 
        </p>
        <input v-model="newUnitValue"
            @focus="removePlaceHolder" @blur="addPlaceHolder" type="number" class="inp-med-unit" placeholder="??"/>
        <div>
            <button class="btn bg-b-1 mv-10">Ok</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'


//states
const props = defineProps(['oldUnit', 'newUnit'])
const newUnitValue = ref(null)

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