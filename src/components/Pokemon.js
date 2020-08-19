import React from 'react';
import { Grid, Card, CardContent } from '@material-ui/core';

export default function Pokemon({pokemon, search}) {
    return (
        <Grid container spacing={3}>
            {pokemon && pokemon.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map(p => (
                <Grid item key={p.id} xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <img src={p.sprites.front_default} alt={p.name} />
                            <p>No. {p.id}</p>
                            <p>{p.name}</p>
                            {p.types && p.types.map(t => (
                                <p key={t.slot}>{t.type.name}</p>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}