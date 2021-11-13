'use strict';

import { Game, gameField } from "./game.js";

const count = 10;
const time = 10;
const itemSize = 80; // 가변적으로 받아오는 방법을 없을까 고민중.

const game = new Game(count, time, itemSize);

gameField.setItemNum(count);