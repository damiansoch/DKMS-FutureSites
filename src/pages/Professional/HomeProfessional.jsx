import React, {useEffect, useState} from 'react';
import bannerImageNight from '../../assets/Professional/bannerPictVerNight.png';
import bannerImageDay from '../../assets/Professional/bannerPictVerDay.png';
import ProcessProfessional from "./ProcessProfesional.jsx";
import {useLanguage} from "../../Context/LanguageContext.jsx";
import OfferProfessional from "./OfferProfessional.jsx";
import ContactProfessional from "./ContactProfessional.jsx";


const HomeProfessional = () => {
    const {language} = useLanguage();
    const bannerImg = language === 'pl' ? bannerImageNight : bannerImageDay;
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div id='start' style={{
            fontFamily: "'Open Sans', sans-serif",
            background: 'rgba(255, 245, 239, 0.2)', // subtle peach tint
            backdropFilter: 'blur(2px)',
        }}>
            <div
                className="mt-5 mb-2 mx-auto   position-relative overflow-hidden"
                style={{
                    aspectRatio: !isMobile ? "16/8" : "3/2",
                    backgroundImage: `url(${bannerImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: isMobile ? "75%" : "50%",
                }}
            >
                {/* Fade overlay */}
                <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                        background: `
                            linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 2%, rgba(255,255,255,0) 98%, rgba(255,255,255,1) 100%),
                            linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 5%, rgba(255,255,255,0) 95%, rgba(255,255,255,1) 100%)
                        `,
                        backgroundBlendMode: 'multiply', // blend both gradients together
                        zIndex: 2,
                        pointerEvents: 'none',
                    }}
                />
            </div>

            <ProcessProfessional/>
            <OfferProfessional/>
            <ContactProfessional/>
        </div>
    );
};

export default HomeProfessional;
