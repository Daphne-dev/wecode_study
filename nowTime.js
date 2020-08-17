function clock() {
    var clock = document.getElementById("clock");
    var date = new Date(); 
    var hours = addZeros(date.getHours(),2);
    var minutes = addZeros(date.getMinutes(),2);
    var seconds = addZeros(date.getSeconds(),2);
    var amPm = 'AM';
    
    // 12시가 넘으면 PM으로 변환함과 동시에 오후 시간으로 바뀜
    if(hours >= 12){
        amPm = 'PM';
        hours = addZeros(hours - 12, 2);
    }

    // 50초가 넘으면 색을 변환
    if(seconds >= 50){ 
        seconds = seconds.fontcolor("bf1407");
    }
    
    // 시간 출력
    clock.innerHTML = hours+":"+minutes+":"+seconds+" "+amPm;
    // 1초마다 clock() 함수 호출
    setTimeout("clock()", 1000);
}

// 빈 자리수 0으로 채워주는 함수
function addZeros(n, digits) {
    var zero = "";
    n = n.toString();
    if(n.length < digits) {
        for(i = 0; i < digits - n.length; i++){
            zero += '0';
        }
    }
    return zero + n;
}

clock();