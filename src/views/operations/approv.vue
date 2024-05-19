<template>
    <div>
        <h6>Ici on gere des approvisionnement</h6>
        
        <br> <br>
        <input v-model="umutiName" type="text" placeholder="Nom du medicament">
        <hr>
        <ul style="text-align: right;">
            <button class="btnResearch" v-for="umuti in imiti_result">{{ umuti.name_umuti }} {{ umuti.code_umuti }} {{ umuti.description_umuti }}</button>
        </ul>
        
        <br> <br>
        <label>Type de medicament</label>
        <span style="margin-right: .1rem;">&nbsp;</span>
        <select style="background-color: white" placeholder="Type" value="Ovule">
            <option>Cp</option>
            <option>Gel</option>
            <option>Ovule</option>
            <option>Sirop</option>
            <option>Inj</option>
            <!-- <option>Inj</option> -->
        </select>
        <br> <br>
        <textarea style="border-radius: 15px;" name="description" placeholder="Description du medicament" id="" cols="20" rows="3"></textarea>
        <input type="text" placeholder="ratio: 1 : 1">
        <br><br>
        <input type="text" placeholder="Type in: Carton">
        <br> <br>
        <input type="text" placeholder="Type out : Plaquette">
        <br><br>
        <br> <br>
        <input type="text" placeholder="Price in: (Type_in)">
        <br> <br>
        <input type="text" placeholder="Price out : (Type_in)">
        <br> <br>
        <input type="text" placeholder="Quantite Initial">
        <br> <br>
        <input type="text" style="margin-bottom: 5px;" placeholder="Localisation">
        <br>
        <label>Date d'exp. </label> 
        <!-- <br> -->
        <input type="date" placeholder="Nom du medicament">
        <br>
    </div>
</template>
<script>
import { watch, ref, inject, onUpdated, } from 'vue'
export default {
    setup(_, {emit}) {
        var umutiName = ref('')
        const imiti_result = ref([]) 
        var result = inject('imiti_search')
        
        watch(umutiName, (value)=>{
            let obj = {
                'query': value,
                'response': 1 // 1 mentionning that the response should come here
            }
            emit('inputApprov', obj)
        })
        watch(result, (value)=>{
            console.log("Now displaying the found:", value)
            imiti_result.value = value
        })
        return {
            umutiName, imiti_result
        }
    },
}
</script>

<style scoped>
input, textarea{
    background-color: rgba(25, 255, 25, 0.521);
    color: black;
    padding: 5px 5px;
    border-color: transparent;
}
.btnResearch{
    background-color: transparent;
    border: 2px dashed black;
    color: black;
    margin-bottom: 5px;
    padding: 5px 5px;
}
.btnResearch:active{
    background-color: greenyellow;
    border: 2px dashed black;
    color: black;
    margin-bottom: 5px;
    padding: 5px 5px;
}
</style>