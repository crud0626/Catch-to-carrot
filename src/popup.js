'use strict';
export default class PopUp {
    constructor() {
        this.container = document.querySelector("div.modalcontainer");
        this.modal = document.querySelector("div.modal");
        this.span = document.querySelector("div.modal > span");
    }

    display(text) {
        this.span.innerText = text;
        this.container.classList.remove("hidden");
        this.modal.classList.remove("hidden");
    }

    hide() {
        this.container.classList.add("hidden");
        this.modal.classList.add("hidden");
    }

    onClickEvent() {
        this.container.classList.add("hidden");
    }

    offClickEvent() {
        this.container.classList.remove("hidden");
    }
}
