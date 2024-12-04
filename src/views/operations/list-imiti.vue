<template>
    <div>
        <div v-for="(umuti, index) in imitiset" v-show="umuti.nom_med" style="display: inline-block ;"
            @click.prevent="umutiOpen($event)">
            <a :title="umuti.nom_med" href="http://" target="_blank" rel="noopener noreferrer" class="umutiContent">
                <div :id="index" class="umuti">
                    <div class="umutiTitle">
                        {{ (umuti.nom_med).slice(0, 7) }}<span v-show="(umuti.nom_med).length > 8">...</span>

                    </div>

                    <div class="umutiPrice">{{ umuti.prix_vente }}</div>
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
import { useUserStore } from '../../store/user.js'
import { baseURL } from '../../store/host'
export default defineComponent({
    setup(_, { emit }) {
        const data = reactive({})
        const imitiset: UmutiSet[] = ref([])
        const imitiset_copy: UmutiSet[] = ref([])
        let codes = new Array()
        let imiti_for_search = []

        const needUpdate = inject('needUpdate_list') // on search command
        const need_search = inject('needSearch')
        const needUpdate_server = inject('needUpdate_server')
        var shouldUpdate = needUpdate
        const { getAccessToken, getRefreshToken } = useUserStore()

        const search_med = (value) => {
            // value.field
            let fieldname = 'nom_med'
            if (value.field) {
                fieldname = value.field
            } else {
                fieldname = 'nom_med'
            }
            return imiti_for_search.filter((element) => {
                return (String(element[fieldname])).toLowerCase().match((String(value.query)).toLowerCase())
            })
        }

        const showUmuti = (code: number) => {
            if (code) {
                let umuti: UmutiSet = imitiset.value[code]
                emit('actualUmuti', umuti)
            } else {
                console.log("null is selected")
            }

            // console.log("attempting to emit 1")
            // console.log("You selected umuti: ", umuti)
        }
        const umutiOpen = (value) => {
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
                'code': '', //1: igizwe n'indome zitatu hamwe n'ibiharuro bibiri
                'name': '',  //2: ingene witwa. hazoba affiche 15caracteres
                'description': '',//3: ukwo ukoreshwa hamwe n'ico ukora
                'type': 'Flacon, comprime, tube', //4: ubwoko bwawo
                'type_in': 'carton', //5: kurangura
                'type_vente': 'plaquette', //6: kudetailla
                'prix_in': '', //7: ayo Carton/plaquette yaranguwe
                'prix_vente': '', //8: ayo plaquette tuyidandaza
                'difference': '', //9: benefice
                'quantite_restant': '',//10: plaquette zisigaye
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
                'date_peremption': '',
            },
            {
                'code': 'QUI23',
                'name': 'Quinine',
                'description': 'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_vente': 'plaquette',
                'prix_in': '1000',
                'prix_vente': '1300',
                'difference': '300',
                'quantite_restant': '25',
                'location': 'A#2#3#',
                'date_peremption': 'Jan 2025',
            },
            {
                'code': 'AMO23',
                'name': 'Quinine',
                'description': 'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_vente': 'plaquette',
                'prix_in': '800',
                'prix_vente': '1100',
                'difference': '300',
                'quantite_restant': '25',
                'location': 'A#2#9#',
                'date_peremption': 'Jan 2025',
            },
            {
                'code': 'QUI23',
                'name': 'Quinine',
                'description': 'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_vente': 'plaquette',
                'prix_in': '1000',
                'prix_vente': '1300',
                'difference': '300',
                'quantite_restant': '25',
                'location': 'A#2#3#',
                'date_peremption': 'Jan 2026',
            },
            {
                'code': 'AMO23',
                'name': 'Betadine',
                'description': 'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_vente': 'plaquette',
                'prix_in': '7000',
                'prix_vente': '8100',
                'difference': '300',
                'quantite_restant': '25',
                'location': 'A#2#9#',
                'date_peremption': 'Jan 2025',
            },
            {
                'code': 'AMO23',
                'name': 'Quinine',
                'description': 'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_vente': 'plaquette',
                'prix_in': '800',
                'prix_vente': '1100',
                'difference': '300',
                'quantite_restant': '25',
                'location': 'A#2#9#',
                'date_peremption': 'Jan 2025',
            },
            {
                'code': 'AMO23',
                'name': 'Quinine',
                'description': 'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_vente': 'plaquette',
                'prix_in': '800',
                'prix_vente': '1100',
                'difference': '300',
                'quantite_restant': '25',
                'location': 'A#2#9#',
                'date_peremption': 'Jan 2025',
            },
            {
                'code': 'AMO23',
                'name': 'Quinine',
                'description': 'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_vente': 'plaquette',
                'prix_in': '800',
                'prix_vente': '1100',
                'difference': '300',
                'quantite_restant': '25',
                'location': 'A#2#9#',
                'date_peremption': 'Jan 2025',
            },
            {
                'code': 'AMO23',
                'name': 'Quinine',
                'description': 'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_vente': 'plaquette',
                'prix_in': '800',
                'prix_vente': '1100',
                'difference': '300',
                'quantite_restant': '25',
                'location': 'A#2#9#',
                'date_peremption': 'Jan 2025',
            },
            {
                'code': 'AMO23',
                'name': 'Quinine',
                'description': 'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_vente': 'plaquette',
                'prix_in': '800',
                'prix_vente': '1100',
                'difference': '300',
                'quantite_restant': '25',
                'location': 'A#2#9#',
                'date_peremption': 'Jan 2025',
            },
            {
                'code': 'AMO23',
                'name': 'Quinine',
                'description': 'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_vente': 'plaquette',
                'prix_in': '800',
                'prix_vente': '1100',
                'difference': '300',
                'quantite_restant': '25',
                'location': 'A#2#9#',
                'date_peremption': 'Jan 2025',
            },
            {
                'code': 'AMO23',
                'name': 'Quinine',
                'description': 'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_vente': 'plaquette',
                'prix_in': '800',
                'prix_vente': '1100',
                'difference': '300',
                'quantite_restant': '25',
                'location': 'A#2#9#',
                'date_peremption': 'Jan 2025',
            },
            {
                'code': 'AMO23',
                'name': 'Quinine',
                'description': 'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_vente': 'plaquette',
                'prix_in': '800',
                'prix_vente': '1100',
                'difference': '300',
                'quantite_restant': '25',
                'location': 'A#2#9#',
                'date_peremption': 'Jan 2025',
            },
            {
                'code': 'AMO23',
                'name': 'Quinine',
                'description': 'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_vente': 'plaquette',
                'prix_in': '800',
                'prix_vente': '1100',
                'difference': '300',
                'quantite_restant': '25',
                'location': 'A#2#9#',
                'date_peremption': 'Jan 2025',
            },
            {
                'code': 'AMO23',
                'name': 'Quinine',
                'description': 'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_vente': 'plaquette',
                'prix_in': '800',
                'prix_vente': '1100',
                'difference': '300',
                'quantite_restant': '25',
                'location': 'A#2#9#',
                'date_peremption': 'Jan 2025',
            },
            {
                'code': 'AMO23',
                'name': 'Quinine',
                'description': 'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_vente': 'plaquette',
                'prix_in': '800',
                'prix_vente': '1100',
                'difference': '300',
                'quantite_restant': '25',
                'location': 'A#2#9#',
                'date_peremption': 'Jan 2025',
            },
            {
                'code': 'AMO23',
                'name': 'Quinine',
                'description': 'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_vente': 'plaquette',
                'prix_in': '800',
                'prix_vente': '1100',
                'difference': '300',
                'quantite_restant': '25',
                'location': 'A#2#9#',
                'date_peremption': 'Jan 2025',
            },
            {
                'code': 'AMO23',
                'name': 'Quinine',
                'description': 'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_vente': 'plaquette',
                'prix_in': '800',
                'prix_vente': '1100',
                'difference': '300',
                'quantite_restant': '25',
                'location': 'A#2#9#',
                'date_peremption': 'Jan 2025',
            },
            {
                'code': 'AMO23',
                'name': 'Quinine',
                'description': 'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_vente': 'plaquette',
                'prix_in': '800',
                'prix_vente': '1100',
                'difference': '300',
                'quantite_restant': '25',
                'location': 'A#2#9#',
                'date_peremption': 'Jan 2025',
            },
            {
                'code': 'AMO23',
                'name': 'Quinine',
                'description': 'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_vente': 'plaquette',
                'prix_in': '800',
                'prix_vente': '1100',
                'difference': '300',
                'quantite_restant': '25',
                'location': 'A#2#9#',
                'date_peremption': 'Jan 2025',
            },
            {
                'code': 'AMO23',
                'name': 'Quinine',
                'description': 'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_vente': 'plaquette',
                'prix_in': '800',
                'prix_vente': '1100',
                'difference': '300',
                'quantite_restant': '25',
                'location': 'A#2#9#',
                'date_peremption': 'Jan 2025',
            },
            {
                'code': 'AMO23',
                'name': 'Quinine',
                'description': 'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_vente': 'plaquette',
                'prix_in': '800',
                'prix_vente': '1100',
                'difference': '300',
                'quantite_restant': '25',
                'location': 'A#2#9#',
                'date_peremption': 'Jan 2025',
            },
            {
                'code': 'AMO23',
                'name': 'Quinine',
                'description': 'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_vente': 'plaquette',
                'prix_in': '800',
                'prix_vente': '1100',
                'difference': '300',
                'quantite_restant': '25',
                'location': 'A#2#9#',
                'date_peremption': 'Jan 2025',
            },
            {
                'code': 'AMO23',
                'name': 'Quinine',
                'description': 'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_vente': 'plaquette',
                'prix_in': '800',
                'prix_vente': '1100',
                'difference': '300',
                'quantite_restant': '25',
                'location': 'A#2#9#',
                'date_peremption': 'Jan 2025',
            },
            {
                'code': 'AMO23',
                'name': 'Quinine',
                'description': 'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_vente': 'plaquette',
                'prix_in': '800',
                'prix_vente': '1100',
                'difference': '300',
                'quantite_restant': '25',
                'location': 'A#2#9#',
                'date_peremption': 'Jan 2025',
            },
            {
                'code': 'AMO23',
                'name': 'Quinine',
                'description': 'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_vente': 'plaquette',
                'prix_in': '800',
                'prix_vente': '1100',
                'difference': '300',
                'quantite_restant': '25',
                'location': 'A#2#9#',
                'date_peremption': 'Jan 2025',
            },
            {
                'code': 'AMO23',
                'name': 'Quinine',
                'description': 'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_vente': 'plaquette',
                'prix_in': '800',
                'prix_vente': '1100',
                'difference': '300',
                'quantite_restant': '25',
                'location': 'A#2#9#',
                'date_peremption': 'Jan 2025',
            },
            {
                'code': 'AMO23',
                'name': 'Quinine',
                'description': 'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_vente': 'plaquette',
                'prix_in': '800',
                'prix_vente': '1100',
                'difference': '300',
                'quantite_restant': '25',
                'location': 'A#2#9#',
                'date_peremption': 'Jan 2025',
            },
            {
                'code': 'AMO23',
                'name': 'Quinine',
                'description': 'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_vente': 'plaquette',
                'prix_in': '800',
                'prix_vente': '1100',
                'difference': '300',
                'quantite_restant': '25',
                'location': 'A#2#9#',
                'date_peremption': 'Jan 2025',
            },
            {
                'code': 'AMO23',
                'name': 'Quinine',
                'description': 'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_vente': 'plaquette',
                'prix_in': '800',
                'prix_vente': '1100',
                'difference': '300',
                'quantite_restant': '25',
                'location': 'A#2#9#',
                'date_peremption': 'Jan 2025',
            },
            {
                'code': 'AMO23',
                'name': 'Quinine',
                'description': 'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_vente': 'plaquette',
                'prix_in': '800',
                'prix_vente': '1100',
                'difference': '300',
                'quantite_restant': '25',
                'location': 'A#2#9#',
                'date_peremption': 'Jan 2025',
            },
            {
                'code': 'AMO23',
                'name': 'Quinine',
                'description': 'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_vente': 'plaquette',
                'prix_in': '800',
                'prix_vente': '1100',
                'difference': '300',
                'quantite_restant': '25',
                'location': 'A#2#9#',
                'date_peremption': 'Jan 2025',
            },
            {
                'code': 'AMO23',
                'name': 'Quinine',
                'description': 'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_vente': 'plaquette',
                'prix_in': '800',
                'prix_vente': '1100',
                'difference': '300',
                'quantite_restant': '25',
                'location': 'A#2#9#',
                'date_peremption': 'Jan 2025',
            },
            {
                'code': 'AMO23',
                'name': 'Quinine',
                'description': 'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_vente': 'plaquette',
                'prix_in': '800',
                'prix_vente': '1100',
                'difference': '300',
                'quantite_restant': '25',
                'location': 'A#2#9#',
                'date_peremption': 'Jan 2025',
            },
            {
                'code': 'AMO23',
                'name': 'Quinine',
                'description': 'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_vente': 'plaquette',
                'prix_in': '800',
                'prix_vente': '1100',
                'difference': '300',
                'quantite_restant': '25',
                'location': 'A#2#9#',
                'date_peremption': 'Jan 2025',
            },
            {
                'code': 'AMO23',
                'name': 'Quinine',
                'description': 'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_vente': 'plaquette',
                'prix_in': '800',
                'prix_vente': '1100',
                'difference': '300',
                'quantite_restant': '25',
                'location': 'A#2#9#',
                'date_peremption': 'Jan 2025',
            },
            {
                'code': 'AMO23',
                'name': 'Quinine',
                'description': 'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_vente': 'plaquette',
                'prix_in': '800',
                'prix_vente': '1100',
                'difference': '300',
                'quantite_restant': '25',
                'location': 'A#2#9#',
                'date_peremption': 'Jan 2025',
            },
            {
                'code': 'AMO23',
                'name': 'Quinine',
                'description': 'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_vente': 'plaquette',
                'prix_in': '800',
                'prix_vente': '1100',
                'difference': '300',
                'quantite_restant': '25',
                'location': 'A#2#9#',
                'date_peremption': 'Jan 2025',
            },
            {
                'code': 'AMO23',
                'name': 'Quinine',
                'description': 'Pour Malaria, 1-1-1',
                'type': 'comprime',
                'type_in': 'carton',
                'type_vente': 'plaquette',
                'prix_in': '800',
                'prix_vente': '1100',
                'difference': '300',
                'quantite_restant': '25',
                'location': 'A#2#9#',
                'date_peremption': 'Jan 2025',
            },
        ]

        const kuvomaImiti = async () => {
            const prefix = 'api/out/dispo/'

            try {
                const response = await fetch(`${baseURL}/${prefix}`, {
                    headers: {
                        Authorization: 'Bearer ' + getAccessToken()
                    }
                })

                if (response.ok) {
                    data.value = await response.json()
                    data.value = data.value.data
                    console.log("THings are well received", data.value)
                    updateImitiSet()
                    update_imiti_for_search()
                }
            } catch (value) {
                console.log("somehting may not be well because :", value)
            }
        }
        kuvomaImiti()

        const updateImitiSet = () => {
            imitiset.value = []
            let i = 1
            data.value.forEach(element => {
                let obj: UmutiSet = {
                    'code_med': element.code_umuti,
                    'id': i,
                    'nom_med': element.name_umuti,
                    'description_med': element.description_umuti,
                    'date_last_vente': new Date(element.date_last_vente),
                    'prix_in': element.price_in,
                    'prix_vente': element.price_out,
                    'difference': element.difference,
                    'qte_entrant_big': element.qte_entrant_big,
                    'quantite_restant': element.quantite_restant,
                    'ratio_type': element.ratio_type,
                    'type_in': element.type_in,
                    'type_vente': element.type_out,
                    'famille_med': element.type_umuti,
                    'location': element.location,
                    'lot': element.lot
                }
                imitiset.value.push(obj)
            });
            console.log("Compiled : ", imitiset.value)
            imitiset_copy.value = imitiset.value
            familleBuilder(imitiset.value)
        }
        // let familles = []
        const familles = ref([])
        let famillesArray = []

        const familleBuilder = (arr)=>{
            console.log("Calling familleBUILDER")
            let i = 0
            let index = 0
            let obj = {}
            arr.forEach((Element)=>{
                index = famillesArray.indexOf((Element.famille_med).toLowerCase())
                if(index == -1){ // does not exist
                    famillesArray.push((Element.famille_med).toLowerCase());
                    obj = {
                        'nom_fam' : (Element.famille_med).toLowerCase(),
                        'members':[i]
                    }
                    familles.value.push(obj);
                } else{ // does exist
                    ((familles.value[index]).members).push(i)
                }
                i += 1
            })
            console.log("The content of familles: ", familles.value)
        }

        const update_imiti_for_search = () => {
            imitiset.value.forEach(element => {
                let obj = {
                    'code_med': element.code_med,
                    'date_last_vente': element.date_last_vente,
                    'description_med': element.description_med,
                    'location': element.location,
                    'lot': element.lot,
                    'nom_med': (element.nom_med),
                    'prix_in': element.prix_in,
                    'prix_vente': element.prix_vente,
                    'qte_entrant_big': element.qte_entrant_big,
                    'quantite_restant': element.quantite_restant,
                    'type_in': element.type_in,
                    'type_vente': element.type_vente,
                    'famille_med': element.famille_med,
                }

                imiti_for_search.push(obj)
            });
        }
        watch(shouldUpdate, (value) => {
            console.log("onUpdated, needToUpdate:..", value)
            if (value) {
                emit('allImiti', imitiset)
            }
        })
        watch(need_search, (value) => {
            // console.log("You want to search in list-imiti: ", value)
            let queryset = search_med(value.value)

            if (queryset && value.value.query.length > 0 && value.value.response == 1) {
                emit('allImiti', queryset)
                // console.log("emitted on need_search")
            } else if (queryset && value.value.query.length > 0 && value.value.response == 0) {
                imitiset.value = queryset
            } else if (value.value.query.length == 0) {
                imitiset.value = imitiset_copy.value
            }
            if (queryset.length == 0 && value.value.query.length > 4 && value.value.response == 0) {
                emit('emptyResult', 1)
            } else if (queryset.length == 0 && value.value.query.length < 5) {
                emit('emptyResult', 0)
            }
        })
        watch(needUpdate_server, (value) => {
            // request to api to give dispo
            kuvomaImiti()
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
.umuti {
    width: 10vw;
    height: 14vh;
    background-color: black;
    border-radius: 15px;
    padding: 0px 5px;
    margin: 10px 5px;
    /* Space between imiti */
    box-shadow: 0 0 20px black;
    transition-delay: 0.1s;
    transition-property: all;
}

.umutiTitle {
    width: 100%;
    height: 70%;
    text-align: center;
    align-items: center;
    align-content: center;
}

.umutiPrice {
    width: 100%;
    height: 30%;
    text-align: center;
    border-top: 1px solid rgb(11, 245, 11);
    font-weight: 500;
    font-size: .8rem;

}

.umutiContent {
    display: inline-flex;
    text-decoration: none;
    color: white;
}

.umutiContent:focus {
    background-color: black;
    background-color: white;
    border-radius: 25px;
}

.umuti:active {
    box-shadow: 0 0 20px lime;
}
</style>
