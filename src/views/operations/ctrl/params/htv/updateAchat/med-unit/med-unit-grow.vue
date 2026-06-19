
<template>
    <div>
        <p class="c-b-1">
            <!-- Cette fonctionnalité sera bientôt disponible. —grow -->
            1 {{ props.oldUnit }} = <span class="c-b"> {{ newUnitValue ? newUnitValue:'??'}} </span> {{ props.newUnit + `${newUnitValue>1 ? 's':''}` }} 
        </p>
        <input v-model="newUnitValue"
            @focus="removePlaceHolder" @blur="addPlaceHolder" type="number" class="inp-med-unit" placeholder="??"/>
        <div>
            <button @click="unitGrowFn" class="btn bg-b-1 mv-10" :class="[unitGrowResponse?.status==200 ? 'bg-b':'', unitGrowResponse?.status==403 ? 'bg-r':'']">Ok</button>
            <p v-show="unitGrowResponse?.status==403">{{ unitGrowResponse?.message }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, toValue, watch } from 'vue'
import { useKurungika } from '../../../../../../hooks/kuvoma'


//states
const props = defineProps(['umutiData', 'oldUnit', 'newUnit'])
const emit = defineEmits(['close'])
const newUnitValue = ref(null)
const data = reactive({
    'code_med': props.umutiData.code_med,
    'code_operation': props.umutiData.code_operation,
    'old_unit': props.oldUnit,
    'new_unit': props.newUnit,
    'qte': 1
})


const url_unitGrow = 'api/achat/unite_augm/'
const [unitGrowResponse, unitGrow] = useKurungika(data, url_unitGrow)


//Function
function unitGrowFn(){
    data.qte = toValue(newUnitValue)
    // some validations
    unitGrow()
}
function addPlaceHolder(e){
    e.target.placeholder = "??"
}
function removePlaceHolder(e){
    e.target.placeholder = ""
}
function closeFn(){
    setTimeout(()=>{
        emit('close')
    }, 800)
}

//Watcher
watch(unitGrowResponse, (value)=>{
    if(value?.status==200){
        closeFn()
    }
})

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