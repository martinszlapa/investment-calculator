import React from 'react';
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

        const importStockData = async () => {
            console.log(selectedStock);
            console.log(selectedStock.selectedStock.path)
            const stockJSON = await require(`${selectedStock.path}`);
            console.log(stockJSON);
            const newChartData = (
                stockJSON.map((entry) => ({
                        label: entry.Date,
                        value: entry.Close,
                    }
                ))
            )

            console.log(newChartData);
        }

        importStockData().then(r => console.log("done"));

    }, [selectedStock]);

    return (
        <Bar
            data={chartData}
            options={options}
        />
    );
}

export default Chart;