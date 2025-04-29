import {createContext, useContext, useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';

const VersionContext = createContext();

export const VersionProvider = ({children}) => {
    const [version, setVersionState] = useState('professional');
    const navigate = useNavigate();
    const location = useLocation();

    const setVersion = (newVersion) => {
        setVersionState(newVersion);
        console.log("Version selected:", newVersion);

        // Get the current language from URL
        const pathParts = location.pathname.split('/');
        const lang = pathParts[1] || 'pl'; // fallback to 'pl' if missing

        navigate(`/${lang}/home`);
    };

    return (
        <VersionContext.Provider value={{version, setVersion}}>
            {children}
        </VersionContext.Provider>
    );
};

export const useVersion = () => {
    const context = useContext(VersionContext);
    if (!context) {
        throw new Error('useVersion must be used within a VersionProvider');
    }
    return context;
};
