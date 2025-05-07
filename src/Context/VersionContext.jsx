import {createContext, useContext, useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';

const VersionContext = createContext();

export const VersionProvider = ({children}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [version, setVersionState] = useState(() => {
        return localStorage.getItem('selectedVersion') || 'professional';
    });

    const setVersion = (newVersion) => {
        setVersionState(newVersion);
        localStorage.setItem('selectedVersion', newVersion);
        console.log("Version selected:", newVersion);

        // Get the current language from URL
        const pathParts = location.pathname.split('/');
        const lang = pathParts[1] || 'pl'; // fallback to 'pl' if missing

        navigate(`/${lang}/home`);
    };

    useEffect(() => {
        const savedVersion = localStorage.getItem('selectedVersion');
        if (savedVersion && savedVersion !== version) {
            setVersionState(savedVersion);
        }
    }, []); // Only run on first render

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
