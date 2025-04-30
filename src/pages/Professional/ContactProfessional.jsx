import React, {useState, useRef} from 'react';
import {Container, Form, Button} from 'react-bootstrap';
import {motion} from 'framer-motion';
import {useLanguage} from '../../Context/LanguageContext.jsx';
import {getProfessionalTheme} from '../../components/styles/professionalTheme.jsx';
import SEOHelmet from '../../components/SEO/SEOHelmet.jsx';
import StatusOverlay from '../../components/ContactComponents/StatusOverlay.jsx';

const containerVariants = {
    hidden: {opacity: 0, y: 40},
    visible: {
        opacity: 1,
        y: 0,
        transition: {duration: 0.6, ease: 'easeOut', when: 'beforeChildren', staggerChildren: 0.3},
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

const ContactProfessional = () => {
    const {language} = useLanguage();
    const isNight = language === 'pl';
    const theme = getProfessionalTheme(isNight);

    const [statusVisible, setStatusVisible] = useState(false);
    const [formData, setFormData] = useState({name: '', email: '', phone: '', message: ''});
    const [errors, setErrors] = useState({});
    const formRef = useRef(null);

    const t = {
        title: language === 'pl' ? 'Skontaktuj się ze mną' : 'Get In Touch',
        placeholders: {
            name: language === 'pl' ? 'Jan Kowalski' : 'John Doe',
            email: language === 'pl' ? 'ty@przyklad.com' : 'you@example.com',
            phone: language === 'pl' ? 'Opcjonalny numer telefonu' : 'Optional phone number',
            message: language === 'pl' ? 'Napisz swoją wiadomość...' : 'Write your message...',
        },
        labels: {
            name: language === 'pl' ? 'Imię' : 'Name',
            email: language === 'pl' ? 'Email' : 'Email',
            phone: language === 'pl' ? 'Telefon (opcjonalnie)' : 'Phone (optional)',
            message: language === 'pl' ? 'Wiadomość' : 'Message',
            send: language === 'pl' ? 'Wyślij Wiadomość' : 'Send Message',
        },
        status: {
            title: language === 'pl' ? 'Wiadomość wysłana!' : 'Message Sent!',
            subtext: language === 'pl' ? 'Dziękuję za kontakt. Odpowiem wkrótce.' : 'Thank you for reaching out. I will get back to you shortly.',
        },
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({...prev, [field]: value}));
        if (!value.trim() && field !== 'phone') {
            setErrors(prev => ({...prev, [field]: 'Required'}));
        } else {
            setErrors(prev => ({...prev, [field]: ''}));
        }
    };

    const handleSubmit = (e) => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Required';
        if (!formData.email.trim()) newErrors.email = 'Required';
        if (!formData.message.trim()) newErrors.message = 'Required';

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            e.preventDefault(); // ⬅️ Block if errors
            return;
        }

        // No preventDefault() = allow Formspree to handle POST
        setStatusVisible(true);

        setTimeout(() => {
            formRef.current.reset();
            setFormData({name: '', email: '', phone: '', message: ''});
        }, 1500);
    };

    return (
        <div id="contact">
            <SEOHelmet page="contact"/>
            <Container
                fluid
                className="d-flex align-items-center justify-content-center"
                style={{
                    minHeight: 'calc(100vh - 60px)',
                    fontFamily: "'Open Sans', sans-serif",
                    color: theme.textColor,
                }}
            >
                <motion.div
                    className="w-100 text-center"
                    style={{maxWidth: '600px', padding: '20px', position: 'relative'}}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{amount: 0.3}}
                >
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

                    <motion.div variants={itemVariants}>
                        <Form
                            onSubmit={handleSubmit}
                            method="POST"
                            action="https://formspree.io/f/mwpopkqg"
                            ref={formRef}
                            style={{
                                background: '#f8f9fa',
                                padding: '2rem',
                                borderRadius: '1rem',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                                // border: `1px solid ${theme.titleLine}`,
                                color: theme.textColor,
                            }}
                        >
                            <Form.Group className="mb-1 text-start">
                                <Form.Label style={{color: theme.subtitleColor, fontWeight: '500', fontSize: 'small'}}>
                                    {t.labels.name}:
                                </Form.Label>
                                <Form.Control
                                    size="sm"
                                    type="text"
                                    name="name"
                                    placeholder={t.placeholders.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    style={{
                                        fontSize: '0.9rem',
                                        color: theme.textColor,
                                        backgroundColor: '#ffffff',
                                        borderColor: theme.titleLine,
                                        '::placeholder': {
                                            color: 'rgba(0,0,0,0.4)',
                                        }
                                    }}
                                />
                                {errors.name && <sup style={{color: 'red'}}>{errors.name}</sup>}
                            </Form.Group>

                            <Form.Group className="mb-1 text-start">
                                <Form.Label style={{color: theme.subtitleColor, fontWeight: '500', fontSize: 'small'}}>
                                    {t.labels.email}:
                                </Form.Label>
                                <Form.Control
                                    size="sm"
                                    type="email"
                                    name="email"
                                    placeholder={t.placeholders.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    style={{
                                        fontSize: '0.9rem',
                                        color: theme.textColor,
                                        backgroundColor: '#ffffff',
                                        borderColor: theme.titleLine,
                                    }}
                                />
                                {errors.email && <sup style={{color: 'red'}}>{errors.email}</sup>}
                            </Form.Group>

                            <Form.Group className="mb-1 text-start">
                                <Form.Label style={{color: theme.subtitleColor, fontWeight: '500', fontSize: 'small'}}>
                                    {t.labels.phone}:
                                </Form.Label>
                                <Form.Control
                                    size="sm"
                                    type="tel"
                                    name="phone"
                                    placeholder={t.placeholders.phone}
                                    onChange={(e) => handleChange('phone', e.target.value)}
                                    style={{
                                        fontSize: '0.9rem',
                                        color: theme.textColor,
                                        backgroundColor: '#ffffff',
                                        borderColor: theme.titleLine,
                                    }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-2 text-start">
                                <Form.Label style={{color: theme.subtitleColor, fontWeight: '500', fontSize: 'small'}}>
                                    {t.labels.message}:
                                </Form.Label>
                                <Form.Control
                                    size="sm"
                                    as="textarea"
                                    rows={3}
                                    name="message"
                                    placeholder={t.placeholders.message}
                                    onChange={(e) => handleChange('message', e.target.value)}
                                    style={{
                                        fontSize: '0.9rem',
                                        resize: 'vertical',
                                        color: theme.textColor,
                                        backgroundColor: '#ffffff',
                                        borderColor: theme.titleLine,
                                    }}
                                />
                                {errors.message && <sup style={{color: 'red'}}>{errors.message}</sup>}
                            </Form.Group>

                            <Button
                                type="submit"
                                variant="primary"
                                className="w-100"
                                style={{
                                    background: theme.titleLine,
                                    border: 'none',
                                    fontWeight: '600',
                                }}
                            >
                                {t.labels.send}
                            </Button>
                        </Form>
                    </motion.div>

                    <StatusOverlay
                        show={statusVisible}
                        type="success"
                        message={t.status.title}
                        subtext={t.status.subtext}
                        onClose={() => setStatusVisible(false)}
                    />
                </motion.div>
            </Container>
        </div>
    );
};

export default ContactProfessional;
