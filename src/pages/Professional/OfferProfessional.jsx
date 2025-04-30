import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import {motion} from 'framer-motion';
import {useLanguage} from '../../Context/LanguageContext.jsx';
import {getProfessionalTheme} from "../../components/styles/professionalTheme.jsx";
import SEOHelmet from "../../components/SEO/SEOHelmet.jsx";

const containerVariants = {
    hidden: {opacity: 0, y: 40},
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
            when: 'beforeChildren',
            staggerChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: {opacity: 0, y: 30},
    visible: {
        opacity: 1,
        y: 0,
        transition: {duration: 0.5, ease: 'easeOut'},
    },
};

const Offer = () => {
    const {language} = useLanguage();
    const isNight = language === 'pl';
    const theme = getProfessionalTheme(isNight);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const t = {
        title: language === 'pl'
            ? 'Rozwiązania Dopasowane do Twoich Potrzeb'
            : 'Solutions Tailored to Your Needs',
        intro: language === 'pl'
            ? 'Projektuję nowoczesne, niewielkie strony internetowe dopasowane do Twojej marki — eleganckie, mobilne i opcjonalnie połączone z częścią administracyjną.\n\nMoim celem jest stworzenie strony, która będzie wyglądać dobrze, działać szybko i odpowiadać na Twoje potrzeby.'
            : 'I design modern, small-scale websites tailored to your brand — sleek, mobile-friendly, and optionally connected to a basic backend.\n\nMy goal is to deliver a website that looks great, performs well, and aligns with your specific needs.',
        infoTitle: language === 'pl' ? 'Strony Informacyjne' : 'Informational Websites',
        infoText: language === 'pl'
            ? 'Tworzę przejrzyste, szybko ładujące się strony do prezentacji Twojej działalności, usług lub portfolio. Strona główna, Bio, Kontakt i inne — wszystko responsywne, zoptymalizowane i dostosowane do Twojej marki.'
            : 'I create clean, fast-loading websites to showcase your business, services, or portfolio. Home, Bio, Contact and more — all responsive, optimized, and tailored to your brand.',
        backendTitle: language === 'pl' ? 'Proste Funkcje Zaplecza' : 'Light Backend Features',
        backendText: language === 'pl'
            ? 'Jeśli potrzebujesz czegoś więcej niż statycznej strony, mogę dodać lekkie funkcjonalności backendowe — takie jak formularze kontaktowe, panel do edycji treści lub inne rozwiązania, jeśli uznamy je za potrzebne.'
            : 'If you need more than static content, I can add lightweight backend features like contact forms, content editing panels, or other tools — depending on what we agree is useful.',
        pricing: language === 'pl'
            ? 'Każdy projekt jest inny. Chętnie porozmawiam o Twoim pomyśle i wspólnie ustalimy uczciwą, dopasowaną cenę — prosto, przejrzyście i elastycznie.'
            : 'Every project is different. I’d be happy to talk through your idea and agree on a fair, tailored price — simple, transparent, and flexible.',
    };

    return (
        <div id="offer" style={{
            padding: '20px 20px 40px',
            maxWidth: '900px',
            margin: '0 auto',
            fontFamily: "'Open Sans', sans-serif",
        }}>
            <SEOHelmet page="offer"/>

            <Container
                fluid
                className="d-flex align-items-center justify-content-center"
                style={{
                    marginTop: isMobile ? "10px" : "60px",
                    marginBottom: isMobile ? "60px" : "10px",
                    padding: "20px",
                    color: theme.textColor,
                }}
            >
                <motion.div
                    className="text-center"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{amount: 0.3}}
                >
                    {/* Page Title */}
                    <motion.h1
                        className="mb-4"
                        variants={itemVariants}
                        style={{
                            fontSize: '2rem',
                            textAlign: 'center',
                            marginBottom: '60px',
                            color: theme.titleColor,
                            fontWeight: '600',
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            position: 'relative',
                            paddingBottom: '20px',
                            fontFamily: "'Orbitron', 'Segoe UI', sans-serif",
                            textShadow: theme.textShadow,
                        }}
                    >
                        {t.title}
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '100px',
                            height: '4px',
                            backgroundColor: theme.titleLine,
                            borderRadius: '2px',
                        }}/>
                    </motion.h1>

                    {/* Intro Text */}
                    <motion.div className="lead mb-5" variants={itemVariants}>
                        {t.intro.split('\n\n').map((line, i) => (
                            <motion.p
                                key={i}
                                variants={itemVariants}
                                style={{
                                    textShadow: theme.textShadow,
                                    color: theme.textColor,
                                    fontSize: '1.1rem',
                                    lineHeight: '1.7',
                                    marginBottom: '20px',
                                }}
                            >
                                {line}
                            </motion.p>
                        ))}
                    </motion.div>

                    {/* Cards */}
                    <Row className="justify-content-center align-items-center h-100">
                        {[{
                            title: t.infoTitle,
                            text: t.infoText,
                        }, {
                            title: t.backendTitle,
                            text: t.backendText,
                        }].map((card, index) => (
                            <Col md={5} className="mb-4" key={index}>
                                <motion.div
                                    variants={itemVariants}
                                    whileHover={{scale: 1.02}}
                                    transition={{duration: 0.3, ease: 'easeOut'}}
                                    style={{
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <Card
                                        className="h-100"
                                        style={{
                                            background: theme.cardBackground || (isNight ? 'rgba(255,255,255,0.03)' : '#f9f9f9'),
                                            // border: `1px solid ${theme.titleLine}`,
                                            color: theme.textColor,
                                            textShadow: isNight ? theme.textShadow : 'none',
                                            borderRadius: '12px',
                                            padding: '20px',
                                        }}
                                    >
                                        <Card.Body>
                                            <Card.Title
                                                style={{
                                                    fontSize: '1.25rem',
                                                    fontWeight: '600',
                                                    color: theme.subtitleColor,
                                                    fontFamily: "'Segoe UI', sans-serif",
                                                    textShadow: theme.textShadow,
                                                    marginBottom: '15px',
                                                }}
                                            >
                                                {card.title}
                                            </Card.Title>
                                            <Card.Text
                                                style={{
                                                    fontSize: '1rem',
                                                    lineHeight: '1.6',
                                                    color: theme.textColor,
                                                    textShadow: theme.textShadow,
                                                }}
                                            >
                                                {card.text}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </motion.div>
                            </Col>
                        ))}
                    </Row>

                    {/* Pricing Info */}
                    <motion.p
                        className="mt-4"
                        variants={itemVariants}
                        style={{
                            textShadow: theme.textShadow,
                            color: theme.textColor,
                            fontSize: '1.1rem',
                        }}
                    >
                        <strong>{language === 'pl' ? 'Cennik:' : 'Pricing:'}</strong> {t.pricing}
                    </motion.p>
                </motion.div>
            </Container>
        </div>
    );
};

export default Offer;
