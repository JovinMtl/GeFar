<template>
    <div>
        
        <label> Ancien Px.Achat : 
            <span class="c-b">{{ (props.umutiData?.prix_achat) }}</span> 
        </label>
        <hr>
        <input v-model="data.new_px_achat" type="number" placeholder="Nouveau Px.Achat"/>
        <div>
            <button class="btn bg-b-1" 
                :class="[   btnStatus==1 ? 'bg-g-1' : '', btnStatus==2 ? 'bg-r' : '']"
                @click="updatePxAchatFn">
                Ok
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { reactive, ref, watch } from 'vue'
    import { useKurungika } from '../../../../../../hooks/kuvoma';
import { set } from '@vueuse/core';

    const props = defineProps(['umutiData']);
    const emits = defineEmits(['closeModAchat']);

    const urlPxAchat = 'api/achat/px_achat/';
    const data = reactive({})
    const btnStatus = ref(0)
    data.code_med = props.umutiData?.code_med;
    data.code_operation = props.umutiData?.code_operation;
    data.new_px_achat = null;

    const [ responsePxAchat, updatePxAchat ] = useKurungika(data, urlPxAchat)


    // Functions
    function updatePxAchatFn(){
        // Some validations
        let valid = Number(data.new_px_achat) > 0;
        if (valid){
            updatePxAchat()
        }else{
            btnStatus.value = 2; // Indicate error
            setTimeout(()=>{
                btnStatus.value = 0; // Reset status after a while
            }, 2000)
            return;
        }
        
    }

    // Watchers
    watch(responsePxAchat, (res) => {
        // Handle the response from the API

        if (res.status === 200) {
            // Reset the input field
            btnStatus.value = 1; // Indicate success
            // data.new_px_achat = null;
            // Emit an event to notify the parent component
            emits('closeModAchat');
            
        }else {
            btnStatus.value = 2; // Indicate error
        }
    });

    
</script>