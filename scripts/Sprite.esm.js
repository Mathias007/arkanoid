import { canvas } from "./Canvas.esm.js";

/**
 * @typedef {{ x: number, y: number }} Offset
 */

/**
 * Class for creating Sprite object
 */

export class Sprite {
    /**
     * Create a sprite object
     * @param {!number} spriteX The x-axis coordinate of the top left corner of the sub-rectangle of the source image to draw into the destination context.
     * @param {!number} spriteY The y-axis coordinate of the top left corner of the sub-rectangle of the source image to draw into the destination context.
     * @param {!number} width The width of the sub-rectangle of the source image to draw into the destination context
     * @param {!number} height The height of the sub-rectangle of the source image to draw into the destination context.
     * @param {!CanvasImageSource} spritesImage An element to draw into the context.
     * @param {!number} x X position of sprite in canvas
     * @param {!number} y Y position of sprite in canvas
     * @param {number} [numberOfSprites = 1] Default = 1, Number of sprite images in the main image
     * @param {Offset} [offset = {x: 0, y: 0}] Default = {x: 0, y: 0}, Offset to draw
     */
    constructor(
        spriteX,
        spriteY,
        width,
        height,
        spritesImage,
        x,
        y,
        numberOfSprites = 1,
        offset = { x: 0, y: 0 }
    ) {
        /**
         * @type {!number}
         */
        this.alpha = 255;
        this.height = height;
        this.numberOfSprites = numberOfSprites;
        this.offset = { ...offset };
        this.spritesImage = spritesImage;
        this.spriteStartX = spriteX;
        this.spriteStartY = spriteY;
        this.width = width;
        this.x = x;
        this.y = y;
    }

    /**
     * Method draw sprite into the canvas context
     * @param {number} [numberOfSprites = 0] Number of index sprite to draw
     * @param {number} [ratio = 1] Scale if it is different than 1
     */

    draw(numberOfSprites = 0, ratio = 1) {
        if (numberOfSprites > this.numberOfSprites) {
            return;
        }

        if (this.alpha !== 255) {
            canvas.context.globalAlpha = this.alpha / 255;
        }

        const startPointToDrawX =
            numberOfSprites * this.width + this.spriteStartX;

        canvas.context.drawImage(
            this.spritesImage,
            startPointToDrawX,
            this.spriteStartY,
            this.width,
            this.height,
            this.x + this.offset.x,
            this.y + this.offset.y,
            this.width * ratio,
            this.height * ratio
        );

        if (this.alpha !== 255) {
            canvas.context.globalAlpha = 1;
        }
    }

    checkCollisionWithAnotherSprite(vector, anotherSprite) {
        const [
            collisionPointX,
            collisionPointY,
        ] = this.getProperlyCollisionPoints(vector);

        if (
            anotherSprite.x < collisionPointX &&
            collisionPointX < anotherSprite.x + anotherSprite.width &&
            anotherSprite.y < collisionPointY &&
            collisionPointY < anotherSprite.y + anotherSprite.height
        ) {
            return true;
        }

        return false;
    }

    getProperlyCollisionPoints(vector) {
        const collisionPointX = vector.dx < 0 ? this.x : this.x + this.width;

        const collisionPointY = vector.dy < 0 ? this.y : this.y + this.height;

        return [collisionPointX, collisionPointY];
    }
}
