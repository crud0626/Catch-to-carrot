'use strict';

import PopUp from "./popup.js";
const popUp = new PopUp();

import Field from "./field.js";
const gameField = new Field();

import Sound from "./sound.js";
const sounds = new Sound();

export default class GameSetter {
    setTime(value) {
        this.time = value;
        return this;
    }
    setItemSize(value) {
        this.itemSize = value;
        return this;
    }
    createGame() {
        new Game(this.time, this.itemSize);
    }
}

class Game {
    constructor(time, itemSize) {
        this.initTime = time;
        this.itemSize = itemSize;

        this.playingTime = 0;

        this.timerSpan = document.querySelector("div.timer span");
        this.countSpan = document.querySelector("div.count span");
        this.levelElem = document.querySelector("div.level");

        this.topBtn = document.querySelector("div.topBtn");
        this.topBtn.addEventListener("click", e => this.checkTopBtn(e));
        
        this.redoBtn = document.querySelector("div.redoBtn > i");
        this.redoBtn.addEventListener("click", () => this.redo());

        gameField.section.addEventListener("click", e => this.checkSectionEvent(e));
    }

    checkTopBtn(e) {
        if (e.target.dataset.func === "play") {
            this.checkPause();
            return;
        }
        this.topBtn.innerHTML = `<i data-func="play" class="fas fa-play playBtn"></i>`;
        sounds.mainStop();
        this.stopClock();
        popUp.display(this.playingTime);
        }

    checkSectionEvent(event) {
        switch (event.target.dataset.char) {
            case "bug":
                sounds.bugPlay();
                this.failed();
                break;
            case "carrot":
                sounds.carrotPlay();
                this.decreaseCount(event);
                break;
        }
    }

    decreaseCount(event) {
        const deleteItem = event.target.parentNode;
        deleteItem.remove();
        this.playingCount -= 1;
        this.countSpan.innerText = this.playingCount;
        if (!this.playingCount) {
            this.victory();
        }
    }

    checkPause() {
        if(!this.playingTime) {
            this.checkLevel();
            return;
        }
        this.startClock();
        sounds.mainPlay();
        popUp.hide(this.playingTime);
        this.topBtn.innerHTML = `<i data-func="pause" class="fas fa-pause pauseBtn"></i>`;
    }

    checkLevel() {
        const checkedElem = document.querySelector("input[type=radio]:checked");
        if (!checkedElem) {
            alert("레벨이 지정되지 않았습니다!");
            return;
        }
        this.init(+checkedElem.value);
        this.topBtn.innerHTML = `<i data-func="pause" class="fas fa-pause pauseBtn"></i>`;
    }

    init(count) {
    this.levelElem.classList.add("hidden");
    this.topBtn.classList.remove("hidden");
    this.playingTime = this.initTime;
    this.displayTime();
    gameField.section.innerHTML = "";
    gameField.createItem(count, this.itemSize);
    this.startClock();
    sounds.mainPlay();
    this.playingCount = count;
    this.countSpan.innerText = this.playingCount;
    }

    redo() {
        popUp.hide(this.playingTime);
        sounds.mainStop();
        this.stopClock();
        this.checkLevel();
    }

    stopClock() {
        clearTimeout(this.timeID);
    }

    startClock() {
        this.timeID = setTimeout(() => {
            if (!this.playingTime) {
                sounds.alertPlay();
                this.failed();
                return;
            }
            this.playingTime -= 1;
            this.displayTime();
            this.startClock();
        }, 1000)
    }

    victory() {
        sounds.mainStop();
        sounds.winPlay();
        this.levelElem.classList.remove("hidden");
        this.topBtn.classList.add("hidden");
        this.stopClock();
        this.playingTime = 0;
        popUp.display(this.playingTime, "YOU WON 🥳");
    }

    failed() {
        sounds.mainStop();
        this.levelElem.classList.remove("hidden");
        this.topBtn.classList.add("hidden");
        this.stopClock();
        this.playingTime = 0;
        popUp.display(this.playingTime, "YOU LOSE 😭");
    }
    
    displayTime() {
        this.timerSpan.innerText = this.playingTime > 9 
        ? `00:${this.playingTime}` 
        : `00:0${this.playingTime}`;
    }
}