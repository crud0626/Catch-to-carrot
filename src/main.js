'use strict';

import GameSetter from "./game.js";

// start가 클릭이 되면 그때 세팅시작.
// pause가 아이에 안먹힘. addEventListener여러개 걸어서그런듯.
new GameSetter()
// .setCount(+selector.value) // number로 전달되는거 확인.
// .setCount(5)
.setTime(10)
.setItemSize(80)
.createGame();
