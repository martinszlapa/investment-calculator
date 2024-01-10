import React from 'react';
import Form from "react-bootstrap/Form";

const StockSearch = ({handleStockSearchSubmit}) => {

    const [search, setSearch] = React.useState("");

    function handleSearch(event) {
        setSearch(event.target.value);
    }

    return (
        <div>
            <Form>
                <Form.Control value={search} onSubmit={handleStockSearchSubmit} onChange={handleSearch} type="text" placeholder="Search..." className="mr-sm-2"/>
            </Form>
        </div>
    );
}

export default StockSearch;