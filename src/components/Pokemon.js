import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid } from '@material-ui/core';

export default function Pokemon({pokemon}) {
    const [pokemonSprites, setPokemonSprites] = useState([]);

    useEffect(() => {
        {pokemon && 
            axios.all(pokemon.map(p => axios.get(p.varieties[0].pokemon.url)))
                .then(res => {
                    setPokemonSprites(res.map(s => s.data.sprites.front_default));
                })
        }
    }, []);

    return (
        <Container>
            <Grid container>
            {pokemon && pokemon.map(p => (
                <Grid item key={p.id} xs={12} sm={6} md={3}>
                    {/* <img src={p.sprites.front_default} alt={p.name} /> */}
                    <img src={pokemonSprites[p.id - 1]} alt={p.name}  />
                    <p>No. {p.id}</p>
                    <p>{p.name}</p>
                    {p.types && p.types.map(t => (
                        <p key={t.slot}>{t.type.name}</p>
                    ))}
                </Grid>
            ))}
            </Grid>
        </Container>
    );
}
