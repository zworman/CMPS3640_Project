import * as express from "express";
import { Socket } from "socket.io";
import * as path from "path";
import gameStateManager, { Direction } from "./gameStateManager";

const server = (function() {
  const defaultPort = 3000;
  const maxUsers = 4;
  const connectedUsers: Set<number> = new Set();
  const sessions: { [userId: string]: Socket } = {};
  // start server
  const app = express();
  app.set("port", process.env.PORT || defaultPort);
  let http = require("http").Server(app);
  // set up socket.io and bind it to our http server.
  let io = require("socket.io")(http);

  //   app.get("/", (req: any, res: any) => {
  //     res.sendFile(path.resolve("./client/index.html"));
  //   });

  const server = http.listen(defaultPort, function() {
    console.log(
      "App is running on http://localhost:%d in %s mode",
      app.get("port"),
      app.get("env")
    );
  });

  function assignUserId(socket: Socket) {
    for (var i = 1; i <= maxUsers; ++i) {
      if (!connectedUsers.has(i)) {
        connectedUsers.add(i);
        sessions[i] = socket;
        return i;
      }
    }
    return -1;
  }

  function unassignUserId(id: number) {
    connectedUsers.delete(id);
  }

  // whenever a user connects on port 3000 via
  // a websocket, log that a user has connected
  io.sockets.on("connection", function(socket: Socket) {
    let allowMovement = true;
    const userid = assignUserId(socket);
    console.log(`User connected: ${userid}`);
    socket.send("userid", `Assigned userId: ${userid}`);
    setInterval(function() {
      let gamestate = {
        gameboard: gameStateManager.getGameBoard(),
        playerPositions: gameStateManager.getPlayerPositions()
      };
      socket.emit("updateGamestate", JSON.stringify(gamestate));
    }, 50);

    socket.on("move", function(dir: Direction) {
      if (allowMovement) {
        allowMovement = false;
        if (gameStateManager.movePlayer(userid - 1, dir)) {
          console.log(`Player ${userid} moved ${dir}`);
          // Added this delay so the server is not bombarded with requests
          setTimeout(() => {
            allowMovement = true;
          }, 50);
        } else {
          allowMovement = true;
        }
      }
    });

    socket.on("disconnect", function(socket: Socket) {
      unassignUserId(userid);
      console.log(`User disconnected: ${userid}`);
    });
  });
})();

export default server;
