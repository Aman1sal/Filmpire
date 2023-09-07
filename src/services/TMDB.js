import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

// 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc' \

export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://api.themoviedb.org/3/'}),
    endpoints: (builder)=>({

        // get genres
        getGenres: builder.query({
            query: ()=> `genre/movie/list?api_key=${tmdbApiKey}`,
        }),
        // get movies by type
        getMovies: builder.query({
            query: ({genreIdOrCategoryName, page, searchQuery})=> {
                
                if(searchQuery){
                    return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`
                }

                if(genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string'){
                    return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
                }
                if(genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number'){
                    return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
                }
                
                
                return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
            }
        }),

        // Get movie
        getMovie: builder.query({
            query: (id) => `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
          }),
        // Get user specific
        getRecommendations: builder.query({
            query: ({movie_id, list}) => `/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`
        }),
    }),
});

export const {
    useGetGenresQuery,
    useGetMoviesQuery,
    useGetMovieQuery,
    useGetRecommendationsQuery,
} = tmdbApi;