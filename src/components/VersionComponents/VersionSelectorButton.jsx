import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaPaintBrush } from 'react-icons/fa';
import VersionModal from './VersionModal';

function VersionSelectorButton({ showVideo, setShowVideo }) {
  const [showModal, setShowModal] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleCloseHint = () => {
    if (!dontShowAgain) {
      setShowHint(false);
    } else {
      // Optional: you could store session flag here if needed
      setShowHint(false);
    }
  };

  return (
    <>
      {/* Hint Overlay */}
      {showHint && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 1049,
          }}
        >
          {/* Speech Bubble */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{
              position: 'absolute',
              top: '35%',
              left: '70px', // Ensures full button visibility
              transform: 'translateY(-50%)',
              zIndex: 1051,
              maxWidth: '300px',
            }}
          >
            <svg
              viewBox='0 0 300 200'
              width='100%'
              height='auto'
              style={{ overflow: 'visible' }}
            >
              <path
                d='M10 10 Q0 90 10 180 Q150 200 290 180 Q300 90 290 10 Q150 -10 10 10 Z
                                   M10 130 Q-30 130 10 155'
                fill='#fff8dc'
                stroke='#000'
                strokeWidth='3'
              />
              <foreignObject x='20' y='20' width='260' height='160'>
                <div
                  style={{
                    fontFamily: '"Comic Sans MS", cursive',
                    fontSize: '16px',
                    color: '#000',
                    padding: '4px',
                    textAlign: 'center',
                  }}
                >
                  🎨 Want to try all the cool versions of this page?
                  <br />
                  Click the brush button on the left!
                  {/* <div style={{ marginTop: '10px' }}>
                    <label style={{ fontSize: '13px' }}>
                      <input
                        type='checkbox'
                        checked={dontShowAgain}
                        onChange={(e) => setDontShowAgain(e.target.checked)}
                        style={{ marginRight: '6px' }}
                      />
                      Don't show again
                    </label>
                  </div> */}
                  <br />
                  <button
                    onClick={handleCloseHint}
                    style={{
                      marginTop: '10px',
                      padding: '6px 12px',
                      backgroundColor: '#06172a',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    OK!
                  </button>
                </div>
              </foreignObject>
            </svg>
          </motion.div>
        </div>
      )}

      {/* Button (fully visible) */}
      <motion.button
        onClick={() => setShowModal(true)}
        initial={{ scale: 1, boxShadow: '0 0 8px rgba(0, 255, 100, 0.6)' }}
        animate={{
          scale: [1, 1.05, 1],
          boxShadow: [
            '0 0 8px rgba(0, 255, 100, 0.6)',
            '0 0 14px rgba(0, 255, 100, 0.9)',
            '0 0 8px rgba(0, 255, 100, 0.6)',
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
          left: '10px', // Slightly pushed in for better alignment
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
          opacity: 0.5,
        }}
      >
        <FaPaintBrush size={18} color='yellow' />
      </motion.button>

      {/* Modal */}
      {showModal && (
        <VersionModal
          onClose={() => setShowModal(false)}
          showVideo={showVideo}
          setShowVideo={setShowVideo}
        />
      )}
    </>
  );
}

export default VersionSelectorButton;
