import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-analytics.js';
import { getDatabase, ref, set, get, child } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js';
import { getRandom, jumpTo, shuffle, getCookie, writeNewData, userData } from "../script/little.js"

var userDatat = userData;  // 儲存用戶資料
var render_zone = document.getElementById("ques-zone");  // 渲染題目的區域
var counter;  // 記錄本次考試的題目總數
var nowcurrent = 0;  // 記錄已完成題目的數量
var countiTotal = 0;  // 記錄總題目數
var wrongBook = [];  // 錯誤題目集合
var review = false;  // 記錄是否進入複習模式

const animate = {
    name: "slidein",
    keyframes: [
        { transform: "translateY(100px)" },
        { transform: "translateY(0px)" }
    ],
    set: {
        duration: 200,
        fill: "forwards",
        easing: "ease-in" // 使用正確的屬性名稱
    }
}


// 渲染錯誤訊息的函式（目前尚未實作）
function renderWrongMsg(asset, answer) {
    var render_zone = document.getElementById("fak"); 
    render_zone.innerHTML = ``
    switch (asset) {
        case "wrong":
            render_zone.style.backgroundColor = "#ffe600"
            render_zone.innerHTML = `
            <i class="fa-sharp fa-solid fa-circle-xmark fa-5x" style="color: #ff6f00;"></i>
            <div class="material-symbols" >
                <h1>
                    錯誤
                </h1>
                <p>
                    正確答案是<span>${answer}</span>
                </p>
                <button onclick="nextQuestion()">下一題</button>
            </div>
            `
            break;
        case "right":
            render_zone.innerHTML = `
            <i class="fa-sharp fa-solid fa-circle-check fa-5x" style="color: #17c150;"></i>
            <div class="material-symbols">
                <h1>
                    正確
                </h1>
                <p>
                    你竟然答對了
                </p>
            </div>
            `
            break;
    }
    render_zone.animate(animate.keyframes, animate.set)
}

// 用於更新進度條的函式，輸入百分比後會調整進度條的寬度
function progress(percent) {
    if(percent > 100) {
        percent = 100;  // 防止百分比超過100
    }
    var bar = document.getElementById('bar');
    bar.style.width = percent + '%';  // 調整進度條的寬度
}

// 根據指定的資產類型（例如「choose」或「sentence」）渲染新內容
async function renderNewWithAsset(element, asset, inputObject, id) {
    switch (asset) {
        case "choose":
            var ans = inputObject.answer;  // 正確答案
            var buttons = [ans, inputObject.a, inputObject.b, inputObject.c];  // 所有選項
            var afterShuffle = shuffle(buttons);  // 將選項打亂
            var choosing = new Array();
            for (var i = 0; i < 4; i++) {
                if (afterShuffle[i] == ans) {
                    choosing.push(`<button id="ans" value="true">${afterShuffle[i]}</button>`);  // 正確答案的按鈕
                } else {
                    choosing.push(`<button id="ans" value="false">${afterShuffle[i]}</button>`);  // 錯誤答案的按鈕
                }
            }
            element.innerHTML = `
            <div class="quiz-choose">
                <h1>${inputObject.question}</h1>
                <div class="quiz-many-button-flex">
                    ${choosing[0]}
                    ${choosing[1]}
                    ${choosing[2]}
                    ${choosing[3]}
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
    setlis(id, ans);  // 設置按鈕事件監聽器
}

var every = new Array();  // 所有題目的ID

// 獲取題目ID並打亂
async function getQuestionByt() {
    await fetch("../data/choose.json")
    .then(async (data) => {
        var vari = await data.json();
        every = vari.map(item => item.id);  // 提取所有題目的ID
        every = shuffle(every);  // 打亂題目ID的順序
        console.log(every);
    });
}

// 當頁面載入時，初始化題目和進度
window.onload = async function() {
    // renderWrongMsg("wrong", "a")
    await getQuestionByt();
    counter = getRandom(10,20);  // 隨機決定題目數量
    countiTotal = counter;  // 記錄總題目數
    var id = await every[0] + "";
    var gfhq = await getQuestionById(id);
    renderNewWithAsset(render_zone, "choose", gfhq, id);  // 渲染第一題
}

// 計算進度百分比的函式，根據總數量和當前數量來計算
function calculatePercentage(total, current) {
    if (total === 0) {
        return 0; // 避免除以零的情況
    }
    return (current / total) * 100;
}

// 設置按鈕事件監聽器
function setlis(ida, ans) {
    document.querySelectorAll("#ans").forEach(back => {
        back.addEventListener("click", async (e) => {
            if (!review) {
                nowcurrent++;
                console.log("jjj");
                if (e.target.value == "true") {
                    var id = await every[nowcurrent];
                    var gfhq = await getQuestionById(id);
                    renderNewWithAsset(render_zone, "choose", gfhq, id);
                } else if (e.target.value == "false") {
                    var id = await every[nowcurrent];
                    var gfhq = await getQuestionById(id);
                    renderNewWithAsset(render_zone, "choose", gfhq, id);
                    console.log("u really suck at it");
                    counter++;
                    wrongBook.push(ida);  // 儲存錯誤題目ID
                }
                if(calculatePercentage(countiTotal, nowcurrent) == 100){
                    review = true;  // 如果進度達到100%，進入複習模式
                }
            } else {
                nowcurrent++;
                console.log("jjj");
                if (e.target.value == "true") {
                    var id = await wrongBook[nowcurrent - countiTotal];
                    var gfhq = await getQuestionById(id);
                    renderNewWithAsset(render_zone, "choose", gfhq, id);
                } else if (e.target.value == "false") {
                    var id = await wrongBook[nowcurrent - countiTotal];
                    var gfhq = await getQuestionById(id);
                    renderNewWithAsset(render_zone, "choose", gfhq, id);
                    console.log("u really suck at it");
                    counter++;
                    wrongBook.push(ida);  // 儲存錯誤題目ID
                }
            }
            progress(calculatePercentage(counter, nowcurrent));  // 更新進度條
        });
    });
}

// 根據題目 ID 從伺服器獲取題目資料
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
        console.error('Error:', error);
    }
}

// 從指定路徑獲取資料
async function getdata(dataPath) {
    try {
        const response = await fetch(dataPath);
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function nextQuestion() {
    console.log("ssssssss")
    var id = await wrongBook[nowcurrent - countiTotal];
    var gfhq = await getQuestionById(id);
    renderNewWithAsset(render_zone, "choose", gfhq, id);
}