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
    const chartData = chart_humidity.data.datasets[0].data;
    const chartLabels = chart_humidity.data.labels;

    // Prepare historical humidity data
    const historyData = [];
    for (let i = 0; i < time_humidity.length; i++) {
        if (time_humidity[i] && value_humidity[i] !== undefined) {
            historyData.push([time_humidity[i], value_humidity[i]]);
        }
    }

    // Create a new workbook and worksheets
    const workbook = XLSX.utils.book_new();

    // Chart Data Worksheet
    const chartDataWorksheet = XLSX.utils.aoa_to_sheet([
        ['Time', 'Humidity'],
        ...chartLabels.map((label, index) => [label, chartData[index]])
    ]);
    XLSX.utils.book_append_sheet(workbook, chartDataWorksheet, 'Chart Data');

    // Historical Data Worksheet
    const historyDataWorksheet = XLSX.utils.aoa_to_sheet([
        ['Time', 'Humidity'],
        ...historyData
    ]);
    XLSX.utils.book_append_sheet(workbook, historyDataWorksheet, 'Historical Data');

    // Save the workbook
    XLSX.writeFile(workbook, 'HumidityData.xlsx');
}

// Add an event listener to the export button (assuming there's a button with id 'export-button')
document.getElementById('export-button').addEventListener('click', exportToExcel);



// ----------------------------------------------------ĐIỆN ÁP------------------------------------------------------------------
var opts_humidity = {
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

var humidity = document.getElementById('chart-humidity').getContext('2d');
var chart_humidity = new Chart(humidity, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'humidity',
            data: [],
            backgroundColor: 'rgba(0, 255, 0, 1)',
            borderColor: 'rgba(0, 255, 0, 1)',
            borderWidth: 3,
            fill: false
        }]
    },
    options: {
        responsive: true,
        animation: {
            duration: 20
        },
        scales: {
            y: {
                min: 0,
                max: 100,
                ticks: {
                    stepSize: 5
                }
            }
        }
    }
});

var content_row_humidity = document.querySelectorAll(".content-row-humidity");
var time_humidity = [];
var value_humidity = [];
var j = 0;
var humidity_out = 0;
// Đảm bảo rằng setInterval chỉ được tạo một lần
var chartIntervalhumidity, historyIntervalhumidity;
    database.ref("monitor/humid").on("value", function (snapshot) {
//         //----------------------------- Gauge ----------------------------
        humidity_out = snapshot.val();
        document.getElementById("humidity").innerHTML = humidity_out + " V";    
        
        //----------------------------- Chart ----------------------------
        // Cập nhật biểu đồ ngay lập tức khi có dữ liệu mới
        updateCharthumidity(humidity_out);
        //----------------------------- Table ----------------------------
        // Cập nhật dữ liệu lịch sử ngay lập tức khi có dữ liệu mới
        updateHistoryDatahumidity(humidity_out);
    });
       function updateCharthumidity(humidity_out){
            var time = new Date().toLocaleTimeString();
            const data = getArr(chart_humidity.data.datasets[0].data, humidity_out);
            const labels = getArr(chart_humidity.data.labels, time);
            chart_humidity.data.labels = labels
            chart_humidity.data.datasets[0].data = data
            chart_humidity.update();
       }
        
//         

       function updateHistoryDatahumidity(humidity_out){
            var time_now = new Date();
            if (j <= 8) {
                time_humidity[j] = time_now.getHours() + ":" + time_now.getMinutes() + ":" + time_now.getSeconds();
                value_humidity[j] = humidity_out;
                j++;
            }
            else {
                time_humidity[0] = time_humidity[1];
                value_humidity[0] = value_humidity[1];
                time_humidity[1] = time_humidity[2];
                value_humidity[1] = value_humidity[2];
                time_humidity[2] = time_humidity[3];
                value_humidity[2] = value_humidity[3];
                time_humidity[3] = time_humidity[4];
                value_humidity[3] = value_humidity[4];
                time_humidity[4] = time_humidity[5];
                value_humidity[4] = value_humidity[5];
                time_humidity[5] = time_humidity[6];
                value_humidity[5] = value_humidity[6];
                time_humidity[6] = time_humidity[7];
                value_humidity[6] = value_humidity[7];
                time_humidity[7] = time_humidity[8];
                value_humidity[7] = value_humidity[8];
                time_humidity[8] = time_now.getHours() + ":" + time_now.getMinutes() + ":" + time_now.getSeconds();
                value_humidity[8] = humidity_out;
            }
            content_row_humidity[2].innerHTML = time_humidity[0];
            content_row_humidity[3].innerHTML = value_humidity[0] + " V";
            content_row_humidity[4].innerHTML = time_humidity[1];
            content_row_humidity[5].innerHTML = value_humidity[1] + " V";
            content_row_humidity[6].innerHTML = time_humidity[2];
            content_row_humidity[7].innerHTML = value_humidity[2] + " V";
            content_row_humidity[8].innerHTML = time_humidity[3];
            content_row_humidity[9].innerHTML = value_humidity[3] + " V";
            content_row_humidity[10].innerHTML = time_humidity[4];
            content_row_humidity[11].innerHTML = value_humidity[4] + " V";
            content_row_humidity[12].innerHTML = time_humidity[5];
            content_row_humidity[13].innerHTML = value_humidity[5] + " V";
            content_row_humidity[14].innerHTML = time_humidity[6];
            content_row_humidity[15].innerHTML = value_humidity[6] + " V";
            content_row_humidity[16].innerHTML = time_humidity[7];
            content_row_humidity[17].innerHTML = value_humidity[7] + " V";
            content_row_humidity[18].innerHTML = time_humidity[8];
            content_row_humidity[19].innerHTML = value_humidity[8] + " V";
        }
            // Bắt đầu cập nhật biểu đồ mỗi giây nếu chưa có
        if (!chartIntervalhumidity) {
            chartInterval = setInterval(() => {
                updateCharthumidity(humidity_out);
            }, 1000);
        }

        // Bắt đầu cập nhật dữ liệu lịch sử mỗi giây nếu chưa có
        if (!historyIntervalhumidity) {
            historyInterval = setInterval(() => {
                updateHistoryDatahumidity(humidity_out);
            }, 1000);
        }