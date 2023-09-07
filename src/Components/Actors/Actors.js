import React, { useState } from 'react'
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowBack } from '@mui/icons-material'

import useStyles from './style'
import { useGetActorsDetailsQuery } from '../../services/TMDB'
import { useGetMoviesByActorIdQuery } from '../../services/TMDB'
import {MovieList} from '..';
import {Pagination} from '..';

const Actors = () => {
    const {id} = useParams();
    const history = useNavigate();
    const classes = useStyles();
    const [page, setpage] = useState(1);

    const {data, isFetching, error} = useGetActorsDetailsQuery(id);
    const {data: movies} = useGetMoviesByActorIdQuery({id, page});

    if(isFetching){
      return(
        <Box display="flex" justifyContent="center">
          <CircularProgress size="8rem"/>
        </Box>
      )
    }
    if(error){
      return(
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button startIcon={<ArrowBack/>} onClick={()=>history.goBack()} color="primary">Go Back</Button>
        </Box>
      )
    }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`} alt={data.name} className={classes.image} />
        </Grid>
        <Grid item lg={7} xl={8} style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
          <Typography variant="h2" gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant="body1" align="justify" paragraph>
            {data?.biography} || 'No info yet...'
          </Typography>
          <Box marginTop="2rem" display="flex" justifyContent="space-around">
            <Button variant='contained' color='primary' target='_blank' href={`https://www.imdb.com/name/${data?.imdb_id}`}>
              IMDB
            </Button>
            <Button startIcon = {<ArrowBack/>} onClick={()=>history.goBack()} color='primary'>
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box margin="2rem 0">
        <Typography variant="h2" gutterBottom align="center">Movies</Typography>
      {movies && <MovieList movies={movies} numberofMovies={8}/>}
      <Pagination currentPage={page} setPage={setpage} totalPages={data.total_pages}/>
      </Box>
    </>
  )
}

export default Actors