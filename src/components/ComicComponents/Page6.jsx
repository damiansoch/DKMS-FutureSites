import React, {useEffect, useState} from 'react';
import {useLanguage} from "../../Context/LanguageContext.jsx";
import ComicFrame from "./ComicFrame.jsx";
import ComicCloud from "./ComicCloud.jsx";
import {Col, Row} from "react-bootstrap";

import bg1 from "../../assets/Comic/PagesPC/Page6_1.png"
import bg2 from "../../assets/Comic/PagesPC/Page6_2.png"
import bg3 from "../../assets/Comic/PagesPC/Page6_3.png"
import bg4 from "../../assets/Comic/PagesPC/Page6_4.png"

// import bg1 from "../../assets/Comic/PagesPC/Page4_1_done.png"


const Page4 = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const {language} = useLanguage();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <ComicFrame>
            <div style={{height: "100%", maxWidth: "100%", marginLeft: "15px", marginRight: "15px"}}>
                <Row className="h-50">
                    <Col style={{
                        backgroundImage: `url(${bg1})`,
                        backgroundSize: '100% 100%',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        position: "relative"
                    }}
                         className=" col-6 bg-white border border-white border-4">
                        <ComicCloud
                            fontSize={12}
                            padding={8}
                            top="73%"
                            left="20%"
                            text={
                                language === "pl"
                                    ? `**CMS lub Panel Administracyjny**  \nChcesz mieć kontrolę? Dodam CMS lub panel admina — byś mógł samodzielnie edytować treści, bez znajomości kodu.`
                                    : `**CMS or Admin Dashboard**  \nNeed control? I can add a CMS or admin panel — so you can update content yourself, no tech skills needed.`
                            }

                        />
                    </Col>
                    <Col style={{
                        backgroundImage: `url(${bg2})`,
                        backgroundSize: '100% 100%',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        position: "relative",
                    }} className="bg-success border border-white border-4">
                        <ComicCloud
                            fontSize={12}
                            padding={8}
                            top="72%"
                            left="30%"
                            text={
                                language === "pl"
                                    ? `**Integracje z Zewnętrznymi Narzędziami**  \nRezerwacje, płatności, czat czy analityka?  \nIntegruję narzędzia dopasowane do Twoich potrzeb — od CRM-ów po indywidualne rozwiązania.`
                                    : `**3rd Party Integrations**  \nNeed bookings, payments, chat, or analytics?  \nI integrate tools that match your business — from CRMs to custom systems we choose together.`
                            }

                        />
                    </Col>
                </Row>
                <Row className="h-50">
                    <Col style={{
                        backgroundImage: `url(${bg3})`,
                        backgroundSize: '100% 100%',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        position: "relative",
                    }} className="col-7 bg-warning border border-white border-4">
                        <ComicCloud
                            fontSize={12}
                            padding={8}
                            top="68%"
                            right="1%"
                            text={
                                language === "pl"
                                    ? `**Bezpieczeństwo i Zgodność**  \nOd HTTPS po RODO — tworzę z myślą o ochronie i prywatności.  \nBezpieczne logowanie, przetwarzanie danych i zgodność z wymaganiami.`
                                    : `**Security & Compliance**  \nFrom HTTPS to GDPR — I build with privacy and protection in mind.  \nSecure logins, data handling, and compliance tailored to your site.`
                            }
                        />
                    </Col>
                    <Col style={{
                        backgroundImage: `url(${bg4})`,
                        backgroundSize: '100% 100%',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        position: "relative",
                    }}
                         className="bg-danger border border-white border-4">
                        <ComicCloud
                            fontSize={12}
                            padding={8}
                            top="-1%"
                            right="2%"
                            text={
                                language === "pl"
                                    ? `**Wsparcie i Utrzymanie**  \nPotrzebujesz pomocy po uruchomieniu? Żaden problem — kopie zapasowe, aktualizacje, optymalizacja i drobne poprawki.  \nW pełni elastyczne, według Twoich potrzeb.`
                                    : `**Ongoing Support**  \nNeed help after launch? I’ve got your back — backups, updates, performance tweaks, and small improvements.  \nFlexible and fully up to you.`
                            }


                        />
                    </Col>
                </Row>
            </div>
        </ComicFrame>

    );
};

export default Page4;
