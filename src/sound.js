// 사운드 정상작동
// function많은게 별로 맘에 안드는데 함수 2개(play, stop)로 줄일 수 있는 방법있는지 찾아보기.

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