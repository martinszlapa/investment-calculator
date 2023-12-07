import React, {useEffect} from 'react';
import Chart from "../Chart/Chart";
import StockSelect from "../StockSelect/StockSelect";
import {Col, Row} from "react-bootstrap";
import data from '../data/JSON/stocks.json';
import DateSelect from "../DateSelect/DateSelect";
import GetJson from "../data/GetJson";

const Home = () => {

    const [selectedStock, setSelectedStock] = React.useState(data.stocks[0]);
    const [selectedDate, setSelectedDate] = React.useState("2021-01-04");

    const [json, setJson] = React.useState([
        {
            "Date": "2004-08-19",
            "Open": "2.490664",
            "High": "2.591785",
            "Low": "2.390042",
            "Close": "2.499133",
            "Adj Close": "2.499133",
            "Volume": "897427216"
        },
        {
            "Date": "2004-08-20",
            "Open": "2.515820",
            "High": "2.716817",
            "Low": "2.503118",
            "Close": "2.697639",
            "Adj Close": "2.697639",
            "Volume": "458857488"
        },
        ]
    );

    useEffect(() => {
        const GetJsonOnStockUpdate = async () => {
            console.log("getting json for", selectedStock);
            const json = await GetJson(selectedStock);
            console.log("json", json);
            setJson(json)
        }
        GetJsonOnStockUpdate().then(r => console.log("JSON Updated"));
    }, [selectedStock]);

    function handleStockSelect(stock) {
        setSelectedStock(stock);
    }

    function handleDateSelect(date) {
        setSelectedDate(date);
    }

    return (
        <div>
            <h1>Home</h1>
            <Row>
                <Col>
                    <StockSelect onStockSelect={handleStockSelect}/>
                    <DateSelect
                        onDateSelect={handleDateSelect}
                        dateArray={json.map((item) => item.Date)}
                    />
                </Col>
                <Col xs={12} md={12} lg={12} xl={12}>
                    <Chart stockJson={json} stockName={selectedStock.name}/>
                </Col>
            </Row>
        </div>
    );
}

export default Home;