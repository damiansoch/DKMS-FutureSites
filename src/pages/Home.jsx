import React, {useEffect, useState} from 'react';
import {motion, useMotionValue, useSpring} from 'framer-motion';

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
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Motion values for parallax
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, {stiffness: 50, damping: 20});
    const springY = useSpring(y, {stiffness: 50, damping: 20});

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

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

    // Parallax effect: track mouse movement
    useEffect(() => {
        const handleMouseMove = (e) => {
            const {innerWidth, innerHeight} = window;
            const offsetX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
            const offsetY = (e.clientY - innerHeight / 2) / (innerHeight / 2);

            x.set(offsetX * 20); // Adjust intensity
            y.set(offsetY * 20);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [x, y]);

    return (
        <EntryAnimationProvider>
            <SEOHelmet page="home"/>

            {/* The parallax wrapper */}
            <motion.div
                style={{
                    marginTop: isMobile ? 0 : "60px",
                    marginBottom: isMobile ? "60px" : 0,
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "110% 110%",
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
                    // overflow: 'hidden',
                    x: springX,
                    y: springY,

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
                        zIndex: 2,
                    }}
                />
            </motion.div>
        </EntryAnimationProvider>
    );
};

export default Home;
