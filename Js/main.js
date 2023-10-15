// Letters

const letters = "abcdefghijklmnopqrstuvwxyz123456789'-";
let timer = document.querySelector("#timer");
let counterBox = document.querySelector(".counter");
let hintBtn = document.querySelector(".hint .hint-p .hint-btn");
let hintResult = document.querySelector(".hint .hint-p .hint-result");
// Get an array of letters
let lettersArray = Array.from(letters);
//Select letter container
let lettersContainer = document.querySelector(".letters");
    startTimer(timer);
//Generate Letters
lettersArray.forEach(letter => {
    //create span for each letter
    let span = document.createElement("span");
    // span.textContent = letter;

    //create text node letter
    let theLetter = document.createTextNode(letter);
    //Append the letter to the span
    span.appendChild(theLetter);
    // add a class to the span
    span.className = "letter";

    // append the span to the letters container
    lettersContainer.appendChild(span);

});
//Create an object of words that will be added to the game
const words ={
    Animaux:["Baleine","Aigle","Carpe","Chauve-souris","Dauphin", "Ecureuil", "Castor", "Chimpanze", "Cigale", "Corbeau", "Gazelle", "Girafe", "Grenouille", "Hamster", "Hibou", "Hyene", "Jaguar", "Koala", "Lama", "Leopard", "Loutre", "Moineau", "Panda", "Perroquet", "Perruche", "Rhinoceros", "Serpent", "Souris", "Zèbre" ],
    Pays:["France","Espagne","Allemagne","Egypte","Tunisie","Bresil","Perou","Algerie", "Angola", "Arabie saoudit", "Argentina", "Australie", "Autriche", "Bahrein", "Belgique", "Benin", "Bolivie", "Botswana", "Cameroun", "Canada", "Chili", "chine", "Congo", "Croatie", "Danemark", "Djibouti", "Dominique", "Emirats arabes unis", "Etats-Unis de Amrique", "Finlande", "Gabon", "Grece","Haiti","Hongrie","Inde","Iraq","Irlande","Italie","Japon","Malte","Maroc","Turquie","Ukraine","Russie","Royaume-Uni"],
    Celebrites:["Aristote","Archimede","Leonard de Vinci","Galilee","Newton","Faraday","Marie Curie","Louis Pasteur","Alan Turing","Tesla","Einstein","Mohamed","Isaac Newton","Jesus Christ","Bouddha","Confucius","Christophe Colomb","Moise","Charles Darwin","Auguste Cesar","Martin Luther","Karl Marx","William Shakespeare","Alexandre le Grand","Napoleon Bonaparte","Ludwig van Beethoven","Max Planck","Gregor Mendel"],
    Plants:["Arachide","Bambou","Aneth","Basilic","Cerfeuil","Curcuma","Gingembre","Persil","pomme de terre","Citrus","cocotier","kiwi","Jasmin","Melissa","Menthe","piment","Tournesol","Radis","oignon","Ali"],
    Livres:["Le Coran","La Bible","Le Petit livre rouge","Don Quichotte","Le Petit Prince","Le Seigneur des anneaux","La série Harry Potter","Alice aux pays des merveilles","Le Journal d’Anne Frank",
"1984","Orgueil et Préjugés","Gatsby le Magnifique","L’Alchimiste","L’Attrape-cœurs","Lolita","Cent ans de solitude","La ferme des animaux","Ne tirez pas sur l’oiseau moqueur","Le Vieil Homme et la Mer"]
}
// Get a random property
let allKeys = Object.keys(words);

//get a random number form all the keys in the array
let randomPropNumber = Math.floor(Math.random() * allKeys.length);

// Get the random property name depending on the random property number
let randomPropName = allKeys[randomPropNumber];

// Get the random property value depending on the random property key number
let randomPropValue = words[randomPropName];


//repeat  the same thing but with the value
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

let randomValueName = randomPropValue[randomValueNumber];

//identify the category case
let categoryName = document.querySelector(".category span");
categoryName.innerHTML = randomPropName;


//Identify the Letters guess container
let lettersGuessContainer = document.querySelector(".letters-guess");
//Get Array from the chosen word
let lettersGuessWordArray = Array.from(randomValueName);
//loop through the word to create spans equal to the numbers of letters
//Create the hint operation
hintBtn.onclick = function () {
    hintResult.classList.toggle("show");
    hintResult.innerHTML = lettersGuessWordArray[0];
}
lettersGuessWordArray.forEach(letter =>{
    let letterSpan = document.createElement("span");
    letterSpan.className = "letter-span";
    if(letter === ' '||letter === '-' ) {
        letterSpan.className = "has-space";
    }
    
    lettersGuessContainer.appendChild(letterSpan);

});

//get all the guess spans
let letterGuessSpans = document.querySelectorAll(".letters-guess span");

//Set the wrong attempt number
let wrongAttempt = 0;

// set the draw
let theDraw = document.querySelector(".game-draw")
let duration = 1000;

//Handling the clicking operations
document.addEventListener("click", (e)=>{
    //set the status of the letter guess
    
    let theStatus = false;
    if(e.target.className == "letter"){
        //add class clicked to the element
        e.target.classList.add("clicked");

        lettersContainer.classList.add("stop-clicking");
        setTimeout(() => {
    
            lettersContainer.classList.remove("stop-clicking");
        }, 1500);
        // Get the clicked Letter
        let theClickedLetter = e.target.innerHTML.toLowerCase();

        //The Chosen word
        let theChosenWord =Array.from(randomValueName.toLowerCase());
        // console.log(lettersGuessWordArray);
        theChosenWord.forEach((wordLetter, wordIndex) =>{
            if(theClickedLetter == wordLetter){

                //Change the status to true
                theStatus = true;
                //loop through all the guess spans to get the right place
                letterGuessSpans.forEach((span, spanIndex) =>{

                    //if the word index is the same span index then put the word letter into the span
                    if(spanIndex == wordIndex){
                        span.innerHTML = wordLetter;

                        span.classList.add("right");

                    }

                });

            }

        });
        //Control the wrong attempt
        if(theStatus !== true){

            //increase the number of wrong attempts
            wrongAttempt ++;
            // add a class wrong to the draw
            theDraw.classList.add(`wrong-${wrongAttempt}`);
            //Play the fail Sound
            document.getElementById("fail").play();

            //check if the wrong attempt more than 8
            if(wrongAttempt === 8) {
                //call the end game function
                endGame();

                //add class finished to the letters container
                lettersContainer.classList.add("lost");
            }
        }
        else{
            document.getElementById("success").play();
            let allGuessSpans = Array.from(letterGuessSpans);
            let rightSpans = allGuessSpans.filter(span => span.classList.contains("right"));
            if(theChosenWord.length == rightSpans.length){
                winGame();
                lettersContainer.classList.add("finished");
            }
        }
    }
});

//Create the end game function
function endGame(){
    counterBox.style.display = 'none';
    //Create a popup lose game
    let loseDiv = document.createElement("div");
    //create the text in th div
    // let divText = document.createTextNode(`<span>Game Over</span>` );
    // //append the text to the div
    // loseDiv.appendChild(divText);
    loseDiv.innerHTML = `
        <div class="gameOver">
        <span class="lose-span">Game Over</span>
        La bonne Reponse est <strong class="bonne-reponse">${randomValueName}</strong>
        <p class="loss-p">Ton Temp est<span class="your-time">${60 - time} Seconds</span></p>
        </div>
    `;

    //Add A class to the div
    loseDiv.className = "game-lose";
    //append the div to the body
    document.body.appendChild(loseDiv);
    document.getElementById("game-over").play();
}
let gameRank = "";
function winGame(){

    //create popup
    counterBox.style.display = 'none';
        if(wrongAttempt <=1){
            gameRank = "EXPERT";
        }
        else if(wrongAttempt >=2 <=4){
            gameRank = "Pro";
        }
        else if(wrongAttempt >=3 <=5){
            gameRank = "Medium";
        }
        else if(wrongAttempt >=6 <8){
            gameRank = "Beginner";
        }
    let winDiv = document.createElement("div");

        winDiv.className = "game-win";
    let gameTime = document.createElement("span");
        gameTime.className = "game-time";
    let    gameTimeText = document.createTextNode("2:0");
    gameTime.appendChild(gameTimeText);
        winDiv.appendChild(gameTime);
    //create the content
    winDiv.innerHTML = `
    <div class="win">
        <p>Félicitations vous avez gagné avec seulement <span class="wrong-tries">${wrongAttempt} Error/s</span> </p>
        <p class="level">Ton Niveau est <span class="your-level">${gameRank}</span></p>
        <p class="win-p">Ton Temps est<span class="your-time">${ 60 - time} Seconds</span></p>
    </div>
    `;
    //append the div to the body
    document.body.appendChild(winDiv);
    document.getElementById("game-win").play();
    document.getElementById("game-win-2").play();
}
//restart button
let restartBtn = document.querySelector("#restart");
restartBtn.onclick = function() {
    location.reload();
}

// //Control the timer

const startingMinutes = 1;
let time = startingMinutes * 60
function startTimer(timerBox) {

    
let counter = setInterval(() =>{
    let min = Math.floor(time / 60 );
    let sec = time % 60 ;
    sec = sec < 1  ? '0' + sec : sec;
    time--;

    

    timerBox.innerHTML = `${min}:${sec}`;
    // console.log(`${min} : ${sec}`);
    if(time < 0 || lettersContainer.classList.contains("lost")){
        counterBox.style.display = 'none';
        clearInterval(counter);
        endGame();
     }
     if(time > 0 && lettersContainer.classList.contains("finished")){
        counterBox.style.display = 'none';
        clearInterval(counter);
        winGame();
     }

     if(time < 10 ){
        timer.style.color = "#7b0606";

     }
},1000)
}

// updateTimer();
// const startingMinutes = 1;
// let time = startingMinutes * 60 ;

// let updateTimer = function () {
//     let minutes = Math.floor(time / 60);
//     let secondes = minutes % 60;

//     secondes = secondes < 1  ? '0' + secondes : secondes;
//     timer.innerHTML = `${minutes}:${secondes}`;
//     time -- ;
// }
// const timerEl = setInterval(updateTimer, 1000);