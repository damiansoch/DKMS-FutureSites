import {useState, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useLanguage} from '../../Context/LanguageContext.jsx';
import {Navbar as RBNavbar, Container, Nav, Button} from 'react-bootstrap';
import {useLocation} from 'react-router-dom';

import logo from '../../assets/fabryka_stron_logo.png';
import mainNavCustomBurger from '../../assets/icons/mainNavCustomBurger.png';
import closeBurger from '../../assets/icons/closeBurger.png';
import homeIcon from '../../assets/icons/home_icn.png';
import progressIcon from '../../assets/icons/processIcn.png';
import offerIcon from '../../assets/icons/OfferIcn.png';
import contactIcon from '../../assets/icons/contact.png';
import plFlag from '../../assets/icons/plFlag.png';
import gbFlag from '../../assets/icons/gbFlag.png';

const NavbarProfessional = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navRef = useRef(null);
    const toggleRef = useRef(null);

    const {language, toggleLanguage} = useLanguage();
    const location = useLocation();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                menuOpen &&
                navRef.current &&
                !navRef.current.contains(e.target) &&
                toggleRef.current &&
                !toggleRef.current.contains(e.target)
            ) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <RBNavbar
            style={{backgroundColor: '#f8f9fa', maxHeight: "60px"}}
            variant="light"
            expand="md"
            fixed="top"
            expanded={menuOpen}   // 🔥 Correct! tell Navbar if it's open!
            className="shadow-sm py-0"
        >
            <Container>
                <Link
                    to={`/${language}/home`}
                    className="navbar-brand d-flex align-items-center"
                    style={{minWidth: '120px'}}
                    onClick={() => setMenuOpen(false)}
                >
                    <img
                        src={logo}
                        alt="Fabryka Stron Logo"
                        style={{height: '60px', width: 'auto', objectFit: 'contain'}}
                    />
                </Link>

                <RBNavbar.Toggle
                    ref={toggleRef}
                    aria-controls="basic-navbar-nav"
                    onClick={() => setMenuOpen(prev => !prev)}
                    style={{border: 'none', background: 'transparent', padding: 0}}
                >
                    <img
                        src={menuOpen ? closeBurger : mainNavCustomBurger}
                        alt="Menu"
                        style={{height: '40px', width: '40px', objectFit: 'contain'}}
                    />
                </RBNavbar.Toggle>

                <RBNavbar.Collapse
                    id="basic-navbar-nav"
                    ref={navRef}
                    className="justify-content-end"
                    style={{
                        backgroundColor: menuOpen ? '#f8f9fa' : 'transparent', // 🛠️ light background when open
                        transition: 'background-color 0.3s ease', // nice smooth transition
                        padding: menuOpen ? '1rem 0' : '0', // little padding when open (optional)
                    }}
                >
                    <Nav className="ms-auto flex-column flex-md-row align-items-stretch align-items-md-center">
                        <div className="d-flex flex-column flex-md-row w-100">
                            {/* Scroll Links */}
                            <a
                                href="#start"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setMenuOpen(false);
                                    window.scrollTo({top: 0, behavior: 'smooth'});
                                }}
                                className="nav-link d-flex align-items-center justify-content-center w-100 text-dark"
                            >
                                <img src={homeIcon} alt="Start" style={{width: '40px', height: '40px'}}/>
                                {language === 'pl' ? 'Start' : 'Home'}
                            </a>

                            <a href="#process" onClick={() => setMenuOpen(false)}
                               className="nav-link d-flex align-items-center justify-content-center w-100 text-dark">
                                <img src={progressIcon} alt="Process" style={{width: '40px', height: '40px'}}/>
                                {language === 'pl' ? 'Proces' : 'Process'}
                            </a>

                            <a href="#offer" onClick={() => setMenuOpen(false)}
                               className="nav-link d-flex align-items-center justify-content-center w-100 text-dark">
                                <img src={offerIcon} alt="Offer" style={{width: '40px', height: '40px'}}/>
                                {language === 'pl' ? 'Oferta' : 'Offer'}
                            </a>

                            <a href="#contact" onClick={() => setMenuOpen(false)}
                               className="nav-link d-flex align-items-center justify-content-center w-100 text-dark">
                                <img src={contactIcon} alt="Contact" style={{width: '40px', height: '40px'}}/>
                                {language === 'pl' ? 'Kontakt' : 'Contact'}
                            </a>
                        </div>

                        {/* Language Toggle */}
                        <div className="d-flex flex-column flex-md-row w-100">
                            <div className="text-center">
                                <Button
                                    variant="link"
                                    onClick={() => {
                                        toggleLanguage();
                                        setMenuOpen(false);
                                    }}
                                    className="p-2 border-0 bg-transparent my-auto"
                                    style={{boxShadow: 'none'}}
                                    title="Toggle language"
                                >
                                    <div style={{position: 'relative', width: '60px', height: '60px'}}>
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                width: '20px',
                                                height: '20px',
                                                backgroundColor: '#ffffff',
                                                borderRadius: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                zIndex: 0,
                                            }}
                                        />
                                        <img
                                            src={language === 'en' ? gbFlag : plFlag}
                                            alt="Toggle language"
                                            style={{
                                                width: '60px',
                                                height: '60px',
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                                position: 'relative',
                                                zIndex: 1,
                                            }}
                                        />
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </Nav>
                </RBNavbar.Collapse>
            </Container>
        </RBNavbar>
    );
};

export default NavbarProfessional;
