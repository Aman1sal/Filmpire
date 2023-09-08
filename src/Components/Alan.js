import React, { useContext, useEffect } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web';
import { ColorModeContext } from '../utils/ToggleColorMode';
import { fetchToken } from '../utils'
import { selectGenreOrcategory, SearchMovie } from '../features/currentGenreOrCategory';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useAlan = () => {
    const {setMode} = useContext(ColorModeContext);
    const dispatch = useDispatch();
    const history = useNavigate();
    useEffect(() => {
        alanBtn({
            key: '1f4247788d777b0a07592675ac9221ed2e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: ({command, mode, genres, genreOrCategory, query}) => {
              if(command === 'chooseGenre'){
                const foundGenre = genres.find((g)=>g.name.toLowerCase()=== genreOrCategory.toLowerCase());

                if(foundGenre){
                  history('/');
                  dispatch(selectGenreOrcategory(foundGenre.id));
                } else {
                  const category = genreOrCategory.startsWith('top') ? 'top_rated' : genreOrCategory;
                  history('/');
                  dispatch(selectGenreOrcategory(category));
                }
              }
              else if (command === 'changeMode') {
                if(mode === 'light'){
                        setMode('light')
                } else{
                    setMode('dark')
                } 
              } else if(command === 'login'){
                fetchToken();
            } else if(command === 'logout'){
              localStorage.clear();
              history(-1);
            } else if(command === 'search'){
              dispatch(SearchMovie(query));
            }
            },
        });
      }, []);
}

export default useAlan;