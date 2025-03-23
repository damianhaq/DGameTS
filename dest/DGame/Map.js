export class Map {
    constructor(cellsX, cellsY, game, draw, gameVariables) {
        this.cellsX = cellsX;
        this.cellsY = cellsY;
        this.game = game;
        this.draw = draw;
        this.gameVariables = gameVariables;
        this.map = this.createMap();
    }
    addResourceToMap(chance, RESOURCE) {
        this.map.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (Math.random() < chance) {
                    // this.map[y][x] = new Resource(RESOURCE, game);
                    this.map[y][x] = RESOURCE;
                }
            });
        });
    }
    growResources(RESOURCE, threshold, chance, iterations) {
        for (let i = 0; i < iterations; i++) {
            const newMap = [...this.map];
            this.map.forEach((row, y) => {
                row.forEach((cell, x) => {
                    if (this.map[y][x] === RESOURCE) {
                        newMap[y][x] = RESOURCE;
                    }
                    else {
                        const neighbourCount = this.countNeighbours(x, y, RESOURCE);
                        // console.log("test");
                        if (neighbourCount >= threshold) {
                            if (Math.random() < chance) {
                                newMap[y][x] = RESOURCE;
                            }
                        }
                    }
                    // if (this.getCell(x, y) instanceof Resource) {
                    //   newMap[y][x] = this.getCell(x, y);
                    // } else {
                    //   const neighbourCount = this.countNeighbours(x, y, RESOURCE);
                    //   if (neighbourCount >= threshold) {
                    //     if (Math.random() < chance) {
                    //       newMap[y][x] = new Resource(RESOURCE, game);
                    //     }
                    //   }
                    // }
                });
            });
            this.map = newMap;
        }
        //   iteration++;
        // }, 100);
    }
    smoothingResources(resource, neighborsToAlive, iterations) {
        for (let i = 0; i < iterations; i++) {
            const newMap = this.createMap();
            this.map.forEach((row, y) => {
                row.forEach((cell, x) => {
                    if (cell === resource) {
                        const neighbourCount = this.countNeighbours(x, y, resource);
                        if (neighbourCount > neighborsToAlive) {
                            newMap[y][x] = cell;
                        }
                    }
                    else {
                        newMap[y][x] = cell;
                    }
                    // if (cell instanceof Resource && cell.id === resource.id) {
                    //   const neighbourCount = this.countNeighbours(x, y, resource);
                    //   if (neighbourCount > neighborsToAlive) {
                    //     newMap[y][x] = cell;
                    //   }
                    // } else {
                    //   newMap[y][x] = cell;
                    // }
                });
            });
            this.map = newMap;
        }
    }
    countNeighbours(cellX, cellY, RESOURCE) {
        let count = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                const neighbourX = cellX + i;
                const neighbourY = cellY + j;
                // check if neighbour is inside the map
                if (neighbourX < 0 ||
                    neighbourY < 0 ||
                    neighbourX >= this.cellsX ||
                    neighbourY >= this.cellsY)
                    continue;
                // if (
                //   this.getCell(neighbourX, neighbourY) instanceof Resource &&
                //   this.getCell(neighbourX, neighbourY).id === RESOURCE.id
                // ) {
                //   count++;
                //   //   console.log("neighbour", this.getCell(neighbourX, neighbourY));
                // }
                if (this.getCell(neighbourX, neighbourY) === RESOURCE) {
                    count++;
                    //   console.log("neighbour", this.getCell(neighbourX, neighbourY));
                }
            }
        }
        return count;
    }
    drawMap(deltaTime) {
        this.map.forEach((row, y) => {
            row.forEach((resource, x) => {
                // if (resource instanceof Resource) {
                //   resource.draw(x, y, deltaTime);
                // }
                if (resource !== null) {
                    this.draw.text(resource, this.gameVariables.map.cellLength, x * this.gameVariables.map.cellLength, y * this.gameVariables.map.cellLength, true);
                }
            });
        });
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
        // console.log("map created:", map);
        return map;
    }
    drawGrid() {
        for (let i = 0; i < this.cellsX + 1; i++) {
            this.draw.line(this.gameVariables.map.cellLength * i, 0, this.gameVariables.map.cellLength * i, this.gameVariables.map.cellLength * this.cellsX, true, this.gameVariables.map.mapGridColor);
        }
        for (let j = 0; j < this.cellsY + 1; j++) {
            this.draw.line(0, this.gameVariables.map.cellLength * j, this.cellsY * this.gameVariables.map.cellLength, this.gameVariables.map.cellLength * j, true, this.gameVariables.map.mapGridColor);
        }
    }
}
