<template>
    <div>
        
        <label> Ancien Qté : 
            <span class="c-b">{{ (props.umutiData?.quantite_initial) }}</span> 
        </label>
        <hr>
        <input v-model="data.new_qte" type="number" placeholder="Nouvelle Qté"/>
        <label class="c-g-1">&nbsp;{{ Number((props.umutiData?.quantite_initial)) - Number((props.umutiData?.quantite_restant)) }}+ </label>
        <div>
            <button class="btn bg-b-1" 
                :class="[   btnStatus==1 ? 'bg-g-1' : '', btnStatus==2 ? 'bg-r' : '']"
                @click="updateQteFn">
                Ok
            </button>
        </div>
        <div v-if="message" class="c-r">{{ message }}</div>
    </div>
</template>
<script setup lang="ts">
    import { reactive, ref, watch } from 'vue';
    import type { Ref } from 'vue';
    import { useKurungika } from '../../../../../../hooks/kuvoma';

    const props = defineProps(['umutiData']);
    const emits = defineEmits(['closeModAchat']);

    interface dataAchat {
        code_med : string;
        code_operation : string;
        new_qte : number | null;
    }

    const urlPxAchat = 'api/achat/n_qte/';
    const data: dataAchat = reactive({
        code_med: props.umutiData?.code_med || '',
        code_operation: props.umutiData?.code_operation || '',
        new_qte: null
    });
    
    const message: Ref<string> = ref('')

    // State to manage button status
    // 0: default, 1: success, 2: error
    const btnStatus: Ref<number> = ref(0)
    const [ responsePxAchat, updateQte ] = useKurungika(data, urlPxAchat)


    // Functions
    function updateQteFn(){
        // Some validations
        let valid = Number(data.new_qte) >= 0;
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
    watch(responsePxAchat, (res) => {
        // Handle the response from the API
        if (res.status === 200) {
            // Reset the input field
            data.new_qte = null;
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