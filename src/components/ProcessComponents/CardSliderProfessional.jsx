import {useLanguage} from '../../Context/LanguageContext';
import cardDataEn from './cardDataEn';
import cardDataPL from './cardDataPL';
import num1 from '../../assets/cards_imgs/nums/1.png';
import num2 from '../../assets/cards_imgs/nums/2.png';
import num3 from '../../assets/cards_imgs/nums/3.png';
import num4 from '../../assets/cards_imgs/nums/4.png';
import num5 from '../../assets/cards_imgs/nums/5.png';
import num6 from '../../assets/cards_imgs/nums/6.png';
import num7 from '../../assets/cards_imgs/nums/7.png';
import num8 from '../../assets/cards_imgs/nums/8.png';
import num9 from '../../assets/cards_imgs/nums/9.png';
import num10 from '../../assets/cards_imgs/nums/10.png';

import {getProfessionalTheme} from "../styles/professionalTheme.jsx";
import {motion} from 'framer-motion';


const badgeImages = [num1, num2, num3, num4, num5, num6, num7, num8, num9, num10];

const CardStepsProfessional = () => {
    const {language} = useLanguage();
    const isNight = language === 'pl';

    const cardData = isNight ? cardDataPL : cardDataEn;
    const title = isNight
        ? 'Nasz Proces — Od Wizji Do Realizacji'
        : 'Our Process — From Vision to Execution';

    const themeStyles = getProfessionalTheme(isNight);

    return (
        <div style={{
            padding: '80px 20px 40px',
            maxWidth: '900px',
            margin: '0 auto',
            fontFamily: "'Open Sans', sans-serif",
            color: themeStyles.textColor,
        }}>
            {/* Title */}
            <h1 style={{
                fontSize: '2rem',
                textAlign: 'center',
                marginBottom: '60px',
                color: themeStyles.titleColor,
                fontWeight: '600',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                position: 'relative',
                paddingBottom: '20px',
                fontFamily: "'Orbitron', 'Segoe UI', sans-serif",
                textShadow: themeStyles.textShadow,
            }}>
                {title}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '100px',
                    height: '4px',
                    backgroundColor: themeStyles.titleLine,
                    borderRadius: '2px',
                }}/>
            </h1>

            {/* Steps */}
            {cardData.map((card, index) => (
                <motion.div
                    key={index}
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{amount: 0.3}}
                    transition={{duration: 0.5, ease: 'easeOut'}}
                >
                    <motion.div
                        key={index}
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        whileHover={{scale: 1.02}}
                        transition={{duration: 0.3, ease: 'easeOut'}}
                        viewport={{amount: 0.3}}
                        style={{
                            backgroundColor: themeStyles.cardBackground,
                            borderRadius: '12px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                            padding: '30px 20px',
                            marginBottom: '40px',
                            transition: 'transform 0.3s ease',
                        }}
                    >
                        <section
                            id={`step-${index + 1}`}
                            className="card-step"
                            style={{
                                display: 'flex',
                                flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
                                alignItems: 'flex-start',
                                gap: '20px',
                                flexWrap: 'wrap',
                            }}
                        >
                            {/* Image */}
                            <motion.div
                                whileHover={{scale: 1.05}}
                                transition={{duration: 0.3}}
                                style={{
                                    flex: '0 0 30%',
                                    maxWidth: '200px',
                                    textAlign: 'center',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    borderRadius: '8px',
                                    boxShadow: isNight
                                        ? '0 0 15px rgba(0, 173, 255, 0.25)'
                                        : '0 0 10px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <img
                                    src={card.imageProf}
                                    alt={card.title}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        objectFit: 'cover',
                                        borderRadius: '8px',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                        transition: 'transform 0.3s ease',
                                    }}
                                />
                            </motion.div>

                            {/* Text */}
                            <div className="card-step-text" style={{flex: '1 1 70%', minWidth: '250px'}}>
                                <h3
                                    className="card-step-title"
                                    style={{
                                        fontSize: '1.5rem',
                                        marginBottom: '15px',
                                        color: themeStyles.subtitleColor,
                                        fontFamily: "'Segoe UI', sans-serif",
                                        textShadow: themeStyles.textShadow,
                                    }}
                                >
                                    {card.title}
                                </h3>
                                {card.content.split('\n\n').map((paragraph, i) => (
                                    <p
                                        className="card-step-paragraph"
                                        key={i}
                                        style={{
                                            fontSize: '1rem',
                                            lineHeight: '1.7',
                                            color: themeStyles.textColor,
                                            marginBottom: '15px',
                                            textShadow: themeStyles.textShadow,
                                        }}
                                    >
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </section>
                    </motion.div>


                    {/* Divider */}
                    {index !== cardData.length - 1 && (
                        <div
                            className="card-step-divider"
                            style={{
                                height: '1px',
                                background: themeStyles.divider,
                                margin: '40px 0',
                                opacity: 0.6,
                            }}
                        />
                    )}
                </motion.div>
            ))}
        </div>
    );
};

export default CardStepsProfessional;
