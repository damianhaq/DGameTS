import { DGame } from "./DGame";

export class Gui {
  private game: DGame;
  constructor(game: DGame) {
    this.game = game;
  }

  createButton(
    text: string,
    x: number,
    y: number,
    callback: CallableFunction,
    parent: HTMLElement = document.body
  ) {
    if (parent.style.position === "") {
      parent.style.position = "relative";
    }

    const button = document.createElement("button");
    button.textContent = text;
    button.style.position = "absolute";
    button.style.left = `${x}px`;
    button.style.top = `${y}px`;

    parent.appendChild(button);
    button.addEventListener("click", (ev) => callback(ev));

    return button;
  }

  createLabel(
    text: string,
    x: number,
    y: number,
    parent: HTMLElement = document.body
  ) {
    if (parent.style.position === "") {
      parent.style.position = "relative";
    }

    const label = document.createElement("div");
    label.textContent = text;
    label.style.position = "absolute";
    label.style.left = `${x}px`;
    label.style.top = `${y}px`;

    parent.appendChild(label);

    return label;
  }

  createWindow(
    x: number,
    y: number,
    width: number,
    height: number,
    title?: string,
    parent: HTMLElement = document.body
  ) {
    if (parent.style.position === "") {
      parent.style.position = "relative";
    }

    const window = document.createElement("div");
    window.style.position = "absolute";
    window.style.left = `${x}px`;
    window.style.top = `${y}px`;
    window.style.width = `${width}px`;
    window.style.height = `${height}px`;
    window.style.border = "1px solid black";
    window.style.backgroundColor = "white";

    if (title) {
      const titleBar = document.createElement("div");
      titleBar.textContent = title;
      titleBar.style.padding = "5px";
      titleBar.style.backgroundColor = "#e0e0e0";
      titleBar.style.borderBottom = "1px solid black";

      window.appendChild(titleBar);
    }
    parent.appendChild(window);

    return window;
  }
}
