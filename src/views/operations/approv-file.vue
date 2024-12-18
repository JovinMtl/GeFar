
<template>
    <div>
        <span class="closeBtn" style="z-index: 10;">
            <a
  href="Template/imiti_exemplaire.csv"
  :download="'exemplaire_achats_du-' + 
  new Date().getDay() + '_'+new Date().getMonth()+'.csv'"
>
  <ion-icon :src="documentOutline" style="position: absolute; left: -4rem;"></ion-icon>
</a>

            <ion-icon :src="checkmarkDoneOutline" @click="approveHandler"
                style="margin-right: 2.2vw;"></ion-icon>
            <ion-icon :src="close" @click="closeApprov"></ion-icon>
        </span>
        <div style="position: fixed; top: 1%; left: 26vw; z-index: 9">
            Here we input the file
        <input id="file1" type="file" @change="xlsxFileReader" placeholder="choisir fichier" />
        </div>
        <br><br>
        <div class="umutiDisplay" style="display: flex;width: 95%;height: 20px; background-color: yellow;text-align: center;margin: -10px 10px; font-size: .8rem;position: sticky; top: 1%;">
        
                <div class="fname" style="background-color: red; width: 30%;height: 100%;">
                    Name
                </div>
                <div class="fname" style="background-color: blue; width: 10%;height: 100%;">
                    famille_med
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
                    Type_vente 
                </div>
                <div class="fname" style="background-color: orange; width: 10%;height: 100%;">
                    prix_in 
                </div>
                <div class="fname" style="background-color: orangered; width: 10%;height: 100%;">
                    prix_vente
                </div>
                <div class="fname" style="background-color: olivedrab; width: 10%;height: 100%;">
                    Qte_initial
                </div>
            </div>
        <div class="imitiDisplay" v-for="(umuti, index) in imiti_loaded" v-if="imiti_loaded">
            <div class="umutiDisplay" style="display: flex;width: 95%;height: 20px; background-color: yellow;text-align: center;margin: 10px 10px;">
                <div class="fname" style="background-color: red; width: 30%;height: 100%;">
                    <input :id="index +';Nom'" style="width: 100%; height: 100%;" :value="umuti.Nom" @blur="ListenNewChange"/> 
                </div>
                <div class="fname" style="background-color: blue; width: 10%;height: 100%;">
                    <input :id="index +';famille_medicament'" style="width: 100%; height: 100%;" :value="umuti.famille_medicament" @blur="ListenNewChange"/> 
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
                    <input :id="index +';Type_vente'" style="width: 100%; height: 100%;" :value="umuti.Type_vente" @blur="ListenNewChange"/> 
                </div>
                <div class="fname" style="background-color: orange; width: 10%;height: 100%;">
                    <input :id="index +';prix_in'" style="width: 100%; height: 100%;" :value="umuti.prix_in" @blur="ListenNewChange"/> 
                </div>
                <div class="fname" style="background-color: orangered; width: 10%;height: 100%;">
                    <input :id="index +';prix_vente'" style="width: 100%; height: 100%;" :value="umuti.prix_vente" @blur="ListenNewChange"/> 
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
import { close, checkmarkDoneOutline, documentOutline } from 'ionicons/icons'
import { ref } from 'vue'
import MedApprov from '../layout/types'
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
                        Number(element.prix_in) && Number(element.prix_vente) &&
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
                'code_med': '',
                'date_winjiriyeko': '',
                // 'date_winjiriyeko': new Date().toISOString(),
                'date_uzohererako': element.Date_exp,
                'nom_med': element.Nom,
                'description_med': element.Description,
                'famille_med': element.famille_medicament,
                'type_in': element.Type_in,
                'ratio_type': element.Ratio,
                'type_vente': element.Type_vente,
                'prix_in': element.prix_in,
                'prix_vente': element.prix_vente,
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
        const xlsxFileReader = async()=>{
            console.log("Calling xlsxFileReader.")
            const fileInput = document.getElementById('file1');
            const file = fileInput.files[0];

            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    // Read the file content
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });

                    // Get the first sheet
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];

                    // Convert the sheet to JSON
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                    // Display the data
                    console.log("The Gotten file data is : ", jsonData)
                    // document.getElementById('output').textContent = JSON.stringify(jsonData, null, 2);

                    // Begin to pack the data into obj to be submitted
                    const niceData = jsonData.splice(5)
                    let obj:MedApprov = {}  // it's type of MedApprov
                    let obj_arr = []
                    niceData.forEach((element)=>{
                        // Should gather each line into obj, then append it to obj_arr
                    })
                };

                reader.readAsArrayBuffer(file);
            } else {
                alert('Please select a file first.');
            }
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
            close,checkmarkDoneOutline, documentOutline,
            message,
            ui_isActive, imiti_loaded, notifStatus,
            closeApprov, fileHandler, ListenNewChange,approveHandler,
            xlsxFileReader,
        }
    },
}
</script>