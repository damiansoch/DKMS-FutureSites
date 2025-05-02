import ComicFrame from "./ComicFrame.jsx";
import {Col, Row} from "react-bootstrap";

import bg2 from "../../assets/Comic/PagesPC/Page1.png";


const Page1 = () => {

    return (
        <ComicFrame>
            <div style={{height: "100%", maxWidth: "100%", marginLeft: "15px", marginRight: "15px"}}>
                <Row className="h-100">

                    <Col style={{
                        backgroundImage: `url(${bg2})`,
                        backgroundSize: '100% 100%',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        position: "relative",
                    }} className="bg-success border border-white border-4">

                    </Col>
                    <div className={` text-end`} style={{
                        position: 'absolute',
                        top: "10px",
                        right: "30px",
                        color: '#fff9df',
                        textShadow: '2px 2px 2px #000',
                        // maxWidth: !isMobile ? "35%" : "100%"

                    }}>
                        <h1 style={{fontSize: '3rem', margin: 0, letterSpacing: 2}}>Welcome to the
                            Wasteland</h1>
                        <p style={{fontSize: '2rem', margin: 0, letterSpacing: 1.5}}>...where we
                            build
                            sites after the digital collapse.</p>
                    </div>
                </Row>

            </div>
        </ComicFrame>

    );
}
export default Page1