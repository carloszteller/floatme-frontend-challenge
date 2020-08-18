import React from 'react';
import { Grid } from '@material-ui/core';

export default function Pokemon({pokemon}) {
    return (
        <Grid container>
            {pokemon && pokemon.map(p => (
                <Grid item key={p.id} xs={12} sm={6} md={3}>
                    <img src={p.sprites.front_default} alt={p.name} />
                    <p>No. {p.id}</p>
                    <p>{p.name}</p>
                    {p.types && p.types.map(t => (
                        <p key={t.slot}>{t.type.name}</p>
                    ))}
                </Grid>
            ))}
        </Grid>
    );
}
