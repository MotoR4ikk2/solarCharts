function processChartData(chartData) {
    const energyToGridData = {};
    const consumerData = {};
    const genToSomewhere = {};
    chartData.forEach(chartItem => {
        chartItem.data.forEach(dataPoint => {
            if (chartItem.id === 'FromGenToGrid') {
                processEnergyToGridData(dataPoint, energyToGridData);
            } else if (chartItem.id === 'FromGenToConsumer') {
                processConsumerData(dataPoint, consumerData);
            } else if (chartItem.id === 'FromGenToSomewhere') {
                processGenToSomewhere(dataPoint, genToSomewhere);
            }
        });
    });

    return {
        energyToGridData,
        consumerData,
        genToSomewhere,
    }
}

function processEnergyToGridData(dataPoint, energyToGridData) {
    let times = dataPoint[0];
    times = new Date(times);
    let formatedTimes = times.toLocaleDateString('uk-UA', {
        month: 'long'
    });
    if (!energyToGridData[formatedTimes]) {
        energyToGridData[formatedTimes] = 0;
    }
    energyToGridData[formatedTimes] += dataPoint[1];
}

function processConsumerData(dataPoint, consumerData) {
    let times = dataPoint[0];
    times = new Date(times);
    let formatedTimes = times.toLocaleDateString('uk-UA', {
        month: 'long'
    });

    if (!consumerData[formatedTimes]) {
        consumerData[formatedTimes] = 0;
    }
    consumerData[formatedTimes] += dataPoint[1];
}

function processGenToSomewhere(dataPoint, genToSomewhere) {
    let times = dataPoint[0];
    times = new Date(times);
    let formatedTimes = times.toLocaleDateString('uk-UA', {
        month: 'long'
    });

    if (!genToSomewhere[formatedTimes]) {
        genToSomewhere[formatedTimes] = 0;
    }
    genToSomewhere[formatedTimes] += dataPoint[1];
}

const chartDataResult2022 = processChartData(chartData2022);
const chartDataResult2023 = processChartData(chartData2023);

function mergeObjects(obj1, obj2, obj3) {
    const result = {};

    // Додаємо значення для obj1
    for (const key in obj1) {
        if (obj1.hasOwnProperty(key)) {
            result[key] = obj1[key];
        }
    }

    // Додаємо значення для obj2
    for (const key in obj2) {
        if (obj2.hasOwnProperty(key)) {
            result[key] = (result[key] || 0) + obj2[key];
        }
    }

    // Додаємо значення для obj3
    for (const key in obj3) {
        if (obj3.hasOwnProperty(key)) {
            result[key] = (result[key] || 0) + obj3[key];
        }
    }

    return result;
}

const totalkWh2022 = mergeObjects(chartDataResult2022.energyToGridData, chartDataResult2022.consumerData, chartDataResult2022.genToSomewhere);
const totalkWh2023 = mergeObjects(chartDataResult2023.energyToGridData, chartDataResult2023.consumerData, chartDataResult2023.genToSomewhere);
const monthData = ['січень', 'лютий', 'березень', 'квітень', 'травень', 'червень', 'липень', 'серпень', 'вересень', 'жовтень', 'листопад', 'грудень'];

let arrayObjects23 = [];

for (let key in totalkWh2023) {
    if (totalkWh2023.hasOwnProperty(key)) {
        let newObject = {
            label: key,
            value: totalkWh2023[key]
        };
        arrayObjects23.push(newObject);
    }
}

let arrayObjects22 = [];

for (let key in totalkWh2022) {
    if (totalkWh2022.hasOwnProperty(key)) {
        let newObject = {
            label: key,
            value: totalkWh2022[key]
        };

        arrayObjects22.push(newObject);
    }
}

const kv2023 = Object.values(totalkWh2023);
Chart.register(ChartDataLabels);

const ctx = document.getElementById('myChart').getContext('2d');
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