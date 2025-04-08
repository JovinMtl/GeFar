
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
        <div class="umutiDisplay" style="display: flex;width: 95%;height: 20px; text-align: center;margin: -10px 10px; font-size: .8rem;position: sticky; top: 1%;">
        
                <div class="fname" style="background-color: red; width: 30%;height: 100%;">
                    DESIGNATION
                </div>
                <div class="fname" style="background-color: orangered; width: 10%;height: 100%;">
                    Forme
                </div>
                <div class="fname" style="background-color: blue; width: 10%;height: 100%;">
                    Classe
                </div>
                <div class="fname" style="background-color: orange; width: 10%;height: 100%;">
                    S-Classe
                </div>
                <div class="fname" style="background-color: orange; width: 10%;height: 100%;">
                    Date Per. 
                </div>
                <div class="fname" style="background-color: olivedrab; width: 10%;height: 100%;">
                    Qte
                </div>
                <div class="fname" style="background-color: blue; width: 10%;height: 100%;">
                    P.A 
                </div>
                <!-- <div class="fname" style="background-color: orangered; width: 10%;height: 100%;">
                    Ty. Achat
                </div>
                <div class="fname" style="background-color: olivedrab; width: 10%;height: 100%;">
                    Ty. Vente
                </div>
                <div class="fname" style="background-color: salmon; width: 5%;height: 100%;">
                    Ratio
                </div> -->
            </div>
        <div class="imitiDisplay" v-for="(med, index) in med_loaded" 
            :key="index"
            v-if="med_loaded">
            <div class="umutiDisplay" style="display: flex;width: 95%;height: 20px; text-align: center;margin: 10px 10px;">
                <div class="fname" style="width: 30%;height: 100%;">
                    <input :class="med.errors[1] ? 'bg-r':''" :id="index +';Nom'" style="width: 100%; height: 100%;" :value="med.nom_med" @blur="ListenNewChange"/> 
                </div>
                <div class="fname" style="width: 10%;height: 100%;">
                    <input :class="med.errors[2] ? 'bg-r':''" :id="index +';famille_medicament'" style="width: 100%; height: 100%;" :value="med.forme" @blur="ListenNewChange"/> 
                </div>
                <div class="fname" style="width: 10%;height: 100%;">
                    <input :class="med.errors[3] ? 'bg-r':''" :id="index +';Description'" style="width: 100%; height: 100%;" :value="med.classe_med" @blur="ListenNewChange"/> 
                </div>
                <div class="fname" style="width: 10%;height: 100%;">
                    <input :class="med.errors[4] ? 'bg-r':''" :id="index +';Ratio'" style="width: 100%; height: 100%;" :value="med.sous_classe_med" @blur="ListenNewChange"/> 
                </div>
                <div class="fname" style="width: 10%;height: 100%;">
                    <input :class="med.errors[5] ? 'bg-r':''" :id="index +';Type_in'" style="width: 100%; height: 100%;" :value="med.date_peremption" @blur="ListenNewChange"/> 
                </div>
                <div class="fname" style="width: 10%;height: 100%;">
                    <input :class="med.errors[6] ? 'bg-r':''" :id="index +';Type_vente'" style="width: 100%; height: 100%;" :value="med.quantite_initial" @blur="ListenNewChange"/> 
                </div>
                <div class="fname" style="width: 20%;height: 100%;">
                    <input :class="med.errors[7] ? 'bg-r':''" :id="index +';prix_in'" style="width: 100%; height: 100%;" :value="med.prix_achat" @blur="ListenNewChange"/> 
                </div>
                <!-- <div class="fname" style="background-color: orangered; width: 10%;height: 100%;">
                    <input :id="index +';prix_vente'" style="width: 100%; height: 100%;" :value="med.type_achat" @blur="ListenNewChange"/> 
                </div>
                <div class="fname" style="background-color: olivedrab; width: 10%;height: 100%;">
                    <input type="text" :id="index +';quantite_initial_initial'" style="width: 100%; height: 100%;" :value="med.type_vente" @blur="ListenNewChange"/> 
                </div>
                <div class="fname" style="background-color: olivedrab; width: 5%;height: 100%;">
                    <input type="number" :id="index +';quantite_initial_initial'" style="width: 100%; height: 100%;" :value="med.ratio" @blur="ListenNewChange"/> 
                </div> -->
            </div>
        </div>
        <teleport to="body">
            <div class="notif" v-if="notifStatus">
                <p>{{ message }}</p>
            </div>
        </teleport>
        
        
    </div>
</template>
<script setup lang="ts">
import { IonIcon } from '@ionic/vue'
import { close, checkmarkDoneOutline, documentOutline } from 'ionicons/icons'
import { ref, watch } from 'vue'
import { MedApprov } from '../layout/types'
import { useKurungika } from '../hooks/kuvoma.js'

const ui_isActive = ref<boolean>(true)
const med_loaded = ref<MedApprov[]>([])
const notifStatus = ref<boolean>(false)
const message = ref<string>('')
const umuti_obj = ref<any>(null)


const emit = defineEmits(['approFileClose',
    'fileDataLoaded', 'reportAchat'])

const url_achat = 'api/in/kurangura/'
const [report_achat, sendFileDataLoaded] = useKurungika(med_loaded.value, url_achat)

const convertDate = (dateString:String):String=>{
    // will take '2025-1-22' and make it '1/21/25'
    let spl = dateString.split('-')
    let joined = `${spl[1]}/${spl[2]}/${spl[0].slice(2)}`
    return joined
}
const approveHandler = ()=>{
    if(med_loaded.value[0]){
        // can process
        // check the fields (Nom, Qnte, Px.A, Px.V, Date_exp)
        console.log("THe loaded is :", med_loaded.value)
        let counter = 0
        let today = Date(new Date())
        let imiti_length = (med_loaded.value).length 
        // let wrong = []
        med_loaded.value.forEach((element)=>{
            if((element.nom_med != undefined) && 
                (element.forme != undefined) && 
                (element.classe_med != undefined)&& 
                (element.sous_classe_med != undefined) && 
                (((Date(element.date_peremption)) != 'Invalid Date') || 
                (element.date_peremption != 'undefined/undefined/ll')) &&
                (Number(element.quantite_initial)) && 
                (Number(element.prix_achat))
            ){
                // You can emit the med_loaded.value
                // console.log("Your data is well formatted")
                counter += 1
            }
            if (element.nom_med == undefined){
                element.errors[1] = 1
            }
            if (element.forme == undefined){
                element.errors[2] = 1
            }
            if (element.classe_med == undefined){
                element.errors[3] = 1
            }
            if (element.sous_classe_med == undefined){
                element.errors[4] = 1
            }
            if (((Date(element.date_peremption)) == 'Invalid Date') || (element.date_peremption == 'undefined/undefined/ll')){
                element.errors[5] = 1
            }
            if (!(Number(element.quantite_initial))){
                element.errors[6] = 1
            }
            if (!(Number(element.prix_achat))){
                element.errors[7] = 1
            }
        })
        console.log("Check right: ", counter, "/", imiti_length)
        if (counter == imiti_length){
            // console.log("Things are Okay")
            emit('reportAchat', 1)
            setTimeout(sendFileDataLoaded, 1000)
        } else {
            let info = `There is one or more fields non well formatted!, ${counter}`
            notifSwitch(info)
        }
    } else{
        // cannot process
        let info = "Vous n'avez pas ajouté des données !"
        notifSwitch(info)
    }
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
    console.log("the second line : ", med_loaded.value[1][j])
    med_loaded.value[i][j] = event.target.value
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
            const workbook = XLSX.read(data, { type: 'array'});

            // Get the first sheet
            const firstSheetName = workbook.SheetNames[2];
            const worksheet = workbook.Sheets[firstSheetName];

            // Convert the sheet to JSON
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1,raw: false});
            // Display the data
            console.log("The Gotten file data is : ", jsonData)
            // document.getElementById('output').textContent = JSON.stringify(jsonData, null, 2);

            // Begin to pack the data into obj to be submitted
            const niceData: MedApprov[] = jsonData.slice(3)
            let today = new Date()
            niceData.forEach((element:MedApprov)=>{
                // Should gather each line into obj, then append it into med_loaded
                // console.log("THe forme: " + element[2])
                let obj = {} as MedApprov  // it's type of MedApprov
                if(element[0]){
                    
                    let date_one = (String(new Date(element[5]).toJSON())).slice(0,10)
                    let date_two = convertDate(date_one)
                    obj.nom_med = element[1];
                    obj.forme = element[2]
                    obj.classe_med = element[3]
                    obj.sous_classe_med = element[4]
                    obj.date_peremption = date_two
                    obj.quantite_initial = element[6]
                    obj.prix_achat = Number(element[7])
                    // obj.type_achat = element[7]
                    // obj.type_vente = element[8]
                    // obj.ratio = element[9]
                    obj.errors = [];
                }
                med_loaded.value.push(obj)
            })
            med_loaded.value.pop()
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
            med_loaded.value = obj_array
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

//watchers
watch(report_achat, (value)=>{
    if (value.detail){
        console.log("operation reussi")
        
    } else {
        console.warn("Pas bien reussi")
    }
    emit('reportAchat', 2)
    emit('approFileClose', 0)
})
</script>
