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
<style scoped>
/* .factuContent > h3 {
    display: none;
} */
.factuTitle{
    display: flex;
    align-content: center;
    background: linear-gradient(to right, black, green, green);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    width: 100%;
    height: 50px;
}

@media only print {
    @page{
        size: 8cm 10cm
    }
    .factuContent > h3 {
        display: flex;
    }
    .factureContainer{
        /* display: flex; */
        width: 100%;
        height: 100%;
        background-color: gray;
        /* justify-content: center; */
        font-size: .4rem;
        /* margin: 20px; */
    }
    .factuHead{
        text-align: center;
        margin: 25px 0px;
        font-size: 1.1rem;
        background-color: red;
    }
    .factuBody{
        padding: 15px
    }
    .content{
        background: white;
        width: 100%;
        height: 20px
    }
}

</style>