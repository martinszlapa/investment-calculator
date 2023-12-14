import React from 'react';
import Form from "react-bootstrap/Form";

const StockSearch = ({handleStockSearchSubmit}) => {

    const [search, setSearch] = React.useState("");

    function handleSearch(event) {
        setSearch(event.target.value);
    }

    return (
        <div>
            <Form onSubmit={(event) => {
                event.preventDefault();
                handleStockSearchSubmit(search);
            }}>
                <Form.Control value={search} onChange={handleSearch} type="text" placeholder="Search..." className="mr-sm-2"/>
            </Form>
        </div>
    );
}

export default StockSearch;