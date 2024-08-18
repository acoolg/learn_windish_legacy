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
