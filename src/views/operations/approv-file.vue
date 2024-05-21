
<template>
    <div>
        <span class="closeBtn" style="">
                        <ion-icon :src="close" @click="closeApprov"></ion-icon>
                    </span>
        Here we input the file
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