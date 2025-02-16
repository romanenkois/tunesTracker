export interface PalleteHSLA {
  hue: number;
  saturation: number;
  lightness: number;
  opacity: number;
}

export interface TrailPoint {
  x: number;
  y: number;
  age: number;
}
export interface TrailingTriangle {
  x: number;
  y: number;
  rotation: number;
  size: number;
  color: PalleteHSLA;
  age: number;
}
