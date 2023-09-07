import { configureStore } from "@reduxjs/toolkit";
import { tmdbApi } from "../services/TMDB";
import  genreOrCategoryReducer  from "../features/currentGenreOrCategory";
import userReducer from '../features/auth';

export default configureStore({
    reducer: {
       [tmdbApi.reducerPath]: tmdbApi.reducer,  
       currentGenreOrcategory: genreOrCategoryReducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
})