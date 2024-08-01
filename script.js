var win = ["k", "K", "σ", "उ", "δ", "D", "t", "τ", "r", "Γ", "ω", "W", "ς", "C", "ρ", "P", "μ", "U", "α", "A", "ε", "E", "η", "Π", "=", "Ξ", "ψ", "κ", "π", "ν"]
var qot = ["k", "K", "s", "S", "d", "D", "t", "T", "r", "R", "m", "M", "l", "L", "p", "P", "n", "N", "a", "A", "e", "E", "i", "I", "ee", "EE", "o", "g", "t", "s"]
var qq = document.getElementById("ti")
var aq = document.getElementById("dong")

var thsd = win[getrandom(0, win.length)]
qq.innerHTML = thsd
render(qot[win.indexOf(thsd)])

function a(anser) {
    if (anser == qot[win.indexOf(thsd)]) {
        thsd = win[getrandom(0, win.length)]
        qq.innerHTML = thsd
        render(qot[win.indexOf(thsd)])
    }
    else {
        alert("Wrong!" + qot[win.indexOf(thsd)])
    }
}

function getrandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function render(anser) {
    var aa = getrandom(0,4 )

    switch (aa) {
        case 0:
            aq.innerHTML = `
                <div class="center" id="dong">
                    <button onclick="a(${anser})">${anser}</button>
                    <button onclick="a(${qot[getrandom(0, win.length)]})">${qot[getrandom(0, win.length)]}</button>
                    <button onclick="a(${qot[getrandom(0, win.length)]})">${qot[getrandom(0, win.length)]}</button>
                    <button onclick="a(${qot[getrandom(0, win.length)]})">${qot[getrandom(0, win.length)]}</button>
                </div>`
            break

        case 1:
            aq.innerHTML = `
                <div class="center" id="dong">
                    <button onclick="a(${qot[getrandom(0, win.length)]})">${qot[getrandom(0, win.length)]}</button>
                    <button onclick="a(${anser})">${anser}</button>
                    <button onclick="a(${qot[getrandom(0, win.length)]})">${qot[getrandom(0, win.length)]}</button>
                    <button onclick="a(${qot[getrandom(0, win.length)]})">${qot[getrandom(0, win.length)]}</button>
                </div>`
            break
        case 2:
            aq.innerHTML = `
                <div class="center" id="dong">
                    <button onclick="a(${qot[getrandom(0, win.length)]})">${qot[getrandom(0, win.length)]}</button>
                    <button onclick="a(${qot[getrandom(0, win.length)]})">${qot[getrandom(0, win.length)]}</button>
                    <button onclick="a(${anser})">${anser}</button>
                    <button onclick="a(${qot[getrandom(0, win.length)]})">${qot[getrandom(0, win.length)]}</button>
                </div>`
            break
        case 3:
            aq.innerHTML = `
                <div class="center" id="dong">
                    <button onclick="a(${qot[getrandom(0, win.length)]})">${qot[getrandom(0, win.length)]}</button>
                    <button onclick="a(${qot[getrandom(0, win.length)]})">${qot[getrandom(0, win.length)]}</button>
                    <button onclick="a(${qot[getrandom(0, win.length)]})">${qot[getrandom(0, win.length)]}</button>
                    <button onclick="a(${anser})">${anser}</button>
                </div>`
            break
    }
}