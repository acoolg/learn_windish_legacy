import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-analytics.js';
import { getDatabase, ref, set, get, child } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js';
import { getRandom, jumpTo, shuffle, getCookie, writeNewData, userData } from "../script/little.js"

// 全域變數
var timer = 0
var canUse = true;
var nowId = "";
var isRight = false;
var userDatat = userData;
var render_zone = document.getElementById("ques-zone");
var counter;
var nowcurrent = 0;
var countiTotal = 0;
var wrongBook = [];
var review = false;

function soup() {
    //log every variable
    console.log(userData)
    console.log(canUse)
    console.log(nowId)
    console.log(isRight)
    console.log(render_zone)
    console.log(counter)
    console.log(nowcurrent)
    console.log(countiTotal)
    console.log(wrongBook)
    console.log(review)
}



const animate = {
    name: "slidein",
    keyframes: [
        { transform: "translateY(100px)" },
        { transform: "translateY(0px)" }
    ],
    set: {
        duration: 200,
        fill: "forwards",
        easing: "ease-in"
    }
};

const animate_S = {
    name: "slidein",
    keyframes: [
        { transform: "translateY(0px)" },
        { transform: "translateY(100px)" }
    ],
    set: {
        duration: 0,
        fill: "forwards",
        easing: "ease-in"
    }
};

// 渲染錯誤訊息的函式
function renderWrongMsg(asset, answer) {
    var render_zone = document.getElementById("fak"); 
    render_zone.innerHTML = "";
    switch (asset) {
        case "wrong":
            render_zone.style.backgroundColor = "#ffe600";
            render_zone.innerHTML = `
            <i class="fa-sharp fa-solid fa-circle-xmark fa-5x" style="color: #ff6f00;"></i>
            <div class="material-symbols">
                <h1>錯誤</h1>
                <p>正確答案是<span>${answer}</span></p>
            </div>
            <button id="next">下一題</button>
            `;
            break;
        case "right":
            render_zone.style.backgroundColor = "#4fff6f";
            render_zone.innerHTML = `
            <i class="fa-sharp fa-solid fa-circle-check fa-5x" style="color: #17c150;"></i>
            <div class="material-symbols">
                <h1>正確</h1>
                <p>你竟然答對了</p>
            </div>
            <button id="next">下一題</button>
            `;
            break;
    }
    render_zone.animate(animate.keyframes, animate.set);
    buttonClick(render_zone);
}

// 用於按鈕點擊後的邏輯處理
async function buttonClick(render_zon) {
    canUse = false;
    nowcurrent++;
    if (calculatePercentage(countiTotal, nowcurrent) == 100) {
        review = true;
    }
    if (counter == nowcurrent) {
        jumpTo(`score.html?time=${timer}&score=${calculatePercentage(countiTotal,countiTotal - wrongBook.length)}`)
    }
    document.getElementById("next").addEventListener("click", async (event) => {
        canUse = true;
        progress(calculatePercentage(counter, nowcurrent));
        render_zon.animate(animate_S.keyframes, animate_S.set);
        var render_zone = document.getElementById("ques-zone");
        document.getElementById("fak").style.transform = "translateY(100px)";
        var id;
        if (review) {
            id = wrongBook[nowcurrent - countiTotal];
        } else {
            id = every[nowcurrent];
            if (!isRight) {
                wrongBook.push(nowId);
                counter++;
            }
            console.log(nowcurrent)
        }
        var gfhq = await getQuestionById(id);
        renderNewWithAsset(render_zone, "choose", gfhq, id);
        progress(calculatePercentage(counter, nowcurrent));
        console.log(calculatePercentage(countiTotal, nowcurrent))
    }, { once: true }); // 確保事件監聽器只執行一次
}

// 更新進度條的函式
function progress(percent) {
    if (percent > 100) {
        percent = 100;
    }
    var bar = document.getElementById('bar');
    bar.style.width = percent + '%';
}

// 渲染新內容的函式
async function renderNewWithAsset(element, asset, inputObject, id) {
    nowId = id;
    switch (asset) {
        case "choose":
            var ans = inputObject.answer;
            var buttons = [ans, inputObject.a, inputObject.b, inputObject.c];
            var afterShuffle = shuffle(buttons);
            var choosing = afterShuffle.map(option => `
                <button id="ans" value="${option === ans}">${option}</button>
            `);
            element.innerHTML = `
            <div class="quiz-choose">
                <h1>${inputObject.question}</h1>
                <div class="quiz-many-button-flex">
                    ${choosing.join('')}
                </div>
            </div>`;
            break;
        case "sentence":
            element.innerHTML = `
            <div class="quiz-sentence">
                <h1>${inputObject.question}</h1>
                <p>${inputObject.answer}</p>
            </div>`;
            break;
    }
    setlis(id, ans);
}

var every = [];

// 獲取並打亂題目ID
async function getQuestionByt() {
    try {
        const data = await getdata("../data/choose.json");
        let ids = data.map(item => item.id);
        every = shuffle(ids); // 初始的題目 ID 陣列

        // 追加多次的題目 ID
        for (let i = 0; i < 50; i++) {
            every = every.concat(shuffle(ids)); // 將打亂的題目 ID 陣列追加到 every 中
        }

        console.log(every);
    } catch (error) {
        console.error('Error fetching question IDs:', error);
    }
}

// 頁面載入時的初始化
window.onload = async function() {
    await getQuestionByt();
    counter = getRandom(10, 20);
    countiTotal = counter;
    var id = every[0];
    var gfhq = await getQuestionById(id);
    renderNewWithAsset(render_zone, "choose", gfhq, id);
}

// 計算進度百分比的函式
function calculatePercentage(total, current) {
    if (total === 0) return 0;
    return (current / total) * 100;
}

// 設置按鈕事件監聽器
function setlis(ida, ans) {
    document.querySelectorAll("#ans").forEach(button => {
        button.addEventListener("click", (e) => {
            if (canUse) {
                isRight = (e.target.value === "true");
                renderWrongMsg(isRight ? "right" : "wrong", ans);
            }
        });
    });
}

// 根據題目ID獲取題目資料
async function getQuestionById(id) {
    try {
        const data = await getdata("../data/choose.json");
        const question = data.find(item => item.id === id);
        if (question) {
            return {
                question: question.question,
                answer: question.answer,
                a: question.a,
                b: question.b,
                c: question.c,
                clue: question.clue,
                tag: question.tag,
                id: question.id
            };
        } else {
            console.error('No question found with id:', id);
            return null;
        }
    } catch (error) {
        console.error('Error fetching question by ID:', error);
    }
}

// 獲取指定路徑的數據
async function getdata(dataPath) {
    try {
        const response = await fetch(dataPath);
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

setInterval((e) => {
    timer++
},1000)

