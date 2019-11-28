"use strict";
exports.__esModule = true;
var gameRunning = false;
var gameboard = [
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 2],
    [2, 0, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 0, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 0, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 0, 2],
    [2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
];
var bombTime = 1000; // In miliseconds
var bombSize = 4; // In grid units
var playerPositions = [
    [1, 1],
    [gameboard[0].length - 2, 1],
    [1, gameboard.length - 2],
    [gameboard[gameboard.length - 1].length - 2, gameboard.length - 2]
];
var playerOptions = [
    {
        bombCount: 0,
        maxBombCount: 1
    },
    {
        bombCount: 0,
        maxBombCount: 1
    },
    {
        bombCount: 0,
        maxBombCount: 1
    },
    {
        bombCount: 0,
        maxBombCount: 1
    }
];
var gameStateManager = (function () {
    function logGameBoard() {
        for (var rows = 0; rows < 15; ++rows) {
            for (var cols = 0; cols < 15; ++cols) {
                console.log(gameboard[rows][cols] + " ");
            }
            console.log("\n");
        }
    }
    function movePlayer(playerNumber, dir) {
        var x = playerPositions[playerNumber][0];
        var y = playerPositions[playerNumber][1];
        switch (dir) {
            case "up":
                y -= 1;
                break;
            case "down":
                y += 1;
                break;
            case "left":
                x -= 1;
                break;
            case "right":
                x += 1;
                break;
            default:
                break;
        }
        if (gameboard[x][y] === 0) {
            playerPositions[playerNumber] = [x, y];
            return true;
        }
        return false;
    }
    function placeBomb(playerNumber) {
        if (playerOptions[playerNumber].bombCount <
            playerOptions[playerNumber].maxBombCount) {
            ++playerOptions[playerNumber].bombCount;
            var x_1 = playerPositions[playerNumber][0];
            var y_1 = playerPositions[playerNumber][1];
            gameboard[x_1][y_1] = 3;
            setTimeout(function () {
                setTimeout(function () {
                    --playerOptions[playerNumber].bombCount;
                    var spaceCount = bombSize / 2;
                    var dirs = [1, -1];
                    // Check vertical directions
                    for (var dir = 0; dir < dirs.length; ++dir) {
                        for (var i = 0; i < spaceCount; ++i) {
                            if (gameboard[x_1 + i * dirs[dir]][y_1] === 1) {
                                gameboard[x_1 + i * dirs[dir]][y_1] = 0;
                                break;
                            }
                            else if (gameboard[x_1 + i * dirs[dir]][y_1] === 2) {
                                break;
                            }
                        }
                    }
                    // Check horizontal directions
                    for (var dir = 0; dir < dirs.length; ++dir) {
                        for (var i = 0; i < spaceCount; ++i) {
                            if (gameboard[x_1][y_1 + i * dirs[dir]] === 1) {
                                gameboard[x_1][y_1 + i * dirs[dir]] = 0;
                                break;
                            }
                            else if (gameboard[x_1][y_1 + i * dirs[dir]] === 2) {
                                break;
                            }
                        }
                    }
                }, bombTime - 50);
            gameboard[x_1][y_1] = 0;
            }, 50);
            return true;
        }
        return false;
    }
    return {
        getGameBoard: function () { return gameboard; },
        getPlayerPositions: function () { return playerPositions; },
        movePlayer: movePlayer,
        placeBomb: placeBomb,
        logGameBoard: logGameBoard
    };
})();
exports["default"] = gameStateManager;
