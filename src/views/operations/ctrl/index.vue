<div class="controlContent" style="display:block ; width: 80%; height: 100%; border:2px solid white; background-color: transparent; 
                float: right; color: black;">
                
                <div class="controlHeader" style="height: 5%; width: 100%;">
                    <div  class="controlContent">
                        <div class="contentElement1" style="display: inline-flex;background-color: transparent; width: 4%;height: 100%; color: green; ">
                            #
                        </div> 
                        <div class="contentElement2">
                            Nom du Med.
                        </div> 
                        <div class="contentElement3">
                            Quantite
                        </div>

                        <div class="contentElement4">
                            <span v-if="isAdmin">Px.Achat</span>
                            <span v-else>T. Med.</span>
                            
                        </div>

                        <div class="contentElement3">
                            Px. Vente
                        </div>

                        <div class="contentElement3">
                            Total
                        </div>

                        <div class="contentElement4">
                        <span v-if="isAdmin">Bénéfice</span>
                        <span v-else>Loc.</span>  
                        </div>

                        <div class="contentElement4">
                            Date
                        </div>
                        <div class="contentElement4">
                            Auteur
                        </div>
                    </div>
                </div>

                <div class="controlBody">
                    <div v-for="(umuti, index) in actual_imitiS" 
                        class="controlContent" style="display: block;
                        width: 100%; height: 20px; background-color: rgba(255, 255, 255, 0.5);
                        margin-bottom: 5px;
                        border: 1px solid white;">
                        <div class="contentElement11">
                            {{ index + 1 }}
                        </div> 
                        <div class="contentElement2">
                            {{ umuti.name_umuti }}
                        </div> <div class="contentElement3">
                            {{ (umuti.quantite_restant || umuti.quantity ) }}
                        </div> 

                        <div class="contentElement4 famille_med">
                            <span v-if="isAdmin">{{ umuti.price_in }}</span>
                            <span v-else>{{ umuti.famille_med }}</span>
                            
                        </div>

                        <div class="contentElement3">
                            {{ umuti.price_out }}
                        </div>

                        <div class="contentElement3 total">
                            {{ umuti.price_out * (umuti.quantite_restant || umuti.quantity) }}
                        </div>

                        <div class="contentElement4"> 
                        <span v-if="isAdmin">{{ (umuti.price_out - umuti.price_in) * (umuti.quantite_restant || umuti.quantity) }}</span> 
                        <span v-else>{{ umuti.location }}</span>
                        </div>

                        <div class="contentElement4">
                            {{ (umuti.date_last_vente 
                            || umuti.date_operation || 
                            umuti.date_winjiriyeko ||
                            '_____________').slice(6,10) }}
                        </div>
                        <div class="contentElement4">
                            {{ umuti.operator }}
                        </div>
                    </div>
                </div>

                <div class="controlFooter">
                    <div  class="controlContent" style="font-weight: 700;">
                        <div class="contentElement1">
                            #
                        </div> 
                        <div class="contentElement2">
                            TOTAL
                        </div> 
                        <div class="contentElement3">
                            {{ totaux[0] }}
                        </div>

                        <div class="contentElement3">
                            <!-- {{ (totaux[1] / (totaux[0] || 1)).toFixed(1) }} -->
                              <!-- ---- -->
                              
                            <span v-if="isAdmin">{{ totaux[2] }}</span>
                            <span v-else>----</span>
                        </div>

                        <div class="contentElement3">
                            {{ totaux[1] }}
                        </div>

                        <div class="contentElement4">
                            ----
                        </div>

                        <div class="contentElement4">
                            <span v-if="isAdmin">{{ totaux[3] }}</span> 
                            <span v-else>----</span> 
                        </div>

                        <div class="contentElement4">
                            ----
                        </div>
                    </div>
                </div>
                                   
            </div>