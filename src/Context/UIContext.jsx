// context/UIContext.js
import {createContext, useContext, useState} from 'react';

const UIContext = createContext();

export const UIProvider = ({children}) => {
    const [hideBottomNav, setHideBottomNav] = useState(false);

    return (
        <UIContext.Provider value={{hideBottomNav, setHideBottomNav}}>
            {children}
        </UIContext.Provider>
    );
};

export const useUI = () => useContext(UIContext);
