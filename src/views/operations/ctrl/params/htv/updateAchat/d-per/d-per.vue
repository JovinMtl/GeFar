<template>
    <div>
        
        <label> Ancien date : 
            <span class="c-b">{{ (props.umutiData?.date_peremption) }}</span> 
        </label>
        <hr>
        <input v-model="data.new_date" type="date" placeholder="Nouvelle date"/>
        <div>
            <button class="btn bg-b-1" 
                :class="[   btnStatus==1 ? 'bg-g-1' : '', btnStatus==2 ? 'bg-r' : '']"
                @click="updateQteFn">
                Ok
            </button>
        </div>
        <div v-if="message"
            :class="btnStatus==1 ? 'c-g-1' : btnStatus==2 ? 'c-r' : ''">{{ message }}</div>
    </div>
</template>
<script setup lang="ts">
    import { reactive, ref, watch } from 'vue';
    import type { Ref } from 'vue';
    import { useKurungika } from '../../../../../../hooks/kuvoma';

    const props = defineProps(['umutiData']);
    const emits = defineEmits(['closeModAchat']);

    let changedDate = false;

    interface dataAchat {
        code_med : string;
        code_operation : string;
        new_date : Date | null;
    }

    const urlPxAchat = 'api/achat/date_peremption/';
    const data: dataAchat = reactive({
        code_med: props.umutiData?.code_med || '',
        code_operation: props.umutiData?.code_operation || '',
        new_date: new Date((props.umutiData?.date_peremption))
    });
    
    const message: Ref<string> = ref('')

    // State to manage button status
    // 0: default, 1: success, 2: error
    const btnStatus: Ref<number> = ref(0)
    const [ responsePxAchat, updateQte ] = useKurungika(data, urlPxAchat)


    // Functions
    function updateQteFn(){
        // Some validations
        let valid = changedDate;
        if (valid){
            updateQte()
        }else{
            btnStatus.value = 2; // Indicate error
            setTimeout(()=>{
                btnStatus.value = 0; // Reset status after a while
            }, 2000)
            return;
        }
        
    }

    // Watchers
    watch(data, ()=>{
        changedDate = true;
    })
    watch(responsePxAchat, (res) => {
        // Handle the response from the API
        if (res.status === 200) {
            btnStatus.value = 1; // Indicate success
            message.value = 'Date mise à jour avec succès';
            // Emit an event to notify the parent component
            emits('closeModAchat');
            
        }else{
            btnStatus.value = 2; // Indicate error
            message.value = res.message || 'Une erreur est survenu';
            setTimeout(()=>{
                message.value = ''; // Reset status after a while
            }, 2000)
            return;
        }
    });

    
</script>