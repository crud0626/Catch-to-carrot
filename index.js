const section = document.querySelector("section");


const topBtn = document.querySelector("div.topBtn");
const redoBtn = document.querySelector("div.redoBtn > i");

const timerSpan = document.querySelector("div.timer span");
const countSpan = document.querySelector("div.count span");
const modalSpan = document.querySelector("div.modal > span");

let time;
console.log(time);

// Clear
topBtn.addEventListener("click", e => {
    if (e.target.dataset.func === "play") {
        topBtn.innerHTML = `<i data-func="pause" class="fas fa-pause pauseBtn"></i>`;
        checkState();
    } else {
        topBtn.innerHTML = `<i data-func="play" class="fas fa-play playBtn"></i>`;
        stopClock();
    }
});

// Clear
function checkState() {
    if(timerSpan.innerText === "00:00") {
        initGame();
        console.log("init!");
    } else {
        resumeGame();
        console.log("resume!");
    }
}

// Clear
function initGame() {
    time = 10;
    timerSpan.innerText = `00:${time}`;

    startClock(timerSpan, time);
    countSpan.innerText = 10;

    // 노래 재생도 넣어야함.
}

let timeID;

// Clear
function startClock(timerSpan, time) {
    timeID = setTimeout(() => {
        if (time === 0) {
            stopClock();
            return;
        }
        time -= 1;
        timerSpan.innerText = `00:0${time}`; // time앞에 붙이는건 나중에 추가적으로 고려.
        startClock(timerSpan, time);
    }, 1000)
}

// Clear
function stopClock() {
    clearTimeout(timeID);
}

// 문제
function resumeGame() {
    startClock(timerSpan, time);
    // 게임 재시작할때 계속 시간이 10으로 돌아가는데 이유가 뭘까
}

// carrot이랑 bug용
section.addEventListener("click", (e) => console.log(e));

// redobtn
redoBtn.addEventListener("click", () => {
    checkState();
    // 모달 없애는거 추가
});