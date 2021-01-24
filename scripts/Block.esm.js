import { Sprite } from "./Sprite.esm.js";
import { media } from "./Media.esm.js";

const BLOCK_HEIGHT = 32;
const BLOCK_WIDTH = 64;
const NUMBER_OF_BLOCK_VARIANTS = 2;

export class Block extends Sprite {
    constructor(x, y, kind) {
        const positionX = x * BLOCK_WIDTH + BLOCK_WIDTH;
        const positionY = y * BLOCK_HEIGHT + BLOCK_HEIGHT;

        super(
            0,
            0,
            BLOCK_WIDTH,
            BLOCK_HEIGHT,
            media.spriteImage,
            positionX,
            positionY,
            NUMBER_OF_BLOCK_VARIANTS
        );
        this.kind = kind;
    }

    draw() {
        super.draw(this.kind);
    }
}
