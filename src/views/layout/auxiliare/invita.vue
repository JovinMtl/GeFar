<template>
    <div class="container">
        <div class="containerInv">
            <div class="invTitle">
                Invitation à la soutenance de Mémoire de Master
            </div>
            <div class="contenu">Vous êtes cordialement invité à assister à la soutenance publique
                de mon mémoire, realisé en vue de l' obtention du diplôme de Master en Sciences des Aliments et Nutrition,
                option Securité alimentaire et Changement climatique.
            </div>
            <div class="imagesContainer">
                <div class="logoUb">
                    <!-- <img src="../../Documents/tmp/ub.png" alt=""> -->
                </div>
                <div class="photoOlivier"></div>
                <div class="logoEansi"></div>
            </div>
            <div class="author">
                <span style="font-weight: 800;
                background: linear-gradient(to right, yellowgreen, black) ;
                background-clip: text;
                -webkit-text-fill-color: transparent;">
                    Olivier NKURIKIYE
                </span>
                <span style="margin-left: -5px;">,</span>
                <br>

                <span style="font-size: 0.8rem; display: block;
                    position: relative;top: -6px; font-style: italic;">
                    présentera:
                </span>
                
            </div>
            <div class="theme">
                <!-- <span style="font-size: 30px;">"</span>  -->
                "ANALYSE DE LA RESILIENCE DES SYSTEMES SOCIO-ECOLOGIQUES DES
                MENAGES RURAUX DU NORD DU BURUNDI."
            </div>
            <div class="lieu">
                <div class="place">
                    Campus Mutanga, dans l'une des salles 
                    de l'EANSI/ EX FACAGRO.
                </div>
                <div class="dateLieu">
                    09h00 <br> 
                    28 Juin, 2024
                </div>
            </div>
            <div class="enclosing">
                Pour feter cette étape, retrouvons-nous autour 
                d'une bière après la soutenance. 
                <span style="font-weight: 500;">Lieu: Bar EX DCA</span>.
            </div>
            
        </div>
    </div>
</template>
<script></script>
<style scoped>

*{
    background-color: rgb(115, 228, 243);
    background-color: white;
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    font-weight: 100;
}

.container{
    display: flex;
    height: 100vh;
    width: 100vw;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    margin: 0;
    padding: 0;
}

.containerInv{
    /* display: flex; */
    /* background-color: white; */
    width: 30%;
    height: 95%;
    background: linear-gradient(to top right,
                 rgba(165, 138, 104, 0.692), 
                 rgba(255, 255, 0, 0.274), 
                 rgba(255, 255, 255, 0.974) );
    margin: 30px;
    border-width: 5px;
    border-style: solid;
    border-image-source: linear-gradient(to top left, greenyellow, orange, red);
    border-image-slice:  1;
    text-align: center;
    justify-content: center;
    align-items: center;
}

.invTitle{
    width: 70%;
    height: 15%;
    font-size: 1.425rem;
    margin-left: 60px;
    margin-top: 5px;
    font-family: sans-serif;
    font-weight: 100;
    border-bottom: 1px solid black;
}

.contenu{
    width: 87%;
    /* height: 30%; */
    margin: 10px 10px;
    padding: 10px;
    border: 5px double white;
    background-color: rgba(255, 255, 255, 0.671);
    border-radius: 25px;
    /* transform: rotate3d(0, 205, 0); */
    /* background-color: white; */
}

.imagesContainer{
    width: 100%;
    height: 11%;
    background-color: goldenrod;
    /* background-color: transparent; */
    display: flex;
    justify-content: center;
    align-items: center;
}
.logoUb{
    width: 60px;
    height: 60px;
    background-color: white;
    /* border-radius: 55px; */
    margin-right: 55px;
    background-image: url('../../Documents/tmp/ub.png');
    background-size: cover;
}
.photoOlivier{
    width: 85px;
    height: 85px;
    background-color: white;
    border-radius: 55px;
    margin-right: 45px;
    background-image: url('../../Documents/tmp/IMG-20240619-WA0107_1.jpg');
    background-size: cover;
    border: 4px solid greenyellow;

}
.logoEansi{
    width: 78px;
    height: 60px;
    background-color: white;
    /* border-radius: 55px; */
    background-image: url('../../Documents/tmp/eansi.png');
    background-size: cover;
}
.theme{
    width: 96%;
    /* height: 20%; */
    margin: 10px;
    /* background-color: blue; */
}

.author{
    /* display: flex; */
    width: 100%;
    height: 5%;
    margin-top: 15px;
    justify-content: center;
    /* background-color: yellow; */
}


.lieu{
    display: flex;
    width: 100%;
    padding: 10px;
    /* height: 20%; */
    /* background-color: white; */
}
.place{
    width: 40%;
    /* background-color: red; */
    margin-right: 100px;
}
.dateLieu{
    height: 100%;
    text-align: right;
}

.enclosing{
    width: 80%;
    font-size: .7rem;
    border: 1px dashed black;
    margin-left: 50px;
}
</style>