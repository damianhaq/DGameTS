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
export class Draw {
    constructor(context, camera) {
        this.context = context;
        this.camera = camera;
        this.images = [];
    }
    image(imageName, sx, sy, sWidth, sHeight, dx, dy, isOnMap = false, dWidth = false, dHeight = false, isFlipX = false, isFlipY = false, rotationDeg = 0, rotationOriginX = 0, rotationOriginY = 0) {
        var _a;
        const image = (_a = this.images.find((el) => el.name === imageName)) === null || _a === void 0 ? void 0 : _a.image;
        if (!image) {
            console.log(`Image with name ${imageName} not found or is still loading. Available images: ${this.images
                .map((img) => img.name)
                .join(", ")}`);
            return;
        }
        // calculate destination width and height
        const dw = typeof dWidth === "boolean" ? sWidth : dWidth;
        const dh = typeof dHeight === "boolean" ? sHeight : dHeight;
        if (isFlipX || isFlipY || rotationDeg !== 0) {
            // Zapamiętaj obecne ustawienia transformacji
            this.context.save();
            // Ustaw pivot jako punkt obracania
            this.context.translate(rotationOriginX + dx + sWidth / 2 - (isOnMap ? this.camera.x : 0), rotationOriginY + dy + sHeight / 2 - (isOnMap ? this.camera.y : 0));
            // Obróć obraz o podaną ilość stopni
            this.context.rotate((rotationDeg * Math.PI) / 180);
            // Odbij obraz w osi X, jeśli wymagane
            if (isFlipX)
                this.context.scale(-1, 1);
            // Odbij obraz w osi Y, jeśli wymagane
            if (isFlipY)
                this.context.scale(1, -1);
            // Przesuń punkt obrotu z powrotem do początkowego punktu
            this.context.translate(-(rotationOriginX + dx + sWidth / 2 - (isOnMap ? this.camera.x : 0)), -(rotationOriginY + dy + sHeight / 2 - (isOnMap ? this.camera.y : 0)));
        }
        this.context.drawImage(image, sx, sy, sWidth, sHeight, dx - (isOnMap ? this.camera.x : 0), dy - (isOnMap ? this.camera.y : 0), dw, dh);
        if (isFlipX || isFlipY || rotationDeg !== 0) {
            this.context.restore();
        }
    }
    addImage(path, name) {
        const img = new Image();
        img.src = path;
        img.onerror = () => {
            console.log(`Failed to load image at path: ${path}`);
        };
        img.onload = () => {
            this.images.push({ image: img, name });
        };
    }
    rect(x, y, width, height, isOnMap = false, color = "black", lineWidth = 1, isFill = false, isFlipX = false, isFlipY = false, rotationDeg = 0, rotationOriginX = 0, rotationOriginY = 0) {
        if (isFlipX || isFlipY || rotationDeg !== 0) {
            // Zapamiętaj obecne ustawienia transformacji
            this.context.save();
            // Ustaw pivot jako punkt obracania
            this.context.translate(rotationOriginX + x + width / 2 - (isOnMap ? this.camera.x : 0), rotationOriginY + y + height / 2 - (isOnMap ? this.camera.y : 0));
            // Obróć obraz o podaną ilość stopni
            this.context.rotate((rotationDeg * Math.PI) / 180);
            // Odbij obraz w osi X, jeśli wymagane
            if (isFlipX)
                this.context.scale(-1, 1);
            // Odbij obraz w osi Y, jeśli wymagane
            if (isFlipY)
                this.context.scale(1, -1);
            // Przesuń punkt obrotu z powrotem do początkowego punktu
            this.context.translate(-(rotationOriginX + x + width / 2 - (isOnMap ? this.camera.x : 0)), -(rotationOriginY + y + height / 2 - (isOnMap ? this.camera.y : 0)));
        }
        this.context.lineWidth = lineWidth;
        this.context.strokeStyle = color;
        this.context.beginPath();
        this.context.rect(x - (isOnMap ? this.camera.x : 0), y - (isOnMap ? this.camera.y : 0), width, height);
        if (isFill) {
            this.context.fillStyle = color;
            this.context.fill();
        }
        else {
            this.context.stroke();
        }
        this.context.closePath();
        this.context.strokeStyle = "black";
        this.context.lineWidth = 1;
        if (isFlipX || isFlipY || rotationDeg !== 0) {
            this.context.restore();
        }
    }
    text(text, fontSize, x, y, isOnMap = false, center = { x: false, y: false }) {
        this.context.font = `${fontSize}px Arial`;
        this.context.fillStyle = "black";
        this.context.textBaseline = center.y ? "middle" : "hanging";
        this.context.textAlign = center.x ? "center" : "start";
        this.context.fillText(text, x - (isOnMap ? this.camera.x : 0), y - (isOnMap ? this.camera.y : 0));
        // reset
        this.context.font = `10px Arial`;
        if (center.x || center.y) {
            this.context.textBaseline = "hanging";
            this.context.textAlign = "start";
        }
    }
    circle(x, y, radius, isOnMap = false, color = "black", lineWidth = 1, isFill = false, startAngleDeg = 0, endAngleDeg = 360, isCounterclockwise = false) {
        const startAngleRad = this.degToRad(startAngleDeg);
        const endAngleRad = this.degToRad(endAngleDeg);
        this.context.strokeStyle = color;
        this.context.lineWidth = lineWidth;
        this.context.beginPath();
        this.context.arc(x - (isOnMap ? this.camera.x : 0), y - (isOnMap ? this.camera.y : 0), radius, startAngleRad, endAngleRad, isCounterclockwise);
        if (isFill) {
            this.context.fillStyle = color;
            this.context.fill();
        }
        else {
            this.context.stroke();
        }
        this.context.closePath();
        this.context.strokeStyle = "black";
        this.context.lineWidth = 1;
    }
    line(x1, y1, x2, y2, isOnMap = false, color = "black", lineWidth = 1) {
        this.context.lineWidth = lineWidth;
        this.context.strokeStyle = color;
        this.context.beginPath();
        this.context.moveTo(x1 - (isOnMap ? this.camera.x : 0), y1 - (isOnMap ? this.camera.y : 0));
        this.context.lineTo(x2 - (isOnMap ? this.camera.x : 0), y2 - (isOnMap ? this.camera.y : 0));
        this.context.stroke();
        this.context.closePath();
        this.context.strokeStyle = "black";
        this.context.lineWidth = 1;
    }
    degToRad(deg) {
        return (deg * Math.PI) / 180; // (0 * Math.PI) / 180 = 0
    }
}
export class Map {
    constructor(cellsX, cellsY, cellLength, game, draw) {
        this.cellsX = cellsX;
        this.cellsY = cellsY;
        this.cellLength = cellLength;
        this.game = game;
        this.draw = draw;
        this.map = this.createMap();
    }
    addBuilding(building) {
        building.posCells.forEach((cell) => {
            const isInMap = cell.cellX >= 0 &&
                cell.cellX < this.cellsX &&
                cell.cellY >= 0 &&
                cell.cellY < this.cellsY;
            if (isInMap) {
                this.map[cell.cellY][cell.cellX] = building;
            }
        });
    }
    getCellCords(x, y, camera, cellLength) {
        const cellX = Math.floor((x + camera.x) / cellLength);
        const cellY = Math.floor((y + camera.y) / cellLength);
        return { cellX, cellY };
    }
    getCell(cellX, cellY) {
        return this.map[cellY][cellX];
    }
    createMap(fill = null) {
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
            this.draw.line(this.cellLength * i, 0, this.cellLength * i, this.cellLength * this.cellsX, true);
        }
        for (let j = 0; j < this.cellsY + 1; j++) {
            this.draw.line(0, this.cellLength * j, this.cellsY * this.cellLength, this.cellLength * j, true);
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
    outlineCell(cellX, cellY, lineWidth, color) {
        const cornerRadius = this.cellLength / 10;
        this.drawHorizontalLines(cellX, cellY, cornerRadius, lineWidth, color);
        this.drawVerticalLines(cellX, cellY, cornerRadius, lineWidth, color);
        this.drawCornerCircles(cellX, cellY, cornerRadius, lineWidth, color);
    }
    drawHorizontalLines(cellX, cellY, cornerRadius, lineWidth, color) {
        this.draw.line(cellX * this.cellLength + cornerRadius, cellY * this.cellLength, cellX * this.cellLength + this.cellLength - cornerRadius, cellY * this.cellLength, true, color, lineWidth);
        this.draw.line(cellX * this.cellLength + this.cellLength - cornerRadius, cellY * this.cellLength + this.cellLength, cellX * this.cellLength + cornerRadius, cellY * this.cellLength + this.cellLength, true, color, lineWidth);
    }
    drawVerticalLines(cellX, cellY, cornerRadius, lineWidth, color) {
        this.draw.line(cellX * this.cellLength + this.cellLength, cellY * this.cellLength + cornerRadius, cellX * this.cellLength + this.cellLength, cellY * this.cellLength + this.cellLength - cornerRadius, true, color, lineWidth);
        this.draw.line(cellX * this.cellLength, cellY * this.cellLength + this.cellLength - cornerRadius, cellX * this.cellLength, cellY * this.cellLength + cornerRadius, true, color, lineWidth);
    }
    drawCornerCircles(cellX, cellY, cornerRadius, lineWidth, color) {
        this.draw.circle(cellX * this.cellLength + cornerRadius, cellY * this.cellLength + cornerRadius, cornerRadius, true, color, lineWidth, false, 180, 270, false);
        this.draw.circle(cellX * this.cellLength + this.cellLength - cornerRadius, cellY * this.cellLength + cornerRadius, cornerRadius, true, color, lineWidth, false, 270, 0, false);
        this.draw.circle(cellX * this.cellLength + this.cellLength - cornerRadius, cellY * this.cellLength + this.cellLength - cornerRadius, cornerRadius, true, color, lineWidth, false, 0, 90, false);
        this.draw.circle(cellX * this.cellLength + cornerRadius, cellY * this.cellLength + this.cellLength - cornerRadius, cornerRadius, true, color, lineWidth, false, 90, 180, false);
    }
}
export class Resource {
}
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
