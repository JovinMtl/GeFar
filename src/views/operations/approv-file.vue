
<template>
    <div>
        <span class="closeBtn" style="">
            <ion-icon :src="close" @click="closeApprov"></ion-icon>
        </span>
        Here we input the file
        <input id="file1" type="file" @change="fileHandler" placeholder="choose file" />
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

        const fileHandler = async ()=>{
            const selectedFile = document.getElementById('file1').files[0]
            console.log("The filename is :", selectedFile.type)
            const file_blob = URL.createObjectURL(selectedFile)
            // Create a new FileReader object for reading the selected file
            let fileReader = new FileReader();

            // Define a function to be executed when the file is read
            fileReader.onload = () => {
                console.log("The content:", fileReader.result);
            };

            // Read the content of the selected file
            fileReader.readAsText(selectedFile, 'utf-8');
            
            
        }
        const closeApprov = ()=>{
            ui_isActive.value = false
            emit('approFileClose', 0)
        }
        return {
            close,
            ui_isActive,
            closeApprov, fileHandler,
        }
    },
}
</script>