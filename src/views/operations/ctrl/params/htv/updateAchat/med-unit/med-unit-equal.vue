
<template>
    <div>
        <p class="c-b-1">
            <!-- Cette fonctionnalité sera bientôt disponible. —grow -->
            1 {{ props.oldUnit }} = <span class="c-b"> 1 </span> {{ props.newUnit }}  ??
        </p>
        <div>
            <button @click="unitEqual" class="btn bg-b-1 mv-10" :class="[unitEqualResponse?.status==200 ? 'bg-b':'', unitEqualResponse?.status==403 ? 'bg-r':'']">Ok</button>
            <p v-show="unitEqualResponse?.status==403">{{ unitEqualResponse?.message }}</p>
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
})


const url_unitEqual = 'api/achat/unite_egal/'
const [unitEqualResponse, unitEqual] = useKurungika(data, url_unitEqual)


//Function
function closeFn(){
    emit('close')
}

//Watcher
watch(unitEqualResponse, (value)=>{
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