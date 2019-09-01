import { GreyRangeChar } from './model';

export function isDef(val): boolean {
  return val !== undefined && val !== null;
}

export function rgbToGray(r: number, g: number, b: number): number {
  return Math.round(0.299 * r + 0.587 * g + 0.114 * b);
}

export function grayToAsciiString(gray: number[], greyRangeChar: GreyRangeChar[], defaultChar: string = ' '): string {
  const greyCharHash = {};
  for (let i = 0; i < greyRangeChar.length; i++) {
    const item = greyRangeChar[i];
    for (let j = item.from; j <= item.to; j++) {
      greyCharHash[j] = item.char;
    }
  }
  return gray.map((item): string => {
    return greyCharHash[item] || defaultChar;
  }).join('');
}

