import { Draw } from "./Draw";
import { Map } from "./Map";

export class Building {
  posCells: { cellX: number; cellY: number }[];
  id: number;
  color: string;
  private draw: Draw;
  private map: Map;
  private lineWidth: number;

  constructor(
    posCells: { cellX: number; cellY: number }[],
    id: number,
    color: string,
    draw: Draw,
    map: Map
  ) {
    this.posCells = posCells;
    this.id = id;
    this.color = color;
    this.draw = draw;
    this.map = map;
    this.lineWidth = 4;

    this.isCellsCorrect(posCells);
    this.drawBuilding();
  }

  drawBuilding() {
    this.posCells.forEach((build, index, arr) => {
      const neig = this.check4Neighbors(build, arr);
      this.drawRect(
        build.cellX,
        build.cellY,
        !neig.isTop,
        !neig.isRight,
        !neig.isBottom,
        !neig.isLeft
      );
    });
  }

  private drawRect(
    cellX: number,
    cellY: number,
    isTop: boolean,
    isRight: boolean,
    isBottom: boolean,
    isLeft: boolean
  ) {
    // points in corners
    const p1 = {
      x: cellX * this.map.cellLength + this.lineWidth / 2,
      y: cellY * this.map.cellLength + this.lineWidth / 2,
    };
    const p2 = {
      x: cellX * this.map.cellLength + this.map.cellLength - this.lineWidth / 2,
      y: cellY * this.map.cellLength + this.lineWidth / 2,
    };
    const p3 = {
      x: cellX * this.map.cellLength + this.map.cellLength - this.lineWidth / 2,
      y: cellY * this.map.cellLength + this.map.cellLength - this.lineWidth / 2,
    };
    const p4 = {
      x: cellX * this.map.cellLength + this.lineWidth / 2,
      y: cellY * this.map.cellLength + this.map.cellLength - this.lineWidth / 2,
    };

    if (isTop) {
      // top line
      this.draw.line(
        p1.x - this.lineWidth / 2,
        p1.y,
        p2.x + this.lineWidth / 2,
        p2.y,
        true,
        this.color,
        this.lineWidth
      );
    }

    if (isRight) {
      // right line
      this.draw.line(
        p2.x,
        p2.y - this.lineWidth / 2,
        p3.x,
        p3.y + this.lineWidth / 2,
        true,
        this.color,
        this.lineWidth
      );
    }

    if (isBottom) {
      // bottom line
      this.draw.line(
        p3.x + this.lineWidth / 2,
        p3.y,
        p4.x - this.lineWidth / 2,
        p4.y,
        true,
        this.color,
        this.lineWidth
      );
    }

    if (isLeft) {
      // left line
      this.draw.line(
        p4.x,
        p4.y + this.lineWidth / 2,
        p1.x,
        p1.y - this.lineWidth / 2,
        true,
        this.color,
        this.lineWidth
      );
    }
  }

  //   private outlineCell(
  //     cellX: number,
  //     cellY: number,
  //     lineWidth: number,
  //     color: string
  //   ) {
  //     const cornerRadius: number = this.cellLength / 10;

  //     this.drawHorizontalLines(cellX, cellY, cornerRadius, lineWidth, color);
  //     this.drawVerticalLines(cellX, cellY, cornerRadius, lineWidth, color);
  //     this.drawCornerCircles(cellX, cellY, cornerRadius, lineWidth, color);
  //   }

  //   private drawHorizontalLines(
  //     cellX: number,
  //     cellY: number,
  //     cornerRadius: number,
  //     lineWidth: number,
  //     color: string
  //   ) {
  //     this.draw.line(
  //       cellX * this.cellLength + cornerRadius,
  //       cellY * this.cellLength,
  //       cellX * this.cellLength + this.cellLength - cornerRadius,
  //       cellY * this.cellLength,
  //       true,
  //       color,
  //       lineWidth
  //     );
  //     this.draw.line(
  //       cellX * this.cellLength + this.cellLength - cornerRadius,
  //       cellY * this.cellLength + this.cellLength,
  //       cellX * this.cellLength + cornerRadius,
  //       cellY * this.cellLength + this.cellLength,
  //       true,
  //       color,
  //       lineWidth
  //     );
  //   }

  //   private drawVerticalLines(
  //     cellX: number,
  //     cellY: number,
  //     cornerRadius: number,
  //     lineWidth: number,
  //     color: string
  //   ) {
  //     this.draw.line(
  //       cellX * this.cellLength + this.cellLength,
  //       cellY * this.cellLength + cornerRadius,
  //       cellX * this.cellLength + this.cellLength,
  //       cellY * this.cellLength + this.cellLength - cornerRadius,
  //       true,
  //       color,
  //       lineWidth
  //     );
  //     this.draw.line(
  //       cellX * this.cellLength,
  //       cellY * this.cellLength + this.cellLength - cornerRadius,
  //       cellX * this.cellLength,
  //       cellY * this.cellLength + cornerRadius,
  //       true,
  //       color,
  //       lineWidth
  //     );
  //   }

  //   private drawCornerCircles(
  //     cellX: number,
  //     cellY: number,
  //     cornerRadius: number,
  //     lineWidth: number,
  //     color: string
  //   ) {
  //     this.draw.circle(
  //       cellX * this.cellLength + cornerRadius,
  //       cellY * this.cellLength + cornerRadius,
  //       cornerRadius,
  //       true,
  //       color,
  //       lineWidth,
  //       false,
  //       180,
  //       270,
  //       false
  //     );
  //     this.draw.circle(
  //       cellX * this.cellLength + this.cellLength - cornerRadius,
  //       cellY * this.cellLength + cornerRadius,
  //       cornerRadius,
  //       true,
  //       color,
  //       lineWidth,
  //       false,
  //       270,
  //       0,
  //       false
  //     );
  //     this.draw.circle(
  //       cellX * this.cellLength + this.cellLength - cornerRadius,
  //       cellY * this.cellLength + this.cellLength - cornerRadius,
  //       cornerRadius,
  //       true,
  //       color,
  //       lineWidth,
  //       false,
  //       0,
  //       90,
  //       false
  //     );
  //     this.draw.circle(
  //       cellX * this.cellLength + cornerRadius,
  //       cellY * this.cellLength + this.cellLength - cornerRadius,
  //       cornerRadius,
  //       true,
  //       color,
  //       lineWidth,
  //       false,
  //       90,
  //       180,
  //       false
  //     );
  //   }

  private isCellsCorrect(arr: { cellX: number; cellY: number }[]) {
    let correct = true;

    if (arr.length !== 1) {
      arr.forEach((cell) => {
        const neig = this.check4Neighbors(cell, arr);

        if (neig.isTop || neig.isRight || neig.isBottom || neig.isLeft) {
          console.log("correct cell");
        } else {
          correct = false;
          console.warn("incorrect cell");
        }
      });
    }

    return correct;
  }

  private check4Neighbors(
    cell: { cellX: number; cellY: number },
    arr: { cellX: number; cellY: number }[]
  ) {
    let isTop = false;
    let isRight = false;
    let isBottom = false;
    let isLeft = false;

    arr.forEach((neig) => {
      if (cell.cellX === neig.cellX && cell.cellY === neig.cellY) {
        // cell is neig
      } else {
        // check top
        if (cell.cellX === neig.cellX && cell.cellY === neig.cellY + 1) {
          isTop = true;
        }

        // right
        if (cell.cellX === neig.cellX - 1 && cell.cellY === neig.cellY) {
          isRight = true;
        }

        // bottom
        if (cell.cellX === neig.cellX && cell.cellY === neig.cellY - 1) {
          isBottom = true;
        }

        // left
        if (cell.cellX === neig.cellX + 1 && cell.cellY === neig.cellY) {
          isLeft = true;
        }
      }
    });

    return { isTop, isRight, isBottom, isLeft };
  }
}
