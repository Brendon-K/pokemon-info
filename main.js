let pokemon;
let types;

// load the JSON files 
let pokemon_promise = $.getJSON('https://raw.githubusercontent.com/Brendon-K/pokemon-info/main/pokemon.json', function(data) {
  pokemon = data;
});

let types_promise = $.getJSON('https://raw.githubusercontent.com/Brendon-K/pokemon-info/main/pokemon_types.json', function(data) {
  types = data;
});


$.when(pokemon_promise, types_promise).done(function() {
  let num_pokemon = pokemon.length;

  // add all pokemon to drop down
  let drop_down = document.getElementById("pokemon");
  for (let i = 0; i < num_pokemon; ++i) {
    let selection = document.createElement("option");
    selection.text = pokemon[i]['name'];
    drop_down.add(selection);
  }
});

function load_stats() {
  // get pokemon name
  let pokemon_name = document.getElementById("pokemon").value;

  // do nothing if the default selection is picked
  if (pokemon_name == "Select a Pokémon") return;

  // find the JSON entry for the selected pokemon
  let index = pokemon.findIndex(function(item, i){
    return item.name === pokemon_name
  });
  let selected_pokemon = pokemon[index];

  // add pokemon title info
  document.getElementById('pokemon-number').innerHTML = selected_pokemon['number'];
  document.getElementById('pokemon-name').innerHTML = selected_pokemon['name'];

  // add pokemon type info
  let num_types = selected_pokemon['type'].length;
  let type1 = selected_pokemon['type'][0];
  let type2 = num_types > 1 ? selected_pokemon['type'][1] : "";

  document.getElementById('pokemon-type1').innerHTML = type1;
  if (num_types > 1) {
    document.getElementById('pokemon-type2').innerHTML = type2;
  }

  // add pokemon matchup info
  let matchups = new Object();
  matchups.Normal = 1;
  matchups.Fire = 1;
  matchups.Water = 1;
  matchups.Electric = 1;
  matchups.Grass = 1;
  matchups.Ice = 1;
  matchups.Fighting = 1;
  matchups.Poison = 1;
  matchups.Ground = 1;
  matchups.Flying = 1;
  matchups.Psychic = 1;
  matchups.Bug = 1;
  matchups.Rock = 1;
  matchups.Ghost = 1;
  matchups.Dragon = 1;
  matchups.Dark = 1;
  matchups.Steel = 1;
  matchups.Fairy = 1;
  // loop through selected pokemon types
  for (let i = 0; i < num_types; ++i) {
    let type = selected_pokemon['type'][i];
    // for each type, change relevant matchup information
    // weaknesses
    let num_weaknesses = types[type]['weak'].length;
    for (let j = 0; j < num_weaknesses; ++j) {
      matchups[types[type]['weak'][j]] *= 2;
    }

    // resists
    let num_resists = types[type]['resist'].length;
    for (let j = 0; j < num_resists; ++j) {
      matchups[types[type]['resist'][j]] *= 0.5;
    }

    // immunities
    let num_immunities = types[type]['immune'].length;
    for (let j = 0; j < num_immunities; ++j) {
      matchups[types[type]['immune'][j]] = 0;
    }
  }

  // add info to page
  document.getElementById('pokemon-weaknesses').innerHTML = 'None';
  let first_weakness = true;
  document.getElementById('pokemon-resists').innerHTML = 'None';
  let first_resist = true;
  document.getElementById('pokemon-immunities').innerHTML = 'None';
  let first_immunity = true;
  for (const matchup in matchups) {
    if (matchups[matchup] > 1) {
      if (first_weakness) {
        first_weakness = false;
        document.getElementById('pokemon-weaknesses').innerHTML = '';
      } else {
        document.getElementById('pokemon-weaknesses').innerHTML += '<br>'
      }
      document.getElementById('pokemon-weaknesses').innerHTML += matchup + ' ' + matchups[matchup];
    } else if (matchups[matchup] > 0 && matchups[matchup] < 1) {
      if (first_resist) {
        first_resist = false;
        document.getElementById('pokemon-resists').innerHTML = '';
      } else {
        document.getElementById('pokemon-resists').innerHTML += '<br>'
      }
      document.getElementById('pokemon-resists').innerHTML += matchup + ' ' + matchups[matchup];
    } else if (matchups[matchup] == 0) {
      if (first_immunity) {
        first_immunity = false;
        document.getElementById('pokemon-immunities').innerHTML = '';
      } else {
        document.getElementById('pokemon-immunities').innerHTML += '<br>'
      }
      document.getElementById('pokemon-immunities').innerHTML += matchup;
    }
  }

  // add pokemon stats
  document.getElementById('total').innerHTML = selected_pokemon['total'];
  document.getElementById('hp').innerHTML = selected_pokemon['hp'];
  document.getElementById('attack').innerHTML = selected_pokemon['attack'];
  document.getElementById('defense').innerHTML = selected_pokemon['defense'];
  document.getElementById('sp-attack').innerHTML = selected_pokemon['sp.attack'];
  document.getElementById('sp-defense').innerHTML = selected_pokemon['sp.defense'];
  document.getElementById('speed').innerHTML = selected_pokemon['speed'];

  // add pokemon evolutions
  if (selected_pokemon['prev_evo'] !== null) {
    // find the JSON entry for the previous evolution
    let index = pokemon.findIndex(function(item, i){
      return item.number === selected_pokemon['prev_evo']
    });
    let evolution = pokemon[index];
    document.getElementById('previous-evo').innerHTML = evolution['number'] + ' ' + evolution['name'];
  } else {
    document.getElementById('previous-evo').innerHTML = 'None';
  }

  document.getElementById('next-evo').innerHTML = '';
  if (selected_pokemon['next_evo'] !== [null]) {
    let num_evos = selected_pokemon['next_evo'].length;
    for (let i = 0; i < num_evos; ++i) {
      // find the JSON entry for the next evolution
      let index = pokemon.findIndex(function(item, j){
        return item.number === selected_pokemon['next_evo'][i]
      });
      let evolution = pokemon[index];
      if (i > 0) document.getElementById('next-evo').innerHTML += '<br>';
      document.getElementById('next-evo').innerHTML += evolution['number'] + ' ' + evolution['name'];
    }
  } else {
    document.getElementById('next-evo').innerHTML = 'None';
  }
}