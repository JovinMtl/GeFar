<template>
    <div>
        <div v-for="(umuti, index) in imitiset" v-show="umuti.nom_med" style="display: inline-block ;"
            :key="index">
            <a href="http://" target="_blank" rel="noopener noreferrer" class="umutiContent">
                <div :title="umuti.nom_med" :id="index" class="umuti">
                    <div class="umutiTitle sm-title">
                        {{ useCapitalLetter((umuti.nom_med).slice(0, 15)) }}<span v-show="(umuti.nom_med).length > 15">...</span>

                    </div>

                    <div :title="displayPharma(umuti.owner)?.name_pharma + ' : ' + 
                                displayPharma(umuti.owner)?.loc_street + '/' + 
                                displayPharma(umuti.owner)?.loc_quarter + '/' + 
                                displayPharma(umuti.owner)?.loc_commune + '/' + 
                                displayPharma(umuti.owner)?.loc_Province + '. Tel: ' + 
                                displayPharma(umuti.owner)?.tel" class="umutiPrice">
                        <div class="umutiPrice-1">
                        {{ useReadableNumber(umuti.price) }}
                        </div>
                        <div :title="String(displayPharma(umuti.owner)?.last_connected).slice(0,16)"
                            class="umutiPrice-2" :class="umuti.qte > 0 ? '':'c-danger'">
                            <span >
                                {{ Number(umuti.qte) }}
                            </span>
                        </div>
                    </div>

                    
                </div>
            </a>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { ref } from 'vue'
    import { useCapitalLetter } from '../hooks/useReadable.js'
    import useReadableNumber from '../hooks/useReadable.js'
    import { useKuvomaRemote } from '../hooks/kuvomaRemote.js'


    const props = defineProps(['imitiRemote'])



    const url_getPharma = "api/gOps/get_pharmas/"
    const [resp_pharma, getPharma] = useKuvomaRemote(url_getPharma)

    // Initializations
    getPharma()
    const imitiset = ref(props.imitiRemote?.response)

    // Functions
    const displayPharma = (id)=>{
        if (resp_pharma.value?.response){
            console.log("Displaying for ID:"+id + "==>" + JSON.stringify(resp_pharma.value?.response[id]))
            return resp_pharma.value?.response[id]
        }
    }
</script>
<style scoped>
.umuti {
    width: 10vw;
    height: 14vh;
    background-color: rgb(0, 102, 128);
    color: black;
    border-radius: 15px;
    padding: 0px 5px;
    margin: 10px 5px;
    /* Space between imiti */
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
