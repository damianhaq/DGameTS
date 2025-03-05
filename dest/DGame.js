export class DGame {
    constructor() {
        this.lastTime = 0;
        this.backgroundColor = "#d4d4d4";
        this.createCanvas();
        // start game loop
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    createCanvas() {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        document.body.appendChild(canvas);
        this.context = context;
        this.canvas = canvas;
        // styles
        canvas.style.border = "1px solid black";
        document.body.style.margin = "0";
    }
    gameLoop(timestamp) {
        // clear
        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        const deltaTime = +(timestamp - this.lastTime).toFixed(2);
        this.lastTime = timestamp;
        const fps = 1000 / deltaTime;
        this.context.fillStyle = "black";
        this.context.font = "10px Arial";
        this.context.fillText(`FPS: ${Math.round(fps)}`, 10, 10);
        requestAnimationFrame(this.gameLoop.bind(this));
    }
}
