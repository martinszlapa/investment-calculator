import axios from 'axios';

async function fetchAPI(ticker) {
    return await axios.get('http://127.0.0.1:5000/stock/' + ticker)
}


export default fetchAPI;