<template>
    <div style="display: flex; background-color: rgba(55, 55, 55, 0.6);
        justify-content: center; align-items: center;
        position: absolute;width: 100%; height: 100%;flex-direction: column;">

        <p> <span class="c-a bg-b-1" :class="wrongPhrase ? 'c-s':''" style="padding: 0 10px; border-radius: 12px;">Veuillez confirmer cette annulation en tapant le mot:</span> <span style="font-size: 3em; font-weight: 100;">Annuler</span> </p>
        <div>
            <table>
                <tr>
                    <th>Nom du Méd<span class="c-t">_</span></th>
                    <th>Qte<span class="c-t">_</span></th>
                    <th><span class="c-t">_</span>Prix V.</th>
                    <th><span class="c-t">_</span>Date</th>
                </tr>
                <tr>
                    <td>{{ props.actualOp.nom_med }}</td>
                    <td>{{ props.actualOp.qte }}</td>
                    <td>{{ props.actualOp.prix_vente }}</td>
                    <td>{{ props.actualOp.date_served }}</td>
                </tr>
            </table>
        </div>
        
        <div>
            <input v-model="phrase" type="text">
            <button class="bg-b" @click="doneValidation">Ok</button>
            <button class="bg-s" @click="emit('reportConfirm', 1)">No</button>
        </div>
        
    </div>
</template>
<script setup lang="ts">
import { ref, toValue } from 'vue'

const props = defineProps(['actualOp'])
const emit = defineEmits(['reportConfirm', 'replied'])
const phrase = ref('')
const wrongPhrase = ref(false)

const doneValidation = ()=>{
    if (toValue(phrase) == 'Annuler'){
        emit('reportConfirm', 2)
    } else{
        wrongPhrase.value = true
    }
}

</script>
<style scoped>
button{
    margin: 1em;
    padding: 0.5em 1em;
}
input{
    border-color: greenyellow;
    background-color: yellowgreen;
    width: 5rem;
    padding: 10px 15px;
}
th{
    border: 2px dashed black;
}
td{
    border: 1px solid black;
}
table{
    border-radius: 5px;
}
</style>