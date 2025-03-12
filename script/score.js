import { getRandom, jumpTo, shuffle, getCookie, writeNewData, userData } from "../script/little.js"
var user = userData
var ase = document.getElementById("ase")


function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

var timer = getQueryParam("time")

window.onload = function() {
    updateProgress(getQueryParam("score"));
    console.log(intoDeg(getQueryParam("score")))
    var ne = ""
    ne+= `${Math.floor(timer/60)}:${timer%60}`
    var zon = document.getElementById("time")
    zon.innerHTML = ne
    if(updateProgress(userData.last_login)[0] != null){
        if(updateProgress(userData.last_login)[0]) {
            
        }else {

        }
    }
}

function intoDeg(percentage) {
    return percentage * 3.6
}

async function updateProgress(percentage) {
    var time = new Number
    setInterval(w => {
        if (intoDeg(percentage) - time < 1) {
            clearInterval(w)
        }
        ase.style.background = `conic-gradient(var(--clr-score-bar) ${time}deg,var(--clr-score-bar-bg) 0deg)`
        time += (intoDeg(percentage)- time) / 34
    },5)
}

function updateStreak(lastCompletionDate) {
    var currentDate = new Date()
    // Calculate the difference in days between the current date and the last completion date
    const diffTime = Math.abs(currentDate - lastCompletionDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
        // If the last completion date was yesterday, increment the streak
        return [null, 0];
    } else
    if (diffDays === 1) {
        // If the last completion date was yesterday, increment the streak
        return [true, currentDate];
    } else if (diffDays > 1) {
        // If the last completion date was more than a day ago, reset the streak
        return [false, currentDate];
    }
}