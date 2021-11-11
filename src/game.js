'use strict';

const timerSpan = document.querySelector("div.timer span");
const countSpan = document.querySelector("div.count span");

import PopUp from "./popup.js";
const popUp = new PopUp();

import Field from "./field.js";
export const gameField = new Field();

import * as sound from "./sound.js";

export class Game {
    constructor(count, time) {
        this.count = count;
        this.time = time;
        this.timeID;

        // 임시
        this.playingCount = 0;
        this.playingTime = 0;

        this.topBtn = document.querySelector("div.topBtn");
        this.topBtn.addEventListener("click", e => {
            if (e.target.dataset.func === "play") {
                this.topBtn.innerHTML = `
                <i data-func="pause" class="fas fa-pause pauseBtn"></i>`;
                this.checkPause(); // play버튼 눌렀을 때
            } else {
                this.topBtn.innerHTML = `
                <i data-func="play" class="fas fa-play playBtn"></i>`;
                sound.mainStop();
                this.stopClock();
            }
        });
        
        this.redoBtn = document.querySelector("div.redoBtn > i");
        this.redoBtn.addEventListener("click", () => {
            popUp.hide();
            this.redo();
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
    
        this.playingCount -= 1;
        countSpan.innerText = this.playingCount;
        if (this.playingCount === 0) {
            sound.mainStop();
            sound.winPlay();
            this.stopClock();
            popUp.display("YOU WON 🥳");
        }
    }

    checkPause() {
        if(this.playingTime === 0) {
            this.init();
        } else {
            this.startClock();
        }
    }

    init() {
    gameField.section.innerHTML = "";
    this.playingCount = this.count;
    this.playingTime = this.time;
    timerSpan.innerText = `00:${this.playingTime}`;
    countSpan.innerText = this.playingCount;
    gameField.createItem();
    this.startClock(timerSpan);
    
    }

    redo() {
        sound.mainStop();
        this.stopClock(true);
        this.init();
    }

    stopClock(playing) {
        if (playing) {
            this.topBtn.innerHTML = `<i data-func="pause" class="fas fa-pause pauseBtn"></i>`;
        } else {
            this.topBtn.innerHTML = `<i data-func="play" class="fas fa-play playBtn"></i>`;
        }
        clearTimeout(this.timeID);
        // 멈췄을때 섹션에서 이벤트 빼기. 근데 이렇게 되면 resume할 때 이벤트리스너 다시 추가해야될수도
        }

    startClock() { // init에서 인자로 넘겼음.
        sound.mainPlay();
        this.timeID = setTimeout(() => {
            if (this.playingTime === 0) {
                sound.mainStop();
                sound.alertPlay();
                this.stopClock();
                this.failedGame();
                return;
            }
            this.decreaseTime();
        }, 1000)
    }

    decreaseTime() {
    this.playingTime -= 1;
    timerSpan.innerText = `00:0${this.playingTime}`; 
    // time앞에 붙이는건 나중에 추가적으로 고려,
    // 이거 숫자니까 if 1 < 10보다 작으면 앞에 0붙이는걸로
    this.startClock();
    }

    // failed로 수정, 나중에 주석 삭제할때 같이 하기.
    failedGame() {
    popUp.display("YOU LOSE 😭");
    sound.mainStop();
    this.stopClock();
    }
}
