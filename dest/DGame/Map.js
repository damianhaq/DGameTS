export class Map {
    constructor(cellsX, cellsY, cellLength, game, draw) {
        this.cellsX = cellsX;
        this.cellsY = cellsY;
        this.cellLength = cellLength;
        this.game = game;
        this.draw = draw;
        this.map = this.createMap();
    }
    addBuilding(building) {
        building.posCells.forEach((cell) => {
            const isInMap = cell.cellX >= 0 &&
                cell.cellX < this.cellsX &&
                cell.cellY >= 0 &&
                cell.cellY < this.cellsY;
            if (isInMap) {
                this.map[cell.cellY][cell.cellX] = building;
            }
        });
    }
    getCellCords(x, y, camera, cellLength) {
        const cellX = Math.floor((x + camera.x) / cellLength);
        const cellY = Math.floor((y + camera.y) / cellLength);
        return { cellX, cellY };
    }
    getCell(cellX, cellY) {
        return this.map[cellY][cellX];
    }
    createMap(fill = null) {
        // create 2d array
        const map = [];
        for (let i = 0; i < this.cellsX; i++) {
            const row = [];
            for (let j = 0; j < this.cellsY; j++) {
                row.push(fill);
            }
            map.push(row);
        }
        console.log("map created:", map);
        return map;
    }
    drawGrid() {
        for (let i = 0; i < this.cellsX + 1; i++) {
            this.draw.line(this.cellLength * i, 0, this.cellLength * i, this.cellLength * this.cellsX, true);
        }
        for (let j = 0; j < this.cellsY + 1; j++) {
            this.draw.line(0, this.cellLength * j, this.cellsY * this.cellLength, this.cellLength * j, true);
        }
    }
}
