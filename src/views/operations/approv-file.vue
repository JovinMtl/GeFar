
<template>
    <div>
        <span class="closeBtn" style="">
            <ion-icon :src="close" @click="closeApprov"></ion-icon>
        </span>
        Here we input the file
        <input type="file" placeholder="choose file" />
    </div>
</template>

<script>
import { IonIcon } from '@ionic/vue'
import { close } from 'ionicons/icons'
import { ref } from 'vue'
export default {
    components: {
        IonIcon,
    },
    setup(_, {emit}) {
        const ui_isActive = ref(true)

        const closeApprov = ()=>{
            ui_isActive.value = false
            emit('approFileClose', 0)
        }
        return {
            close,
            ui_isActive,
            closeApprov,
        }
    },
}
</script>