import { ConfigInterface, Config } from './model';
import { rgbToGray, grayToAsciiString } from './utils';

export class ImageToAsciiArt {
  private canvas: HTMLCanvasElement;
  private canvasCtx;
  private canvasIsStable: boolean; // If remove canvas dom when destroy.If "canvas" param of this Class was passed,it will be true.

  private config: Config;

  /**
   * @param canvas optional,the canvas used to generate ascii art.If it isn't passed,a hidden canvas will be append to body automatically.
   * @param config configuration
   */
  private constructor({ canvas, config = {} }: { canvas?: HTMLCanvasElement; config?: ConfigInterface } = {}) {
    if (canvas instanceof HTMLCanvasElement) {
      this.canvas = canvas;
      this.canvasIsStable = true;
    } else {
      this.canvas = document.createElement('canvas');
      this.canvas.style.display = 'none';
      document.body.appendChild(this.canvas);
    }
    this.canvasCtx = this.canvas.getContext('2d');

    this.setConfig(config);
  }

  public setConfig(config?: ConfigInterface): void {
    this.config = new Config(config);
  }

  /**
   * convert an image to an ascii art
   * @param image a HTMLImageElement instance or an URL of a image
   */
  public convert(image: string | HTMLImageElement): Promise<string> {
    let _image;
    if (image instanceof HTMLImageElement) {
      _image = image;
    } else {
      _image = new Image();
      _image.src = image;
    }

    return new Promise((resolve): void => {
      let doConvert = (): void => {
        _image.removeEventListener('load', doConvert);

        let drawWidth = this.config.drawWidth <= 1 ? this.config.drawWidth * _image.naturalWidth : this.config.drawWidth;
        let drawHeight = this.config.drawHeight <= 1 ? this.config.drawHeight * _image.naturalHeight : this.config.drawHeight;

        if (!this.canvasIsStable) {
          this.canvas.width = drawWidth;
          this.canvas.height = drawHeight;
        }

        this.canvasCtx.drawImage(_image, 0, 0, drawWidth, drawHeight);
        const imageData = this.canvasCtx.getImageData(0, 0, drawWidth, drawHeight);
        const imageDataArr = imageData.data;
        const imageDataHeight = imageData.height;
        const imageDataWidth = imageData.width;

        let arrGray = [];
        for (let h = 0; h < imageDataHeight; h += this.config.pickDensityHorizontal) {
          for (let w = 0; w < imageDataWidth; w += this.config.pickDensityVertical) {
            let index = (w + imageDataWidth * h) * 4;
            let r = imageDataArr[index];
            let g = imageDataArr[index + 1];
            let b = imageDataArr[index + 2];
            arrGray.push(rgbToGray(r, g, b));
          }
          // -1 stands for '\r\n'
          arrGray.push(-1);
        }

        resolve(grayToAsciiString(arrGray, [...this.config.greyRangeChar, { from: -1, to: -1, char: '\r\n' }]));
      };

      if (!_image.complete) {
        _image.addEventListener('load', doConvert);
      } else {
        doConvert();
      }
    });
  }

  public destroy(): void {
    if (!this.canvasIsStable) {
      document.body.removeChild(this.canvas);
    }
  }
}

