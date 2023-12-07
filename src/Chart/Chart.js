import React, {useEffect} from 'react';
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


const Chart = ({stockJson}, stockName) => {
    const [chartData, setChartData] = React.useState(data);

    useEffect(() => {
        console.log("refreshing chart");
        const newLabels = stockJson.map((item) => item.Date);
        const newDatasets = [
            {
                label: stockName,
                data: stockJson.map((item) => item.Close),
                backgroundColor : 'rgba(53, 162, 235, 0.5)',
            },
        ]
        const newData = {
            labels: newLabels,
            datasets: newDatasets,
        }
        console.log("newData", newData);
        setChartData(newData);
    }, stockJson);
    return (
        <Bar
            data={chartData}
            options={options}
        />
    );
}

export default Chart;