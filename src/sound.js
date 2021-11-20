'use strict';

export default class Sound {
    constructor() {
        this.alertSound = new Audio("./sound/alert.wav");
        this.mainSound = new Audio("./sound/bg.mp3");
        this.bugSound = new Audio("./sound/bug_pull.mp3");
        this.carrotSound = new Audio("./sound/carrot_pull.mp3");
        this.winSound = new Audio("./sound/game_win.mp3");
    }
    alertPlay() { 
        playSound(this.alertSound);
    };

    mainPlay() {
        playSound(this.mainSound);
    };

    bugPlay() {
        playSound(this.bugSound);
    };

    carrotPlay() {
        playSound(this.carrotSound);
    };

    winPlay() {
        playSound(this.winSound);
    };

    mainStop() {
        stopSound(this.mainSound);
    };
}

function playSound(sound) {
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}