const section = document.querySelector("section");
const topBtn = document.querySelector("div.topBtn");
const redoBtn = document.querySelector("div.redoBtn > i");
const timerSpan = document.querySelector("div.timer span");
const countSpan = document.querySelector("div.count span");
const modalElem = document.querySelector("div.modal");
const modalSpan = document.querySelector("div.modal > span");

let playTime;
let timeChecker;
let counter;

// Clear
topBtn.addEventListener("click", e => {
    if (e.target.dataset.func === "play") {
        topBtn.innerHTML = `<i data-func="pause" class="fas fa-pause pauseBtn"></i>`;
        checkState();
        console.log("Playing!");
    } else {
        topBtn.innerHTML = `<i data-func="play" class="fas fa-play playBtn"></i>`;
        stopClock();
    }
});

// Clear
function checkState() {
    if(timerSpan.innerText === "00:00") {
        initGame();
        console.log("init!");
    } else {
        resumeGame();
        console.log("resume!");
    }
}

// Clear
function initGame() {    
    // counter랑 carrot개수랑 숫자 맞추기.
    counter = 10;
    playTime = 10;

    timerSpan.innerText = `00:${playTime}`;

    // Test
    createItem();

    startClock(timerSpan);
    countSpan.innerText = counter;

    // 노래 재생도 넣어야함.
}

let timeID;

// Clear
function startClock(timerSpan) {
    timeID = setTimeout(() => {
        if (playTime === 0) {
            stopClock();
            // displayModal()
            return;
        }
        decreaseTime(timerSpan);
    }, 1000)
}

function decreaseTime(timerSpan) {
    playTime -= 1;

    // console.log(`Decreasing time is ${sibalTime}`);
    timerSpan.innerText = `00:0${playTime}`; // time앞에 붙이는건 나중에 추가적으로 고려,
    // 이거 숫자니까 if 1 < 10보다 작으면 앞에 0붙이는걸로
    startClock(timerSpan);
}

// Clear
function stopClock() {
    console.log(`stopping time is ${playTime}`);
    topBtn.innerHTML = `<i data-func="play" class="fas fa-play playBtn"></i>`;
    clearTimeout(timeID);
}

function resumeGame() {
    startClock(timerSpan);
}

// test결과 여유있게 x는 ~90vw, y는 ~30vh정도까지가 스크롤이 생기지 않아 난수를 제한할 수 있도록 했다.
function createItem() {
    let item = 10;
    let itemsElem = [];

    for (let i = 0; i < item; i++) {
        let bugX = Math.random() * (90 - 0) + 0;
        let bugY = Math.random() * (30 - 0) + 0;

        let carrotX = Math.random() * (90 - 0) + 0;
        let carrotY = Math.random() * (30 - 0) + 0;

        itemsElem.push(`<div style="transform: translate(${bugX}vw, ${bugY}vh);" class="item"><img src="./img/bug.png" alt="bug"></div>`);
        itemsElem.push(`<div style="transform: translate(${carrotX}vw,${carrotY}vh);" class="item"><img src="./img/carrot.png" alt="carrot"></div>`);
    }
    itemsElem.forEach((elem) => section.innerHTML += elem);
}

// 시간종료 및 버그 클릭했을때
function failedGame() {
    // 모달 창 띄우기 및 span에 fail쓰기
    // 시간멈추기
    // 실패 BGM 재생.
}


// 캐럿추가했을때, 숫자 떨어지는거, (조건문 사용해서 마지막 일 경우 연계하기)
function decreaseCount(e) {
    let deleteItem = e.target.parentNode;
    deleteItem.remove();

    counter -= 1;
    countSpan.innerText = counter;
    if (counter === 0) {
        stopClock();
        modalSpan.innerText = "YOU WON 🥳";
        modalElem.classList.remove("hidden");
    }
}


// carrot이랑 bug용, 여기서 아이에 bug랑 carrot 갈라버려야겠다.
// 모달은 어차피 안눌려서 상관없음.
section.addEventListener("click", e => {
    switch (e.target.alt) {
        case "bug":
            console.log("bug!");
            break;
        case "carrot":
            decreaseCount(e);
            break;
    }
});

// redobtn
redoBtn.addEventListener("click", () => {
    modalElem.classList.add("hidden");
    checkState();
    // 모달 없애는거 추가
});