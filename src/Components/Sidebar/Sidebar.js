import React, { useEffect } from 'react'
import {Divider, List, ListItemText, ListItem, ListSubheader, ListItemIcon, Box, CircularProgress} from '@mui/material'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/styles'
import { useDispatch, useSelector } from 'react-redux'
import { selectGenreOrcategory } from '../../features/currentGenreOrCategory'

import useStyles from './styles'
import { useGetGenresQuery } from '../../services/TMDB'
import genreIcons from '../../assets/genres'

const demoCategories = [
    {label: 'Popular', value: 'popular'},
    {label: 'Top Rated', value: 'top_rated'},
    {label: 'Upcoming', value: 'upcoming'},
];

const blueLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const redLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png'

const Sidebar = ({setMobileOpen}) => {

    const theme = useTheme();
    const classes = useStyles();
    const {data, isFetching} = useGetGenresQuery();
    const dispatch = useDispatch();
    const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrcategory);


    useEffect(()=>{
        setMobileOpen(false);
    },[genreIdOrCategoryName])

  return (
    <>
    <Link to = "/" className={classes.imageLink}>
    <img src={theme.palette.mode === 'light' ? blueLogo : redLogo} alt="logo" className={classes.image} />
    </Link>
    <Divider/>
    <List>
        <ListSubheader>Categories</ListSubheader>
        {demoCategories.map(({label, value})=>(
            <Link key={label} className={classes.links} to="/">
            <ListItem onClick={()=>dispatch(selectGenreOrcategory(value))}>
            <ListItemIcon>
                    <img src={genreIcons[label.toLowerCase()]} className={classes.genreImage} height={30} alt="icons" />
                </ListItemIcon>
                <ListItemText primary={label}/>
            </ListItem>
            </Link>
        ))}
    </List>
    <Divider/>
    <List>
        <ListSubheader>Genres</ListSubheader>
        {
        isFetching ? (
            <Box display="flex" justifyContent="center">
            <CircularProgress/>
          </Box>
        )
        :data.genres.map(({name, id})=>(
            <Link key={name} className={classes.links} to="/">
            <ListItem onClick={()=>dispatch(selectGenreOrcategory(id))}>
                <ListItemIcon>
                    <img src={genreIcons[name.toLowerCase()]} className={classes.genreImage} height={30} alt="icons" />
                </ListItemIcon>
                <ListItemText primary={name}/>
            </ListItem>
            </Link>
        ))}
    </List>
    </>
  )
}

export default Sidebar