import React, {useEffect, useState} from 'react';

import {useLanguage} from '../Context/LanguageContext.jsx';

import HomeBkgEn from '../assets/HomeBkg_en.png';
import HomeBkgPl from '../assets/HomeBkg_pl.png';
import HomeBkgEnMobile from '../assets/HomeBkg_en_mobile.png';
import HomeBkgPlMobile from '../assets/HomeBkg_pl_mobile.png';

import EntryAnimationProvider from "../Functions/EntryAnimationProvider.jsx";
import SEOHelmet from "../components/SEO/SEOHelmet.jsx";


const Home = () => {
    const {language} = useLanguage();
    const [backgroundImage, setBackgroundImage] = useState(HomeBkgEn);
    const [cursorPos, setCursorPos] = useState({x: -1000, y: -1000});

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Run on mount
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.innerWidth < 1026;
            const newImage =
                language === 'pl'
                    ? isMobile ? HomeBkgPlMobile : HomeBkgPl
                    : isMobile ? HomeBkgEnMobile : HomeBkgEn;

            setBackgroundImage(newImage);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [language]);

    const handleMouseMove = (e) => {
        setCursorPos({x: e.clientX, y: e.clientY});
    };

    const handleTouchMove = (e) => {
        const touch = e.touches[0];
        if (touch) {
            setCursorPos({x: touch.clientX, y: touch.clientY});
        }
    };

    return (
        <EntryAnimationProvider>
            <SEOHelmet page="home"/>

            <div
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                style={{
                    marginTop: isMobile ? 0 : "60px",
                    marginBottom: isMobile ? "60px" : 0,
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center",
                    height: 'calc(100dvh - 60px)',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#fff',
                    textAlign: 'center',
                    padding: '2rem',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none',
                        backdropFilter: 'grayscale(1) blur(10px)',
                        WebkitBackdropFilter: 'grayscale(1) blur(10px)',
                        maskImage: `radial-gradient(circle 200px at ${cursorPos.x}px ${cursorPos.y}px, black 0%, transparent 50%)`,
                        WebkitMaskImage: `radial-gradient(circle 200px at ${cursorPos.x}px ${cursorPos.y}px, black 0%, transparent 50%)`,
                        transition: 'mask-image 0.1s ease-out, -webkit-mask-image 0.1s ease-out',
                        zIndex: 2,
                    }}
                />
            </div>
        </EntryAnimationProvider>
    );
};

export default Home;
