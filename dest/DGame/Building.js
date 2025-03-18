export class Building {
    constructor(posCells, id) {
        this.posCells = posCells;
        this.id = id;
        this.isCellsCorrect(posCells);
    }
    // TODO: po id wiadomo jakie kratki są razem, napisz połączone rysowanie
    isCellsCorrect(arr) {
        let correct = true;
        if (arr.length !== 1) {
            arr.forEach((cell) => {
                const neig = this.check4Neighbors(cell, arr);
                if (neig.isTop || neig.isRight || neig.isBottom || neig.isLeft) {
                    console.log("correct cell");
                }
                else {
                    correct = false;
                    console.warn("incorrect cell");
                }
            });
        }
        return correct;
    }
    check4Neighbors(cell, arr) {
        let isTop = false;
        let isRight = false;
        let isBottom = false;
        let isLeft = false;
        arr.forEach((neig) => {
            if (cell.cellX === neig.cellX && cell.cellY === neig.cellY) {
                // cell is neig
            }
            else {
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
