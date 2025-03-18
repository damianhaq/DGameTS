interface mouseInput {
  LMB: boolean;
  LMBClickFlag: boolean;
  RMB: boolean;
  RMBClickFlag: boolean;
  Wheel: boolean;
  WheelClickFlag: boolean;
  cameraLastMousePosition: { x: number; y: number };
  mouseMoveLastPosition: { x: number; y: number };
  x: number;
  y: number;
}

interface keys {
  key: boolean[];
}

interface camera {
  x: number;
  y: number;
}
