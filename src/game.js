// 일단 여기까지는 정상으로 나옴 index.js에서 생성했던 popUp클래스의 인스턴스를 인자로 보내서
// 여기로 가져왔음.

export const redoBtn = document.querySelector("div.redoBtn > i");

import Field from "./field.js";
const gameField = new Field();

import * as sound from "./sound.js";

export class Game {
    constructor(timerSpan, countSpan, topBtn, popUp) {
        this.timerSpan = timerSpan;
        this.countSpan = countSpan;
        this.topBtn = topBtn;
        this.popUp = popUp;


        this.counter = 0;
        this.playtime = 0;
        this.timeID;
    }

    initGame() {    
    this.counter = 10;
    this.playTime = 10;

    this.timerSpan.innerText = `00:${this.playTime}`;

    gameField.createItem();

    this.startClock(this.timerSpan);
    this.countSpan.innerText = this.counter;
    }

    startClock(timerSpan) { // initGame에서 인자로 넘겼음.
    sound.mainPlay();
    this.timeID = setTimeout(() => {
        if (this.playTime === 0) {
            sound.alertPlay();
            this.stopClock();
            this.failedGame();
            return;
        }
        this.decreaseTime(timerSpan);
    }, 1000)
    }

    stopClock() {
    sound.mainStop();
    this.topBtn.innerHTML = `<i data-func="play" class="fas fa-play playBtn"></i>`;
    clearTimeout(this.timeID);
    // 멈췄을때 섹션에서 이벤트 빼기. 근데 이렇게 되면 resume할 때 이벤트리스너 다시 추가해야될수도
    }

    decreaseTime(timerSpan) {
    this.playTime -= 1;
    this.timerSpan.innerText = `00:0${this.playTime}`; // time앞에 붙이는건 나중에 추가적으로 고려,
    // 이거 숫자니까 if 1 < 10보다 작으면 앞에 0붙이는걸로
    this.startClock(timerSpan);
    }

    stopClock() {
    sound.mainStop();
    this.topBtn.innerHTML = `<i data-func="play" class="fas fa-play playBtn"></i>`;
    clearTimeout(this.timeID);
    // 멈췄을때 섹션에서 이벤트 빼기. 근데 이렇게 되면 resume할 때 이벤트리스너 다시 추가해야될수도
    }

    failedGame() {
    this.popUp.display("YOU LOSE 😭");
    this.stopClock();
    }
}