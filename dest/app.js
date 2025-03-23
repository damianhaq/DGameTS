import { DGame } from "./DGame/DGame.js";
import { Draw } from "./DGame/Draw.js";
import { Gui } from "./DGame/Gui.js";
import { Map } from "./DGame/Map.js";
import { GAME } from "./gameVariables.js";
const game = new DGame(1, 1400, 800);
const draw = new Draw(game.context, game.camera);
const map = new Map(100, 100, game, draw, GAME);
const gui = new Gui(game);
map.addResourceToMap(0.02, "1");
map.addResourceToMap(0.01, "2");
map.growResources("1", 2, 0.1, 30);
map.growResources("2", 2, 0.1, 30);
map.smoothingResources("1", 3, 2);
map.smoothingResources("2", 3, 2);
const window = gui.createWindow(0, game.canvas.height, game.canvas.width, 50);
gui.createButton("test", 10, 20, () => console.log("testttt"), window);
gui.createLabel("Budynki", 10, 0, window);
game.enableMoveCameraRMB();
game.onMouseWheel = (e) => {
    const zoomFactor = 5;
    // ile kratek jest po lewej stronie ekranu
    const cellsOnLeft = (game.camera.x + game.canvas.width / 2) / GAME.map.cellLength;
    // ile kratek jest na górze ekranu
    const cellsOnTop = (game.camera.y + game.canvas.height / 2) / GAME.map.cellLength;
    // zoom in and out
    if (e.deltaY < 0) {
        // zoom in
        GAME.map.cellLength += zoomFactor;
        game.camera.x += zoomFactor * cellsOnLeft;
        game.camera.y += zoomFactor * cellsOnTop;
    }
    else {
        // zoom out
        if (GAME.map.cellLength <= 10)
            return; // dont zoom out more than 10
        GAME.map.cellLength -= zoomFactor;
        game.camera.x -= zoomFactor * cellsOnLeft;
        game.camera.y -= zoomFactor * cellsOnTop;
    }
    // console.log("zoom, cellLength", GAME.cellLength);
};
const buildings = [];
// const building1 = new Building(
//   [
//     { cellX: 2, cellY: 2 },
//     { cellX: 2, cellY: 3 },
//     { cellX: 3, cellY: 3 },
//   ],
//   0,
//   "red",
//   draw,
//   GAME
// );
// const building2 = new Building(
//   [
//     { cellX: 2, cellY: 1 },
//     { cellX: 1, cellY: 1 },
//     { cellX: 1, cellY: 2 },
//     // { cellX: 3, cellY: 3 },
//   ],
//   0,
//   "blue",
//   draw,
//   GAME
// );
// buildings.push(building1, building2);
console.log("buildings: ", buildings);
// map.addBuilding(building1);
// map.addBuilding(building2);
game.onClickLMB = () => {
    const cellCords = map.getCellCords(game.mouse.x, game.mouse.y, game.camera, GAME.map.cellLength);
    // const building = new Building([
    //   { cellX: cellCords.cellX, cellY: cellCords.cellY },
    // ]);
    // map.addBuilding(building);
    const cell = map.getCell(cellCords.cellX, cellCords.cellY);
    console.log("LMB, cellX: ", cellCords.cellX, " cellY: ", cellCords.cellY, " cell: ", cell);
};
game.draw = (deltaTime) => {
    if (GAME.map.showMapGrid)
        map.drawGrid();
    map.drawMap(deltaTime);
    buildings.forEach((el) => el.drawBuilding());
    // map.outlineCell(3, 1, 3, "red");
};
