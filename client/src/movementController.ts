type Direction = "up" | "down" | "left" | "right";

export default function movementController(socket: SocketIOClient.Socket) {
  document.addEventListener("keydown", function(event) {
    if (event.keyCode === 87 || event.keyCode === 38) {
        moveDirection("up");
    } else if (event.keyCode === 83 || event.keyCode === 40) {
        moveDirection("down");
    } else if (event.keyCode === 68 || event.keyCode === 39) {
        moveDirection("right");
    } else if (event.keyCode === 65 || event.keyCode === 37) {
        moveDirection("left");
    }
  });
  function moveDirection(dir: Direction) {
    socket.emit("move", dir);
  }
  return {
    moveDirection: moveDirection
  };
}
