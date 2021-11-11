'use strict';
export const redoBtn = document.querySelector("div.redoBtn > i");
export const topBtn = document.querySelector("div.topBtn");
export const timerSpan = document.querySelector("div.timer span");
export const countSpan = document.querySelector("div.count span");

import Field from "./field.js";
const gameField = new Field();

import * as sound from "./sound.js";

export class Game {
    constructor(popUp) {
        this.popUp = popUp;

        this.counter = 0;
        this.playTime = 0;
        this.timeID;

        redoBtn.addEventListener("click", () => {
            this.popUp.hide();
            this.checkState();
        });
    }

    decreaseCount(e) {
        sound.carrotPlay();
        let deleteItem = e.target.parentNode;
        deleteItem.remove();
    
        this.counter -= 1;
        countSpan.innerText = this.counter;
        if (this.counter === 0) {
            this.stopClock();
            this.popUp.display("YOU WON 🥳");
            sound.winPlay();
        }
    }

    // 일시정지 확인용
    checkState() {
        if(this.playTime === 0) {
            this.initGame();
        } else {
            this.startClock(timerSpan); // 인자 꼭 넣어야 되나?
        }
    }

    initGame() {
    gameField.section.innerHTML = "";
    this.counter = 10;
    this.playTime = 10;
    timerSpan.innerText = `00:${this.playTime}`;
    gameField.createItem();
    this.startClock(timerSpan);
    countSpan.innerText = this.counter;
    }

    redoGame() {
        clearTimeout(this.timeID);
        topBtn.innerHTML = `<i data-func="pause" class="fas fa-pause pauseBtn"></i>`;
        this.initGame();
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
    topBtn.innerHTML = `<i data-func="play" class="fas fa-play playBtn"></i>`;
    clearTimeout(this.timeID);
    // 멈췄을때 섹션에서 이벤트 빼기. 근데 이렇게 되면 resume할 때 이벤트리스너 다시 추가해야될수도
    }

    decreaseTime(timerSpan) {
    this.playTime -= 1;
    timerSpan.innerText = `00:0${this.playTime}`; // time앞에 붙이는건 나중에 추가적으로 고려,
    // 이거 숫자니까 if 1 < 10보다 작으면 앞에 0붙이는걸로
    this.startClock(timerSpan);
    }

    failedGame() {
    this.popUp.display("YOU LOSE 😭");
    this.stopClock();
    }
}
