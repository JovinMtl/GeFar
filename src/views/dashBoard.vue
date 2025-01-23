<template>
    <div>
        <div class="namePharma nm-p1 nm-s1">Pharmacie Ubuzima</div>
        <div class="bg-w c-b dB-1">
            Dashboard</div>
        <div class="c-b d-f">
            <button class="btn" @click="fermerD">
                Fermer
            </button>
        </div>
        <div class="bg-w c-b dB-3" style="overflow: auto; display: flex;
        flex-wrap: wrap;">
            <div class="chartContainer">
                <div id="cha1" @click="openChart"
                    class="dB-ctn" :class="ch1 ? 'dB-ctn-o':''">
                    Tendance des ventes
                    <LineChart :chartData="chartData" :options="chartOptions" />
                </div>
                <div id="cha2" @click="openChart"
                    class="dB-ctn" :class="ch2 ? 'dB-ctn-o':''">
                    Etat de stocks: +2 ans; >1 an<; < 1 an; < 6 mois
                    <DoughnutChart :chartData="testData1" />
                </div>
                <div id="cha3" @click="openChart"
                    class="dB-ctn" :class="ch3 ? 'dB-ctn-o':''">
                    Comparaison entre les clients: tv, mt, md, au
                    <BarChart :chartData="testData3" :options="chartOptions" />
                </div>
                <div id="cha4" @click="openChart"
                    class="dB-ctn" :class="ch4 ? 'dB-ctn-o':''">
                    CashFlow: Sans et avec BonDeCommande
                    <DoughnutChart :chartData="testData4" />
                </div>
            </div>
            <div class="chartControl">
                <div v-show="title" style="border-bottom: 1px solid black; height: 2rem;
                    width: 90%;text-align: center;display:block">
                    {{ title }}
                </div>
                <div v-show="title != 'Etats de Stocks' && title != ''" 
                    style="margin: 1rem 0">
                    <label for="" class="la">Début</label><br>
                    <input style="margin-bottom: 1rem;"
                        v-model="date1" type="date"/> <br>
                    <label for="" class="la">Fin</label><br>
                    <input type="date" v-model="date2"/><br><br>
                    <input type="button" value="Traiter" @click="checkDate">
                    <br>
                    <div v-if="dWarning" class="dWarn">Veuillez bien choisir les dates correctes.</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref,reactive, watch } from 'vue'
import { 
    DoughnutChart, LineChart, BarChart
} from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import { useChart } from './hooks/useChart';

Chart.register(...registerables);

const emit = defineEmits(['clos-d'])
const ch1 = ref<boolean>(false)
const ch2 = ref<boolean>(false)
const ch3 = ref<boolean>(false)
const ch4 = ref<boolean>(false)
const dWarning = ref<boolean>(false)
const title = ref<string>('')
const date1 = ref<Date>(null)
const date2 = ref<Date>(null)

const [lineData, askData] = useChart()
const [chart2Data, askForChart2] = useChart()
const [chart3Data, askForChart3] = useChart()
const [chart4Data, askForChart4] = useChart()
askData('api/rep/getVentes/')

setTimeout(()=>{
    askForChart2('api/rep/getDiffStock/')
}, 2000)
setTimeout(()=>{
    askForChart3('api/rep/getCate/')
}, 2500)
setTimeout(()=>{
    askForChart4('api/rep/getOnNoBon/')
}, 3000)

// Static data
const testData3 = reactive({
      labels: ['Paris', 'Nîmes', 'Toulon', 'Autre'],
      datasets: [
        {
          data: [30, 40, 60, 5],
          backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#A5C8ED'],
        },
      ],
    });
const testData4 = reactive({
      labels: ['Paris', 'Nîmes', 'Toulon', 'Autre'],
      datasets: [
        {
          data: [30, 40, 60, 5],
          backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#A5C8ED'],
        },
      ],
    });
const testData1 = reactive({
    labels: ['Paris', 'Nîmes', 'Toulon', 'Autre'],
    datasets: [
    {
        data: [30, 40, 6, 50],
        backgroundColor: ['red', 'salmon', 'yellow', '#2fe22f', '#4ff7c0'],
    },
    ],
});
const chartData = ref({
    labels: ['Nzero', 'Ruhuhuma', 'Ntwarante', 'Ndamukiza', 
    'Rusama', 'Ruheshi', 'Mukakaro'],
    datasets: [
    {
        label: 'Ventes',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'blue',
        data: [65, 59, 80, 121, 56, 55, 80],
        fill: true,
    }
    ]
});
const chartOptions = ref({
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom',
            labels:{
                font:{
                    // size: 25,
                },
                // color: 'red'
            }
            
        },
        title: {
            display: true,
            text: 'Graphique: tendance des ventes',
            color: 'blue'
        },
        tooltip:{
            enabled: true,
            mode: 'index',
            intersect: false,
            backgroundColor: 'grey',
            titleColor: 'black',
            bodyColor: 'white',
            callbacks:{
                label: function(jove){
                    return `Habonetse: ${jove.raw}`
                }
            }
        },
        
    },
    scales:{
            x:{
                grid:{
                    color: 'rgba(70, 64, 64, 0.384)',
                    lineWidth: 1,
                    drawBorder: true,
                },
                title:{
                    display: true,
                    text: 'Période'
                }
            },
            y:{
                grid:{
                    color: 'rgba(70, 64, 64, 0.384)',
                    lineWidth: 1,
                    drawBorder: true,
                },
                title:{
                    display: true,
                    text: 'Umwimbu'
                }
            }
    },
    elements:{
        line:{
            tension: 0.5,  // Smoothness of the line (0 for straight lines)
            borderWidth: 1
        },
        point:{
            radius: 5,
            backgroundColor: 'red',
            borderColor: 'black',
            borderWidth: 2
        }
    },
    animation: {
        duration: 1000, // Animation duration in milliseconds
        easing: 'easeOutBounce', // Easing function for animation
        onComplete: function() {
            // console.log('Animation completed!');
        }
    }
});


// Begining of functions
const fermerD = ()=>{
    emit('clos-d')
}
const openChart = (e:Event)=>{
    e.target.style.height = '300px'
    let id = e.target.parentElement.parentElement.id
    const makeFalse = ()=>{
        ch1.value = false
        ch2.value = false
        ch3.value = false
        ch4.value = false
        title.value = ''
    }
    if(id == 'cha1'){
        if(ch1.value){
            makeFalse()
            e.target.style.height = '400px'
        }else{
        makeFalse()
        title.value = "Detail pour des Ventes"
        ch1.value = true;
        }
    }else if(id == 'cha2'){
        if(ch2.value){
            makeFalse()
            e.target.style.height = '400px'
        }else{
            makeFalse()
            title.value = "Etats de Stocks"
            ch2.value = true
        }
    } else if(id == 'cha3'){
        makeFalse()
        title.value = "Bons de Commande"
        ch3.value = true
    } else if(id == 'cha4'){
        makeFalse()
        title.value = "Diversite des Clients"
        ch4.value = true
    }
}
const checkDate = ()=>{
    const today = Date(new Date())
    if (today >= date1.value && today > date2.value){
        dWarning.value = false
        askData('api/rep/getVentes/',[date1.value, date2.value])
    } else{
        dWarning.value = true
    }
}

watch(chart4Data, (value)=>{
    testData4.labels = value.Y
    testData4.datasets[0].data = value.X
})
watch(chart3Data, (value)=>{
    testData3.labels = value.Y
    testData3.datasets[0].data = value.X
})
watch(chart2Data, (value)=>{
    // Updating the ChartData whenever we do a request to the server
    testData1.labels = value.Y
    testData1.datasets[0].data = value.X
})
watch(lineData, (value)=>{
    // Updating the ChartData whenever we do a request to the server
    chartData.value.labels = value.X
    chartData.value.datasets[0].data = value.Y
})
</script>
<style>
.chartContainer{
    width: 85%; height: 100%; display:flex;
    flex-wrap: wrap;overflow: auto;
}
.chartControl{
    width: 15%;height: 100%;
    /* display: flex; */
    display: block;
    justify-content: center;
    padding: 1rem 5px;
}
input{
    background-color: rgb(177, 174, 174);
    border-radius: 5px;
}
.dWarn{
    color: red;font-size: .8rem;margin-top: 20px;
}
.la{
    font-size: .7rem;
}
.nm-p1{
    top: -0.2rem;
    left: 9rem;
}
.nm-s1{
    background-size: 60px 60px;
    font-size: 1.6rem;
}
.bg-w{
    background-color: white; 
}
.c-b{
    color: black;
}
.dB-1{
    position:absolute;
    left: 80%;top:4px;
    justify-items: center;
    height: 25px; padding: 3px 2rem;
    border-top-left-radius: 5px; border-top-right-radius: 5px;
}
.d-f{
    display: flex; 
}
.dB-3{
    width: 98vw; height: 95vh; 
    border-radius: 15px;
    padding: 8px; 
}
.dB-ctn{
    width: 40vw; height: 60vh; 
    /* background-color: grey; */
    margin: 55px 0;
    text-align: center;
    padding-top: 1.3rem;
}
.dB-ctn-o{
    border: 4px double grey;
    /* background-color: rgba(128, 128, 128, 0.589); */
    border-radius: 50px;
    transition-duration: 300ms;
}
.btn{
    padding: 4px 15px; 
    margin: 3px auto;
    background-color: #ef4b38;
    border-radius: 4px;
}
.btn:active{
    scale: 1.2;
}

::-webkit-scrollbar-thumb {
    background-color: black;
    /* background-color: rgb(250, 128, 114); */
    background-color: gray;
    border-radius: 15px;
}

::-webkit-scrollbar {
    width: 3px;
    width: 5px;
    width: 2px;
    color: green;
}

::-webkit-scrollbar-track {
    background-color: #f1f1f1;
}
</style>