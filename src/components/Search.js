import React from 'react';
import { FormControl, Input, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

export default function Search({change, term}) {
    return (
        <FormControl className="search" style={{ margin: "2em 0" }} fullWidth={true}>
             <Input
                id="search-pokemon"
                placeholder="Search Pokemon"
                value={term}
                onChange={change}
                style={{ padding: ".5em 1em" }}
                endAdornment={ <InputAdornment position="end"><SearchIcon /></InputAdornment> }
                inputProps={{ 'aria-label': 'search pokemon' }}   
            />
        </FormControl>
    );
}