import React from 'react';
import {Col, Row} from 'react-bootstrap';
import {motion} from 'framer-motion';
import Explosion from '../../assets/Comic/icons/explosion.png';

import ComicFrame from './ComicFrame.jsx';
import {useLanguage} from '../../Context/LanguageContext.jsx';

import background from '../../assets/Comic/PagesPC/Page8.png';
import ContactMeButton_en from '../../assets/Comic/icons/ContactMeButton_en.png';
import ContactMeButton_pl from '../../assets/Comic/icons/ContactMeButton_pl.png';

const Page8 = () => {
    const {language} = useLanguage();

    const buttonMap = {
        en: ContactMeButton_en,
        pl: ContactMeButton_pl,
    };

    return (
        <ComicFrame>
            <div style={{height: '100%', maxWidth: '100%', marginLeft: '15px', marginRight: '15px'}}>
                <Row className="h-100">
                    <Col
                        style={{
                            backgroundImage: `url(${background})`,
                            backgroundSize: '100% 100%',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            position: 'relative',
                        }}
                        className="bg-success border border-white border-4"
                    >
                        {/* ComiContact Button Wrapper (absolute) */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '15%',
                                left: '40%',
                                width: '200px',
                                height: 'auto',
                                zIndex: 5,
                            }}
                        >
                            {/* Explosion Behind */}
                            <motion.img
                                src={Explosion}
                                alt="Explosion"
                                style={{
                                    position: 'absolute',
                                    top: '-130px',
                                    left: '-50%',
                                    width: '400px', // adjust size as needed
                                    zIndex: 1,
                                    pointerEvents: 'none',
                                    rotate: '45deg',
                                }}
                                animate={{scale: [1, 1.05, 1]}}
                                transition={{repeat: Infinity, duration: 2, ease: 'easeInOut'}}
                            />


                            {/* Animated Button Image */}
                            <motion.img
                                src={buttonMap[language] || ContactMeButton_en}
                                alt="ComiContact Me"
                                style={{
                                    position: 'relative',
                                    zIndex: 2,
                                    width: '100%',
                                    cursor: 'pointer',


                                }}
                                whileHover={{scale: 1.1, rotate: -2}}
                                whileTap={{scale: 0.95, rotate: 0}}
                                transition={{type: 'spring', stiffness: 300}}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        </ComicFrame>
    );
};

export default Page8;
