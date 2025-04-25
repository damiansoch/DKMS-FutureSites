import React from 'react';
import {motion, AnimatePresence} from 'framer-motion';

const STATUS_CONFIG = {
    success: {
        emoji: '✅',
        color: '#28a745',
        title: 'Success!',
    },
    error: {
        emoji: '❌',
        color: '#dc3545',
        title: 'Oops!',
    },
    info: {
        emoji: 'ℹ️',
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
                    }}
                >
                    <motion.div
                        initial={{opacity: 0, scale: 0.8}}
                        animate={{opacity: 1, scale: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.5}}
                        style={{
                            background: 'rgba(255, 255, 255, 0.96)',
                            padding: '2rem',
                            borderRadius: '1rem',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
                            textAlign: 'center',
                            maxWidth: '450px',
                            width: '100%',
                        }}
                    >
                        <div style={{fontSize: '3rem', marginBottom: '1rem'}}>
                            {config.emoji}
                        </div>
                        <h3 style={{fontWeight: 600, color: '#222', marginBottom: '1rem'}}>
                            {message || config.title}
                        </h3>
                        {subtext && (
                            <p style={{fontSize: '1rem', color: '#444', marginBottom: '2rem'}}>
                                {subtext}
                            </p>
                        )}
                        <motion.button
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                            onClick={onClose}
                            style={{
                                padding: '10px 22px',
                                fontSize: '1rem',
                                backgroundColor: config.color,
                                color: 'white',
                                border: 'none',
                                borderRadius: '50px',
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
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
