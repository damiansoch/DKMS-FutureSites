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
                    }} className="bg-success border border-white border-4">

                    </Col>

                    <ComicCloud
                        top="20px"
                        right="10%"
                        text={
                            language === "pl"
                                ? `**Nazywam się Damian**  \ntworzę strony z niczego,  
jak cyfrowy architekt buduję od pomysłu do pikseli.  
Każdy projekt to nowa misja — czysta karta, która zaraz ożyje!`
                                : `**I'm Damian**  \nI create websites out of thin air,  
like a digital architect turning ideas into pixels.  
Every project is a new mission — a blank page ready to come alive!`
                        }
                    />


                </Row></div>
        </ComicFrame>

    );
}
export default Page2