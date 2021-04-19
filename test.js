let imageCollection = ["images/batman_storm.jpg", "images/clavier-storm.jpg", "images/dog-work.jpg", "images/daniel-cheung.jpg"]

let playerOne = 0
let playerTwo = 1

let buttonPlayerOne = document.getElementById('j1');
let buttonPlayerTwo = document.getElementById('j2');

let score = 0;


function showRandomImage(){


if(playerOne === 0){
    buttonPlayerTwo.disabled = true;
    buttonPlayerOne.disabled = false;
    document.getElementById('whosplayer').innerHTML = "Joueur 1 à toi"
} else if(playerTwo === 0){
    buttonPlayerOne.disabled = true;
    buttonPlayerTwo.disabled = false;
    document.getElementById('whosplayer').innerHTML = "Joueur 2 à toi"
}
  
    let randomNum = Math.floor(Math.random() * imageCollection.length);
    console.log(randomNum);
    // console.log(imageCollection.length)
    document.getElementById("displayImage").src = imageCollection[randomNum];

    if(randomNum === 0){
        score = score + 5;
        console.log("batman in storm : Vous gagnez 5 points Votre score est maintenant de:" + score)

    } else if (randomNum === 1){
        score = score + 5;
        console.log("le clavier storm caché : Vous gagnez 5 points, votre score maintenant : " + score)
    } else if (randomNum === 2){
        if(score === 0){
            score = score
            console.log("votre score reste inchangé, vous êtes déjà assez bas. Votre score:" + score)
        } else{
        score = score - 5;
        console.log("chien qui bosse : Vous perdez 5 points. Votre score now :" + score)
        }
    } else if (randomNum === 3){
        console.log("daniel cheung, c'est quoi ?" + score)
    }

    if(playerOne === 0){
        playerOne += 1;
        playerTwo -= 1;
    } else if (playerTwo === 0){
        playerTwo += 1;
        playerOne -= 1;
    }
    
    console.log(playerOne);
    console.log(playerTwo);
}


