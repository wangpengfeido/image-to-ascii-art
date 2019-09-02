# image-to-ascii-art

## Introduction
Image-to-ascii-art can convert image to ascii art in browser.

Look at the image below to see the effect.You can download the image and see the detail.

![effect](https://raw.githubusercontent.com/wangpengfeido/image-to-ascii-art/master/doc/img/readme_effect.jpg)

**It convert by canvas,so you just can only use it in browser.**

## Install
Image-to-ascii-art can be installed using npm,or by including it with the script tag.

### NPM
````
npm install image-to-ascii-art
````
And then import it as dependency in your project.
````javascript
import ImageToAsciiArt from 'image-to-ascii-art'
````

## Simple Usage
It's really simple to use it.
````javascript
  const imageToAsciiArt = new ImageToAsciiArt();
  imageToAsciiArt.convert('./test.jpg').then(result => {
    document.body.innerHTML = result;
  });
  imageToAsciiArt.destroy();
````

## Note
Here is some important thing to note.You can read [Api](#api) first before you read it.

* When you want to show the generated ascii art somewhere,you must use monospaced font.In other words,every character in the font must have the same width.
* If you want to make the aspect ratio of generated ascii art and original image the same,you could meet this condition:````(drawWidth * pickDensityHorizontal)/(drawHeight * pickDensityVertical)```` is close to ````(imageNaturalWidth * fontWidth)/(imageNaturalHeight * fontHeight)````.
* Call [destroy](#imagetoasciiartdestroy) method when you will not use the imageToAsciiArt instance any more.

## API
### ImageToAsciiArt({canvas,config})
Main class of image-to-ascii-art.
* canvas ````<HTMLCanvasElement>```` Optional.The canvas used to generate ascii art.If it isn't passed,a hidden canvas will be append to body automatically.
* config ````<ConfigInterface>```` Optional.Look at [Configuration](#configuration).

### imageToAsciiArt.convert(image)
Do image to ascii art conversion.You can call it multiple times on the same imageToAsciiArt instance.
* image ````<string> | <HTMLImageElement>```` The image to convert to ascii art.It can be a url of the image or a HTMLImageElement.
* returns ````<Promise<string>>````  The generated ascii art string.

### imageToAsciiArt.setConfig(config)
Reset [Configuration](#configuration).
* config ````<ConfigInterface>```` Configuration.

### imageToAsciiArt.destroy()
Clean up resource.Call it when you will not use this imageToAsciiArt instance any more.

## Configuration
Configuration is passed as param to ImageToAsciiArt class or to [setConfig](#imagetoasciiartsetconfigconfig) method.

Here is default configuration.Every configuration item is Optional.If you don't set,it will be set as default.
````javascript
{
  drawWidth: 1,
  drawHeight: 1,
  pickDensityHorizontal: 1,
  pickDensityVertical: 1,
  greyRangeChar: [
    { from: 0, to: 30, char: '#' },
    { from: 31, to: 60, char: '&' },
    { from: 61, to: 120, char: '$' },
    { from: 121, to: 150, char: '*' },
    { from: 151, to: 180, char: 'o' },
    { from: 181, to: 210, char: '!' },
    { from: 211, to: 240, char: ';' },
  ],
  defaultGreyChar: ' ',
}
````

### drawWidth / drawHeight
* type: ````<number>````

the number of pixels drawn on the canvas.It sets bigger,the generated ascii art will be more detailed.

It has two type to set:
1. (0, 1] decimal.Result is that this number multiplied by the image's natural width or natural Height.
2. An integer greater than 1.The actual number of pixels drawn.

### pickDensityHorizontal / pickDensityVertical
* type: ````<number>````

The integer that pick one for every how many pixels from the canvas.It must be an integer greater than 0.It sets bigger,the generated ascii art will be less detailed.


### greyRangeChar
* type: ````<Array<{from,to,char}>>````

The pixel picked from the image will calculate it's grey.This configuration item decide the grey will be convert to what character.

Every item in the list is a range.It has three child.
* from ````<number>```` Start of the range.It is close interval.
* to ````<number>```` End of the range.It is close interval.
* char ````<string>```` The character to replace the grey in this range.

### defaultGreyChar
* type: ````<string>````

If a grey value can't match one of the [greyRangeChar](#greyrangechar) config,use this character.







