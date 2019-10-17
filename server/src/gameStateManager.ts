const gameRunning = false;
const gameboard: number[][] = [
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

const playerPositions: number[][] = [
  [1, 1],
  [gameboard[0].length - 2, 1],
  [1, gameboard.length - 2],
  [gameboard[gameboard.length - 1].length - 2, gameboard.length - 2]
];

export type Direction = "up" | "down" | "left" | "right";

const gameStateManager = (function() {
  function logGameBoard() {
    for (let rows = 0; rows < 15; ++rows) {
      for (let cols = 0; cols < 15; ++cols) {
        console.log(`${gameboard[rows][cols]} `);
      }
      console.log("\n");
    }
  }

  function movePlayer(playerNumber: number, dir: Direction): boolean {
    let x = playerPositions[playerNumber][0];
    let y = playerPositions[playerNumber][1];
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

  return {
    getGameBoard: () => gameboard,
    getPlayerPositions: () => playerPositions,
    movePlayer: movePlayer,
    logGameBoard: logGameBoard
  };
})();

export default gameStateManager;
