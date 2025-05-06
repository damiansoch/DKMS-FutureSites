import React, {useState, useRef} from 'react';
import {Form} from 'react-bootstrap';
import {motion} from 'framer-motion';
import {useLanguage} from '../../../Context/LanguageContext.jsx';

import StatusOverlay from '../../../components/ContactComponents/StatusOverlay.jsx';

import contactBkg from '../../../assets/Comic/ContactBkgMobile.png'; // use a soft/spacey background
import Explosion from '../../../assets/Comic/icons/explosion.png';

const inputStyle = {
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '0.6rem',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(6px)',
    color: '#fff',
    fontSize: '0.9rem',
    padding: '0.5rem 0.8rem',
    width: '100%',
};

const translations = {
    en: {
        contactTitle: "Initiate Contact",
        yourName: "Name",
        emailAddress: "Email",
        phoneNumber: "Phone (Optional)",
        yourMessage: "Message",
        placeholderName: "Your Name",
        placeholderEmail: "you@example.com",
        placeholderPhone: "Optional",
        placeholderMessage: "What do you need built?",
        sendMessage: "Initiate Mission",
        statusTitle: "Transmission Sent!",
        statusText: "Thanks for reaching out. CODELINA will respond shortly."
    },
    pl: {
        contactTitle: "Rozpocznij kontakt",
        yourName: "Imię",
        emailAddress: "E-mail",
        phoneNumber: "Telefon (opcjonalnie)",
        yourMessage: "Wiadomość",
        placeholderName: "Twoje imię",
        placeholderEmail: "ty@przyklad.com",
        placeholderPhone: "Opcjonalnie",
        placeholderMessage: "Czego potrzebujesz?",
        sendMessage: "Rozpocznij Misję",
        statusTitle: "Transmisja wysłana!",
        statusText: "Dziękuję za kontakt. CODELINA wkrótce odpowie."
    }
};

const ComiContactMobile = () => {
    const {language} = useLanguage();
    const t = translations[language];
    const formRef = useRef(null);

    const [formData, setFormData] = useState({name: '', email: '', message: ''});
    const [errors, setErrors] = useState({name: '', email: '', message: ''});
    const [statusVisible, setStatusVisible] = useState(false);

    const handleFieldChange = (field, value) => {
        setFormData(prev => ({...prev, [field]: value}));
        setErrors(prev => ({...prev, [field]: value.trim() ? '' : `Please enter your ${field}.`}));
    };

    const handleSubmit = (e) => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Required';
        if (!formData.email.trim()) newErrors.email = 'Required';
        if (!formData.message.trim()) newErrors.message = 'Required';

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            e.preventDefault();
            return;
        }

        setStatusVisible(true);
        setTimeout(() => formRef.current?.reset(), 1500);
    };

    const isFormIncomplete = () =>
        !formData.name.trim() || !formData.email.trim() || !formData.message.trim();

    return (
        <div
            style={{
                marginTop: "70px",
                height: "calc(100dvh - 70px)",
                backgroundImage: `url(${contactBkg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                overflow: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
            }}
        >
            <div
                style={{
                    width: '90%',
                    maxWidth: '500px',
                    padding: '1.2rem',
                    borderRadius: '1rem',
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(8px)',
                    border: '2px solid rgba(255,255,255,0.15)',
                    color: '#fff',
                    marginTop: "10px"
                }}
            >
                <h4
                    className="text-center"
                    style={{
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: '1.8rem',
                        marginBottom: '1rem',
                        letterSpacing: '1px',
                    }}
                >
                    {t.contactTitle}
                </h4>

                <Form
                    onSubmit={handleSubmit}
                    method="POST"
                    action="https://formspree.io/f/mwpopkqg"
                    ref={formRef}
                >
                    <input type="hidden" name="_captcha" value="true"/>

                    <Form.Group className="mb-2">
                        <Form.Label className="mb-1" style={{fontSize: "0.85rem"}}>{t.yourName}</Form.Label>
                        <Form.Control
                            size="sm"
                            type="text"
                            name="name"
                            placeholder={t.placeholderName}
                            style={inputStyle}
                            onChange={(e) => handleFieldChange('name', e.target.value)}
                        />
                        {errors.name && <div style={{color: 'red', fontSize: '0.75rem'}}>{errors.name}</div>}
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label className="mb-1" style={{fontSize: "0.85rem"}}>{t.emailAddress}</Form.Label>
                        <Form.Control
                            size="sm"
                            type="email"
                            name="email"
                            placeholder={t.placeholderEmail}
                            style={inputStyle}
                            onChange={(e) => handleFieldChange('email', e.target.value)}
                        />
                        {errors.email && <div style={{color: 'red', fontSize: '0.75rem'}}>{errors.email}</div>}
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label className="mb-1" style={{fontSize: "0.85rem"}}>{t.phoneNumber}</Form.Label>
                        <Form.Control
                            size="sm"
                            type="tel"
                            name="phone"
                            placeholder={t.placeholderPhone}
                            style={inputStyle}
                        />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label className="mb-1" style={{fontSize: "0.85rem"}}>{t.yourMessage}</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            size="sm"
                            name="message"
                            placeholder={t.placeholderMessage}
                            style={{...inputStyle, resize: 'vertical'}}
                            onChange={(e) => handleFieldChange('message', e.target.value)}
                        />
                        {errors.message && <div style={{color: 'red', fontSize: '0.75rem'}}>{errors.message}</div>}
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
                                width: '180px',
                                zIndex: 1,
                                pointerEvents: 'none',
                            }}
                        />
                        <motion.button
                            type="submit"
                            disabled={isFormIncomplete()}
                            whileHover={{scale: 1.1}}
                            whileTap={{scale: 0.95}}
                            transition={{type: 'spring', stiffness: 300}}
                            className="btn"
                            style={{
                                zIndex: 2,
                                position: 'relative',
                                width: '100%',
                                fontFamily: '"Bebas Neue", sans-serif',
                                fontSize: '1.4rem',
                                background: 'linear-gradient(to right, #00c9ff, #92fe9d)',
                                color: '#000',
                                border: '2px solid #fff',
                                borderRadius: '0.5rem',
                                padding: '0.5rem',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                            }}
                        >
                            {t.sendMessage}
                        </motion.button>
                    </div>
                </Form>
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

export default ComiContactMobile;
