import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Container, Backdrop } from '@material-ui/core';
import Search from './components/Search';
import Pokemon from './components/Pokemon';

export default function App() {
  const [pokemon, setPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPokemon = () => {
    let species = [];
    let stats = [];

    axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(res => {
        return axios.all(res.data.results.map(p => axios.get(p.url)));
      })
      .then(res => {
        stats = res.map(p => p.data);
      
        return axios.all(res.map(s => axios.get(s.data.species.url)));
      }).then(res => {
        species = res.map(p => p.data);

        setPokemon(stats.map((p, i) => Object.assign({}, p, species[i])));
        setIsLoading(false);
      });
  }

  const onSearchChange = e => {
    setSearchTerm(e.target.value);
  }

  useEffect(() => {
    setIsLoading(true);

    fetchPokemon();

    // setFavorite(favorite => [...favorite, 'charmander']);
  }, []);

  useEffect(() => {
    if(searchTerm) {
      setSearchResults(pokemon.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())));
      setPokemon(searchResults);
    } else {
      setIsLoading(true);
      fetchPokemon();
    }
  }, [searchTerm]);

  if(isLoading) {
    return (
      <Backdrop open={true}>
        <img src={process.env.PUBLIC_URL + '/img/pokeball.gif'} alt="Pokeball loader" />
      </Backdrop>
    );
  }

  return (
    <Container>
      <Search change={onSearchChange} term={searchTerm} />
      <Pokemon pokemon={pokemon} />
    </Container>
  );
}