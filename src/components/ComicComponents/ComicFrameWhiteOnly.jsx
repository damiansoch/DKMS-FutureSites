const ComicFrameWhiteOnly = ({children}) => {
    return (
        <div className="comic-frame-wrapper">
            {children}
            <svg
                className="comic-frame-svg"
                viewBox="0 0 400 400"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
            >
                {/* Just a white border */}
                <rect
                    x="0"
                    y="0"
                    width="400"
                    height="400"
                    fill="none"
                    stroke="white"
                    strokeWidth="20"
                />
            </svg>
        </div>
    );
};

export default ComicFrameWhiteOnly;
