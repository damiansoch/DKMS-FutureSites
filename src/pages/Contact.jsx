import React, {useEffect, useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {Form, Button, FloatingLabel} from 'react-bootstrap';
import {motion} from 'framer-motion';
import ParticlesBackground from "../components/AboutComponents/ParticlesBackground.jsx";
import StatusOverlay from "../components/ContactComponents/StatusOverlay.jsx";
import {useLanguage} from '../Context/LanguageContext';

const borderAnimDuration = 0.8;

const Contact = () => {
    const [statusVisible, setStatusVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const formRef = useRef(null);
    const {language} = useLanguage();
    const [key, setKey] = useState(Date.now()); // Use Date.now() to force re-render
    const navigate = useNavigate();

    const translations = {
        en: {
            contactTitle: "Contact Me",
            yourName: "Your Name",
            emailAddress: "Email Address",
            yourMessage: "Your Message",
            placeholderName: "John Doe",
            placeholderEmail: "you@example.com",
            placeholderMessage: "Write something...",
            sendMessage: "Send Message",
            statusTitle: "Message Sent!",
            statusText: "Thanks for reaching out. I'll get back to you shortly."
        },
        pl: {
            contactTitle: "Skontaktuj się ze mną",
            yourName: "Twoje imię",
            emailAddress: "Adres e-mail",
            yourMessage: "Twoja wiadomość",
            placeholderName: "Jan Kowalski",
            placeholderEmail: "ty@przyklad.com",
            placeholderMessage: "Napisz coś...",
            sendMessage: "Wyślij wiadomość",
            statusTitle: "Wiadomość wysłana!",
            statusText: "Dziękuję za kontakt. Wkrótce się odezwę."
        }
    };
    const t = translations[language];

    // ✅ Check if form was just submitted (after redirect)
    useEffect(() => {
        const submitted = sessionStorage.getItem('formSubmitted');
        if (submitted === 'true') {
            setStatusVisible(true);
            sessionStorage.removeItem('formSubmitted');
            formRef.current.reset();
        }
    }, [key]);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSubmit = () => {
        // Show the success message immediately
        setStatusVisible(true);

        // Delay the form reset by 1 second (1000 milliseconds)
        setTimeout(() => {
            formRef.current.reset();
        }, 1500); // Adjust the delay time as needed
    };

    return (
        <div
            style={{
                height: 'calc(100dvh - 60px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginTop: isMobile ? 0 : "60px",
                marginBottom: isMobile ? "60px" : 0,
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <ParticlesBackground/>

            <div className="d-flex justify-content-center align-items-center px-3" style={{flex: 1}}>
                <motion.div
                    initial={{opacity: 0, y: 40, scale: 0.95}}
                    animate={{opacity: 1, y: 0, scale: 1}}
                    transition={{duration: 0.6}}
                    style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '600px',
                        padding: '1rem 2rem',
                        borderRadius: '1rem',
                        background: 'rgba(255, 255, 255, 0.04)',
                        backdropFilter: 'blur(6px)',
                        WebkitBackdropFilter: 'blur(6px)',
                        zIndex: 5,
                    }}
                >
                    <h2 className="text-center text-white mb-4">{t.contactTitle}</h2>

                    <Form
                        onSubmit={handleSubmit}
                        method="POST"
                        action="https://formspree.io/f/mwpopkqg"
                        ref={formRef}
                    >
                        <input type="hidden" name="_captcha" value="true"/>

                        <FloatingLabel controlId="name" label={t.yourName} className="mb-3 text-dark">
                            <Form.Control
                                type="text"
                                name="name"
                                required
                                placeholder={t.placeholderName}
                            />
                        </FloatingLabel>

                        <FloatingLabel controlId="email" label={t.emailAddress} className="mb-3 text-dark">
                            <Form.Control
                                type="email"
                                name="email"
                                required
                                placeholder={t.placeholderEmail}
                            />
                        </FloatingLabel>

                        <FloatingLabel controlId="message" label={t.yourMessage} className="mb-3 text-dark">
                            <Form.Control
                                as="textarea"
                                name="message"
                                rows={5}
                                required
                                placeholder={t.placeholderMessage}
                                style={{height: '150px'}}
                            />
                        </FloatingLabel>

                        <div className="text-center">
                            <Button type="submit" variant="primary" className="px-4">
                                {t.sendMessage}
                            </Button>
                        </div>
                    </Form>

                    {/* 🟦 Animated Borders */}
                    <motion.div
                        initial={{width: 0}}
                        animate={{width: '100%'}}
                        transition={{duration: borderAnimDuration, delay: 0.5}}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '2px',
                            background: 'linear-gradient(to right, #ff8a00, #e52e71)',
                        }}
                    />
                    <motion.div
                        initial={{height: 0}}
                        animate={{height: '100%'}}
                        transition={{duration: borderAnimDuration, delay: 0.7}}
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: '2px',
                            background: 'linear-gradient(to bottom, #e52e71, #007aff)',
                        }}
                    />
                    <motion.div
                        initial={{width: 0}}
                        animate={{width: '100%'}}
                        transition={{duration: borderAnimDuration, delay: 0.9}}
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            height: '2px',
                            background: 'linear-gradient(to left, #007aff, #ff8a00)',
                        }}
                    />
                    <motion.div
                        initial={{height: 0}}
                        animate={{height: '100%'}}
                        transition={{duration: borderAnimDuration, delay: 1.1}}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '2px',
                            background: 'linear-gradient(to top, #ff8a00, #e52e71)',
                        }}
                    />
                </motion.div>
            </div>

            <StatusOverlay
                show={statusVisible}
                type="success"
                message={t.statusTitle}
                subtext={t.statusText}
                onClose={() => setStatusVisible(false)}
            />
        </div>
    );
};

export default Contact;
