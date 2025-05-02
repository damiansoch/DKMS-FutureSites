const ComicFrame = ({children}) => {
    return (
        <div className="comic-frame-wrapper">
            <div style={{position: "relative", zIndex: 2, height: "100%"}}>
                {children}
            </div>
            <svg
                className="comic-frame-svg"
                viewBox="0 0 400 400"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
            >
                <defs>
                    <mask id="cutout-mask">
                        <rect x="0" y="0" width="400" height="400" fill="white"/>
                        <rect x="5" y="5" width="390" height="390" fill="black"/>
                    </mask>
                </defs>
                <rect x="0" y="0" width="400" height="400" fill="none" stroke="black" strokeWidth="12"/>
                <rect x="0" y="0" width="400" height="400" fill="white" mask="url(#cutout-mask)"/>
                <rect x="5" y="5" width="390" height="390" fill="none" stroke="black" strokeWidth="6"/>
            </svg>
        </div>
    );
};
export default ComicFrame;
