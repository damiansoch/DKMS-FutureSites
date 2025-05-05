import React, {useEffect, useState} from 'react';
import background from '../../assets/Comic/PagesPC/Page2.png';
import backgroundMobile from '../../assets/Comic/HomeBkgMobile.png';

import {useLanguage} from "../../Context/LanguageContext.jsx";

import ComicFrame from "./ComicFrame.jsx";
import ComicCloud from "./ComicCloud.jsx";
import {Col, Row} from "react-bootstrap";
import bg2 from "../../assets/Comic/PagesPC/Page2.png";

const Page2 = () => {
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
                        backgroundImage: `url(${bg2})`,
                        backgroundSize: '100% 100%',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        position: "relative",
                    }} className="bg-black border border-white border-4">

                    </Col>

                    <ComicCloud
                        fontSize={18}
                        padding={28}
                        top="20px"
                        right="10%"
                        text={
                            language === "pl"
                                ? `**Jestem D4M1AN**  \nCyfrowy architekt. Najemnik kodu.  \nTworzę strony z niczego — szybko, precyzyjnie, bez kompromisów.  \nKażdy projekt to misja. Każda strona to historia, która ożywa.`
                                : `**I’m D4M1AN**  \nDigital architect. Code mercenary.  \nI build websites from nothing — fast, sharp, and always on point.  \nEvery project? A mission. Every site? A story brought to life.`
                        }
                    />


                </Row></div>
        </ComicFrame>

    );
}
export default Page2