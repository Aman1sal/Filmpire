import React, { useState } from 'react'
import {Box, CircularProgress, useMediaQuery, Typography} from '@mui/material'
import { useSelector } from 'react-redux';
import {useGetMoviesQuery} from '../../services/TMDB'
import { MovieList, Pagination } from '..';
import { selectGenreOrcategory } from '../../features/currentGenreOrCategory';
import {FeaturedMovie} from '..';

const Movies = () => {
  const [page, setPage] = useState(1);
  const {genreIdOrCategoryName, searchQuery} = useSelector((state)=> state.currentGenreOrcategory);
  const {data, error, isFetching} = useGetMoviesQuery({genreIdOrCategoryName, page, searchQuery});

  if(isFetching){
    return(
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem"/>
      </Box>
    )
  }
  if(!data){
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
      <FeaturedMovie movie={data.results[0]}/>
      <MovieList movies={data} numberofMovies={20} excludeFirst/>
      <Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages}/>
    </div>
  )
}

export default Movies