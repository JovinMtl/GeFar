<template>
    <div>
        <div class="dB-name nm-p1">Dawa Pharma</div>
        <div class="bg-w c-b dB-1">
            Dashboard</div>
        <div class="c-b dB-2">
            <button class="btn">
                Fermer</button>
        </div>
        <div class="bg-w c-b dB-3">
        This is Dashboard
        </div>
    </div>
</template>
<style>
.nm-p1{
    top: -0.3rem;
    left: 9rem;
}
.dB-name{
    font-family: RollingBeat;
    position: absolute;
    background: radial-gradient(20% 20%,lime, white);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 60px 60px;
    font-size: 1.8rem;
}
.bg-w{
    background-color: white; 
}
.c-b{
    color: black;
}
.dB{

}
.dB-1{
    position:absolute;
    left: 80%;top:4px;
    justify-items: center;
    height: 25px; padding: 3px 2rem;
    border-top-left-radius: 5px; border-top-right-radius: 5px;
}
.dB-2{
    display: flex; 
}
.dB-3{
    width: 98vw; height: 95vh; 
    border-radius: 15px;
    padding: 8px; 
}
.btn{
    padding: 4px 15px; 
    margin: 3px auto;
}
.btn:active{
    scale: 1.2;
}
</style>