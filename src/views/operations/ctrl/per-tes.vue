<template>
    <div class="dynContent" style="">
        
        <div class="controlHeader" style="height: 5%; width: 100%;">
            <div  class="controlContent" style="font-size: .8rem;
                background-color: navy; color: white">
                <div class="elt contentElement1" style="display: inline-flex;background-color: transparent; width: 4%;height: 100%; color: green; ">
                    #
                </div> 
                <div class="elt contentElement2-1">
                    Nom du Med.
                </div> 
                <div class="elt contentElement4 j-c">
                    Heure
                </div>
                <div class="elt contentElement4">
                    Auteur
                </div>
            </div>
        </div>

        <div class="controlBody">
            <div v-for="(umuti, index) in (actual_imitiS)" 
                class="d-f"
                :class="index%2 ? 'ln-1':'ln-2'">
                <div class="contentElement11">
                    {{ index + 1 }}
                      <!-- 8 -->
                </div> 
                <div class="elt contentElement2-1"
                    :title="umuti?.nom_med">
                    <!-- {{ String(umuti?.operation)?.slice(0, 25) }} -->
                    {{ String(umuti?.nom_med)?.slice(0, 105) }}
                      <!-- jove -->
                </div> <div class="elt contentElement4">
                    {{ String(umuti?.date_operation)?.slice(11, 16) }} 
                    <span>_</span>
                    <span class="c-g-1">
                        {{ String(umuti?.date_operation	)?.slice(8, 10) }}/{{ String(umuti?.date_operation)?.slice(5, 7) }}/{{ String(umuti?.date_operation)?.slice(0, 4) }}
                    </span> 
                </div> 

                <div class="elt contentElement4 famille_med">
                    <!-- {{ umuti?.code_med }} -->
                      <!-- 3 -->
                       <!-- {{ users?.response[umuti?.who_did_it] }} :  -->
                       {{ umuti?.who_did_it }}
                </div>
                
            </div>
        </div>

        <div class="controlFooter" style="color: black;">
            <div  class="controlContent" style="font-weight: 700;">
                <div class="elt contentElement1">
                    #
                </div> 
                <div class="elt contentElement2">
                    TOTAL
                </div> 
                <div class="elt contentElement1">
                    <!-- {{ totaux[0] }} -->--
                </div>

                <div v-if="isAdmin" class="elt contentElement4">
                    <!-- {{ (totaux[1] / (totaux[0] || 1))?.toFixed(1) }} -->

                    <!-- {{ totaux[2] }} -->
                    --
                    <!-- {{ useReadable(totaux[2]) }} -->
                    
                </div>

                <div class="elt contentElement4">
                    ----------
                </div>

                <div class="elt contentElement4 c-b-1">
                    <!-- {{ totaux[1] }} -->---
                    <!-- {{ useReadable(totaux[1]) }} -->
                </div>

                <div v-if="isAdmin" class="elt contentElement4">
                    <!-- {{ totaux[3] }} -->---
                    <!-- {{ useReadable(totaux[3]) }} -->
                </div>

                <div class="elt contentElement4">
                    <!-- ---------- -->
                </div>
            </div>
        </div>
                            
    </div>
</template>

<script setup lang="ts">
    import { ref, watch } from 'vue'
    import { useKuvoma } from '../../hooks/kuvoma'

    const props = defineProps(['med'])
    const actual_imitiS = ref(props.med)

    const users_url = 'api/gOps/listUser/'
    const [users, listUser] = useKuvoma(users_url)

    listUser()

    watch(users, (value)=>{
        console.log("We get users: " + value)
    })
</script>