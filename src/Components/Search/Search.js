import React, { useState } from 'react'
import { TextField, InputAdornment } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { ClassNames } from '@emotion/react'
import useStyles from './styles';
import { SearchMovie } from '../../features/currentGenreOrCategory'


const Search = () => {
    const classes = useStyles();
    const [query, setquery] = useState('')
    const dispatch = useDispatch();
    const handleKeyPress=(event)=>{
        if(event.key === 'Enter'){
            dispatch(SearchMovie(query));
        }
    }

  return (
    <div className={classes.searchContainer}>
        <TextField onKeyPress={handleKeyPress} value={query} onChange={(e)=> setquery(e.target.value)} variant='standard' InputProps={{
            className: classes.input,
            startAdornment: (
                <InputAdornment position="start"><SearchIcon/></InputAdornment>
            )
        }}></TextField>
    </div>
  )
}

export default Search