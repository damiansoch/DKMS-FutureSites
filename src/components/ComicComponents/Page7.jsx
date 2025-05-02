import React, {useEffect, useState} from 'react';

import background from '../../assets/Comic/PagesPC/Page7.png';
import ComicFrame from "./ComicFrame.jsx";
import {Col, Row} from "react-bootstrap";
import bg2 from "../../assets/Comic/PagesPC/Page2.png";
import ComicCloud from "./ComicCloud.jsx";
import {useLanguage} from "../../Context/LanguageContext.jsx";

const Page1 = () => {

    const {language} = useLanguage();


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
                    }} className="bg-success border border-white border-4">

                    </Col>

                    <ComicCloud
                        top="1%"
                        left="29%"
                        text={
                            language === "pl"
                                ? `**Misja Zakończona**  
Kod działa. Strona gotowa.  
Haker-bohater uratował sytuację — internet znów jest bezpieczny.  
Nowy dzień nadchodzi... co dalej?`
                                : `**Mission Complete**  
The code is clean. The site is live.  
The hacker-hero delivered — and the web is a better place.  
A new day begins... what's next?`
                        }
                    />


                </Row></div>
        </ComicFrame>

    );
}
export default Page1