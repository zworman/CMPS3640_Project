const gameRunning = false;
const gameboard: number[][] = [
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],    // 0 -> Open Block
  [2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 2],    // 1 -> Breakable Block
  [2, 0, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 0, 2],    // 2 -> Unbreakable Block
  [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],    // 3 -> Bomb
  [2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2],    // 4 -> Flame
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
const bombTime = 1000; // In miliseconds
const bombSize = 4; // In grid units

const playerPositions: number[][] = [
  [1, 1],
  [gameboard[0].length - 2, 1],
  [1, gameboard.length - 2],
  [gameboard[gameboard.length - 1].length - 2, gameboard.length - 2]
];

const playerOptions: { bombCount: number; maxBombCount: number }[] = [
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

  function placeBomb(playerNumber: number): boolean {
    if (
      playerOptions[playerNumber].bombCount <
      playerOptions[playerNumber].maxBombCount
    ) {
      ++playerOptions[playerNumber].bombCount;
      const x = playerPositions[playerNumber][0];
      const y = playerPositions[playerNumber][1];
      gameboard[x][y] = 3;
      setTimeout(() => {
        --playerOptions[playerNumber].bombCount;
        const spaceCount = bombSize / 2;
        let dirs = [1, -1];
        // Turns Blocks Red
        setTimeout(() => {
          // Check vertical directions
          for (let dir = 0; dir < dirs.length; ++dir) {
            for (let i = 0; i < spaceCount; ++i) {
              if (gameboard[x + i * dirs[dir]][y] !== 2) {
                gameboard[x + i * dirs[dir]][y] = 4;
              } else if (gameboard[x + i * dirs[dir]][y] === 2) {
                break;
              }
            }
          }
          // Check horizontal directions
          for (let dir = 0; dir < dirs.length; ++dir) {
            for (let i = 0; i < spaceCount; ++i) {
              if (gameboard[x][y + i * dirs[dir]] !== 2) {
                gameboard[x][y + i * dirs[dir]] = 4;
              } else if (gameboard[x][y + i * dirs[dir]] === 2) {
                break;
              }
            }
          }
        }, bombTime - 300);
        // Turns Blocks Black
        setTimeout(() => {
          // Check vertical directions
          for (let dir = 0; dir < dirs.length; ++dir) {
            for (let i = 0; i < spaceCount; ++i) {
              if (gameboard[x + i * dirs[dir]][y] === 4) {
                gameboard[x + i * dirs[dir]][y] = 0;
              } else if (gameboard[x + i * dirs[dir]][y] === 2) {
                break;
              }
            }
          }
          // Check horizontal directions
          for (let dir = 0; dir < dirs.length; ++dir) {
            for (let i = 0; i < spaceCount; ++i) {
              if (gameboard[x][y + i * dirs[dir]] === 4) {
                gameboard[x][y + i * dirs[dir]] = 0;
              } else if (gameboard[x][y + i * dirs[dir]] === 2) {
                break;
              }
            }
          }
        }, bombTime - 50);
        gameboard[x][y] = 0;
      }, 50);
      return true;
    }
    return false;
  }

  return {
    getGameBoard: () => gameboard,
    getPlayerPositions: () => playerPositions,
    movePlayer: movePlayer,
    placeBomb: placeBomb,
    logGameBoard: logGameBoard
  };
})();

export default gameStateManager;
