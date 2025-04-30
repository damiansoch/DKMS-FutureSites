import {useState, useRef, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {Navbar as RBNavbar, Container, Nav, Button} from 'react-bootstrap';
import {useLanguage} from '../../Context/LanguageContext.jsx';

// React Icons
import {AiOutlineHome} from 'react-icons/ai';
import {BsDiagram3} from 'react-icons/bs'
import {HiOutlineClipboardList} from 'react-icons/hi';
import {FiMail, FiMenu, FiX} from 'react-icons/fi';

import logo from '../../assets/Professional/FutureSitesLogo.png';
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

    const navItems = [
        {href: '#start', icon: <AiOutlineHome size={24}/>, label: language === 'pl' ? 'Start' : 'Home'},
        {href: '#process', icon: <BsDiagram3 size={24}/>, label: language === 'pl' ? 'Proces' : 'Process'},

        {href: '#offer', icon: <HiOutlineClipboardList size={24}/>, label: language === 'pl' ? 'Oferta' : 'Offer'},
        {href: '#contact', icon: <FiMail size={24}/>, label: language === 'pl' ? 'Kontakt' : 'Contact'},
    ];

    return (
        <RBNavbar
            style={{backgroundColor: '#f8f9fa', maxHeight: "70px"}}
            variant="light"
            expand="md"
            fixed="top"
            expanded={menuOpen}
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
                        style={{height: '70px', width: 'auto', objectFit: "fill"}}
                    />
                </Link>

                <RBNavbar.Toggle
                    ref={toggleRef}
                    aria-controls="basic-navbar-nav"
                    onClick={() => setMenuOpen(prev => !prev)}
                    style={{border: 'none', background: 'transparent', padding: 0}}
                >
                    {menuOpen ? <FiX size={36}/> : <FiMenu size={36}/>}
                </RBNavbar.Toggle>

                <RBNavbar.Collapse
                    id="basic-navbar-nav"
                    ref={navRef}
                    className="justify-content-end"
                    style={{
                        backgroundColor: menuOpen ? '#f8f9fa' : 'transparent',
                        transition: 'all 0.3s ease',
                        padding: menuOpen ? '1rem' : '0',
                        borderRadius: menuOpen ? '10px' : '0',
                        border: menuOpen ? '1px solid #dee2e6' : 'none',
                        boxShadow: menuOpen ? '0 4px 20px rgba(0, 0, 0, 0.08)' : 'none',
                        marginTop: menuOpen ? '10px' : '0',
                    }}
                >
                    <Nav className="ms-auto flex-column flex-md-row align-items-stretch align-items-md-center">
                        <div className="d-flex flex-column flex-md-row w-100 gap-1">
                            {navItems.map(({href, icon, label}) => (
                                <a
                                    key={href}
                                    href={href}
                                    onClick={() => setMenuOpen(false)}
                                    className="nav-link d-flex align-items-center gap-2 justify-content-start w-100 text-dark px-3 py-2 border-bottom border-dark-subtle"
                                >
                                    {icon}
                                    <span style={{fontWeight: 500}}>{label}</span>
                                </a>
                            ))}
                        </div>

                        <div className="d-flex flex-column flex-md-row w-100 my-0 mt-md-0">
                            <div className="text-center">
                                <Button
                                    variant="link"
                                    onClick={() => {
                                        toggleLanguage();
                                        setMenuOpen(false);
                                    }}
                                    className="pt-1 border-0 bg-transparent my-auto"
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
