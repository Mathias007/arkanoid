import { Sprite } from "./Sprite.esm.js";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "./Canvas.esm.js";
import { PADDLE_HEIGHT } from "./Paddle.esm.js";
import { media } from "./Media.esm.js";

const BALL_START_X_SPRITE = 232;
const BALL_SIZE = 22;

export class Ball extends Sprite {
    constructor() {
        const x = CANVAS_WIDTH / 2 - BALL_SIZE / 2;
        const y = CANVAS_HEIGHT - BALL_SIZE - PADDLE_HEIGHT;

        super(
            BALL_START_X_SPRITE,
            0,
            BALL_SIZE,
            BALL_SIZE,
            media.spriteImage,
            x,
            y
        );

        this.dx = -6;
        this.dy = -5;
    }

    revertXDirection() {
        this.dx = -this.dx;
    }

    revertYDirection() {
        this.dy = -this.dy;
    }

    moveAndCheckCollision(blocks) {
        const { dx, dy } = this;
        const blocksToRemove = [];
        const vector = { dx, dy };

        this.x += dx;
        blocks.forEach((block, index) => {
            if (this.checkCollisionWithAnotherSprite(vector, block)) {
                blocksToRemove.push(index);
                this.revertXDirection();
            }
        });

        this.y += dy;
        blocks.forEach((block, index) => {
            if (this.checkCollisionWithAnotherSprite(vector, block)) {
                if (!blocksToRemove.includes(index)) {
                    blocksToRemove.push(index);
                }

                this.revertYDirection();
            }
        });

        if (this.x < 0 || this.x > CANVAS_WIDTH - this.width) {
            this.revertXDirection();
        }

        if (this.y < 0) {
            this.revertYDirection();
        }

        blocksToRemove.forEach((index) => {
            if (blocks[index].kind) {
                blocks[index].kind--;
            } else {
                blocks.splice(index, 1);
            }
        });
    }

    hadHitOnBottomEdge() {
        return this.y + this.height > CANVAS_HEIGHT;
    }
}
