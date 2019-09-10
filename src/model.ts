import { isDef } from "./utils";

// set the char replace the grey between [from,to]
export interface GreyRangeChar {
  from: number;
  to: number;
  char: string;
}

export interface ConfigInterface {
  // the integer of pixels drawn on the canvas.
  // it sets bigger,the generated ascii art will be more detailed.
  // it has two type to set:
  //    1. (0, 1] decimal.result is that this number multiplied by the number of pixels in the original image
  //    2. An integer greater than 1.
  drawWidth?: number;
  drawHeight?: number;
  // the integer that pick one for every how many pixels.
  // it must be an integer greater than 0.
  pickDensityHorizontal?: number;
  pickDensityVertical?: number;
  // set the char of every grey range.
  greyRangeChar?: GreyRangeChar[];
  // if a grey value can't match one of the 'greyRangeChar' config,use this char.
  defaultGreyChar?: string;
}

export class Config implements ConfigInterface {
  public drawWidth;
  public drawHeight;
  public pickDensityHorizontal;
  public pickDensityVertical;
  public greyRangeChar;
  public defaultGreyChar;

  public constructor(config: ConfigInterface) {
    this.drawWidth = Config.dealDrawParam(config.drawWidth, '"drawWith" config is invalid', 1);
    this.drawHeight = Config.dealDrawParam(config.drawHeight, '"drawHeight" config is invalid', 1);
    this.pickDensityHorizontal = Config.dealPickDensity(config.pickDensityHorizontal, '"pickDensityHorizontal" config is invalid', 1);
    this.pickDensityVertical = Config.dealPickDensity(config.pickDensityVertical, '"pickDensityVertical" config is invalid', 1);
    this.greyRangeChar = Config.dealGreyRangeChar(config.greyRangeChar, '"greyRangeChar" config is invalid', [
      { from: 0, to: 30, char: '#' },
      { from: 31, to: 60, char: '&' },
      { from: 61, to: 120, char: '$' },
      { from: 121, to: 150, char: '*' },
      { from: 151, to: 180, char: 'o' },
      { from: 181, to: 210, char: '!' },
      { from: 211, to: 240, char: ';' },
    ]);
    this.defaultGreyChar = ' ';
  }

  private static dealDrawParam(param: number, err: string, defaultValue: number): number {
    if (!isDef(param)) {
      return defaultValue;
    }
    if (isNaN(param) || param <= 0) {
      throw new Error(err)
    } else if (param > 1) {
      param = Math.floor(param);
    }
    return param;
  }

  private static dealPickDensity(param: number, err: string, defaultValue: number): number {
    if (!isDef(param)) {
      return defaultValue;
    }
    if (isNaN(param) || param <= 1) {
      throw new Error(err);
    }
    return Math.floor(param);
  }

  private static dealGreyRangeChar(param: GreyRangeChar[], err: string, defaultValue: GreyRangeChar[]): GreyRangeChar[] {
    if (!isDef(param)) {
      return defaultValue;
    }
    const result=[];
    for (let i = 0; i < param.length; i++) {
      if (param[i].from > param[i].to) {
        throw new Error(err);
      }
      result.push({
        from:Math.floor(param[i].from),
        to:Math.floor(param[i].to),
        char:param[i].char
      })
    }
    return result;
  }
}



