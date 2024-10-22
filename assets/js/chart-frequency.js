//JAVASCRIPT MONITORING SENSOR
const firebaseConfig = {
    apiKey: "AIzaSyBY8UuFH64cbiRiozlppCEZKPVCYdSa7PE",
    authDomain: "bms-control-dc9fe.firebaseapp.com",
    projectId: "bms-control-dc9fe",
    storageBucket: "bms-control-dc9fe.appspot.com",
    messagingSenderId: "519913995671",
    appId: "1:519913995671:web:6cfd6c43b2a488802298d2",
    measurementId: "G-YKRGC4E3V8"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
console.log(database);

//-------------------------------------------------------------Giám sát-----------------------------------------------------------------
function getArr(arr, newVal) {
    if (arr.length === 0 && !newVal) return [];

    const newArr = [...arr, newVal];
    if (newArr.length > 180) {
        newArr.shift();
    }
    return newArr;
}

//-----------------------------------------------------------REPORT EXCEL-----------------------------------------------------------
function exportToExcel() {
    // Prepare chart data
    const chartData = chart_frequency.data.datasets[0].data;
    const chartLabels = chart_frequency.data.labels;

    // Prepare historical Frequency data
    const historyData = [];
    for (let i = 0; i < time_frequency.length; i++) {
        if (time_frequency[i] && value_frequency[i] !== undefined) {
            historyData.push([time_frequency[i], value_frequency[i]]);
        }
    }

    // Create a new workbook and worksheets
    const workbook = XLSX.utils.book_new();

    // Chart Data Worksheet
    const chartDataWorksheet = XLSX.utils.aoa_to_sheet([
        ['Time', 'Frequency'],
        ...chartLabels.map((label, index) => [label, chartData[index]])
    ]);
    XLSX.utils.book_append_sheet(workbook, chartDataWorksheet, 'Chart Data');

    // Historical Data Worksheet
    const historyDataWorksheet = XLSX.utils.aoa_to_sheet([
        ['Time', 'Frequency'],
        ...historyData
    ]);
    XLSX.utils.book_append_sheet(workbook, historyDataWorksheet, 'Historical Data');

    // Save the workbook
    XLSX.writeFile(workbook, 'FrequencyData.xlsx');
}

// Add an event listener to the export button (assuming there's a button with id 'export-button')
document.getElementById('export-button').addEventListener('click', exportToExcel);


// --------------------------------------------------------TẦN SỐ--------------------------------------------------------------------------//
var opts_frequency = {
    angle: -0.2,
    lineWidth: 0.2,
    radiusScale: 1,
    pointer: {
        length: 0.6,
        strokeWidth: 0.04,
        color: '#000000'
    },
    renderTicks: false,
    limitMax: false,
    limitMin: false,
    percentColors: [[0.0, "#a9d70b"], [0.50, "#f9c802"], [1.0, "#ff0000"]],
    strokeColor: '#E0E0E0',
    generateGradient: true
};

var frequency = document.getElementById('chart-frequency').getContext('2d');
var chart_frequency = new Chart(frequency, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Frequency',
            data: [],
            backgroundColor: 'rgba(0, 0, 255, 1)',
            borderColor: 'rgba(0, 0, 255, 1)',
            borderWidth: 3,
            fill: false
        }]
    },
    options: {
        responsive: true,
        animation: {
            duration: 0
        },
        scales: {
            y: {
                min: 0,
                max: 80,
                ticks: {
                    stepSize: 10
                }
            }
        }
    }
});

var content_row_frequency = document.querySelectorAll(".content-row-frequency");
var time_frequency = [];
var value_frequency = [];
var j = 0;
var frequency_out = 0;
    
// Đảm bảo rằng setInterval chỉ được tạo một lần
var chartIntervalfrequency, historyIntervalfrequency;
    database.ref("monitor/freq").on("value", function (snapshot) {
        //----------------------------- Gauge ----------------------------
        frequency_out = snapshot.val();
        document.getElementById("frequency").innerHTML = frequency_out + " Hz";    
        
        var target_frequency = document.getElementById('gauge-frequency'); // your canvas element
        var ctx = target_frequency.getContext('2d');
        var gauge_frequency = new Gauge(target_frequency).setOptions(opts_frequency); // create sexy gauge!
        gauge_frequency.animationSpeed = 32;
    
        gauge_frequency.maxValue = 80; // set max gauge value
        gauge_frequency.set(frequency_out);
        //----------------------------- Chart ----------------------------
        // Cập nhật biểu đồ ngay lập tức khi có dữ liệu mới
        updateChartfrequency(frequency_out);
        //----------------------------- Table ----------------------------
        // Cập nhật dữ liệu lịch sử ngay lập tức khi có dữ liệu mới
        updateHistoryDatafrequency(frequency_out);
    });
        function updateChartfrequency(frequency_out){
            var time = new Date().toLocaleTimeString();
            const data = getArr(chart_frequency.data.datasets[0].data, frequency_out);
            const labels = getArr(chart_frequency.data.labels, time);
            chart_frequency.data.labels = labels
            chart_frequency.data.datasets[0].data = data
            chart_frequency.update();
        }

        function updateHistoryDatafrequency(frequency_out) {
            var time_now = new Date();
            if (j <= 6) {
                time_frequency[j] = time_now.getHours() + ":" + time_now.getMinutes() + ":" + time_now.getSeconds();
                value_frequency[j] = frequency_out;
                j++;
            }
            else {
                time_frequency[0] = time_frequency[1];
                value_frequency[0] = value_frequency[1];
                time_frequency[1] = time_frequency[2];
                value_frequency[1] = value_frequency[2];
                time_frequency[2] = time_frequency[3];
                value_frequency[2] = value_frequency[3];
                time_frequency[3] = time_frequency[4];
                value_frequency[3] = value_frequency[4];
                time_frequency[4] = time_frequency[5];
                value_frequency[4] = value_frequency[5];
                time_frequency[5] = time_frequency[6];
                value_frequency[5] = value_frequency[6];
                time_frequency[6] = time_now.getHours() + ":" + time_now.getMinutes() + ":" + time_now.getSeconds();
                value_frequency[6] = frequency_out;
            }
            content_row_frequency[2].innerHTML = time_frequency[0];
            content_row_frequency[3].innerHTML = value_frequency[0] + " Hz";
            content_row_frequency[4].innerHTML = time_frequency[1];
            content_row_frequency[5].innerHTML = value_frequency[1] + " Hz";
            content_row_frequency[6].innerHTML = time_frequency[2];
            content_row_frequency[7].innerHTML = value_frequency[2] + " Hz";
            content_row_frequency[8].innerHTML = time_frequency[3];
            content_row_frequency[9].innerHTML = value_frequency[3] + " Hz";
            content_row_frequency[10].innerHTML = time_frequency[4];
            content_row_frequency[11].innerHTML = value_frequency[4] + " Hz";
            content_row_frequency[12].innerHTML = time_frequency[5];
            content_row_frequency[13].innerHTML = value_frequency[5] + " Hz";
            content_row_frequency[14].innerHTML = time_frequency[6];
            content_row_frequency[15].innerHTML = value_frequency[6] + " Hz";
        }
    // Bắt đầu cập nhật biểu đồ mỗi giây nếu chưa có
    if (!chartIntervalfrequency) {
        chartInterval = setInterval(() => {
            updateChartfrequency(frequency_out);
        }, 1000);
    }
    
    // Bắt đầu cập nhật dữ liệu lịch sử mỗi giây nếu chưa có
    if (!historyIntervalfrequency) {
        historyInterval = setInterval(() => {
            updateHistoryDatafrequency(frequency_out);
        }, 1000);
    } 