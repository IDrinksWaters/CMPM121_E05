import type { Direction, Position } from "../core/mod.ts";
import type { Controller } from "./controllers.ts";

// Undefined unless it is a direct neighbor.
function directionTo(from: Position, to: Position): Direction | undefined {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  if (dx === 0 && dy === -1) return "up";
  if (dx === 0 && dy === 1) return "down";
  if (dx === -1 && dy === 0) return "left";
  if (dx === 1 && dy === 0) return "right";
  return undefined;
}

export const clickToMove: Controller = {
  label: "Click a neighboring tile",
  attach(session, board) {
    const stop = board.onTileClick((at) => {
      // Ask for the player's position now, so it is current at every click.
      const { player } = session.getState().puzzle;
      const direction = directionTo(player, at);
      if (direction) session.dispatch({ kind: "move", direction });
    });
    return stop;
  },
};
