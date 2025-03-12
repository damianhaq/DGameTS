export class DGame {
  context!: CanvasRenderingContext2D;
  canvas!: HTMLCanvasElement;
  private lastTime: number;
  backgroundColor: string;
  private scaleFactor: number;
  disableContextMenu: boolean;
  isMoveCameraRMB: boolean;

  mouse: mouseInput;
  keys: keys;
  camera: camera;

  image!: HTMLImageElement;

  constructor(scaleFactor: number, width: number, height: number) {
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

    this.createCanvas(width, height);
    this.setupCanvas();
    this.setupEventListeners();

    // start game loop
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  enableMoveCameraRMB() {
    this.isMoveCameraRMB = true;
  }

  private moveCameraRMB() {
    if (this.mouse.RMB) {
      const dx = this.mouse.x - this.mouse.cameraLastMousePosition.x;
      const dy = this.mouse.y - this.mouse.cameraLastMousePosition.y;

      this.camera.x += dx * -1;
      this.camera.y += dy * -1;

      this.mouse.cameraLastMousePosition.x = this.mouse.x;
      this.mouse.cameraLastMousePosition.y = this.mouse.y;

      // console.log("camera", this.camera.x, this.camera.y);
    } else {
      this.mouse.cameraLastMousePosition.x = this.mouse.x;
      this.mouse.cameraLastMousePosition.y = this.mouse.y;
    }
  }

  setupEventListeners() {
    this.canvas.addEventListener("mousedown", (ev) => {
      // console.log(ev.which);
      if (ev.which === 3) {
        this.mouse.RMB = true;
      } else if (ev.which === 1) {
        this.mouse.LMB = true;
      } else if (ev.which === 2) {
        this.mouse.Wheel = true;
      }
      this.mouse.x = Math.round(ev.offsetX / this.scaleFactor);
      this.mouse.y = Math.round(ev.offsetY / this.scaleFactor);
    });
    this.canvas.addEventListener("mouseup", (ev) => {
      if (ev.which === 3) {
        this.mouse.RMB = false;
      } else if (ev.which === 1) {
        this.mouse.LMB = false;
      } else if (ev.which === 2) {
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
      if (!this.keys.key[ev.keyCode]) this.keys.key[ev.keyCode] = true;
      // console.log(ev.keyCode);
    });
    this.canvas.addEventListener("keyup", (ev) => {
      if (this.keys.key[ev.keyCode]) this.keys.key[ev.keyCode] = false;
    });
    this.canvas.addEventListener("contextmenu", (ev) => {
      if (this.disableContextMenu) ev.preventDefault();
    });
  }

  onClickLMB() {}
  onUnclickLMB() {}
  onMouseMove() {}
  onMouseWheel(ev: WheelEvent) {}

  setupCanvas() {
    this.context.scale(this.scaleFactor, this.scaleFactor);
    this.context.imageSmoothingEnabled = false;

    // styles
    this.canvas.style.border = "1px solid black";
    document.body.style.margin = "0";
    this.canvas.setAttribute("tabindex", "0");
  }

  updateCamera(x: number, y: number) {
    this.camera.x = +(x - this.canvas.width / (2 * this.scaleFactor)).toFixed(
      1
    );
    this.camera.y = +(y - this.canvas.height / (2 * this.scaleFactor)).toFixed(
      1
    );

    // console.log("camera", this.camera.x, this.camera.y);
  }

  createCanvas(width: number, height: number) {
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    const context: CanvasRenderingContext2D = canvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    document.body.appendChild(canvas);

    this.context = context;
    this.canvas = canvas;

    this.canvas.width = width;
    this.canvas.height = height;
  }

  gameLoop(timestamp: number) {
    // clear
    this.context.fillStyle = this.backgroundColor;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // fps calculations
    const deltaTime: number = +(timestamp - this.lastTime).toFixed(2);
    this.lastTime = timestamp;
    const fps: number = 1000 / deltaTime;

    this.update(deltaTime);
    this.draw(deltaTime);

    this.context.fillStyle = "black";
    this.context.font = "10px Arial";
    this.context.fillText(`FPS: ${Math.round(fps)}`, 10, 10);

    // this.drawImage(this.image, 0, 0, 100, 100, 0, 0, 100, 100);

    if (this.isMoveCameraRMB) this.moveCameraRMB();

    requestAnimationFrame(this.gameLoop.bind(this));
  }

  addImage(image: HTMLImageElement) {
    this.image = image;
  }

  update(deltaTime: number) {}
  draw(deltaTime: number) {}
}

export class Draw {
  private context: CanvasRenderingContext2D;
  private camera: camera;
  private images: { image: HTMLImageElement; name: string }[];

  constructor(context: CanvasRenderingContext2D, camera: camera) {
    this.context = context;
    this.camera = camera;
    this.images = [];
  }

  image(
    imageName: string,
    sx: number,
    sy: number,
    sWidth: number,
    sHeight: number,
    dx: number,
    dy: number,
    isOnMap: boolean = false,
    dWidth: number | boolean = false,
    dHeight: number | boolean = false,
    isFlipX: boolean = false,
    isFlipY: boolean = false,
    rotationDeg: number = 0,
    rotationOriginX: number = 0,
    rotationOriginY: number = 0
  ) {
    const image = this.images.find((el) => el.name === imageName)?.image;
    if (!image) {
      console.log(
        `Image with name ${imageName} not found or is still loading. Available images: ${this.images
          .map((img) => img.name)
          .join(", ")}`
      );
      return;
    }

    // calculate destination width and height
    const dw = typeof dWidth === "boolean" ? sWidth : dWidth;
    const dh = typeof dHeight === "boolean" ? sHeight : dHeight;

    if (isFlipX || isFlipY || rotationDeg !== 0) {
      // Zapamiętaj obecne ustawienia transformacji
      this.context.save();

      // Ustaw pivot jako punkt obracania
      this.context.translate(
        rotationOriginX + dx + sWidth / 2 - (isOnMap ? this.camera.x : 0),
        rotationOriginY + dy + sHeight / 2 - (isOnMap ? this.camera.y : 0)
      );

      // Obróć obraz o podaną ilość stopni
      this.context.rotate((rotationDeg * Math.PI) / 180);

      // Odbij obraz w osi X, jeśli wymagane
      if (isFlipX) this.context.scale(-1, 1);

      // Odbij obraz w osi Y, jeśli wymagane
      if (isFlipY) this.context.scale(1, -1);

      // Przesuń punkt obrotu z powrotem do początkowego punktu
      this.context.translate(
        -(rotationOriginX + dx + sWidth / 2 - (isOnMap ? this.camera.x : 0)),
        -(rotationOriginY + dy + sHeight / 2 - (isOnMap ? this.camera.y : 0))
      );
    }

    this.context.drawImage(
      image,
      sx,
      sy,
      sWidth,
      sHeight,
      dx - (isOnMap ? this.camera.x : 0),
      dy - (isOnMap ? this.camera.y : 0),
      dw,
      dh
    );

    if (isFlipX || isFlipY || rotationDeg !== 0) {
      this.context.restore();
    }
  }

  addImage(path: string, name: string) {
    const img: HTMLImageElement = new Image();
    img.src = path;

    img.onerror = () => {
      console.log(`Failed to load image at path: ${path}`);
    };

    img.onload = () => {
      this.images.push({ image: img, name });
    };
  }

  rect(
    x: number,
    y: number,
    width: number,
    height: number,
    isOnMap: boolean = false,
    color: string = "black",
    lineWidth: number = 1,
    isFill: boolean = false,
    isFlipX: boolean = false,
    isFlipY: boolean = false,
    rotationDeg: number = 0,
    rotationOriginX: number = 0,
    rotationOriginY: number = 0
  ) {
    if (isFlipX || isFlipY || rotationDeg !== 0) {
      // Zapamiętaj obecne ustawienia transformacji
      this.context.save();

      // Ustaw pivot jako punkt obracania
      this.context.translate(
        rotationOriginX + x + width / 2 - (isOnMap ? this.camera.x : 0),
        rotationOriginY + y + height / 2 - (isOnMap ? this.camera.y : 0)
      );

      // Obróć obraz o podaną ilość stopni
      this.context.rotate((rotationDeg * Math.PI) / 180);

      // Odbij obraz w osi X, jeśli wymagane
      if (isFlipX) this.context.scale(-1, 1);

      // Odbij obraz w osi Y, jeśli wymagane
      if (isFlipY) this.context.scale(1, -1);

      // Przesuń punkt obrotu z powrotem do początkowego punktu
      this.context.translate(
        -(rotationOriginX + x + width / 2 - (isOnMap ? this.camera.x : 0)),
        -(rotationOriginY + y + height / 2 - (isOnMap ? this.camera.y : 0))
      );
    }
    this.context.lineWidth = lineWidth;
    this.context.strokeStyle = color;
    this.context.beginPath();
    this.context.rect(
      x - (isOnMap ? this.camera.x : 0),
      y - (isOnMap ? this.camera.y : 0),
      width,
      height
    );
    if (isFill) {
      this.context.fillStyle = color;
      this.context.fill();
    } else {
      this.context.stroke();
    }
    this.context.closePath();
    this.context.strokeStyle = "black";
    this.context.lineWidth = 1;

    if (isFlipX || isFlipY || rotationDeg !== 0) {
      this.context.restore();
    }
  }

  text(
    text: string,
    fontSize: number,
    x: number,
    y: number,
    isOnMap: boolean = false,
    center: { x?: boolean; y?: boolean } = { x: false, y: false }
  ) {
    this.context.font = `${fontSize}px Arial`;
    this.context.fillStyle = "black";
    this.context.textBaseline = center.y ? "middle" : "hanging";
    this.context.textAlign = center.x ? "center" : "start";
    this.context.fillText(
      text,
      x - (isOnMap ? this.camera.x : 0),
      y - (isOnMap ? this.camera.y : 0)
    );

    // reset
    this.context.font = `10px Arial`;
    if (center.x || center.y) {
      this.context.textBaseline = "hanging";
      this.context.textAlign = "start";
    }
  }

  circle(
    x: number,
    y: number,
    radius: number,
    isOnMap: boolean = false,
    color: string = "black",
    lineWidth: number = 1,
    isFill: boolean = false,
    startAngleDeg: number = 0,
    endAngleDeg: number = 360,
    isCounterclockwise: boolean = false
  ) {
    const startAngleRad = this.degToRad(startAngleDeg);
    const endAngleRad = this.degToRad(endAngleDeg);

    this.context.strokeStyle = color;
    this.context.lineWidth = lineWidth;
    this.context.beginPath();
    this.context.arc(
      x - (isOnMap ? this.camera.x : 0),
      y - (isOnMap ? this.camera.y : 0),
      radius,
      startAngleRad,
      endAngleRad,
      isCounterclockwise
    );

    if (isFill) {
      this.context.fillStyle = color;
      this.context.fill();
    } else {
      this.context.stroke();
    }

    this.context.closePath();
    this.context.strokeStyle = "black";
    this.context.lineWidth = 1;
  }

  private degToRad(deg: number): number {
    return (deg * Math.PI) / 180; // (0 * Math.PI) / 180 = 0
  }
}
