import React, { useContext, useEffect } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web';
import { ColorModeContext } from '../utils/ToggleColorMode';


const useAlan = () => {
    const {setMode} = useContext(ColorModeContext);

    useEffect(() => {
        alanBtn({
            key: '1f4247788d777b0a07592675ac9221ed2e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: ({command, mode}) => {
              if (command === 'changeMode') {
                if(mode === 'light'){
                        setMode('light')
                } else{
                    setMode('dark')
                }
              }
            }
        });
      }, []);
}

export default useAlan;