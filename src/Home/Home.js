import React, {useEffect} from 'react';
import Chart from "../Chart/Chart";
import StockSelect from "../StockSelect/StockSelect";
import {Col, Row} from "react-bootstrap";
import data from '../data/JSON/stocks.json';
import DateSelect from "../DateSelect/DateSelect";
import InvestmentSelect from "../InvestmentSelect/InvestmentSelect";
import GetJson from "../data/GetJson";

const Home = () => {

    const [selectedStock, setSelectedStock] = React.useState(data.stocks[0]);
    const [selectedDate, setSelectedDate] = React.useState("2004-08-19");
    const [selectedInvestment, setSelectedInvestment] = React.useState(1000);

    const [reinvest, setReinvest] = React.useState(false);

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

    const GetJsonOnStockUpdate = async () => {
        console.log("getting json for", selectedStock);
        const json = await GetJson(selectedStock);
        console.log("json: ", json);
        setJson(json)
    }
    function handleStockSelect(stock) {
        console.log("stock selected: ", stock);
        setSelectedStock(stock);
        GetJsonOnStockUpdate().then(r => console.log("JSON Updated"));
    }

    function handleDateSelect(date) {
        console.log("date selected: ", date);
        setSelectedDate(date);
    }

    function handleInvestmentSelect(investment) {
        console.log("investment selected: ", investment);
        setSelectedInvestment(investment);
    }

    function handleReinvestSelect(reinvest) {
        console.log("reinvest selected: ", reinvest);
        setReinvest(reinvest==="on");
    }

    return (
        <div>
            <h1>Home</h1>
            <Row>
                <Col>
                    Stock
                    <StockSelect onStockSelect={handleStockSelect}/>
                    Initial Investment Date
                    <DateSelect
                        onDateSelect={handleDateSelect}
                        dateArray={json.map((item) => item.Date)}
                    />
                    Invested Amount CAD
                    <InvestmentSelect
                        onInvestmentSelect={handleInvestmentSelect}
                        onReinvestSelect={handleReinvestSelect}
                    />
                </Col>
                <Col xs={12} md={12} lg={12} xl={12}>
                    <Chart
                        stockJson={json}
                        stockName={selectedStock.name}
                        selectedDate={selectedDate}
                        selectedInvestment={selectedInvestment}
                        reinvest={reinvest}
                    />
                </Col>
            </Row>
        </div>
    );
}

export default Home;