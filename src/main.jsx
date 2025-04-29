import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import "./bootstrap.min.css"
import LanguageProvider from './Context/LanguageContext';
import {VersionProvider} from "./Context/VersionContext.jsx";


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <LanguageProvider>
                <VersionProvider>
                    <App/>
                </VersionProvider>
            </LanguageProvider>
        </BrowserRouter>
    </StrictMode>
);

