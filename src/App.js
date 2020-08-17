import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Container } from '@material-ui/core';
import Search from './components/Search';
import Pokemon from './components/Pokemon';

export default function App() {
  const [pokemon, setPokemon] = useState();
  const [isLoading, setLoading] = useState(true);

  let species = [];
  let stats = [];

  useEffect(() => {
    setLoading(true);

    axios.get('https://pokeapi.co/api/v2/pokemon-species?limit=151')
      .then(res => {
        return axios.all(res.data.results.map(p => axios.get(p.url)));
      })
      .then(res => {
        species = res.map(p => p.data);
        
        return axios.all(res.map(s => axios.get(s.data.varieties[0].pokemon.url)));
      }).then(res => {
        stats = res.map(p => p.data);

        setPokemon(species.map((p, i) => Object.assign({}, p, stats[i])));
        setLoading(false);
      });
  }, []);

  console.log(pokemon);

  if(isLoading) {
    return (
      <img src={process.env.PUBLIC_URL + '/img/pokeball.gif'} alt="Pokeball loader" />
    );
  }

  return (
    <Container>
      <Search />
      <Pokemon pokemon={pokemon} />
    </Container>
  );
}