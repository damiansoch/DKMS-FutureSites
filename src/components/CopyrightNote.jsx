import {useVersion} from "../Context/VersionContext.jsx"
import {useEffect, useState} from "react";

function CopyrightNote() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const {version} = useVersion();
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <div className="copyright-note"
             style={version === "cartoon" ? !isMobile ? {
                 bottom: "10px",
                 right: "10px"
             } : {
                 bottom: "15px",
                 right: "25px"
             } : version === "professional" ? {bottom: "10px", right: "10px"} : isMobile ? {
                 bottom: "60px",
                 right: "10px"
             } : {bottom: "10px", right: "60px"}}>
            © {new Date().getFullYear()} DKMS FutureSites
        </div>
    );
}

export default CopyrightNote;