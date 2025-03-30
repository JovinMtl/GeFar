<template>
    <div class="dynContent" style="">
        
        <div class="controlHeader" style="height: 5%; width: 100%;">
            <div  class="controlContent" style="font-size: .8rem;
                background-color: navy; color: white">
                <div class="contentElement1" style="display: inline-flex;background-color: transparent; width: 4%;height: 100%; color: green; ">
                    #
                </div> 
                <div class="contentElement2">
                    Nom du Med.
                </div> 
                <div class="contentElement4">
                    Qte Restant
                </div>
                <div class="contentElement4">
                    Code Med
                </div>
            </div>
        </div>

        <div class="controlBody">
            <div v-for="(umuti, index) in (actual_imitiS)" 
                class="d-f"
                :class="index%2 ? 'ln-1':'ln-2'">
                <div class="contentElement11">
                    {{ index + 1 }}
                </div> 
                <div class="contentElement2">
                    {{ umuti.nom_med }}
                </div> <div class="contentElement4">
                    {{ umuti.quantite_restant  }}
                </div> 

                <div class="contentElement4 famille_med">
                    {{ umuti.code_med }}
                    
                </div>
                
            </div>
        </div>
                            
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    const props = defineProps(['med'])
    const actual_imitiS = ref(props.med)
</script>