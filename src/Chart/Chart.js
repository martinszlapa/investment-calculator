import React, {useCallback, useEffect} from 'react';
import {Bar} from 'react-chartjs-2';
import 'chart.js/auto';
import {faker} from '@faker-js/faker'
import GetJSON from "../data/GetJSON";

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

    useEffect(() => {
        const GetChartData = async () => {
            console.log(selectedStock.selectedStock);
            const json = await GetJSON(selectedStock.selectedStock);
            console.log("JSON:", json);

            const newLabels = json.map((item) => item.Date);
            const newDatasets = [
                {
                    label: 'Dataset 1',
                    data: json.map((item) => item.Close),
                    backgroundColor : 'rgba(53, 162, 235, 0.5)',
                },
            ]

            const newData = {
                labels: newLabels,
                datasets: newDatasets,
            }

            console.log("New Data: ", newData);

            setChartData(newData);
        }
        GetChartData();
    }, [selectedStock]);

    return (
        <Bar
            data={chartData}
            options={options}
        />
    );
}

export default Chart;