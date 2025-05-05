import React, {useRef, useLayoutEffect, useState} from "react";
import {marked} from "marked";

const ComicCloud = ({
                        text,
                        top = "0px",
                        left = null,
                        right = null,
                        fontSize = 16,
                        padding = 20
                    }) => {
    const maxWidth = 240;
    const [contentHeight, setContentHeight] = useState(100);
    const contentRef = useRef(null);
    const html = marked.parse(text);

    useLayoutEffect(() => {
        if (contentRef.current) {
            const height = contentRef.current.offsetHeight;
            setContentHeight(height + padding * 2);
        }
    }, [html, fontSize, padding]);

    return (
        <div
            style={{
                position: "absolute",
                top,
                left,
                right,
                pointerEvents: "none",
                maxWidth: maxWidth + padding * 2
            }}
        >
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
                            textAlign: "center"
                        }}
                        dangerouslySetInnerHTML={{__html: html}}
                    />
                </foreignObject>
            </svg>
        </div>
    );
};

export default ComicCloud;
