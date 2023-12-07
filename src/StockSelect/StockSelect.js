import React from 'react';

import Form from 'react-bootstrap/Form';
import data from '../data/JSON/stocks.json';


const StockSelect = ({onStockSelect, onDateSelect}) => {
    function handleStockSelect(event) {
        const stockObj = (data.stocks.find(
            (stock) => stock.name === event.target.value));
        onStockSelect(stockObj);
    }


    return (
        <Form>
            <Form.Select onChange={handleStockSelect}>
                {data.stocks.map((stock) => (
                    <option key={stock.name} value={stock.name}>{stock.name}</option>
                ))}
            </Form.Select>
        </Form>
    );
}

export default StockSelect;