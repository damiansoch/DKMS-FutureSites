import {useEffect} from 'react';
import {Routes, Route, Navigate, useLocation} from 'react-router-dom';
import {Helmet, HelmetProvider} from 'react-helmet-async';

import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';

import Process from './pages/Process.jsx';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Offer from "./pages/Offer.jsx";
import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";

import RedirectGoogleAuth from './GoogleRedirectHandler';
import {AuthProvider} from './auth';
import {UIProvider} from './Context/UIContext.jsx';

import logo from './assets/fabryka_stron_logo.png';
import Contact from "./pages/Contact.jsx";
import CopyrightNote from "./components/CopyrightNote.jsx";
import CustomCursor from "./components/CustomCursor.jsx";

function App() {
    // Set <html lang="pl"> by default (SEO)
    useEffect(() => {
        document.documentElement.lang = 'pl';
    }, []);

    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://yourdomain.com';

    const location = useLocation();
    const isHomePage = location.pathname.endsWith('/home');

    return (
        <HelmetProvider>
            <AuthProvider>
                <UIProvider>
                    <Helmet>
                        <meta name="viewport" content="width=device-width, initial-scale=1"/>
                        <meta name="theme-color" content="#141A26"/>
                        <meta name="author" content="WebsiteFactory"/>
                        <meta property="og:type" content="website"/>
                        <meta property="og:image" content="/images/og-default.png"/>
                        <meta property="og:locale" content="pl_PL"/>
                        <meta property="og:url" content={siteUrl}/>
                        <meta name="twitter:card" content="summary_large_image"/>
                        <meta name="twitter:image" content="/images/og-default.png"/>
                    </Helmet>

                    {/* Desktop navbar only */}
                    <div className="d-none d-md-block">
                        <Navbar/>
                    </div>

                    {/* Mobile bottom navigation */}
                    <div className="d-md-none">
                        <BottomNav/>
                        {/* Centered logo for mobile */}
                        {!isHomePage && (
                            <div className="d-md-none">
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '5px',
                                        left: '5px',
                                        zIndex: 1060,
                                        background: 'rgba(6, 23, 42, 0.7)',
                                        paddingBottom: '5px',
                                    }}
                                >
                                    <img
                                        src={logo}
                                        alt="Logo"
                                        style={{
                                            height: '55px',
                                            width: 'auto',
                                            objectFit: 'contain',
                                            filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.3)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.6))'
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <CopyrightNote/>
                    <div className="overflow-hidden">
                        <Routes>
                            <Route path="/:lang/home" element={<Home/>}/>
                            <Route path="/:lang/process" element={<Process/>}/>
                            <Route path="/:lang/offer" element={<Offer/>}/>
                            <Route path="/:lang/about" element={<About/>}/>
                            <Route path="/:lang/contact" element={<Contact/>}/>
                            <Route path="/:lang/login" element={<Login/>}/>
                            <Route path="/:lang/register" element={<Register/>}/>
                            <Route path="/login/callback" element={<RedirectGoogleAuth/>}/>

                            {/* Fallback: redirect to /pl/home */}
                            <Route path="*" element={<Navigate to="/pl/home" replace/>}/>
                        </Routes>
                    </div>
                    <CustomCursor/>
                </UIProvider>
            </AuthProvider>
        </HelmetProvider>
    );
}

export default App;
