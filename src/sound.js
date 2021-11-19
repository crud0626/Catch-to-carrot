'use strict';

const alertSound = new Audio("./sound/alert.wav");
const mainSound = new Audio("./sound/bg.mp3");
const bugSound = new Audio("./sound/bug_pull.mp3");
const carrotSound = new Audio("./sound/carrot_pull.mp3");
const winSound = new Audio("./sound/game_win.mp3");


export function alertPlay() { playSound(alertSound)};

export function mainPlay() { playSound(mainSound)};

export function bugPlay() { playSound(bugSound)};

export function carrotPlay() { playSound(carrotSound)};

export function winPlay() { playSound(winSound)};

export function mainStop() { stopSound(mainSound)};

function playSound(sound) {
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}