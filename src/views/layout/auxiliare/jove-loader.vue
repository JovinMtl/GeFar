<template>
    <div class="container-processing">
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>
        <div class="line4"></div>
        <div class="line5"></div>
    </div>
</template>
<style scoped>
*{
    margin: 0;
    padding: 0;
    background-color: rgb(70, 67, 67);
    /* background-color: white; */
}
body{
    position: relative;
    width: 100vw;
    height: 100vh;
}
.container-processing{
    position: absolute;
    height: 150px;
    width: 140px;
    border-radius: 25px;
    background-color: white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.line1{
    position: relative;
    height: 50%;
    width: 10%;
    background-color: red;
    top : 50%;
    left : 20%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    transition-property: all;
    transition-duration: 0.3s;
    animation-name: agent1;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
}
.line1:nth-child(3n){
    animation-delay: 5s;
}
.line2{
    position: absolute;
    height: 50%;
    width: 10%;
    background-color: rgba(189, 224, 63, 0.959);
    background-color: rgb(217, 255, 0);
    left : 35%;
    top : 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    transition-property: all;
    transition-duration: 0.3s;
    animation-name: agent2;
    animation-duration: 3s;
    animation-iteration-count: infinite;
}
.line3{
    position: absolute;
    height: 50%;
    width: 10%;
    background-color: rgb(0, 255, 34);
    left : 50%;
    top : 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    transition-property: all;
    transition-duration: 0.3s;
    animation-name: agent3;
    animation-duration: 3s;
    animation-iteration-count: infinite;
}
.line4{
    position: absolute;
    height: 50%;
    width: 10%;
    background-color: blueviolet;
    left : 65%;
    top : 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    transition-property: all;
    transition-duration: 0.3s;
    animation-name: agent4;
    animation-duration: 3s;
    animation-iteration-count: infinite;
}
.line5{
    position: absolute;
    height: 50%;
    width: 10%;
    background-color: rgb(8, 165, 139);
    left : 80%;
    top : 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    transition-property: all;
    transition-duration: 0.3s;
    animation-name: agent5;
    animation-duration: 3s;
    animation-iteration-count: infinite;
}
@keyframes agent1 {
    0%, 100%{
        height: 50%;
    }
    50%{
        height: 75%;
        box-shadow: 0 0 45px red;
    }
    75%{
        height: 90%;
        box-shadow: 0 0 35px red;
    }
}
@keyframes agent2 {
    0%,20%, 100%{
        height: 50%;
    }
    25%,45%{
        height: 75%;
        box-shadow: 0 0 35px rgb(217, 255, 0);
    }
    48%{
        height: 50%;
    }
    40%{
        height: 90%;
        box-shadow: 0 0 35px rgb(217, 255, 0);
    }
    
}
@keyframes agent3 {
    0%,40%, 100%{
        height: 50%;
    }
    45%, 63%{
        height: 75%;
        box-shadow: 0 0 45px rgb(0, 255, 34);
    }
    69%{
        height: 50%;
    }
    60%{
        height: 90%;
        box-shadow: 0 0 35px rgb(0, 255, 34);
    }
}
@keyframes agent4 {
    0%,60%, 100%{
        height: 50%;
    }
    64%, 83%{
        height: 75%;
        box-shadow: 0 0 45px blueviolet;
    }
    85%{
        height: 50%;
    }
    80%{
        height: 90%;
        box-shadow: 0 0 35px blueviolet;
    }
}
@keyframes agent5 {
    0%,40%, 79%, 100%{
        height: 50%;
    }
    84%, 97%{
        height: 75%;
        box-shadow: 0 0 45px rgb(8, 165, 139);
    }
    93%{
        height: 90%;
        box-shadow: 0 0 35px rgb(8, 165, 139);
    }
}
       
</style>

