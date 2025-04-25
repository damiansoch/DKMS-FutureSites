import {useEffect, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import logo from '../assets/animationLogo.png'; // adjust as needed

export default function EntryAnimationProvider({children}) {
    const [showContent, setShowContent] = useState(false);
    const logoColors = ['#ff8a00', '#e52e71', '#007aff', '#00ffff', '#ffffff'];
    const [crashZoom, setCrashZoom] = useState(false);

    useEffect(() => {
        const crashTimer = setTimeout(() => setCrashZoom(true), 1000);  // Trigger the zoom
        const contentTimer = setTimeout(() => setShowContent(true), 1200); // Show content after crash

        return () => {
            clearTimeout(crashTimer);
            clearTimeout(contentTimer);
        };
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setShowContent(true), 1200); // animation time
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <AnimatePresence>
                {!showContent && (
                    <motion.div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            background: 'radial-gradient(circle at center, #0a0d11 40%, #000 100%)',
                            zIndex: 9999,
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                        }}
                        initial={{opacity: 1}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.4}}
                    >
                        {Array.from({length: 60}).map((_, i) => {
                            const angle = Math.random() * 360;
                            const screenDiagonal = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);
                            const distance = screenDiagonal / 2 + Math.random() * 200;

                            const x = Math.cos((angle * Math.PI) / 180) * distance;
                            const y = Math.sin((angle * Math.PI) / 180) * distance;

                            const dx = Math.abs(x);
                            const dy = Math.abs(y);
                            const maxDistance = Math.max(dx, dy);
                            const radius = 0.1 * window.innerWidth;

                            const startOpacity = maxDistance < radius ? 0 : 0.1;
                            const endOpacity = 1;

                            const color = logoColors[Math.floor(Math.random() * logoColors.length)];

                            return (
                                <motion.div
                                    key={i}
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        width: '4px',
                                        height: '4px',
                                        backgroundColor: color,
                                        borderRadius: '50%',
                                        boxShadow: `0 0 12px 4px ${color}`,
                                        zIndex: 1,
                                        pointerEvents: 'none',
                                    }}
                                    initial={{x: 0, y: 0, scale: 0.4, opacity: startOpacity}}
                                    animate={{x, y, scale: 1.6, opacity: endOpacity}}
                                    transition={{
                                        duration: 1.5, // ⬅️ match full animation duration
                                        ease: [0.17, 0.67, 0.83, 0.99],
                                        delay: i * 0.015,
                                    }}
                                />
                            );
                        })}


                        {/* Logo */}
                        <motion.img
                            src={logo}
                            alt="Fabryka Stron Logo"
                            style={{
                                width: 320,
                                filter: 'drop-shadow(0 0 40px #00ffff)',
                                zIndex: 10,
                                position: 'relative',
                            }}
                            initial={{opacity: 0, scale: 0.7}}
                            animate={{
                                opacity: crashZoom ? 0 : 1,
                                scale: crashZoom ? 5 : 1.1,
                            }}
                            transition={{
                                duration: crashZoom ? 0.5 : 1,
                                ease: 'easeInOut',
                            }}
                        />

                    </motion.div>
                )}
            </AnimatePresence>

            {/* Page content with entry/exit slide effect */}
            <AnimatePresence mode="wait">
                {showContent && (
                    <motion.div
                        key="page-slide"
                        initial={{y: '-100vh', opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        exit={{y: '100vh', opacity: 0}}
                        transition={{duration: 0.4, ease: 'easeInOut'}}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
