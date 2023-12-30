const monthData = ['січень', 'лютий', 'березень', 'квітень', 'травень', 'червень', 'липень', 'серпень', 'вересень', 'жовтень', 'листопад', 'грудень'];
const ctx = document.getElementById('myChart').getContext('2d');
const chartDataResult2022 = processChartData(chartData2022);
const chartDataResult2023 = processChartData(chartData2023);
const totalkWh2022 = mergeObjects(chartDataResult2022.energyToGridData, chartDataResult2022.consumerData, chartDataResult2022.genToSomewhere);
const totalkWh2023 = mergeObjects(chartDataResult2023.energyToGridData, chartDataResult2023.consumerData, chartDataResult2023.genToSomewhere);

let arrayObjects22 = [], arrayObjects23 = [];

for (let key in totalkWh2023) {
    if (totalkWh2023.hasOwnProperty(key)) {
        let newObject = {
            label: key,
            value: totalkWh2023[key]
        };
        arrayObjects23.push(newObject);
    }
}

for (let key in totalkWh2022) {
    if (totalkWh2022.hasOwnProperty(key)) {
        let newObject = {
            label: key,
            value: totalkWh2022[key]
        };

        arrayObjects22.push(newObject);
    }
}

Chart.register(ChartDataLabels);

new Chart(ctx, {
    type: 'bar',
    data: {
        datasets: [{
                label: '# кВт 2023',
                data: arrayObjects23,
                borderWidth: 1,
                parsing: {
                    xAxisKey: 'label',
                    yAxisKey: 'value'
                }
            },
            {
                label: '# кВт 2022',
                data: arrayObjects22,
                borderWidth: 1,
                parsing: {
                    xAxisKey: 'label',
                    yAxisKey: 'value'
                }
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            datalabels: {
                anchor: 'end',
                align: 'top',
                font: {
                    weight: 'bold'
                },
                formatter: function (value, context) {
                    return Math.round(value.value) + ' кВт';
                }
            }
        }
    }
});