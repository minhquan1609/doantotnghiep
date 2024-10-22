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
    const chartData = chart_pressure.data.datasets[0].data;
    const chartLabels = chart_pressure.data.labels;

    // Prepare historical pressure data
    const historyData = [];
    for (let i = 0; i < time_pressure.length; i++) {
        if (time_pressure[i] && value_pressure[i] !== undefined) {
            historyData.push([time_pressure[i], value_pressure[i]]);
        }
    }

    // Create a new workbook and worksheets
    const workbook = XLSX.utils.book_new();

    // Chart Data Worksheet
    const chartDataWorksheet = XLSX.utils.aoa_to_sheet([
        ['Time', 'Pressure'],
        ...chartLabels.map((label, index) => [label, chartData[index]])
    ]);
    XLSX.utils.book_append_sheet(workbook, chartDataWorksheet, 'Chart Data');

    // Historical Data Worksheet
    const historyDataWorksheet = XLSX.utils.aoa_to_sheet([
        ['Time', 'Pressure'],
        ...historyData
    ]);
    XLSX.utils.book_append_sheet(workbook, historyDataWorksheet, 'Historical Data');

    // Save the workbook
    XLSX.writeFile(workbook, 'PressureData.xlsx');
}

// Add an event listener to the export button (assuming there's a button with id 'export-button')
document.getElementById('export-button').addEventListener('click', exportToExcel);



// ----------------------------------------------------ÁP SUẤT------------------------------------------------------------------
    var opts_pressure = {
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
    
    var pressure = document.getElementById('chart-pressure').getContext('2d');
    var chart_pressure = new Chart(pressure, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'pressure',
                data: [],
                backgroundColor: 'rgba(255, 255, 0, 1)',
                borderColor: 'rgba(255, 255, 0, 1)',
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
                    max: 15,
                    ticks: {
                        stepSize: 0.2
                    }
                }
            }
        }
    });
    
    var content_row_pressure = document.querySelectorAll(".content-row-pressure");
    var time_pressure = [];
    var value_pressure = [];
    var j = 0;
    var pressure_out = 0;
        
    // Đảm bảo rằng setInterval chỉ được tạo một lần
    var chartIntervalpressure, historyIntervalpressure;
        database.ref("monitor/pressout").on("value", function (snapshot) {
            //----------------------------- Gauge ----------------------------
            pressure_out = snapshot.val();
            document.getElementById("pressure").innerHTML = pressure_out + " Bar";    
            
            //----------------------------- Chart ----------------------------
            // Cập nhật biểu đồ ngay lập tức khi có dữ liệu mới
            updateChartpressure(pressure_out);
            //----------------------------- Table ----------------------------
            // Cập nhật dữ liệu lịch sử ngay lập tức khi có dữ liệu mới
            updateHistoryDatapressure(pressure_out);
        });
        function updateChartpressure(pressure_out) {
            var time = new Date().toLocaleTimeString();
            const data = getArr(chart_pressure.data.datasets[0].data, pressure_out);
            const labels = getArr(chart_pressure.data.labels, time);
            chart_pressure.data.labels = labels
            chart_pressure.data.datasets[0].data = data
            chart_pressure.update();
        }    
    
        function updateHistoryDatapressure(pressure_out) {
                var time_now = new Date();
                if (j <= 8) {
                    time_pressure[j] = time_now.getHours() + ":" + time_now.getMinutes() + ":" + time_now.getSeconds();
                    value_pressure[j] = pressure_out;
                    j++;
                }
                else {
                    time_pressure[0] = time_pressure[1];
                    value_pressure[0] = value_pressure[1];
                    time_pressure[1] = time_pressure[2];
                    value_pressure[1] = value_pressure[2];
                    time_pressure[2] = time_pressure[3];
                    value_pressure[2] = value_pressure[3];
                    time_pressure[3] = time_pressure[4];
                    value_pressure[3] = value_pressure[4];
                    time_pressure[4] = time_pressure[5];
                    value_pressure[4] = value_pressure[5];
                    time_pressure[5] = time_pressure[6];
                    value_pressure[5] = value_pressure[6];
                    time_pressure[6] = time_pressure[7];
                    value_pressure[6] = value_pressure[7];
                    time_pressure[7] = time_pressure[8];
                    value_pressure[7] = value_pressure[8];
                    time_pressure[8] = time_now.getHours() + ":" + time_now.getMinutes() + ":" + time_now.getSeconds();
                    value_pressure[8] = pressure_out;
                }
                content_row_pressure[2].innerHTML = time_pressure[0];
                content_row_pressure[3].innerHTML = value_pressure[0] + " Bar";
                content_row_pressure[4].innerHTML = time_pressure[1];
                content_row_pressure[5].innerHTML = value_pressure[1] + " Bar";
                content_row_pressure[6].innerHTML = time_pressure[2];
                content_row_pressure[7].innerHTML = value_pressure[2] + " Bar";
                content_row_pressure[8].innerHTML = time_pressure[3];
                content_row_pressure[9].innerHTML = value_pressure[3] + " Bar";
                content_row_pressure[10].innerHTML = time_pressure[4];
                content_row_pressure[11].innerHTML = value_pressure[4] + " Bar";
                content_row_pressure[12].innerHTML = time_pressure[5];
                content_row_pressure[13].innerHTML = value_pressure[5] + " Bar";
                content_row_pressure[14].innerHTML = time_pressure[6];
                content_row_pressure[15].innerHTML = value_pressure[6] + " Bar";
                content_row_pressure[16].innerHTML = time_pressure[7];
                content_row_pressure[17].innerHTML = value_pressure[7] + " Bar";
                content_row_pressure[18].innerHTML = time_pressure[8];
                content_row_pressure[19].innerHTML = value_pressure[8] + " Bar";
            }
        // Bắt đầu cập nhật biểu đồ mỗi giây nếu chưa có
        if (!chartIntervalpressure) {
            chartInterval = setInterval(() => {
                updateChartpressure(pressure_out);
            }, 1000);
        }
        
        // Bắt đầu cập nhật dữ liệu lịch sử mỗi giây nếu chưa có
        if (!historyIntervalpressure) {
            historyInterval = setInterval(() => {
                updateHistoryDatapressure(pressure_out);
            }, 1000);
        }
