import { Common, VISIBLE_SCREEN } from "./Common.esm.js";
import { DATALOADED_EVENT_NAME } from "./Loader.esm.js";
import { gameLevels } from "./gameLevels.esm.js";
import { canvas } from "./Canvas.esm.js";
import { media } from "./Media.esm.js";
import { resultScreen } from "./ResultScreen.esm.js";
import { userData } from "./UserData.esm.js";
import { mainMenu } from "./MainMenu.esm.js";
import { Sprite } from "./Sprite.esm.js";
import { Paddle } from "./Paddle.esm.js";
import {
    keyBoardController,
    KEY_CODE_LEFT,
    KEY_CODE_PAUSE,
    KEY_CODE_RIGHT,
} from "./KeyboardController.esm.js";

const PLAYER_SPEED = 10;

class Game extends Common {
    constructor() {
        super();
    }

    playLevel(level) {
        window.removeEventListener(DATALOADED_EVENT_NAME, this.playLevel);

        this.background = new Sprite(0, 33, 800, 450, media.spriteImage, 0, 0);
        this.paddle = new Paddle();
        this.gameState = { isGamePaused: false };
        // this.gameState = new GameState();
        this.changeVisibilityScreen(canvas.element, VISIBLE_SCREEN);
        this.changeVisibilityScreen(
            mainMenu.miniSettingsLayerElement,
            VISIBLE_SCREEN
        );
        media.isInLevel = true;
        media.playBackgroundMusic();
        this.animate();
    }

    animate() {
        this.handleKeyboardClick();
        this.drawSprites();
        this.checkEndOfGame();
    }

    handleKeyboardClick() {
        const { clickedKey: key } = keyBoardController;

        if (!key) {
            return;
        }

        if (key == KEY_CODE_PAUSE) {
            this.gameState.isGamePaused = true;
            keyBoardController.clickedKey = null;
            return;
        }

        if (!this.gameState.isGamePaused && key === KEY_CODE_LEFT) {
            for (let i = PLAYER_SPEED; this.paddle.movePlayerLeft() && i; i--);
            keyBoardController.clickedKey = null;
            return;
        }

        if (!this.gameState.isGamePaused && key === KEY_CODE_RIGHT) {
            for (let i = PLAYER_SPEED; this.paddle.movePlayerRight() && i; i--);
            keyBoardController.clickedKey = null;
            return;
        }
    }

    drawSprites() {
        this.background.draw(0, 1.25);
        this.paddle.draw();
    }

    checkEndOfGame() {
        if (false) {
            media.isInLevel = false;
            media.stopBackgroundMusic();
            const isPlayerWinner = this.gameState.isPlayerWinner();
            const currentLevel = Number(this.gameState.level);

            if (isPlayerWinner && gameLevels[currentLevel]) {
                if (!userData.checkAvailabilityLevel(currentLevel + 1)) {
                    userData.addNewLevel(currentLevel + 1);
                }
            }

            if (
                userData.getHighScores(currentLevel) <
                this.gameState.getPlayerPoints()
            ) {
                userData.setHighScore(
                    currentLevel,
                    this.gameState.getPlayerPoints()
                );
            }

            resultScreen.viewResultScreen(
                isPlayerWinner,
                this.gameState.getPlayerPoints(),
                currentLevel
            );
        } else {
            this.animationFrame = window.requestAnimationFrame(() =>
                this.animate()
            );
        }
    }
}

export const game = new Game();
