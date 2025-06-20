<template>
    <div>
        <div v-for="(umuti, index) in imitiset" v-show="umuti.nom_med" style="display: inline-block ;"
            :key="index">
            <a :title="umuti.nom_med" href="http://" target="_blank" rel="noopener noreferrer" class="umutiContent">
                <div :id="index" class="umuti">
                    <div class="umutiTitle sm-title">
                        {{ useCapitalLetter((umuti.nom_med).slice(0, 15)) }}<span v-show="(umuti.nom_med).length > 15">...</span>

                    </div>

                    <div class="umutiPrice">
                        <div class="umutiPrice-1">
                        {{ useReadableNumber(umuti.price) }}
                    </div>
                        <div class="umutiPrice-2" :class="umuti.qte > 0 ? '':'c-danger'">
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
    
    const props = defineProps(['imitiRemote'])

    const imitiset = ref(props.imitiRemote?.response)

    console.log("The imiti from Remote: " + JSON.stringify(props.imitiRemote?.response))
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
