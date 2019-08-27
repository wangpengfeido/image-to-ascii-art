export function rgbToGray(r, g, b) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

export function grayToAsciiChar(gray) {
  if (gray <= 30) {
    return '#';
  } else if (gray > 30 && gray <= 60) {
    return '&';
  } else if (gray > 60 && gray <= 120) {
    return '$';
  } else if (gray > 120 && gray <= 150) {
    return '*';
  } else if (gray > 150 && gray <= 180) {
    return 'o';
  } else if (gray > 180 && gray <= 210) {
    return '!';
  } else if (gray > 210 && gray <= 240) {
    return ';';
  } else {
    return ' ';
  }
}

