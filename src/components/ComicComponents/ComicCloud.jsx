import React, {useRef, useLayoutEffect, useState, useEffect} from "react";
import {marked} from "marked";


const ComicCloud = ({
                        text,
                        top = null,
                        left = null,
                        right = null,
                        bottom = null,
                        fontSize = 16,
                        padding = 20,
                        isZoomed, setIsZoomed,
                        hide = false
                    }) => {
    const maxWidth = 240;
    const [contentHeight, setContentHeight] = useState(100);
    const contentRef = useRef(null);
    const html = marked.parse(text);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    useLayoutEffect(() => {
        if (contentRef.current) {
            const height = contentRef.current.offsetHeight;
            setContentHeight(height + padding * 2);
        }
    }, [html, fontSize, padding]);

    const getTransformOrigin = () => {
        const originX = left != null ? "left" : right != null ? "right" : "center";
        const originY = top != null ? "top" : bottom != null ? "bottom" : "center";
        return `${originX} ${originY}`;
    };

    const handleClick = (e) => {
        // Prevent zoom toggle if the click was on the magnifier button
        if (e.target.closest(".magnifier-btn")) return;

        if (isZoomed) {
            setIsZoomed(false);
        }
    };
    const getSafeScale = () => {
        const baseWidth = maxWidth + padding * 2;
        const screenWidth = window.innerWidth;
        const maxScale = 1.4;

        if (baseWidth * maxScale > screenWidth - 40) {
            return (screenWidth - 40) / baseWidth; // 20px padding on each side
        }
        return maxScale;
    };

    return (
        <div
            onClick={handleClick}
            onTouchStart={handleClick}
            style={{
                position: "absolute",
                top,
                left,
                right,
                bottom,
                pointerEvents: "auto",
                maxWidth: maxWidth + padding * 2,
                transform: isZoomed ? `scale(${getSafeScale()})` : "scale(1)",
                transformOrigin: getTransformOrigin(),
                transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                zIndex: isZoomed ? 9999 : 1,
                display: hide ? "none" : "block",

            }}
        >
            <div style={{position: "relative", width: "100%", height: contentHeight}}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height={contentHeight}
                    viewBox={`0 0 ${maxWidth + padding * 2} ${contentHeight}`}
                    preserveAspectRatio="xMinYMin meet"
                >
                    <rect
                        x="0"
                        y="0"
                        width={maxWidth + padding * 2}
                        height={contentHeight}
                        rx="30"
                        ry="30"
                        fill="white"
                        stroke="black"
                        strokeWidth="4"
                    />
                    <foreignObject
                        x={padding}
                        y={padding}
                        width={maxWidth}
                        height={contentHeight - padding * 2}
                    >
                        <div
                            ref={contentRef}
                            xmlns="http://www.w3.org/1999/xhtml"
                            style={{
                                fontFamily: "'Patrick Hand', cursive",
                                fontWeight: 400,
                                fontStyle: "normal",
                                fontSize: `${fontSize}px`,
                                lineHeight: 1.4,
                                color: "black",
                                boxSizing: "border-box",
                                wordWrap: "break-word",
                                textAlign: "center",

                            }}
                            dangerouslySetInnerHTML={{__html: html}}
                        />
                    </foreignObject>
                </svg>

                {/* Magnifier Icon Button (shown only when not zoomed in) */}
                {(!isZoomed && isMobile) && (
                    <button
                        className="magnifier-btn"

                        onClick={(e) => {
                            e.stopPropagation(); // prevent triggering shrink
                            if (!isZoomed) {
                                setIsZoomed(true);
                            }
                        }}
                        style={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            background: "rgba(0,0,0,0)",
                            color: "white",
                            border: "none",
                            borderRadius: "50%",
                            width: 30,
                            height: 30,
                            fontSize: 14,
                            cursor: "pointer",
                            pointerEvents: isZoomed ? "none" : "auto"
                        }}
                        title="Zoom"
                    >
                        🔍
                    </button>
                )}
            </div>
        </div>
    );
};

export default ComicCloud;
