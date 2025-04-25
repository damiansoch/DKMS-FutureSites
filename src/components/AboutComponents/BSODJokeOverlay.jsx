import React, {useEffect, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import bsodImage from '../../assets/Bsodwindows10.png';
import bsodImage_mobile from '../../assets/Bsodwindows10_mobile.png';
import {useLanguage} from '../../Context/LanguageContext';

const BSODJokeOverlay = ({show, onFinish}) => {
    const {language} = useLanguage();
    const [showMessage, setShowMessage] = useState(false);
    const [countdown, setCountdown] = useState(20);
    const isMobile = window.innerWidth < 768;

    useEffect(() => {
        let countdownInterval;
        if (show) {
            const messageTimer = setTimeout(() => setShowMessage(true), 4000);
            countdownInterval = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(countdownInterval);
                        onFinish();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => {
                clearTimeout(messageTimer);
                clearInterval(countdownInterval);
            };
        }
    }, [show, onFinish]);

    const t = {
        heading: language === 'pl' ? 'Ups... żartowałem! 💻' : 'Oops... Just kidding! 💻',
        line1: language === 'pl'
            ? 'To nie był prawdziwy crash systemu — tylko mały żart! 😄'
            : "This wasn't a real system crash — just a joke! 😄",
        line2: language === 'pl'
            ? 'Jeśli naprawdę chcesz pogadać o swojej stronie, napisz śmiało. Obiecuję – bez dramy 😉'
            : "If you'd actually like to talk about your website, feel free to reach out anytime. I promise no more drama 😉",
        returning: language === 'pl' ? 'Powrót do strony za' : 'Returning to the page in',
        seconds: language === 'pl' ? 'sekund' : 'seconds',
        skip: language === 'pl' ? 'Wystarczy żartów →' : 'Skip the drama →',
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    className="bsod-overlay"
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9999,
                        backgroundImage: `url(${isMobile ? bsodImage_mobile : bsodImage})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundColor: isMobile ? "#B20000" : '#0079D8',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '1rem',
                    }}
                >
                    {showMessage && (
                        <motion.div
                            initial={{opacity: 0, scale: 0.8}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.7}}
                            style={{
                                background: 'rgba(255, 255, 255, 0.97)',
                                padding: '2rem',
                                borderRadius: '1rem',
                                boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                                textAlign: 'center',
                                maxWidth: '500px',
                                width: '100%',
                            }}
                        >
                            <motion.div
                                animate={{rotate: [0, 10, -10, 5, -5, 0]}}
                                transition={{duration: 1.5, repeat: Infinity}}
                                style={{fontSize: '3rem', marginBottom: '1rem'}}
                            >
                                😅
                            </motion.div>
                            <h2 style={{
                                fontWeight: 700,
                                fontSize: '1.8rem',
                                marginBottom: '1rem',
                                color: '#222',
                            }}>
                                {t.heading}
                            </h2>

                            <p style={{
                                fontSize: '1rem',
                                color: '#444',
                                lineHeight: 1.6,
                                marginBottom: '1rem',
                            }}>
                                {t.line1}
                            </p>

                            <p style={{
                                fontSize: '1rem',
                                color: '#444',
                                marginBottom: '1.5rem',
                                fontWeight: "bold"
                            }}>
                                {t.line2}
                            </p>

                            <p style={{
                                fontSize: '0.95rem',
                                color: '#333',
                                marginBottom: '2rem',
                            }}>
                                {t.returning}{' '}
                                <strong style={{fontSize: '1.2rem', color: '#007bff'}}>
                                    {countdown}
                                </strong>{' '}
                                {t.seconds}
                            </p>

                            <motion.button
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                onClick={onFinish}
                                style={{
                                    padding: '10px 22px',
                                    fontSize: '1rem',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50px',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                    width: '100%',
                                    maxWidth: '280px',
                                }}
                            >
                                {t.skip}
                            </motion.button>
                        </motion.div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BSODJokeOverlay;
