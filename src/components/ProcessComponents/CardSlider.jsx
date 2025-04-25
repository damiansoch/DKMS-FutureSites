import {useState, useEffect, useCallback, useRef} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {FaEyeSlash} from 'react-icons/fa';
import cardDataEn from './cardDataEn';
import cardDataPL from './cardDataPL';
import {useLanguage} from '../../Context/LanguageContext';
import {useUI} from '../../context/UIContext';
import customBurger from '../../assets/icons/custom burger.png';
import EntryAnimationProvider from "../../Functions/EntryAnimationProvider.jsx";

import num1 from "../../assets/cards_imgs/nums/1.png";
import num2 from '../../assets/cards_imgs/nums/2.png';
import num3 from '../../assets/cards_imgs/nums/3.png';
import num4 from '../../assets/cards_imgs/nums/4.png';
import num5 from '../../assets/cards_imgs/nums/5.png';
import num6 from '../../assets/cards_imgs/nums/6.png';
import num7 from '../../assets/cards_imgs/nums/7.png';
import num8 from '../../assets/cards_imgs/nums/8.png';
import num9 from '../../assets/cards_imgs/nums/9.png';
import num10 from '../../assets/cards_imgs/nums/10.png';


const cardVariants = {
    initial: {opacity: 0, y: 60, scale: 0.95},
    animate: {opacity: 1, y: 0, scale: 1},
    exit: {opacity: 0, y: -60, scale: 0.95},
};

const CardSlider = () => {
    const {language} = useLanguage();
    const navRef = useRef(null);

    const cardData = language === 'pl' ? cardDataPL : cardDataEn;
    const total = cardData.length;

    const [index, setIndex] = useState(0);
    const [canScroll, setCanScroll] = useState(true);
    const [touchStartY, setTouchStartY] = useState(null);
    const [showNav, setShowNav] = useState(true); // visible by default
    const {setHideBottomNav} = useUI();

    const badgeImages = [num1, num2, num3, num4, num5, num6, num7, num8, num9, num10];


    const safeSetIndex = (nextIndex) => {
        if (nextIndex >= 0 && nextIndex < total && canScroll) {
            setCanScroll(false);
            setIndex(nextIndex);
            setTimeout(() => setCanScroll(true), 700);
        }
    };

    const handleWheel = useCallback(
        (e) => {
            if (!canScroll) return;

            // ✅ Ignore if scrolling inside nav
            if (navRef.current?.contains(e.target)) return;

            if (e.deltaY > 30) safeSetIndex(index + 1);
            else if (e.deltaY < -30) safeSetIndex(index - 1);
        },
        [index, canScroll]
    );
    const handleTouchStart = (e) => setTouchStartY(e.touches[0].clientY);

    const handleTouchMove = (e) => {
        if (!canScroll || touchStartY === null) return;

        // ✅ Ignore if touching inside nav
        if (navRef.current?.contains(e.target)) return;

        const deltaY = touchStartY - e.touches[0].clientY;
        if (deltaY > 30) {
            safeSetIndex(index + 1);
            setTouchStartY(null);
        } else if (deltaY < -30) {
            safeSetIndex(index - 1);
            setTouchStartY(null);
        }
    };

    useEffect(() => {
        const throttled = (e) => {
            e.preventDefault();
            handleWheel(e);
        };

        const handleKey = (e) => {
            if (!canScroll) return;
            if (e.key === 'ArrowDown') safeSetIndex(index + 1);
            else if (e.key === 'ArrowUp') safeSetIndex(index - 1);
        };

        window.addEventListener('wheel', throttled, {passive: false});
        window.addEventListener('touchstart', handleTouchStart, {passive: false});
        window.addEventListener('touchmove', handleTouchMove, {passive: false});
        window.addEventListener('keydown', handleKey);

        return () => {
            window.removeEventListener('wheel', throttled);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('keydown', handleKey);
        };
    }, [handleWheel, handleTouchMove, index, canScroll]);

    const isOdd = index % 2 !== 0;
    const isMobile = window.innerWidth <= 768;

    useEffect(() => {
        setHideBottomNav(showNav);
    }, [showNav]);

    return (
        <EntryAnimationProvider>
            <div
                style={{
                    height: 'calc(100dvh - 60px)',
                    overflow: 'hidden',
                    touchAction: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginTop: 10,
                    position: 'relative',
                    marginRight: !showNav ? 0 : !isMobile ? "30px" : "40px",
                    transition: 'margin-right 0.3s ease',
                }}
            >
                <AnimatePresence mode="wait">
                    <>
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{duration: 0.6, ease: 'easeInOut'}}
                            className="card-wrapper"
                            style={{
                                width: '90%',
                                height: '90%',
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: '1rem',
                                overflow: 'hidden',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                                background: 'rgba(255, 255, 255, 0.04)',
                                backdropFilter: 'blur(5px)',
                                WebkitBackdropFilter: 'blur(10px)',
                                margin: '0 auto',
                                position: 'relative',
                                zIndex: 5,

                            }}
                        >
                            <div
                                className={`card-inner d-flex ${isMobile ? 'flex-column' : 'flex-md-row'} ${
                                    isOdd ? 'flex-md-row-reverse' : ''
                                }`}
                                style={{flex: 1, height: '100%'}}
                            >
                                <div
                                    className="card-image"
                                    style={{
                                        flex: isMobile ? '0 0 45%' : 1,
                                        minHeight: '200px',
                                        maxHeight: isMobile ? '45%' : 'none',
                                        position: 'relative', // ensure positioning context
                                    }}
                                >
                                    <img
                                        src={cardData[index].image}
                                        alt={cardData[index].title}
                                        style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                    />
                                    <motion.img
                                        key={`badge-${index}`}
                                        src={badgeImages[index]}
                                        alt={`Number ${index + 1}`}
                                        initial={{opacity: 0, scale: 0.5}}
                                        animate={{
                                            opacity: 1,
                                            scale: [1, 1.15, 1],
                                        }}
                                        transition={{
                                            opacity: {delay: 0.7, duration: 0.7},
                                            scale: {
                                                delay: 0.7,
                                                duration: 1.5,
                                                ease: 'easeInOut',
                                                repeat: 2, // total = 3 pulses
                                            },
                                        }}
                                        style={{
                                            position: 'absolute',
                                            top: '10px',
                                            [isMobile ? "right" : isOdd ? 'left' : 'right']: '10px',

                                            width: isMobile ? '40px' : '60px',
                                            height: isMobile ? '40px' : '60px',
                                            borderRadius: '6px',
                                            objectFit: 'cover',
                                            zIndex: 10,
                                            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                                        }}
                                    />

                                </div>


                                <motion.div
                                    className={`card-content ${isMobile ? 'p-2' : 'p-4'} d-flex flex-column justify-content-start justify-content-lg-center`}
                                    style={{
                                        flex: 1,
                                        color: '#fff',
                                        overflowY: 'auto',
                                        maxHeight: isMobile ? '55%' : 'none',
                                    }}
                                    initial={{opacity: 0, x: isOdd ? -40 : 40}}
                                    animate={{opacity: 1, x: 0}}
                                    exit={{opacity: 0, x: isOdd ? -40 : 40}}
                                    transition={{duration: 0.5, ease: 'easeOut'}}
                                >
                                    <h5 style={{marginBottom: '1rem'}}>{cardData[index].title}</h5>
                                    {cardData[index].content.split('\n\n').map((para, i) => (
                                        <p
                                            key={i}
                                            style={{
                                                fontSize: '0.95rem',
                                                lineHeight: '1.6',
                                                color: '#eee',
                                                marginBottom: '1rem',
                                            }}
                                        >
                                            {para}
                                        </p>
                                    ))}
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Animated Border Frame */}
                        <motion.div
                            key={`border-top-${index}`}
                            initial={{width: 0}}
                            animate={{width: '90%'}}
                            exit={{width: 0}}
                            transition={{duration: 0.8, delay: 0.5}} // ⬅️ SLOWER & DELAYED
                            style={{
                                position: 'absolute',
                                top: '5%',
                                left: '5%',
                                height: '2px',
                                background: 'linear-gradient(to right, #ff8a00, #e52e71)',
                                zIndex: 10,
                            }}
                        />
                        <motion.div
                            key={`border-right-${index}`}
                            initial={{height: 0}}
                            animate={{height: '90%'}}
                            exit={{height: 0}}
                            transition={{duration: 0.8, delay: 0.7}} // ⬅️ Slightly later
                            style={{
                                position: 'absolute',
                                top: '5%',
                                right: '5%',
                                width: '2px',
                                background: 'linear-gradient(to bottom, #e52e71, #007aff)',
                                zIndex: 10,
                            }}
                        />
                        <motion.div
                            key={`border-bottom-${index}`}
                            initial={{width: 0}}
                            animate={{width: '90%'}}
                            exit={{width: 0}}
                            transition={{duration: 0.8, delay: 0.9}} // ⬅️ More delay
                            style={{
                                position: 'absolute',
                                bottom: '5%',
                                left: '5%',
                                height: '2px',
                                background: 'linear-gradient(to left, #007aff, #ff8a00)',
                                zIndex: 10,
                            }}
                        />
                        <motion.div
                            key={`border-left-${index}`}
                            initial={{height: 0}}
                            animate={{height: '90%'}}
                            exit={{height: 0}}
                            transition={{duration: 0.8, delay: 1.1}} // ⬅️ Last and slowest
                            style={{
                                position: 'absolute',
                                top: '5%',
                                left: '5%',
                                width: '2px',
                                background: 'linear-gradient(to top, #ff8a00, #e52e71)',
                                zIndex: 10,
                            }}
                        />
                    </>
                </AnimatePresence>

                {/* Burger Button */}
                {!showNav && (
                    <button
                        onClick={() => setShowNav(true)}
                        style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 20,
                            background: 'rgba(255, 255, 255, 0.1)', // slightly brighter
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            borderRadius: '50%',
                            width: '50px', // larger
                            height: '50px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 0 8px rgba(255, 255, 255, 0.2)', // subtle glow
                        }}
                    >
                        <motion.img
                            src={customBurger}
                            alt="Menu"
                            initial={{scale: 1}}
                            animate={{
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatType: 'loop',
                                ease: 'easeInOut',
                            }}
                            style={{
                                width: '50px',
                                height: '50px',
                                objectFit: 'contain',
                                filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.5))',
                            }}
                        />
                    </button>
                )}

                {/* Nav Thumbnails */}
                {showNav && (
                    <div
                        ref={navRef}
                        className="card-nav"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'fixed',
                            right: 0,
                            top: 0,
                            bottom: 0,
                            maxHeight: '100dvh',
                            overflowY: 'auto',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: 'rgba(0,0,0,0.3)',
                            backdropFilter: 'blur(6px)',
                            flexWrap: 'nowrap',
                            zIndex: 2000,
                            padding: 5
                        }}
                    >
                        {cardData.map((card, i) => (
                            <div
                                key={i}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: "center",
                                    cursor: 'pointer',
                                    color: index === i ? "yellow" : "white",
                                    transition: 'opacity 0.3s',
                                }}
                                onClick={() => safeSetIndex(i)}
                            >
                                <div
                                    style={{
                                        width: index === i ? '32px' : '24px',
                                        height: index === i ? '32px' : '24px',
                                        borderRadius: '50%',
                                        overflow: 'hidden',
                                        border: index === i ? '2px solid yellow' : '1px solid #888',
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    <img
                                        src={card.image}
                                        alt=""
                                        style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                    />
                                </div>
                                <span
                                    style={{
                                        fontSize: '0.6rem',
                                        whiteSpace: 'nowrap',
                                        maxWidth: '60px',
                                        textAlign: 'center',
                                        opacity: 0.9,
                                        paddingBottom: isMobile ? 0 : "10px",
                                    }}
                                >
                                    {card.shortTitle}
                                </span>
                            </div>
                        ))}

                        {/* Hide Button inside nav */}
                        <motion.button
                            onClick={() => setShowNav(false)}
                            whileHover={{scale: 1.1}}
                            whileTap={{scale: 0.95}}
                            style={{
                                marginTop: '1rem',
                                background: 'transparent',
                                border: 'none',
                                color: 'white',
                                fontSize: '1.2rem',
                                cursor: 'pointer',
                            }}
                            title="Hide navigation"
                        >
                            <FaEyeSlash/>
                        </motion.button>
                    </div>
                )}
            </div>
        </EntryAnimationProvider>
    );
};

export default CardSlider;
