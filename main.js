// NOS VARIABLES 

// Variable Arrat contenant les cartes
const cardSet = ['images/cartes/carte0.jpg','images/cartes/carte1.jpg','images/cartes/carte2.jpg','images/cartes/carte3.jpg','images/cartes/carte4.jpg','images/cartes/carte5.jpg','images/cartes/carte6.jpg','images/cartes/carte7.jpg','images/cartes/carte8.jpg','images/cartes/carte9.jpg','images/cartes/carte10.jpg','images/cartes/carte11.jpg','images/cartes/carte12.jpg','images/cartes/carte13.jpg','images/cartes/carte14.jpg','images/cartes/carte15.jpg','images/cartes/carte16.jpg','images/cartes/carte17.jpg','images/cartes/carte18.jpg','images/cartes/carte19.jpg','images/cartes/carte20.jpg','images/cartes/carte21.jpg','images/cartes/carte22.jpg','images/cartes/carte23.jpg','images/cartes/carte24.jpg','images/cartes/carte25.jpg'];

// Variable score Joueur 1 et Joueur 2
let scorePlayerOne = 0;
let scorePlayerTwo = 0;

// Variable pour récupérer les valeurs des résultats des cartes
let scoreGlobal = 0; 
let scoreStolen= 0; 

// Au chargement de la page, les elements input et bouton pour choisir son nom de joueur est en display : none. Donc ce n'est pas affiché.
document.getElementById('namePlayer1').style.display = "none";
document.getElementById('namePlayer2').style.display = "none";
document.getElementById('buttonNamePlayer').style.display = "none";

// Variable réference des input pour choisir son nom de joueur
let namePlayer1 = document.getElementById('namePlayer1');
let namePlayer2 = document.getElementById('namePlayer2');

// Variable utilisées pour alterner le tour des joueurs
let playerOne = 0; // 0 est celui qui a la main, c'est à son tour 
let playerTwo = 1;


// Variable reférence des boutons "Jouer" pour chaque joueur. Chaque bouton appelle la fonction EachGame qui représente chaque tour. 
let buttonPlayerOne = document.getElementById('p1');
buttonPlayerOne.innerHTML = "Joueur 1" // Valeur par défault avant que l'on saisisse un nom de joueur
let buttonPlayerTwo = document.getElementById('p2');
buttonPlayerTwo.innerHTML = "Joueur 2"
// Les boutons pour jouer ne sont pas encore accessibles
buttonPlayerTwo.disabled = true; 
buttonPlayerOne.disabled = true;

// variable qui va chercher la ref de notre div où l'on affichera la carte piochée.
const card = document.querySelector('.card__inner');

// On envoie le résultat du score dans la div créé à cet effet. 
document.getElementById('scoreP1').innerHTML = scorePlayerOne;
document.getElementById('scoreP2').innerHTML = scorePlayerTwo;

// variable reférence pour la div yourTurn : Celle qui affichera l'information pour répondre à la question : A qui de jouer ?
let yourTurn = document.getElementById('yourTurn');
// yourTurn.classList.add('yourTurnStyle');

// variable ref pour la div winnerIs : Pour afficher le nom du gagnant à la fin de la partie
let winnerIs = document.getElementById('winnerIs');
// variable ref pour afficher des petites indications succeptibles d'apparaître pendant le jeu.
let rules = document.getElementById('rules');


// TOWER VARIABLES
const progressBar = document.getElementsByClassName('tower-progress1')[0];
const towerStyle = getComputedStyle(progressBar);
let towerStyleHeight = parseFloat(towerStyle.getPropertyValue('--height')) || 0;

const progressBar2 = document.getElementsByClassName('tower-progress2')[0];
const towerStyle2 = getComputedStyle(progressBar2);
let towerStyleHeight2 = parseFloat(towerStyle2.getPropertyValue('--height2')) || 0;


NewGame();

// Fonction NewGame pour commencer une nouvelle partie : un bouton Nouvelle partie est généré : en cliquant --> On appelle la fonction nameChoicePlayer
function NewGame(){
    let newGameField = document.getElementById('newGameField');
    newGame = document.createElement ('button');
    newGame.textContent = "Nouvelle Partie";
    newGame.classList.add('JsButton');
    newGameField.append(newGame);
 
    newGame.addEventListener('click', nameChoicePlayer);

    namePlayer1.value = "";
    namePlayer2.value = "";

    rules.innerHTML="";
} 

// Fonction nameChoicePlayer pour choisir son nom de joueur : Dans le HTML ces deux input ont un bouton submit : en cliquant --> On apelle la fonction resetGame
function nameChoicePlayer(){
    document.getElementById('namePlayer1').style.display = "block";
    document.getElementById('namePlayer2').style.display = "block";
    document.getElementById('buttonNamePlayer').style.display = "block";

    winnerIs.innerHTML = " ";
    yourTurn.innerHTML = " ";

    newGame.parentNode.removeChild(newGame);

    // newGame.addEventListener('click', resetGame);
}

// La fonction resetGame permet : 
// - de remettre à zéro les scores des joueurs (dans les variables et dans l'affichage) ainsi que les variables utilisées pour alterner les tours.
// - remettre à zéro également les variables CSS sur la hauteur.
// - de faire disparaitre les inputs et le bouton du choix de nom de joueur
// - d'afficher sur les boutons les noms de joueur choisis 
// - de rendre possible le tour seulement pour l'un des deux joueurs.
// - de donner une indication pour répondre à : Qui commence ?
function setGame(){
    
    buttonPlayerOne.innerHTML = namePlayer1.value;
    buttonPlayerTwo.innerHTML = namePlayer2.value;

    document.getElementById('namePlayer1').style.display = "none";
    document.getElementById('namePlayer2').style.display = "none";
    document.getElementById('buttonNamePlayer').style.display = "none";

    buttonPlayerTwo.disabled = true;
    buttonPlayerOne.disabled = false;
    yourTurn.innerHTML = namePlayer1.value +" à toi l'honneur !";
    
    winnerIs.innerHTML = "";

    scorePlayerOne = 0;
    scorePlayerTwo = 0;

    playerOne = 0;
    playerTwo = 1;

    document.getElementById('scoreP1').innerHTML = scorePlayerOne;
    document.getElementById('scoreP2').innerHTML = scorePlayerTwo;

    progressBar.style.setProperty('--height', towerStyleHeight + 0);
    progressBar2.style.setProperty('--height2', towerStyleHeight2 + 0);
}



// Fonction appelée à chaque fois qu'un joueur joue --> Cette dernière appelle la fonction cardResult
function eachGame(){

buttonPlayerTwo.disabled = true;
buttonPlayerOne.disabled = true;   

yourTurn.innerHTML = "";
rules.innerHTML = "";

card.classList.toggle('is-flipped'); //effet flip card on click

cardResult(); //function card random + carte value + function finishRound

} 


function cardResult(){

    let randomNum = Math.floor(Math.random() * cardSet.length);
    // console.log("le numero de carte généré" + randomNum);
    // console.log(imageCollection.length)
    document.getElementById("card__content").src = cardSet[randomNum];
    
    
    if(randomNum === 2 || randomNum === 3 || randomNum === 10 || randomNum === 11 || randomNum === 16 || randomNum === 17 || randomNum === 20 || randomNum === 21 || randomNum === 22 || randomNum === 23 || randomNum === 24 || randomNum === 25){

        scoreGlobal +=5;
        // console.log("Votre score sera incrémenté de :" + scoreGlobal)
    } else if(randomNum === 4){
        scoreGlobal +=2;
        // console.log("Votre score sera incrémenté de :" + scoreGlobal)
    } else if(randomNum === 5){
        scoreGlobal +=3;
        // console.log("Votre score sera incrémenté de :" + scoreGlobal)
    } else if(randomNum === 9 || randomNum === 15 || randomNum === 18 || randomNum === 19){
        scoreGlobal -=2;
        // console.log("Votre score sera incrémenté de :" + scoreGlobal)
    } else if(randomNum === 6 || randomNum === 14){
        scoreGlobal -=3;
        // console.log("Votre score sera incrémenté de :" + scoreGlobal)
    } else if(randomNum === 8){
        scoreGlobal -=5;
        // console.log("Votre score sera incrémenté de :" + scoreGlobal)
    } else if(randomNum === 7){
        scoreGlobal -=10;
        // console.log("Votre score sera incrémenté de :" + scoreGlobal)
    } else if(randomNum === 0){
        scoreStolen +=10
      
    } else if(randomNum === 1 || randomNum === 12 || randomNum === 13){
        scoreStolen +=5
    
    }

    let buttonAcceptField = document.getElementById('buttonAcceptField');
    buttonAccept = document.createElement ('button');
    buttonAccept.textContent = "J'accepte mon destin";
    buttonAccept.classList.add('JsButton')

    buttonAcceptField.append(buttonAccept);

    buttonAccept.addEventListener('click', finishRound);
}

function finishRound(){

    // On enlève le boutton "j'accepte mon destin" après avoir cliqué dessus
    buttonAccept.parentNode.removeChild(buttonAccept);

    // On refait flipper la card pour retourner sur la face caché du paquet
    card.classList.toggle('is-flipped');

    //reset de la value de la propriété css --height avant de la recalculer
    progressBar.style.setProperty('--height', towerStyleHeight + 0);
    progressBar2.style.setProperty('--height2', towerStyleHeight2 + 0);

    
    // ENSEMBLE DES CONDITIONS POUR CALCULER LES SCORES

    //CONDITION POUR PAS DE SCORE NEGATIF
    if(playerOne === 0 && scoreGlobal < 0 && (scorePlayerOne === 0 || scorePlayerOne < Math.abs(scoreGlobal))){
        scorePlayerOne = 0;
        
    } else if(playerTwo === 0 && scoreGlobal < 0 && (scorePlayerTwo === 0 || scorePlayerTwo < Math.abs(scoreGlobal))){
        scorePlayerTwo = 0;
        

    // CONDITION POUR PAS DE SCORE NEGATIF EN CAS DE STOLEN CARD
    } else if(playerOne === 0 && scorePlayerTwo < scoreStolen){
        scorePlayerOne += scorePlayerTwo;
        scorePlayerTwo = 0;
        rules.innerHTML = "Vous ne pouvez voler à " + namePlayer2.value +" les points qu'il n'a pas...";
    } else if(playerTwo === 0 && scorePlayerOne < scoreStolen){
        scorePlayerTwo += scorePlayerOne;
        scorePlayerOne = 0;
        rules.innerHTML = "Vous ne pouvez voler à " + namePlayer1.value +" les points qu'il n'a pas...";
    }

    // ET TOUT LE RESTE DES CONDITIONS DE SCORE
    else if(playerOne === 0){
        scorePlayerOne = scorePlayerOne + scoreGlobal + scoreStolen;
        scorePlayerTwo = scorePlayerTwo - scoreStolen;
        console.log("score joueur 1=" + scorePlayerOne); 
    } else if(playerTwo === 0){
        scorePlayerTwo = scorePlayerTwo + scoreGlobal + scoreStolen;
        scorePlayerOne = scorePlayerOne - scoreStolen;
        console.log("score joueur 2:" + scorePlayerTwo); 
    } 

  

    document.getElementById('scoreP1').innerHTML = scorePlayerOne;
    document.getElementById('scoreP2').innerHTML = scorePlayerTwo;


    if (playerOne === 0){
        yourTurn.innerHTML = namePlayer2.value+" c'est ton tour !"
    } else{
        yourTurn.innerHTML = namePlayer1.value+" c'est ton tour !" 
    }

    alternPlayer();

    
    if(scorePlayerOne >= 30 || scorePlayerTwo >= 30){
        setGameOver();
    } 
    
    scoreGlobal = 0;
    scoreStolen = 0;

    // CONDITION PROGRESS BAR PLAYER ONE 
    
    if(scorePlayerOne >= 3 && scorePlayerOne < 6){
        progressBar.style.setProperty('--height', towerStyleHeight + 10);
    } else if(scorePlayerOne >= 6 && scorePlayerOne < 9){
        progressBar.style.setProperty('--height', towerStyleHeight + 20);
    } else if(scorePlayerOne >= 9 && scorePlayerOne < 12){
        progressBar.style.setProperty('--height', towerStyleHeight + 30);
    } else if(scorePlayerOne >= 12 && scorePlayerOne < 15){
        progressBar.style.setProperty('--height', towerStyleHeight + 40);
    } else if(scorePlayerOne >= 15 && scorePlayerOne < 18){
        progressBar.style.setProperty('--height', towerStyleHeight + 50);
    } else if(scorePlayerOne >= 18 && scorePlayerOne < 21){
        progressBar.style.setProperty('--height', towerStyleHeight + 60);
    } else if(scorePlayerOne >= 21 && scorePlayerOne < 24){
        progressBar.style.setProperty('--height', towerStyleHeight + 70);
    } else if(scorePlayerOne >= 24 && scorePlayerOne < 27){
        progressBar.style.setProperty('--height', towerStyleHeight + 80);
    } else if(scorePlayerOne >= 27 && scorePlayerOne < 30){
        progressBar.style.setProperty('--height', towerStyleHeight + 90);
    } else if(scorePlayerOne >= 30){
        progressBar.style.setProperty('--height', towerStyleHeight + 100);
    }

    // CONDITION PROGRESS BAR PLAYER 2
    if(scorePlayerTwo >= 3 && scorePlayerTwo < 6){
        progressBar2.style.setProperty('--height2', towerStyleHeight2 + 10);
    } else if(scorePlayerTwo >= 6 && scorePlayerTwo < 9){
        progressBar2.style.setProperty('--height2', towerStyleHeight2 + 20);
    } else if(scorePlayerTwo >= 9 && scorePlayerTwo < 12){
        progressBar2.style.setProperty('--height2', towerStyleHeight2 + 30);
    } else if(scorePlayerTwo >= 12 && scorePlayerTwo < 15){
        progressBar2.style.setProperty('--height2', towerStyleHeight2 + 40);
    } else if(scorePlayerTwo >= 15 && scorePlayerTwo < 18){
        progressBar2.style.setProperty('--height2', towerStyleHeight2 + 50);
    } else if(scorePlayerTwo >= 18 && scorePlayerTwo < 21){
        progressBar2.style.setProperty('--height2', towerStyleHeight2 + 60);
    } else if(scorePlayerTwo >= 21 && scorePlayerTwo < 24){
        progressBar2.style.setProperty('--height2', towerStyleHeight2 + 70);
    } else if(scorePlayerTwo >= 24 && scorePlayerTwo < 27){
        progressBar2.style.setProperty('--height2', towerStyleHeight2 + 80);
    } else if(scorePlayerTwo >= 27 && scorePlayerTwo < 30){
        progressBar2.style.setProperty('--height2', towerStyleHeight2 + 90);
    } else if(scorePlayerTwo >= 30){
        progressBar2.style.setProperty('--height2', towerStyleHeight2 + 100);
    }
   
}


function alternPlayer(){

    if(playerOne === 0){
        buttonPlayerTwo.disabled = false;
        buttonPlayerOne.disabled = true;
        playerOne +=1;
        playerTwo -=1;
    } else if(playerTwo === 0){
        buttonPlayerOne.disabled = false;
        buttonPlayerTwo.disabled = true;
        playerTwo += 1;
        playerOne -= 1;   
    }

}

function setGameOver(){

    buttonPlayerTwo.disabled = true;
    buttonPlayerOne.disabled = true;
    

    // console.log("Le jeu est fini")
    
    yourTurn.innerHTML ="La partie est terminée !";
    
    if(scorePlayerOne >= 30){
        winnerIs.innerHTML = namePlayer1.value+ " a gagné ! Il/Elle est en haut de la tour d'argent !"
    } else if(scorePlayerTwo >= 30){
        winnerIs.innerHTML = namePlayer2.value+ " a gagné ! Il/Elle est en haut de la tour d'argent !"
    }

   NewGame();
  
}


