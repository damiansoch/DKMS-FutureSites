import React, {useEffect, useState} from 'react';
import {useLanguage} from "../../Context/LanguageContext.jsx";
import ComicFrame from "./ComicFrame.jsx";
import ComicCloud from "./ComicCloud.jsx";
import {Col, Row} from "react-bootstrap";

import bg1 from "../../assets/Comic/PagesPC/Page5_1.png"
import bg2 from "../../assets/Comic/PagesPC/Page5_2.png"


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
                <Row className="h-100">
                    <Col style={{
                        backgroundImage: `url(${bg1})`,
                        backgroundSize: '100% 100%',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        position: "relative"
                    }}
                         className=" col-6 bg-white border border-white border-4">
                        <ComicCloud

                            fontSize={14}
                            padding={12}
                            top="2%"
                            right="2%"
                            text={
                                language === "pl"
                                    ? `**Zoptymalizowana Wydajność**  \nPotrzebna szybkość? Kompresuję obrazy, dzielę kod i ładuję tylko to, co trzeba —  \naby strona działała płynnie i przyciągała użytkowników.`
                                    : `**Optimized Performance**  \nNeed speed? I optimize images, split code, and load only what’s needed —  \nso your site runs fast, smooth, and keeps users hooked.`
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
                            fontSize={14}
                            padding={8}
                            top="75%"
                            left="5%"
                            text={
                                language === "pl"
                                    ? `**Optymalizacja SEO**  \nTworzę przejrzyste adresy, meta tagi i uporządkowaną strukturę — aby Twoja strona lepiej się pozycjonowała i trafiała do właściwych odbiorców.`
                                    : `**Search Engine Optimization (SEO)**  \nI set up clean URLs, meta tags, and structured content — so your site ranks better and gets found by the right people.`
                            }
                        />
                    </Col>
                </Row>

            </div>
        </ComicFrame>

    );
};

export default Page4;
