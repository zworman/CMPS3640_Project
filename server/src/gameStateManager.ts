const gameRunning = false;
const maxUsers = 4;
const gameboard: number[][] = [
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], // 0 -> Open Block
  [2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 2], // 1 -> Breakable Block
  [2, 0, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 0, 2], // 2 -> Unbreakable Block
  [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2], // 3 -> Bomb
  [2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2], // 4 -> Flame
  [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2], // 5 -> Powerup
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

let numPowerups = 0;
const powerupPositions: number[][] = [ 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 0 -> No Powerup
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 1 -> Powerup
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
const playerPositions: number[][] = [
  [1, 1],
  [gameboard[0].length - 2, 1],
  [1, gameboard.length - 2],
  [gameboard[gameboard.length - 1].length - 2, gameboard.length - 2]
];

const playerOptions: {
  bombCount: number;
  maxBombCount: number;
  health: number;
}[] = [
  {
    bombCount: 0,
    maxBombCount: 1,
    health: 1
  },
  {
    bombCount: 0,
    maxBombCount: 1,
    health: 1
  },
  {
    bombCount: 0,
    maxBombCount: 1,
    health: 1
  },
  {
    bombCount: 0,
    maxBombCount: 1,
    health: 1
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
    if (playerNumber < 0) return;
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
          if (gameboard[x][y] !== 1 && gameboard[x][y] !== 2) {
            if (gameboard[x][y] === 5) {
              playerPositions[playerNumber] = [x,y];
              grabPowerup();
              playerOptions[playerNumber].maxBombCount++;
              return true;
            } else {
              playerPositions[playerNumber] = [x, y];
              return true;
            }
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
        const spaceCount = bombSize / 2;
        let dirs = [1, -1];
        // Turns Blocks Red
        setTimeout(() => {
          --playerOptions[playerNumber].bombCount;
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
          // Check for deaths
          checkDeath();
        }, bombTime - 300);
        // Turns Blocks Black
        setTimeout(() => {
          // Check vertical directions
          for (let dir = 0; dir < dirs.length; ++dir) {
            for (let i = 0; i < spaceCount; ++i) {
              if (gameboard[x + i * dirs[dir]][y] === 4) {
                if (powerup()) {
                  gameboard[x + i * dirs[dir]][y] = 5;
                  powerupPositions[x + i * dirs[dir]][y] = 1;
                }
                else
                  gameboard[x + i * dirs[dir]][y] = 0;
                if (isGrabbed(playerNumber)) {
                  setTimeout(() => 500);
                  gameboard[x + i * dirs[dir]][y] = 0;
                }
              } else if (gameboard[x + i * dirs[dir]][y] === 2) {
                break;
              }
            }
          }
          // Check horizontal directions
          for (let dir = 0; dir < dirs.length; ++dir) {
            for (let i = 0; i < spaceCount; ++i) {
              if (gameboard[x][y + i * dirs[dir]] === 4) {
                if (powerup()) {
                  gameboard[x][y + i * dirs[dir]] = 5;
                  powerupPositions[x][y + i * dirs[dir]] = 1;
                }
                else
                  gameboard[x][y + i * dirs[dir]] = 0;
                if (isGrabbed(playerNumber)) {
                  setTimeout(() => 500);
                  gameboard[x][y + i * dirs[dir]] = 0;
                  setTimeout(() => 500);
                }
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
  
  function checkDeath() {
    for (let i = 0; i < maxUsers; i++) {
      let x = playerPositions[i][0];
      let y = playerPositions[i][1];
      if (gameboard[x][y] === 4) {
        let id = i + 1;
        playerOptions[i].health--;
        console.log("Player " + id + " died");  
      }
    }
  }

  function isDed(playerid: number): boolean {
    if (playerid >= 0 && playerOptions[playerid].health <= 0) {
      let id: number = playerid + 1;
      return true;
    }
    return false;
  }

  function isGrabbed(playerid: number) : boolean {
    for (let i = 0; i < maxUsers; i++) {
      let playerx = playerPositions[i][0];
      let playery = playerPositions[i][1];
      if (powerupPositions[playerx][playery] === 0)
        return true;
      return false;
    }
  }

  function grabPowerup() {
    //console.log("Player " + "has grabbed powerup! 1");
    for (let i = 0; i < maxUsers; i++)  {
      //console.log("Player " + "has grabbed powerup! 2");
      let playerx = playerPositions[i][0];
      let playery = playerPositions[i][1];
      //console.log('player x: ' + playerx + 'player y: '+playery);
      if (gameboard[playerx][playery] === 5 && powerupPositions[playerx][playery] === 1) {
        let id = i + 1;
        powerupPositions[playerx][playery] = 0;
        gameboard[playerx][playery] = 0;

        console.log("Player " + id + "has grabbed powerup! 3");
        console.log
      }
    }
  }

  function powerup(): boolean {
    //var num = Math.floor(Math.random() * 100); //This 0-9
    /*if (num % 3 === 0) {
      numPowerups++;
      return true;
    }*/
    return true;
  }

  return {
    getPlayerOptions: () => playerOptions,
    getGameBoard: () => gameboard,
    getPlayerPositions: () => playerPositions,
    getPowerupPositions: () => powerupPositions,
    isGrabbed: isGrabbed,
    isDed: isDed,
    movePlayer: movePlayer,
    placeBomb: placeBomb,
    logGameBoard: logGameBoard
  };
})();

export default gameStateManager;
