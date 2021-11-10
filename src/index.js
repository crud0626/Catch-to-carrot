//일단 지금 모달안뜨는 버그 있음.

// const section = document.querySelector("section"); // Field
const topBtn = document.querySelector("div.topBtn");
// const redoBtn = document.querySelector("div.redoBtn > i"); // Game에 넣을예정.
const timerSpan = document.querySelector("div.timer span");
const countSpan = document.querySelector("div.count span");
const modalElem = document.querySelector("div.modal"); // popUp, 일단보류
const modalSpan = document.querySelector("div.modal > span"); // popUp, 일단보류

let timeChecker;
// let playTime;
// let counter;
// let timeID;

// import
import * as sound from "./sound.js";

import Popup from "./popup.js";
const popUp = new Popup(modalElem, modalSpan);

import Field from "./field.js";
const gameField = new Field();

import { Game, redoBtn} from "./game.js";

const game = new Game(timerSpan, countSpan, topBtn, popUp); // 인자 넣어야 할 수도 있음.


// Clear
topBtn.addEventListener("click", e => {
    if (e.target.dataset.func === "play") {
        topBtn.innerHTML = `<i data-func="pause" class="fas fa-pause pauseBtn"></i>`;
        checkState();
        console.log("Playing!");
    } else {
        topBtn.innerHTML = `<i data-func="play" class="fas fa-play playBtn"></i>`;
        game.stopClock();
    }
});

// Clear
function checkState() {
    if(timerSpan.innerText === "00:00") {
        game.initGame();
        console.log("init!");
    } else {
        game.startClock(timerSpan); // 인자 꼭 넣어야 되나?
    }
}

// Clear
// function initGame() {    
//     counter = 10;
//     playTime = 10;

//     timerSpan.innerText = `00:${playTime}`;

//     // Field 예정
//     gameField.createItem();

//     startClock(timerSpan);
//     countSpan.innerText = counter;

//     // 노래 재생도 넣어야함.
// }


// function startClock(timerSpan) {
//     sound.mainPlay();
//     timeID = setTimeout(() => {
//         if (playTime === 0) {
//             sound.alertPlay();
//             stopClock();
//             failedGame();
//             return;
//         }
//         decreaseTime(timerSpan);
//     }, 1000)
// }




// function decreaseTime(timerSpan) {
//     playTime -= 1;
//     timerSpan.innerText = `00:0${playTime}`; // time앞에 붙이는건 나중에 추가적으로 고려,
//     // 이거 숫자니까 if 1 < 10보다 작으면 앞에 0붙이는걸로
//     startClock(timerSpan);
// }

// Clear
// function stopClock() {
//     sound.mainStop();
//     topBtn.innerHTML = `<i data-func="play" class="fas fa-play playBtn"></i>`;
//     clearTimeout(timeID);
//     // 멈췄을때 섹션에서 이벤트 빼기. 근데 이렇게 되면 resume할 때 이벤트리스너 다시 추가해야될수도
// }

// 시간종료 및 버그 클릭했을때
// function failedGame() {
//     popUp.display("YOU LOSE 😭");
//     stopClock();
// }

// Field
function decreaseCount(e) {
    sound.carrotPlay();
    let deleteItem = e.target.parentNode;
    deleteItem.remove();

    game.counter -= 1;
    countSpan.innerText = game.counter;
    if (game.counter === 0) {
        game.stopClock();
        popUp.display("YOU WON 🥳");
        sound.winPlay();
    }

}

// 모달은 어차피 안눌려서 상관없음.
// 1. 여기서 이벤트를 등록한다. 일단 이걸로 했음
// 2. 함수로만들고 이벤트는 필드에서 등록한다. ------- 얘는 나중에 다시 고려
gameField.section.addEventListener("click", e => {
    switch (e.target.alt) {
        case "bug":
            game.failedGame();
            sound.bugPlay();
            break;
        case "carrot":
            decreaseCount(e);
            break;
    }
});

// redobtn, 처음부터 다시함.
redoBtn.addEventListener("click", () => {
    popUp.hide();
    checkState();
});