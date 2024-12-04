<template>
    <div>
        <div v-for="(umuti, index) in imiti" v-show="umuti.name" 
            style="display: inline-block ;"  @click.prevent="umutiOpen($event)">
                <a :title="umuti.code" :id="index"
            href="http://" target="_blank" rel="noopener noreferrer"
                class="umutiContent">
                    <div class="umuti">
                        <div class="umutiTitle">
                            {{ umuti.name }}
                        </div>
                        
                        <div class="umutiPrice">{{ umuti.prix_out }}</div>
                    </div>
                </a>
        </div>
    </div>
    
    
    
</template>
<script>
export default {
    setup() {
        let codes = new Array()
        const umutiOpen = (value)=>{
            console.log("And the ID is : ", (value.target.parentNode.parentNode).innerHTML)
            const current = (value.target.parentNode.parentNode)
            const code = current.getAttribute("title")
            console.log("ID : ", code)
        }
        
        const constructUniqueCodes = ()=>{
            imiti.forEach((obj)=>{
                if(!codes.includes(obj.code)){
                    codes.push(obj.code)
                }
            })
            codes = codes.sort()
            console.log("The Sorted Codes is: ", codes)
        }

      /**
 * Constructs a dictionary from the provided code array.
 * @param {Array} code - The input array from which the dictionary is constructed.
 */
        const makeDictionaryImiti = (code)=>{
            let imitiDict = []
            for(let i=0;i<code.length; i++){
                imitiDict.code = code[i]
                imitiDict.name = ''
                imitiDict.lot = ''
            }
            console.log("Imiti Dict is : ", imitiDict)
        }
        constructUniqueCodes()
        makeDictionaryImiti(codes)

        const compileImiti = ()=>{}

        return {
            imiti,
            umutiOpen,
        }
    },
}
</script>
<style scoped>
.umuti{
    width: 10vw;
    height: 12vh;
    background-color: black;
    /* background-color: gray; */
    border-radius: 15px;
    padding: 0px 5px;
    margin: 10px 5px; /* Space between imiti */
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
