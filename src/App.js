import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Container } from '@material-ui/core';
import Pokemon from './components/Pokemon';

export default function App() {
  const [pokemon, setPokemon] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    axios.get('https://pokeapi.co/api/v2/pokemon/')
      .then(res => {
        return axios.all(res.data.results.map(p => axios.get(p.url)));
      })
      .then(res => {
        setPokemon(res.map(p => p.data));
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
      <Pokemon pokemon={pokemon} />
    </div>
  );
}