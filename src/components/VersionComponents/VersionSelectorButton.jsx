import {useState} from 'react';
import {FaPaintBrush} from 'react-icons/fa';
import VersionModal from './VersionModal';
import {motion} from 'framer-motion';

function VersionSelectorButton() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <motion.button
                onClick={() => setShowModal(true)}
                initial={{scale: 1, boxShadow: '0 0 8px rgba(0, 255, 100, 0.6)'}}
                animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                        '0 0 8px rgba(0, 255, 100, 0.6)',
                        '0 0 14px rgba(0, 255, 100, 0.9)',
                        '0 0 8px rgba(0, 255, 100, 0.6)'
                    ],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'loop',
                }}
                whileHover={{
                    scale: 1.25,
                    backgroundColor: '#06172a',
                    boxShadow: '0 0 18px rgba(0, 255, 100, 1)',
                }}
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '10px',
                    transform: 'translateY(-50%)',
                    zIndex: 1050,
                    backgroundColor: '#06172a',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    cursor: 'pointer',
                }}
            >
                <FaPaintBrush size={18}/>
            </motion.button>

            {showModal && <VersionModal onClose={() => setShowModal(false)}/>}
        </>
    );
}

export default VersionSelectorButton;
