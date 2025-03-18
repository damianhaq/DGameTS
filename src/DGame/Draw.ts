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

  line(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    isOnMap: boolean = false,
    color: string = "black",
    lineWidth: number = 1
  ) {
    this.context.lineWidth = lineWidth;
    this.context.strokeStyle = color;
    this.context.beginPath();
    this.context.moveTo(
      x1 - (isOnMap ? this.camera.x : 0),
      y1 - (isOnMap ? this.camera.y : 0)
    );
    this.context.lineTo(
      x2 - (isOnMap ? this.camera.x : 0),
      y2 - (isOnMap ? this.camera.y : 0)
    );
    this.context.stroke();
    this.context.closePath();
    this.context.strokeStyle = "black";
    this.context.lineWidth = 1;
  }

  private degToRad(deg: number): number {
    return (deg * Math.PI) / 180; // (0 * Math.PI) / 180 = 0
  }
}
