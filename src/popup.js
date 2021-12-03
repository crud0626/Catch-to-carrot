'use strict';
export default class PopUp {
    constructor() {
        this.container = document.querySelector("div.modalcontainer");
        this.modal = document.querySelector("div.modal");
        this.span = document.querySelector("div.modal > span");
    }

    display(playTime, text) {
        if(!playTime) {
            this.span.innerText = text;
            this.modal.classList.remove("hidden");
        }
        this.container.classList.remove("hidden");
    }

    hide(playTime) {
        if(!playTime) {
            this.modal.classList.add("hidden");
        }
        this.container.classList.add("hidden");
    }
}
