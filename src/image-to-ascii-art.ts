import { Config } from './model';
import { rgbToGray, grayToAsciiChar } from './utils';


export class ImageToAsciiArt {
  private canvas: HTMLCanvasElement;
  private canvasCtx;
  private canvasIsStable: boolean; // If remove canvas dom when destroy.If "canvas" param of this Class was passed,it will be true.

  private config: Config;

  /**
   * @param canvas options,the canvas to generate ascii art.If it isn't passed,a hidden canvas will be append to body automatically.
   * @param config configuration
   */
  private constructor({ canvas, config = {} }: { canvas?: HTMLCanvasElement; config?: Config } = {}) {
    if (canvas instanceof HTMLCanvasElement) {
      this.canvas = canvas;
      this.canvasIsStable = true;
    } else {
      this.canvas = document.createElement('canvas');
      document.body.appendChild(this.canvas);
    }
    this.canvasCtx = this.canvas.getContext('2d');

  }

  public setConfig(config?: Config) {
    this.config = config
  }

  /**
   * transform an image to an ascii art
   * @param image a HTMLImageElement instance or an URL of a image
   */
  public transform(image: string | HTMLImageElement) {
    let _image;
    if (image instanceof HTMLImageElement) {
      _image = image;
    } else {
      _image = new Image();
      _image.src = image;
    }

    return new Promise((resolve, reject) => {
      let doTransform = () => {
        _image.removeEventListener('load', doTransform);

        // TODO:delete
        // this.canvas.width = 50;
        // this.canvas.height = 50;
        // this.canvasCtx.drawImage(_image, 0, 0, 50,50);
        // const imageData = this.canvasCtx.getImageData(0, 0, 50, 50);


        this.canvas.width = _image.naturalWidth;
        this.canvas.height = _image.naturalHeight;

        this.canvasCtx.drawImage(_image, 0, 0, _image.naturalWidth, _image.naturalHeight);
        const imageData = this.canvasCtx.getImageData(0, 0, _image.naturalWidth, _image.naturalHeight);
        const imageDataArr = imageData.data;
        const imageDataHeight = imageData.height;
        const imageDataWidth = imageData.width;
        console.log(imageData.width, imageData.height);

        let result = '';
        for (let h = 0; h < imageDataHeight; h += 1) {
          for (let w = 0; w < imageDataWidth; w += 1) {
            let index = (w + imageDataWidth * h) * 4;
            let r = imageDataArr[index + 0];
            let g = imageDataArr[index + 1];
            let b = imageDataArr[index + 2];
            let gray = rgbToGray(r, g, b);
            result += grayToAsciiChar(gray);
          }
          result += '\r\n';
        }
        resolve(result);
      }

      if (!_image.complete) {
        _image.addEventListener('load', doTransform);
      } else {
        doTransform();
      }
    });
  }

  public destroy() {
    if (!this.canvasIsStable) {
      document.body.removeChild(this.canvas);
    }
  }
}

