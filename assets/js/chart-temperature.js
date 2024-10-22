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

//------------------------------------------------------------GIÁM SÁT-----------------------------------------------------------------
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
    const chartData = chart_temperature.data.datasets[0].data;
    const chartLabels = chart_temperature.data.labels;

    // Prepare historical temperature data
    const historyData = [];
    for (let i = 0; i < time_temperature.length; i++) {
        if (time_temperature[i] && value_temperature[i] !== undefined) {
            historyData.push([time_temperature[i], value_temperature[i]]);
        }
    }

    // Create a new workbook and worksheets
    const workbook = XLSX.utils.book_new();

    // Chart Data Worksheet
    const chartDataWorksheet = XLSX.utils.aoa_to_sheet([
        ['Time', 'Temperature'],
        ...chartLabels.map((label, index) => [label, chartData[index]])
    ]);
    XLSX.utils.book_append_sheet(workbook, chartDataWorksheet, 'Chart Data');

    // Historical Data Worksheet
    const historyDataWorksheet = XLSX.utils.aoa_to_sheet([
        ['Time', 'Temperature'],
        ...historyData
    ]);
    XLSX.utils.book_append_sheet(workbook, historyDataWorksheet, 'Historical Data');

    // Save the workbook
    XLSX.writeFile(workbook, 'Temperature.xlsx');
}

// Add an event listener to the export button (assuming there's a button with id 'export-button')
document.getElementById('export-button').addEventListener('click', exportToExcel);



// ----------------------------------------NHIỆT ĐỘ---------------------------------------------------------
var opts_temperature = {
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

var temperature = document.getElementById('chart-temperature').getContext('2d');
var chart_temperature = new Chart(temperature, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'temperature',
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

var content_row_temperature = document.querySelectorAll(".content-row-temperature");
var time_temperature = [];
var value_temperature = [];
var j = 0;
var temperature_out = 0;
    
// Đảm bảo rằng setInterval chỉ được tạo một lần
var chartIntervaltemperature, historyIntervaltemperature;
    database.ref("monitor/temp").on("value", function (snapshot) {
        //----------------------------- Gauge ----------------------------
        temperature_out = snapshot.val();
        document.getElementById("temperature").innerHTML = temperature_out + " ℃";    
        
        //----------------------------- Chart ----------------------------
        // Cập nhật biểu đồ ngay lập tức khi có dữ liệu mới
        updateCharttemperature(temperature_out);
        //----------------------------- Table ----------------------------
        // Cập nhật dữ liệu lịch sử ngay lập tức khi có dữ liệu mới
        updateHistoryDatatemperature(temperature_out);
    });
        function updateCharttemperature(temperature_out){
            var time = new Date().toLocaleTimeString();
            const data = getArr(chart_temperature.data.datasets[0].data, temperature_out);
            const labels = getArr(chart_temperature.data.labels, time);
            chart_temperature.data.labels = labels
            chart_temperature.data.datasets[0].data = data
            chart_temperature.update();
        }

        function updateHistoryDatatemperature(temperature_out) {
            var time_now = new Date();
            if (j <= 8) {
                time_temperature[j] = time_now.getHours() + ":" + time_now.getMinutes() + ":" + time_now.getSeconds();
                value_temperature[j] = temperature_out;
                j++;
            }
            else {
                time_temperature[0] = time_temperature[1];
                value_temperature[0] = value_temperature[1];
                time_temperature[1] = time_temperature[2];
                value_temperature[1] = value_temperature[2];
                time_temperature[2] = time_temperature[3];
                value_temperature[2] = value_temperature[3];
                time_temperature[3] = time_temperature[4];
                value_temperature[3] = value_temperature[4];
                time_temperature[4] = time_temperature[5];
                value_temperature[4] = value_temperature[5];
                time_temperature[5] = time_temperature[6];
                value_temperature[5] = value_temperature[6];
                time_temperature[6] = time_temperature[7];
                value_temperature[6] = value_temperature[7];
                time_temperature[7] = time_temperature[8];
                value_temperature[7] = value_temperature[8];
                time_temperature[8] = time_now.getHours() + ":" + time_now.getMinutes() + ":" + time_now.getSeconds();
                value_temperature[8] = temperature_out;
            }
            content_row_temperature[2].innerHTML = time_temperature[0];
            content_row_temperature[3].innerHTML = value_temperature[0] + " ℃";
            content_row_temperature[4].innerHTML = time_temperature[1];
            content_row_temperature[5].innerHTML = value_temperature[1] + " ℃";
            content_row_temperature[6].innerHTML = time_temperature[2];
            content_row_temperature[7].innerHTML = value_temperature[2] + " ℃";
            content_row_temperature[8].innerHTML = time_temperature[3];
            content_row_temperature[9].innerHTML = value_temperature[3] + " ℃";
            content_row_temperature[10].innerHTML = time_temperature[4];
            content_row_temperature[11].innerHTML = value_temperature[4] + " ℃";
            content_row_temperature[12].innerHTML = time_temperature[5];
            content_row_temperature[13].innerHTML = value_temperature[5] + " ℃";
            content_row_temperature[14].innerHTML = time_temperature[6];
            content_row_temperature[15].innerHTML = value_temperature[6] + " ℃";
            content_row_temperature[16].innerHTML = time_temperature[7];
            content_row_temperature[17].innerHTML = value_temperature[7] + " ℃";
            content_row_temperature[18].innerHTML = time_temperature[8];
            content_row_temperature[19].innerHTML = value_temperature[8] + " ℃";
        }
    // Bắt đầu cập nhật biểu đồ mỗi giây nếu chưa có
    if (!chartIntervaltemperature) {
        chartInterval = setInterval(() => {
            updateCharttemperature(temperature_out);
        }, 1000);
    }
    
    // Bắt đầu cập nhật dữ liệu lịch sử mỗi giây nếu chưa có
    if (!historyIntervaltemperature) {
        historyInterval = setInterval(() => {
            updateHistoryDatatemperature(temperature_out);
        }, 1000);
    } 
