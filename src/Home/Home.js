import React from 'react';
import Chart from "../Chart/Chart";
import {Col, Row} from "react-bootstrap";

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <Row>
                <Col xs={12} md={12} lg={12} xl={12}>
                    <Chart/>
                </Col>
            </Row>
        </div>
    );
}

export default Home;