import React from 'react';
import {motion, AnimatePresence} from 'framer-motion';

const STATUS_CONFIG = {
    success: {
        emoji: '🎉',
        color: '#28a745',
        title: 'Success!',
    },
    error: {
        emoji: '💥',
        color: '#dc3545',
        title: 'Oops!',
    },
    info: {
        emoji: '💬',
        color: '#007bff',
        title: 'Notice',
    },
};

const StatusOverlay = ({show, type = 'info', message, subtext, onClose}) => {
    const config = STATUS_CONFIG[type] || STATUS_CONFIG.info;

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9999,
                        background: 'rgba(0, 0, 0, 0.6)',
                        backdropFilter: 'blur(4px)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '1rem',
                        fontFamily: '"Comic Neue", cursive',
                    }}
                >
                    <motion.div
                        initial={{opacity: 0, scale: 0.8}}
                        animate={{opacity: 1, scale: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.5}}
                        style={{
                            background: 'radial-gradient(circle at center, #fff 60%, #ffe66d 100%)',
                            padding: '1.5rem',
                            border: '4px solid #000',
                            borderRadius: '1.5rem',
                            boxShadow: '8px 8px 0px #000',
                            textAlign: 'center',
                            maxWidth: '420px',
                            width: '100%',
                            fontFamily: '"Comic Neue", cursive',
                        }}
                    >
                        <div style={{fontSize: '3.5rem', marginBottom: '1rem'}}>
                            {config.emoji}
                        </div>
                        <h3
                            style={{
                                fontFamily: '"Bangers", cursive',
                                fontSize: '1.8rem',
                                color: '#111',
                                marginBottom: '0.5rem',
                            }}
                        >
                            {message || config.title}
                        </h3>
                        {subtext && (
                            <p style={{fontSize: '1rem', color: '#333', marginBottom: '1.5rem'}}>
                                {subtext}
                            </p>
                        )}
                        <motion.button
                            whileHover={{scale: 1.05, rotate: -1}}
                            whileTap={{scale: 0.95}}
                            onClick={onClose}
                            style={{
                                padding: '10px 22px',
                                fontSize: '1rem',
                                backgroundColor: config.color,
                                color: 'white',
                                border: '3px solid #000',
                                borderRadius: '50px',
                                cursor: 'pointer',
                                boxShadow: '4px 4px 0px #000',
                                fontFamily: '"Bangers", cursive',
                                width: '100%',
                                maxWidth: '200px',
                            }}
                        >
                            OK
                        </motion.button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default StatusOverlay;
