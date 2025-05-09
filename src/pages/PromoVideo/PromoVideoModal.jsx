import {FiX} from 'react-icons/fi'; // Feather close icon


const PromoVideoModal = ({isOpen, onClose, videoSrc}) => {
    if (!isOpen) return null;

    return (
        <div className="promo-modal-overlay">
            <div className="promo-modal-content">
                <button className="promo-close-button" onClick={onClose}>
                    <FiX size={20}/>
                </button>
                <video
                    preload="none"
                    className="promo-video"
                    src={videoSrc}
                    controls
                    controlsList="nodownload nofullscreen"
                    autoPlay
                    playsInline
                    onContextMenu={(e) => e.preventDefault()}
                    onEnded={() => setTimeout(onClose, 500)}
                />
            </div>
        </div>
    );
};

export default PromoVideoModal;
