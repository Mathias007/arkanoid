import { Sprite } from "./Sprite.esm.js";
import { media } from "./Media.esm.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./Canvas.esm.js";

const PADDLE_START_SPRITE_X = 129;
const PADDLE_WIDTH = 102;

export const PADDLE_HEIGHT = 23;

export class Paddle extends Sprite {
    constructor() {
        super(
            PADDLE_START_SPRITE_X,
            0,
            PADDLE_WIDTH,
            PADDLE_HEIGHT,
            media.spriteImage,
            CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2,
            CANVAS_HEIGHT - PADDLE_HEIGHT
        );
    }

    movePlayerLeft() {
        this.x--;

        if (this.x < 0) {
            this.x = 0;
            return false;
        }

        return true;
    }

    movePlayerRight() {
        this.x++;

        if (this.x + PADDLE_WIDTH > CANVAS_WIDTH) {
            this.x = CANVAS_WIDTH - PADDLE_WIDTH;
            return false;
        }

        return true;
    }
}
