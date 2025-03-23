export const GAME = {
    map: {
        showMapGrid: true,
        mapGridColor: "#ADADADFF",
        cellLength: 15,
    },
};
export const resources = {
    stone: {
        id: 1,
        name: "stone",
        collidable: true,
        // draw: (cellX, cellY) => {
        //   // internal constants
        //   const stoneRadius = GAME.map.cellLength / 7;
        //   // calculate x and y based on cellX and cellY
        //   let x = cellX * GAME.map.cellLength + GAME.map.cellLength / 2;
        //   let y = cellY * GAME.map.cellLength + GAME.map.cellLength / 2;
        //   // adding camera position
        //   // x -= game.camera.x;
        //   // y -= game.camera.y;
        //   // correction position
        //   y -= 2;
        //   // Rysowanie kamienia
        //   game.ctx.beginPath();
        //   game.ctx.arc(x, y, stoneRadius, 0, Math.PI * 2);
        //   game.ctx.fillStyle = "#606060FF"; // Kolor szary
        //   game.ctx.fill();
        //   // kolejny kamień
        //   game.ctx.beginPath();
        //   game.ctx.arc(
        //     x + GAME.map.cellLength / 8,
        //     y + GAME.map.cellLength / 8,
        //     stoneRadius * 1.2,
        //     0,
        //     Math.PI * 2
        //   );
        //   game.ctx.fillStyle = "#4f4f4f"; // Kolor szary
        //   game.ctx.fill();
        //   // kolejny kamień
        //   game.ctx.beginPath();
        //   game.ctx.arc(
        //     x - GAME.map.cellLength / 8,
        //     y + GAME.map.cellLength / 8,
        //     stoneRadius * 1.2,
        //     0,
        //     Math.PI * 2
        //   );
        //   game.ctx.fillStyle = "#585858FF"; // Kolor szary
        //   game.ctx.fill();
        // },
    },
};
