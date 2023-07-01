const url = 'https://pokeapi.co/api/v2/pokemon/';
var currentName = "";
var currentTime = 60;
var score = 0;

const nameEntry = document.querySelector('#name-entry');
const timerNum = document.querySelector('#timer-num');
const timerMessage = document.querySelector('#timer-message');
const shinyMessage = document.querySelector('#shiny-message');
const scoreEl = document.querySelector('#score');

timerNum.innerHTML = currentTime;

function startZenMode() {
    timerMessage.style.visibility = 'hidden';
    startGame();
}

function startTimedMode() {
    timerMessage.style.visibility = 'visible';
    startTimer();
    startGame();
}

function startGame() {
    nameEntry.disabled = false;
    resetScore();
    document.querySelector('#check-answer-button').disabled = false;
    document.querySelector('#skip-button').disabled = false;
    showNewPokemon();
}

function startTimer() {
    currentTime = 60;
    const timerInterval = setInterval(() => {
        if(currentTime <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
        else {
            currentTime--;
            document.querySelector('#timer-num').innerHTML = currentTime;
        }
    }, 1000);
}

function resetText() {
    nameEntry.value = "";
    shinyMessage.innerHTML = "";
}

function showNewPokemon() {
    resetText();
    const num = Math.floor(Math.random()*151)+1;
    fetch(url+num)
        .then(response => response.json())
        .then(data => {
            var imgEl = document.querySelector('#pokemon-img');
            if(Math.random()*512 < 1)
                showShiny(imgEl, data.sprites.front_shiny);
            else
                imgEl.src = data.sprites.front_default;
            const name = data.name;
            if(name.includes('nidoran'))
                currentName = 'nidoran';
            else if(name === 'mr-mime')
                currentName = 'mr. mime';
            else
                currentName = name;
            console.log(name);
        });
}

function enter(event) {
    event.preventDefault();
    if(event.keyCode === 13)
        checkAnswer();
}

function checkAnswer() {
    var text = nameEntry.value;
    if(text === currentName) {
        incrementScore();
        showNewPokemon();
    }
}

function skip() {
    console.log('The answer was '+currentName);
    showNewPokemon();
}

function incrementScore() {
    score++;
    scoreEl.innerHTML = score;
}

function resetScore() {
    score = 0;
    scoreEl.innerHTML = 0;
}

function showShiny(imgEl, shiny_img) {
    console.log('shiny!');
    imgEl.src = shiny_img;
    shinyMessage.innerHTML = "You found a shiny pokemon!";
}

function endGame() {
    nameEntry.disabled = true;
    document.querySelector('#check-answer-button').disabled = true;
    document.querySelector('#skip-button').disabled = true;
}
