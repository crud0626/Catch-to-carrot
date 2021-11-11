'use strict';

const timerSpan = document.querySelector("div.timer span");
const countSpan = document.querySelector("div.count span");

import PopUp from "./popup.js";
const popUp = new PopUp();

import Field from "./field.js";
const gameField = new Field();

import * as sound from "./sound.js";

export default class Game {
    constructor() {
        this.counter = 0;
        this.playTime = 0;
        this.timeID;

        this.topBtn = document.querySelector("div.topBtn");
        this.topBtn.addEventListener("click", e => {
            if (e.target.dataset.func === "play") {
                this.topBtn.innerHTML = `
                <i data-func="pause" class="fas fa-pause pauseBtn"></i>`;
                this.checkState(); // play버튼 눌렀을 때
            } else {
                this.topBtn.innerHTML = `
                <i data-func="play" class="fas fa-play playBtn"></i>`;
                this.stopClock();
            }
        });
        
        this.redoBtn = document.querySelector("div.redoBtn > i");
        this.redoBtn.addEventListener("click", () => {
            popUp.hide();
            this.redoGame();
        });

        gameField.section.addEventListener("click",event => {
            switch (event.target.alt) {
                case "bug":
                    this.failedGame();
                    sound.bugPlay();
                    break;
                case "carrot":
                    this.decreaseCount(event);
                    break;
            }
        });
    }

    decreaseCount(event) {
        sound.carrotPlay();
        let deleteItem = event.target.parentNode;
        deleteItem.remove();
    
        this.counter -= 1;
        countSpan.innerText = this.counter;
        if (this.counter === 0) {
            this.stopClock();
            popUp.display("YOU WON 🥳");
            sound.winPlay();
        }
    }

    // 일시정지 확인용
    checkState() {
        if(this.playTime === 0) {
            this.initGame();
        } else {
            this.startClock();
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
        this.topBtn.innerHTML = `<i data-func="pause" class="fas fa-pause pauseBtn"></i>`;
        this.initGame();
    }

    startClock() { // initGame에서 인자로 넘겼음.
        sound.mainPlay();
        this.timeID = setTimeout(() => {
            if (this.playTime === 0) {
                sound.alertPlay();
                this.stopClock();
                this.failedGame();
                return;
            }
            this.decreaseTime();
        }, 1000)
    }

    stopClock() {
    sound.mainStop();
    this.topBtn.innerHTML = `<i data-func="play" class="fas fa-play playBtn"></i>`;
    clearTimeout(this.timeID);
    // 멈췄을때 섹션에서 이벤트 빼기. 근데 이렇게 되면 resume할 때 이벤트리스너 다시 추가해야될수도
    }

    decreaseTime() {
    this.playTime -= 1;
    timerSpan.innerText = `00:0${this.playTime}`; 
    // time앞에 붙이는건 나중에 추가적으로 고려,
    // 이거 숫자니까 if 1 < 10보다 작으면 앞에 0붙이는걸로
    this.startClock();
    }

    failedGame() {
    popUp.display("YOU LOSE 😭");
    this.stopClock();
    }
}
