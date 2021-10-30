const section = document.querySelector("section");
const topBtn = document.querySelector("div.topBtn");
const redoBtn = document.querySelector("div.redoBtn > i");
const timerSpan = document.querySelector("div.timer span");
const countSpan = document.querySelector("div.count span");
const modalElem = document.querySelector("div.modal");
const modalSpan = document.querySelector("div.modal > span");

let playTime;
let timeChecker;
let counter;
let timeID;

// Audio variable

const alertSound = new Audio();
alertSound.src = "./sound/alert.wav";
const mainSound = new Audio();
mainSound.src = "./sound/bg.mp3";
const bugSound = new Audio();
bugSound.src = "./sound/bug_pull.mp3";
const carrotSound = new Audio();
carrotSound.src = "./sound/carrot_pull.mp3";
const winSound = new Audio();
winSound.src = "./sound/game_win.mp3";

// End of audio


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
        startClock(timerSpan); // 인자 꼭 넣어야 되나?
    }
}

// Clear
function initGame() {    
    counter = 10;
    playTime = 10;

    timerSpan.innerText = `00:${playTime}`;

    // Test
    createItem();

    startClock(timerSpan);
    countSpan.innerText = counter;

    // 노래 재생도 넣어야함.
}

// Clear
function startClock(timerSpan) {
    mainSound.play();
    timeID = setTimeout(() => {
        if (playTime === 0) {
            alertSound.play();
            stopClock();
            failedGame();
            return;
        }
        decreaseTime(timerSpan);
    }, 1000)
}

function decreaseTime(timerSpan) {
    playTime -= 1;
    timerSpan.innerText = `00:0${playTime}`; // time앞에 붙이는건 나중에 추가적으로 고려,
    // 이거 숫자니까 if 1 < 10보다 작으면 앞에 0붙이는걸로
    startClock(timerSpan);
}

// Clear
function stopClock() {
    mainSound.pause();
    topBtn.innerHTML = `<i data-func="play" class="fas fa-play playBtn"></i>`;
    clearTimeout(timeID);
    // 멈췄을때 섹션에서 이벤트 빼기. 근데 이렇게 되면 resume할 때 이벤트리스너 다시 추가해야될수도
}

// test결과 여유있게 x는 ~90vw, y는 ~30vh정도까지가 스크롤이 생기지 않아 난수를 제한할 수 있도록 했다.
function createItem() {
    let item = 10;
    let itemsElem = [];

    for (let i = 0; i < item; i++) {
        let bugX = Math.random() * (90 - 0) + 0;
        let bugY = Math.random() * (30 - 0) + 0;

        let carrotX = Math.random() * (90 - 0) + 0;
        let carrotY = Math.random() * (30 - 0) + 0;

        itemsElem.push(`<div style="transform: translate(${bugX}vw, ${bugY}vh);" class="item"><img src="./img/bug.png" alt="bug"></div>`);
        itemsElem.push(`<div style="transform: translate(${carrotX}vw, ${carrotY}vh);" class="item"><img src="./img/carrot.png" alt="carrot"></div>`);
    }
    itemsElem.forEach((elem) => section.innerHTML += elem);
}

// 시간종료 및 버그 클릭했을때
function failedGame() {
    modalSpan.innerText = "YOU LOSE 😭";
    modalElem.classList.remove("hidden");
    stopClock();
}

function decreaseCount(e) {
    carrotSound.play();
    let deleteItem = e.target.parentNode;
    deleteItem.remove();

    counter -= 1;
    countSpan.innerText = counter;
    if (counter === 0) {
        stopClock();
        modalSpan.innerText = "YOU WON 🥳";
        modalElem.classList.remove("hidden");
        winSound.play();
    }
    // BGM

}

// 모달은 어차피 안눌려서 상관없음.
section.addEventListener("click", e => {
    switch (e.target.alt) {
        case "bug":
            failedGame();
            bugSound.play();
            break;
        case "carrot":
            decreaseCount(e);
            break;
    }
});

// redobtn, 처음부터 다시함.
redoBtn.addEventListener("click", () => {
    modalElem.classList.add("hidden");
    checkState();
    // 모달 없애는거 추가
});