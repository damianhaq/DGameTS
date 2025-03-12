import { DGame, Draw } from "./DGame.js";

const game = new DGame(4, 1000, 600);
const draw = new Draw(game.context, game.camera);

// const bigSpritev7: HTMLImageElement = new Image();
// bigSpritev7.src = "./assets/BigSpritev7.png";
draw.addImage("./assets/BigSpritev7.png", "sprite");
console.log(draw);

// game.addImage(bigSpritev7);
game.enableMoveCameraRMB();

// game.updateCamera(10, 10);
let counter = 0;

game.draw = (deltaTime) => {
  draw.rect(30, 60, 30, 50, true, "black", 1, false, false, false);
  draw.text("asd", 7, 30, 30, true);
  draw.circle(30, 30, 10, true, "red", 1, false, 0, 300, true);

  draw.image(
    "sprite",
    0,
    0,
    60,
    60,
    30,
    30,
    true,
    false,
    false,
    false,
    false,
    counter
  );
  counter++;
};
