import React from 'react';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';

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
                            <Grid container justify="center" spacing={2}>
                                {p.types && p.types.map(t => (
                                    <Grid item xs={4} md={6} key={t.slot}>
                                        <Typography component="p" align="center" className={`type ${t.type.name}`}>{t.type.name}</Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}