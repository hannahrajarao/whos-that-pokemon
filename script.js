const url = 'https://pokeapi.co/api/v2/pokemon/';
var currentName = "";
var score = 0;

function startTimer() {
    document.querySelector('#start-button').style.visibility = 'hidden';
    showNewPokemon();
}

function showNewPokemon() {
    document.querySelector('#name-entry').value = "";
    const num = Math.floor(Math.random()*151)+1
    fetch(url+num)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var imgEl = document.querySelector('#pokemon-img');
            imgEl.src = data.sprites.front_default;
            const name = data.name
            if(name.includes('nidoran'))
                currentName = 'nidoran';
            else
                currentName = name;
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
        console.log("Correct!");
        incrementScore();
        showNewPokemon();
    }
}

function skip() {
    console.log(currentName);
    showNewPokemon();
}

function incrementScore() {
    score++;
    document.querySelector('#score').innerHTML = score;
}