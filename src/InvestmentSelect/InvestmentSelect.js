import React from 'react';
import Form from 'react-bootstrap/Form';

const InvestmentSelect = ({onInvestmentSelect, onReinvestSelect}) => {
    function handleInvestmentSelect(event) {
        onInvestmentSelect(parseInt(event.target.value));
    }

    function handleReinvestSelect(event) {
        onReinvestSelect(event.target.value);
    }

    return(
        <div>
            <Form>
                <Form.Control
                    onChange={handleInvestmentSelect}
                    type="number"
                    placeholder={1000}
                    defaultValue={1000}
                />
                <Form.Switch
                    onChange={handleReinvestSelect}
                />
                <Form.Select>
                    <option value={1}>Daily</option>
                    <option value={7}>Weekly</option>
                    <option value={30}>Monthly</option>
                    <option value={365}>Yearly</option>
                </Form.Select>
            </Form>
        </div>
    );
}

export default InvestmentSelect;