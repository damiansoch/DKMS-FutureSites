import React, {useEffect, useState} from 'react';
import {motion, useMotionValue, useSpring} from 'framer-motion';
import {FiMousePointer} from 'react-icons/fi'; // Custom cursor icon

const CustomCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const [mousePosition, setMousePosition] = useState({x: -100, y: -100});

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [isClicked, setIsClicked] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    // Smooth spring config for the FOLLOWING CIRCLE only
    const springConfig = {damping: 25, stiffness: 150};
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            setMousePosition({x: e.clientX, y: e.clientY}); // Direct for icon
            cursorX.set(e.clientX); // Delayed for circle
            cursorY.set(e.clientY);
        };

        const clickCursor = () => {
            setIsClicked(true);
            setTimeout(() => setIsClicked(false), 200);
        };

        const handleMouseEnter = (e) => {
            if (['A', 'BUTTON', 'INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
                setIsHovering(true);
            }
        };

        const handleMouseLeave = (e) => {
            if (['A', 'BUTTON', 'INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', clickCursor);
        document.addEventListener('mouseover', handleMouseEnter);
        document.addEventListener('mouseout', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', clickCursor);
            document.removeEventListener('mouseover', handleMouseEnter);
            document.removeEventListener('mouseout', handleMouseLeave);
        };
    }, [cursorX, cursorY]);


    if (isMobile) return null; // ⬅️ Don't show CustomCursor on mobile

    return (
        <>
            {/* --- REAL CURSOR ICON --- */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: mousePosition.y,
                    left: mousePosition.x,
                    width: 24,
                    height: 24,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: isClicked ? '#ffffff' : '#ffae00', // White when clicked, Bright orange normally
                    fontSize: isHovering ? '30px' : '26px',
                    pointerEvents: 'none',
                    zIndex: 10000,
                    translateX: '-50%',
                    translateY: '-50%',
                    filter: 'drop-shadow(0 0 6px rgba(255, 174, 0, 0.8))', // Glow to make it brighter
                    transition: 'color 0.2s, font-size 0.2s ease',
                }}
            >
                <FiMousePointer/>
            </motion.div>

            {/* --- FOLLOWING BACKGROUND CIRCLE --- */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    backgroundColor: 'transparent',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                    transition: 'border 0.3s ease',
                }}
            />
        </>
    );
};

export default CustomCursor;
