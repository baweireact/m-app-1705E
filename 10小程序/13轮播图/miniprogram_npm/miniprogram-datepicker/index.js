module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var calendar = __webpack_require__(1);

var start = 1901;
var years = Array.from(new Array(200), function (val, index) {
  return index + start + '年';
});
var months = Array.from(new Array(12), function (val, index) {
  return index + 1 + '月';
});
var chinaMonths = Array.from(new Array(12), function (val, index) {
  return calendar.toChinaMonth(index + 1);
});

Component({
  properties: {
    value: {
      type: String,
      value: '',
      observer: '_init'
    },
    chinese: {
      type: Boolean,
      value: false,
      observer: '_init'
    }
  },
  lifetimes: {
    attached: function attached() {
      this._init();
    }
  },
  methods: {
    _bindMultiPickerChange: function _bindMultiPickerChange(e) {
      this.setData({
        multiIndex: e.detail.value
      });

      var value = e.detail.value;
      var y = value[0] + start,
          m = value[1] + 1,
          d = value[2] + 1;


      this.triggerEvent('change', { value: y + '-' + this._dateFormat(m) + '-' + this._dateFormat(d) });
    },
    _bindMultiPickerColumnChange: function _bindMultiPickerColumnChange(e) {
      var multiArray = this.data.multiArray;
      var multiIndex = this.data.multiIndex;

      var y = multiIndex[0] + start;
      var m = multiIndex[1] + 1;

      multiIndex[e.detail.column] = e.detail.value;

      if (e.detail.column === 0) {
        y = e.detail.value + start;
      } else if (e.detail.column === 1) {
        m = e.detail.value + 1;
      }

      if (this.data.chinese) {
        multiArray[2] = this._monthDaysCompute(y, m);
      } else {
        multiArray[2] = this._solarDaysCompute(y, m);
      }

      this.setData({
        multiArray: multiArray,
        multiIndex: multiIndex
      });
    },
    _bindMultiPickerCancel: function _bindMultiPickerCancel() {
      this._init();
    },
    _init: function _init() {
      var y = 0,
          m = 0,
          d = 0;


      if (this.data.value) {
        var _data$value$split$map = this.data.value.split('-').map(Number);

        y = _data$value$split$map[0];
        m = _data$value$split$map[1];
        d = _data$value$split$map[2];
      } else {
        var lunar = calendar.solar2lunar();
        var _ref = [lunar.cYear, lunar.cMonth, lunar.cDay];
        y = _ref[0];
        m = _ref[1];
        d = _ref[2];
      }

      if (this.data.chinese) {
        var day = this.data.value ? calendar.lunar2solar(y, m, d) : calendar.solar2lunar(y, m, d);
        var _ref2 = [day.lYear, day.lMonth, day.lDay];
        y = _ref2[0];
        m = _ref2[1];
        d = _ref2[2];

        var days = this._monthDaysCompute(y, m);
        this.setData({
          multiArray: [years, chinaMonths, days],
          multiIndex: [y - start, m - 1, d - 1]
        });
      } else {
        var _days = this._solarDaysCompute(y, m);
        this.setData({
          multiArray: [years, months, _days],
          multiIndex: [y - start, m - 1, d - 1]
        });
      }
    },
    _solarDaysCompute: function _solarDaysCompute(y, m) {
      var day = calendar.solarDays(y, m);
      return Array.from(new Array(day), function (val, index) {
        var date = index + 1;
        var lunar = calendar.solar2lunar(y, m, date);
        return date + '日 ' + lunar.ncWeek;
      });
    },
    _monthDaysCompute: function _monthDaysCompute(y, m) {
      var day = calendar.monthDays(y, m);
      return Array.from(new Array(day), function (val, index) {
        return calendar.toChinaDay(index + 1);
      });
    },
    _dateFormat: function _dateFormat(n) {
      return (n < 10 ? '0' : '') + n;
    }
  }
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("calendar");

/***/ })
/******/ ]);