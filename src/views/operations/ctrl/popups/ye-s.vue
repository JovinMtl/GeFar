<template>
    <div style="display: flex; 
                    background-color: transparent;
                    justify-content: center; 
                    align-items: center;" >
        <div class=" bg-w b-r-8 p-h-5">
            Vous etes sûr de vouloir l'Enlever ?   
            Oui ( o )  /   Non ( n ) ?
            
        </div>
        <div>
            <input type="text" class="cnf-cancl" placeholder="?" />
        </div>
        <div>
            <button class="b-r-8 clk bg-b-1">Soumettre</button>
        </div>
    </div>
</template>
<style>
button{
    padding: 5px 10px;
}
input{
    margin: 0 10px;
    text-align: center;
}
input::placeholder{
    text-align: center;
}
.b-r-8{
    border-radius: 5px;
}
.p-h-5{
    padding: 0 5px;
}
</style>