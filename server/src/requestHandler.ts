import { Request, Response } from "express";
import gameStateManager from "./gameStateManager";

const requestHandler = (function() {
  function getGameState(req: Request, res: Response) {
    res.send(JSON.stringify(gameStateManager.getGameBoard()));
  }
  return {
    getGameState: getGameState
  };
})();

export default requestHandler;
