import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./Canvas.esm.js";
import { PADDLE_HEIGHT } from "./Paddle.esm.js";
import { Sprite } from "./Sprite.esm.js";
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

    moveAndCheckCollision() {
        this.x += this.dx;

        this.y += this.dy;

        if (this.x < 0 || this.x > CANVAS_WIDTH - this.width) {
            this.revertXDirection();
        }

        if (this.y < 0) {
            this.revertYDirection();
        }
    }

    hadHitOnBottomEdge() {
        return this.y + this.height > CANVAS_HEIGHT;
    }
}
