import {motion} from 'framer-motion';

import {FaTimes} from 'react-icons/fa';
import {Button} from 'react-bootstrap';
import {useVersion} from "../../Context/VersionContext.jsx";
import {useEffect, useState} from "react";
import {useLanguage} from "../../Context/LanguageContext.jsx";

function VersionModal({onClose, showVideo, setShowVideo}) {
    const {setVersion} = useVersion();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const {language} = useLanguage();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSelect = (newVersion) => {
        setVersion(newVersion);
        onClose();
    };

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                zIndex: 1060,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <motion.div
                initial={{scale: 0.8, opacity: 0}}
                animate={{scale: 1, opacity: 1}}
                exit={{scale: 0.8, opacity: 0}}
                style={{
                    backgroundColor: '#06172a',
                    padding: '30px',
                    borderRadius: '12px',
                    width: '90%',
                    maxWidth: '400px',
                    textAlign: 'center',
                    position: 'relative',
                }}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        fontSize: '24px',
                        cursor: 'pointer',
                    }}
                >
                    <FaTimes/>
                </button>

                <h4 className="mb-4 text-white">Select Page Version</h4>

                <div className="d-flex flex-column gap-3">
                    <Button variant="outline-light" onClick={() => handleSelect('professional')}>
                        Professional
                    </Button>
                    <Button variant="outline-light" onClick={() => handleSelect('animated')}>
                        Animated
                    </Button>
                    {(
                        <Button variant="outline-light" onClick={() => handleSelect('cartoon')}>
                            Cartoon
                        </Button>
                    )
                    }
                    <button className="promo-play-button  w-100" onClick={() => setShowVideo(true)}>
                        <span className="w-100 mx-auto"> Take a Quick Look</span>
                    </button>

                </div>
            </motion.div>
        </div>
    );
}

export default VersionModal;
