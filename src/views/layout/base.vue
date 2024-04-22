<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pharma</title>
</head>
<body>
    <div class="mainContainer">
        <div class="sectA"></div>
        <div class="sectB"></div>
        <!-- <div class="signeRecherche"></div> -->
        <div class="menuLeft"></div>
        <div class="menuHau"></div>
    </div>
</body>
</html>
<style>
    body{
        background: linear-gradient(to right, rgb(11, 245, 11),rgba(11, 245, 11, 0.644), rgba(11, 245, 11, 0.486));
        overflow: hidden;
    }
    .mainContainer{
        display: inline-flex;
        background-color: rgba(255, 255, 255, 0.589);
        background: linear-gradient(to bottom, rgba(255, 255, 255, 0.589),rgba(255, 255, 255, 0.381), rgba(255, 255, 255, 0.437));
        width: 90vw;
        height: 90vh;
        position: relative;
        left: 10vw;
        left: 11.5vw;
        top: 6vh;
        border-top-left-radius: 35px;
        border-bottom-left-radius: 35px;
    }
    .sectA{
        width: 77%;
        height: 100%;
        /* background-color: rgba(153, 205, 50, 0.527); */
    }
    .sectB{
        width: 23%;
        height: 100%;
        background-color: rgba(11, 245, 11, 0.384);
        border-top: 8px dotted rgba(255, 255, 255, 0.589);
        /* border-top-left-radius: 35px; */
        /* border-style: dotted; */
    }
    .signeRecherche{
        width: 10px;
        height: 10px;
        background-color: rgb(63, 60, 60);
        position: absolute;
        border-radius: 5px;
    }
</style>

