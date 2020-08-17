import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Container } from '@material-ui/core';
import Pokemon from './components/Pokemon';

export default function App() {
  const [pokemon, setPokemon] = useState([]);
  const [pokemonSprites, setPokemonSprites] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    axios.get('https://pokeapi.co/api/v2/pokemon-species?limit=151')
      .then(res => {
        return axios.all(res.data.results.map(p => axios.get(p.url)));
      })
      .then(res => {
        setPokemon(res.map(p => p.data));
        
        return axios.all(res.map(s => axios.get(s.data.varieties[0].pokemon.url)));
      }).then(res => {
        setPokemonSprites(res.map(s => s.data.sprites.front_default));
        setLoading(false);
      });
  }, []);

  if(isLoading) {
    return (
      <img src={process.env.PUBLIC_URL + '/img/pokeball.gif'} alt="Pokeball loader" />
    );
  }

  return (
    <div>
      <Pokemon pokemon={pokemon} sprite={pokemonSprites} />
    </div>
  );
}