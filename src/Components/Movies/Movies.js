import React from 'react'
import {Box, CircularProgress, useMediaQuery, Typography} from '@mui/material'
import { UseSelector } from 'react-redux';
import {useGetMoviesQuery} from '../../services/TMDB'
import { MovieList } from '..';

const Movies = () => {
  const {data, error, isFetching} = useGetMoviesQuery();

  if(isFetching){
    return(
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem"/>
      </Box>
    )
  }
  if(!data || data.result.length === 0){
    return(
      <Box display="flex" alignitem="center" alt="20px">
          <Typography variant="h4">No movies that match this name.
          <br />
          Please Search for something else.
          </Typography>
      </Box>
    )
  }
  if(error){
    return 'an error has occured'
  }

  return (
    <div>
      <MovieList movies={data} />
    </div>
  )
}

export default Movies