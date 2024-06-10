
<template>
    <div>
        <span class="closeBtn" style="z-index: 10;">
            <ion-icon :src="checkmarkDoneOutline" @click="approveHandler"
                style="margin-right: 2.2vw;"></ion-icon>
            <ion-icon :src="close" @click="closeApprov"></ion-icon>
        </span>
        <div style="position: fixed; top: 1%; left: 26vw; z-index: 9">
            Here we input the file
        <input id="file1" type="file" @change="fileHandler" placeholder="choose file" />
        </div>
        <br><br>
        <div class="umutiDisplay" style="display: flex;width: 95%;height: 20px; background-color: yellow;text-align: center;margin: -10px 10px; font-size: .8rem;position: sticky; top: 1%;">
        
                <div class="fname" style="background-color: red; width: 30%;height: 100%;">
                    Name
                </div>
                <div class="fname" style="background-color: blue; width: 10%;height: 100%;">
                    Type_med
                </div>
                <div class="fname" style="background-color: orange; width: 10%;height: 100%;">
                    Description
                </div>
                <div class="fname" style="background-color: orangered; width: 10%;height: 100%;">
                    Ratio
                </div>
                <div class="fname" style="background-color: olivedrab; width: 10%;height: 100%;">
                    Type_in
                </div>
                <div class="fname" style="background-color: blue; width: 10%;height: 100%;">
                    Type_out 
                </div>
                <div class="fname" style="background-color: orange; width: 10%;height: 100%;">
                    Price_in 
                </div>
                <div class="fname" style="background-color: orangered; width: 10%;height: 100%;">
                    Price_out
                </div>
                <div class="fname" style="background-color: olivedrab; width: 10%;height: 100%;">
                    Qte_initial
                </div>
            </div>
            <!-- <br> -->
        <div class="imitiDisplay" v-for="(umuti, index) in imiti_loaded" v-if="imiti_loaded">
            <!-- <p>Imiti is well loaded</p> -->
            <!-- <ol>
                <li>{{ umuti.Nom }}</li>
            </ol> -->
            <div class="umutiDisplay" style="display: flex;width: 95%;height: 20px; background-color: yellow;text-align: center;margin: 10px 10px;">
            <!-- <input value="jo"/> -->
                <div class="fname" style="background-color: red; width: 30%;height: 100%;">
                    <input :id="index +';Nom'" style="width: 100%; height: 100%;" :value="umuti.Nom" @blur="ListenNewChange"/> 
                </div>
                <div class="fname" style="background-color: blue; width: 10%;height: 100%;">
                    <input :id="index +';Type_medicament'" style="width: 100%; height: 100%;" :value="umuti.Type_medicament" @blur="ListenNewChange"/> 
                </div>
                <div class="fname" style="background-color: orange; width: 10%;height: 100%;">
                    <input :id="index +';Description'" style="width: 100%; height: 100%;" :value="umuti.Description" @blur="ListenNewChange"/> 
                </div>
                <div class="fname" style="background-color: orangered; width: 10%;height: 100%;">
                    <input :id="index +';Ratio'" style="width: 100%; height: 100%;" :value="umuti.Ratio" @blur="ListenNewChange"/> 
                </div>
                <div class="fname" style="background-color: olivedrab; width: 10%;height: 100%;">
                    <input :id="index +';Type_in'" style="width: 100%; height: 100%;" :value="umuti.Type_in" @blur="ListenNewChange"/> 
                </div>
                <div class="fname" style="background-color: blue; width: 10%;height: 100%;">
                    <input :id="index +';Type_out'" style="width: 100%; height: 100%;" :value="umuti.Type_out" @blur="ListenNewChange"/> 
                </div>
                <div class="fname" style="background-color: orange; width: 10%;height: 100%;">
                    <input :id="index +';Price_in'" style="width: 100%; height: 100%;" :value="umuti.Price_in" @blur="ListenNewChange"/> 
                </div>
                <div class="fname" style="background-color: orangered; width: 10%;height: 100%;">
                    <input :id="index +';Price_out'" style="width: 100%; height: 100%;" :value="umuti.Price_out" @blur="ListenNewChange"/> 
                </div>
                <div class="fname" style="background-color: olivedrab; width: 10%;height: 100%;">
                    <input type="number" :id="index +';Qte_initial'" style="width: 100%; height: 100%;" :value="umuti.Qte_initial" @blur="ListenNewChange"/> 
                </div>
            </div>
        </div>
        <teleport to="body">
            <div class="notif" v-if="notifStatus">
                <p>{{ message }}</p>
            </div>
        </teleport>
        
        
    </div>
</template>

<script>
import { IonIcon } from '@ionic/vue'
import { close, checkmarkDoneOutline } from 'ionicons/icons'
import { ref } from 'vue'
export default {
    components: {
        IonIcon,
    },
    setup(_, {emit}) {
        const ui_isActive = ref(true)
        const imiti_loaded = ref([])
        const notifStatus = ref(false)
        const message = ref('')

        const approveHandler = ()=>{
            if(imiti_loaded.value[0]){
                // can process
                // check the fields (Nom, Qnte, Px.A, Px.V, Date_exp)
                console.log("THe loaded is :", imiti_loaded.value)
                let counter = 0
                let imiti_length = (imiti_loaded.value).length
                // let wrong = []
                imiti_loaded.value.forEach((element)=>{
                    if(String(element.Nom) && Number(element.Qte_initial) && 
                        Number(element.Price_in) && Number(element.Price_out) &&
                        Date(element.Date_exp)
                    ){
                        // You can emit the imiti_loaded.value
                        console.log("Your data is well formatted")
                        counter += 1
                    }
                    else {
                        console.log("Your data is Wrong formatted")
                    }
                })
                    
                if (counter == imiti_length -1){
                    console.log("Things are Okay")
                    let converted_imiti = convertToStandard(imiti_loaded.value)
                    emit('fileDataLoaded', converted_imiti)
                } else {
                    let info = "There is one or more fields non well formatted!"
                    notifSwitch(info)
                }
            } else{
                // cannot process
                let info = "Vous n'avez pas ajouté des données !"
                notifSwitch(info)
            }
        }
        const convertToStandard = (obj_array)=>{
            let new_obj_array = []
            obj_array.forEach(element=>{
                let obj = {
                'code_umuti': '',
                'date_winjiriyeko': '',
                // 'date_winjiriyeko': new Date().toISOString(),
                'date_uzohererako': element.Date_exp,
                'name_umuti': element.Nom,
                'description_umuti': element.Description,
                'type_umuti': element.Type_medicament,
                'type_in': element.Type_in,
                'ratio_type': element.Ratio,
                'type_out': element.Type_out,
                'price_in': element.Price_in,
                'price_out': element.Price_out,
                'quantite_initial': element.Qte_initial,
                'location': '',
                }
                new_obj_array.push(obj)
            })
            return new_obj_array
        }
        const notifSwitch = (info)=>{
            message.value = String(info)
            notifStatus.value = true
            setTimeout(()=>{
                    notifStatus.value = false
                }, 3200)
            console.log("notifSwitch has be called")

        }
        const ListenNewChange = (event)=>{
            console.log("You onBlured  on ID: ", event.target.getAttribute('id'))
            let [ i, j ] = (event.target.getAttribute('id')).split(';')
            console.log("The left value : ", event.target.value)
            console.log("the second line : ", imiti_loaded.value[1][j])
            imiti_loaded.value[i][j] = event.target.value
        }
        const fileHandler = async ()=>{
            const selectedFile = document.getElementById('file1').files[0]
            console.log("The filename is :", selectedFile.type)
            if(selectedFile.type === 'text/csv'){
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
                    //should check if there is no doublon:
                    //  emitting the obj_array for check or use Vuex

                    //no need to check, if it is new then those keys sent
                    // are the only 5 mandatory.
                    // should be managed on the Backend
                    imiti_loaded.value = obj_array
                    console.log("The obj array is : ", obj_array)
                };
            } else {
                let info = "Le fichier que vous avez selectioné  n'est pas compatible."
                notifSwitch(info)
            }
            
            
            
        }
        const closeApprov = ()=>{
            ui_isActive.value = false
            emit('approFileClose', 0)
        }
        return {
            close,checkmarkDoneOutline,
            message,
            ui_isActive, imiti_loaded, notifStatus,
            closeApprov, fileHandler, ListenNewChange,approveHandler,
        }
    },
}
</script>