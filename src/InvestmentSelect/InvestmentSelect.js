import React from 'react';
import Form from 'react-bootstrap/Form';
import styles from './InvestmentSelect.module.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const InvestmentSelect = ({onInvestmentSelect, onReinvestIntervalSelect}) => {
    function handleInvestmentSelect(event) {
        onInvestmentSelect(parseInt(event.target.value));
    }

    function handleReinvestIntervalSelect(event) {
        onReinvestIntervalSelect(parseInt(event.target.value));
    }

    return (
        <div >
            <Form className="d-flex flex-row align-items-center">
                <p>with CAD</p>
                <Form.Control
                    onChange={handleInvestmentSelect}
                    type="number"
                    placeholder={1000}
                    defaultValue={1000}
                />
                <p>, investing</p>
                <Form.Select
                    onChange={handleReinvestIntervalSelect}
                >
                    <option value={0}>once</option>
                    <option value={1}>daily (weekdays)</option>
                    <option value={7}>weekly</option>
                    <option value={30}>monthly</option>
                    <option value={365}>yearly</option>
                </Form.Select>
            </Form>
        </div>
    );
}

export default InvestmentSelect;