import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
// eslint-disable-next-line
import {motion} from 'framer-motion';
import EntryAnimationProvider from "../Functions/EntryAnimationProvider.jsx";
import {useLanguage} from '../Context/LanguageContext';
import SEOHelmet from "../components/SEO/SEOHelmet.jsx";
import ParticlesBackground from "../components/AboutComponents/ParticlesBackground.jsx";

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
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Run on mount
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const t = {
        title: language === 'pl' ? 'Moja Oferta' : 'My Offer',
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
        <>
            <SEOHelmet page="offer"/>
            <EntryAnimationProvider>
                <Container
                    fluid
                    className="d-flex align-items-center justify-content-center text-white "
                    style={{
                        marginTop: isMobile ? "10px" : "60px",
                        marginBottom: isMobile ? "60px" : "10px",

                    }}
                >
                    <ParticlesBackground/>
                    <motion.div
                        className="text-center"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.h1 className="mb-4 gradient-text" variants={itemVariants}
                                   style={{textShadow: '1px 1px 4px black'}}
                        >
                            {t.title}
                        </motion.h1>

                        <motion.div className="lead mb-5" variants={itemVariants}>
                            {t.intro.split('\n\n').map((line, i) => (
                                <motion.p key={i} variants={itemVariants} className="mb-3"
                                          style={{textShadow: '1px 1px 4px black'}}>{line}</motion.p>
                            ))}
                        </motion.div>

                        <Row className="justify-content-center align-items-center h-100">
                            <Col md={5} className="mb-4 ">
                                <motion.div variants={itemVariants}>
                                    <Card className="gradient-card " style={{textShadow: '1px 1px 4px black'}}>
                                        <Card.Body>
                                            <Card.Title>{t.infoTitle}</Card.Title>
                                            <Card.Text>{t.infoText}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </motion.div>
                            </Col>

                            <Col md={5} className="mb-4">
                                <motion.div variants={itemVariants}>
                                    <Card className="gradient-card " style={{textShadow: '1px 1px 4px black'}}>
                                        <Card.Body>
                                            <Card.Title>{t.backendTitle}</Card.Title>
                                            <Card.Text>{t.backendText}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </motion.div>
                            </Col>
                        </Row>

                        <motion.p className="mt-4" variants={itemVariants} style={{textShadow: '1px 1px 4px black'}}>
                            <strong
                            >{language === 'pl' ? 'Cennik:' : 'Pricing:'}</strong> {t.pricing}
                        </motion.p>
                    </motion.div>
                </Container>
            </EntryAnimationProvider>
        </>
    );
};

export default Offer;
