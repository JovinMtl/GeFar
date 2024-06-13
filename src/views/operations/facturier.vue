<template>
    <div class="factureContainer">
        <!-- <div class="factuTitle">
            <h3>DAWA - PHARMA: FACTURE</h3>
        </div> -->
        <!-- <div class="factuContent"> -->
            <div class="factuHead">
                <span style="font-weight: 600;">DAWA - PHARMA </span><br>
                Facture n. 5/2024</div>
            <div class="factuBody">
                <div class="content">
                    <div class="number"></div>
                    <div class="name_umuti">Médicament</div>
                    <div class="qte">Qte</div>
                    <div class="Pu">P.U</div>
                    <div class="ptotal">P.Total</div>
                </div>

                <div class="content2" v-for="(umuti, index) in props.commandePatient[0]">
                    <div class="number">{{ index + 1 }}.</div>
                    <div class="name_umuti">{{ umuti.name_umuti }}</div>
                    <div class="qte">{{ umuti.qte }}</div>
                    <div class="Pu">{{ umuti.price_out }}</div>
                    <div class="ptotal">{{ umuti.qte * umuti.price_out }} Fbu</div>
                </div>

                <div class="toTal">
                    <div class="number"></div>
                    <div class="name_umuti">TOTAL</div>
                    <div class="qte">--</div>
                    <div class="Pu">--</div>
                    <div class="ptotal">{{ props.commandePatient[1] }} Fbu</div>
                </div>
            </div>
            <div class="authorizer">
                Servi par: Muteule <hr>
                Date     : {{ new Date().toISOString().substring(0,10) }}
            </div>
            <div class="factuFooter">
                <!-- Footer <hr> addres -->
                <!-- <button >print</button> -->
                 <div class="conf">Dawa-Pharma.  NIF: 40000230011</div>
                 <div class="address">Kamenge, 14è Av. Bujumbura - Burundi</div>
            </div>
        <!-- </div> -->
    </div>
    <div class="modal" @click.stop="console.log('You want the modal')">
        <div class="modalHeader">
           <h1>Opération réussie. </h1> 
        </div>
        <div class="modalBody">
            <span style="font-size: 1.375rem; font-weight: 600">Voulez-vous Imprimer/Sauvegarder la facture ?</span> 
        </div>
        <div class="modalFooter">
            <button style="padding: 5px 15px; margin: 5px 15px; font-size: 1.2rem;" @click="closeFacturier">Non</button>
            <button style="padding: 5px 15px; margin: 5px 15px; font-size: 1.2rem;" @click="printerF">Oui</button>
        </div>
    </div>
</template>

<script setup>
const message = "facture"
const props = defineProps(['commandePatient'])
const emit = defineEmits(['factureActive'])

console.log("Facturier INITIALIZED: ", props)
console.log("THe first thing: ", props.commandePatient[0], "second: ", props.commandePatient[1])

// Has to launch print functionality at the mount cycle
// window.print()
const printerF = async () => {
    window.print()
    emit("factureActive")
}
const closeFacturier = ()=>{
    // emitting a signal for closing / unmounting
    emit("factureActive")
}
</script>
<style lang="scss" scoped>
@media not print {
    .factureContainer{
        display: none;
    }
    .modal{
        // display: flex;
        width: 30%;
        height: 35%;
        background: white;
        border-radius: 25px;

        .modalHeader{
            // display: block;
            width: 100%;
            height: 35%;
            // border: 2px solid green;
            // background: white;
            text-align: center;
            align-content: center;
            background: linear-gradient(to right, #0bf532, red);
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .modalBody{
            // display: block;
            width: 100%;
            height: 35%;
            background: white;
            text-align: center;
        }
        .modalFooter{
            // display: flex;
            width: 100%;
            height: 30%;
            // background-color: red;
            background-color: #0bf532;
            // justify-items: center;
            // align-items: center;
            justify-content: center;
            align-content: center;
            text-align: center;
            border-bottom-left-radius: 25px;
            border-bottom-right-radius: 25px;
        }
    }
}


@mixin content {
    display: flex;
    background: white;
    width: 100%;
    height: 20px;

    .number{
        // display: flex;
        width: 5%;
        height: 100%;
        // background: rgb(255, 0, 212);
        align-content: center;
    }
    .name_umuti{
        width: 50%;
        height: 100%;
        // background: rgb(81, 255, 0);
        align-content: center;
    }
    .qte{
        width: 8%;
        height: 100%;
        // background: rgb(0, 255, 200);
        align-content: center;
    }
    .Pu{
        width: 15%;
        height: 100%;
        // background: rgb(0, 162, 255);
        align-content: center;
    }
    .ptotal{
        width: 22%;
        height: 100%;
        // background: rgb(0, 60, 255);
        align-content: center;
        font-weight: 600;
    }
}
@mixin footer {
    width: 100%;
    height: 10%;
    padding: 0px 15px;
    text-align: right;
}

@media only print {
    
    @page{
        size: 8cm 10cm
    }
    .modal{
        display: none;
    }
    .factureContainer{
        width: 100%;
        height: 100%;
        background-color: white;
        font-size: .6rem;
        font-family: monospace;
        padding-top: 15px;


        .factuHead{
            display: block;
            width: 100%;
            height: 10%;
            text-align: center;
            align-content: center;
            // margin: 25px 0px;
            font-size: 1rem;
            border-bottom: 2px solid gray;
        }
        .factuBody{
            display: block;
            width: 100%;
            height: 70%;
            padding: 15px;
            // background: blue;

            .content{
                border: 1px dashed black;
                @include content();
            }
            .content2 {
                margin-top: 5px;
                @include content;
                height: 15px;
            }
            .toTal {
                margin-top: 25px;
                @include content;
                height: 15px;
            }
        }
        .authorizer{
            @include footer;
        }
        .factuFooter{
            @include footer;
        }
    }
    
    
    
    
}

</style>