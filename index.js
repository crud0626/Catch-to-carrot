const section = document.querySelector("section");
const topBtn = document.querySelector("div.topBtn");
const redoBtn = document.querySelector("div.redoBtn > i");
const timerSpan = document.querySelector("div.timer span");
const countSpan = document.querySelector("div.count span");
const modalSpan = document.querySelector("div.modal > span");

let playTime;
let timeChecker;

// Clear
topBtn.addEventListener("click", e => {
    if (e.target.dataset.func === "play") {
        topBtn.innerHTML = `<i data-func="pause" class="fas fa-pause pauseBtn"></i>`;
        checkState();
        console.log("Playing!");
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
    // counter랑 carrot개수랑 숫자 맞추기.
    let counter = 10;
    playTime = 10;

    timerSpan.innerText = `00:${playTime}`;

    startClock(timerSpan);
    countSpan.innerText = counter;

    // 노래 재생도 넣어야함.
}

let timeID;

// Clear
function startClock(timerSpan) {
    timeID = setTimeout(() => {
        if (playTime === 0) {
            stopClock();
            // displayModal()
            return;
        }
        decreaseTime(timerSpan);
    }, 1000)
}

function decreaseTime(timerSpan) {
    playTime -= 1;

    // console.log(`Decreasing time is ${sibalTime}`);
    timerSpan.innerText = `00:0${playTime}`; // time앞에 붙이는건 나중에 추가적으로 고려,
    // 이거 숫자니까 if 1 < 10보다 작으면 앞에 0붙이는걸로
    startClock(timerSpan);
}

// Clear
function stopClock() {
    console.log(`stopping time is ${playTime}`);
    topBtn.innerHTML = `<i data-func="play" class="fas fa-play playBtn"></i>`;
    clearTimeout(timeID);
}

function resumeGame() {
    startClock(timerSpan);
}








// carrot이랑 bug용
section.addEventListener("click", (e) => console.log(e));

// redobtn
redoBtn.addEventListener("click", () => {
    checkState();
    // 모달 없애는거 추가
});