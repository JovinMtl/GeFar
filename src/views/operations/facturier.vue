<template>
    <div class="factureContainer">
        <!-- <div class="factuTitle">
            <h3>DAWA - PHARMA: FACTURE</h3>
        </div> -->
        <div class="factuContent">
            <div class="factuHead">DAWA - PHARMA: FACTURE</div>
            <div class="factuBody">
                <!-- Voici: {{ message }}. <br>
                Defini: {{ commandePatient }} -->
                <div class="content">
                    <div class="number"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const message = "facture"
const props = defineProps(['commandePatient'])

console.log("Facturier INITIALIZED: ", props.value)

// Has to launch print functionality at the mount cycle
</script>
<style lang="scss" scoped>

@media only print {
    @page{
        size: 8cm 10cm
    }
    .factureContainer{
        width: 100%;
        height: 100%;
        background-color: gray;
        font-size: .4rem;

        .factuHead{
            text-align: center;
            margin: 25px 0px;
            font-size: 1.1rem;
            background-color: red;
        }
        .factuBody{
            padding: 15px;

            .content{
                background: white;
                width: 100%;
                height: 20px;

                .number{
                }
            }
        }
    }
    
    
    
    
}

</style>