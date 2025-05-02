import React, {useEffect, useState} from 'react';
import background from '../../assets/Comic/PagesPC/Page3.png';


import {useLanguage} from "../../Context/LanguageContext.jsx";

import ComicFrame from "./ComicFrame.jsx";
import ComicCloud from "./ComicCloud.jsx";
import {Col, Row} from "react-bootstrap";

const Page3 = () => {
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
                        backgroundImage: `url(${background})`,
                        backgroundSize: '100% 100%',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        position: "relative",
                    }} className="bg-black border border-white border-4">

                    </Col>
                    <ComicCloud
                        top={isMobile ? "20px" : "5%"}
                        right={isMobile ? "20px" : "55%"}
                        text={
                            language === "pl"
                                ? `**Zaczynamy podróż**  \nKażda dobra strona zaczyna się od pomysłu —  \na ja zamieniam go w coś konkretnego, szybkiego i przyjaznego.  \nOd struktury po styl — każdy element tworzę z myślą o funkcjonalności i estetyce.`
                                : `**Let’s begin the journey**  \nEvery great website starts with an idea —  \nand I turn that idea into something real, fast, and user-friendly.  \nFrom structure to style, I shape every part with purpose and precision.`
                        }

                    />
                </Row></div>
        </ComicFrame>

    );
}
export default Page3