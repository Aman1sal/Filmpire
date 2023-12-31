import { makeStyles } from "@mui/styles";

export default makeStyles((theme)=>({
    moviesContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        overflowY: 'auto',
        overflowX: 'hidden',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
        },
    },
}));

