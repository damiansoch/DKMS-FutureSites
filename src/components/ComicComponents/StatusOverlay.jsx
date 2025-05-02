import React from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import Explosion from '../../assets/Comic/icons/explosion.png'; // Adjust path if needed

const StatusOverlay = ({show, message, subtext, onClose}) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, scale: 0.8}}
                    transition={{type: 'spring', stiffness: 300, damping: 20}}
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 9999,
                        width: '90%',
                        maxWidth: '400px',
                        height: 'auto',
                        textAlign: 'center',
                    }}
                >
                    {/* Explosion background */}
                    <img
                        src={Explosion}
                        alt="Explosion"
                        style={{
                            position: 'absolute',
                            top: '-100px',
                            left: '-100px',
                            width: '600px',
                            transform: 'rotate(45deg)',
                            zIndex: 1,
                            pointerEvents: 'none',
                        }}
                    />

                    {/* Overlay content */}
                    <div
                        style={{
                            position: 'relative',
                            background: '#fff',
                            border: '4px solid #000',
                            boxShadow: '8px 8px 0px #000',
                            padding: '2rem',
                            borderRadius: '1rem',
                            fontFamily: '"Comic Neue", cursive',
                            zIndex: 2,
                        }}
                    >
                        <h3 style={{
                            fontFamily: '"Bangers", cursive',
                            color: '#ff004c',
                            marginBottom: '1rem',
                            fontSize: '2rem',
                            textShadow: '2px 2px #000'
                        }}>
                            {message}
                        </h3>
                        <p style={{color: '#222', fontSize: '1rem', marginBottom: '1.5rem'}}>
                            {subtext}
                        </p>

                        <motion.button
                            onClick={onClose}
                            whileHover={{scale: 1.1, rotate: -2}}
                            whileTap={{scale: 0.95}}
                            transition={{type: 'spring', stiffness: 300}}
                            style={{
                                backgroundColor: '#fca311',
                                color: '#000',
                                border: '2px solid #000',
                                fontFamily: '"Bangers", cursive',
                                fontSize: '1.2rem',
                                padding: '0.5rem 1rem',
                                cursor: 'pointer',
                                boxShadow: '3px 3px 0px #000',
                            }}
                        >
                            OK
                        </motion.button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default StatusOverlay;
