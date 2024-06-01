<template>
    <div class="menuContainer">
        <!-- //here is the menu -->
        <a @click.prevent="" href="http://" target="_blank" 
        rel="noopener noreferrer" title="Donner Médicament au Patient">
            <div :class="button1 ? 'clicked':'unclicked'" @click="turnA">
            Vendre  
        </div>
        </a>
        <a @click.prevent="" href="http://" target="_blank" rel="noopener noreferrer"
        style="color: white;" title="Approvisionner, Entrée en Stock">
            <div :class="button2 ? 'clicked':'unclicked'" @click="turnB">Approv</div>
        </a>
        <a @click.prevent="" href="http://" target="_blank" 
        rel="noopener noreferrer" title="Vérifier que tout est en bonne ordre">
           <div :class="button3 ? 'clicked':'unclicked'" @click="turnC">
                Vérifier 
            </div> 
        </a>
            
        
    </div>
</template>
<script>
import { ref } from 'vue'
export default {
    setup(_, {emit}) {
        const button1 = ref(true)
        const button2 = ref(false)
        const button3 = ref(false)

        const turnA = ()=>{
            button1.value = true
            button2.value = false
            button3.value = false
        }
        const turnB = ()=>{
            button2.value = true
            button1.value = false
            button3.value = false
            emit('actualMenu', 2)
        }
        const turnC = ()=>{
            button3.value = true
            button2.value = false
            button1.value = false
            emit('actualMenu', 3)
        }

        return {
            button1, button2, button3,
            turnA, turnB, turnC,
        }
    },
}
</script>
<style scoped>
.menuContainer{
    height: 30px;
    width: 40vw;
    text-align: center;
}
.unclicked{
    display: inline-block;
    width: 24%;
    height: 100%;
    background-color: black;
    margin: 0px 4px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    align-content: center;
    align-items: center;
    text-align: center;
}
.clicked{
    display: inline-block;
    width: 24%;
    height: 100%;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    align-content: center;
    align-items: center;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.474);
}
a > .clicked {
    color: rgba(0, 0, 255, 0.516);
}
a > .unclicked{
    color: white;
}
</style>
