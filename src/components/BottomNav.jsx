import {Link, useLocation} from 'react-router-dom';
import homeIcon from '../assets/icons/home_icn.png';
import progressIcon from '../assets/icons/processIcn.png';
import offerIcon from '../assets/icons/OfferIcn.png';
import aboutIcon from '../assets/icons/aboutIcn.png';
import contactIcon from '../assets/icons/contact.png';

import plFlag from '../assets/icons/plFlag.png';
import gbFlag from '../assets/icons/gbFlag.png';

import {useLanguage} from '../context/LanguageContext';
import {useUI} from '../Context/UIContext';

const BottomNav = () => {
    const location = useLocation();
    const {language: currentLanguage, toggleLanguage} = useLanguage();
    const {hideBottomNav} = useUI();

    const navItems = [
        {path: `/${currentLanguage}/home`, icon: homeIcon, label: currentLanguage === 'pl' ? 'Start' : 'Home'},
        {
            path: `/${currentLanguage}/process`,
            icon: progressIcon,
            label: currentLanguage === 'pl' ? 'Proces' : 'Process'
        },
        {path: `/${currentLanguage}/offer`, icon: offerIcon, label: currentLanguage === 'pl' ? 'Oferta' : 'Offer'},
        {
            path: `/${currentLanguage}/contact`,
            icon: contactIcon,
            label: currentLanguage === 'pl' ? 'Kontakt' : 'Contact'
        },
        {path: `/${currentLanguage}/about`, icon: aboutIcon, label: currentLanguage === 'pl' ? 'Bio' : 'About'},
    ];

    return (
        <nav
            className="bottom-nav"
            style={{
                paddingRight: hideBottomNav ? '70px' : '0',
                transition: 'padding 0.3s ease',
            }}
        >
            {navItems.map(({path, icon, label}) => {
                const isActive = location.pathname === path;
                const isContact = path.includes('/contact');

                return (
                    <Link
                        key={path}
                        to={isContact ? path : path}
                        state={isContact ? {from: location.pathname} : undefined}
                        className={`nav-item ${isActive ? 'active' : ''}`}
                    >
                        <img src={icon} alt={label} className="nav-icon"/>
                        <span className="nav-label">{label}</span>
                    </Link>
                );
            })}

            <div className="separator"/>

            <button
                onClick={toggleLanguage}
                className="nav-item border-0 bg-transparent"
                title="Toggle language"
            >
                <div style={{position: 'relative'}}>
                    <img
                        src={currentLanguage === 'en' ? plFlag : gbFlag}
                        alt="Toggle language"
                        className="nav-icon"
                        style={{
                            width: '70px',
                            height: '70px',
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "20px",
                            height: "20px",
                            background: "white",
                            zIndex: -1,
                            borderRadius: "50%"
                        }}
                    />
                </div>
            </button>
        </nav>
    );
};

export default BottomNav;
