<template>
    <div>
        Ici on gere des approvisionnement
        <br> <br>
        <input type="text" placeholder="Nom du medicament">
        
        <br> <br>
        <label>Type de medicament</label>
        <select placeholder="Type" value="Ovule">
            <option>Cp</option>
            <option>Gel</option>
            <option>Ovule</option>
            <option>Sirop</option>
            <option>Inj</option>
            <!-- <option>Inj</option> -->
        </select>
        <br> <br>
        <textarea style="border-radius: 15px;" name="description" placeholder="Description du medicament" id="" cols="30" rows="10"></textarea>
        <input type="text" placeholder="ratio: 1 : 1">
        <br><br>
        <input type="text" placeholder="Nom du medicament">
        <br> <br>
        <input type="text" placeholder="Type in">
        <br> <br>
        <input type="text" placeholder="Type out">
        <br><br>
        <br> <br>
        <input type="text" placeholder="Price in">
        <br> <br>
        <input type="text" placeholder="Price out">
        <br> <br>
        <input type="text" placeholder="Quantite Initial">
        <br> <br>
        <input type="text" placeholder="Localisation">
        <br>
        <label>Date d'exp. </label>
        <input type="date" placeholder="Nom du medicament">
        <br>
    </div>
</template>
<script>
export default {
    setup() {
        return {

        }
    },
}
</script>

<style scoped>
input, textarea{
    background-color: rgba(25, 255, 25, 0.6);
    background-color: rgba(25, 255, 25, 0.521);
    color: black;
}
</style>