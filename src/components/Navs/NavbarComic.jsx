import {useState, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Navbar as RBNavbar, Container, Nav, Button} from 'react-bootstrap';
import {useLanguage} from '../../Context/LanguageContext.jsx';

// React Icons

import {FiMenu, FiX} from 'react-icons/fi';


import logo from '../../assets/Comic/fabryka_stron_logo.png'
import plFlag from '../../assets/icons/plFlag.png';
import gbFlag from '../../assets/icons/gbFlag.png';

import startIco from "../../assets/Comic/icons/start.png"

import contactIco from "../../assets/Comic/icons/contact.png"


const NavbarProfessional = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navRef = useRef(null);
    const toggleRef = useRef(null);
    const {language, toggleLanguage} = useLanguage();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


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
        {to: `/${language}/home`, icon: startIco, label: language === 'pl' ? 'Start' : 'Home'},

        {to: `/${language}/contact`, icon: contactIco, label: language === 'pl' ? 'Kontakt' : 'Contact'},

    ];

    return (
        <RBNavbar
            className="navbar-comic shadow-sm py-0"
            // variant="light"
            expand="md"
            fixed="top"
            expanded={menuOpen}

        >
            <Container>
                <Link
                    to={`/${language}/home`}
                    className="navbar-brand d-flex align-items-center"
                    style={{minWidth: '120px',}}
                    onClick={() => setMenuOpen(false)}
                >

                    <img
                        src={logo}
                        alt="Fabryka Stron Logo"
                        style={{
                            height: !isMobile ? '120px' : "70px",
                            width: 'auto',
                            objectFit: "fill",
                            marginTop: !isMobile ? "60px" : "0px",
                            transform: "rotate(-20deg)",
                            marginLeft: !isMobile ? "-40px" : "-10px"
                            // display: "none"
                        }}
                    />

                </Link>

                <RBNavbar.Toggle
                    ref={toggleRef}
                    aria-controls="basic-navbar-nav"
                    onClick={() => setMenuOpen(prev => !prev)}
                    style={{
                        border: 'none',
                        background: 'transparent',
                        padding: 0,
                        marginTop: !isMobile ? "-60px" : "-20px"
                    }}
                >
                    {menuOpen ? <FiX size={36}/> : <FiMenu size={36}/>}
                </RBNavbar.Toggle>

                <RBNavbar.Collapse
                    id="basic-navbar-nav"
                    ref={navRef}
                    className={`justify-content-end`}
                    style={{
                        position: menuOpen ? 'absolute' : 'static',
                        top: '80px',
                        left: 10,
                        right: 10,
                        zIndex: 1050,
                        padding: menuOpen ? '1rem' : '0',
                        borderRadius: menuOpen ? '10px' : '0',
                        transition: 'all 0.3s ease',
                        ...(menuOpen && {
                            backgroundColor: 'rgba(255, 255, 255, 0.01)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                        })
                    }}
                >

                    <Nav className="ms-auto flex-column flex-md-row align-items-stretch align-items-md-center">
                        <div className="d-flex flex-column flex-md-row w-100 ">
                            {navItems.map(({to, icon, label}) => (
                                <Link
                                    key={to}
                                    to={to}
                                    onClick={() => setMenuOpen(false)}
                                    className={`nav-link d-flex align-items-center justify-content-start w-100 text-dark px-3 py-1 my-1 rounded ${menuOpen ? 'mobile-menu-bg' : ''}`}
                                >
                                    <img
                                        src={icon}
                                        alt={label}
                                        style={{
                                            width: '70px',
                                            height: '70px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            position: 'relative',
                                            zIndex: 1,
                                            WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 70%)',
                                            WebkitMaskSize: '100% 100%',
                                            maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
                                            maskSize: '100% 100%',
                                        }}
                                    />
                                    {/*                                <span*/}
                                    {/*                                    style={{*/}
                                    {/*                                        fontWeight: 700,*/}
                                    {/*                                        fontSize: '1.1rem',*/}
                                    {/*                                        color: '#1e3a8a',*/}
                                    {/*                                        marginLeft: '-5px',*/}
                                    {/*                                        transform: 'translate(-5px ,10px)',*/}
                                    {/*                                        textShadow: '1px 1px 2px #ffffff, 0 0 5px #ffffff',*/}
                                    {/*                                        transition: 'transform 0.2s ease',*/}
                                    {/*                                        zIndex: 1051*/}
                                    {/*                                    }}*/}
                                    {/*                                >*/}
                                    {/*  {label}*/}
                                    {/*</span>*/}
                                </Link>
                            ))}
                        </div>

                        <div className="d-flex flex-column flex-md-row w-100 my-0 mt-md-0">
                            <div className="text-center">
                                <Button
                                    variant="link"
                                    onClick={() => {
                                        toggleLanguage();

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
