import {useState, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from '../../auth.jsx';
import {Navbar as RBNavbar, Container, Nav, Button} from 'react-bootstrap';
import {useLanguage} from '../../Context/LanguageContext.jsx';
import {useLocation} from 'react-router-dom';
import logo from '../../assets/fabryka_stron_logo.png';

import mainNavCustomBurger from '../../assets/icons/mainNavCustomBurger.png';
import closeBurger from '../../assets/icons/closeBurger.png';
import homeIcon from '../../assets/icons/home_icn.png';
import progressIcon from '../../assets/icons/processIcn.png';
import offerIcon from '../../assets/icons/OfferIcn.png';
import aboutIcon from '../../assets/icons/aboutIcn.png';
import contactIcon from '../../assets/icons/contact.png';
// import loginIcn from '../assets/icons/logInIcn.png'
// import registerIcn from '../assets/icons/registerIcn.png'
// import logoutIcn from '../assets/icons/logoutIcn.png'

import plFlag from '../../assets/icons/plFlag.png';
import gbFlag from '../../assets/icons/gbFlag.png';


const NavbarAnimated = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navRef = useRef(null);

    // const {isAuthorized, logout} = useAuth();
    const {language, toggleLanguage} = useLanguage();
    const location = useLocation();

    // Add this ref at the top with your other refs
    const toggleRef = useRef(null);

// Your existing useEffect with modifications
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
        <RBNavbar style={{backgroundColor: '#141A26', maxHeight: "60px"}} variant="dark" expand="md" fixed="top"
                  className="shadow-sm py-0">
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
                    onClick={() => {
                        setMenuOpen(!menuOpen)
                    }}
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
                    in={menuOpen}
                    ref={navRef}
                    style={{
                        backgroundColor: '#141A26',
                        ...(menuOpen ? {} : {maxHeight: '60px'}),
                    }}
                >
                    <Nav className="ms-auto flex-column flex-md-row align-items-stretch align-items-md-center ">
                        <div className="d-flex flex-column flex-md-row  w-100">
                            <Link to={`/${language}/home`} onClick={() => setMenuOpen(false)}
                                  className={`nav-link d-flex align-items-center justify-content-center w-100  ${location.pathname.includes('/home') ? 'text-white-50 pointer-events-none' : 'text-white'}`}>
                                <img src={homeIcon} alt="Home" style={{
                                    width: '50px',
                                    height: '50px',
                                    opacity: location.pathname.includes('/home') ? "0.5" : 1
                                }}
                                />
                                {language === 'pl' ? 'Start' : 'Home'}
                            </Link>
                            <Link to={`/${language}/process`} onClick={() => setMenuOpen(false)}
                                  className={`nav-link d-flex align-items-center justify-content-center w-100 ${location.pathname.includes('/process') ? 'text-white-50 pointer-events-none' : 'text-white'}`}>
                                <img src={progressIcon} alt="Process" style={{
                                    width: '50px',
                                    height: '50px',
                                    opacity: location.pathname.includes('/process') ? "0.5" : 1
                                }}
                                />
                                {language === 'pl' ? 'Proces' : 'Process'}
                            </Link>
                            <Link to={`/${language}/offer`} onClick={() => setMenuOpen(false)}
                                  className={`nav-link d-flex align-items-center justify-content-center w-100  ${location.pathname.includes('/offer') ? 'text-white-50 pointer-events-none' : 'text-white'}`}>
                                <img src={offerIcon} alt="Offer" style={{
                                    width: '50px',
                                    height: '50px',
                                    opacity: location.pathname.includes('/offer') ? "0.5" : 1
                                }}
                                />
                                {language === 'pl' ? 'Oferta' : 'Offer'}
                            </Link>
                            <Link to={`/${language}/about`} onClick={() => setMenuOpen(false)}
                                  className={`nav-link d-flex align-items-center justify-content-center w-100  ${location.pathname.includes('/about') ? 'text-white-50 pointer-events-none' : 'text-white'}`}>
                                <img src={aboutIcon} alt="About" style={{
                                    width: '50px',
                                    height: '50px',
                                    opacity: location.pathname.includes('/about') ? "0.5" : 1
                                }}
                                />
                                {language === 'pl' ? 'Bio' : 'About'}
                            </Link>
                            <Link to={`/${language}/contact`} state={{from: location.pathname}}
                                  onClick={() => setMenuOpen(false)}
                                  className={`nav-link d-flex align-items-center justify-content-center w-100  ${location.pathname.includes('/contact') ? 'text-white-50 pointer-events-none' : 'text-white'}`}>
                                <img src={contactIcon} alt="Offer" style={{
                                    width: '50px',
                                    height: '50px',
                                    opacity: location.pathname.includes('/contact') ? "0.5" : 1
                                }}
                                />
                                {language === 'pl' ? 'Kontakt' : 'Contact'}
                            </Link>

                        </div>


                        <div className="d-flex flex-column flex-md-row  w-100">
                            {/*{!isAuthorized ? (*/}
                            {/*    <>*/}
                            {/*        <Link to={`/${language}/login`}*/}
                            {/*              className="nav-link text-primary w-100 text-center my-auto"*/}

                            {/*              onClick={() => setMenuOpen(false)}>*/}
                            {/*            <img src={loginIcn} alt="About" style={{width: '50px', height: '50px'}}*/}
                            {/*            />*/}
                            {/*            {language === 'pl' ? 'Zaloguj się' : 'Login'}*/}
                            {/*        </Link>*/}
                            {/*        <Link to={`/${language}/register`}*/}
                            {/*              className="nav-link text-primary w-100 text-center my-auto"*/}
                            {/*              onClick={() => setMenuOpen(false)}>*/}
                            {/*            <img src={registerIcn} alt="About" style={{width: '50px', height: '50px'}}*/}
                            {/*            />*/}
                            {/*            {language === 'pl' ? 'Zarejestruj się' : 'Register'}*/}
                            {/*        </Link>*/}
                            {/*    </>*/}
                            {/*) : (*/}
                            {/*    <Button variant="danger" className="w-100 text-center my-auto" onClick={() => {*/}
                            {/*        logout();*/}
                            {/*        setMenuOpen(false);*/}
                            {/*    }}>*/}
                            {/*        <img src={logoutIcn} alt="About" style={{width: '50px', height: '50px'}}*/}
                            {/*        />*/}
                            {/*        {language === 'pl' ? 'Wyloguj się' : 'Logout'}*/}
                            {/*    </Button>*/}
                            {/*)}*/}
                            <div className="text-center">
                                <Button
                                    variant="link"
                                    onClick={() => {
                                        toggleLanguage();
                                        setMenuOpen(false);
                                    }}
                                    className="  p-2 border-0 bg-transparent my-auto"
                                    style={{boxShadow: 'none'}}
                                    title="Toggle language"
                                >
                                    <div style={{position: 'relative', width: '60px', height: '60px'}}>
                                        {/* Small white circle behind */}
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                width: '20px',  // smaller than image
                                                height: '20px',
                                                backgroundColor: '#fff8cc',
                                                borderRadius: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                zIndex: 0,
                                            }}
                                        ></div>

                                        {/* Language icon on top */}
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

export default NavbarAnimated;
