<template>
    <div>
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
<style scoped>
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