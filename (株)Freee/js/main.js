'use strict';


// 画面に時刻表示
function showClock1() {
    var nowTime = new Date(); //日時
    var nowHour = String(nowTime.getHours()).padStart(2, '0');//時間
    var nowMin = String(nowTime.getMinutes()).padStart(2, '0');//分
    var nowSec = String(nowTime.getSeconds()).padStart(2, '0');//秒
    var msg = "現在時刻は " + nowHour + ":" + nowMin + ":" + nowSec + " です。";
    document.getElementById("RealtimeClockArea").innerHTML = msg; // <p id="RealtimeClockArea"></p>に表示されるようにする。
}
setInterval('showClock1()', 1000);


/// htmlタグ抽出
const begin = document.getElementById('begin');
const finish = document.getElementById('finish');
const HistoryTimesArea = document.getElementById('HistoryTimesArea');

/// 出勤退勤時間を代入。
let beginDate;
let finishDate;

let beginDateTime;
let finishDateTime;

// 出勤中かどうかのフラグ
let attendanceFlag = false; // trueが出勤中、falseが退勤中

//打刻履歴をここに入れていく。
var historyTimes = [];

begin.addEventListener('click', () => {

    let nowDay;
    // 退勤中であれば出勤時間を表示、既に出勤中であれば表示はしない
    if (!attendanceFlag) {
        attendanceFlag = true;

        // begin(出勤ボタンを押した時)にgetDateTime()で時間取得。それをbeginDateへ代入。historyへ追加。
        beginDate = getDateTime(); 
        nowDay = getNowDay();
        beginDateTime = new Date();

        // 出勤時間を更新する。
        const beginTimeEl = document.getElementById('beginTime');
        beginTimeEl.innerText = '出勤時間：' + beginDate;

        // タグを新しく作成。
        const el = document.createElement('div');
        const begin = document.querySelector('.history');
        const beginEl = begin.appendChild(el);
        //作ったタグに時間を代入。
        beginEl.innerText = nowDay + '出勤時間：' + beginDate;
    }
});

finish.addEventListener('click', () => {
    let nowDay;
    // 出勤中なら退勤時間を表示、退勤中は表示しない
    if (attendanceFlag) {
        attendanceFlag = false;

        finishDate = getDateTime();
        nowDay = getNowDay();
        finishDateTime = new Date();
        // 退勤時間を更新する。
        const finishTimeEl = document.getElementById('finishTime');
        finishTimeEl.innerText = '退勤時間：' + finishDate;

        // タグを作成。
        const el = document.createElement('div');
        const finish = document.querySelector('.history');
        const finishEl = finish.appendChild(el);
        //作ったタブに時間を代入。
        finishEl.innerText = nowDay + '退勤時間：' + finishDate;

        // 退勤ボタン押した時の労働時間
        getWorkingTime();
    }
});


///関数
function getDateTime() {
    var nowTime = new Date();
    var nowHour = String(nowTime.getHours()).padStart(2, '0');//padStartで0を入れた数字になる
    var nowMin = String(nowTime.getMinutes()).padStart(2, '0');
    var nowSec = String(nowTime.getSeconds()).padStart(2, '0');
    var msg = "" + nowHour + ":" + nowMin + ":" + nowSec + "";
    return msg; 
}


function getNowDay() {
    var nowTime = new Date();
    var nowMonth = String(nowTime.getMonth()).padStart(2, '0');
    var nowDay = String(nowTime.getDay()).padStart(2, '0');
    var msg = "" + nowMonth + "/" + nowDay + '  ' + "";
    return msg; 
}


function getWorkingTime() {
    const workingTimeEl = document.getElementById('workingTime');
    var wTime = finishDateTime - beginDateTime;
    var wTHours = Math.floor(Math.abs(wTime) / (60 * 60 * 1000));
    var wTMinutes = Math.floor((Math.abs(wTime) / (60 * 1000)));
    var wTSeconds = Math.floor((Math.abs(wTime) / 1000));
    /// Math.floorで小数点切り捨てる。
    workingTimeEl.innerText = '稼働時間:' + wTHours + '時間' + wTMinutes + '分' + wTSeconds + '秒';
}