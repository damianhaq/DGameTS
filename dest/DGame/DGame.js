export class DGame {
    constructor(scaleFactor, width, height) {
        this.lastTime = 0;
        this.backgroundColor = "#d4d4d4";
        this.scaleFactor = scaleFactor;
        this.disableContextMenu = true;
        this.isMoveCameraRMB = false;
        this.mouse = {
            LMB: false,
            LMBClickFlag: false,
            RMB: false,
            RMBClickFlag: false,
            Wheel: false,
            WheelClickFlag: false,
            cameraLastMousePosition: { x: 0, y: 0 },
            mouseMoveLastPosition: { x: 0, y: 0 },
            x: 0,
            y: 0,
        };
        this.keys = {
            key: [],
        };
        this.camera = {
            x: 0,
            y: 0,
        };
        this.infoDebug = ["infoDebug"];
        this.createCanvas(width, height);
        this.setupCanvas();
        this.setupEventListeners();
        // this.createInfoDiv();
        // start game loop
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    // private createInfoDiv() {
    //   const div = document.createElement("div");
    //   document.body.appendChild(div);
    //   const label = document.createElement("label");
    //   label.textContent = "asd";
    //   div.appendChild(label);
    // }
    // addInfoDebug(text: string, variable: any = "") {}
    enableMoveCameraRMB() {
        this.isMoveCameraRMB = true;
    }
    moveCameraRMB() {
        if (this.mouse.RMB) {
            const dx = this.mouse.x - this.mouse.cameraLastMousePosition.x;
            const dy = this.mouse.y - this.mouse.cameraLastMousePosition.y;
            this.camera.x += dx * -1;
            this.camera.y += dy * -1;
            this.mouse.cameraLastMousePosition.x = this.mouse.x;
            this.mouse.cameraLastMousePosition.y = this.mouse.y;
            // console.log("camera", this.camera.x, this.camera.y);
        }
        else {
            this.mouse.cameraLastMousePosition.x = this.mouse.x;
            this.mouse.cameraLastMousePosition.y = this.mouse.y;
        }
    }
    setupEventListeners() {
        this.canvas.addEventListener("mousedown", (ev) => {
            // console.log(ev.which);
            if (ev.which === 3) {
                this.mouse.RMB = true;
            }
            else if (ev.which === 1) {
                this.mouse.LMB = true;
            }
            else if (ev.which === 2) {
                this.mouse.Wheel = true;
            }
            this.mouse.x = Math.round(ev.offsetX / this.scaleFactor);
            this.mouse.y = Math.round(ev.offsetY / this.scaleFactor);
        });
        this.canvas.addEventListener("mouseup", (ev) => {
            if (ev.which === 3) {
                this.mouse.RMB = false;
            }
            else if (ev.which === 1) {
                this.mouse.LMB = false;
            }
            else if (ev.which === 2) {
                this.mouse.Wheel = false;
            }
        });
        this.canvas.addEventListener("mousemove", (ev) => {
            this.mouse.x = Math.round(ev.offsetX / this.scaleFactor);
            this.mouse.y = Math.round(ev.offsetY / this.scaleFactor);
        });
        this.canvas.addEventListener("wheel", (ev) => {
            this.onMouseWheel(ev);
        });
        this.canvas.addEventListener("keydown", (ev) => {
            if (!this.keys.key[ev.keyCode])
                this.keys.key[ev.keyCode] = true;
            // console.log(ev.keyCode);
        });
        this.canvas.addEventListener("keyup", (ev) => {
            if (this.keys.key[ev.keyCode])
                this.keys.key[ev.keyCode] = false;
        });
        this.canvas.addEventListener("contextmenu", (ev) => {
            if (this.disableContextMenu)
                ev.preventDefault();
        });
    }
    onClickLMB() { }
    onUnclickLMB() { }
    onMouseMove() { }
    onMouseWheel(ev) { }
    setupCanvas() {
        this.context.scale(this.scaleFactor, this.scaleFactor);
        this.context.imageSmoothingEnabled = false;
        // styles
        this.canvas.style.border = "1px solid black";
        document.body.style.margin = "0";
        this.canvas.setAttribute("tabindex", "0");
    }
    updateCamera(x, y) {
        this.camera.x = +(x - this.canvas.width / (2 * this.scaleFactor)).toFixed(1);
        this.camera.y = +(y - this.canvas.height / (2 * this.scaleFactor)).toFixed(1);
        // console.log("camera", this.camera.x, this.camera.y);
    }
    createCanvas(width, height) {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        document.body.appendChild(canvas);
        this.context = context;
        this.canvas = canvas;
        this.canvas.width = width;
        this.canvas.height = height;
    }
    gameLoop(timestamp) {
        // clear
        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        // fps calculations
        const deltaTime = +(timestamp - this.lastTime).toFixed(2);
        this.lastTime = timestamp;
        const fps = 1000 / deltaTime;
        this.mouseHandleClick();
        this.update(deltaTime);
        this.draw(deltaTime);
        this.context.fillStyle = "black";
        this.context.font = "10px Arial";
        this.context.fillText(`FPS: ${Math.round(fps)}`, 10, 10);
        // this.drawImage(this.image, 0, 0, 100, 100, 0, 0, 100, 100);
        if (this.isMoveCameraRMB)
            this.moveCameraRMB();
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    mouseHandleClick() {
        // execute once if mouse is pressed
        if (this.mouse.LMB && !this.mouse.LMBClickFlag) {
            this.mouse.LMBClickFlag = true;
            // execute once if mouse is pressed
            this.onClickLMB();
        }
        else if (!this.mouse.LMB && this.mouse.LMBClickFlag) {
            this.mouse.LMBClickFlag = false;
            // execute once if mouse is unpressed
            this.onUnclickLMB();
        }
        // execute every mouse move
        if (this.mouse.x !== this.mouse.mouseMoveLastPosition.x ||
            this.mouse.y !== this.mouse.mouseMoveLastPosition.y) {
            this.onMouseMove();
            this.mouse.mouseMoveLastPosition.x = this.mouse.x;
            this.mouse.mouseMoveLastPosition.y = this.mouse.y;
        }
    }
    addImage(image) {
        this.image = image;
    }
    update(deltaTime) { }
    draw(deltaTime) { }
}
