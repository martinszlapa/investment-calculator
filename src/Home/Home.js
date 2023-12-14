import React from 'react';
import Chart from "../Chart/Chart";
import StockSelect from "../StockSelect/StockSelect";
import {Col} from "react-bootstrap";
import data from '../data/JSON/stocks.json';
import DateSelect from "../DateSelect/DateSelect";
import StockSearch from "../StockSearch/StockSearch";

import fetchStockJsonApi from "../data/fetchStockJsonApi";


import InvestmentSelect from "../InvestmentSelect/InvestmentSelect";
import GetJson from "../data/GetJson";

const Home = () => {

    const [selectedStock, setSelectedStock] = React.useState(data.stocks[0]);
    const [selectedDate, setSelectedDate] = React.useState("2004-08-19");
    const [selectedInvestment, setSelectedInvestment] = React.useState(1000);

    const [reinvestInterval, setReinvestInterval] = React.useState(0);

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


    const handleStockSearchSubmit = (event) => {
        event.preventDefault();
        console.log("searching for stock: ", event.target.value);
        fetchStockJsonApi(event.target.value).then(r => console.log("fetchStockJsonApi returned: ", r));
    }

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


    function handleReinvestIntervalSelect(reinvestInterval) {
        console.log("reinvest interval selected: ", reinvestInterval);
        setReinvestInterval(reinvestInterval);
    }

    return (
        <div>
            <h1>Home</h1>
            <StockSearch
                handleStockSearchSubmit={handleStockSearchSubmit}
            />

            <div className="d-flex flex-row align-items-center">
            <p>
                What if I'd invested in
            </p>
            {<StockSelect
                onStockSelect={handleStockSelect}
            />}
            <p>
                on
            </p>
            <DateSelect
                onDateSelect={handleDateSelect}
                dateArray={json.map((item) => item.Date)}
            />
            <InvestmentSelect
                onInvestmentSelect={handleInvestmentSelect}
                onReinvestIntervalSelect={handleReinvestIntervalSelect}
            />
            </div>
            <Col xs={12} md={12} lg={12} xl={12}>
                <Chart
                    stockJson={json.filter((item) => Date.parse(item.Date) >= Date.parse(selectedDate))}
                    stockName={selectedStock.name}
                    selectedDate={selectedDate}
                    selectedInvestment={selectedInvestment}
                    reinvestInterval={reinvestInterval}
                />
            </Col>
        </div>
    )
        ;
}

export default Home;