import axios from 'axios';

const csvtojson = require('csvtojson');

async function fetchConvertStockApi(ticker) {
    try
    {
        const response = await axios.get('http://127.0.0.1:5000/stock/' + ticker)
        const jsonArrayObj = csvtojson().fromString(response.data);

        console.log(jsonArrayObj);
        return jsonArrayObj;
    }
    catch{
        console.log("Error fetching API");
    }
}


export default fetchConvertStockApi;