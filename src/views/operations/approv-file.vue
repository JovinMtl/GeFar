
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
        const imiti_loaded = ref([])

        const fileHandler = async ()=>{
            const selectedFile = document.getElementById('file1').files[0]
            console.log("The filename is :", selectedFile.type)
            const file_blob = URL.createObjectURL(selectedFile)
            // Create a new FileReader object for reading the selected file
            let fileReader = new FileReader();

            // Read the content of the selected file
            fileReader.readAsText(selectedFile);

            // Define a function to be executed when the file is read
            fileReader.onload = () => {
                // console.log("The content:", fileReader.result);
                let content = fileReader.result
                let lines = content.split('\n')
                let first_line = lines[1]
                let second_line = lines[2]
                let obj_array = []
                let line_length = second_line.split(',').length
                let jove = 'Nom'
                // let obj = {
                //     [jove ? 'Nomme':'Nome']: 'Nsanzumukiza'
                // }
                // console.log("The obj is :", obj)
                console.log("the first column is :", second_line.split(',')[1])
                console.log("The length of the line is : ", line_length)
                
                lines.forEach(element => {
                    let columns = element.split(',')
                    let obj = {}
                    for(let i=1; i < line_length; i++){
                        if(columns[i]){
                            obj[first_line.split(',')[i]] = columns[i]
                        }
                    }
                    
                    if(obj[first_line.split(',')[1]]){
                        obj_array.push(obj)
                    }
                    
                });
                imiti_loaded.value = obj_array
                console.log("The obj array is : ", obj_array)
            };
            
            
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