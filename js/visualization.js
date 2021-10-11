$(document).ready(function () {
    //choices injected from backend
    if(choices){
        let otherChoices = parseChoices('Other', choices);
        let regularChoices = parseChoices('', choices);
        generateVisualization(regularChoices, otherChoices);
        $("#code_display").html(JSON.stringify({'Other':otherChoices,'Reg':regularChoices}, null, 2));
    }else{
        $('#error').removeClass('hidden');
    }
});

const parseChoices = (type, choices) => {
    if (type === 'Other') {
        return Object.keys(choices).reduce((obj, k) => {
            let dec = decodeURI(k);
            if (dec.includes("Other")) {
                dec = dec.replace("ro_Other_", "");
                obj[dec] = choices[k];
            }

            return obj;

        }, {});
    } else {
        return Object.keys(choices).reduce((obj, k) => {
            let dec = decodeURI(k);
            if (!k.includes("Other")){
                dec = dec.replace("ro_", "");
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

    if (Object.keys(data2).length === 0)
        $('#error_other').removeClass('hidden');

    const config = {
        type: 'bar',
        data: {
            datasets: [{
                label: 'Choice count',
                data: data,
                backgroundColor: style.backgroundColor,
                borderColor: style.borderColor,
                borderWidth: 1
            }]
        },

        options: {
            plugins: {
                legend: {
                    position: 'right',
                },
                title: {
                    display: true,
                    text: 'EM specified selections'
                }
            },
            scales: {
                x: {
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
                label: 'Choice count',
                data: data2,
                backgroundColor: style.backgroundColor,
                borderColor: style.borderColor,
                borderWidth: 1
            }]

        },
        options: {
            indexAxis: 'x',
            plugins: {
                legend: {
                    position: 'right',
                },
                title: {
                    display: true,
                    text: '`Other` selections and reason'
                }
            },
            scales: {
                y: {
                    ticks: {
                        precision: 0
                    }
                },

            }
        }

    };

    var myChart = new Chart($('#barChart'), config);
    var otherChart = new Chart($('#otherChart'), config2);
}
