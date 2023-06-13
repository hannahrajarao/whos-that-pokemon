const url = 'https://pokeapi.co/api/v2/pokemon/';
var currentName = "";
var score = 0;

const nameEntry = document.querySelector('#name-entry');
const timerNum = document.querySelector('#timer-num');
const timerMessage = document.querySelector('#timer-message');
const shinyMessage = document.querySelector('#shiny-message');

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
    document.querySelector('#check-answer-button').disabled = false;
    document.querySelector('#skip-button').disabled = false;
    showNewPokemon();
}

function startTimer() {
    document.querySelector('#start-button').style.display = 'none';
    showNewPokemon();
}

function showNewPokemon() {
    document.querySelector('#name-entry').value = "";
    document.querySelector('#shiny-message').innerHTML = "";
    const num = Math.floor(Math.random()*151)+1
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
    var text = document.querySelector('#name-entry').value;
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
    document.querySelector('#score').innerHTML = score;
}

function showShiny(imgEl, shiny_img) {
    console.log('shiny!');
    imgEl.src = shiny_img;
    document.querySelector('#shiny-message').innerHTML = "You found a shiny pokemon!";
}