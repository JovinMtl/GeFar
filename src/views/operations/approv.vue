<template>
    <div>
        <span style="position: absolute; left: 92%;">
            <ion-icon :src="close"></ion-icon>
        </span>
        Ici on gere des approvisionnement
        <br> <br>
        <input class="inp" type="text" placeholder="Nom du medicament">
        <br><br>
        <input class="inp" @click="console.log('You clicked an input')" type="text" placeholder="Nom du medicament">
        <br> <br>
        <input class="inp" type="text" placeholder="Nom du medicament">
        <br><br>
        <input class="inp" @click="console.log('You clicked an input')" type="text" placeholder="Nom du medicament">
        <br> <br>
        <input class="inp" type="text" placeholder="Nom du medicament">
        <br><br>
        <input class="inp" @click="console.log('You clicked an input')" type="text" placeholder="Nom du medicament">
        <br> <br>
        <input class="inp" type="text" placeholder="Nom du medicament">
        <br><br>
        <label>Date fin</label>
        <input class="inp" @click="console.log('You clicked an input')" type="date" placeholder="Nom du medicament">
        <br>
    </div>
</template>
<script>
import { IonIcon } from '@ionic/vue'
import { close } from 'ionicons/icons'
export default {
    components: {
        IonIcon,
    },
    setup() {
        return {
            close,
        }
    },
}
</script>

<style scoped>
.inp{
    color: white;
}
</style>