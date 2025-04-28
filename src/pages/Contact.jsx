import React, {useEffect, useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import {motion} from 'framer-motion';
import ParticlesBackground from "../components/AboutComponents/ParticlesBackground.jsx";
import StatusOverlay from "../components/ContactComponents/StatusOverlay.jsx";
import {useLanguage} from '../Context/LanguageContext';
import EntryAnimationProvider from "../Functions/EntryAnimationProvider.jsx";

const borderAnimDuration = 0.8;

const Contact = () => {
    const [statusVisible, setStatusVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [errors, setErrors] = useState({name: '', email: '', message: ''});
    const [formData, setFormData] = useState({name: '', email: '', message: ''});
    const [buttonPosition, setButtonPosition] = useState({x: 0, y: 0});
    const [shake, setShake] = useState(false);

    const formRef = useRef(null);
    const {language} = useLanguage();
    const [key, setKey] = useState(Date.now());
    const navigate = useNavigate();

    const translations = {
        en: {
            contactTitle: "Contact Me",
            yourName: "Your Name",
            emailAddress: "Email Address",
            phoneNumber: "Phone Number (Optional)",
            yourMessage: "Your Message",
            placeholderName: "John Doe",
            placeholderEmail: "you@example.com",
            placeholderPhone: "Optional phone number",
            placeholderMessage: "Write something...",
            sendMessage: "Send Message",
            statusTitle: "Message Sent!",
            statusText: "Thanks for reaching out. I'll get back to you shortly."
        },
        pl: {
            contactTitle: "Skontaktuj się ze mną",
            yourName: "Twoje imię",
            emailAddress: "Adres e-mail",
            phoneNumber: "Numer telefonu (opcjonalnie)",
            yourMessage: "Twoja wiadomość",
            placeholderName: "Jan Kowalski",
            placeholderEmail: "ty@przyklad.com",
            placeholderPhone: "Opcjonalny numer telefonu",
            placeholderMessage: "Napisz coś...",
            sendMessage: "Wyślij wiadomość",
            statusTitle: "Wiadomość wysłana!",
            statusText: "Dziękuję za kontakt. Wkrótce się odezwę."
        }
    };

    const t = translations[language];

    useEffect(() => {
        const submitted = sessionStorage.getItem('formSubmitted');
        if (submitted === 'true') {
            setStatusVisible(true);
            sessionStorage.removeItem('formSubmitted');
            if (formRef.current) {  // 🛡️ Check if it exists first
                formRef.current.reset();
            }
        }
    }, [key]);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSubmit = (e) => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Please enter your name.';
        if (!formData.email.trim()) newErrors.email = 'Please enter a valid email.';
        if (!formData.message.trim()) newErrors.message = 'Please write a message.';

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            e.preventDefault();  // ⬅️ Only block if errors exist
            setShake(true);
            setTimeout(() => setShake(false), 500);
            return;
        }

        // 🟰 No e.preventDefault() if no errors → allow normal Formspree POST
        sessionStorage.setItem('formSubmitted', 'true');
    };


    const handleFieldChange = (field, value) => {
        setFormData(prev => ({...prev, [field]: value}));

        if (!value.trim()) {
            setErrors(prev => ({...prev, [field]: `Please enter your ${field}.`}));
        } else {
            setErrors(prev => ({...prev, [field]: ''}));
        }
    };

    // 🟰 NEW FUNCTION: Checks if form is incomplete
    const isFormIncomplete = () => {
        return (
            !formData.name.trim() ||
            !formData.email.trim() ||
            !formData.message.trim()
        );
    };

    return (
        <>
            <EntryAnimationProvider>
                <div
                    style={{
                        height: 'calc(100dvh - 60px)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        marginTop: isMobile ? 0 : "60px",
                        marginBottom: isMobile ? "60px" : 0,
                        position: 'relative',
                        overflow: 'auto'
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
                            <h4 className="text-center text-white mb-2">{t.contactTitle}</h4>

                            <motion.div
                                animate={{x: shake ? [0, -10, 10, -10, 0] : 0}}
                                transition={{type: 'spring', stiffness: 300}}
                            >
                                <Form
                                    onSubmit={handleSubmit}
                                    method="POST"
                                    action="https://formspree.io/f/mwpopkqg"
                                    ref={formRef}
                                >
                                    <input type="hidden" name="_captcha" value="true"/>

                                    {/* Name */}
                                    <Form.Group className="mb-1">
                                        <Form.Label style={{fontSize: "small"}}
                                                    className="text-white mb-0">{t.yourName}</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            size="sm"
                                            placeholder={t.placeholderName}
                                            onChange={(e) => handleFieldChange('name', e.target.value)}
                                        />
                                        {errors.name &&
                                            <small style={{color: 'red', fontSize: "small"}}>{errors.name}</small>}
                                    </Form.Group>

                                    {/* Email */}
                                    <Form.Group className="mb-1">
                                        <Form.Label style={{fontSize: "small"}}
                                                    className="text-white my-0">{t.emailAddress}</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            size="sm"
                                            placeholder={t.placeholderEmail}
                                            onChange={(e) => handleFieldChange('email', e.target.value)}
                                        />
                                        {errors.email &&
                                            <small style={{color: 'red', fontSize: "small"}}>{errors.email}</small>}
                                    </Form.Group>

                                    {/* Phone */}
                                    <Form.Group className="mb-1">
                                        <Form.Label style={{fontSize: "small"}}
                                                    className="text-white mb-0">{t.phoneNumber}</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            name="phone"
                                            size="sm"
                                            placeholder={t.placeholderPhone}
                                        />
                                    </Form.Group>

                                    {/* Message */}
                                    <Form.Group className="mb-2">
                                        <Form.Label style={{fontSize: "small"}}
                                                    className="text-white mb-0">{t.yourMessage}</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            name="message"
                                            rows={3}
                                            size="sm"
                                            placeholder={t.placeholderMessage}
                                            onChange={(e) => handleFieldChange('message', e.target.value)}
                                            style={{resize: "vertical"}}
                                        />
                                        {errors.message &&
                                            <small style={{color: 'red', fontSize: "small"}}>{errors.message}</small>}
                                    </Form.Group>

                                    {/* Submit Button */}
                                    <div
                                        className="text-center mt-2"
                                        style={{
                                            position: 'relative',
                                            height: '80px',
                                            overflow: 'visible'
                                        }}
                                    >
                                        <div
                                            style={{
                                                position: 'relative',
                                                width: '90%',
                                                height: '60px',
                                                margin: '0 auto',
                                                overflow: 'visible',
                                            }}
                                        >
                                            <motion.div
                                                animate={{
                                                    x: buttonPosition.x,
                                                    y: buttonPosition.y,
                                                }}
                                                transition={{type: 'spring', stiffness: 500, damping: 15}}
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: '50%',
                                                    transform: 'translateX(-50%)',
                                                }}
                                                onMouseEnter={() => {
                                                    const missingFields = {};
                                                    if (!formData.name.trim()) missingFields.name = 'Please enter your name.';
                                                    if (!formData.email.trim()) missingFields.email = 'Please enter a valid email.';
                                                    if (!formData.message.trim()) missingFields.message = 'Please write a message.';
                                                    setErrors(missingFields);

                                                    if (Object.keys(missingFields).length > 0) {
                                                        const areaWidth = 0.9 * 600;  // 90% of 600px = 540px
                                                        const halfArea = areaWidth / 2;  // 270px
                                                        const buttonWidth = 100; // (approx button width)

                                                        const currentX = buttonPosition.x;

                                                        let targetX;

                                                        if (currentX < 0) {
                                                            // Currently in LEFT half → move to random in RIGHT half
                                                            targetX = Math.random() * (halfArea - buttonWidth / 2);
                                                        } else {
                                                            // Currently in RIGHT half → move to random in LEFT half
                                                            targetX = -(Math.random() * (halfArea - buttonWidth / 2));
                                                        }

                                                        // Small random Y wiggle (keep it light)
                                                        const targetY = (Math.random() - 0.5) * 40; // between -20 and +20

                                                        setButtonPosition({x: targetX, y: targetY});
                                                    }
                                                }}

                                                onMouseLeave={() => {
                                                    if (!isFormIncomplete()) {
                                                        setButtonPosition({x: 0, y: 0});
                                                    }
                                                }}
                                            >
                                                <Button
                                                    size="sm"
                                                    type="submit"
                                                    variant="primary"
                                                    className="px-1"
                                                    disabled={isFormIncomplete()}
                                                >
                                                    {t.sendMessage}
                                                </Button>
                                            </motion.div>

                                        </div>
                                    </div>


                                </Form>
                            </motion.div>

                            {/* Animated Borders */}
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
            </EntryAnimationProvider>
        </>
    );
};

export default Contact;
