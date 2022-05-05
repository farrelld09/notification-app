import React, { useState, useEffect } from 'react';

export function PokemonFetcher() {
    // const [havePokemonBeenFetched, setHasBeenFetched] = useState(false);
    const [pokedex, updatePokedex] = useState(JSON.parse(window.localStorage.getItem('pokedex')) || []);
    const [pokemonCount, decrementPokemon] = useState(5);

    // const fetchPokemon = () => {
    //     if (!havePokemonBeenFetched) setHasBeenFetched(true);
    // }

    useEffect(() => {
        const interval = setInterval(() => {
            if (pokemonCount > 0) {   
                decrementPokemon(pokemonCount => pokemonCount - 1);
      
                const pokemonIndex = Math.floor(Math.random() * 150) + 1;

                return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`)
                    .then(response => response.json())
                    .then(pokemonData => {
                        console.log('pokemonData', pokemonData, 'pokedex', pokedex);
                        updatePokedex((pokedex) => [pokemonData, ...pokedex]);
                        window.localStorage.setItem('pokedex', JSON.stringify(pokedex));
                    });
            }
        }, 1000);
        return () => clearInterval(interval);
      });

  return (
    <div>
        {pokedex.length ?
            <div className="current-pokemon">
                <h3 className="pokemon-alert">Look!  A wild {pokedex[0].name} appeared! </h3>
                <img src={pokedex[0].sprites.front_shiny}/>
            </div> 
            : null 
        }
        <ul>
            {pokedex.length ? pokedex.map((pokemon, i) => {
                return (
                    <li key={`${pokemon.name}-${i}`}>{pokemon.name}</li>
                )
            }) : null}
        </ul>
    </div>
  );
}
