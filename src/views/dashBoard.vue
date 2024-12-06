<template>
    <div>
        <div class="namePharma nm-p1 nm-s1">Dawa Pharma</div>
        <div class="bg-w c-b dB-1">
            Dashboard</div>
        <div class="c-b d-f">
            <button class="btn" @click="fermerD">
                Fermer
            </button>
        </div>
        <div class="bg-w c-b dB-3" style="overflow: auto; display: flex;
        flex-wrap: wrap;">
            <div class="dB-ctn">
                Rien pour le moment
                <DoughnutChart :chartData="testData" />
            </div>
            <div class="dB-ctn">
                Encore rien
                <DoughnutChart :chartData="testData1" />
            </div>
            <div class="dB-ctn">
                Rien pour le moment
                <DoughnutChart :chartData="testData" />
            </div>
            <div class="dB-ctn">
                Encore rien
                <DoughnutChart :chartData="testData1" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { DoughnutChart, LineChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const emit = defineEmits(['clos-d'])

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


// Begining of functions
const fermerD = ()=>{
    emit('clos-d')
}

</script>
<style>
.nm-p1{
    top: -0.3rem;
    left: 9rem;
}
.nm-s1{
    background-size: 60px 60px;
    font-size: 1.8rem;
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
}
.btn{
    padding: 4px 15px; 
    margin: 3px auto;
    background-color: #ef4b38;
}
.btn:active{
    scale: 1.2;
}
</style>