export class DGame {
  private context!: CanvasRenderingContext2D;
  private canvas!: HTMLCanvasElement;
  private lastTime: number;
  backgroundColor: string;

  constructor() {
    this.lastTime = 0;
    this.backgroundColor = "#d4d4d4";
    this.createCanvas();

    // start game loop
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  createCanvas() {
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    const context: CanvasRenderingContext2D = canvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    document.body.appendChild(canvas);

    this.context = context;
    this.canvas = canvas;

    // styles
    canvas.style.border = "1px solid black";
    document.body.style.margin = "0";
  }

  gameLoop(timestamp: number) {
    // clear
    this.context.fillStyle = this.backgroundColor;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const deltaTime: number = +(timestamp - this.lastTime).toFixed(2);
    this.lastTime = timestamp;
    const fps: number = 1000 / deltaTime;

    this.context.fillStyle = "black";
    this.context.font = "10px Arial";
    this.context.fillText(`FPS: ${Math.round(fps)}`, 10, 10);

    requestAnimationFrame(this.gameLoop.bind(this));
  }
}
