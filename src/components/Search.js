import React from 'react';
import { Paper, InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

export default function Search({search, term}) {
    return (
        <Paper component="form">
            <InputBase placeholder="Search Pokemon" value={term} onChange={search} />
            <IconButton type="submit" aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}