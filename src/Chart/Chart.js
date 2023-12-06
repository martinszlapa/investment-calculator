import React, {useCallback, useEffect} from 'react';
import {Bar} from 'react-chartjs-2';
import 'chart.js/auto';
import {faker} from '@faker-js/faker'

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => faker.datatype.number({min: 0, max: 1000})),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => faker.datatype.number({min: 0, max: 1000})),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};


const Chart = (selectedStock) => {

    const [chartData, setChartData] = React.useState(data);

    React.useEffect(() => {
        const selectedStockPath = selectedStock.selectedStock.path;
        console.log(selectedStockPath);

        fetch(selectedStockPath, {mode: 'no-cors'})
            .then(response => {
                console.log("Raw Response:", response);
                return response.text();
            })
            .then(data => console.log("Data: ", data))
            .catch(error => console.error(error))
    },[selectedStock])

    // React.useEffect(() => {
    //
    //
    //     const importStockData = async () => {
    //         try{
    //         console.log(selectedStock);
    //         console.log(selectedStock.selectedStock.path);
    //
    //         const selectedStockPath = selectedStock.selectedStock.path;
    //         const stockModule = await require(`./data/JSON/${selectedStockPath}`);
    //
    //         const stockJSON = stockModule.default;
    //
    //         const newChartData = (
    //             stockJSON.map((entry) => ({
    //                     label: entry.Date,
    //                     value: entry.Close,
    //                 }
    //             ))
    //         )
    //
    //         setChartData(newChartData)
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     }
    //     importStockData().then(r => console.log('donex'));
    //
    // }, [selectedStock]);

    return (
        <Bar
            data={chartData}
            options={options}
        />
    );
}

export default Chart;