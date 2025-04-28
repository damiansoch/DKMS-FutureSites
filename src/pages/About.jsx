// About.jsx with full epic effects enabled
import React, {useEffect, useState} from 'react';

import {Container} from 'react-bootstrap';
import {motion} from 'framer-motion';
import {useLanguage} from '../Context/LanguageContext';
import EntryAnimationProvider from "../Functions/EntryAnimationProvider.jsx";
import SEOHelmet from "../components/SEO/SEOHelmet.jsx";
import {FaHandPointer, FaRegHandPointUp} from 'react-icons/fa';

import BSODJokeOverlay from "../components/AboutComponents/BSODJokeOverlay.jsx";
import ParticlesBackground from "../components/AboutComponents/ParticlesBackground.jsx";
import {useNavigate} from "react-router-dom";

const paragraphsEN = [
    `Hi there! 👋 I'm someone who designs and builds websites — kind of like a builder, but my bricks are made of code. My days are filled with tabs, ideas, and possibly too much coffee. Honestly, I think my keyboard deserves a raise.`,
    `I enjoy creating things that just work — smooth, reliable, and not the kind of setup that breaks the moment you need it most. Whether it’s a simple page or a more advanced system, I aim for clarity, performance, and peace of mind (no tech support hotline required 😉).`,
    `Even outside of work, I tinker with tools and build automations that make life simpler. I learn best by doing — and occasionally by breaking things just enough to figure out how to fix them.`,
    `The tools I use change often — and that’s the fun of it. I enjoy optimizing, refining, and making things faster and cleaner, even if most of the magic stays hidden behind the scenes.`,
    `By day, I build digital experiences. By night, I explore new tech like AI and wonder if it'll automate me out of a job (spoiler: not today). My mission? Create things that matter, learn constantly, and laugh at bugs before I fix them — or at least before pretending someone else wrote them. 😉`
];

const paragraphsPL = [
    `Cześć! 👋 Tworzę strony internetowe — trochę jak budowlaniec, tylko zamiast cegieł używam kodu. Na co dzień poruszam się między zakładkami, pomysłami i... kolejną kawą. Serio, moja klawiatura powinna mieć własną umowę o pracę.`,
    `Lubię robić rzeczy, które po prostu działają — płynnie, stabilnie i bez dramatu tuż przed weekendem. Czy to prosta wizytówka, czy bardziej rozbudowany system — stawiam na przejrzystość, szybkość i brak konieczności dzwonienia do informatyka 😉.`,
    `Po godzinach też lubię coś poklikać — testuję narzędzia, automatyzuję codzienne zadania i uczę się przez działanie (czasem też przez psucie i szukanie ratunku w Google).`,
    `Technologie się zmieniają, ale to właśnie sprawia, że ta praca nie nudzi się nigdy. Lubię, gdy wszystko działa płynnie, więc często coś optymalizuję, upraszczam lub przyspieszam — nawet jeśli nikt tego nie zauważy.`,
    `Na co dzień projektuję i buduję cyfrowe rozwiązania. Wieczorami bawię się sztuczną inteligencją i zastanawiam, kiedy przejmie moją pracę (spokojnie, jeszcze nie dziś). Moje podejście? Robić rzeczy, które mają sens, ciągle się uczyć i śmiać się z błędów zanim je naprawię — albo przynajmniej zanim się przyznam, że to moja sprawka 😉.`
];

const About = () => {
    const {language} = useLanguage();
    const paragraphs = language === 'pl' ? paragraphsPL : paragraphsEN;
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [scrollEmoji, setScrollEmoji] = useState('☕');
    const [bsod, setBsod] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        const emojis = ['☕', '👨‍💻', '👩‍💻', '💻', '🚀', '🛠️'];
        const handleScroll = () => {
            const random = Math.floor(Math.random() * emojis.length);
            setScrollEmoji(emojis[random]);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <SEOHelmet page="about"/>
            <EntryAnimationProvider>
                <Container
                    className="d-flex align-items-center justify-content-center text-white"
                    style={{
                        marginTop: isMobile ? '10px' : '60px',
                        marginBottom: isMobile ? '60px' : '10px',
                        minHeight: '90vh',
                        position: 'relative',
                        backgroundAttachment: 'fixed',
                        borderRadius: '1rem',
                    }}
                >
                    <ParticlesBackground/>
                    <motion.div
                        className="about-wrapper w-100"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {opacity: 0, y: 30},
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: {duration: 0.6, ease: 'easeOut'},
                            },
                        }}
                    >
                        <h1 className="text-center gradient-text mb-4 d-flex justify-content-center align-items-center gap-2"
                            style={{position: 'relative'}}>
                            {language === 'pl' ? 'O mnie' : 'About Me'}
                            <motion.span
                                initial={{opacity: 0, y: -10}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.4, duration: 0.6}}
                                style={{fontSize: '2rem'}}
                            >
                                {language === 'pl' ? '👨‍💻' : '👩‍💻'}
                            </motion.span>
                        </h1>

                        {paragraphs.map((p, i) => (
                            <motion.p
                                className="about-paragraph"
                                key={i}
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.3 + i * 0.2, duration: 0.5}}
                                style={{textShadow: '1px 1px 4px black'}}
                            >
                                {p}
                            </motion.p>
                        ))}

                        <motion.div
                            className="text-center mt-5"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 1.5, duration: 0.6}}
                        >
                            {bsod && <BSODJokeOverlay show={bsod} onFinish={() => {
                                setBsod(false);
                                navigate(`/${language}/contact`)
                            }
                            }/>

                            }

                            <motion.button
                                whileHover={{scale: 1.08}}
                                whileTap={{scale: 0.95}}
                                className="btn btn-outline-light rounded-pill px-4 py-2"
                                onClick={() => setBsod(true)}
                            >
                                {language === 'pl' ? 'Zbudujmy coś razem!' : "Let's build something together!"}
                            </motion.button>

                            <motion.div
                                className="d-flex justify-content-center"
                                style={{marginTop: '-40px', marginBottom: '10px'}}
                            >
                                <motion.div
                                    animate={{
                                        scale: [2, 2.4, 2],
                                        opacity: [0.7, 1, 0.7],
                                    }}
                                    transition={{
                                        duration: 1.2,
                                        repeat: Infinity,
                                    }}
                                    style={{
                                        fontSize: '2.8rem',
                                        color: 'yellow',
                                        textShadow: '0 0 12px rgba(13,110,253,0.7)',
                                        zIndex: 10,
                                        pointerEvents: 'none',
                                    }}
                                >
                                    {isMobile ? <FaHandPointer/> : <FaRegHandPointUp/>}
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Floating scroll emoji */}
                    {!isMobile && (
                        <motion.div
                            style={{
                                position: 'fixed',
                                bottom: '10%',
                                left: '20px',
                                fontSize: '2rem',
                                opacity: 0.6,
                                pointerEvents: 'none',
                                transform: 'translateY(-10px)',
                            }}
                            animate={{y: [0, -5, 0]}}
                            transition={{repeat: Infinity, duration: 2}}
                        >
                            {scrollEmoji}
                        </motion.div>
                    )}
                </Container>
            </EntryAnimationProvider>
        </>
    );
};

export default About;
