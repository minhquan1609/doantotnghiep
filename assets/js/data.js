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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var database = firebase.database();

//KHOA TRANG THAI BAN DAU KHONG CHO DIEU KHIEN
disableButtons();
//
disablebuttonmotor();
//
disableUpdatebypass();
disableUpdatebuttonbypass();
//
disableupdateSetpointfreq();
disableupdatebuttonSetpointfreq();
//
disableupdatebuttonSetpointmaxpress();
disableupdateSetpointmaxpress();
//
disableupdateSetpointpressfilter();
disableupdatebuttonSetpointpressfilter();

firebase.database().ref("control/van01").set(0);
firebase.database().ref("control/van02").set(0);
firebase.database().ref("control/bypass").set(0);
firebase.database().ref("control/freq").set(0);
firebase.database().ref("control/motor").set(1);

firebase.database().ref("control/a01").set(1);
firebase.database().ref("control/a02").set(1);
firebase.database().ref("control/d01").set(1);
firebase.database().ref("control/d02").set(1);

firebase.database().ref("control/manual off auto").set(0);

// KHAI BAO CAC NUT NHAN CHE DO DIEU KHIEN
var onButton = document.getElementById("on-button");
var autoButton = document.getElementById("auto-button");
var manualButton = document.getElementById("manual-button");
var offButton = document.getElementById("off-button");

// KHAI BAO BIEN DIEU KHIEN
var freqRefcontrol = firebase.database().ref('control/freq');
var bypassRefcontrol = firebase.database().ref('control/bypass');
var van01Refcontrol = firebase.database().ref('control/van01');
var van02Refcontrol = firebase.database().ref('control/van02');
var motorRefcontrol = firebase.database().ref('control/motor');
//
var a01Ref = firebase.database().ref('control/a01');
var a02Ref = firebase.database().ref('control/a02');
var d01Ref = firebase.database().ref('control/d01');
var d02Ref = firebase.database().ref('control/d02');
var MOARef = firebase.database().ref('control/manual off auto');

//KHAI BAO ANIMATION
var animation11 = document.getElementById('line-1-1');
var animation12 = document.getElementById('line-1-2');
var animation13 = document.getElementById('line-1-3');
//
var animation14 = document.getElementById('line-1-4');
var animation15 = document.getElementById('line-1-5');
var animation161 = document.getElementById('line-1-6-1');
var animation162 = document.getElementById('line-1-6-2');
//
var animation31 = document.getElementById('line-3-1');
var animation321 = document.getElementById('line-3-2-1');
var animation322 = document.getElementById('line-3-2-2');
var animation323 = document.getElementById('line-3-2-3');
var animation33 = document.getElementById('line-3-3');
var animation341 = document.getElementById('line-3-4-1');
//
var animation36 = document.getElementById('line-3-6');
var animation37 = document.getElementById('line-3-7');
var animation38 = document.getElementById('line-3-8');
//
var animation39 = document.getElementById('line-3-9');
var animation310 = document.getElementById('line-3-10');

//KHAI BAO AM THANH CANH BAO
var alertSound = document.getElementById('alertSound');

// KHAI BÁO 2 BIẾN NHIỆT ĐỘ HIỂN THỊ VÀ SETPOINT HIỂN THỊ ĐỂ THỰC HIÊN SO SÁNH
var setpointReftemphienthi = firebase.database().ref("setpoint");
var pressmaxRefhienthi = firebase.database().ref("monitor/pressmax");
var diffpressmaxRefhienthi = firebase.database().ref("monitor/diffpressmax");

// KHAI BAO THONG SO CAM BIEN GIAM SAT
var temp = document.getElementById('temperature');
var templab = firebase.database().ref('monitor/temp');

var humid = document.getElementById('humidity'); 
var humidlab = firebase.database().ref('monitor/humid'); 

var tempout = document.getElementById('temperature-out'); 
var tempoutchiller = firebase.database().ref('monitor/tempout'); 

var tempin = document.getElementById('temperature-in'); 
var tempinchiller = firebase.database().ref('monitor/tempin'); 

var pressout = document.getElementById('pressure-out'); 
var pressoutchiller = firebase.database().ref('monitor/pressout'); 

var pressin = document.getElementById('pressure-in'); 
var pressinchiller = firebase.database().ref('monitor/pressin'); 

var diffpress = document.getElementById('diffpress'); 
var diffpressahu = firebase.database().ref('monitor/diffpress');

// KHAI BAO THONG SO BIEN TAN GIAM SAT
var freq = document.getElementById('freq-monitor'); 
var freqmotor = firebase.database().ref('monitor/freq');

var speed = document.getElementById('speed'); 
var speedmotor = firebase.database().ref('monitor/speed');

var current = document.getElementById('current'); 
var currentmotor = firebase.database().ref('monitor/current');

var voltage = document.getElementById('voltage'); 
var voltagemotor = firebase.database().ref('monitor/voltage');

// GIAM SAT VAN01/VAN02 VA DONG CO
//VAN01
var lightvan01 = document.getElementById("light-van01");
var lightvan01Ref = firebase.database().ref("monitor/van01");

lightvan01Ref.on("value", (snapshot) => {
    var lightStatusvan01 = snapshot.val();
    if (lightStatusvan01 === 0) {
        lightvan01.style.backgroundColor = "red";
    } else if (lightStatusvan01 === 1) {
        lightvan01.style.backgroundColor = "green";
    }
});

//VAN02
var lightvan02 = document.getElementById("light-van02");
var lightvan02Ref = firebase.database().ref("monitor/van02");

lightvan02Ref.on("value", (snapshot) => {
    var lightStatusvan02 = snapshot.val();
    if (lightStatusvan02 === 0) {
        lightvan02.style.backgroundColor = "red";
    } else if (lightStatusvan02 === 1) {
        lightvan02.style.backgroundColor = "green";
    }
});

//DONG CO
var lightmotor = document.getElementById("motor");
var lightmotorRef = firebase.database().ref("control/motor");

lightmotorRef.on("value", (snapshot) => {
    var lightStatusmotor = snapshot.val();
    if (lightStatusmotor === 1) {
        lightmotor.style.backgroundColor = "red";
    } else if (lightStatusmotor === 2) {
        lightmotor.style.backgroundColor = "green";
    }
});


var vanbypass = document.getElementById('display-value-bypass');
var vanbypassRefmonitor = firebase.database().ref('monitor/bypass');

//ĐẨY DỮ LIỆU SETPOINT LÊN FIREBASE SAU KHI NHẤN UPDATE VÀ THỰC THI CHẾ ĐỘ AUTOMATION
// function updatetemperatureFirebase() {
//     var setpointValuetemphienthi = document.getElementById("setpoint").value;
//     firebase.database().ref("setpoint").set(setpointValuetemphienthi);
//     alert('Update thành công.');
// }

function updatetemperatureFirebase() {
    var setpointValuetemphienthi = document.getElementById("setpoint").value;
    var setpointNumber = parseFloat(setpointValuetemphienthi); // Chuyển đổi giá trị thành số (Number)
    firebase.database().ref("setpoint").set(setpointNumber);
    alert('Update thành công.');
}


///// LẤY GIÁ TRỊ SETPOINT TỪ FIREBASE VỀ HIỂN THỊ TRÊN WEB
function updateSetpointDisplay(value) {
    var setpointElement = document.getElementById("setpoint");
    setpointElement.value = value;
}
//ĐƯA DỮ LIỆU SETPOINT TỪ FIREBASE VỀ HIỂN THỊ TRÊN KHUNG SETPOINT NHIỆT ĐỘ
firebase.database().ref("setpoint").on("value", (snapshot) => {
    var setpointValuetemphienthi = snapshot.val();
    updateSetpointDisplay(setpointValuetemphienthi);
});


//////////HAM FUNCTION XU LY DIEU KHIEN/////////
// //HÀM FUNCTION ON/OFF ĐỘNG CƠ
function disablebuttonmotor() {
    document.getElementById("toggleButton-3").disabled = true;
}
function enablebuttonmotor() {
    document.getElementById("toggleButton-3").disabled = false;
}
/////////////////////////////////////////////////////////////////////////////////////////////
//HÀM FUNCTION ĐIỀU KHIỂN VAN ĐIỆN
function disableButtons() {
    document.getElementById("toggleButton-1").disabled = true;
    document.getElementById("toggleButton-2").disabled = true;
}
function enableButtons() {
    document.getElementById("toggleButton-1").disabled = false;
    document.getElementById("toggleButton-2").disabled = false;
}
////////////////////////////////////////////////////////////////////////////////////////////
//HÀM FUNCTION ĐIỀU KHIỂN VAN-BYPASS
function disableUpdatebypass() {
    document.getElementById("bypass").disabled = true;
}
function enableUpdatebypass() {
    document.getElementById("bypass").disabled = false;
}
//HÀM FUNCTION UPDATE BUTTON BYPASS
function disableUpdatebuttonbypass() {
    document.getElementById("update-setpoint").disabled = true;
}
function enableUpdatebuttonbypass() {
    document.getElementById("update-setpoint").disabled = false;
}
/////////////////////////////////////////////////////////////////////////////////////////
//HÀM FUNCTION ENABLE/DISABLE GIÁ TRỊ TẦN SỐ
function disableupdateSetpointfreq() {
    document.getElementById("freq-control").disabled = true;
}
function enableupdateSetpointfreq() {
    document.getElementById("freq-control").disabled = false;
}
//HÀM FUNCTION UPDATE BUTTON FREQ
function disableupdatebuttonSetpointfreq() {
    document.getElementById("update-setpoint-freq-control").disabled = true;
}
function enableupdatebuttonSetpointfreq() {
    document.getElementById("update-setpoint-freq-control").disabled = false;
}
/////////////////////////////////////////////////////////////////////////////////////////////
//HÀM FUNCTION ENABLE/DISABLE GIÁ TRỊ MIN/MAX PRESSURE
function disableupdateSetpointmaxpress() {
    document.getElementById("pressure-out-max").disabled = true;
}
function enableupdateSetpointmaxpress() {
    document.getElementById("pressure-out-max").disabled = false;
}
//HÀM FUNCTION UPDATE BUTTON MIN/MAX GIẢ LẬP SỰ CỐ

function disableupdatebuttonSetpointmaxpress() {
    document.getElementById("update-setpoint-max-pressure").disabled = true;
}
function enableupdatebuttonSetpointmaxpress() {
    document.getElementById("update-setpoint-max-pressure").disabled = false;
}
////////////////////////////////////////////////////////////////////////////////////////////
//HÀM FUNCTION ENABLE/DISABLE GIÁ TRỊ PRESSURE FILTER
function disableupdateSetpointpressfilter() {
    document.getElementById("diffpressure-max").disabled = true;
}
function enableupdateSetpointpressfilter() {
    document.getElementById("diffpressure-max").disabled = false;
}
//HÀM FUNCTION UPDATE BUTTON PRESSURE FILTER
function disableupdatebuttonSetpointpressfilter() {
    document.getElementById("update-setpoint-max-diffpressure").disabled = true;
}
function enableupdatebuttonSetpointpressfilter() {
    document.getElementById("update-setpoint-max-diffpressure").disabled = false;
}
/////////////////////////////////////////////////////////////////////////////////////////////
//HAM FUNCTION ANIMATION DONG CHAY DUONG ONG
//ANIMATION VAN01
function showAnimationvan01() {
    animation161.style.display = 'block';
    animation162.style.display = 'block';
    animation14.style.display = 'block';
    animation15.style.display = 'block';
}
function hideAnimationvan01() {
    animation161.style.display = 'none';
    animation162.style.display = 'none';
    animation14.style.display = 'none';
    animation15.style.display = 'none';
}
//ANIMATION VAN02
function showAnimationvan02() {
    animation341.style.display = 'block';
    animation31.style.display = 'block';
    animation321.style.display = 'block';
    animation322.style.display = 'block';
    animation323.style.display = 'block';
    animation33.style.display = 'block';
}
function hideAnimationvan02() {
    animation341.style.display = 'none';
    animation31.style.display = 'none';
    animation321.style.display = 'none';
    animation322.style.display = 'none';
    animation323.style.display = 'none';
    animation33.style.display = 'none';
}
//ANIMATION BYPASS
function showAnimationbypass() {
    animation39.style.display = 'block';
    animation310.style.display = 'block';
}
function hideAnimationbypass() {
    animation39.style.display = 'none';
    animation310.style.display = 'none';
}
//HAM FUNCTION THUC HIEN CANH BAO DO BAN FILTER  
function checkdirtyfilter() {
    diffpressmaxRefhienthi.on("value", (diffpressmaxsnapshot) => {
        var diffpressmaxValuehienthi = diffpressmaxsnapshot.val();

    diffpressahu.on("value", (diffpresssnapshot) => {
        var diffpressValuehienthi = diffpresssnapshot.val();
            //****************************** CANH BAO GIA LAP SU CO TUI LOC BAN ************************************
            var indicator2 = document.getElementById('indicator2');
            var dirtyFilterMessage = document.getElementById('dirtyFilterMessage');
            indicator2.classList.remove('fade');
            dirtyFilterMessage.classList.remove('fade');
            dirtyFilterMessage.style.display = 'none';

            if (diffpressmaxValuehienthi > diffpressValuehienthi) {
                indicator2.style.backgroundColor = 'green';
                // alertSound.pause();
                // alertSound.currentTime = 0;

            } else if (diffpressmaxValuehienthi < diffpressValuehienthi) {
                indicator2.style.backgroundColor = 'red';
                indicator2.classList.add('fade');

                dirtyFilterMessage.style.display = 'block';
                dirtyFilterMessage.classList.add('blink');
                // indicator2.classList.add('blink');
                // alertSound.play();
            }
        });
    });
}

//HAM FUNCTION THUC HIEN KIEM TRA SU CO DUONG ONG
function checkpipelinepressure() {
    pressoutchiller.on("value", (pressoutsnapshot) => {
        var pressoutvaluechiller = pressoutsnapshot.val();
    
        pressmaxRefhienthi.on("value", (maxSnapshot) => {
            var pressmaxRefvaluehienthi = maxSnapshot.val();

            // if (pressmaxRefvaluehienthi > pressoutvaluechiller) {
            //     bypassRefcontrol.set(0);
            // }
            // if (pressmaxRefvaluehienthi < pressoutvaluechiller) {
            //     bypassRefcontrol.set(100);
            // }

            //****************************** CANH BAO GIA LAP SU CO DUONG ONG ************************************
            var indicator1 = document.getElementById('indicator1');
            indicator1.classList.remove('fade');

            if (pressoutvaluechiller < pressmaxRefvaluehienthi) {
                indicator1.style.backgroundColor = 'green';
                alertSound.pause();
                alertSound.currentTime = 0;

            } else if (pressoutvaluechiller > pressmaxRefvaluehienthi) {
                indicator1.style.backgroundColor = 'red';
                indicator1.classList.add('fade');
                if (alertSound.paused) {
                    alertSound.play();
                }
                alertSound.onended = function() {
                    if (pressmaxRefvaluehienthi < pressoutvaluechiller) {
                        alertSound.play();
                    }
                };
            }
        });
    });
}

//CHUYEN TU TRANG THAI AUTO SANG MAN CHO 2 VAN-01 VA VAN-02
function checkAndControlmanual() {
    lightvan01Ref.on('value', function(snapshot) {
        var monitorValVan01 = snapshot.val();
        if (monitorValVan01 === 1) {
            van01Refcontrol.set(1);
        } else {
            van01Refcontrol.set(0);
        }
      });
    
    lightvan02Ref.on('value', function(snapshot) {
        var monitorValVan02 = snapshot.val();
        if (monitorValVan02 === 1) {
            van02Refcontrol.set(1);
        } else {
            van02Refcontrol.set(0);
        }
      });
}

//CHUYEN TRANG THAI MANUAL SANG AUTOMATION CHO DIEU KHIEN TAN SO
function checkAndControlfreqfrommantoauto() {
    freqmotor.on('value', function(snapshot) {
        var freqmanual = snapshot.val();
        freqRefcontrol.set(freqmanual);
    });
}

//ANIMATION VAN01
function amimationvan01() {
    lightvan01Ref.on('value', (snapshot) => {
        const value = snapshot.val();
        if (value === 1) {
          showAnimationvan01();
        } else if (value === 0) {
          hideAnimationvan01();        
        }
    });
}

function amimationvan02() {
    lightvan02Ref.on('value', (snapshot) => {
        const value = snapshot.val();
        if (value === 1) {
          showAnimationvan02();
        } else if (value === 0) {
          hideAnimationvan02();
        }
    });
}

function amimationvanbypass() {
    const validValues = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

    vanbypassRefmonitor.on('value', (snapshot) => {
        const value = snapshot.val();
        if (validValues.includes(value)) {
            showAnimationbypass();
        } else if (value === 0) {
            hideAnimationbypass();
        }
    });
}



//HAM FUNCTION THUC HIEN CHE DO AUTOMATION
let isFirstComparison = true;
//
function checkAndControl() {

    templab.on("value", (tempsnapshot) => {
    var tempValuehienthi = tempsnapshot.val();

    setpointReftemphienthi.on("value", (setpointsnapshot) => {
    var setpointValuehienthi = setpointsnapshot.val();

    // Display appropriate message based on temperature comparison
    var messageElement = document.createElement("p");

        if (tempValuehienthi > setpointValuehienthi) {            
            enableupdatebuttonSetpointmaxpress();            
            enableupdateSetpointmaxpress();          
            // checkpipelinepressure();

            //********************ANIMATION AHU***********************
            setTimeout(() => {
            document.getElementById('quatlitam-nhanh').style.display = 'block';
            document.getElementById('quatlitam-cham').style.display = 'none'; // Ẩn phần tử không phù hợp
            }, 5000);
            //
            setTimeout(() => {
            document.getElementById('hot-fast-1').style.display = 'block';
            }, 10000);    
            setTimeout(() => {
            document.getElementById('hot-fast-2').style.display = 'block';
            }, 11000);   
            setTimeout(() => {    
            document.getElementById('cool-fast-1').style.display = 'block';
            }, 12000);   
            setTimeout(() => {
            document.getElementById('cool-fast-2').style.display = 'block';
            }, 13000);  
            document.getElementById('cool-slow-1').style.display = 'none';
            document.getElementById('cool-slow-2').style.display = 'none';
            document.getElementById('hot-slow-1').style.display = 'none';
            document.getElementById('hot-slow-2').style.display = 'none';

            //********************CANH BAO NHIET DO***************************
            messageElement.textContent = "High Temperature";
            messageElement.classList.add("high");
            setInterval(() => {
                var visibility = messageElement.style.visibility;
                messageElement.style.visibility = visibility === "hidden" ? "visible" : "hidden";
            }, 500); // Change the interval as needed
            
        } else {          
            disableupdatebuttonSetpointmaxpress();          
            disableupdateSetpointmaxpress();
            
            //**************************ANIMATION AHU ******************************
            setTimeout(() => {
            document.getElementById('quatlitam-cham').style.display = 'block';
            document.getElementById('quatlitam-nhanh').style.display = 'none'; // Ẩn phần tử không phù hợp
            }, 5000);
            setTimeout(() => {
            document.getElementById('hot-slow-1').style.display = 'block';
            }, 6000);    
            setTimeout(() => {
            document.getElementById('hot-slow-2').style.display = 'block';
            }, 7000);   
            setTimeout(() => {    
            document.getElementById('cool-slow-1').style.display = 'block';
            }, 8000);   
            setTimeout(() => {
            document.getElementById('cool-slow-2').style.display = 'block';
            }, 9000);  
            document.getElementById('cool-fast-1').style.display = 'none';
            document.getElementById('cool-fast-2').style.display = 'none';
            document.getElementById('hot-fast-1').style.display = 'none';
            document.getElementById('hot-fast-2').style.display = 'none';


            //----------------------THONG BAO NHIET DO LY TUONG----------------------------------
            messageElement.textContent = "Ideal Temperature";
            messageElement.classList.add("ideal");

        }

        // Remove any existing messages before adding the new one
        var existingMessages = document.querySelectorAll(".message1");
        existingMessages.forEach((msg) => msg.remove());
        // Append the new message
        messageElement.classList.add("message1");
        document.body.appendChild(messageElement);
        });
    });
}

// Ban đầu, không lắng nghe dữ liệu
let isListening = false;

//----------------------------------- CHẾ ĐỘ ON  ----------------------------------------//
onButton.addEventListener("click", function() {

    // Hiển thị nút "Auto" và "Manual"
    autoButton.style.display = "inline-block";
    manualButton.style.display = "inline-block";

    if (!isListening) {
        // Bắt đầu lắng nghe dữ liệu Firebase
        templab.on('value', function(snapshot) {
            const data = snapshot.val();
            // Xử lý và hiển thị dữ liệu
            temp.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        });

        humidlab.on('value', function(snapshot) {
            const data = snapshot.val();
            // Xử lý và hiển thị dữ liệu
            humid.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        });

        tempoutchiller.on('value', function(snapshot) {
            const data = snapshot.val();
            // Xử lý và hiển thị dữ liệu
            tempout.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        });

        tempinchiller.on('value', function(snapshot) {
            const data = snapshot.val();
            // Xử lý và hiển thị dữ liệu
            tempin.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        });

        pressinchiller.on('value', function(snapshot) {
            const data = snapshot.val();
            // Xử lý và hiển thị dữ liệu
            pressin.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        });

        pressoutchiller.on('value', function(snapshot) {
            const data = snapshot.val();
            // Xử lý và hiển thị dữ liệu
            pressout.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        });

        diffpressahu.on('value', function(snapshot) {
            const data = snapshot.val();
            // Xử lý và hiển thị dữ liệu
            diffpress.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        });

        freqmotor.on('value', function(snapshot) {
            const data = snapshot.val();
            // Xử lý và hiển thị dữ liệu
            freq.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        });

        firebase.database().ref('monitor/speed').on('value', function(snapshot) {
            const data = snapshot.val();
            // Xử lý và hiển thị dữ liệu
            document.getElementById('speed').innerHTML = data;
        })

        firebase.database().ref('monitor/current').on('value', function(snapshot) {
            const data = snapshot.val();
            document.getElementById('current').innerHTML = data;
        });

        firebase.database().ref('monitor/voltage').on('value', function(snapshot) {
            const data = snapshot.val();
            // Xử lý và hiển thị dữ liệu
            document.getElementById('voltage').innerHTML = data;
        });


        // speedmotor.on('value', function(snapshot) {
        //     const data = snapshot.val();
        //     // Xử lý và hiển thị dữ liệu
        //     speed.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        // });

        // currentmotor.on('value', function(snapshot) {
        //     const data = snapshot.val();
        //     // Xử lý và hiển thị dữ liệu
        //     current.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        // });

        // voltagemotor.on('value', function(snapshot) {
        //     const data = snapshot.val();
        //     // Xử lý và hiển thị dữ liệu
        //     voltage.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        // });

        vanbypassRefmonitor.on('value', function(snapshot) {
            const data = snapshot.val();
            // Xử lý và hiển thị dữ liệu
            vanbypass.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        });

        // Thay đổi trạng thái lắng nghe
        isListening = true;
    }
    
    onButton.style.backgroundColor = "#00CC00";
    autoButton.style.backgroundColor = "gray";
    manualButton.style.backgroundColor = "gray";
    offButton.style.backgroundColor = "gray";
    setpointContainer.style.display = "none";

    bypassRefcontrol.set(100); 

    disableButtons();
    disableUpdatebypass();
    disableUpdatebuttonbypass();
    disableupdateSetpointfreq();
    disableupdatebuttonSetpointfreq();
    disableupdateSetpointmaxpress();
    disableupdatebuttonSetpointmaxpress();
    checkdirtyfilter();
    enableupdateSetpointpressfilter();
    enableupdatebuttonSetpointpressfilter();
    enablebuttonmotor();
    motorRefcontrol.set(2);

    freqRefcontrol.set(20);
    bypassRefcontrol.set(100);

    animation11.style.display = 'block';
    animation12.style.display = 'block';
    animation13.style.display = 'block';
    animation36.style.display = 'block';
    animation37.style.display = 'block';
    animation38.style.display = 'block';
    showAnimationbypass();

    // Lưu trạng thái "ON" vào Firebase
    // database.ref("monitor/voltage").set({
    //     isOn: true,
    //     timestamp: new Date().getTime() // lưu lại thời gian bắt đầu
    // });
    // offRef.set(1);
});

//--------------------------------------  CHẾ ĐỘ OFF ---------------------------------------//    
offButton.addEventListener("click", function() {

    // Hiển thị nút "Auto" và "Manual"
    autoButton.style.display = "none";
    manualButton.style.display = "none";

    if (isListening) {
        templab.off(); // Ngừng lắng nghe dữ liệu
        temp.innerHTML = ''; // Xóa dữ liệu hiển thị

        humidlab.off(); // Ngừng lắng nghe dữ liệu
        humid.innerHTML = ''; // Xóa dữ liệu hiển thị

        tempoutchiller.off(); // Ngừng lắng nghe dữ liệu
        tempout.innerHTML = ''; // Xóa dữ liệu hiển thị

        tempinchiller.off(); // Ngừng lắng nghe dữ liệu
        tempin.innerHTML = ''; // Xóa dữ liệu hiển thị

        pressinchiller.off(); // Ngừng lắng nghe dữ liệu
        pressin.innerHTML = ''; // Xóa dữ liệu hiển thị

        pressoutchiller.off(); // Ngừng lắng nghe dữ liệu
        pressout.innerHTML = ''; // Xóa dữ liệu hiển thị

        diffpressahu.off(); // Ngừng lắng nghe dữ liệu
        diffpress.innerHTML = ''; // Xóa dữ liệu hiển thị

        freqmotor.off(); // Ngừng lắng nghe dữ liệu
        freq.innerHTML = ''; // Xóa dữ liệu hiển thị

        firebase.database().ref('monitor/speed').off(); // Ngừng lắng nghe dữ liệu
        document.getElementById('speed').innerHTML = ''; // Xóa dữ liệu hiển thị

        firebase.database().ref('monitor/current').off(); // Ngừng lắng nghe dữ liệu
        document.getElementById('current').innerHTML = ''; // Xóa dữ liệu hiển thị

        firebase.database().ref('monitor/voltage').off(); // Ngừng lắng nghe dữ liệu
        document.getElementById('voltage').innerHTML = ''; // Xóa dữ liệu hiển thị

        vanbypassRefmonitor.off(); // Ngừng lắng nghe dữ liệu
        vanbypass.innerHTML = ''; // Xóa dữ liệu hiển thị

        isListening = false;
    }
    
    // alert('Dừng hệ thống');
    autoButton.style.backgroundColor = "gray";
    onButton.style.backgroundColor = "gray";
    manualButton.style.backgroundColor = "gray";
    offButton.style.backgroundColor = "rgb(255, 0, 0)";
    setpointContainer.style.display = "none";

    disableButtons();
    disableUpdatebypass();
    disableupdateSetpointfreq();
    disableupdateSetpointmaxpress();
    disableupdatebuttonSetpointmaxpress();
    disableupdateSetpointpressfilter();
    disableupdatebuttonSetpointpressfilter();
    bypassRefcontrol.set(100); 
    van01Refcontrol.set(0);
    van02Refcontrol.set(0);
    freqRefcontrol.set(0);
    motorRefcontrol.set(1);

    a01Ref.set(1);
    a02Ref.set(1);
    d01Ref.set(1);
    d02Ref.set(1);
    MOARef.set(0);

    document.getElementById('hot-slow-1').style.display = 'none';
    document.getElementById('hot-slow-2').style.display = 'none';
    document.getElementById('cool-slow-1').style.display = 'none';
    document.getElementById('cool-slow-2').style.display = 'none';
    document.getElementById('hot-fast-1').style.display = 'none';
    document.getElementById('hot-fast-2').style.display = 'none';
    document.getElementById('cool-fast-1').style.display = 'none';
    document.getElementById('cool-fast-2').style.display = 'none';
});

//------------------------------------CHE DO AUTOMATION---------------------------------------------//
    autoButton.addEventListener("click", function() {
    autoButton.style.backgroundColor = "#0099FF";
    onButton.style.backgroundColor = "#00CC00";
    manualButton.style.backgroundColor = "gray";
    offButton.style.backgroundColor = "gray";
    setpointContainer.style.display = "block"; // Hiển thị khung setpoint
   
    disableButtons();
    enablebuttonmotor();
    disableUpdatebypass();
    disableUpdatebuttonbypass();
    disableupdateSetpointfreq();
    disableupdatebuttonSetpointfreq();

    checkAndControl();
    checkpipelinepressure();
    checkdirtyfilter();
    canhbaodoam();
    checkAndControlfreqfrommantoauto();
    // checkAndControlmanual();

    a01Ref.set(0);
    a02Ref.set(35);
    d01Ref.set(0);
    d02Ref.set(0);
    MOARef.set(1)
    // motorRefcontrol.set(2);

    amimationvan01();
    amimationvan02();
    amimationvanbypass();
});

//-----------------------------------------------CHE DO MANUAL-------------------------------------------//
manualButton.addEventListener("click", function() {
    autoButton.style.backgroundColor = "gray";
    onButton.style.backgroundColor = "#00CC00";
    manualButton.style.backgroundColor = "#0099FF";
    offButton.style.backgroundColor = "gray";
    setpointContainer.style.display = "none";

    a01Ref.set(1);
    a02Ref.set(1);
    d01Ref.set(1);
    d02Ref.set(1);
    MOARef.set(2)
    
    enableButtons();
    enablebuttonmotor();
    enableUpdatebypass();
    enableUpdatebuttonbypass();
    enableupdateSetpointfreq();
    enableupdatebuttonSetpointfreq();
    enableupdateSetpointmaxpress();
    enableupdatebuttonSetpointmaxpress();

    // disableupdateSetpointmaxpress();
    // disableupdatebuttonSetpointmaxpress();

    checkdirtyfilter();
    // canhbaodoamvanhietdo_manual();
    checkAndControlmanual();
    // motorRefcontrol.set(2);
    checkpipelinepressure();

    amimationvan01();
    amimationvan02();
    amimationvanbypass();
});

//----------------------------- Hàm cập nhật giá trị tần số lên Firebase----------------------------
function updateSetpointfreq() {
    const freqValue = document.getElementById('freq-control').value;

    if (freqValue >= 1 && freqValue <= 50) {
      firebase.database().ref('control/freq').set(Number(freqValue))
        .then(() => {           
            if (freqValue < 25) {
                //**************************ANIMATION AHU ******************************
                setTimeout(() => {
                document.getElementById('quatlitam-cham').style.display = 'block';
                document.getElementById('quatlitam-nhanh').style.display = 'none'; // Ẩn phần tử không phù hợp
                }, 3000);
                setTimeout(() => {
                document.getElementById('hot-slow-1').style.display = 'block';
                }, 4000);    
                setTimeout(() => {
                document.getElementById('hot-slow-2').style.display = 'block';
                }, 5000);   
                setTimeout(() => {    
                document.getElementById('cool-slow-1').style.display = 'block';
                }, 6000);   
                setTimeout(() => {
                document.getElementById('cool-slow-2').style.display = 'block';
                }, 7000);  
                document.getElementById('cool-fast-1').style.display = 'none';
                document.getElementById('cool-fast-2').style.display = 'none';   
                document.getElementById('hot-fast-1').style.display = 'none';
                document.getElementById('hot-fast-2').style.display = 'none';
            } else {
                //********************ANIMATION AHU***********************
                setTimeout(() => {
                document.getElementById('quatlitam-nhanh').style.display = 'block';
                // document.getElementById('quatlitam-cham').style.display = 'none'; // Ẩn phần tử không phù hợp
                }, 3000);
                setTimeout(() => {
                document.getElementById('hot-fast-1').style.display = 'block';
                }, 4000);    
                setTimeout(() => {
                document.getElementById('hot-fast-2').style.display = 'block';
                }, 5000);   
                setTimeout(() => {    
                document.getElementById('cool-fast-1').style.display = 'block';
                }, 6000);   
                setTimeout(() => {
                document.getElementById('cool-fast-2').style.display = 'block';
                }, 7000);  
                // document.getElementById('cool-slow-1').style.display = 'none';
                // document.getElementById('cool-slow-2').style.display = 'none';   
                // document.getElementById('hot-slow-1').style.display = 'none';
                // document.getElementById('hot-slow-2').style.display = 'none';
            }     
        console.log('Setpoint frequency updated successfully.');
        })
        .catch((error) => {
          console.error('Error updating setpoint frequency: ', error);
        });
        alert('Update thành công.');    
    } else {
      alert('Vui lòng nhập giá trị từ 1 đến 50.');
    }
}

// Lấy giá trị tần số firebase về hiển thị ô setpoint tần số trên web
// firebase.database().ref('control/freq').on('value', (snapshot) => {
// const freqValue = snapshot.val();
// document.getElementById('freq-control').value = freqValue;
// });

//------------------------------------------JAVASCRIPT DIEU KHIEN VAN BYPASS--------------------------------------------//
let animationsupdatesetpoint = false;

function updateSetpointbypass() {
    const setpointInputbypass = document.getElementById('bypass');
    const setpointValuebypass = parseInt(setpointInputbypass.value);
    alert('Update thành công.');

    // Update Firebase value
    firebase.database().ref('control/bypass').set(setpointValuebypass);

    // Define the valid setpoint values
    const validSetpointValues = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

    // Show or hide animation based on the setpoint value
    if (validSetpointValues.includes(setpointValuebypass)) {
        animation39.style.display = 'block';
        animation310.style.display = 'block';
    } else if (setpointValuebypass === 0) {
        animation39.style.display = 'none';
        animation310.style.display = 'none';
    }
}

// Listen for changes in Firebase value
// firebase.database().ref('control/bypass').on('value', (snapshot) => {
//     const updatedValuebypass = snapshot.val();
//     document.getElementById('bypass').value = updatedValuebypass;
// });
//HIEN THI LEN WEB
// firebase.database().ref('control/bypass').on('value', (snapshot) => {
//     const updatedValuebypass = snapshot.val();
//     document.getElementById('display-value-bypass').innerText = updatedValuebypass;
// });

///////////////////////////////////////////////JAVASCRIPT DIEU KHIEN ON/OFF VAN-01 VAN-02///////////////////////////////////////////////////
//--------------------------------ĐIỀU KHIỂN VAN 1-------------------------------------------
function toggleState1() {
    var button1 = document.getElementById("toggleButton-1");

    if (button1.classList.contains("on")) {
        button1.classList.remove("on");
        button1.classList.add("off");
        button1.innerText = "OFF";
        van01Refcontrol.set(0); // Đặt giá trị thành 0 (OFF)
    } else {
        button1.classList.remove("off");
        button1.classList.add("on");
        button1.innerText = "ON";
        van01Refcontrol.set(1); // Đặt giá trị thành 1 (ON)
    }
}

var controlvan01 = document.getElementById('van01-control');

van01Refcontrol.on('value', snap => {
    var valuevan01 = snap.val();
    controlvan01.innerText = valuevan01;
    var button1 = document.getElementById("toggleButton-1");

    if (valuevan01 === 0) {
        button1.classList.remove('on');
        button1.classList.add('off');
        button1.innerText = "OFF";
        // hideAnimationvan01();
    } else if (valuevan01 === 1) {
        button1.classList.remove('off');
        button1.classList.add('on');
        button1.innerText = "ON";
        // showAnimationvan01();
    }
});

//---------------------------------ĐIỀU KHIỂN VAN 2-------------------------------------------
function toggleState2() {
    var button2 = document.getElementById("toggleButton-2");

    if (button2.classList.contains("on")) {
        button2.classList.remove("on");
        button2.classList.add("off");
        button2.innerText = "OFF";
        van02Refcontrol.set(0); // Đặt giá trị thành 0 (OFF)
    } else {
        button2.classList.remove("off");
        button2.classList.add("on");
        button2.innerText = "ON";
        van02Refcontrol.set(1); // Đặt giá trị thành 1 (ON)
    }
}

var controlvan02 = document.getElementById('van02-control');

van02Refcontrol.on('value', snap => {
    var valuevan02 = snap.val();
    controlvan02.innerText = valuevan02;
    var button2 = document.getElementById("toggleButton-2");

    if (valuevan02 === 0) {
        button2.classList.remove('on');
        button2.classList.add('off');
        button2.innerText = "OFF";
        // hideAnimationvan02();
    } else if (valuevan02 === 1) {
        button2.classList.remove('off');
        button2.classList.add('on');
        button2.innerText = "ON";
        // showAnimationvan02();
    }
});


//-----------------------------------------ĐIỀU KHIỂN ON/OFF ĐỘNG CƠ-------------------------------------------
function toggleState3() {
    var button3 = document.getElementById("toggleButton-3");
    var motorImage = document.getElementById("quatlitam-stop");

    if (button3.classList.contains("on")) {
        button3.classList.remove("on");
        button3.classList.add("off");
        button3.innerText = "OFF";
        motorRefcontrol.set(1); // Đặt giá trị thành 1 (OFF)
        motorImage.style.display = "block"; // Hide motor image

        //-------------------------SLOW-----------------------
        setTimeout(() => {
            document.getElementById('hot-slow-1').style.display = 'none';
        }, 2000);    
        setTimeout(() => {
                document.getElementById('hot-slow-2').style.display = 'none';
            }, 3000);   
        setTimeout(() => {    
                document.getElementById('cool-slow-1').style.display = 'none';
            }, 4000);   
        setTimeout(() => {
                document.getElementById('cool-slow-2').style.display = 'none';
            }, 5000);

        //-----------------------------FAST--------------------------
        setTimeout(() => {
            document.getElementById('hot-fast-1').style.display = 'none';
        }, 2000);    
        setTimeout(() => {
                document.getElementById('hot-fast-2').style.display = 'none';
            }, 3000);   
        setTimeout(() => {    
                document.getElementById('cool-fast-1').style.display = 'none';
            }, 4000);   
        setTimeout(() => {
                document.getElementById('cool-fast-2').style.display = 'none';
            }, 5000);

    } else {
        button3.classList.remove("off");
        button3.classList.add("on");
        button3.innerText = "ON";
        motorRefcontrol.set(2); // Đặt giá trị thành 2 (ON)
        motorImage.style.display = "none"; // Show motor image

        //----------SLOW-----------
        setTimeout(() => {
            document.getElementById('quatlitam-cham').style.display = 'block';
            }, 1000);  
        setTimeout(() => {
                document.getElementById('hot-slow-1').style.display = 'block';
            }, 2000);    
        setTimeout(() => {
                document.getElementById('hot-slow-2').style.display = 'block';
            }, 3000);   
        setTimeout(() => {    
                document.getElementById('cool-slow-1').style.display = 'block';
            }, 4000);   
        setTimeout(() => {
                document.getElementById('cool-slow-2').style.display = 'block';
            }, 5000);  

        //---------FAST------------
        setTimeout(() => {
            document.getElementById('hot-fast-1').style.display = 'none';
        }, 2000);    
        setTimeout(() => {
                document.getElementById('hot-fast-2').style.display = 'none';
            }, 3000);   
        setTimeout(() => {    
                document.getElementById('cool-fast-1').style.display = 'none';
            }, 4000);   
        setTimeout(() => {
                document.getElementById('cool-fast-2').style.display = 'none';
            }, 5000);
    }
}

var controlmotor = document.getElementById('motor');
var motorImage = document.getElementById("quatlitam-stop");

motorRefcontrol.on('value', snap => {
    var valuemotor = snap.val();
    controlmotor.innerText = valuemotor;
    var button3 = document.getElementById("toggleButton-3");

    if (valuemotor === 1) {
        button3.classList.remove('on');
        button3.classList.add('off');
        button3.innerText = "OFF";
        motorImage.style.display = "block"; // Hide motor image

        //SLOW
        setTimeout(() => {
            document.getElementById('hot-slow-1').style.display = 'none';
        }, 2000);    
        setTimeout(() => {
                document.getElementById('hot-slow-2').style.display = 'none';
            }, 3000);   
        setTimeout(() => {    
                document.getElementById('cool-slow-1').style.display = 'none';
            }, 4000);   
        setTimeout(() => {
                document.getElementById('cool-slow-2').style.display = 'none';
            }, 5000);

        //--------FAST------------
        setTimeout(() => {
            document.getElementById('hot-fast-1').style.display = 'none';
        }, 2000);    
        setTimeout(() => {
                document.getElementById('hot-fast-2').style.display = 'none';
            }, 3000);   
        setTimeout(() => {    
                document.getElementById('cool-fast-1').style.display = 'none';
            }, 4000);   
        setTimeout(() => {
                document.getElementById('cool-fast-2').style.display = 'none';
            }, 5000);
            
    } else if (valuemotor === 2) {
        button3.classList.remove('off');
        button3.classList.add('on');
        button3.innerText = "ON";
        motorImage.style.display = "none"; // Show motor image

        //SLOW
        setTimeout(() => {
            document.getElementById('quatlitam-cham').style.display = 'block';
            }, 1000);  
        setTimeout(() => {
                document.getElementById('hot-slow-1').style.display = 'block';
            }, 2000);    
        setTimeout(() => {
                document.getElementById('hot-slow-2').style.display = 'block';
            }, 3000);   
        setTimeout(() => {    
                document.getElementById('cool-slow-1').style.display = 'block';
            }, 4000);   
        setTimeout(() => {
                document.getElementById('cool-slow-2').style.display = 'block';
            }, 5000);

        //---------FAST------------
        setTimeout(() => {
            document.getElementById('hot-fast-1').style.display = 'none';
        }, 2000);    
        setTimeout(() => {
                document.getElementById('hot-fast-2').style.display = 'none';
            }, 3000);   
        setTimeout(() => {    
                document.getElementById('cool-fast-1').style.display = 'none';
            }, 4000);   
        setTimeout(() => {
                document.getElementById('cool-fast-2').style.display = 'none';
            }, 5000);
    }
});


//----------------------------------------DONG HO THOI GIAN THUC-------------------------------------//
window.onload = setInterval(clock, 1000);
function clock() {
    var d = new Date();
    var date = d.getDate();
    var month = d.getMonth();
    var montharr = ["/1/", "/2/", "/3/", "/4/", "/5/", "/6/", "/7/", "/8/", "/9/", "/10/", "/11/", "/12/"];
    month = montharr[month];
    var year = d.getFullYear();
    var hour = d.getHours().toString().padStart(2, '0'); // Add leading zero
    var min = d.getMinutes().toString().padStart(2, '0'); // Add leading zero
    var sec = d.getSeconds().toString().padStart(2, '0'); // Add leading zero

    document.getElementById("dates").innerHTML = date + "" + month + "" + year;
    document.getElementById("times").innerHTML = hour + ":" + min + ":" + sec;
}

//////////////////////////////////GIẢ LẬP SỰ CỐ ĐƯỜNG ỐNG//////////////////////////////////
// Hàm cập nhật giá trị áp suất min lên Firebase sau khi nhấn update
function updateSetpointPressmin() {
    const pressminValue = document.getElementById('pressure-out-min').value;
    // if (pressminValue >= 0 && pressminValue <= 10) {
    firebase.database().ref('monitor/pressmin').set(Number(pressminValue))
    .then(() => {
        console.log('Setpoint frequency updated successfully.');
    })
    .catch((error) => {
        console.error('Error updating setpoint frequency: ', error);
    });
    alert('Update thành công.');
    // } else {
    //     alert('Vui lòng nhập giá trị từ 1 đến 10');
    // }
    // checkAndControlvanbypass();
}

// Lắng nghe sự thay đổi của giá trị áp suất min từ Firebase và cập nhật ô input
  firebase.database().ref('monitor/pressmin').on('value', (snapshot) => {
    const pressminValue = snapshot.val();
    document.getElementById('pressure-out-min').value = pressminValue;
});

/////////////////////////////////////////////////////////////////////////
// Hàm cập nhật giá trị áp suất max lên Firebase sau khi nhấn update
function updateSetpointPressmax() {
    const pressmaxValue = document.getElementById('pressure-out-max').value;
    // if (pressmaxValue >= 0 && pressmaxValue <= 10) {
    firebase.database().ref('monitor/pressmax').set(Number(pressmaxValue))
    .then(() => {
        console.log('Setpoint frequency updated successfully.');
    })
    .catch((error) => {
        console.error('Error updating setpoint frequency: ', error);
    });
    alert('Update thành công.');
    // } else {
    //     alert('Vui lòng nhập giá trị từ 1 đến 10');
    // }
    // checkAndControlvanbypass();
}

// Lắng nghe sự thay đổi của giá trị áp suất max từ Firebase và cập nhật ô input
  firebase.database().ref('monitor/pressmax').on('value', (snapshot) => {
    const pressmaxValue = snapshot.val();
    document.getElementById('pressure-out-max').value = pressmaxValue;
});

/////////////////////////////////////////////////////////////////////////
// Hàm cập nhật giá trị chênh áp max lên Firebase sau khi nhấn update giả lập túi lọc bẩn
function updateSetpointdiffPressmax() {
    const diffpressmaxValue = document.getElementById('diffpressure-max').value;
    // if (pressmaxValue >= 0 && pressmaxValue <= 10) {
    firebase.database().ref('monitor/diffpressmax').set(Number(diffpressmaxValue))
    .then(() => {
        console.log('Setpoint frequency updated successfully.');
    })
    .catch((error) => {
        console.error('Error updating setpoint frequency: ', error);
    });
    alert('Update thành công.');
    // } else {
    //     alert('Vui lòng nhập giá trị từ 1 đến 10');
    // }
    // checkAndControlvanbypass();
}

// Lắng nghe sự thay đổi của giá trị áp suất max từ Firebase và cập nhật ô input
  firebase.database().ref('monitor/diffpressmax').on('value', (snapshot) => {
    const diffpressmaxValue = snapshot.val();
    document.getElementById('diffpressure-max').value = diffpressmaxValue;
});




//////////////THONG BAO CANH BAO DO AM LY TUONG VA NHIET DO CAO/////////////////////////////
function canhbaodoam(){
    // // Listen for changes in humidity value
    humidlab.on("value", (snapshot) => {
    var humidityValuehienthi = snapshot.val();
    
    // // Display appropriate message based on humidity
    var messageElement = document.createElement("p");
    if (humidityValuehienthi <= 70) {
        messageElement.textContent = "Ideal Humidity";
        messageElement.classList.add("ideal"); // Thêm lớp cho độ ẩm lý tưởng
    } else {
        messageElement.textContent = "High Humidity";
        messageElement.classList.add("high"); // Thêm lớp cho độ ẩm cao
        setInterval(() => {
            var visibility = messageElement.style.visibility;
            messageElement.style.visibility = visibility === "hidden" ? "visible" : "hidden";
        }, 500); // Change the interval as needed
    }
    
    // // Remove any existing messages before adding the new one
    var existingMessages = document.querySelectorAll(".message2");
    existingMessages.forEach((msg) => msg.remove());
    
    // // Append the new message
    messageElement.classList.add("message2");
    document.body.appendChild(messageElement);
    });
}

// function canhbaodoamvanhietdo_manual(){     
//     // // Listen for changes in humidity value
//     templabRefhienthi.on("value", (tempsnapshot) => {
//         var temperaturehienthi = tempsnapshot.val();
    
//     // // Display appropriate message based on humidity
//     var messageElement = document.createElement("p");
//     if (temperaturehienthi <= 26) {
//         messageElement.textContent = "Ideal Temperature";
//         messageElement.classList.add("ideal"); 
//     } else {
//         messageElement.textContent = "High Temperature";
//         messageElement.classList.add("high"); 
//         setInterval(() => {
//             var visibility = messageElement.style.visibility;
//             messageElement.style.visibility = visibility === "hidden" ? "visible" : "hidden";
//         }, 500); // Change the interval as needed
//     }
    
//     // // Remove any existing messages before adding the new one
//     var existingMessages = document.querySelectorAll(".message1");
//     existingMessages.forEach((msg) => msg.remove());
    
//     // // Append the new message
//     messageElement.classList.add("message1");
//     document.body.appendChild(messageElement);
//     });

//     // Listen for changes in humidity value
//     humidlab.on("value", (snapshot) => {
//     var humidityhienthi = snapshot.val();
    
//     // // Display appropriate message based on humidity
//     var messageElement = document.createElement("p");
//     if (humidityhienthi <= 70) {
//         messageElement.textContent = "Ideal Humidity";
//         messageElement.classList.add("ideal"); // Thêm lớp cho độ ẩm lý tưởng
//     } else {
//         messageElement.textContent = "High Humidity";
//         messageElement.classList.add("high"); // Thêm lớp cho độ ẩm cao
//         setInterval(() => {
//             var visibility = messageElement.style.visibility;
//             messageElement.style.visibility = visibility === "hidden" ? "visible" : "hidden";
//         }, 500); // Change the interval as needed
//     }
    
//     // // Remove any existing messages before adding the new one
//     var existingMessages = document.querySelectorAll(".message2");
//     existingMessages.forEach((msg) => msg.remove());
    
//     // // Append the new message
//     messageElement.classList.add("message2");
//     document.body.appendChild(messageElement);
//     });
// }

// ----------------------------------------GIAM SAT THONG SO HE THONG THONG QUA DO THI---------------------------------------------------//
function function_voltage() {
    var giamsatdienap = document.getElementById("giamsatdienap");
    if (giamsatdienap.style.display === "none" || giamsatdienap.style.display === "") {
        giamsatdienap.style.display = "block";
        giamsatdienap.style.opacity = 1;
        giamsatdongdien.style.display = "none";
        giamsatdongdien.style.opacity = 0;
        giamsattanso.style.display = "none";
        giamsattanso.style.opacity = 0;
        giamsattocdo.style.display = "none";
        giamsattocdo.style.opacity = 0;
        giamsatapsuat.style.display = "none";
        giamsatapsuat.style.opacity = 0;
        giamsatdoam.style.display = "none";
        giamsatdoam.style.opacity = 0;
    } else {
        giamsatdienap.style.display = "none";
        giamsatdienap.style.opacity = 0;
    }
}

function function_current() {
    var giamsatdongdien = document.getElementById("giamsatdongdien");
    if (giamsatdongdien.style.display === "none" || giamsatdongdien.style.display === "") {
        giamsatdongdien.style.display = "block";
        giamsatdongdien.style.opacity = 1;
        giamsatdienap.style.display = "none";
        giamsatdienap.style.opacity = 0;
        giamsattanso.style.display = "none";
        giamsattanso.style.opacity = 0;
        giamsattocdo.style.display = "none";
        giamsattocdo.style.opacity = 0;
        giamsatapsuat.style.display = "none";
        giamsatapsuat.style.opacity = 0;
        giamsatdoam.style.display = "none";
        giamsatdoam.style.opacity = 0;
    } else {
        giamsatdongdien.style.display = "none";
        giamsatdongdien.style.opacity = 0;
    }
}

function function_frequency() {
    var giamsattanso = document.getElementById("giamsattanso");
    if (giamsattanso.style.display === "none" || giamsattanso.style.display === "") {
        giamsattanso.style.display = "block";
        giamsattanso.style.opacity = 1;
        giamsatdongdien.style.display = "none";
        giamsatdongdien.style.opacity = 0;
        giamsatdienap.style.display = "none";
        giamsatdienap.style.opacity = 0;
        giamsattocdo.style.display = "none";
        giamsattocdo.style.opacity = 0;
        giamsatapsuat.style.display = "none";
        giamsatapsuat.style.opacity = 0;
        giamsatdoam.style.display = "none";
        giamsatdoam.style.opacity = 0;
        
    } else {
        giamsattanso.style.display = "none";
        giamsattanso.style.opacity = 0;
    }
}

function function_speed() {
    var giamsattocdo = document.getElementById("giamsattocdo");
    if (giamsattocdo.style.display === "none" || giamsattocdo.style.display === "") {
        giamsattocdo.style.display = "block";
        giamsattocdo.style.opacity = 1;
        giamsatdongdien.style.display = "none";
        giamsatdongdien.style.opacity = 0;
        giamsatdienap.style.display = "none";
        giamsatdienap.style.opacity = 0;
        giamsattanso.style.display = "none";
        giamsattanso.style.opacity = 0;
        giamsatapsuat.style.display = "none";
        giamsatapsuat.style.opacity = 0;
        giamsatdoam.style.display = "none";
        giamsatdoam.style.opacity = 0;
        
    } else {
        giamsattocdo.style.display = "none";
        giamsattocdo.style.opacity = 0;
    }
}

function function_pressure() {
    var giamsatapsuat = document.getElementById("giamsatapsuat");
    if (giamsatapsuat.style.display === "none" || giamsatapsuat.style.display === "") {
        giamsatapsuat.style.display = "block";
        giamsatapsuat.style.opacity = 1;
        giamsatdongdien.style.display = "none";
        giamsatdongdien.style.opacity = 0;
        giamsatdienap.style.display = "none";
        giamsatdienap.style.opacity = 0;
        giamsattanso.style.display = "none";
        giamsattanso.style.opacity = 0;
        giamsatnhietdo.style.display = "none";
        giamsatnhietdo.style.opacity = 0;
        giamsatdoam.style.display = "none";
        giamsatdoam.style.opacity = 0;
        giamsattocdo.style.display = "none";
        giamsattocdo.style.opacity = 0;
    } else {
        giamsatapsuat.style.display = "none";
        giamsatapsuat.style.opacity = 0;
    }
}


function function_temperature() {
    var giamsatnhietdo = document.getElementById("giamsatnhietdo");
    if (giamsatnhietdo.style.display === "none" || giamsatnhietdo.style.display === "") {
        giamsatnhietdo.style.display = "block";
        giamsatnhietdo.style.opacity = 1;
        giamsatdongdien.style.display = "none";
        giamsatdongdien.style.opacity = 0;
        giamsatdienap.style.display = "none";
        giamsatdienap.style.opacity = 0;
        giamsattanso.style.display = "none";
        giamsattanso.style.opacity = 0; 
        giamsatapsuat.style.display = "none";
        giamsatapsuat.style.opacity = 0;
        giamsatdoam.style.display = "none";
        giamsatdoam.style.opacity = 0;
    } else {
        giamsatnhietdo.style.display = "none";
        giamsatnhietdo.style.opacity = 0;
    }
}

function function_humidity() {
    var giamsatdoam = document.getElementById("giamsatdoam");
    if (giamsatdoam.style.display === "none" || giamsatdoam.style.display === "") {
        giamsatdoam.style.display = "block";
        giamsatdoam.style.opacity = 1;
        giamsatdongdien.style.display = "none";
        giamsatdongdien.style.opacity = 0;
        giamsatdienap.style.display = "none";
        giamsatdienap.style.opacity = 0;
        giamsattanso.style.display = "none";
        giamsattanso.style.opacity = 0; 
        giamsatapsuat.style.display = "none";
        giamsatapsuat.style.opacity = 0;
        giamsatnhietdo.style.display = "none";
        giamsatnhietdo.style.opacity = 0;
    } else {
        giamsatdoam.style.display = "none";
        giamsatdoam.style.opacity = 0;
    }
}


// --------------------------------------------------------ĐIỆN ÁP-------------------------------------------------------------------------//
function exportToExcelvoltage() {
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
document.getElementById('export-button-voltage').addEventListener('click', exportToExcelvoltage);


////////////////////////////////////////////////////////////////
function getArr(arr, newVal) {
    if (arr.length === 0 && !newVal) return [];

    const newArr = [...arr, newVal];
    if (newArr.length > 1800) {
        newArr.shift();
    }
    return newArr;
}

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
                backgroundColor: 'rgba(255, 99, 132, 1)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 3,
                fill: false,
                pointRadius: 0
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
    var voltage_out;

    
    // Đảm bảo rằng setInterval chỉ được tạo một lần
    var chartIntervalvoltage, historyIntervalvoltage;
        database.ref("monitor/voltage").on("value", function (snapshot) {
    //         //----------------------------- Gauge ----------------------------
            voltage_out = snapshot.val();
            // document.getElementById("voltage").innerHTML = voltage_out + " V";
            
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

//-----------------------------------------------------------DONG DIEN-------------------------------------------------------------------//
function exportToExcelcurrent() {
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
document.getElementById('export-button-current').addEventListener('click', exportToExcelcurrent);

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
            fill: false,
            pointRadius: 0
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
var current_out;

// Đảm bảo rằng setInterval chỉ được tạo một lần
var chartIntervalcurrent, historyIntervalcurrent;

database.ref("monitor/current").on("value", function (snapshot) {
    //----------------------------- Gauge ----------------------------
    current_out = snapshot.val();
    // document.getElementById("current").innerHTML = current_out + " A";

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



//--------------------------------------------------------TAN SO----------------------------------------------------------------------------//
function exportToExcelfreq() {
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
document.getElementById('export-button-freq').addEventListener('click', exportToExcelfreq);


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
            fill: false,
            pointRadius: 0
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
var frequency_out;
    
// Đảm bảo rằng setInterval chỉ được tạo một lần
var chartIntervalfrequency, historyIntervalfrequency;
    database.ref("monitor/freq").on("value", function (snapshot) {
        //----------------------------- Gauge ----------------------------
        frequency_out = snapshot.val();
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


// ----------------------------------------------------TỐC ĐỘ------------------------------------------------------------------
function exportToExcelspeed() {
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
document.getElementById('export-button-speed').addEventListener('click', exportToExcelspeed);

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
            fill: false,
            pointRadius: 0
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
                max: 3000,
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
var speed_out;
    
// Đảm bảo rằng setInterval chỉ được tạo một lần
var chartIntervalspeed, historyIntervalspeed;
    database.ref("monitor/speed").on("value", function (snapshot) {
        //----------------------------- Gauge ----------------------------
        speed_out = snapshot.val();
        // document.getElementById("speed").innerHTML = speed_out + " rpm";    
        
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

//---------------------------------------------------------AP SUAT----------------------------------------------------------------------//
function exportToExcelpress() {
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
document.getElementById('export-button-press').addEventListener('click', exportToExcelpress);


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
                fill: false,
                pointRadius: 0
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
    var pressure_out;
        
    // Đảm bảo rằng setInterval chỉ được tạo một lần
    var chartIntervalpressure, historyIntervalpressure;
        database.ref("monitor/pressout").on("value", function (snapshot) {
            //----------------------------- Gauge ----------------------------
            pressure_out = snapshot.val();
            // document.getElementById("pressure").innerHTML = pressure_out + " Bar";
            
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

// ----------------------------------------NHIỆT ĐỘ---------------------------------------------------------
function exportToExceltemp() {
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
document.getElementById('export-button-temp').addEventListener('click', exportToExceltemp);

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
            fill: false,
            pointRadius: 0
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
var temperature_out;
    
// Đảm bảo rằng setInterval chỉ được tạo một lần
var chartIntervaltemperature, historyIntervaltemperature;
    database.ref("monitor/temp").on("value", function (snapshot) {
        //----------------------------- Gauge ----------------------------
        temperature_out = snapshot.val();
        // document.getElementById("temperature").innerHTML = temperature_out + " ℃";    
        
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


// ----------------------------------------------------DO AM------------------------------------------------------------------
function exportToExcelhumidity() {
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
document.getElementById('export-button-humid').addEventListener('click', exportToExcelhumidity);


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
            fill: false,
            pointRadius: 0
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
        // document.getElementById("humidity").innerHTML = humidity_out + " V";    
        
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
            content_row_humidity[3].innerHTML = value_humidity[0] + " %";
            content_row_humidity[4].innerHTML = time_humidity[1];
            content_row_humidity[5].innerHTML = value_humidity[1] + " %";
            content_row_humidity[6].innerHTML = time_humidity[2];
            content_row_humidity[7].innerHTML = value_humidity[2] + " %";
            content_row_humidity[8].innerHTML = time_humidity[3];
            content_row_humidity[9].innerHTML = value_humidity[3] + " %";
            content_row_humidity[10].innerHTML = time_humidity[4];
            content_row_humidity[11].innerHTML = value_humidity[4] + " %";
            content_row_humidity[12].innerHTML = time_humidity[5];
            content_row_humidity[13].innerHTML = value_humidity[5] + " %";
            content_row_humidity[14].innerHTML = time_humidity[6];
            content_row_humidity[15].innerHTML = value_humidity[6] + " %";
            content_row_humidity[16].innerHTML = time_humidity[7];
            content_row_humidity[17].innerHTML = value_humidity[7] + " %";
            content_row_humidity[18].innerHTML = time_humidity[8];
            content_row_humidity[19].innerHTML = value_humidity[8] + " %";
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




// ------------------đông bộ manual và auto với điện thoại------------------------------
firebase.database().ref("control/manual off auto").on("value", function (snapshot) {
    var MOAValue = snapshot.val();
    // khi off
    if (MOAValue == 0) { 
        // Hiển thị nút "Auto" và "Manual"
        autoButton.style.display = "none";
        manualButton.style.display = "none";
    
        if (isListening) {
            templab.off(); // Ngừng lắng nghe dữ liệu
            temp.innerHTML = ''; // Xóa dữ liệu hiển thị
    
            humidlab.off(); // Ngừng lắng nghe dữ liệu
            humid.innerHTML = ''; // Xóa dữ liệu hiển thị
    
            tempoutchiller.off(); // Ngừng lắng nghe dữ liệu
            tempout.innerHTML = ''; // Xóa dữ liệu hiển thị
    
            tempinchiller.off(); // Ngừng lắng nghe dữ liệu
            tempin.innerHTML = ''; // Xóa dữ liệu hiển thị
    
            pressinchiller.off(); // Ngừng lắng nghe dữ liệu
            pressin.innerHTML = ''; // Xóa dữ liệu hiển thị
    
            pressoutchiller.off(); // Ngừng lắng nghe dữ liệu
            pressout.innerHTML = ''; // Xóa dữ liệu hiển thị
    
            diffpressahu.off(); // Ngừng lắng nghe dữ liệu
            diffpress.innerHTML = ''; // Xóa dữ liệu hiển thị
    
            freqmotor.off(); // Ngừng lắng nghe dữ liệu
            freq.innerHTML = ''; // Xóa dữ liệu hiển thị
    
            firebase.database().ref('monitor/speed').off(); // Ngừng lắng nghe dữ liệu
            document.getElementById('speed').innerHTML = ''; // Xóa dữ liệu hiển thị
    
            firebase.database().ref('monitor/current').off(); // Ngừng lắng nghe dữ liệu
            document.getElementById('current').innerHTML = ''; // Xóa dữ liệu hiển thị
    
            firebase.database().ref('monitor/voltage').off(); // Ngừng lắng nghe dữ liệu
            document.getElementById('voltage').innerHTML = ''; // Xóa dữ liệu hiển thị
    
            vanbypassRefmonitor.off(); // Ngừng lắng nghe dữ liệu
            vanbypass.innerHTML = ''; // Xóa dữ liệu hiển thị
    
            isListening = false;
        }
        
        // alert('Dừng hệ thống');
        autoButton.style.backgroundColor = "gray";
        onButton.style.backgroundColor = "gray";
        manualButton.style.backgroundColor = "gray";
        offButton.style.backgroundColor = "rgb(255, 0, 0)";
        setpointContainer.style.display = "none";
    
        disableButtons();
        disableUpdatebypass();
        disableupdateSetpointfreq();
        disableupdateSetpointmaxpress();
        disableupdatebuttonSetpointmaxpress();
        disableupdateSetpointpressfilter();
        disableupdatebuttonSetpointpressfilter();
        bypassRefcontrol.set(100); 
        van01Refcontrol.set(0);
        van02Refcontrol.set(0);
        freqRefcontrol.set(0);
        motorRefcontrol.set(1);
        document.getElementById('hot-slow-1').style.display = 'none';
        document.getElementById('hot-slow-2').style.display = 'none';
        document.getElementById('cool-slow-1').style.display = 'none';
        document.getElementById('cool-slow-2').style.display = 'none';
        document.getElementById('hot-fast-1').style.display = 'none';
        document.getElementById('hot-fast-2').style.display = 'none';
        document.getElementById('cool-fast-1').style.display = 'none';
        document.getElementById('cool-fast-2').style.display = 'none';
    } 
    // khi auto
    else if (MOAValue == 1) {
        autoButton.style.backgroundColor = "#0099FF";
        onButton.style.backgroundColor = "#00CC00";
        manualButton.style.backgroundColor = "gray";
        offButton.style.backgroundColor = "gray";
        setpointContainer.style.display = "block"; // Hiển thị khung setpoint
    
        disableButtons();
        enablebuttonmotor();
        disableUpdatebypass();
        disableUpdatebuttonbypass();
        disableupdateSetpointfreq();
        disableupdatebuttonSetpointfreq();

        checkAndControl();
        checkpipelinepressure();
        checkdirtyfilter();
        canhbaodoam();
        checkAndControlfreqfrommantoauto();
        // motorRefcontrol.set(2);

        amimationvan01();
        amimationvan02();
        amimationvanbypass();
    }
    // khi manual
    else if(MOAValue== 2){
        autoButton.style.backgroundColor = "gray";
        onButton.style.backgroundColor = "#00CC00";
        manualButton.style.backgroundColor = "#0099FF";
        offButton.style.backgroundColor = "gray";
        setpointContainer.style.display = "none";
        
        enableButtons();
        enablebuttonmotor();
        enableUpdatebypass();
        enableUpdatebuttonbypass();
        enableupdateSetpointfreq();
        enableupdatebuttonSetpointfreq();
        enableupdateSetpointmaxpress();
        enableupdatebuttonSetpointmaxpress();

        // disableupdateSetpointmaxpress();
        // disableupdatebuttonSetpointmaxpress();

        checkdirtyfilter();
        // canhbaodoamvanhietdo_manual();
        checkAndControlmanual();
        // motorRefcontrol.set(2);
        checkpipelinepressure();

        amimationvan01();
        amimationvan02();
        amimationvanbypass();
    }

});

firebase.database().ref("control/off").on("value", function (snapshot) {
    var offvalue = snapshot.val();
    if (offvalue == 0) { 
    // Hiển thị nút "Auto" và "Manual"
    autoButton.style.display = "none";
    manualButton.style.display = "none";

    if (isListening) {
        templab.off(); // Ngừng lắng nghe dữ liệu
        temp.innerHTML = ''; // Xóa dữ liệu hiển thị

        humidlab.off(); // Ngừng lắng nghe dữ liệu
        humid.innerHTML = ''; // Xóa dữ liệu hiển thị

        tempoutchiller.off(); // Ngừng lắng nghe dữ liệu
        tempout.innerHTML = ''; // Xóa dữ liệu hiển thị

        tempinchiller.off(); // Ngừng lắng nghe dữ liệu
        tempin.innerHTML = ''; // Xóa dữ liệu hiển thị

        pressinchiller.off(); // Ngừng lắng nghe dữ liệu
        pressin.innerHTML = ''; // Xóa dữ liệu hiển thị

        pressoutchiller.off(); // Ngừng lắng nghe dữ liệu
        pressout.innerHTML = ''; // Xóa dữ liệu hiển thị

        diffpressahu.off(); // Ngừng lắng nghe dữ liệu
        diffpress.innerHTML = ''; // Xóa dữ liệu hiển thị

        freqmotor.off(); // Ngừng lắng nghe dữ liệu
        freq.innerHTML = ''; // Xóa dữ liệu hiển thị

        firebase.database().ref('monitor/speed').off(); // Ngừng lắng nghe dữ liệu
        document.getElementById('speed').innerHTML = ''; // Xóa dữ liệu hiển thị

        firebase.database().ref('monitor/current').off(); // Ngừng lắng nghe dữ liệu
        document.getElementById('current').innerHTML = ''; // Xóa dữ liệu hiển thị

        firebase.database().ref('monitor/voltage').off(); // Ngừng lắng nghe dữ liệu
        document.getElementById('voltage').innerHTML = ''; // Xóa dữ liệu hiển thị

        vanbypassRefmonitor.off(); // Ngừng lắng nghe dữ liệu
        vanbypass.innerHTML = ''; // Xóa dữ liệu hiển thị

        isListening = false;
    }
    
    // alert('Dừng hệ thống');
    autoButton.style.backgroundColor = "gray";
    onButton.style.backgroundColor = "gray";
    manualButton.style.backgroundColor = "gray";
    offButton.style.backgroundColor = "rgb(255, 0, 0)";
    setpointContainer.style.display = "none";

    disableButtons();
    disableUpdatebypass();
    disableupdateSetpointfreq();
    disableupdateSetpointmaxpress();
    disableupdatebuttonSetpointmaxpress();
    disableupdateSetpointpressfilter();
    disableupdatebuttonSetpointpressfilter();
    bypassRefcontrol.set(100); 
    van01Refcontrol.set(0);
    van02Refcontrol.set(0);
    freqRefcontrol.set(0);
    motorRefcontrol.set(1);
    document.getElementById('hot-slow-1').style.display = 'none';
    document.getElementById('hot-slow-2').style.display = 'none';
    document.getElementById('cool-slow-1').style.display = 'none';
    document.getElementById('cool-slow-2').style.display = 'none';
    document.getElementById('hot-fast-1').style.display = 'none';
    document.getElementById('hot-fast-2').style.display = 'none';
    document.getElementById('cool-fast-1').style.display = 'none';
    document.getElementById('cool-fast-2').style.display = 'none';
    } 
    else{
    
    onButton.style.backgroundColor = "gray";
    offButton.style.backgroundColor = "red";

    }
});