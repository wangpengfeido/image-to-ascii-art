(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/image-to-ascii-art.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/image-to-ascii-art.ts":
/*!***********************************!*\
  !*** ./src/image-to-ascii-art.ts ***!
  \***********************************/
/*! exports provided: ImageToAsciiArt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ImageToAsciiArt\", function() { return ImageToAsciiArt; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/utils.ts\");\n\nclass ImageToAsciiArt {\n  /**\r\n   * @param canvas options,the canvas to generate ascii art.If it isn't passed,a hidden canvas will be append to body automatically.\r\n   * @param config configuration\r\n   */\n  constructor({\n    canvas,\n    config\n  } = {}) {\n    if (canvas instanceof HTMLCanvasElement) {\n      this.canvas = canvas;\n      this.canvasIsStable = true;\n    } else {\n      this.canvas = document.createElement('canvas');\n      document.body.appendChild(this.canvas);\n    }\n\n    this.canvasCtx = this.canvas.getContext('2d');\n    this.setConfig(config);\n  }\n\n  setConfig(config) {\n    this.config = config;\n  }\n  /**\r\n   * transform an image to an ascii art\r\n   * @param image a HTMLImageElement instance or an URL of a image\r\n   */\n\n\n  transform(image) {\n    let _image;\n\n    if (image instanceof HTMLImageElement) {\n      _image = image;\n    } else {\n      _image = new Image();\n      _image.src = image;\n    }\n\n    return new Promise((resolve, reject) => {\n      let doTransform = () => {\n        _image.removeEventListener('load', doTransform); // TODO:delete\n        // this.canvas.width = 50;\n        // this.canvas.height = 50;\n\n\n        this.canvas.width = _image.naturalWidth;\n        this.canvas.height = _image.naturalHeight;\n        this.canvasCtx.drawImage(_image, 0, 0, _image.naturalWidth, _image.naturalHeight);\n        const imageData = this.canvasCtx.getImageData(0, 0, _image.naturalWidth, _image.naturalHeight);\n        const imageDataArr = imageData.data;\n        const imageDataHeight = imageData.height;\n        const imageDataWidth = imageData.width;\n        console.log(imageData.width, imageData.height);\n        let result = '';\n\n        for (let h = 0; h < imageDataHeight; h += 1) {\n          for (let w = 0; w < imageDataWidth; w += 1) {\n            let index = (w + imageDataWidth * h) * 4;\n            let r = imageDataArr[index + 0];\n            let g = imageDataArr[index + 1];\n            let b = imageDataArr[index + 2];\n            let gray = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"rgbToGray\"])(r, g, b);\n            result += Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"grayToAsciiChar\"])(gray);\n          }\n\n          result += '\\r\\n';\n        }\n\n        resolve(result);\n      };\n\n      if (!_image.complete) {\n        _image.addEventListener('load', doTransform);\n      } else {\n        doTransform();\n      }\n    });\n  }\n\n  destroy() {\n    if (!this.canvasIsStable) {\n      document.body.removeChild(this.canvas);\n    }\n  }\n\n}\n\n//# sourceURL=webpack:///./src/image-to-ascii-art.ts?");

/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/*! exports provided: rgbToGray, grayToAsciiChar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"rgbToGray\", function() { return rgbToGray; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"grayToAsciiChar\", function() { return grayToAsciiChar; });\nfunction rgbToGray(r, g, b) {\n  return 0.299 * r + 0.587 * g + 0.114 * b;\n}\nfunction grayToAsciiChar(gray) {\n  if (gray <= 30) {\n    return '#';\n  } else if (gray > 30 && gray <= 60) {\n    return '&';\n  } else if (gray > 60 && gray <= 120) {\n    return '$';\n  } else if (gray > 120 && gray <= 150) {\n    return '*';\n  } else if (gray > 150 && gray <= 180) {\n    return 'o';\n  } else if (gray > 180 && gray <= 210) {\n    return '!';\n  } else if (gray > 210 && gray <= 240) {\n    return ';';\n  } else {\n    return ' ';\n  }\n}\n\n//# sourceURL=webpack:///./src/utils.ts?");

/***/ })

/******/ });
});