<template>
    <div>
        <div v-for="(umuti, index) in imitiset" v-show="umuti.name_umuti" 
            style="display: inline-block ;"  @click.prevent="umutiOpen($event)">
                <a :title="umuti.name_umuti" 
            href="http://" target="_blank" rel="noopener noreferrer"
                class="umutiContent">
                    <div :id="index" class="umuti">
                        <div class="umutiTitle">
                            {{ (umuti.name_umuti).slice(0,7) }}<span v-show="(umuti.name_umuti).length > 8">...</span>
                            
                        </div>
                        
                        <div class="umutiPrice">{{ umuti.price_out }}</div>
                    </div>
                </a>
        </div>
    </div>
    
    
    
</template>
<script lang="ts">
import { 
    defineComponent, reactive, ref, onUpdated,
    inject, watch,
} from 'vue'
import { UmutiSet } from '../layout/types'
export default defineComponent ({
    setup(_, {emit}) {
        const data = reactive({})
        const imitiset:UmutiSet[] = ref([])
        const imitiset_copy:UmutiSet[] = ref([])
        let codes = new Array()
        let imiti_for_search = []

        const needUpdate = inject('needUpdate_list')
        const need_search = inject('needSearch')
        var shouldUpdate = needUpdate

        const search_umuti = (value)=>{
            // value.field
            let fieldname = 'name_umuti'
            if (value.field){
                fieldname = value.field
            } else {
                fieldname = 'name_umuti'
            }
            return imiti_for_search.filter((element)=>{
                return (String(element[fieldname])).toLowerCase().match((String(value.query)).toLowerCase())
            })
        }

        const showUmuti = (code:number) => {
            if(code){
                let umuti: UmutiSet = imitiset.value[code]
                emit('actualUmuti', umuti)
            } else {
                console.log("null is selected")
            }
            
            // console.log("attempting to emit 1")
            // console.log("You selected umuti: ", umuti)
        }
        const umutiOpen = (value)=>{
            // updateImitiSet()
            console.log("And the ID is : ", (value.target.parentNode.parentNode).innerHTML)
            const current = (value.target.parentNode)
            const code = current.getAttribute("id")
            console.log("ID : ", code)
            showUmuti(code)
            // updateImitiSet() // disabling constant update on each selecting umuti
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

        const kuvomaImiti = async () => {
            const base = '//muteule.pythonanywhere.com'
            const prefix = 'api/out/dispo/'

            try {
                const response = await fetch(`${base}/${prefix}`)
                
                if (response.ok){
                    data.value = await response.json()
                    console.log("THings are well received", data.value)
                    updateImitiSet()
                    update_imiti_for_search()
                    // console.log("ImitiSet has lenght: ", data.value.length)
                }
            } catch (value){
                console.log("somehting may not be well because :", value)
            }
        }
        kuvomaImiti ()

        const updateImitiSet = ()=>{
            imitiset.value = []
            // console.log("ImitiSet has lenght: ", data.value.length)
            let  i = 1
            data.value.forEach(element => {
                let obj:UmutiSet = {
                    'code_umuti' : element.code_umuti,
                    'id' : i,
                    'name_umuti' : element.name_umuti,
                    'description_umuti' : element.description_umuti,
                    'date_last_vente' : new Date(element.date_last_vente),
                    'price_in' : element.price_in,
                    'price_out' : element.price_out,
                    'difference' : element.difference,
                    'qte_entrant_big' : element.qte_entrant_big,
                    'quantite_restant' : element.quantite_restant,
                    'ratio_type' : element.ratio_type,
                    'type_in' : element.type_in,
                    'type_out' : element.type_out,
                    'type_umuti' : element.type_umuti,
                    'location' : element.location,
                    'lot' : element.lot
                }
                imitiset.value.push(obj)
                // imitiset_copy.value.push(obj)
                // console.log("voici: ", obj)
            });
            console.log("Compiled : ", imitiset.value)
            imitiset_copy.value = imitiset.value
        }

        const update_imiti_for_search = ()=>{
            imitiset.value.forEach(element => {
                let obj = {
                    'code_umuti' : element.code_umuti,
                    'date_last_vente' : element.date_last_vente,
                    'description_umuti' : element.description_umuti,
                    'location': element.location,
                    'lot': element.lot,
                    'name_umuti': (element.name_umuti),
                    'price_in' : element.price_in,
                    'price_out' : element.price_out,
                    'qte_entrant_big' : element.qte_entrant_big,
                    'quantite_restant': element.quantite_restant,
                    'type_in': element.type_in,
                    'type_out' : element.type_out,
                    'type_umuti' : element.type_umuti,
                }
                
                imiti_for_search.push(obj)
            });
        }
        // updateImitiSet()

        // onUpdated(()=>{
        //     // updateImitiSet()
        // })
        watch(shouldUpdate, (value)=>{
            console.log("onUpdated, needToUpdate:..", value)
            if(value){
                emit('allImiti', imitiset)
            }
        })
        watch(need_search, (value)=>{
            // console.log("You want to search in list-imiti: ", value)
            let queryset = search_umuti(value.value)
            
            if(queryset && value.value.query.length > 0 && value.value.response==1){
                emit('allImiti', queryset)
                // console.log("emitted on need_search")
            } else if(queryset && value.value.query.length > 0 && value.value.response==0){
                imitiset.value = queryset
            } else if(value.value.query.length == 0){
                imitiset.value = imitiset_copy.value
            }
            if(queryset.length == 0 && value.value.query.length > 4){
                emit('emptyResult', 1)
            } else if(queryset.length == 0 && value.value.query.length < 5){
                emit('emptyResult', 0)
            }
        })


        return {
            imiti, imitiset,
            umutiOpen,
            updateImitiSet,
        }
    },
})
</script>
<style scoped>
.umuti{
    width: 10vw;
    height: 14vh;
    background-color: black;
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
/* .umutiContent:active .umuti
{
    background-color: rgb(11, 245, 11);
    box-shadow: 0 0 25px white;
} */
.umutiContent:focus{
    background-color: black;
    border-radius: 25px;
    box-shadow: 0 0 25px black;
}
</style>
