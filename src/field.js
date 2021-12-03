
'use strict';

export default class Field {
    constructor() {
        this.section = document.querySelector("section");
    }

    createItem(itemNum, itemSize) {
        let itemsElem = [];
        let maxWidth = this.section.clientWidth - itemSize;
        let maxHeight = this.section.clientHeight - itemSize;        
        let minValue = itemSize / 2;

        for (let i = 0; i < itemNum; i++) {
            let bugX = Math.floor(Math.random() * (maxWidth - minValue) + minValue);
            let bugY = Math.floor(Math.random() * (maxHeight - minValue) + minValue);

            let carrotX = Math.floor(Math.random() * (maxWidth - minValue) + minValue);
            let carrotY = Math.floor(Math.random() * (maxHeight - minValue) + minValue);

            itemsElem.push(`<div style="transform: translate(${bugX}px, ${bugY}px);" class="item"><img src="./img/bug.png" data-char="bug" alt="bugimage"></div>`);
            itemsElem.push(`<div style="transform: translate(${carrotX}px, ${carrotY}px);" class="item"><img src="./img/carrot.png" data-char="carrot" alt="carrotimage"></div>`);
        }
        itemsElem.forEach((elem) => this.section.innerHTML += elem);
    }
}