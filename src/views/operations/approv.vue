<template>
    <div>
        <span style="position: absolute; left: 92%;">
            <ion-icon :src="close"></ion-icon>
        </span>
        Ici on gere des approvisionnement
        <br> <br>
        <input class="inp" type="text" placeholder="Nom du medicament">
        <br><br>
        <input class="inp" type="text" placeholder="Cp, Gel, Ovule, Sirop, Inj ?">
        <ion-select placeholder="Type de medicament" mode="ios">
                        <ion-select-option>
                            Cp
                        </ion-select-option>
                        <ion-select-option>
                            Gel
                        </ion-select-option>
                        <ion-select-option>
                            Ovule
                        </ion-select-option>
                        <ion-select-option>
                            Sirop
                        </ion-select-option>
                        <ion-select-option>
                            Inj
                        </ion-select-option>
                    </ion-select>
        <br> <br>
        <label>Type de medicament</label>
        <select name="jojdkfjk">
            <option>Cp</option>
            <option>Gel</option>
            <option>Ovuledfdfdfdf</option>
            <option>Sirop</option>
            <option>Inj</option>
            <!-- <option>Inj</option> -->
        </select>
        <br> <br>
        <input class="inp" type="text" placeholder="Nom du medicament">
        <br><br>
        <input class="inp" type="text" placeholder="Nom du medicament">
        <br> <br>
        <input class="inp" type="text" placeholder="Nom du medicament">
        <br><br>
        <input class="inp" type="text" placeholder="Nom du medicament">
        <br> <br>
        <input class="inp" type="text" placeholder="Nom du medicament">
        <br><br>
        <label>Date fin</label>
        <input class="inp" type="date" placeholder="Nom du medicament">
        <br>
    </div>
</template>
<script>
import { IonIcon, IonSelect, IonSelectOption,} from '@ionic/vue'
import { close } from 'ionicons/icons'
export default {
    components: {
        IonIcon, IonSelectOption, IonSelect, 
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