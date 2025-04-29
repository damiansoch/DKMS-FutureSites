import CardSlider from "../../components/ProcessComponents/CardSlider.jsx";
import SEOHelmet from "../../components/SEO/SEOHelmet.jsx";
import React, {useEffect, useState} from "react";
import ParticlesBackground from "../../components/AboutComponents/ParticlesBackground.jsx";


const Process = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Run on mount
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <div style={{
            marginTop: isMobile ? 0 : "60px",
            marginBottom: isMobile ? "60px" : 0,

        }}>
            <SEOHelmet page="process"/>
            <ParticlesBackground/>
            <CardSlider/>

        </div>
    );
};

export default Process;
