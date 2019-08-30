export interface GreyRangeChar {
  from: number; // start of range
  to: number; // end of range
  char: string; // the char of this range
}

export interface ConfigInterface {
  // the number of pixels drawn on the canvas.
  // it sets bigger,the generated ascii art will be more detailed.
  // it has two type to set:
  //    1. (0, 1] decimal.result is that this number multiplied by the number of pixels in the original image
  //    2. An integer greater than 1.
  drawWidth?: number;
  drawHeight?: number;
  // the number that pick one for every how many pixels.
  // it must be an integer greater than 0.
  pickDensityHorizontal?: number;
  pickDensityVertical?: number;
  // set the char of every grey range.
  greyRangeChar?: GreyRangeChar[];
  // if a grey value can't match one of the 'greyRangeChar' config,use this char.
  defaultGreyChar: string;
}

class Config implements ConfigInterface {
  public drawWidth = 1;
  public drawHeight = 1;
  public pickDensityHorizontal = 1;
  public pickDensityVertical = 1;
  public greyRangeChar = [
    { from: 0, to: 30, char: '#' },
    { from: 30, to: 60, char: '&' },
    { from: 60, to: 120, char: '$' },
    { from: 120, to: 150, char: '*' },
    { from: 150, to: 180, char: 'o' },
    { from: 180, to: 210, char: '!' },
    { from: 210, to: 240, char: ';' },
  ];
  public defaultGreyChar = ' ';

  public constructor(config: ConfigInterface) {
    this.drawWidth = Config.dealDrawParam(config.drawWidth, 'drawWith config is invalid');
    this.drawHeight = Config.dealDrawParam(config.drawHeight, 'drawHeight config is invalid');
    this.pickDensityHorizontal = Config.dealDrawParam(config.pickDensityHorizontal, 'pickDensityHorizontal config is invalid');
    this.pickDensityVertical = Config.dealDrawParam(config.pickDensityVertical, 'pickDensityVertical config is invalid');
    this.greyRangeChar = config.greyRangeChar;
  }
  static dealDrawParam(param: number, err: any): number {
    if (isNaN(param) || param <= 0) {
      throw new Error(err)
    } else if (param > 1) {
      param = parseInt(param.toString());
    }
    return param;
  }
  static dealPickDensity(param: number, err: any): number {
    if (isNaN(param)) {
      throw new Error(err);
    }
    return parseInt(param.toString());
  }
}



