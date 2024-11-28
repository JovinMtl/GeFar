<template>
    <div class="reduction">
        <div style="font-style:italic;
            align-self:center;">
        Un client spécial?

            </div>
            <div class="rdBtn" 
            :class="rdBtnActive ? 'rdBtn-1':'rdBtn-2'"
            @click="isSpecial">
            </div>
    </div>
</template>