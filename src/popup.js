export default class Popup {
    constructor(elem, span) {
        this.elem = elem;
        this.span = span;
    }

    display(text) {
        this.span.innerText = text;
        this.elem.classList.remove("hidden");
    }

    hide() {
        this.elem.classList.add("hidden");
    }
}