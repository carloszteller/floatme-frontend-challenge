import React, { useState, forwardRef } from 'react';
import { Grid, Card, CardContent, Typography, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, IconButton, Slide  } from '@material-ui/core';
import { Close, Favorite, FavoriteBorder } from '@material-ui/icons';

const modalTransition = forwardRef(function modalTransition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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
                    <Card align="center">
                    <IconButton aria-label={`favorite-${p.name}`} onClick={() => setFavorite(p)}>
                                {favorites.includes(p) ? (
                                    <Favorite />
                                ) : (
                                    <FavoriteBorder />
                                )}
                            </IconButton>
                        <CardContent onClick={() => openModal(p.id)} className="pokemon-card">
                            <img src={p.sprites.front_default} alt={p.name} />
                            <Typography component="p">{`No. ${p.id}`}</Typography>
                            <Typography component="h2" variant="h5" className="capitalize my-25">{p.name}</Typography>
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
                        TransitionComponent={modalTransition}
                        onClose={closeModal}
                    >
                        <DialogTitle className="capitalize">
                            {p.name}
                            <DialogActions className="modal-buttons">
                                <IconButton aria-label={`favorite-${p.name}`} onClick={() => setFavorite(p)}>
                                    {favorites.includes(p) ? (
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
                                <Typography component="p">{`No. ${p.id}`}</Typography>
                                {p.flavor_text_entries && p.flavor_text_entries.map(t => {
                                    if(t.language.name === 'en' && t.version.name === 'red') {
                                        return ( <Typography>{t.flavor_text}</Typography> );
                                    }
                                })}
                                {p.stats && p.stats.map(s => (
                                    <Grid container alignItems="center" spacing={2} className="my-50">
                                        <Grid item>
                                            {s.stat.name === 'hp' ?
                                                <Typography className="uppercase">{s.stat.name}:</Typography>
                                            :
                                                <Typography className="capitalize">{s.stat.name}:</Typography>
                                            }
                                        </Grid>
                                        <Grid item className={`type ${p.types[0].type.name}`} style={{width: `calc(${s.base_stat}/200 * 100%)`}}>
                                            <Typography>{s.base_stat}</Typography>
                                        </Grid>
                                    </Grid>
                                ))}
                            </DialogContentText>
                        </DialogContent>
                    </Dialog>
                </Grid>
            ))}
        </Grid>
    );
}