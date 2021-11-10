
export default class Field {
    constructor() {
        this.section = document.querySelector("section");


    }

    createItem() {
        // 얘네도 변수로 받을 예정
        let item = 10;
        let itemsElem = [];

        // test결과 여유있게 x는 ~90vw, y는 ~30vh정도까지가 스크롤이 생기지 않아 난수를 제한할 수 있도록 했다.
        // math.random 함수로 빼고 item크기로 해서 위치 잡을 예정.
        for (let i = 0; i < item; i++) {
            let bugX = Math.random() * (90 - 0) + 0;
            let bugY = Math.random() * (30 - 0) + 0;

            let carrotX = Math.random() * (90 - 0) + 0;
            let carrotY = Math.random() * (30 - 0) + 0;

            itemsElem.push(`<div style="transform: translate(${bugX}vw, ${bugY}vh);" class="item"><img src="./img/bug.png" alt="bug"></div>`);
            itemsElem.push(`<div style="transform: translate(${carrotX}vw, ${carrotY}vh);" class="item"><img src="./img/carrot.png" alt="carrot"></div>`);
        }
        itemsElem.forEach((elem) => this.section.innerHTML += elem);
    }
}