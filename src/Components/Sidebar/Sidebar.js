import React from 'react'
import {Divider, List, ListItemText, ListItem, ListSubheader, ListItemIcon, Box, CircularProgress} from '@mui/material'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/styles'

import useStyles from './styles'

const categories = [
    {label: 'Popular', value: 'popular'},
    {label: 'Top Rated', value: 'top_rated'},
    {label: 'Upcoming', value: 'upcoming'},
];

const demoCategories = [
    {label: 'Comedy', value: 'comedy'},
    {label: 'Action', value: 'action'},
    {label: 'Horror', value: 'horror'},
    {label: 'Animation', value: 'animation'},
];

const blueLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const redLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png'

const Sidebar = ({setMobileOpen}) => {

    const theme = useTheme();
    const classes = useStyles();

  return (
    <>
    <Link to = "/" className={classes.imageLink}>
    <img src={theme.palette.mode === 'light' ? blueLogo : redLogo} alt="logo" className={classes.image} />
    </Link>
    <Divider/>
    <List>
        <ListSubheader>Categories</ListSubheader>
        {demoCategories.map(({label, value})=>(
            <Link>
            <ListItem onClick={()=>{}} button>
                {/* <ListItemIcon>
                    <img src={redLogo} className={classes.genereImages} height={30} alt="icons" />
                </ListItemIcon> */}
                <ListItemText primary={label}/>
            </ListItem>
            </Link>
        ))}
    </List>
    <Divider/>
    <List>
        <ListSubheader>Genres</ListSubheader>
        {categories.map(({label, value})=>(
            <Link>
            <ListItem onClick={()=>{}} button>
                {/* <ListItemIcon>
                    <img src={redLogo} className={classes.genereImages} height={30} alt="icons" />
                </ListItemIcon> */}
                <ListItemText primary={label}/>
            </ListItem>
            </Link>
        ))}
    </List>
    </>
  )
}

export default Sidebar