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
    const chartData = chart_current.data.datasets[0].data;
    const chartLabels = chart_current.data.labels;

    // Prepare historical current data
    const historyData = [];
    for (let i = 0; i < time_current.length; i++) {
        if (time_current[i] && value_current[i] !== undefined) {
            historyData.push([time_current[i], value_current[i]]);
        }
    }

    // Create a new workbook and worksheets
    const workbook = XLSX.utils.book_new();

    // Chart Data Worksheet
    const chartDataWorksheet = XLSX.utils.aoa_to_sheet([
        ['Time', 'Current'],
        ...chartLabels.map((label, index) => [label, chartData[index]])
    ]);
    XLSX.utils.book_append_sheet(workbook, chartDataWorksheet, 'Chart Data');

    // Historical Data Worksheet
    const historyDataWorksheet = XLSX.utils.aoa_to_sheet([
        ['Time', 'Current'],
        ...historyData
    ]);
    XLSX.utils.book_append_sheet(workbook, historyDataWorksheet, 'Historical Data');

    // Save the workbook
    XLSX.writeFile(workbook, 'CurrentData.xlsx');
}

// Add an event listener to the export button (assuming there's a button with id 'export-button')
document.getElementById('export-button').addEventListener('click', exportToExcel);


// ----------------------------------------DÒNG ĐIỆN---------------------------------------------------------
var opts_current = {
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

var current = document.getElementById('chart-current').getContext('2d');
var chart_current = new Chart(current, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Current',
            data: [],
            backgroundColor: 'rgba(255, 99, 0, 1)',
            borderColor: 'rgba(255, 99, 0, 1)',
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
                max: 5,
                ticks: {
                    stepSize: 0.5
                }
            }
        }
    }
});

var content_row_current = document.querySelectorAll(".content-row-current");
var time_current = [];
var value_current = [];
var j = 0;
var current_out = 0;

// Đảm bảo rằng setInterval chỉ được tạo một lần
var chartIntervalcurrent, historyIntervalcurrent;

database.ref("monitor/current").on("value", function (snapshot) {
    //----------------------------- Gauge ----------------------------
    current_out = snapshot.val();
    document.getElementById("current").innerHTML = current_out + " A";

    //----------------------------- Chart ----------------------------
    // Cập nhật biểu đồ ngay lập tức khi có dữ liệu mới
    updateChartcurrent(current_out);
    //----------------------------- Table ----------------------------
    // Cập nhật dữ liệu lịch sử ngay lập tức khi có dữ liệu mới
    updateHistoryDatacurrent(current_out);
});

function updateChartcurrent(current_out) {
    var time = new Date().toLocaleTimeString();
    const data = getArr(chart_current.data.datasets[0].data, current_out);
    const labels = getArr(chart_current.data.labels, time);
    chart_current.data.labels = labels;
    chart_current.data.datasets[0].data = data;
    chart_current.update();
}

function updateHistoryDatacurrent(current_out) {
    var time_now = new Date();
    if (j <= 8) {
        time_current[j] = time_now.getHours() + ":" + time_now.getMinutes() + ":" + time_now.getSeconds();
        value_current[j] = current_out;
        j++;
    } else {
        time_current[0] = time_current[1];
        value_current[0] = value_current[1];
        time_current[1] = time_current[2];
        value_current[1] = value_current[2];
        time_current[2] = time_current[3];
        value_current[2] = value_current[3];
        time_current[3] = time_current[4];
        value_current[3] = value_current[4];
        time_current[4] = time_current[5];
        value_current[4] = value_current[5];
        time_current[5] = time_current[6];
        value_current[5] = value_current[6];
        time_current[6] = time_current[7];
        value_current[6] = value_current[7];
        time_current[7] = time_current[8];
        value_current[7] = value_current[8];
        time_current[8] = time_now.getHours() + ":" + time_now.getMinutes() + ":" + time_now.getSeconds();
        value_current[8] = current_out;
    }
    content_row_current[2].innerHTML = time_current[0];
    content_row_current[3].innerHTML = value_current[0] + " A";
    content_row_current[4].innerHTML = time_current[1];
    content_row_current[5].innerHTML = value_current[1] + " A";
    content_row_current[6].innerHTML = time_current[2];
    content_row_current[7].innerHTML = value_current[2] + " A";
    content_row_current[8].innerHTML = time_current[3];
    content_row_current[9].innerHTML = value_current[3] + " A";
    content_row_current[10].innerHTML = time_current[4];
    content_row_current[11].innerHTML = value_current[4] + " A";
    content_row_current[12].innerHTML = time_current[5];
    content_row_current[13].innerHTML = value_current[5] + " A";
    content_row_current[14].innerHTML = time_current[6];
    content_row_current[15].innerHTML = value_current[6] + " A";
    content_row_current[16].innerHTML = time_current[7];
    content_row_current[17].innerHTML = value_current[7] + " A";
    content_row_current[18].innerHTML = time_current[8];
    content_row_current[19].innerHTML = value_current[8] + " A";
}

// Bắt đầu cập nhật biểu đồ mỗi giây nếu chưa có
if (!chartIntervalcurrent) {
    chartInterval = setInterval(() => {
        updateChartcurrent(current_out);
    }, 1000);
}

// Bắt đầu cập nhật dữ liệu lịch sử mỗi giây nếu chưa có
if (!historyIntervalcurrent) {
    historyInterval = setInterval(() => {
        updateHistoryDatacurrent(current_out);
    }, 1000);
}  