<template>
    <div class="factureContainer">
            <div class="factuHead">
                <span style="font-weight: 600;">PHARMACIE UBUZIMA </span><br>
                Facture n. {{ num_facture }}/{{ year }}</div>
            <div class="factuBody">
                <div class="content">
                    <div class="number"></div>
                    <div class="nom_med">Médicament</div>
                    <div class="qte">Qte</div>
                    <div class="qte"></div>
                    <div class="Pu">P.U</div>
                    <div class="ptotal">P.Total</div>
                </div>

                <div class="content2" v-for="(umuti, index) in props.commandePatient[0]">
                    <div class="number">{{ index + 1 }}.</div>
                    <div class="nom_med">{{ (String(umuti.nom_med)).slice(0,18) }}</div>
                    <div class="qte">{{ umuti.qte }}</div>
                    <div class="qte"></div>
                    <div class="Pu">{{ umuti.prix_vente }}</div>
                    <div class="ptotal">{{ umuti.qte * umuti.prix_vente }} Fbu</div>
                </div>

                <div class="toTal sepA m-25">
                    <div class="number"></div>
                    <div class="nom_med">TOTAL</div>
                    <div class="qte">--</div>
                    <div class="qte"></div>
                    <div class="Pu">--</div>
                    <div class="ptotal">
                        {{ (String(props.commandePatient[1].value)).replaceAll("\"",'') }} Fbu
                    </div>
                </div>
                <div class="toTal rm-m">
                    <div class="number"></div>
                    <div class="nom_med">ASSUREUR: {{ props.assureur }}  ({{ props.assure_rate }} %)</div>
                    <div class="qte">--</div>
                    <div class="qte"></div>
                    <div class="Pu">--</div>
                    <div class="ptotal">{{ assured }} Fbu</div>
                </div>
                <div class="toTal rm-m">
                    <div class="number"></div>
                    <div class="nom_med">NET. à Payer</div>
                    <div class="qte">--</div>
                    <div class="qte"></div>
                    <div class="Pu">--</div>
                    <div class="ptotal">{{ reste }} Fbu</div>
                </div>
            </div>
            <div class="authorizer">
                Servi par: {{ username }} <br>
                Date     : {{ new Date().toISOString().substring(0,10) }}
            </div>
            <div class="factuFooter">
                 <div class="conf">
                    Pharmacie UBUZIMA.  NIF: 40000230011 <br>  
                   Tel: +257 <b>79 568 767</b>
                    </div>
                 <div class="address">Kamenge, 13è Av. Bujumbura - Burundi</div>
            </div>
    </div>
    <div id="modalElm" class="modal" @click.stop="console.log('You want the modal')">
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

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import useReadable from '../hooks/useReadable'

const message = "facture"
const props = defineProps([
    'commandePatient', 'num_facture', 
    'username', 'assure_rate','assureur'
])
const emit = defineEmits(['factureActive'])

const year: String = String(new Date()).slice(11,15)
const reste: Ref<String> = ref('')
const assured: Ref<String> = ref('')
const total: Ref<number> = ref(0)

// console.log("Facturier INITIALIZED: ", props)
// console.log("THe first thing: ", props.commandePatient[0], "second: ", props.commandePatient[1])
// console.log("Assureur: ", props.assureur)
// console.log("assure_rate:", props.assure_rate)

// Functions
const makeTotal = ()=>{
    // console.log("The INPUT of total:", props.commandePatient[0])
    // console.log("and:", props.commandePatient[0])
    props.commandePatient[0].forEach((elm)=>{
        total.value += (elm.prix_vente * elm.qte)
    })
    // console.log("the Total found:", total.value)
}
const printerF = async () => {
    window.print()
    emit("factureActive")
}
const closeFacturier = ()=>{
    // emitting a signal for closing / unmounting
    emit("factureActive")
}
// Execution
makeTotal()
let assure_value = total.value * (props.assure_rate / 100)
assured.value = useReadable(assure_value)
reste.value = useReadable(total.value - assure_value)

// END
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
    .nom_med{
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
    // text-align: right;
    text-align: center;
}

@media only print {
    
   // @page{
    //   size: 8cm 10cm
   //  }
    // @page{
     //    size: 72mm 100mm;
    // }
    
    *{
        padding: 0;
        margin: 0;
    }
    .modal{
        display: none;
        position: absolute;
    }
    .factureContainer{
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: white;
        font-size: .6rem;
        // font-family: monospace;
        font-family: Flexi;


        .factuHead{
            display: block;
            width: 100%;
            height: 10%;
            text-align: center;
            align-content: center;
            // margin: 25px 0px;
            font-size: 1rem;
            //border-bottom: 2px solid #000;
        }
        .factuBody{
            display: block;
            width: 100%;
            height: 70%;
            padding: 5px;
            // background: blue;

            .content{
                border: 1px dashed black;
                @include content();
                .ptotal{
                    text-align: right;
                }
            }
            .content2 {
                margin-top: 5px;
                @include content;
                height: 15px;
                .ptotal{
                    text-align: right;
                }
            }
            .toTal {
                @include content;
                height: 15px;
                .ptotal{
                    text-align: right;
                }
                
            }
            .m-25{
                margin-top: 25px;
            }
            .sepA{
                border-top: 2px solid black;
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