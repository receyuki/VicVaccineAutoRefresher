// ==UserScript==
// @name         疫苗小助手
// @homepage     https://github.com/receyuki/VicVaccineAutoRefresher
// @version      1.5
// @description  自动刷新疫苗
// @author       receyuki
// @icon         https://github.com/receyuki/VicVaccineAutoRefresher/raw/main/assets/wrench.png
// @match        http*://portal.cvms.vic.gov.au/*
// @grant        GM_notification

// 就一个自动刷页面+弹窗的无技术含量小工具（其实是因为懒
// 刷新部分是用oixm的刷新器改的

// ==/UserScript==
(function() {
    "use strict";

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

    var indicator = document.createElement("div");
    indicator.className = "finalalert";
    indicator.style.fontSize = "30px";
    indicator.style.textAlign = "center";
    indicator.appendChild(document.createTextNode("🔧在刷了在刷了！"));
    var p0= document.querySelector("body > div.navbar.navbar-inverse.navbar-static-top.header > div > div > div:nth-child(1)");
    document.querySelector("body > div.navbar.navbar-inverse.navbar-static-top.header > div > div").insertBefore(indicator, p0);

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

})();