'use strict';

const timerSpan = document.querySelector("div.timer span");
const countSpan = document.querySelector("div.count span");

import PopUp from "./popup.js";
const popUp = new PopUp();

import Field from "./field.js";
const gameField = new Field();

import Sound from "./sound.js";
const sounds = new Sound();

export default class GameSetter {
    setCount(value) {
        this.count = value;
        return this;
    }
    setTime(value) {
        this.time = value;
        return this;
    }
    setItemSize(value) {
        this.itemSize = value;
        return this;
    }
    createGame() {
        new Game(this.count, this.time, this.itemSize)
    }
}

class Game {
    constructor(count, time, itemSize) {
        this.count = count;
        this.time = time;
        this.itemSize = itemSize;
        this.timeID;

        this.playingCount = 0;
        this.playingTime = 0;

        this.topBtn = document.querySelector("div.topBtn");
        this.topBtn.addEventListener("click", e => {
            if (e.target.dataset.func === "play") {
                this.topBtn.innerHTML = `
                <i data-func="pause" class="fas fa-pause pauseBtn"></i>`;
                this.checkPause();
            } else {
                this.topBtn.innerHTML = `
                <i data-func="play" class="fas fa-play playBtn"></i>`;
                sounds.mainStop();
                this.stopClock();
                popUp.offClickEvent();
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
                    this.failed();
                    sounds.bugPlay();
                    break;
                case "carrot":
                    this.decreaseCount(event);
                    break;
            }
        });
    }

    decreaseCount(event) {
        sounds.carrotPlay();
        let deleteItem = event.target.parentNode;
        deleteItem.remove();
    
        this.playingCount -= 1;
        countSpan.innerText = this.playingCount;
        if (this.playingCount === 0) {
            sounds.mainStop();
            sounds.winPlay();
            this.stopClock();
            popUp.display("YOU WON 🥳");
        }
    }

    checkPause() {
        if(this.playingTime === 0) {
            this.init();
        } else {
            this.startClock();
            popUp.onClickEvent();
        }
    }

    init() {
    gameField.section.innerHTML = "";
    this.playingCount = this.count;
    this.playingTime = this.time;
    this.displayTime();
    countSpan.innerText = this.playingCount;
    gameField.createItem(this.count, this.itemSize);
    this.startClock(timerSpan);
    
    }

    redo() {
        sounds.mainStop();
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
        }

    startClock() {
        sounds.mainPlay();
        this.timeID = setTimeout(() => {
            if (this.playingTime === 0) {
                sounds.mainStop();
                sounds.alertPlay();
                this.stopClock();
                this.failed();
                return;
            }
            this.decreaseTime();
        }, 1000)
    }

    decreaseTime() {
    this.playingTime -= 1;
    this.displayTime();
    this.startClock();
    }

    failed() {
    popUp.display("YOU LOSE 😭");
    sounds.mainStop();
    this.stopClock();
    }
    
    displayTime() {
        if(this.playingTime > 9) {
            timerSpan.innerText = `00:${this.playingTime}`;
        } else {
            timerSpan.innerText = `00:0${this.playingTime}`;
        }
    }
}
