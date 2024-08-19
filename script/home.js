const win = ["k", "K", "σ", "उ", "δ", "D", "τ", "π", "r", "Γ", "ω", "W", "ς", "C", "ρ", "P", "μ", "U", "α", "A", "ε", "E", "η", "Π", "=", "Ξ", "ψ", "κ", "ν"];
const qot = ["k", "K", "s", "S", "d", "D", "t", "T", "r", "R", "m", "M", "l", "L", "p", "P", "n", "N", "a", "A", "e", "E", "i", "I", "ee", "EE", "o", "g", "s"];
var q = undefined
 var userData = JSON.parse(getCookie("userData"))

//當載入時
window.onload = function() {
    render()
}


//home頁的練習


function getrandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function render() {
    if(userData == null || userData.length == 0) {
        // location.href = "../sheet/wellcome.html"
    }
    var wina = document.getElementById("section-q")
    if (userData.weak.letter != "") {
        var ran = getrandom(0, 10)
        console.log(ran)
        if (ran <= 6) {
            q = win[getrandom(0, win.length)]
        } else {
            q = userData.weak.letter
        }
    } else {
        q = win[getrandom(0, win.length)]
    }
    

    wina.innerHTML = `
    <h1>
        ${q}
    </h1>
    `
    switch (getrandom(0, 4)) {
        case 0:
            var sa = [qot[win.indexOf(q)],qot[getrandom(0, win.length)],qot[getrandom(0, win.length)],qot[getrandom(0, win.length)]]
            break
        case 1:
            var sa = [qot[getrandom(0, win.length)],qot[win.indexOf(q)],qot[getrandom(0, win.length)],qot[getrandom(0, win.length)]]
            break
        case 2:
            var sa = [qot[getrandom(0, win.length)],qot[getrandom(0, win.length)],qot[win.indexOf(q)],qot[getrandom(0, win.length)]]
            break
        case 3:
            var sa = [qot[getrandom(0, win.length)],qot[getrandom(0, win.length)],qot[getrandom(0, win.length)],qot[win.indexOf(q)]]
            break
    }
    console.log(qot[win.indexOf(q)])
    wina.innerHTML += `
    <div class="home-daily-choose-btn">
        <button onclick="handleA('${win[qot.indexOf(sa[0])]}')">${sa[0]}</button>
        <button onclick="handleA('${win[qot.indexOf(sa[1])]}')">${sa[1]}</button>
        <button onclick="handleA('${win[qot.indexOf(sa[2])]}')">${sa[2]}</button>
        <button onclick="handleA('${win[qot.indexOf(sa[3])]}')">${sa[3]}</button>
    </div>
    `
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}

function handleA(an) {
    if (an == q) {
        render()
    } else {
        console.log("wrong")
    }
}
