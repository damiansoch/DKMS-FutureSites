import {motion} from 'framer-motion';

import {FaTimes} from 'react-icons/fa';
import {Button} from 'react-bootstrap';
import {useVersion} from "../../Context/VersionContext.jsx";

function VersionModal({onClose}) {
    const {setVersion} = useVersion();

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
                    <Button variant="outline-light" onClick={() => handleSelect('cartoon')}>
                        Cartoon
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}

export default VersionModal;
