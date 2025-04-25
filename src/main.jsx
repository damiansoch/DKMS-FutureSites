import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import "./bootstrap.min.css"
import LanguageProvider from './Context/LanguageContext';


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <LanguageProvider>
                <App/>
            </LanguageProvider>
        </BrowserRouter>
    </StrictMode>
);

