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