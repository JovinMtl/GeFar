<template>
    <div class="c-w">
        Here we will enter an ID of a med and:
        be able to see wether its presence in umutiEntree, UmutiSold, UmutiSet.
        and be able to modify (prix_achat or prix_vente or date)
        <div>
            <input class="inp inpShape" type="text"> 
            <button>Compilé</button>
            <button>Achats</button>
            <button>Autre</button>
        </div>
        
    </div>
</template>

<style scoped>
.inp{
    /* background-color: rgb(34, 116, 163); */
    /* background: linear-gradient(to right, red, blue); */
    width: 200px;
    /* color: white; */
    color: black;
    padding: 15px;
    text-align: center;
}
button{
    margin: 0 20px;
    padding: 10px;
    background-color: grey;
    border-radius: 8px;
}
</style>