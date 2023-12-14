import axios from 'axios';

function fetchAPI(ticker) {
    axios.get('http://localhost:5000/stock/{ticker}')
        .then(response => console.log("fetched json", response.data))
}

export default fetchAPI;