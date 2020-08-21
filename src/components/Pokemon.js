import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, IconButton, Slide  } from '@material-ui/core';
import { Close, Favorite, FavoriteBorder } from '@material-ui/icons';

export default function Pokemon({pokemon, search, favorites, setFavorite}) {
    const [selectedPokemon, setSelectefPokemon] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = pId => {
        setIsModalOpen(true);
        setSelectefPokemon(pId);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectefPokemon(null);
    }

    return (
        <Grid container spacing={3}>
            {pokemon && pokemon.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map(p => (
                <Grid item key={p.id} xs={12} sm={6} md={3}>
                    <Card onClick={() => openModal(p.id)}>
                        <CardContent className="pokemon-card">
                            <img src={p.sprites.front_default} alt={p.name} />
                            <p>{`No. ${p.id}`}</p>
                            <p className="capitalize">{p.name}</p>
                            <Grid container justify="center" spacing={2}>
                                {p.types && p.types.map(t => (
                                    <Grid item xs={4} md={6} key={t.slot}>
                                        <Typography align="center" className={`type ${t.type.name}`}>{t.type.name}</Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </Card>

                    <Dialog
                        open={selectedPokemon === p.id}
                        onClose={closeModal}
                    >
                        <DialogTitle className="capitalize">
                            {p.name}
                            <DialogActions className="modal-buttons">
                                <IconButton aria-label={`favorite-${p.name}`} onClick={() => setFavorite(p.name)}>
                                    {favorites.includes(p.name) ? (
                                        <Favorite />
                                    ) : (
                                        <FavoriteBorder />
                                    )}
                                </IconButton>
                                <IconButton aria-label="close-modal" onClick={closeModal}>
                                    <Close />
                                </IconButton>
                            </DialogActions>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <img src={p.sprites.front_default} alt={p.name} />
                                <p>{`No. ${p.id}`}</p>
                                {p.flavor_text_entries && p.flavor_text_entries.map(t => {
                                    if(t.language.name === 'en' && t.version.name === 'red') {
                                        return (<p>{t.flavor_text}</p>);
                                    }
                                })}
                                {p.stats && p.stats.map(s => (
                                    <p key={p.id} className={`type ${p.types[0].type.name}`} style={{ width: `calc(${s.base_stat}/200 * 100%)` }}>{`${s.stat.name}: ${s.base_stat}`}</p>
                                ))}
                            </DialogContentText>
                        </DialogContent>
                    </Dialog>
                </Grid>
            ))}
        </Grid>
    );
}