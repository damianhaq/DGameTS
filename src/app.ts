import { Building } from "./DGame/Building.js";
import { DGame } from "./DGame/DGame.js";
import { Draw } from "./DGame/Draw.js";
import { Map } from "./DGame/Map.js";

const game = new DGame(1, 1000, 600);
const draw = new Draw(game.context, game.camera);
const map = new Map(10, 10, 80, game, draw);

const buildings: Building[] = [];

game.enableMoveCameraRMB();

game.onMouseWheel = (e) => {
  const zoomFactor = 5;

  // ile kratek jest po lewej stronie ekranu
  const cellsOnLeft = (game.camera.x + game.canvas.width / 2) / map.cellLength;
  // ile kratek jest na górze ekranu
  const cellsOnTop = (game.camera.y + game.canvas.height / 2) / map.cellLength;

  // zoom in and out
  if (e.deltaY < 0) {
    // zoom in
    map.cellLength += zoomFactor;
    game.camera.x += zoomFactor * cellsOnLeft;
    game.camera.y += zoomFactor * cellsOnTop;
  } else {
    // zoom out
    if (map.cellLength <= 10) return; // dont zoom out more than 10
    map.cellLength -= zoomFactor;
    game.camera.x -= zoomFactor * cellsOnLeft;
    game.camera.y -= zoomFactor * cellsOnTop;
  }

  // console.log("zoom, cellLength", GAME.cellLength);
};

const building1 = new Building(
  [
    { cellX: 2, cellY: 2 },
    { cellX: 2, cellY: 3 },

    { cellX: 3, cellY: 3 },
  ],
  0,
  "red",
  draw,
  map
);
const building2 = new Building(
  [
    { cellX: 2, cellY: 1 },
    { cellX: 1, cellY: 1 },
    { cellX: 1, cellY: 2 },
    // { cellX: 3, cellY: 3 },
  ],
  0,
  "blue",
  draw,
  map
);

buildings.push(building1, building2);
console.log("buildings: ", buildings);

map.addBuilding(building1);
map.addBuilding(building2);

game.onClickLMB = () => {
  const cellCords = map.getCellCords(
    game.mouse.x,
    game.mouse.y,
    game.camera,
    map.cellLength
  );
  // const building = new Building([
  //   { cellX: cellCords.cellX, cellY: cellCords.cellY },
  // ]);
  // map.addBuilding(building);
  const cell = map.getCell(cellCords.cellX, cellCords.cellY);
  console.log(
    "LMB, cellX: ",
    cellCords.cellX,
    " cellY: ",
    cellCords.cellY,
    " cell: ",
    cell
  );
};

game.draw = (deltaTime) => {
  map.drawGrid();

  buildings.forEach((el) => el.drawBuilding());

  // map.outlineCell(3, 1, 3, "red");
};
