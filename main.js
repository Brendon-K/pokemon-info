var pokemon;
var types;

//Load the character 
var pokemon_promise = $.getJSON('https://raw.githubusercontent.com/Brendon-K/pokemon-info/main/pokemon.json', function(data) {
  pokemon = data;
});

var types_promise = $.getJSON('https://raw.githubusercontent.com/Brendon-K/pokemon-info/main/pokemon_types.json', function(data) {
  types = data;
});


$.when(pokemon_promise, types_promise).done(function() {

});