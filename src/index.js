//일단 지금 모달안뜨는 버그 있음.

const modalElem = document.querySelector("div.modal"); // popUp, 일단보류
const modalSpan = document.querySelector("div.modal > span"); // popUp, 일단보류

// import
import * as sound from "./sound.js";

import Popup from "./popup.js";
const popUp = new Popup(modalElem, modalSpan);

import Field from "./field.js";
const gameField = new Field();

import { Game, redoBtn, topBtn} from "./game.js";

const game = new Game(popUp); // 인자 넣어야 할 수도 있음.


// Clear
topBtn.addEventListener("click", e => {
    if (e.target.dataset.func === "play") {
        topBtn.innerHTML = `<i data-func="pause" class="fas fa-pause pauseBtn"></i>`;
        game.checkState(); // play버튼 눌렀을 때
    } else {
        topBtn.innerHTML = `<i data-func="play" class="fas fa-play playBtn"></i>`;
        game.stopClock();
    }
});

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
            game.decreaseCount(e);
            break;
        default:
            console.log("Error! This is undefined");
            break;
    }
});

redoBtn.addEventListener("click", () => {
    popUp.hide();
    game.redoGame();
});