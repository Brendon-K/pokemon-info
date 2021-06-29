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
  let num_types = types.length;

  // add all types to drop down boxes
  let drop_down1 = document.getElementById("type1");
  for (const type in types) {
    let selection = document.createElement("option");
    selection.text = type;
    drop_down1.add(selection);
  }
  let drop_down2 = document.getElementById("type2");
  for (const type in types) {
    let selection = document.createElement("option");
    selection.text = type;
    drop_down2.add(selection);
  }
});

function get_matchups(selected_types) {
  let num_types = selected_types.length;
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
    let type = selected_types[i];
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
;
}

function load_type_info() {
  let default_text = "Select a Type";
  let type1 = document.getElementById('type1').value;
  let type2 = document.getElementById('type2').value;
  let selected_types = [type1, type2];

  // get the type(s) selected
  for (let i = 1; i >= 0; --i) {
    if (selected_types[i] == default_text) {
      selected_types.splice(i, 1);
    }
  }

  // make sure there are no duplicates
  if (selected_types.length == 2) {
    if (selected_types[0] == selected_types[1]) {
      selected_types.splice(1, 1);
    }
  }

  if (selected_types.length < 1) {
    console.log("No types selected");
  } else {
    get_matchups(selected_types);
  }

}