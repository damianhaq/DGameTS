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
    drawBuildings() {
        this.map.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell) {
                    this.outlineCell(x, y, 2, "black");
                }
            });
        });
    }
    outlineCell(cellX, cellY, lineWidth, color) {
        const cornerRadius = this.cellLength / 10;
        this.drawHorizontalLines(cellX, cellY, cornerRadius, lineWidth, color);
        this.drawVerticalLines(cellX, cellY, cornerRadius, lineWidth, color);
        this.drawCornerCircles(cellX, cellY, cornerRadius, lineWidth, color);
    }
    drawHorizontalLines(cellX, cellY, cornerRadius, lineWidth, color) {
        this.draw.line(cellX * this.cellLength + cornerRadius, cellY * this.cellLength, cellX * this.cellLength + this.cellLength - cornerRadius, cellY * this.cellLength, true, color, lineWidth);
        this.draw.line(cellX * this.cellLength + this.cellLength - cornerRadius, cellY * this.cellLength + this.cellLength, cellX * this.cellLength + cornerRadius, cellY * this.cellLength + this.cellLength, true, color, lineWidth);
    }
    drawVerticalLines(cellX, cellY, cornerRadius, lineWidth, color) {
        this.draw.line(cellX * this.cellLength + this.cellLength, cellY * this.cellLength + cornerRadius, cellX * this.cellLength + this.cellLength, cellY * this.cellLength + this.cellLength - cornerRadius, true, color, lineWidth);
        this.draw.line(cellX * this.cellLength, cellY * this.cellLength + this.cellLength - cornerRadius, cellX * this.cellLength, cellY * this.cellLength + cornerRadius, true, color, lineWidth);
    }
    drawCornerCircles(cellX, cellY, cornerRadius, lineWidth, color) {
        this.draw.circle(cellX * this.cellLength + cornerRadius, cellY * this.cellLength + cornerRadius, cornerRadius, true, color, lineWidth, false, 180, 270, false);
        this.draw.circle(cellX * this.cellLength + this.cellLength - cornerRadius, cellY * this.cellLength + cornerRadius, cornerRadius, true, color, lineWidth, false, 270, 0, false);
        this.draw.circle(cellX * this.cellLength + this.cellLength - cornerRadius, cellY * this.cellLength + this.cellLength - cornerRadius, cornerRadius, true, color, lineWidth, false, 0, 90, false);
        this.draw.circle(cellX * this.cellLength + cornerRadius, cellY * this.cellLength + this.cellLength - cornerRadius, cornerRadius, true, color, lineWidth, false, 90, 180, false);
    }
}
