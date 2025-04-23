<template>
    <div style="position: absolute;
        /* transform: translate(0%, 50%); */
        margin-top: 15px;
        width: 100%; height: 60%; display: flex;
        justify-content: right;"> 
        <div class="bg-ht" style="max-width: 30%; height: 150%;overflow: scroll;">
            <!-- here we modify achats: {{ props.umutiData }} -->
             <label for="">Date Per.</label>
             <input type="date" v-model="date_peremption" /><br>
             <label for="">Prix A.</label>
             <input type="number" v-model="prix_achat"/><br>
             <label for="">Qte</label>
             <input type="number" v-model="quantite_initial"><br>
             <input type="button" value="Confirmer" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps(['umutiData']);

const date_peremption = ref(props.umutiData.date_peremption)
const prix_achat = ref(props.umutiData.prix_achat)
const quantite_initial = ref(props.umutiData.quantite_initial)
</script>
