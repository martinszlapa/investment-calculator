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


const Chart = ({stockJson, selectedDate, selectedInvestment, reinvestInterval}, stockName) => {


    const [chartData, setChartData] = React.useState(data);
    const [finalStockCount, setFinalStockCount] = React.useState(0);
    const [totalInvestment, setTotalInvestment] = React.useState(0);

    useEffect(() => {
        let cumulativeInvestment = 0;
        let stockCount = 0;

        console.log("refreshing chart");
        const newLabels = stockJson.map((item) => item.Date);
        const newDatasets = [
            {
                label: stockName,
                data: stockJson.map((item) => {
                    console.log("total investment", totalInvestment);
                    if (reinvestInterval !== 0) {
                        const itemDate = new Date(item.Date);
                        switch (reinvestInterval) {
                            case 1:
                                stockCount += selectedInvestment / item.Close;
                                cumulativeInvestment += selectedInvestment;
                                break;
                            case 7:
                                if (itemDate.getDay() === 1) { // Monday
                                    console.log("adding daily: ", item.Date);
                                    stockCount += selectedInvestment / item.Close;
                                    cumulativeInvestment += selectedInvestment;
                                }

                                break;
                            case 30:
                                if (itemDate.getDate() === 1) { // First of the month
                                    console.log("adding monthly: ", item.Date);
                                    stockCount += selectedInvestment / item.Close;
                                    cumulativeInvestment += selectedInvestment;
                                }
                                break;
                            case 365:
                                if (itemDate.getMonth() === 0 && itemDate.getDate() === 1) { // First of the year
                                    console.log("adding yearly: ", item.Date);
                                    stockCount += selectedInvestment / item.Close;
                                    cumulativeInvestment += selectedInvestment;
                                }
                                break;
                            default:
                                break;
                        }
                    } else {
                        stockCount = selectedInvestment / stockJson[0].Close;
                        cumulativeInvestment = selectedInvestment;
                    }
                    setTotalInvestment(cumulativeInvestment);
                    setFinalStockCount(stockCount);

                    console.log("cumulative investment", cumulativeInvestment);
                    console.log("stock count", stockCount);

                    return stockCount * item.Close
                }),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ]
        const newData = {
            labels: newLabels,
            datasets: newDatasets,
        }
        console.log("newData", newData);
        setChartData(newData);
    }, [stockJson, selectedDate, selectedInvestment, stockName, reinvestInterval]);
    return (
        <div>
        <Bar
            data={chartData}
            options={options}
        />
            <p>You would have invested {
                new Intl.NumberFormat('en-CA', {style: 'currency', currency: 'CAD'}).format(totalInvestment)
            } in total, and ended up with {
                new Intl.NumberFormat('en-CA', {style: 'currency', currency: 'CAD'}).format(finalStockCount*stockJson[stockJson.length - 1].Close)
            } worth of stock.</p>
        </div>
    );
}

export default Chart;