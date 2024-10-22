//JAVASCRIPT MONITORING SENSOR
const firebaseConfig = {
    apiKey: "AIzaSyCtg5aMj5HyNOfb4VfHDwykN9WNb-RiNAU",
    authDomain: "bms-control-ahu.firebaseapp.com",
    databaseURL: "https://bms-control-ahu-default-rtdb.firebaseio.com",
    projectId: "bms-control-ahu",
    storageBucket: "bms-control-ahu.appspot.com",
    messagingSenderId: "712937910090",
    appId: "1:712937910090:web:0de6574dc7f0e9e22c9bb3",
    measurementId: "G-DVJKS8MC7Q"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
console.log(database);

//-------------------------------------------------------------Giám sát-----------------------------------------------------------------
function getArr(arr, newVal) {
    if (arr.length === 0 && !newVal) return [];

    const newArr = [...arr, newVal];
    if (newArr.length > 15) {
        newArr.shift();
    }
    return newArr;
}

//-----------------------------------------------------------REPORT EXCEL-----------------------------------------------------------
function exportToExcel() {
    // Prepare chart data
    const chartData = chart_voltage.data.datasets[0].data;
    const chartLabels = chart_voltage.data.labels;

    // Prepare historical voltage data
    const historyData = [];
    for (let i = 0; i < time_voltage.length; i++) {
        if (time_voltage[i] && value_voltage[i] !== undefined) {
            historyData.push([time_voltage[i], value_voltage[i]]);
        }
    }

    // Create a new workbook and worksheets
    const workbook = XLSX.utils.book_new();

    // Chart Data Worksheet
    const chartDataWorksheet = XLSX.utils.aoa_to_sheet([
        ['Time', 'Voltage'],
        ...chartLabels.map((label, index) => [label, chartData[index]])
    ]);
    XLSX.utils.book_append_sheet(workbook, chartDataWorksheet, 'Chart Data');

    // Historical Data Worksheet
    const historyDataWorksheet = XLSX.utils.aoa_to_sheet([
        ['Time', 'Voltage'],
        ...historyData
    ]);
    XLSX.utils.book_append_sheet(workbook, historyDataWorksheet, 'Historical Data');

    // Save the workbook
    XLSX.writeFile(workbook, 'VoltageData.xlsx');
}

// Add an event listener to the export button (assuming there's a button with id 'export-button')
document.getElementById('export-button').addEventListener('click', exportToExcel);


// ----------------------------------------------------ĐIỆN ÁP------------------------------------------------------------------
    var opts_voltage = {
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
    
    var voltage = document.getElementById('chart-voltage').getContext('2d');
    var chart_voltage = new Chart(voltage, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Voltage',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
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
                    max: 400,
                    ticks: {
                        stepSize: 50
                    }
                }
            }
        }
    });
    
    var content_row_voltage = document.querySelectorAll(".content-row-voltage");
    var time_voltage = [];
    var value_voltage = [];
    var j = 0;
    var voltage_out = 0;

    
    // Đảm bảo rằng setInterval chỉ được tạo một lần
    var chartIntervalvoltage, historyIntervalvoltage;
        database.ref("monitor/voltage").on("value", function (snapshot) {
    //         //----------------------------- Gauge ----------------------------
            voltage_out = snapshot.val();
            document.getElementById("voltage").innerHTML = voltage_out + " V";
            
            //----------------------------- Chart ----------------------------
            // Cập nhật biểu đồ ngay lập tức khi có dữ liệu mới
            updateChartvoltage(voltage_out);
            //----------------------------- Table ----------------------------
            // Cập nhật dữ liệu lịch sử ngay lập tức khi có dữ liệu mới
            updateHistoryDatavoltage(voltage_out);
        });
           function updateChartvoltage(voltage_out){
                var time = new Date().toLocaleTimeString();
                const data = getArr(chart_voltage.data.datasets[0].data, voltage_out);
                const labels = getArr(chart_voltage.data.labels, time);
                chart_voltage.data.labels = labels
                chart_voltage.data.datasets[0].data = data
                chart_voltage.update();
           }
            
    //         
    
           function updateHistoryDatavoltage(voltage_out){
                var time_now = new Date();
                if (j <= 8) {
                    time_voltage[j] = time_now.getHours() + ":" + time_now.getMinutes() + ":" + time_now.getSeconds();
                    value_voltage[j] = voltage_out;
                    j++;
                }
                else {
                    time_voltage[0] = time_voltage[1];
                    value_voltage[0] = value_voltage[1];
                    time_voltage[1] = time_voltage[2];
                    value_voltage[1] = value_voltage[2];
                    time_voltage[2] = time_voltage[3];
                    value_voltage[2] = value_voltage[3];
                    time_voltage[3] = time_voltage[4];
                    value_voltage[3] = value_voltage[4];
                    time_voltage[4] = time_voltage[5];
                    value_voltage[4] = value_voltage[5];
                    time_voltage[5] = time_voltage[6];
                    value_voltage[5] = value_voltage[6];
                    time_voltage[6] = time_voltage[7];
                    value_voltage[6] = value_voltage[7];
                    time_voltage[7] = time_voltage[8];
                    value_voltage[7] = value_voltage[8];
                    time_voltage[8] = time_now.getHours() + ":" + time_now.getMinutes() + ":" + time_now.getSeconds();
                    value_voltage[8] = voltage_out;
                }
                content_row_voltage[2].innerHTML = time_voltage[0];
                content_row_voltage[3].innerHTML = value_voltage[0] + " V";
                content_row_voltage[4].innerHTML = time_voltage[1];
                content_row_voltage[5].innerHTML = value_voltage[1] + " V";
                content_row_voltage[6].innerHTML = time_voltage[2];
                content_row_voltage[7].innerHTML = value_voltage[2] + " V";
                content_row_voltage[8].innerHTML = time_voltage[3];
                content_row_voltage[9].innerHTML = value_voltage[3] + " V";
                content_row_voltage[10].innerHTML = time_voltage[4];
                content_row_voltage[11].innerHTML = value_voltage[4] + " V";
                content_row_voltage[12].innerHTML = time_voltage[5];
                content_row_voltage[13].innerHTML = value_voltage[5] + " V";
                content_row_voltage[14].innerHTML = time_voltage[6];
                content_row_voltage[15].innerHTML = value_voltage[6] + " V";
                content_row_voltage[16].innerHTML = time_voltage[7];
                content_row_voltage[17].innerHTML = value_voltage[7] + " V";
                content_row_voltage[18].innerHTML = time_voltage[8];
                content_row_voltage[19].innerHTML = value_voltage[8] + " V";
            }
                // Bắt đầu cập nhật biểu đồ mỗi giây nếu chưa có
            if (!chartIntervalvoltage) {
                chartInterval = setInterval(() => {
                    updateChartvoltage(voltage_out);
                }, 1000);
            }
    
            // Bắt đầu cập nhật dữ liệu lịch sử mỗi giây nếu chưa có
            if (!historyIntervalvoltage) {
                historyInterval = setInterval(() => {
                    updateHistoryDatavoltage(voltage_out);
                }, 1000);
            }


    