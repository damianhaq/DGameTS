import { Building, DGame, Draw, Map } from "./DGame.js";
const game = new DGame(1, 1000, 600);
const draw = new Draw(game.context, game.camera);
const map = new Map(10, 10, 140, game, draw);
// draw.addImage("./assets/BigSpritev7.png", "sprite");
// console.log(draw);
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
    }
    else {
        // zoom out
        if (map.cellLength <= 10)
            return; // dont zoom out more than 10
        map.cellLength -= zoomFactor;
        game.camera.x -= zoomFactor * cellsOnLeft;
        game.camera.y -= zoomFactor * cellsOnTop;
    }
    // console.log("zoom, cellLength", GAME.cellLength);
};
const building = new Building([
    { cellX: 2, cellY: 2 },
    { cellX: 2, cellY: 3 },
], 0);
map.addBuilding(building);
game.onClickLMB = () => {
    const cellCords = map.getCellCords(game.mouse.x, game.mouse.y, game.camera, map.cellLength);
    // const building = new Building([
    //   { cellX: cellCords.cellX, cellY: cellCords.cellY },
    // ]);
    // map.addBuilding(building);
    const cell = map.getCell(cellCords.cellX, cellCords.cellY);
    console.log("LMB, cellX: ", cellCords.cellX, " cellY: ", cellCords.cellY, " cell: ", cell);
};
game.draw = (deltaTime) => {
    map.drawGrid();
    map.drawBuildings();
    // map.outlineCell(3, 1, 3, "red");
};
