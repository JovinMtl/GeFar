<template>
    <div class="dispoContainer">
        <div class="dispoHeader">
           <span style="font-weight: 600">DAWA - PHARMA : RAPPORT</span>  <br>
           <span style="color: gray;"><u>Disponible du 01 au 15 Juin.</u> </span> 
        </div>
        <div class="dispoBody">
            <div v-for="(umuti, index) in actual_imitiS" class="controlContent" style="display: block;width: 100%; height: 20px; background-color: rgba(255, 255, 255, 0.5);margin-bottom: 5px;
                        border: 1px solid white;">
                <div class="contentElement11">
                    {{ index + 1 }}
                </div> 
                <div class="contentElement2">
                    {{ umuti.name_umuti }}
                </div> <div class="contentElement3">
                    {{ (umuti.quantite_restant || umuti.quantity ) }}
                </div>

                <div class="contentElement3">
                    {{ umuti.price_out }}
                </div>

                <div class="contentElement3">
                    {{ umuti.price_out * (umuti.quantite_restant || umuti.quantity) }}
                </div> 

                <div class="contentElement4">
                    {{ (umuti.date_last_vente 
                    || umuti.date_operation || 
                    umuti.date_winjiriyeko ||
                    '_____________').slice(6,10) }}
                </div>

                <div class="contentElement4">
                {{ umuti.location }}
                </div>

                <div class="contentElement4">
                    {{ umuti.type_umuti }}
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

@media only print {
    @page{
        size: A4;
    }
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
        }
        .dispoBody{
            background-color: red;

            .controlContent{
                display: block;
                width: 100%; height: 20px; 
                background-color: transparent;
                margin-bottom: 5px;
                border: 1px solid white;
            }
        }
    }
}
</style>
