import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Container } from '@material-ui/core';
import Pokemon from './components/Pokemon';

export default function App() {
  const [pokemonURL, setPokemonURL] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    axios.get(' https://pokeapi.co/api/v2/pokemon/')
      .then(res => {
        setPokemonURL(res.data.results.map(p => p.url));
      });

    setIsLoading(false);
  }, []);

  if(isLoading) {
    return (
      <img src={process.env.PUBLIC_URL + '/img/pokeball.gif'} alt="Pokeball loader" />
    );
  }

  return (
    <div>
      {pokemonURL && pokemonURL.map((p, i) => (
        <Pokemon pokemonURL={p} key={i} />
      ))}
    </div>
  )
}
