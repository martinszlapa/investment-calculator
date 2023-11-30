const fs = require('fs');
const csvtojson = require('csvtojson');

const csvFilePath = './data/AAPL.csv';
const jsonFilePath = './data/AAPL.json';

// Read CSV file and convert to JSON
csvtojson()
    .fromFile(csvFilePath)
    .then((jsonArrayObj) => {
        // Write JSON to a file
        fs.writeFileSync(jsonFilePath, JSON.stringify(jsonArrayObj, null, 2), 'utf-8');
        console.log('Conversion successful! JSON file created.');
    })
    .catch((err) => {
        console.error('Error converting CSV to JSON:', err);
    });