import { userData, writeNewData } from "../script/weak.js";

document.addEventListener('DOMContentLoaded', () => {
    const win = ["k", "K", "σ", "उ", "δ", "D", "t", "τ", "r", "Γ", "ω", "W", "ς", "C", "ρ", "P", "μ", "U", "α", "A", "ε", "E", "η", "Π", "=", "Ξ", "ψ", "κ", "π", "ν"];
    const qot = ["k", "K", "s", "S", "d", "D", "t", "T", "r", "R", "m", "M", "l", "L", "p", "P", "n", "N", "a", "A", "e", "E", "i", "I", "ee", "EE", "o", "g", "t", "s"];
    const los = new Array(30).fill(0);

    const qq = document.getElementById("ti");
    const aq = document.getElementById("dong");

    let thsd = win[getrandom(0, win.length)];
    qq.innerHTML = thsd;
    render(qot[win.indexOf(thsd)]);

    function getrandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }

    function render(anser) {
        const aa = getrandom(0, 4);
        const anseree = [qot[getrandom(0, qot.length)], qot[getrandom(0, qot.length)], qot[getrandom(0, qot.length)]];
        switch (aa) {
            case 0:
                aq.innerHTML = `
                    <div class="center">
                        <button onclick="handleAnswer('${anser}')">${anser}</button>
                        <button onclick="handleAnswer('${anseree[0]}')">${anseree[0]}</button>
                        <button onclick="handleAnswer('${anseree[1]}')">${anseree[1]}</button>
                        <button onclick="handleAnswer('${anseree[2]}')">${anseree[2]}</button>
                    </div>`;
                break;
            case 1:
                aq.innerHTML = `
                    <div class="center">
                        <button onclick="handleAnswer('${anseree[0]}')">${anseree[0]}</button>
                        <button onclick="handleAnswer('${anser}')">${anser}</button>
                        <button onclick="handleAnswer('${anseree[1]}')">${anseree[1]}</button>
                        <button onclick="handleAnswer('${anseree[2]}')">${anseree[2]}</button>
                    </div>`;
                break;
            case 2:
                aq.innerHTML = `
                    <div class="center">
                        <button onclick="handleAnswer('${anseree[0]}')">${anseree[0]}</button>
                        <button onclick="handleAnswer('${anseree[1]}')">${anseree[1]}</button>
                        <button onclick="handleAnswer('${anser}')">${anser}</button>
                        <button onclick="handleAnswer('${anseree[2]}')">${anseree[2]}</button>
                    </div>`;
                break;
            case 3:
                aq.innerHTML = `
                    <div class="center">
                        <button onclick="handleAnswer('${anseree[0]}')">${anseree[0]}</button>
                        <button onclick="handleAnswer('${anseree[1]}')">${anseree[1]}</button>
                        <button onclick="handleAnswer('${anseree[2]}')">${anseree[2]}</button>
                        <button onclick="handleAnswer('${anser}')">${anser}</button>
                    </div>`;
                break;
        }
    }

    window.handleAnswer = function(anser) {
        if (anser === qot[win.indexOf(thsd)]) {
            thsd = win[getrandom(0, win.length)];
            qq.innerHTML = thsd;
            render(qot[win.indexOf(thsd)]);
        } else {
            alert("Wrong! The correct answer was: " + qot[win.indexOf(thsd)]);
            const maxNumber = Math.max(...los);
            userData.weak.letter = win[los.indexOf(maxNumber)]
            los[win.indexOf(thsd)]++;
            alert("Wrong! The correct answer was: " + user)
        }
    }
    setInterval(e => {
        writeNewData(userData)
    },1000)
});
