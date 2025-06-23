<template>
    <div class="info-class">
        <table>
            <thead>
                <tr>
                    <td>
                        <label for="">
                            Nom
                        </label>
                        <input type="text" placeholder="Nom de Pharmacie"/>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <label for="">
                            Tél
                        </label>
                        <input type="text" placeholder="Contact"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="">
                            Avenue
                        </label>
                        <input type="text" placeholder="description courte (5 lettres)"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="">
                            Quartier
                        </label>
                        <input type="text" placeholder="_"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="">
                            Commune
                        </label>
                        <input type="text" placeholder="_"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="">
                            Province
                        </label>
                        <input type="text" placeholder="_"/>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td>
                        <label for="">
                            Mot de passe
                        </label>
                        <input type="text" placeholder="_"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="">
                            Mot de passe
                        </label>
                        <input type="text" placeholder="_"/>
                    </td>
                </tr>
            </tfoot>
        </table>
       
    </div>
    <div> 
        <button class="clk">Confirmer</button>
    </div>
</template>

<style scoped>
.info-class{
    display: flex;
    flex-direction: columns;
    justify-content: center;
    
    color: white;
}
table{
    text-align: right;
}
input{
    background-color: rgba(134, 252, 55, 0.911);
    margin: 3px 0;
}
button{
    position: relative;
    padding:  5px 10px;
    left: 5%;
    border-radius: 8px;
}
label{
    background: rgba(134, 252, 55, 0.911);
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    padding-left: 5px;
}
</style>