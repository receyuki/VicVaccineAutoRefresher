// ==UserScript==
// @name         疫苗小助手
// @homepage     https://github.com/receyuki/VicVaccineAutoRefresher
// @version      1.6
// @description  自动刷新疫苗
// @author       receyuki
// @icon         https://github.com/receyuki/VicVaccineAutoRefresher/raw/main/assets/wrench.png
// @match        http*://portal.cvms.vic.gov.au/covidvaccine-booking-slots/*
// @match        http*://portal.cvms.vic.gov.au/*
// @grant        GM_notification
// @grant        GM_addStyle

// 就一个自动刷页面+弹窗的无技术含量小工具（其实是因为懒
// 刷新部分是用oixm的刷新器改的

// ==/UserScript==
(function() {
    "use strict";

//    if (window.location.href.indexOf("covidvaccine-booking-slots") > -1) {
        // refresher
        var title, time;

        config(ready);

        function config(callback) {
            if (!sessionStorage.refreshTime) {
                time = parseInt(prompt("刷新周期(秒):", 60));
                if (isNaN(time)) return;
                sessionStorage.refreshTime = time;
            } else {
                time = parseInt(sessionStorage.refreshTime);
            }
            callback();
        }

        function ready() {
            title = document.title;
            loop();
        }

        function loop() {
            document.title = "[" + formatTime(time) + "] " + title;
            if (time === 0) {
                location.reload();
                return;
            }
            time--;
            setTimeout(loop, 1000);
        }

        function formatTime(t) {
            if (isNaN(t)) return "";
            var s = "";
            var h = parseInt(t / 3600);
            s += (pad(h) + ":");
            t -= (3600 * h);
            var m = parseInt(t / 60);
            s += (pad(m) + ":");
            t -= (60 * m);
            s += pad(t);
            return s;
        }

        function pad(n) {
            return ("00" + n).slice(-2);
        }

        // indicator
        var indicator = document.createElement("div");
        indicator.className = "finalalert";
        indicator.style.fontSize = "30px";
        indicator.style.textAlign = "center";
        indicator.appendChild(document.createTextNode("🔧在刷了在刷了！"));
        var p0= document.querySelector("body > div.navbar.navbar-inverse.navbar-static-top.header > div > div > div:nth-child(1)");
        document.querySelector("body > div.navbar.navbar-inverse.navbar-static-top.header > div > div").insertBefore(indicator, p0);

        var notifiTest = document.createElement("button");
        notifiTest.innerHTML = '测试提醒弹窗';
        notifiTest.style.fontSize = "20px";
        notifiTest.addEventListener("click", event => {GM_notification({title: "Notification Test", text: "弹窗工作正常", timeout: 15000, onclick: function(){window.focus();}});});
        indicator.appendChild(notifiTest);

        // auto booking
        GM_addStyle('.switch {position: relative;display: inline-block;width: 38px;height: 12px;bottom: -5px;margin-right: 5px;}');
        GM_addStyle('.switch input {opacity: 0;width: 0;height: 0;}');
        GM_addStyle('.slider {position: absolute;cursor: pointer;top: 0;left: 0;right: 0;bottom: 0;background-color: #ccc;-webkit-transition: .4s;transition: .4s;}');
        GM_addStyle('.slider:before {position: absolute;content: "";height: 20px;width: 20px;left: 1px;bottom: -4px;background-color: grey;-webkit-transition: .4s;transition: .4s;}');
        GM_addStyle('input:checked + .slider:before {background-color: #003366;}');
        GM_addStyle('input:checked + .slider {background-color: #ccdce8;}');
        GM_addStyle('input:focus + .slider {box-shadow: 0 0 1px #ccdce8;}');
        GM_addStyle('input:checked + .slider:before {-webkit-transform: translateX(13px);-ms-transform: translateX(13px);transform: translateX(17px);}');
        GM_addStyle('.slider.round {border-radius: 17px;}');
        GM_addStyle('.slider.round:before {border-radius: 50%;}');

        var autoBookDate = document.createElement('div');
        autoBookDate.style.paddingBottom = "15px";
        var filterDateFrom = document.querySelector("#dateFilterFrom").value;
        var filterDateTo = document.querySelector("#dateFilterTo").value;

        autoBookDate.innerHTML = '<input id="bookDateBefore" class="Date-filter-from-to" '
            + 'data-date="" data-date-format="DD/MM/YYYY" type="date" value="'
            + document.querySelector("#dateFilterFrom").value
            + '" min="'
            + document.querySelector("#dateFilterFrom").min
            + '" max="'
            + document.querySelector("#dateFilterTo").value
            + '">';
        var isAutoBook = document.createElement('div');
        isAutoBook.className = "selectpage";
        isAutoBook.innerHTML = '<label class="switch">'
            + '<input type="checkbox" id="autoBook" name="autoBook" onchange="">'
            + '<span class="slider round"></span>'
            + '</label>'
            + '<span id="autoBookLabel">自动预约特定日期前任何时间</span>';



        //document.querySelector('#autoBook').checked
        document.querySelector("#content_section > div > div.row > div > div.row > div.col-md-3").appendChild(isAutoBook);
        document.querySelector("#content_section > div > div.row > div > div.row > div.col-md-3").appendChild(autoBookDate);

        // notification
        function selectTime() {
            document.querySelector("#tblslots > tbody > tr:nth-child(1) > td:nth-child(3) > input").click();
            window.focus();
        }

        if(document.querySelector("#tblslots > tbody")){
            var notificationDetails = {
                text: document.querySelector("#tblslots > tbody > tr:nth-child(1) > td:nth-child(2)").ariaLabel.replaceAll("\n", ""),
                title: document.querySelector("#tblslots > tbody > tr:nth-child(1) > td:nth-child(1)").ariaLabel,
                timeout: 15000,
                onclick: function() { selectTime(); },
            };
            GM_notification(notificationDetails);
        }
//    }

})();