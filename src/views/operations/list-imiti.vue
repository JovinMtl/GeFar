<template>
    <div>
        <div v-for="(umuti, index) in imiti" v-show="umuti.name" 
            style="display: inline-block ;"  @click.prevent="umutiOpen($event)">
                <a :title="umuti.code" :id="index"
            href="http://" target="_blank" rel="noopener noreferrer"
                class="umutiContent">
                    <div class="umuti">
                        <div class="umutiTitle">
                            {{ umuti.name }}
                        </div>
                        
                        <div class="umutiPrice">{{ umuti.price_out }}</div>
                    </div>
                </a>
        </div>
    </div>
    
    
    
</template>
<script>
export default {
    setup() {
        let codes = new Array()
        const umutiOpen = (value)=>{
            console.log("And the ID is : ", (value.target.parentNode.parentNode).innerHTML)
            const current = (value.target.parentNode.parentNode)
            const code = current.getAttribute("title")
            console.log("ID : ", code)
        }
        
        const imiti = [
            {
                'code':'', //1: igizwe n'indome zitatu hamwe n'ibiharuro bibiri
                'name':'',  //2: ingene witwa. hazoba affiche 15caracteres
                'description':'',//3: ukwo ukoreshwa hamwe n'ico ukora
                'type': 'Flacon, comprime, tube', //4: ubwoko bwawo
                'type_in': 'carton', //5: kurangura
                'type_out': 'plaquette', //6: kudetailla
                'price_in':'', //7: ayo Carton/plaquette yaranguwe
                'price_out':'', //8: ayo plaquette tuyidandaza
                'difference': '', //9: benefice
                'quantite_restant': '' ,//10: plaquette zisigaye
                'location': '', //11: ni nka cote yaho wowusanga vyoroshe
                //kuri buri date hari hakwiye kuboneka iyihari yayo na COTE
                //haca hakora gestion par LOT ivanze na FIFO
                //LOT yokwisunga DATE de Peremption, 
                //hama Prix ikaba dernier entree

                //uyi selectionye ice yerekana(muri partie gauche) 
                //ama lot arimwo hamwe na contenu yayo
                //Par selection haze a gauche: 2, 1, 4, 3, 10:6(nombres total),
                // 8, LOT(date_peremption) A|B|C

                //NB: Uyo muti ntuja mugaseke hatabonetse LOT
                'date_peremption':'',
            },
            {
                'code':'QUI23',
                'name':'Quinine',
                'description':'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_out': 'plaquette',
                'price_in':'1000', 
                'price_out':'1300',
                'difference': '300',
                'quantite_restant': '25' ,
                'location': 'A#2#3#',
                'date_peremption':'Jan 2025',
            },
            {
                'code':'AMO23',
                'name':'Quinine',
                'description':'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_out': 'plaquette',
                'price_in':'800', 
                'price_out':'1100',
                'difference': '300',
                'quantite_restant': '25' ,
                'location': 'A#2#9#',
                'date_peremption':'Jan 2025',
            },
            {
                'code':'QUI23',
                'name':'Quinine',
                'description':'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_out': 'plaquette',
                'price_in':'1000', 
                'price_out':'1300',
                'difference': '300',
                'quantite_restant': '25' ,
                'location': 'A#2#3#',
                'date_peremption':'Jan 2026',
            },
            {
                'code':'AMO23',
                'name':'Betadine',
                'description':'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_out': 'plaquette',
                'price_in':'7000', 
                'price_out':'8100',
                'difference': '300',
                'quantite_restant': '25' ,
                'location': 'A#2#9#',
                'date_peremption':'Jan 2025',
            },
            {
                'code':'AMO23',
                'name':'Quinine',
                'description':'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_out': 'plaquette',
                'price_in':'800', 
                'price_out':'1100',
                'difference': '300',
                'quantite_restant': '25' ,
                'location': 'A#2#9#',
                'date_peremption':'Jan 2025',
            },
            {
                'code':'AMO23',
                'name':'Quinine',
                'description':'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_out': 'plaquette',
                'price_in':'800', 
                'price_out':'1100',
                'difference': '300',
                'quantite_restant': '25' ,
                'location': 'A#2#9#',
                'date_peremption':'Jan 2025',
            },
            {
                'code':'AMO23',
                'name':'Quinine',
                'description':'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_out': 'plaquette',
                'price_in':'800', 
                'price_out':'1100',
                'difference': '300',
                'quantite_restant': '25' ,
                'location': 'A#2#9#',
                'date_peremption':'Jan 2025',
            },
            {
                'code':'AMO23',
                'name':'Quinine',
                'description':'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_out': 'plaquette',
                'price_in':'800', 
                'price_out':'1100',
                'difference': '300',
                'quantite_restant': '25' ,
                'location': 'A#2#9#',
                'date_peremption':'Jan 2025',
            },
            {
                'code':'AMO23',
                'name':'Quinine',
                'description':'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_out': 'plaquette',
                'price_in':'800', 
                'price_out':'1100',
                'difference': '300',
                'quantite_restant': '25' ,
                'location': 'A#2#9#',
                'date_peremption':'Jan 2025',
            },
            {
                'code':'AMO23',
                'name':'Quinine',
                'description':'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_out': 'plaquette',
                'price_in':'800', 
                'price_out':'1100',
                'difference': '300',
                'quantite_restant': '25' ,
                'location': 'A#2#9#',
                'date_peremption':'Jan 2025',
            },
            {
                'code':'AMO23',
                'name':'Quinine',
                'description':'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_out': 'plaquette',
                'price_in':'800', 
                'price_out':'1100',
                'difference': '300',
                'quantite_restant': '25' ,
                'location': 'A#2#9#',
                'date_peremption':'Jan 2025',
            },
            {
                'code':'AMO23',
                'name':'Quinine',
                'description':'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_out': 'plaquette',
                'price_in':'800', 
                'price_out':'1100',
                'difference': '300',
                'quantite_restant': '25' ,
                'location': 'A#2#9#',
                'date_peremption':'Jan 2025',
            },
            {
                'code':'AMO23',
                'name':'Quinine',
                'description':'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_out': 'plaquette',
                'price_in':'800', 
                'price_out':'1100',
                'difference': '300',
                'quantite_restant': '25' ,
                'location': 'A#2#9#',
                'date_peremption':'Jan 2025',
            },
            {
                'code':'AMO23',
                'name':'Quinine',
                'description':'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_out': 'plaquette',
                'price_in':'800', 
                'price_out':'1100',
                'difference': '300',
                'quantite_restant': '25' ,
                'location': 'A#2#9#',
                'date_peremption':'Jan 2025',
            },
            {
                'code':'AMO23',
                'name':'Quinine',
                'description':'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_out': 'plaquette',
                'price_in':'800', 
                'price_out':'1100',
                'difference': '300',
                'quantite_restant': '25' ,
                'location': 'A#2#9#',
                'date_peremption':'Jan 2025',
            },
            {
                'code':'AMO23',
                'name':'Quinine',
                'description':'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_out': 'plaquette',
                'price_in':'800', 
                'price_out':'1100',
                'difference': '300',
                'quantite_restant': '25' ,
                'location': 'A#2#9#',
                'date_peremption':'Jan 2025',
            },
            {
                'code':'AMO23',
                'name':'Quinine',
                'description':'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_out': 'plaquette',
                'price_in':'800', 
                'price_out':'1100',
                'difference': '300',
                'quantite_restant': '25' ,
                'location': 'A#2#9#',
                'date_peremption':'Jan 2025',
            },
            {
                'code':'AMO23',
                'name':'Quinine',
                'description':'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_out': 'plaquette',
                'price_in':'800', 
                'price_out':'1100',
                'difference': '300',
                'quantite_restant': '25' ,
                'location': 'A#2#9#',
                'date_peremption':'Jan 2025',
            },
            {
                'code':'AMO23',
                'name':'Quinine',
                'description':'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_out': 'plaquette',
                'price_in':'800', 
                'price_out':'1100',
                'difference': '300',
                'quantite_restant': '25' ,
                'location': 'A#2#9#',
                'date_peremption':'Jan 2025',
            },
            {
                'code':'AMO23',
                'name':'Quinine',
                'description':'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_out': 'plaquette',
                'price_in':'800', 
                'price_out':'1100',
                'difference': '300',
                'quantite_restant': '25' ,
                'location': 'A#2#9#',
                'date_peremption':'Jan 2025',
            },
            {
                'code':'AMO23',
                'name':'Quinine',
                'description':'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_out': 'plaquette',
                'price_in':'800', 
                'price_out':'1100',
                'difference': '300',
                'quantite_restant': '25' ,
                'location': 'A#2#9#',
                'date_peremption':'Jan 2025',
            },
            {
                'code':'AMO23',
                'name':'Quinine',
                'description':'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_out': 'plaquette',
                'price_in':'800', 
                'price_out':'1100',
                'difference': '300',
                'quantite_restant': '25' ,
                'location': 'A#2#9#',
                'date_peremption':'Jan 2025',
            },
            {
                'code':'AMO23',
                'name':'Quinine',
                'description':'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_out': 'plaquette',
                'price_in':'800', 
                'price_out':'1100',
                'difference': '300',
                'quantite_restant': '25' ,
                'location': 'A#2#9#',
                'date_peremption':'Jan 2025',
            },
            {
                'code':'AMO23',
                'name':'Quinine',
                'description':'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_out': 'plaquette',
                'price_in':'800', 
                'price_out':'1100',
                'difference': '300',
                'quantite_restant': '25' ,
                'location': 'A#2#9#',
                'date_peremption':'Jan 2025',
            },
            {
                'code':'AMO23',
                'name':'Quinine',
                'description':'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_out': 'plaquette',
                'price_in':'800', 
                'price_out':'1100',
                'difference': '300',
                'quantite_restant': '25' ,
                'location': 'A#2#9#',
                'date_peremption':'Jan 2025',
            },
            {
                'code':'AMO23',
                'name':'Quinine',
                'description':'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_out': 'plaquette',
                'price_in':'800', 
                'price_out':'1100',
                'difference': '300',
                'quantite_restant': '25' ,
                'location': 'A#2#9#',
                'date_peremption':'Jan 2025',
            },
            {
                'code':'AMO23',
                'name':'Quinine',
                'description':'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_out': 'plaquette',
                'price_in':'800', 
                'price_out':'1100',
                'difference': '300',
                'quantite_restant': '25' ,
                'location': 'A#2#9#',
                'date_peremption':'Jan 2025',
            },
            {
                'code':'AMO23',
                'name':'Quinine',
                'description':'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_out': 'plaquette',
                'price_in':'800', 
                'price_out':'1100',
                'difference': '300',
                'quantite_restant': '25' ,
                'location': 'A#2#9#',
                'date_peremption':'Jan 2025',
            },
            {
                'code':'AMO23',
                'name':'Quinine',
                'description':'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_out': 'plaquette',
                'price_in':'800', 
                'price_out':'1100',
                'difference': '300',
                'quantite_restant': '25' ,
                'location': 'A#2#9#',
                'date_peremption':'Jan 2025',
            },
            {
                'code':'AMO23',
                'name':'Quinine',
                'description':'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_out': 'plaquette',
                'price_in':'800', 
                'price_out':'1100',
                'difference': '300',
                'quantite_restant': '25' ,
                'location': 'A#2#9#',
                'date_peremption':'Jan 2025',
            },
            {
                'code':'AMO23',
                'name':'Quinine',
                'description':'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_out': 'plaquette',
                'price_in':'800', 
                'price_out':'1100',
                'difference': '300',
                'quantite_restant': '25' ,
                'location': 'A#2#9#',
                'date_peremption':'Jan 2025',
            },
            {
                'code':'AMO23',
                'name':'Quinine',
                'description':'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_out': 'plaquette',
                'price_in':'800', 
                'price_out':'1100',
                'difference': '300',
                'quantite_restant': '25' ,
                'location': 'A#2#9#',
                'date_peremption':'Jan 2025',
            },
            {
                'code':'AMO23',
                'name':'Quinine',
                'description':'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_out': 'plaquette',
                'price_in':'800', 
                'price_out':'1100',
                'difference': '300',
                'quantite_restant': '25' ,
                'location': 'A#2#9#',
                'date_peremption':'Jan 2025',
            },
            {
                'code':'AMO23',
                'name':'Quinine',
                'description':'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_out': 'plaquette',
                'price_in':'800', 
                'price_out':'1100',
                'difference': '300',
                'quantite_restant': '25' ,
                'location': 'A#2#9#',
                'date_peremption':'Jan 2025',
            },
            {
                'code':'AMO23',
                'name':'Quinine',
                'description':'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_out': 'plaquette',
                'price_in':'800', 
                'price_out':'1100',
                'difference': '300',
                'quantite_restant': '25' ,
                'location': 'A#2#9#',
                'date_peremption':'Jan 2025',
            },
            {
                'code':'AMO23',
                'name':'Quinine',
                'description':'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_out': 'plaquette',
                'price_in':'800', 
                'price_out':'1100',
                'difference': '300',
                'quantite_restant': '25' ,
                'location': 'A#2#9#',
                'date_peremption':'Jan 2025',
            },
            {
                'code':'AMO23',
                'name':'Quinine',
                'description':'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_out': 'plaquette',
                'price_in':'800', 
                'price_out':'1100',
                'difference': '300',
                'quantite_restant': '25' ,
                'location': 'A#2#9#',
                'date_peremption':'Jan 2025',
            },
            {
                'code':'AMO23',
                'name':'Quinine',
                'description':'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_out': 'plaquette',
                'price_in':'800', 
                'price_out':'1100',
                'difference': '300',
                'quantite_restant': '25' ,
                'location': 'A#2#9#',
                'date_peremption':'Jan 2025',
            },
        ]
        
        const constructUniqueCodes = ()=>{
            imiti.forEach((obj)=>{
                if(!codes.includes(obj.code)){
                    codes.push(obj.code)
                }
            })
            codes = codes.sort()
            console.log("The Sorted Codes is: ", codes)
        }

      /**
 * Constructs a dictionary from the provided code array.
 * @param {Array} code - The input array from which the dictionary is constructed.
 */
        const makeDictionaryImiti = (code)=>{
            let imitiDict = []
            for(let i=0;i<code.length; i++){
                imitiDict.code = code[i]
                imitiDict.name = ''
                imitiDict.lot = ''
            }
            console.log("Imiti Dict is : ", imitiDict)
        }
        constructUniqueCodes()
        makeDictionaryImiti(codes)

        const compileImiti = ()=>{}

        return {
            imiti,
            umutiOpen,
        }
    },
}
</script>
<style scoped>
.umuti{
    width: 10vw;
    height: 12vh;
    background-color: black;
    /* background-color: gray; */
    border-radius: 15px;
    padding: 0px 5px;
    margin: 10px 5px; /* Space between imiti */
    box-shadow: 0 0 20px black;
    transition-delay: 0.1s;
    transition-property: all;
}
.umutiTitle{
    width: 100%;
    height: 70%;
    /* background-color: rgb(11, 245, 11); */
    text-align: center;
    align-items: center;
    align-content: center;
}
.umutiPrice{
    width: 100%;
    height: 30%;
    /* background-color: black; */
    text-align: center;
    border-top: 1px solid rgb(11, 245, 11);
    font-weight: 500;
    font-size: .8rem;

}
.umutiContent{
    display: inline-flex;
    text-decoration: none; 
    color: white;
}
.umutiContent:active .umuti
{
    background-color: rgb(11, 245, 11);
    box-shadow: 0 0 25px white;
}
</style>
