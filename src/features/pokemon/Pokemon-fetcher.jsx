import React, { useState, useEffect } from "react";

export function PokemonFetcher() {
  const [pokedex, updatePokedex] = useState(
    JSON.parse(window.localStorage.getItem("pokedex")) || []
  );
  const [pokemonCount, decrementPokemon] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      if (pokemonCount > 0) {
        decrementPokemon((pokemonCount) => pokemonCount - 1);
        const pokemonIndex = Math.floor(Math.random() * 150) + 1;

        return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`)
          .then((response) => response.json())
          .then((pokemonData) => {
            const {
              id,
              name,
              sprites: { front_shiny },
            } = pokemonData;

            const pokedexUpdate = {
              id,
              name,
              photo: front_shiny,
            };

            updatePokedex((pokedex) => [pokedexUpdate, ...pokedex]);
            window.localStorage.setItem("pokedex", JSON.stringify(pokedex));
          });
      }
    }, 5000);
    return () => clearInterval(interval);
  });

  return (
    <div>
      {pokedex.length ? (
        <div className="current-pokemon">
          <p className="pokemon-alert">
            Look! A wild {pokedex[0].name} appeared!
          </p>
          <img className="pokemon-photo" src={pokedex[0].photo} />
        </div>
      ) : null}
      <h3 className="pokemon-alert">Pokedex</h3>
      <ul className="pokedex">
        {pokedex.length
          ? pokedex.map((pokemon, i) => {
              return (
                <li className="pokedex-entry" key={`${pokemon.name}-${i}`}>
                  <p>{pokemon.name}</p>
                  <img src={pokemon.photo} />
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
}
