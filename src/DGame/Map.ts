import { Building } from "./Building";
import { DGame } from "./DGame";
import { Draw } from "./Draw";

export class Map {
  cellsX: number;
  cellsY: number;
  cellLength: number;
  private game: DGame;
  private draw: Draw;
  map: any[][];

  constructor(
    cellsX: number,
    cellsY: number,
    cellLength: number,
    game: DGame,
    draw: Draw
  ) {
    this.cellsX = cellsX;
    this.cellsY = cellsY;
    this.cellLength = cellLength;
    this.game = game;
    this.draw = draw;

    this.map = this.createMap();
  }

  addBuilding(building: Building) {
    building.posCells.forEach((cell) => {
      const isInMap =
        cell.cellX >= 0 &&
        cell.cellX < this.cellsX &&
        cell.cellY >= 0 &&
        cell.cellY < this.cellsY;

      if (isInMap) {
        this.map[cell.cellY][cell.cellX] = building;
      }
    });
  }

  getCellCords(
    x: number,
    y: number,
    camera: camera,
    cellLength: number
  ): { cellX: number; cellY: number } {
    const cellX = Math.floor((x + camera.x) / cellLength);
    const cellY = Math.floor((y + camera.y) / cellLength);

    return { cellX, cellY };
  }

  getCell(cellX: number, cellY: number) {
    return this.map[cellY][cellX];
  }

  private createMap(fill = null) {
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
      this.draw.line(
        this.cellLength * i,
        0,
        this.cellLength * i,
        this.cellLength * this.cellsX,
        true
      );
    }
    for (let j = 0; j < this.cellsY + 1; j++) {
      this.draw.line(
        0,
        this.cellLength * j,
        this.cellsY * this.cellLength,
        this.cellLength * j,
        true
      );
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

  outlineCell(cellX: number, cellY: number, lineWidth: number, color: string) {
    const cornerRadius: number = this.cellLength / 10;

    this.drawHorizontalLines(cellX, cellY, cornerRadius, lineWidth, color);
    this.drawVerticalLines(cellX, cellY, cornerRadius, lineWidth, color);
    this.drawCornerCircles(cellX, cellY, cornerRadius, lineWidth, color);
  }

  private drawHorizontalLines(
    cellX: number,
    cellY: number,
    cornerRadius: number,
    lineWidth: number,
    color: string
  ) {
    this.draw.line(
      cellX * this.cellLength + cornerRadius,
      cellY * this.cellLength,
      cellX * this.cellLength + this.cellLength - cornerRadius,
      cellY * this.cellLength,
      true,
      color,
      lineWidth
    );
    this.draw.line(
      cellX * this.cellLength + this.cellLength - cornerRadius,
      cellY * this.cellLength + this.cellLength,
      cellX * this.cellLength + cornerRadius,
      cellY * this.cellLength + this.cellLength,
      true,
      color,
      lineWidth
    );
  }

  private drawVerticalLines(
    cellX: number,
    cellY: number,
    cornerRadius: number,
    lineWidth: number,
    color: string
  ) {
    this.draw.line(
      cellX * this.cellLength + this.cellLength,
      cellY * this.cellLength + cornerRadius,
      cellX * this.cellLength + this.cellLength,
      cellY * this.cellLength + this.cellLength - cornerRadius,
      true,
      color,
      lineWidth
    );
    this.draw.line(
      cellX * this.cellLength,
      cellY * this.cellLength + this.cellLength - cornerRadius,
      cellX * this.cellLength,
      cellY * this.cellLength + cornerRadius,
      true,
      color,
      lineWidth
    );
  }

  private drawCornerCircles(
    cellX: number,
    cellY: number,
    cornerRadius: number,
    lineWidth: number,
    color: string
  ) {
    this.draw.circle(
      cellX * this.cellLength + cornerRadius,
      cellY * this.cellLength + cornerRadius,
      cornerRadius,
      true,
      color,
      lineWidth,
      false,
      180,
      270,
      false
    );
    this.draw.circle(
      cellX * this.cellLength + this.cellLength - cornerRadius,
      cellY * this.cellLength + cornerRadius,
      cornerRadius,
      true,
      color,
      lineWidth,
      false,
      270,
      0,
      false
    );
    this.draw.circle(
      cellX * this.cellLength + this.cellLength - cornerRadius,
      cellY * this.cellLength + this.cellLength - cornerRadius,
      cornerRadius,
      true,
      color,
      lineWidth,
      false,
      0,
      90,
      false
    );
    this.draw.circle(
      cellX * this.cellLength + cornerRadius,
      cellY * this.cellLength + this.cellLength - cornerRadius,
      cornerRadius,
      true,
      color,
      lineWidth,
      false,
      90,
      180,
      false
    );
  }

  // drawMap(deltaTime: number) {
  //   this.map.forEach((row, y) => {
  //     row.forEach((resource, x) => {
  //       if (resource instanceof Resource) {
  //         resource.draw(x, y, deltaTime);
  //       }
  //     });
  //   });
  // }
}
