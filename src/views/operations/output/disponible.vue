<template>
    <div class="dispoContainer">
        <div class="dispoHeader">
           <span style="font-weight: 600">DAWA - PHARMA : RAPPORT</span>  <br>
           <span style="color: gray;"><u>Disponible du 01 au 15 Juin.</u> </span> 
        </div>
        <div class="dispoBody">
            <div class="controlContent" style="display: block;width: 100%; height: 20px; background-color: rgba(255, 255, 255, 0.5);margin-bottom: 5px;
                        border: 1px solid white;">
                <div class="contentElement11">
                    <!-- {{ index + 1 }} -->
                      #
                </div> 
                <div class="contentElement2">
                    <!-- {{ umuti.name_umuti }} -->
                      Nom
                </div> <div class="contentElement3">
                    <!-- {{ (umuti.quantite_restant || umuti.quantity ) }} -->
                      Qte
                </div>

                <div class="contentElement3">
                    <!-- {{ umuti.price_out }} -->
                      P.U
                </div>

                <div class="contentElement3">
                    <!-- {{ umuti.price_out * (umuti.quantite_restant || umuti.quantity) }} -->
                      P.T
                </div> 

                <div class="contentElement4">
                    <!-- {{ (umuti.date_last_vente 
                    || umuti.date_operation || 
                    umuti.date_winjiriyeko ||
                    '_____________').slice(6,10) }} -->
                    Date
                </div>

                <div class="contentElement4">
                <!-- {{ umuti.location }} -->
                  Location
                </div>

                <div class="contentElement4">
                    <!-- {{ umuti.type_umuti }} -->
                      Type
                </div>
            </div>
        </div>
        <div class="dispoFooter"></div>
    </div>
</template>
<script setup lang="ts">
// Date_debut & date_fin should be given through props
</script>
<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap');

@media only print {
    // @page{
    //     size: A4;
    // }
    .dispoContainer{
        background: gray;
        width: 100%;
        height: 100%;
        padding: 10px;
        color: black;

        .dispoHeader{
            width: 100%;
            height: 8%;
            background-color: white;
            text-align: center;
            align-content: center;
            font-size: 1.375rem;
            font-family: monospace;
            // font-family: Orbitron;
        }
        .dispoBody{
            // background-color: red;
            margin-top: 5px;

            .controlContent{
                display: block;
                width: 100%; height: 20px; 
                background-color: green;
                margin-bottom: 5px;
                border: 1px solid white;

                .contentElement11{
                    display: inline-flex;
                    background-color: white; 
                    width: 4%;height: 100%; 
                    color: green;
                }
                .contentElement2{
                    display: inline-flex;
                    background-color: transparent; 
                    width: 20%;height: 100%;
                }
                .contentElement3{
                    display: inline-flex;
                    background-color: transparent; 
                    width: 15%;height: 100%;
                }
                .contentElement4{
                    display: inline-flex;
                    background-color: transparent; 
                    width: 10%;height: 100%;
                }
            }
        }
    }
}
</style>
