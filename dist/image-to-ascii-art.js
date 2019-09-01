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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ImageToAsciiArt\", function() { return ImageToAsciiArt; });\n/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model */ \"./src/model.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ \"./src/utils.ts\");\n\n\nclass ImageToAsciiArt {\n  // If remove canvas dom when destroy.If \"canvas\" param of this Class was passed,it will be true.\n\n  /**\r\n   * @param canvas optional,the canvas used to generate ascii art.If it isn't passed,a hidden canvas will be append to body automatically.\r\n   * @param config configuration\r\n   */\n  constructor({\n    canvas,\n    config = {}\n  } = {}) {\n    if (canvas instanceof HTMLCanvasElement) {\n      this.canvas = canvas;\n      this.canvasIsStable = true;\n    } else {\n      this.canvas = document.createElement('canvas');\n      this.canvas.style.display = 'none';\n      document.body.appendChild(this.canvas);\n    }\n\n    this.canvasCtx = this.canvas.getContext('2d');\n    this.setConfig(config);\n  }\n\n  setConfig(config) {\n    this.config = new _model__WEBPACK_IMPORTED_MODULE_0__[\"Config\"](config);\n  }\n  /**\r\n   * convert an image to an ascii art\r\n   * @param image a HTMLImageElement instance or an URL of a image\r\n   */\n\n\n  convert(image) {\n    let _image;\n\n    if (image instanceof HTMLImageElement) {\n      _image = image;\n    } else {\n      _image = new Image();\n      _image.src = image;\n    }\n\n    return new Promise(resolve => {\n      let doConvert = () => {\n        _image.removeEventListener('load', doConvert);\n\n        let drawWidth = this.config.drawWidth <= 1 ? this.config.drawWidth * _image.naturalWidth : this.config.drawWidth;\n        let drawHeight = this.config.drawHeight <= 1 ? this.config.drawHeight * _image.naturalHeight : this.config.drawHeight;\n\n        if (!this.canvasIsStable) {\n          this.canvas.width = drawWidth;\n          this.canvas.height = drawHeight;\n        }\n\n        this.canvasCtx.drawImage(_image, 0, 0, drawWidth, drawHeight);\n        const imageData = this.canvasCtx.getImageData(0, 0, drawWidth, drawHeight);\n        const imageDataArr = imageData.data;\n        const imageDataHeight = imageData.height;\n        const imageDataWidth = imageData.width;\n        let arrGray = [];\n\n        for (let h = 0; h < imageDataHeight; h += this.config.pickDensityHorizontal) {\n          for (let w = 0; w < imageDataWidth; w += this.config.pickDensityVertical) {\n            let index = (w + imageDataWidth * h) * 4;\n            let r = imageDataArr[index];\n            let g = imageDataArr[index + 1];\n            let b = imageDataArr[index + 2];\n            arrGray.push(Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"rgbToGray\"])(r, g, b));\n          } // -1 stands for '\\r\\n'\n\n\n          arrGray.push(-1);\n        }\n\n        resolve(Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"grayToAsciiString\"])(arrGray, [...this.config.greyRangeChar, {\n          from: -1,\n          to: -1,\n          char: '\\r\\n'\n        }]));\n      };\n\n      if (!_image.complete) {\n        _image.addEventListener('load', doConvert);\n      } else {\n        doConvert();\n      }\n    });\n  }\n\n  destroy() {\n    if (!this.canvasIsStable) {\n      document.body.removeChild(this.canvas);\n    }\n  }\n\n}\n\n//# sourceURL=webpack:///./src/image-to-ascii-art.ts?");

/***/ }),

/***/ "./src/model.ts":
/*!**********************!*\
  !*** ./src/model.ts ***!
  \**********************/
/*! exports provided: Config */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Config\", function() { return Config; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/utils.ts\");\n // set the char replace the grey between [from,to]\n\nclass Config {\n  constructor(config) {\n    this.drawWidth = Config.dealDrawParam(config.drawWidth, '\"drawWith\" config is invalid', 1);\n    this.drawHeight = Config.dealDrawParam(config.drawHeight, '\"drawHeight\" config is invalid', 1);\n    this.pickDensityHorizontal = Config.dealPickDensity(config.pickDensityHorizontal, '\"pickDensityHorizontal\" config is invalid', 1);\n    this.pickDensityVertical = Config.dealPickDensity(config.pickDensityVertical, '\"pickDensityVertical\" config is invalid', 1);\n    this.greyRangeChar = Config.dealGreyRangeChar(config.greyRangeChar, '\"greyRangeChar\" config is invalid', [{\n      from: 0,\n      to: 30,\n      char: '#'\n    }, {\n      from: 31,\n      to: 60,\n      char: '&'\n    }, {\n      from: 61,\n      to: 120,\n      char: '$'\n    }, {\n      from: 121,\n      to: 150,\n      char: '*'\n    }, {\n      from: 151,\n      to: 180,\n      char: 'o'\n    }, {\n      from: 181,\n      to: 210,\n      char: '!'\n    }, {\n      from: 211,\n      to: 240,\n      char: ';'\n    }]);\n    this.defaultGreyChar = ' ';\n  }\n\n  static dealDrawParam(param, err, defaultValue) {\n    if (!Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"isDef\"])(param)) {\n      return defaultValue;\n    }\n\n    if (isNaN(param) || param <= 0) {\n      throw new Error(err);\n    } else if (param > 1) {\n      param = Math.floor(param);\n    }\n\n    return param;\n  }\n\n  static dealPickDensity(param, err, defaultValue) {\n    if (!Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"isDef\"])(param)) {\n      return defaultValue;\n    }\n\n    if (isNaN(param) || param <= 1) {\n      throw new Error(err);\n    }\n\n    return Math.floor(param);\n  }\n\n  static dealGreyRangeChar(param, err, defaultValue) {\n    if (!Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"isDef\"])(param)) {\n      return defaultValue;\n    }\n\n    for (let i = 0; i < param.length; i++) {\n      param[i].from = Math.floor(param[i].from);\n      param[i].to = Math.floor(param[i].to);\n\n      if (param[i].from > param[i].to) {\n        throw new Error(err);\n      }\n    }\n\n    return defaultValue;\n  }\n\n}\n\n//# sourceURL=webpack:///./src/model.ts?");

/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/*! exports provided: isDef, rgbToGray, grayToAsciiString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isDef\", function() { return isDef; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"rgbToGray\", function() { return rgbToGray; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"grayToAsciiString\", function() { return grayToAsciiString; });\nfunction isDef(val) {\n  return val !== undefined && val !== null;\n}\nfunction rgbToGray(r, g, b) {\n  return Math.round(0.299 * r + 0.587 * g + 0.114 * b);\n}\nfunction grayToAsciiString(gray, greyRangeChar, defaultChar = ' ') {\n  const greyCharHash = {};\n\n  for (let i = 0; i < greyRangeChar.length; i++) {\n    const item = greyRangeChar[i];\n\n    for (let j = item.from; j <= item.to; j++) {\n      greyCharHash[j] = item.char;\n    }\n  }\n\n  return gray.map(item => {\n    return greyCharHash[item] || defaultChar;\n  }).join('');\n}\n\n//# sourceURL=webpack:///./src/utils.ts?");

/***/ })

/******/ });
});