$(document).ready(function () {
    //choices injected from backend
    if (choices) {
        let otherChoices = parseChoices('Other', choices);
        let regularChoices = parseChoices('', choices);
        generateVisualization(regularChoices, otherChoices);
        $("#code_display").html(JSON.stringify({'Other': otherChoices, 'Reg': regularChoices}, null, 2));
    } else {
        $('#error').removeClass('hidden');
    }
});

const parseChoices = (type, choices) => {
    if (type === 'Other') {
        return Object.keys(choices).reduce((obj, k) => {
            let dec = decodeURI(k);
            if (dec.includes("Other") || dec.includes("oth_")) {
                dec = dec.replace("ro_Other_", "");
                dec = dec.replace("oth_", "")

                if (dec)
                    obj[dec] = choices[k];
            }

            return obj;

        }, {});
    } else {
        return Object.keys(choices).reduce((obj, k) => {
            let dec = decodeURI(k);
            if (!k.includes("Other") && !k.includes("oth_")) {
                dec = dec.replace("ro_", "");
                obj[dec] = choices[k];

                if (dec)
                    obj[dec] = choices[k];
            }

            return obj;

        }, {});
    }
}
const calculateMax = (arr) => {
    return Math.max.apply(Math, arr.map((o) => o.val));
}

const sortData = (arr) => {
    return arr.sort((b, a) => (a.val - b.val));
}

const style = {
    backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
    ],
    borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
    ]
}

const generateVisualization = (data, data2) => {
    if (Object.keys(data).length === 0)
        $('#error').removeClass('hidden');

    if (Object.keys(data2).length === 0) {
        $('#error_other').removeClass('hidden');
        $('#otherChart').addClass('hidden');
    }


    // let minData = Object.values(data).reduce((a, b) => data[a] < data[b] ? a : b);
    // let minData2 = Object.values(data2).reduce((a, b) => data2[a] < data2[b] ? a : b);
    // console.log(minData, minData2)

    const config = {
        type: 'bar',
        data: {
            datasets: [{
                label: 'Count',
                data: data,
                backgroundColor: style.backgroundColor,
                borderColor: style.borderColor,
                borderWidth: 1,
                maxBarThickness: 200
            }]
        },

        options: {
            plugins: {
                legend: {
                    display: false
                    // position: 'right',
                },
                title: {
                    display: true,
                    text: 'EM specified choices'
                }
            },
            scales: {
                x: {
                    ticks: {
                        callback: function (value, index, values) {
                            if (this.getLabelForValue(value).length > 20)
                                return this.getLabelForValue(value).substring(0, 17) + '...';
                            else
                                return this.getLabelForValue(value);
                        }
                    },
                    stacked: true,
                },
                y: {
                    ticks: {
                        precision: 0
                    }
                }
            }
        }

    };

    const config2 = {
        type: 'bar',
        labels: Object.keys(data2),
        data: {
            datasets: [{
                label: 'Count',
                data: data2,
                backgroundColor: style.backgroundColor,
                borderColor: style.borderColor,
                borderWidth: 1,
                maxBarThickness: 200
            }]

        },
        options: {
            indexAxis: 'x',
            plugins: {
                legend: {
                    display: false
                    // position: 'right',
                },
                title: {
                    display: true,
                    text: '`Other` choices '
                }
            },
            scales: {
                y: {
                    ticks: {
                        precision: 0
                    }
                },
                x: {
                    ticks: {
                        callback: function (value, index, values) {
                            if (this.getLabelForValue(value).length > 20)
                                return this.getLabelForValue(value).substring(0, 17) + '...';
                            else
                                return this.getLabelForValue(value);
                        }
                    }
                }
            }
        }

    };

    var myChart = new Chart($('#barChart'), config);
    var otherChart = new Chart($('#otherChart'), config2);
}
