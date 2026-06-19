<template>
    <div>
        <label v-show="ok">actuel: {{ actualUnit }}, {{ selectedUnit }}</label> <br>
        <select v-model="selectedUnit">
           <option v-for="unit in medUnits">{{ unit.unit }}</option>
        </select><br>
        <med-unit-grow v-if="grow" 
            :umuti-data="props.umutiData" 
            :old-unit="actualUnit" 
            :new-unit="selectedUnit" 
            @close="emit('closeModAchat')"></med-unit-grow>
        <med-unit-shrink v-if="shrink" 
            :umuti-data="props.umutiData" 
            :old-unit="actualUnit" 
            :new-unit="selectedUnit" 
            @close="emit('closeModAchat')"></med-unit-shrink>
        <med-unit-equal v-if="equal" 
            :umuti-data="props.umutiData" 
            :old-unit="actualUnit" 
            :new-unit="selectedUnit" 
            @close="emit('closeModAchat')"></med-unit-equal>
    </div>
</template>

<script setup lang="ts">
import { ref, toValue, watch } from 'vue'
import { useKuvoma } from '../../../../../../hooks/kuvoma';
import { getMedUnitName } from '../../../../../../hooks/useGetMedUnit';
import medUnitGrow from './med-unit-grow.vue';
import medUnitShrink from './med-unit-shrink.vue';
import medUnitEqual from './med-unit-equal.vue';

const props = defineProps(['umutiData']);
const emit = defineEmits(['closeModAchat'])

const selectedUnit = ref('')
const actualUnit = ref('')
const grow = ref(false);
const shrink = ref(false);
const equal = ref(false);
const ok = ref(false);
const builtMedUnits = {}

const url_local = '//127.0.0.1:8002'
const url_getMedUnit = 'api/gOps/getMedUnit/'
const [medUnits, getMedUnit] = useKuvoma(url_getMedUnit, url_local)
getMedUnit()

  
//Functions

function activeShrink(){
    grow.value = false;
    equal.value = false;
    shrink.value = true;
}
function activeGrow(){
    shrink.value = false;
    equal.value = false;
    grow.value = true;
}
function activeSame(){
    grow.value = false;
    shrink.value = false;
    equal.value = true
}
function buildMedUnit(medUnit){
    let dest = {}
    medUnit.forEach((unit)=>{
        dest[unit.unit] = [unit.id, unit.level]
    })
    return dest
}

//Watchers
watch(medUnits, (value)=>{
    
    if(value.length > 0){
        let medUnits = value
        const compliledMedUnits = buildMedUnit(medUnits)
        Object.assign(builtMedUnits, compliledMedUnits)
        actualUnit.value = getMedUnitName(medUnits, props.umutiData.med_unit);
        ok.value = true;
    }
})
watch(selectedUnit, (value)=>{

    if(props.umutiData.med_unit == null){
        // Should ask nothing but send the new unit
        activeSame()
    }else if(builtMedUnits[value][1] > builtMedUnits[toValue(actualUnit)][1]){
        // alert("shrink qte")
        activeShrink()
    }else if(builtMedUnits[value][1] == builtMedUnits[toValue(actualUnit)][1]){
        // alert("equal")
        // Should ask nothing but send the new unit
        activeSame()
    }else if(builtMedUnits[value][1] < builtMedUnits[toValue(actualUnit)][1]){
        // alert("grow qte")
        activeGrow()
    }
})
</script>