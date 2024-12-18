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
            <div style="width: 85%; height: 100%; display:flex;
                flex-wrap: wrap;overflow: auto;">
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
                    CashFlow: Sans et avec BonDeCommande
                    <BarChart :chartData="testData" :options="chartOptions" />
                </div>
                <div id="cha4" @click="openChart"
                    class="dB-ctn" :class="ch4 ? 'dB-ctn-o':''">
                    Comparaison entre les clients: tv, mt, md, au
                    <DoughnutChart :chartData="testData" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { 
    DoughnutChart, LineChart, BarChart
} from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const emit = defineEmits(['clos-d'])
const ch1 = ref<boolean>(false)
const ch2 = ref<boolean>(false)
const ch3 = ref<boolean>(false)
const ch4 = ref<boolean>(false)

// Static data
const testData = {
      labels: ['Paris', 'Nîmes', 'Toulon', 'Autre'],
      datasets: [
        {
          data: [30, 40, 60, 5],
          backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#A5C8ED'],
        },
      ],
    };
const testData1 = {
    labels: ['Paris', 'Nîmes', 'Toulon', 'Autre'],
    datasets: [
    {
        data: [30, 40, 6, 50],
        backgroundColor: ['#77CEFF', 'yellow', 'red', 'black'],
    },
    ],
};
const chartData = ref({
    labels: ['Nzero', 'Ruhuhuma', 'Ntwarante', 'Ndamukiza', 
    'Rusama', 'Ruheshi', 'Mukakaro'],
    datasets: [
    {
        label: 'Ventes mensuelles',
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
                    text: 'Ukwezi'
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
            console.log('Animation completed!');
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
    }
    if(id == 'cha1'){
        makeFalse()
        ch1.value = true;
    }else if(id == 'cha2'){
        makeFalse()
        ch2.value = true
    } else if(id == 'cha3'){
        makeFalse()
        ch3.value = true
    } else if(id == 'cha4'){
        makeFalse()
        ch4.value = true
    }
}

</script>
<style>
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
</style>