<template>
    <div>
        <a href="http://" target="_blank" rel="noopener noreferrer"
        @click.prevent="" class="umutiContent" title="Click to see more">
            <div class="umuti">
                <div class="umutiTitle">
                    Here are our imiti from the store
                </div>
                
                <div class="umutiPrice">deux milles</div>
            </div>
        </a>
    </div>
    
    
</template>

<style scoped>
.umuti{
    width: 10vw;
    height: 12vh;
    background-color: black;
    /* background-color: gray; */
    border-radius: 15px;
    padding: 0px 5px;
    box-shadow: 0 0 20px black;
    transition-delay: 0.1s;
    transition-property: all;
}
.umutiTitle{
    width: 100%;
    height: 70%;
    /* background-color: rgb(11, 245, 11); */
    text-align: center;
    align-items: center;
    align-content: center;
}
.umutiPrice{
    width: 100%;
    height: 30%;
    /* background-color: black; */
    text-align: center;
    border-top: 1px solid rgb(11, 245, 11);
    font-weight: 500;
    font-size: .8rem;

}
.umutiContent{
    display: inline-flex;
    text-decoration: none; 
    color: white;
}
.umutiContent:active .umuti
{
    background-color: rgb(11, 245, 11);
    box-shadow: 0 0 25px white;
}
</style>
