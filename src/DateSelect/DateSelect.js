import React from 'react';
import Form from 'react-bootstrap/Form';
const DateSelect = ({dateArray, onDateSelect}) => {
    function handleDateSelect(event) {
        onDateSelect(event.target.value);
    }

    return(
        <div>
            <Form>
                <Form.Select onChange={handleDateSelect}>
                    {dateArray.map((date) => (
                        <option key={date} value={date}>{date}</option>
                    ))}
                </Form.Select>
            </Form>
        </div>
    );
}

export default DateSelect;