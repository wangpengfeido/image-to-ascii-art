export interface GreyRangeChar {
  from: number;
  to: number;
  char: string;
}

export interface Config {
  drawWidth?: number;
  drawHeight?: number;
  pixelIntervalHorizontal?: number;
  pixelIntervalVertical?: number;
  greyRangeChar?: GreyRangeChar[];
}



