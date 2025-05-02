import {useState, useRef} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {motion, AnimatePresence} from 'framer-motion';
import {useGesture} from '@use-gesture/react';
import Page1 from '../../components/ComicComponents/Page1.jsx';
import Page2 from '../../components/ComicComponents/Page2.jsx';
import Page3 from "../../components/ComicComponents/Page3.jsx";
import Page4 from "../../components/ComicComponents/Page4.jsx";
import Page5 from "../../components/ComicComponents/Page5.jsx";
import Page6 from "../../components/ComicComponents/Page6.jsx";
import Page7 from "../../components/ComicComponents/Page7.jsx";
import Page8 from "../../components/ComicComponents/Page8.jsx";

const pageFlipVariants = {
    initial: (direction) => ({
        rotateY: direction > 0 ? 60 : -60,
        opacity: 0,
        scale: 0.95,
        x: direction > 0 ? 150 : -150,
    }),
    animate: {
        rotateY: 0,
        opacity: 1,
        scale: 1,
        x: 0,
        transition: {duration: 0.6, ease: 'easeInOut'},
    },
    exit: (direction) => ({
        rotateY: direction > 0 ? -60 : 60,
        opacity: 0,
        scale: 0.95,
        x: direction > 0 ? -150 : 150,
        transition: {duration: 0.6, ease: 'easeInOut'},
    }),
};

const HomeComic = () => {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const maxIndex = 7;
    const containerRef = useRef(null);
    const audioRef = useRef(new Audio('/sounds/page-flip.mp3'));

    const playSound = () => {
        const sound = audioRef.current;
        sound.currentTime = 0;
        sound.play().catch(() => {
        });
    };

    const handleNext = () => {
        if (index < maxIndex) {
            setDirection(1);
            setIndex((prev) => prev + 1);
            playSound();
        }
    };

    const handleBack = () => {
        if (index > 0) {
            setDirection(-1);
            setIndex((prev) => prev - 1);
            playSound();
        }
    };

    // Swipe support
    useGesture(
        {
            onDragEnd: ({swipe: [swipeX]}) => {
                if (swipeX === -1) handleNext();
                if (swipeX === 1) handleBack();
            },
        },
        {
            target: containerRef,
            eventOptions: {passive: false},
            drag: {threshold: 30, axis: 'x'},
        }
    );

    return (
        <div ref={containerRef} className="comic-carousel-wrapper">
            <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                    key={index}
                    custom={direction}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageFlipVariants}
                    className="comic-page"
                    style={{perspective: 1200, fontFamily: "Bangers"}}
                >
                    {index === 0 ? <Page1/> : index === 1 ? <Page2/> : index === 2 ? <Page3/> : index === 3 ?
                        <Page4/> : index === 4 ?
                            <Page5/> : index === 5 ?
                                <Page6/> : index === 6 ?
                                    <Page7/> : index === 7 ?
                                        <Page8/> : null}
                </motion.div>
            </AnimatePresence>

            <Container fluid className="comic-nav-container">
                <Row>
                    <Col xs={6} className="text-start">
                        <button
                            onClick={handleBack}
                            disabled={index === 0}
                            className="comic-btn mx-1"
                        >
                            ◀ Back
                        </button>
                    </Col>
                    <Col xs={6} className="text-end">
                        <button
                            onClick={handleNext}
                            disabled={index === maxIndex}
                            className="comic-btn ms-auto mx-1"
                        >
                            Continue ▶
                        </button>
                    </Col>
                </Row>
            </Container>
            <p className="comic-page-indicator">
                Page {index + 1} of {maxIndex + 1}
            </p>
        </div>
    );
};

export default HomeComic;
