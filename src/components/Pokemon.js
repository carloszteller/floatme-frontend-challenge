import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from '@material-ui/core';

export default function Pokemon({pokemonURL}) {
    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        axios.get(pokemonURL)
            .then(res => {
                setPokemon(res.data);
            });
    }, []);

    return (
        <Container>
            <p>{pokemon.name}</p>
        </Container>
    );
}
