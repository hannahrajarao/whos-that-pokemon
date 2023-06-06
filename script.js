const url = 'https://pokeapi.co/api/v2/pokemon/';
// const imgEl = document.querySelector('img');
async function showPokemon() {
    for(var i=1; i<=151; i++) {
        await fetch(url+i)
        .then(response => response.json())
        .then(data => {
            console.log(data.name);
            // var divEl = document.createElement('div');
            var imgEl = document.createElement('img');
            imgEl.src = data.sprites.front_default;
            // divEl.title = data.name;
            // divEl.appendChild(imgEl);
            document.querySelector('#pokemon-images').appendChild(imgEl);
        });
    }
}
showPokemon();

function skip() {
    console.log(currentName);
    showNewPokemon();
}

function incrementScore() {
    score++;
    document.querySelector('#score').innerHTML = score;
}