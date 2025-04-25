// LanguageContext.jsx
import {createContext, useContext, useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

const LanguageProvider = ({children}) => {
    const location = useLocation();
    const navigate = useNavigate();

    const langFromUrl = location.pathname.split('/')[1];
    const isValidLang = ['pl', 'en'].includes(langFromUrl);
    const [language, setLanguage] = useState(isValidLang ? langFromUrl : 'pl');

    useEffect(() => {
        if (isValidLang && langFromUrl !== language) {
            setLanguage(langFromUrl);
        }
    }, [langFromUrl]);

    const toggleLanguage = () => {
        const newLang = language === 'pl' ? 'en' : 'pl';
        const segments = location.pathname.split('/');
        segments[1] = newLang;
        navigate(segments.join('/'), {replace: true});
    };

    return (
        <LanguageContext.Provider value={{language, toggleLanguage}}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageProvider;
