import React, {useEffect, useState} from "react";
import {useNavigation} from "react-router-dom";


import {Container} from "react-bootstrap";
import {AnimatePresence, motion} from "framer-motion";
import {useSwipeable} from "react-swipeable";
import ComicCloud from "../../../components/ComicComponents/ComicCloud.jsx";
import {useLanguage} from "../../../Context/LanguageContext.jsx";
import {comicTexts} from "../../../components/ComicComponents/Mobile/MobileData.jsx";

import Page1Img from "../../../assets/Comic/PagesMobile/Page1.png";
import Page2Img from "../../../assets/Comic/PagesMobile/Page2.png";
import Page3Img from "../../../assets/Comic/PagesMobile/Page3.png";
import Page4Img from "../../../assets/Comic/PagesMobile/Page4.png";
import Page5Img from "../../../assets/Comic/PagesMobile/Page5.png";
import Page6Img from "../../../assets/Comic/PagesMobile/Page6.png";
import Page7Img from "../../../assets/Comic/PagesMobile/Page7.png";
import Page8Img from "../../../assets/Comic/PagesMobile/Page8.png";
import Page9Img from "../../../assets/Comic/PagesMobile/Page9.png";
import Page10Img from "../../../assets/Comic/PagesMobile/Page10.png";
import Page11Img from "../../../assets/Comic/PagesMobile/Page11.png";
import Page12Img from "../../../assets/Comic/PagesMobile/Page12.png";
import Page13Img from "../../../assets/Comic/PagesMobile/Page13.png";
import Page14Img from "../../../assets/Comic/PagesMobile/Page14.png";

import InitiateButton from "../../../assets/Comic/PagesMobile/ButtonInitiate.png";
import {useNavigate} from "react-router-dom";


const slides = [Page1Img, Page2Img, Page3Img, Page4Img, Page5Img, Page6Img, Page7Img, Page8Img, Page9Img, Page10Img, Page11Img, Page12Img, Page13Img, Page14Img]


export default function MobileComicStack() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [previousSlide, setPreviousSlide] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(null);
    const [nextSlide, setNextSlide] = useState(null);
    const [isPreviousSlideVisible, setIsPreviousSlideVisible] = useState(false);
    const [isCurrentSlideVisible, setIsCurrentSlideVisible] = useState(false);
    const [isNextSlideVisible, setIsNextSlideVisible] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);

    const {language} = useLanguage();
    const navigate = useNavigate()

    useEffect(() => {
        // Step 1: Hide all slides
        setIsPreviousSlideVisible(false);
        setIsCurrentSlideVisible(false);
        setIsNextSlideVisible(false);

        // Step 2: Update the slides
        setPreviousSlide(currentIndex > 0 ? slides[currentIndex - 1] : null);
        setNextSlide(currentIndex < slides.length - 1 ? slides[currentIndex + 1] : null);
        setCurrentSlide(slides[currentIndex]);

        // Step 3: Show slides again after a short delay (e.g., 100ms)
        const timeoutPrev = setTimeout(() => {
            setIsPreviousSlideVisible(true);


        }, 600);
        const timeoutCurrent = setTimeout(() => {

            setIsCurrentSlideVisible(true);

        }, 100);
        const timeoutNext = setTimeout(() => {

            setIsNextSlideVisible(true);
        }, 600);

        // Cleanup to avoid memory leaks if the component unmounts
        return () => {
            clearTimeout(timeoutPrev)
            clearTimeout(timeoutCurrent)
            clearTimeout(timeoutNext)

        };

    }, [currentIndex]);


    const swipeHandlers = useSwipeable({
        onSwipedUp: () => {
            if (currentIndex < slides.length - 1) {

                setCurrentIndex(i => i + 1);
            }
        },
        onSwipedDown: () => {
            if (currentIndex > 0) {

                setCurrentIndex(i => i - 1);
            }
        },
        preventScrollOnSwipe: true,
        trackTouch: true,
    });

    return (

        <Container
            {...swipeHandlers}
            fluid
            className="bg-dark p-0 overflow-hidden"
            style={{
                marginTop: "70px",
                height: "calc(100dvh - 70px)",
            }}
        >
            <div className="row h-100 p-1" style={{position: "relative"}}>

                {/* CURRENT SLIDE */}
                <AnimatePresence mode="wait">
                    {isCurrentSlideVisible && currentSlide && (
                        <motion.div
                            key={`current-${currentIndex}`}
                            initial={{opacity: 0, scale: 0.95}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 0.95}}
                            transition={{duration: 0.3}}
                            className="col-11 mx-auto border border-5 border-white h-100"
                            style={{
                                position: "relative",
                                zIndex: 2,
                                backgroundImage: `url(${slides[currentIndex]})`,
                                backgroundSize: "100% 100%",
                                backgroundPosition: "center"
                            }}
                        >
                            {comicTexts[currentIndex] && (<ComicCloud
                                {...comicTexts[currentIndex].style}
                                text={comicTexts[currentIndex]?.[language] || ""}
                                isZoomed={isZoomed}
                                setIsZoomed={setIsZoomed}
                            />)}
                        </motion.div>
                    )}
                </AnimatePresence>


                {!isZoomed && (
                    <>
                        {/*PREVIOUS SLIDE */}
                        <AnimatePresence>
                            {isPreviousSlideVisible && previousSlide && (
                                <motion.div
                                    key={`prev-${currentIndex - 1}`}
                                    initial={{opacity: 0, scale: 0.8, x: 30}}
                                    animate={{opacity: 1, scale: 1, x: 0}}
                                    exit={{opacity: 0, scale: 0.8, x: 30}}
                                    transition={{duration: 0.3}}
                                    className="bg-info border border-1 border-white "
                                    style={{
                                        position: "absolute",
                                        top: "40px",
                                        right: "40px",
                                        width: "40px",
                                        aspectRatio: "9 / 19.5",
                                        zIndex: 3,
                                        backgroundImage: `url(${slides[currentIndex - 1]})`,
                                        backgroundSize: "100% 100%",
                                        backgroundPosition: "center",
                                        boxShadow: "-2px 2px 5px #fff",
                                    }}
                                    onClick={() => setCurrentIndex(currentIndex - 1)}
                                >
                                    {comicTexts[currentIndex - 1]?.style && (<ComicCloud
                                        {...comicTexts[currentIndex - 1].style}
                                        text={comicTexts[currentIndex - 1]?.[language] || ""}
                                        hide={true}
                                    />)}

                                </motion.div>
                            )}
                        </AnimatePresence>

                        // NEXT SLIDE
                        <AnimatePresence>
                            {isNextSlideVisible && nextSlide && (
                                <motion.div
                                    key={`next-${currentIndex + 1}`}
                                    initial={{opacity: 0, scale: 0.8, x: 30}}
                                    animate={{opacity: 1, scale: 1, x: 0}}
                                    exit={{opacity: 0, scale: 0.8, x: 30}}
                                    transition={{duration: 0.3}}
                                    className="bg-success border border-1 border-white"
                                    style={{
                                        position: "absolute",
                                        bottom: "40px",
                                        right: "40px",
                                        width: "40px",
                                        aspectRatio: "9 / 19.5",
                                        zIndex: 3,
                                        backgroundImage: `url(${slides[currentIndex + 1]})`,
                                        backgroundSize: "100% 100%",
                                        backgroundPosition: "center",
                                        boxShadow: "-2px -2px 5px #fff",
                                    }}
                                    onClick={() => setCurrentIndex(currentIndex + 1)}
                                >
                                    {comicTexts[currentIndex + 1] && (<ComicCloud
                                        {...comicTexts[currentIndex + 1].style}
                                        text={comicTexts[currentIndex + 1]?.[language] || ""}
                                        hide={true}
                                    />)}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </>
                )}


                {currentIndex === slides.length - 1 && (
                    <AnimatePresence>
                        <motion.div
                            onClick={() => {
                                navigate(`/${language}/contact`)
                            }}
                            initial={{scale: 1, boxShadow: "0 0 0px rgba(0, 255, 255, 0.5)"}}
                            animate={{
                                scale: [1, 1.05, 1],
                                boxShadow: [
                                    "0 0 0px rgba(0, 255, 255, 0.4)",
                                    "0 0 15px rgba(0, 255, 255, 0.8)",
                                    "0 0 0px rgba(0, 255, 255, 0.4)"
                                ]
                            }}
                            transition={{
                                duration: 1.8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            style={{
                                position: "absolute",
                                top: "55%",
                                left: "40px",
                                width: "120px",
                                height: "50px",
                                backgroundImage: `url(${InitiateButton})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                cursor: "pointer",
                                zIndex: 10,
                                opacity: 0.95,
                                rotate: "10deg",
                                borderRadius: "50px", // optional
                            }}
                            aria-label="Initiate the Mission"
                        />
                    </AnimatePresence>

                )}

            </div>


        </Container>
    );
}
