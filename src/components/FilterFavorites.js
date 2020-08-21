import React from 'react';
import { Button, Typography } from '@material-ui/core';

export default function FilterFavorites({filter, toggle}) {
    return (
        <Button onClick={filter} variant="contained">
            {toggle === 'pokemon' ? 
                <Typography>Filter by favorite Pokemon</Typography>
                :
                <Typography>Show all Pokemon</Typography>
            }
        </Button>
    )
}
