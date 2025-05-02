import React, {useState, useRef} from 'react';
import {Form} from 'react-bootstrap';
import {motion} from 'framer-motion';

import contactBkg from "../../assets/Comic/ContactBkg.png"

import StatusOverlay from "../../components/ContactComponents/StatusOverlay.jsx";
import {useLanguage} from '../../Context/LanguageContext.jsx';

import Explosion from '../../assets/Comic/icons/explosion.png';
import bg4 from "../../assets/Comic/PagesPC/Page4_4.png";

const comicInputStyle = {
    border: '2px solid #000',
    borderRadius: '0.3rem',
    boxShadow: '2px 2px 0px #000',
    fontFamily: '"Comic Neue", cursive',
    fontSize: '0.85rem',
    padding: '0.35rem 0.5rem',
    color: '#000',
    backgroundColor: '#fff',
};

const ComiContact = () => {
    const [statusVisible, setStatusVisible] = useState(false);
    const [errors, setErrors] = useState({name: '', email: '', message: ''});
    const [formData, setFormData] = useState({name: '', email: '', message: ''});
    const formRef = useRef(null);
    const {language} = useLanguage();

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

    const handleSubmit = (e) => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Please enter your name.';
        if (!formData.email.trim()) newErrors.email = 'Please enter a valid email.';
        if (!formData.message.trim()) newErrors.message = 'Please write a message.';

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            e.preventDefault();
            return;
        }

        setStatusVisible(true);
        setTimeout(() => formRef.current.reset(), 1500);
    };

    const handleFieldChange = (field, value) => {
        setFormData(prev => ({...prev, [field]: value}));
        setErrors(prev => ({...prev, [field]: value.trim() ? '' : `Please enter your ${field}.`}));
    };

    const isFormIncomplete = () => (
        !formData.name.trim() || !formData.email.trim() || !formData.message.trim()
    );

    return (
        <div
            style={{
                height: 'calc(100vh - 70px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                marginTop: "70px",
                backgroundImage: `url(${contactBkg})`,
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',

            }}
        >


            <div className="d-flex justify-content-center align-items-center " style={{flex: 1}}>
                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '600px',
                        padding: '1.2rem',
                        borderRadius: '0.8rem',
                        background: 'radial-gradient(circle, #fff 70%, #ffd166 100%)',
                        border: '4px solid #111',
                        boxShadow: '8px 8px 0px #000',
                        fontFamily: '"Comic Neue", cursive',
                        zIndex: 5,
                    }}
                >
                    <h4 className="text-center mb-2"
                        style={{fontFamily: '"Bangers", cursive', color: '#000', fontSize: '1.5rem'}}>
                        {t.contactTitle}
                    </h4>

                    <Form
                        onSubmit={handleSubmit}
                        method="POST"
                        action="https://formspree.io/f/mwpopkqg"
                        ref={formRef}
                    >
                        <input type="hidden" name="_captcha" value="true"/>

                        <Form.Group className="mb-1">
                            <Form.Label className="mb-0 text-dark"
                                        style={{fontSize: '0.85rem'}}>{t.yourName}</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                size="sm"
                                placeholder={t.placeholderName}
                                onChange={(e) => handleFieldChange('name', e.target.value)}
                                style={comicInputStyle}
                            />
                            {errors.name && <small style={{color: 'red'}}>{errors.name}</small>}
                        </Form.Group>

                        <Form.Group className="mb-1">
                            <Form.Label className="mb-0 text-dark"
                                        style={{fontSize: '0.85rem'}}>{t.emailAddress}</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                size="sm"
                                placeholder={t.placeholderEmail}
                                onChange={(e) => handleFieldChange('email', e.target.value)}
                                style={comicInputStyle}
                            />
                            {errors.email && <small style={{color: 'red'}}>{errors.email}</small>}
                        </Form.Group>

                        <Form.Group className="mb-1">
                            <Form.Label className="mb-0 text-dark"
                                        style={{fontSize: '0.85rem'}}>{t.phoneNumber}</Form.Label>
                            <Form.Control
                                type="tel"
                                name="phone"
                                size="sm"
                                placeholder={t.placeholderPhone}
                                style={comicInputStyle}
                            />
                        </Form.Group>

                        <Form.Group className="mb-1">
                            <Form.Label className="mb-0 text-dark"
                                        style={{fontSize: '0.85rem'}}>{t.yourMessage}</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="message"
                                rows={3}
                                size="sm"
                                placeholder={t.placeholderMessage}
                                onChange={(e) => handleFieldChange('message', e.target.value)}
                                style={{...comicInputStyle, resize: 'vertical'}}
                            />
                            {errors.message && <small style={{color: 'red'}}>{errors.message}</small>}
                        </Form.Group>

                        <div style={{position: 'relative', height: '80px', marginTop: '1.2rem'}}>
                            <img
                                src={Explosion}
                                alt="explosion"
                                style={{
                                    position: 'absolute',
                                    top: '-60px',
                                    left: '50%',
                                    transform: 'translateX(-50%) rotate(45deg)',
                                    width: '230px',
                                    zIndex: 1,
                                    pointerEvents: 'none',
                                }}
                            />
                            <motion.button
                                type="submit"
                                disabled={isFormIncomplete()}
                                whileHover={{scale: 1.1, rotate: -2}}
                                whileTap={{scale: 0.95}}
                                transition={{type: 'spring', stiffness: 300}}
                                className="btn"
                                style={{
                                    zIndex: 2,
                                    position: 'relative',
                                    width: '150px',
                                    fontFamily: '"Bangers", cursive',
                                    fontSize: '1.2rem',
                                    backgroundColor: '#ff004c',
                                    border: '3px solid #000',
                                    color: '#fff',
                                    boxShadow: '3px 3px 0px #000',
                                    padding: '0.4rem 0.6rem',
                                }}
                            >
                                {t.sendMessage}
                            </motion.button>
                        </div>
                    </Form>
                </div>
            </div>

            <StatusOverlay
                show={statusVisible}
                message={t.statusTitle}
                subtext={t.statusText}
                onClose={() => setStatusVisible(false)}
            />
        </div>
    );
};

export default ComiContact;
