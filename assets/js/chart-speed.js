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
    const chartData = chart_speed.data.datasets[0].data;
    const chartLabels = chart_speed.data.labels;

    // Prepare historical speed data
    const historyData = [];
    for (let i = 0; i < time_speed.length; i++) {
        if (time_speed[i] && value_speed[i] !== undefined) {
            historyData.push([time_speed[i], value_speed[i]]);
        }
    }

    // Create a new workbook and worksheets
    const workbook = XLSX.utils.book_new();

    // Chart Data Worksheet
    const chartDataWorksheet = XLSX.utils.aoa_to_sheet([
        ['Time', 'Speed'],
        ...chartLabels.map((label, index) => [label, chartData[index]])
    ]);
    XLSX.utils.book_append_sheet(workbook, chartDataWorksheet, 'Chart Data');

    // Historical Data Worksheet
    const historyDataWorksheet = XLSX.utils.aoa_to_sheet([
        ['Time', 'Speed'],
        ...historyData
    ]);
    XLSX.utils.book_append_sheet(workbook, historyDataWorksheet, 'Historical Data');

    // Save the workbook
    XLSX.writeFile(workbook, 'SpeedData.xlsx');
}

// Add an event listener to the export button (assuming there's a button with id 'export-button')
document.getElementById('export-button').addEventListener('click', exportToExcel);



// ----------------------------------------------------TỐC ĐỘ------------------------------------------------------------------
var opts_speed = {
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

var speed = document.getElementById('chart-speed').getContext('2d');
var chart_speed = new Chart(speed, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Speed',
            data: [],
            backgroundColor: 'rgba(0, 255, , 1)',
            borderColor: 'rgba(0, 255, , 1)',
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
                max: 2000,
                ticks: {
                    stepSize: 200
                }
            }
        }
    }
});

var content_row_speed = document.querySelectorAll(".content-row-speed");
var time_speed = [];
var value_speed = [];
var j = 0;
var speed_out = 0;
    
// Đảm bảo rằng setInterval chỉ được tạo một lần
var chartIntervalspeed, historyIntervalspeed;
    database.ref("monitor/speed").on("value", function (snapshot) {
        //----------------------------- Gauge ----------------------------
        speed_out = snapshot.val();
        document.getElementById("speed").innerHTML = speed_out + " rpm";    
        
        var target_speed = document.getElementById('gauge-speed'); // your canvas element
        var ctx = target_speed.getContext('2d');
        var gauge_speed = new Gauge(target_speed).setOptions(opts_speed); // create sexy gauge!
        gauge_speed.animationSpeed = 32;
    
        gauge_speed.maxValue = 2000; // set max gauge value
        gauge_speed.set(speed_out);
             //----------------------------- Chart ----------------------------
        // Cập nhật biểu đồ ngay lập tức khi có dữ liệu mới
        updateChartspeed(speed_out);
        //----------------------------- Table ----------------------------
        // Cập nhật dữ liệu lịch sử ngay lập tức khi có dữ liệu mới
        updateHistoryDataspeed(speed_out);
    });
    function updateChartspeed(speed_out) {
        var time = new Date().toLocaleTimeString();
        const data = getArr(chart_speed.data.datasets[0].data, speed_out);
        const labels = getArr(chart_speed.data.labels, time);
        chart_speed.data.labels = labels
        chart_speed.data.datasets[0].data = data
        chart_speed.update();
    }    

    function updateHistoryDataspeed(speed_out) {
            var time_now = new Date();
            if (j <= 8) {
                time_speed[j] = time_now.getHours() + ":" + time_now.getMinutes() + ":" + time_now.getSeconds();
                value_speed[j] = speed_out;
                j++;
            }
            else {
                time_speed[0] = time_speed[1];
                value_speed[0] = value_speed[1];
                time_speed[1] = time_speed[2];
                value_speed[1] = value_speed[2];
                time_speed[2] = time_speed[3];
                value_speed[2] = value_speed[3];
                time_speed[3] = time_speed[4];
                value_speed[3] = value_speed[4];
                time_speed[4] = time_speed[5];
                value_speed[4] = value_speed[5];
                time_speed[5] = time_speed[6];
                value_speed[5] = value_speed[6];
                time_speed[6] = time_speed[7];
                value_speed[6] = value_speed[7];
                time_speed[7] = time_speed[8];
                value_speed[7] = value_speed[8];
                time_speed[8] = time_now.getHours() + ":" + time_now.getMinutes() + ":" + time_now.getSeconds();
                value_speed[8] = speed_out;
            }
            content_row_speed[2].innerHTML = time_speed[0];
            content_row_speed[3].innerHTML = value_speed[0] + " rpm";
            content_row_speed[4].innerHTML = time_speed[1];
            content_row_speed[5].innerHTML = value_speed[1] + " rpm";
            content_row_speed[6].innerHTML = time_speed[2];
            content_row_speed[7].innerHTML = value_speed[2] + " rpm";
            content_row_speed[8].innerHTML = time_speed[3];
            content_row_speed[9].innerHTML = value_speed[3] + " rpm";
            content_row_speed[10].innerHTML = time_speed[4];
            content_row_speed[11].innerHTML = value_speed[4] + " rpm";
            content_row_speed[12].innerHTML = time_speed[5];
            content_row_speed[13].innerHTML = value_speed[5] + " rpm";
            content_row_speed[14].innerHTML = time_speed[6];
            content_row_speed[15].innerHTML = value_speed[6] + " rpm";
            content_row_speed[16].innerHTML = time_speed[7];
            content_row_speed[17].innerHTML = value_speed[7] + " rpm";
            content_row_speed[18].innerHTML = time_speed[8];
            content_row_speed[19].innerHTML = value_speed[8] + " rpm";
        }
    // Bắt đầu cập nhật biểu đồ mỗi giây nếu chưa có
    if (!chartIntervalspeed) {
        chartInterval = setInterval(() => {
            updateChartspeed(speed_out);
        }, 1000);
    }
    
    // Bắt đầu cập nhật dữ liệu lịch sử mỗi giây nếu chưa có
    if (!historyIntervalspeed) {
        historyInterval = setInterval(() => {
            updateHistoryDataspeed(speed_out);
        }, 1000);
    }