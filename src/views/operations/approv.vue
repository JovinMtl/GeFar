<template>
    <div>
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
        <select placeholder="jojdkfjk" value="Ovuledfdfdfdf">
            <option>Cp</option>
            <option>Gel</option>
            <option>Ovuledfdfdfdf</option>
            <option>Sirop</option>
            <option>Inj</option>
            <!-- <option>Inj</option> -->
        </select>
        <br> <br>
        <input class="inp" type="color" placeholder="Nom du medicament">
        <br><br>
        <input class="inp" type="text" placeholder="Nom du medicament">
        <br> <br>
        <textarea name="description" placeholder="Description du medicament" id="" cols="30" rows="10"></textarea>
        <input class="inp" type="text" placeholder="ratio: 1 : 1">
        <br><br>
        <input class="inp" type="text" placeholder="Nom du medicament">
        <br> <br>
        <input class="inp" type="text" placeholder="Type in">
        <br> <br>
        <input class="inp" type="text" placeholder="Type out">
        <br><br>
        <br> <br>
        <input class="inp" type="text" placeholder="Price in">
        <br> <br>
        <input class="inp" type="text" placeholder="Price out">
        <br> <br>
        <input class="inp" type="text" placeholder="Quantite Initial">
        <br> <br>
        <input class="inp" type="text" placeholder="Localisation">
        <br>
        <label>Date d'exp. </label>
        <input class="inp" type="date" placeholder="Nom du medicament">
        <br>
    </div>
</template>
<script>
import { IonSelect, IonSelectOption,} from '@ionic/vue'
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