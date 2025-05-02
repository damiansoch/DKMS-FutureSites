import React, {useEffect, useState} from 'react';
import {useLanguage} from "../../Context/LanguageContext.jsx";
import ComicFrame from "./ComicFrame.jsx";
import ComicCloud from "./ComicCloud.jsx";
import {Col, Row} from "react-bootstrap";

import bg1 from "../../assets/Comic/PagesPC/Page4_1.png"
import bg2 from "../../assets/Comic/PagesPC/Page4_2.png"
import bg3 from "../../assets/Comic/PagesPC/Page4_3.png"
import bg4 from "../../assets/Comic/PagesPC/Page4_4.png"

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
                         className=" col-5 bg-black border border-white border-4">
                        <ComicCloud
                            fontSize={12}
                            padding={8}
                            top="68%"
                            right="1%"
                            text={
                                language === "pl"
                                    ? `**Ustalanie Celów Projektu**  \nZaczynam od zrozumienia Twojej firmy, odbiorców i potrzeb.  \nCzy chodzi o konwersje, widoczność czy automatyzację — razem określamy jasne i przyszłościowe cele.`
                                    : `**Defining Project Goals**  \nI start by understanding your business, audience, and goals.  \nWhether it’s conversions, visibility, or automation — we shape clear, future-ready objectives together.`
                            }

                        />
                    </Col>
                    <Col style={{
                        backgroundImage: `url(${bg2})`,
                        backgroundSize: '100% 100%',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        position: "relative",
                    }} className="bg-black border border-white border-4">
                        <ComicCloud
                            fontSize={12}
                            padding={8}
                            top="68%"
                            left="25%"
                            text={
                                language === "pl"
                                    ? `**Indywidualny Design i Branding**  \nTwoja strona powinna oddawać charakter marki.  \nTworzę układy z Twoimi kolorami, fontami i elementami — od logotypów po ikony, zgodnie z ustaleniami.`
                                    : `**Custom Design & Branding**  \nYour site should reflect your brand’s unique style.  \nI build layouts using your colors, typography, and custom elements — from logos to icons, tailored to your identity.`
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
                    }} className="col-6 bg-black border border-white border-4">
                        <ComicCloud
                            fontSize={12}
                            padding={8}
                            top="70%"
                            right="20%"
                            text={
                                language === "pl"
                                    ? `**Architektura Informacji**  \nPomagam zaplanować układ strony, menu i strukturę.  \nMapuję kluczowe podstrony, jak Start, Oferta, Bio — by całość była czytelna i przyjazna w odbiorze.`
                                    : `**Information Architecture**  \nI help plan your site’s layout, menus, and structure —  \nmapping out key pages like Home, Services, and About - so everything flows clearly and makes sense to users.`
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
                         className="bg-black border border-white border-4">
                        <ComicCloud
                            fontSize={12}
                            padding={8}
                            top="67%"
                            left="2%"
                            text={
                                language === "pl"
                                    ? `**Dostosowanie do Urządzeń Mobilnych**  \nDbam, by Twoja strona działała i wyglądała świetnie wszędzie —  \nna telefonach, tabletach i komputerach —  \ndzięki elastycznym i przemyślanym układom.`
                                    : `**Responsive Development**  \nI make sure your site looks great on every device —  \nfrom phones to tablets to desktops —  \nwith layouts that adapt smoothly and work flawlessly.`
                            }

                        />
                    </Col>
                </Row>
            </div>
        </ComicFrame>

    );
};

export default Page4;
