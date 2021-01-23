export class GameState {
    constructor(level, diamonds, diamondsSpriteImage) {
        let _playerScores = 0;
        let _gameBoard = diamonds.map(
            ({ x, y, row, column, kind }) =>
                new Diamond(x, y, row, column, kind, diamondsSpriteImage)
        );

        this._level = level;

        this.isPlayerWinner = () => _playerScores >= this._pointsToWin;
        this.getGameBoard = () => _gameBoard;
    }

    get level() {
        return this._level;
    }
}
