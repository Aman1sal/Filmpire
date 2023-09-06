import { createSlice } from "@reduxjs/toolkit";


export const genreOrCategory = createSlice({
    name: 'genreOrCategory',
    initialState: {
        genreIdOrCategoryName: '',
        page: 1,
        searchQuery: '',
    },
    reducers: {
        selectGenreOrcategory: (state, action)=>{
            state.genreIdOrCategoryName = action.payload;
            state.searchQuery = '';
        },
        SearchMovie: (state, action)=>{
            state.searchQuery = action.payload;
        },
    },
});


export const {selectGenreOrcategory, SearchMovie} = genreOrCategory.actions;
export default genreOrCategory.reducer;