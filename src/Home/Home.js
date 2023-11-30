import React from 'react';
import Chart from "../Chart/Chart";
import StockSelect from "../StockSelect/StockSelect";
import {Col, Row} from "react-bootstrap";
import data from '../data/JSON/stocks.json';

const Home = () => {

    const [selectedStock, setSelectedStock] = React.useState(data.stocks[0]);
    function handleStockSelect(stock) {
        setSelectedStock(stock);
    }

    return (
        <div>
            <h1>Home</h1>
            <Row>
                <Col>
                    <StockSelect onStockSelect={handleStockSelect}/>
                </Col>
                <Col xs={12} md={12} lg={12} xl={12}>
                    <Chart selectedStock = {selectedStock}/>
                </Col>
            </Row>
        </div>
    );
}

export default Home;