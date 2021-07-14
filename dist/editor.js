import { components, i18n, element, blockEditor, data as data$2, compose, hooks, blocks } from 'wp';
import _extends from '@babel/runtime/helpers/extends';
import _defineProperty$1 from '@babel/runtime/helpers/defineProperty';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import '@babel/runtime/helpers/classCallCheck';
import '@babel/runtime/helpers/createClass';
import '@babel/runtime/helpers/assertThisInitialized';
import '@babel/runtime/helpers/inherits';
import '@babel/runtime/helpers/possibleConstructorReturn';
import '@babel/runtime/helpers/getPrototypeOf';

var commonjsGlobal$1 = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var classnames$2 = {exports: {}};

/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

(function (module) {
/* global define */

(function () {

	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString === Object.prototype.toString) {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				} else {
					classes.push(arg.toString());
				}
			}
		}

		return classes.join(' ');
	}

	if (module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else {
		window.classNames = classNames;
	}
}());
}(classnames$2));

var classnames$1$1 = classnames$2.exports;

/*
 *
 * Material Design SVG icons as functional hyperscript components from
 * https://material.io/resources/icons/
 *
 */
var Add = function Add(props) {
  var _props$color = props.color,
      color = _props$color === void 0 ? 'none' : _props$color;
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",
    fill: color
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }));
};
var Alarm = function Alarm(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"
  }));
};
var BorderHorizontal = function BorderHorizontal(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M3 21h2v-2H3v2zM5 7H3v2h2V7zM3 17h2v-2H3v2zm4 4h2v-2H7v2zM5 3H3v2h2V3zm4 0H7v2h2V3zm8 0h-2v2h2V3zm-4 4h-2v2h2V7zm0-4h-2v2h2V3zm6 14h2v-2h-2v2zm-8 4h2v-2h-2v2zm-8-8h18v-2H3v2zM19 3v2h2V3h-2zm0 6h2V7h-2v2zm-8 8h2v-2h-2v2zm4 4h2v-2h-2v2zm4 0h2v-2h-2v2z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }));
};
var BorderRight = function BorderRight(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 21h2v-2H7v2zM3 5h2V3H3v2zm4 0h2V3H7v2zm0 8h2v-2H7v2zm-4 8h2v-2H3v2zm8 0h2v-2h-2v2zm-8-8h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm8 8h2v-2h-2v2zm4-4h2v-2h-2v2zm4-10v18h2V3h-2zm-4 18h2v-2h-2v2zm0-16h2V3h-2v2zm-4 8h2v-2h-2v2zm0-8h2V3h-2v2zm0 4h2V7h-2v2z"
  }));
};
var BorderVertical = function BorderVertical(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M3 9h2V7H3v2zm0-4h2V3H3v2zm4 16h2v-2H7v2zm0-8h2v-2H7v2zm-4 0h2v-2H3v2zm0 8h2v-2H3v2zm0-4h2v-2H3v2zM7 5h2V3H7v2zm12 12h2v-2h-2v2zm-8 4h2V3h-2v18zm8 0h2v-2h-2v2zm0-8h2v-2h-2v2zm0-10v2h2V3h-2zm0 6h2V7h-2v2zm-4-4h2V3h-2v2zm0 16h2v-2h-2v2zm0-8h2v-2h-2v2z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }));
};
var Button$4 = function Button(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }), /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"
  })));
};
var CalendarViewDay = function CalendarViewDay(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    role: "img",
    "aria-hidden": true,
    focusable: false
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M3 17h18v2H3zm0-7h18v5H3zm0-4h18v2H3z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h24v24H0z"
  }));
};
var CheckCircleOutline = function CheckCircleOutline(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h24v24H0V0zm0 0h24v24H0V0z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16.59 7.58L10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
  }));
};
var Collections = function Collections(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z"
  }));
};
var Crop169 = function Crop169(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"
  }));
};
var Crop32 = function Crop32(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H5V6h14v12z"
  }));
};
var CropFree = function CropFree(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 5v4h2V5h4V3H5c-1.1 0-2 .9-2 2zm2 10H3v4c0 1.1.9 2 2 2h4v-2H5v-4zm14 4h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4zm0-16h-4v2h4v4h2V5c0-1.1-.9-2-2-2z"
  }));
};
var Delete = function Delete(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }));
};
var DynamicFeed = function DynamicFeed(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24px",
    height: "24px",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("g", {
    id: "Bounding_Box"
  }, /*#__PURE__*/React.createElement("rect", {
    fill: "none",
    width: "24",
    height: "24"
  })), /*#__PURE__*/React.createElement("g", {
    id: "Flat"
  }, /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M8,8H6v7c0,1.1,0.9,2,2,2h9v-2H8V8z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20,3h-8c-1.1,0-2,0.9-2,2v6c0,1.1,0.9,2,2,2h8c1.1,0,2-0.9,2-2V5C22,3.9,21.1,3,20,3z M20,11h-8V7h8V11z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4,12H2v7c0,1.1,0.9,2,2,2h9v-2H4V12z"
  }))), /*#__PURE__*/React.createElement("g", {
    id: "Master",
    display: "none"
  }, /*#__PURE__*/React.createElement("g", {
    display: "inline"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8,8H6v7c0,1.1,0.9,2,2,2h9v-2H8V8z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20,3h-8c-1.1,0-2,0.9-2,2v6c0,1.1,0.9,2,2,2h8c1.1,0,2-0.9,2-2V5C22,3.9,21.1,3,20,3z M20,11h-8V7h8V11z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4,12H2v7c0,1.1,0.9,2,2,2h9v-2H4V12z"
  }))));
};
var Equalizer = function Equalizer(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 20h4V4h-4v16zm-6 0h4v-8H4v8zM16 9v11h4V9h-4z"
  }));
};
var Filter = function Filter(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M15.96 10.29l-2.75 3.54-1.96-2.36L8.5 15h11l-3.54-4.71zM3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14z"
  }));
};
var Filter1 = function Filter1(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm11 10h2V5h-4v2h2v8zm7-14H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14z"
  }));
};
var Filter2 = function Filter2(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14zm-4-4h-4v-2h2c1.1 0 2-.89 2-2V7c0-1.11-.9-2-2-2h-4v2h4v2h-2c-1.1 0-2 .89-2 2v4h6v-2z"
  }));
};
var Filter3 = function Filter3(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 1H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14zM3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm14 8v-1.5c0-.83-.67-1.5-1.5-1.5.83 0 1.5-.67 1.5-1.5V7c0-1.11-.9-2-2-2h-4v2h4v2h-2v2h2v2h-4v2h4c1.1 0 2-.89 2-2z"
  }));
};
var Filter4 = function Filter4(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm12 10h2V5h-2v4h-2V5h-2v6h4v4zm6-14H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14z"
  }));
};
var Filter5 = function Filter5(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 1H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14zM3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm14 8v-2c0-1.11-.9-2-2-2h-2V7h4V5h-6v6h4v2h-4v2h4c1.1 0 2-.89 2-2z"
  }));
};
var Filter6 = function Filter6(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14zm-8-2h2c1.1 0 2-.89 2-2v-2c0-1.11-.9-2-2-2h-2V7h4V5h-4c-1.1 0-2 .89-2 2v6c0 1.11.9 2 2 2zm0-4h2v2h-2v-2z"
  }));
};
var Filter7 = function Filter7(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14zm-8-2l4-8V5h-6v2h4l-4 8h2z"
  }));
};
var Filter8 = function Filter8(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14zm-8-2h2c1.1 0 2-.89 2-2v-1.5c0-.83-.67-1.5-1.5-1.5.83 0 1.5-.67 1.5-1.5V7c0-1.11-.9-2-2-2h-2c-1.1 0-2 .89-2 2v1.5c0 .83.67 1.5 1.5 1.5-.83 0-1.5.67-1.5 1.5V13c0 1.11.9 2 2 2zm0-8h2v2h-2V7zm0 4h2v2h-2v-2z"
  }));
};
var Filter9 = function Filter9(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14zM15 5h-2c-1.1 0-2 .89-2 2v2c0 1.11.9 2 2 2h2v2h-4v2h4c1.1 0 2-.89 2-2V7c0-1.11-.9-2-2-2zm0 4h-2V7h2v2z"
  }));
};
var FilterNone = function FilterNone(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14z"
  }));
};
/**
 * A cross in a circle
 *
 * @param props
 * @return {*}
 * @constructor
 */

var HighlightOff = function HighlightOff(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
  }));
};
var KeyboardArrowDown = function KeyboardArrowDown(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }));
};
var KeyboardArrowLeft = function KeyboardArrowLeft(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }));
};
var KeyboardArrowRight = function KeyboardArrowRight(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }));
};
var KeyboardArrowUp = function KeyboardArrowUp(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }));
};
var KeyboardTab = function KeyboardTab(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11.59 7.41L15.17 11H1v2h14.17l-3.59 3.59L13 18l6-6-6-6-1.41 1.41zM20 6v12h2V6h-2z"
  }));
};
var Label = function Label(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z"
  }));
};
var Link = function Link(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"
  }));
};
var LinkOff = function LinkOff(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0V0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M17 7h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1 0 1.43-.98 2.63-2.31 2.98l1.46 1.46C20.88 15.61 22 13.95 22 12c0-2.76-2.24-5-5-5zm-1 4h-2.19l2 2H16zM2 4.27l3.11 3.11C3.29 8.12 2 9.91 2 12c0 2.76 2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1 0-1.59 1.21-2.9 2.76-3.07L8.73 11H8v2h2.73L13 15.27V17h1.73l4.01 4L20 19.74 3.27 3 2 4.27z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 24V0",
    fill: "none"
  }));
};
/**
 * Two concentric arrows arranged in a circle
 *
 * @param props
 * @return {*}
 * @constructor
 */

var Loop = function Loop(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"
  }));
};
/**
 * Three dots / Menu icon
 *
 * @param props
 * @return {*}
 * @constructor
 */

var MoreHorizontal = function MoreHorizontal(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
  }));
};
var PhotoResizeSelectLarge = function PhotoResizeSelectLarge(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M24 24H0V0h24v24z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 15h2v2h-2v-2zm0-4h2v2h-2v-2zm2 8h-2v2c1 0 2-1 2-2zM13 3h2v2h-2V3zm8 4h2v2h-2V7zm0-4v2h2c0-1-1-2-2-2zM1 7h2v2H1V7zm16-4h2v2h-2V3zm0 16h2v2h-2v-2zM3 3C2 3 1 4 1 5h2V3zm6 0h2v2H9V3zM5 3h2v2H5V3zm-4 8v8c0 1.1.9 2 2 2h12V11H1zm2 8l2.5-3.21 1.79 2.15 2.5-3.22L13 19H3z"
  }));
};
var PlayCircleOutline = function PlayCircleOutline(props) {
  return /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, /*#__PURE__*/React.createElement("path", _extends({
    d: "M0 0h24v24H0z",
    fill: "none"
  }, props)), /*#__PURE__*/React.createElement("path", {
    d: "M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
  }));
};
var PresentToAllTwoTone = function PresentToAllTwoTone(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0V0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 19.02h18V4.98H3v14.04zM12 8l4 4h-2v4h-4v-4H8l4-4z",
    opacity: ".3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 16h4v-4h2l-4-4-4 4h2zM21 3H3c-1.11 0-2 .89-2 2v14c0 1.11.89 2 2 2h18c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 16.02H3V4.98h18v14.04z"
  }));
};
/**
 * An arrow pointing at a paragraph from the left edge
 * @param props
 * @return {*}
 * @constructor
 */

var ReadMore = function ReadMore(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    enableBackground: "new 0 0 24 24",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
    fill: "none",
    height: "24",
    width: "24"
  })), /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
    height: "2",
    width: "9",
    x: "13",
    y: "7"
  }), /*#__PURE__*/React.createElement("rect", {
    height: "2",
    width: "9",
    x: "13",
    y: "15"
  }), /*#__PURE__*/React.createElement("rect", {
    height: "2",
    width: "6",
    x: "16",
    y: "11"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "13,12 8,7 8,11 2,11 2,13 8,13 8,17"
  }))));
};
/**
 * A screen with a plus icon and a caret to the right on the bottom right edge
 *
 * @param props
 * @return {*}
 * @constructor
 */

var QueuePlayNext = function QueuePlayNext(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("path", {
    id: "a",
    d: "M0 0h24v24H0V0z"
  })), /*#__PURE__*/React.createElement("clipPath", {
    id: "b"
  }, /*#__PURE__*/React.createElement("use", {
    xlinkHref: "#a",
    overflow: "visible"
  })), /*#__PURE__*/React.createElement("path", {
    clipPath: "url(#b)",
    d: "M21 3H3c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h5v2h8v-2h2v-2H3V5h18v8h2V5c0-1.11-.9-2-2-2zm-8 7V7h-2v3H8v2h3v3h2v-3h3v-2h-3zm11 8l-4.5 4.5L18 21l3-3-3-3 1.5-1.5L24 18z"
  }));
};
/**
 * A square box surrounded by dots forming an outer box
 *
 * @param props
 * @return {*}
 * @constructor
 */

var SelectAll = function SelectAll(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "black",
    width: "24px",
    height: "24px"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 5h2V3c-1.1 0-2 .9-2 2zm0 8h2v-2H3v2zm4 8h2v-2H7v2zM3 9h2V7H3v2zm10-6h-2v2h2V3zm6 0v2h2c0-1.1-.9-2-2-2zM5 21v-2H3c0 1.1.9 2 2 2zm-2-4h2v-2H3v2zM9 3H7v2h2V3zm2 18h2v-2h-2v2zm8-8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2zm0-12h2V7h-2v2zm0 8h2v-2h-2v2zm-4 4h2v-2h-2v2zm0-16h2V3h-2v2zM7 17h10V7H7v10zm2-8h6v6H9V9z"
  }));
};
var Snooze = function Snooze(props) {
  return /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, /*#__PURE__*/React.createElement("path", _extends({
    d: "M0 0h24v24H0z",
    fill: "none"
  }, props)), /*#__PURE__*/React.createElement("path", {
    d: "M7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm-3-9h3.63L9 15.2V17h6v-2h-3.63L15 10.8V9H9v2z"
  }));
};
var Stars = function Stars(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"
  }));
};
var Star = Stars;
var StarOutline = function StarOutline(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"
  }));
};
var SwapHoriz = function SwapHoriz(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }));
};
var SwapVert = function SwapVert(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }));
};
/**
 * A larger capital letter "T" followed by a smaller capital "T"
 *
 * @param props
 * @return {*}
 * @constructor
 */

var TextFields = function TextFields(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("path", {
    id: "a",
    d: "M24 24H0V0h24v24z"
  })), /*#__PURE__*/React.createElement("clipPath", {
    id: "b"
  }, /*#__PURE__*/React.createElement("use", {
    xlinkHref: "#a",
    overflow: "visible"
  })), /*#__PURE__*/React.createElement("path", {
    clipPath: "url(#b)",
    d: "M2.5 4v3h5v12h3V7h5V4h-13zm19 5h-9v3h3v7h3v-7h3V9z"
  }));
};
/**
 * A celluloid strip / Video icon / Film
 *
 * @param props
 * @return {*}
 * @constructor
 */

var Theaters = function Theaters(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }));
};
/**
 * Carets pointing up and down away from each other on top of each other
 *
 * @param props
 * @return {*}
 * @constructor
 */

var UnfoldMore = function UnfoldMore(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z"
  }));
};
var VerticalAlignBottom = function VerticalAlignBottom(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "black",
    width: "24px",
    height: "24px"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 13h-3V3h-2v10H8l4 4 4-4zM4 19v2h16v-2H4z"
  }));
};
var VerticalAlignCenter = function VerticalAlignCenter(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 19h3v4h2v-4h3l-4-4-4 4zm8-14h-3V1h-2v4H8l4 4 4-4zM4 11v2h16v-2H4z"
  }));
};
var VerticalAlignTop = function VerticalAlignTop(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M8 11h3v10h2V11h3l-4-4-4 4zM4 3v2h16V3H4z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }));
};
/**
 * Text lines to the left, a block / image to the right
 *
 * @param props
 * @return {*}
 * @constructor
 */

var VerticalSplit = function VerticalSplit(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 15h8v-2H3v2zm0 4h8v-2H3v2zm0-8h8V9H3v2zm0-6v2h8V5H3zm10 0h8v14h-8V5z"
  }));
};
var ViewAgenda = function ViewAgenda(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20 13H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zm0-10H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1z"
  }));
};
var ViewCarousel = function ViewCarousel(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M7 19h10V4H7v15zm-5-2h4V6H2v11zM18 6v11h4V6h-4z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }));
};
var ViewColumn = function ViewColumn(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 18h5V5h-5v13zm-6 0h5V5H4v13zM16 5v13h5V5h-5z"
  }));
};
var ViewCompact = function ViewCompact(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 19h6v-7H3v7zm7 0h12v-7H10v7zM3 5v6h19V5H3z"
  }));
};
var WbIridescent = function WbIridescent(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 14.5h14v-6H5v6zM11 .55V3.5h2V.55h-2zm8.04 2.5l-1.79 1.79 1.41 1.41 1.8-1.79-1.42-1.41zM13 22.45V19.5h-2v2.95h2zm7.45-3.91l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zM3.55 4.46l1.79 1.79 1.41-1.41-1.79-1.79-1.41 1.41zm1.41 15.49l1.79-1.8-1.41-1.41-1.79 1.79 1.41 1.42z"
  }));
};
var Web = function Web(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }));
};

var materialDesignIcons = /*#__PURE__*/Object.freeze({
	__proto__: null,
	Add: Add,
	Alarm: Alarm,
	BorderHorizontal: BorderHorizontal,
	BorderRight: BorderRight,
	BorderVertical: BorderVertical,
	Button: Button$4,
	CalendarViewDay: CalendarViewDay,
	CheckCircleOutline: CheckCircleOutline,
	Collections: Collections,
	Crop169: Crop169,
	Crop32: Crop32,
	CropFree: CropFree,
	Delete: Delete,
	DynamicFeed: DynamicFeed,
	Equalizer: Equalizer,
	Filter: Filter,
	Filter1: Filter1,
	Filter2: Filter2,
	Filter3: Filter3,
	Filter4: Filter4,
	Filter5: Filter5,
	Filter6: Filter6,
	Filter7: Filter7,
	Filter8: Filter8,
	Filter9: Filter9,
	FilterNone: FilterNone,
	HighlightOff: HighlightOff,
	KeyboardArrowDown: KeyboardArrowDown,
	KeyboardArrowLeft: KeyboardArrowLeft,
	KeyboardArrowRight: KeyboardArrowRight,
	KeyboardArrowUp: KeyboardArrowUp,
	KeyboardTab: KeyboardTab,
	Label: Label,
	Link: Link,
	LinkOff: LinkOff,
	Loop: Loop,
	MoreHorizontal: MoreHorizontal,
	PhotoResizeSelectLarge: PhotoResizeSelectLarge,
	PlayCircleOutline: PlayCircleOutline,
	PresentToAllTwoTone: PresentToAllTwoTone,
	ReadMore: ReadMore,
	QueuePlayNext: QueuePlayNext,
	SelectAll: SelectAll,
	Snooze: Snooze,
	Stars: Stars,
	Star: Star,
	StarOutline: StarOutline,
	SwapHoriz: SwapHoriz,
	SwapVert: SwapVert,
	TextFields: TextFields,
	Theaters: Theaters,
	UnfoldMore: UnfoldMore,
	VerticalAlignBottom: VerticalAlignBottom,
	VerticalAlignCenter: VerticalAlignCenter,
	VerticalAlignTop: VerticalAlignTop,
	VerticalSplit: VerticalSplit,
	ViewAgenda: ViewAgenda,
	ViewCarousel: ViewCarousel,
	ViewColumn: ViewColumn,
	ViewCompact: ViewCompact,
	WbIridescent: WbIridescent,
	Web: Web
});

components.Button;

var check$1 = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global$n =
  // eslint-disable-next-line es/no-global-this -- safe
  check$1(typeof globalThis == 'object' && globalThis) ||
  check$1(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check$1(typeof self == 'object' && self) ||
  check$1(typeof commonjsGlobal$1 == 'object' && commonjsGlobal$1) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

var objectGetOwnPropertyDescriptor$1 = {};

var fails$k = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var fails$j = fails$k;

// Detect IE8's incomplete defineProperty implementation
var descriptors$1 = !fails$j(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

var objectPropertyIsEnumerable$1 = {};

var $propertyIsEnumerable$1 = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor$2$1 = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG$1 = getOwnPropertyDescriptor$2$1 && !$propertyIsEnumerable$1.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
objectPropertyIsEnumerable$1.f = NASHORN_BUG$1 ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor$2$1(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable$1;

var createPropertyDescriptor$4 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var toString$3 = {}.toString;

var classofRaw$1$1 = function (it) {
  return toString$3.call(it).slice(8, -1);
};

var fails$i = fails$k;
var classof$7 = classofRaw$1$1;

var split$1 = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject$1 = fails$i(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof$7(it) == 'String' ? split$1.call(it, '') : Object(it);
} : Object;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible$7 = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings
var IndexedObject$2 = indexedObject$1;
var requireObjectCoercible$6 = requireObjectCoercible$7;

var toIndexedObject$8 = function (it) {
  return IndexedObject$2(requireObjectCoercible$6(it));
};

var isObject$e = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var isObject$d = isObject$e;

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var toPrimitive$4 = function (input, PREFERRED_STRING) {
  if (!isObject$d(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$d(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject$d(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$d(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var requireObjectCoercible$5$1 = requireObjectCoercible$7;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
var toObject$5 = function (argument) {
  return Object(requireObjectCoercible$5$1(argument));
};

var toObject$4$1 = toObject$5;

var hasOwnProperty$b = {}.hasOwnProperty;

var has$a = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty$b.call(toObject$4$1(it), key);
};

var global$m = global$n;
var isObject$c = isObject$e;

var document$3$1 = global$m.document;
// typeof document.createElement is 'object' in old IE
var EXISTS$1 = isObject$c(document$3$1) && isObject$c(document$3$1.createElement);

var documentCreateElement$1$1 = function (it) {
  return EXISTS$1 ? document$3$1.createElement(it) : {};
};

var DESCRIPTORS$e = descriptors$1;
var fails$h = fails$k;
var createElement$1$1 = documentCreateElement$1$1;

// Thank's IE8 for his funny defineProperty
var ie8DomDefine$1 = !DESCRIPTORS$e && !fails$h(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(createElement$1$1('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

var DESCRIPTORS$d = descriptors$1;
var propertyIsEnumerableModule$2 = objectPropertyIsEnumerable$1;
var createPropertyDescriptor$3 = createPropertyDescriptor$4;
var toIndexedObject$7 = toIndexedObject$8;
var toPrimitive$3 = toPrimitive$4;
var has$9 = has$a;
var IE8_DOM_DEFINE$1$1 = ie8DomDefine$1;

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
objectGetOwnPropertyDescriptor$1.f = DESCRIPTORS$d ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject$7(O);
  P = toPrimitive$3(P, true);
  if (IE8_DOM_DEFINE$1$1) try {
    return $getOwnPropertyDescriptor$1(O, P);
  } catch (error) { /* empty */ }
  if (has$9(O, P)) return createPropertyDescriptor$3(!propertyIsEnumerableModule$2.f.call(O, P), O[P]);
};

var objectDefineProperty$1 = {};

var isObject$b = isObject$e;

var anObject$f = function (it) {
  if (!isObject$b(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};

var DESCRIPTORS$c = descriptors$1;
var IE8_DOM_DEFINE$2 = ie8DomDefine$1;
var anObject$e = anObject$f;
var toPrimitive$2$1 = toPrimitive$4;

// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty$1 = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
objectDefineProperty$1.f = DESCRIPTORS$c ? $defineProperty$1 : function defineProperty(O, P, Attributes) {
  anObject$e(O);
  P = toPrimitive$2$1(P, true);
  anObject$e(Attributes);
  if (IE8_DOM_DEFINE$2) try {
    return $defineProperty$1(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var DESCRIPTORS$b = descriptors$1;
var definePropertyModule$6 = objectDefineProperty$1;
var createPropertyDescriptor$2$1 = createPropertyDescriptor$4;

var createNonEnumerableProperty$8 = DESCRIPTORS$b ? function (object, key, value) {
  return definePropertyModule$6.f(object, key, createPropertyDescriptor$2$1(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var redefine$8 = {exports: {}};

var global$l = global$n;
var createNonEnumerableProperty$7 = createNonEnumerableProperty$8;

var setGlobal$3$1 = function (key, value) {
  try {
    createNonEnumerableProperty$7(global$l, key, value);
  } catch (error) {
    global$l[key] = value;
  } return value;
};

var global$k = global$n;
var setGlobal$2$1 = setGlobal$3$1;

var SHARED$1 = '__core-js_shared__';
var store$3$1 = global$k[SHARED$1] || setGlobal$2$1(SHARED$1, {});

var sharedStore$1 = store$3$1;

var store$2$1 = sharedStore$1;

var functionToString$1 = Function.toString;

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store$2$1.inspectSource != 'function') {
  store$2$1.inspectSource = function (it) {
    return functionToString$1.call(it);
  };
}

var inspectSource$3$1 = store$2$1.inspectSource;

var global$j = global$n;
var inspectSource$2$1 = inspectSource$3$1;

var WeakMap$2 = global$j.WeakMap;

var nativeWeakMap$1 = typeof WeakMap$2 === 'function' && /native code/.test(inspectSource$2$1(WeakMap$2));

var shared$5 = {exports: {}};

var store$1$1 = sharedStore$1;

(shared$5.exports = function (key, value) {
  return store$1$1[key] || (store$1$1[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.15.2',
  mode: 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});

var id$1 = 0;
var postfix$1 = Math.random();

var uid$3 = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id$1 + postfix$1).toString(36);
};

var shared$4$1 = shared$5.exports;
var uid$2$1 = uid$3;

var keys$2 = shared$4$1('keys');

var sharedKey$3 = function (key) {
  return keys$2[key] || (keys$2[key] = uid$2$1(key));
};

var hiddenKeys$5 = {};

var NATIVE_WEAK_MAP$1 = nativeWeakMap$1;
var global$i$1 = global$n;
var isObject$a = isObject$e;
var createNonEnumerableProperty$6 = createNonEnumerableProperty$8;
var objectHas$1 = has$a;
var shared$3$1 = sharedStore$1;
var sharedKey$2$1 = sharedKey$3;
var hiddenKeys$4$1 = hiddenKeys$5;

var OBJECT_ALREADY_INITIALIZED$1 = 'Object already initialized';
var WeakMap$1$1 = global$i$1.WeakMap;
var set$1$1, get$1, has$8;

var enforce$1 = function (it) {
  return has$8(it) ? get$1(it) : set$1$1(it, {});
};

var getterFor$1 = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject$a(it) || (state = get$1(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP$1 || shared$3$1.state) {
  var store$4 = shared$3$1.state || (shared$3$1.state = new WeakMap$1$1());
  var wmget$1 = store$4.get;
  var wmhas$1 = store$4.has;
  var wmset$1 = store$4.set;
  set$1$1 = function (it, metadata) {
    if (wmhas$1.call(store$4, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED$1);
    metadata.facade = it;
    wmset$1.call(store$4, it, metadata);
    return metadata;
  };
  get$1 = function (it) {
    return wmget$1.call(store$4, it) || {};
  };
  has$8 = function (it) {
    return wmhas$1.call(store$4, it);
  };
} else {
  var STATE$1 = sharedKey$2$1('state');
  hiddenKeys$4$1[STATE$1] = true;
  set$1$1 = function (it, metadata) {
    if (objectHas$1(it, STATE$1)) throw new TypeError(OBJECT_ALREADY_INITIALIZED$1);
    metadata.facade = it;
    createNonEnumerableProperty$6(it, STATE$1, metadata);
    return metadata;
  };
  get$1 = function (it) {
    return objectHas$1(it, STATE$1) ? it[STATE$1] : {};
  };
  has$8 = function (it) {
    return objectHas$1(it, STATE$1);
  };
}

var internalState$1 = {
  set: set$1$1,
  get: get$1,
  has: has$8,
  enforce: enforce$1,
  getterFor: getterFor$1
};

var global$h$1 = global$n;
var createNonEnumerableProperty$5$1 = createNonEnumerableProperty$8;
var has$7$1 = has$a;
var setGlobal$1$1 = setGlobal$3$1;
var inspectSource$1$1 = inspectSource$3$1;
var InternalStateModule$2 = internalState$1;

var getInternalState$3 = InternalStateModule$2.get;
var enforceInternalState$1 = InternalStateModule$2.enforce;
var TEMPLATE$1 = String(String).split('String');

(redefine$8.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var state;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has$7$1(value, 'name')) {
      createNonEnumerableProperty$5$1(value, 'name', key);
    }
    state = enforceInternalState$1(value);
    if (!state.source) {
      state.source = TEMPLATE$1.join(typeof key == 'string' ? key : '');
    }
  }
  if (O === global$h$1) {
    if (simple) O[key] = value;
    else setGlobal$1$1(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty$5$1(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState$3(this).source || inspectSource$1$1(this);
});

var global$g$1 = global$n;

var path$2 = global$g$1;

var path$1$1 = path$2;
var global$f$1 = global$n;

var aFunction$7 = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

var getBuiltIn$7 = function (namespace, method) {
  return arguments.length < 2 ? aFunction$7(path$1$1[namespace]) || aFunction$7(global$f$1[namespace])
    : path$1$1[namespace] && path$1$1[namespace][method] || global$f$1[namespace] && global$f$1[namespace][method];
};

var objectGetOwnPropertyNames$1 = {};

var ceil$1 = Math.ceil;
var floor$2 = Math.floor;

// `ToInteger` abstract operation
// https://tc39.es/ecma262/#sec-tointeger
var toInteger$4$1 = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor$2 : ceil$1)(argument);
};

var toInteger$3$1 = toInteger$4$1;

var min$1$1 = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
var toLength$4$1 = function (argument) {
  return argument > 0 ? min$1$1(toInteger$3$1(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var toInteger$2$1 = toInteger$4$1;

var max$2 = Math.max;
var min$3 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex$1$1 = function (index, length) {
  var integer = toInteger$2$1(index);
  return integer < 0 ? max$2(integer + length, 0) : min$3(integer, length);
};

var toIndexedObject$6 = toIndexedObject$8;
var toLength$3$1 = toLength$4$1;
var toAbsoluteIndex$2 = toAbsoluteIndex$1$1;

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod$4 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$6($this);
    var length = toLength$3$1(O.length);
    var index = toAbsoluteIndex$2(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIncludes$1 = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod$4(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod$4(false)
};

var has$6$1 = has$a;
var toIndexedObject$5 = toIndexedObject$8;
var indexOf$1 = arrayIncludes$1.indexOf;
var hiddenKeys$3$1 = hiddenKeys$5;

var objectKeysInternal$1 = function (object, names) {
  var O = toIndexedObject$5(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has$6$1(hiddenKeys$3$1, key) && has$6$1(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has$6$1(O, key = names[i++])) {
    ~indexOf$1(result, key) || result.push(key);
  }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys$3$1 = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

var internalObjectKeys$1$1 = objectKeysInternal$1;
var enumBugKeys$2$1 = enumBugKeys$3$1;

var hiddenKeys$2$1 = enumBugKeys$2$1.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
objectGetOwnPropertyNames$1.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys$1$1(O, hiddenKeys$2$1);
};

var objectGetOwnPropertySymbols$1 = {};

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
objectGetOwnPropertySymbols$1.f = Object.getOwnPropertySymbols;

var getBuiltIn$6 = getBuiltIn$7;
var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames$1;
var getOwnPropertySymbolsModule$2 = objectGetOwnPropertySymbols$1;
var anObject$d = anObject$f;

// all object keys, includes non-enumerable and symbols
var ownKeys$3 = getBuiltIn$6('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule$1.f(anObject$d(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule$2.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

var has$5$1 = has$a;
var ownKeys$2 = ownKeys$3;
var getOwnPropertyDescriptorModule$2 = objectGetOwnPropertyDescriptor$1;
var definePropertyModule$5 = objectDefineProperty$1;

var copyConstructorProperties$1$1 = function (target, source) {
  var keys = ownKeys$2(source);
  var defineProperty = definePropertyModule$5.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule$2.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has$5$1(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

var fails$g = fails$k;

var replacement$1 = /#|\.prototype\./;

var isForced$3 = function (feature, detection) {
  var value = data$1[normalize$1(feature)];
  return value == POLYFILL$1 ? true
    : value == NATIVE$1 ? false
    : typeof detection == 'function' ? fails$g(detection)
    : !!detection;
};

var normalize$1 = isForced$3.normalize = function (string) {
  return String(string).replace(replacement$1, '.').toLowerCase();
};

var data$1 = isForced$3.data = {};
var NATIVE$1 = isForced$3.NATIVE = 'N';
var POLYFILL$1 = isForced$3.POLYFILL = 'P';

var isForced_1$1 = isForced$3;

var global$e$1 = global$n;
var getOwnPropertyDescriptor$1$1 = objectGetOwnPropertyDescriptor$1.f;
var createNonEnumerableProperty$4$1 = createNonEnumerableProperty$8;
var redefine$7 = redefine$8.exports;
var setGlobal$4 = setGlobal$3$1;
var copyConstructorProperties$2 = copyConstructorProperties$1$1;
var isForced$2$1 = isForced_1$1;

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
var _export$1 = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global$e$1;
  } else if (STATIC) {
    target = global$e$1[TARGET] || setGlobal$4(TARGET, {});
  } else {
    target = (global$e$1[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor$1$1(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced$2$1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties$2(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty$4$1(sourceProperty, 'sham', true);
    }
    // extend global
    redefine$7(target, key, sourceProperty, options);
  }
};

var classof$6$1 = classofRaw$1$1;

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
var isArray$4 = Array.isArray || function isArray(arg) {
  return classof$6$1(arg) == 'Array';
};

var $$j = _export$1;
var isArray$3 = isArray$4;

// `Array.isArray` method
// https://tc39.es/ecma262/#sec-array.isarray
$$j({ target: 'Array', stat: true }, {
  isArray: isArray$3
});

var aFunction$6 = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};

var aFunction$5$1 = aFunction$6;

// optional / simple context binding
var functionBindContext$1 = function (fn, that, length) {
  aFunction$5$1(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var getBuiltIn$5$1 = getBuiltIn$7;

var engineUserAgent$1 = getBuiltIn$5$1('navigator', 'userAgent') || '';

var global$d$1 = global$n;
var userAgent$4 = engineUserAgent$1;

var process$4$1 = global$d$1.process;
var versions$1 = process$4$1 && process$4$1.versions;
var v8$1 = versions$1 && versions$1.v8;
var match$1, version$1;

if (v8$1) {
  match$1 = v8$1.split('.');
  version$1 = match$1[0] < 4 ? 1 : match$1[0] + match$1[1];
} else if (userAgent$4) {
  match$1 = userAgent$4.match(/Edge\/(\d+)/);
  if (!match$1 || match$1[1] >= 74) {
    match$1 = userAgent$4.match(/Chrome\/(\d+)/);
    if (match$1) version$1 = match$1[1];
  }
}

var engineV8Version$1 = version$1 && +version$1;

/* eslint-disable es/no-symbol -- required for testing */

var V8_VERSION$2$1 = engineV8Version$1;
var fails$f = fails$k;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
var nativeSymbol$1 = !!Object.getOwnPropertySymbols && !fails$f(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION$2$1 && V8_VERSION$2$1 < 41;
});

/* eslint-disable es/no-symbol -- required for testing */

var NATIVE_SYMBOL$2 = nativeSymbol$1;

var useSymbolAsUid$1 = NATIVE_SYMBOL$2
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';

var global$c$1 = global$n;
var shared$2$1 = shared$5.exports;
var has$4$1 = has$a;
var uid$1$1 = uid$3;
var NATIVE_SYMBOL$1$1 = nativeSymbol$1;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid$1;

var WellKnownSymbolsStore$1 = shared$2$1('wks');
var Symbol$2$1 = global$c$1.Symbol;
var createWellKnownSymbol$1 = USE_SYMBOL_AS_UID$1 ? Symbol$2$1 : Symbol$2$1 && Symbol$2$1.withoutSetter || uid$1$1;

var wellKnownSymbol$h = function (name) {
  if (!has$4$1(WellKnownSymbolsStore$1, name) || !(NATIVE_SYMBOL$1$1 || typeof WellKnownSymbolsStore$1[name] == 'string')) {
    if (NATIVE_SYMBOL$1$1 && has$4$1(Symbol$2$1, name)) {
      WellKnownSymbolsStore$1[name] = Symbol$2$1[name];
    } else {
      WellKnownSymbolsStore$1[name] = createWellKnownSymbol$1('Symbol.' + name);
    }
  } return WellKnownSymbolsStore$1[name];
};

var isObject$9$1 = isObject$e;
var isArray$2 = isArray$4;
var wellKnownSymbol$g = wellKnownSymbol$h;

var SPECIES$5$1 = wellKnownSymbol$g('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
var arraySpeciesCreate$1$1 = function (originalArray, length) {
  var C;
  if (isArray$2(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray$2(C.prototype))) C = undefined;
    else if (isObject$9$1(C)) {
      C = C[SPECIES$5$1];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};

var bind$5 = functionBindContext$1;
var IndexedObject$1$1 = indexedObject$1;
var toObject$3$1 = toObject$5;
var toLength$2$1 = toLength$4$1;
var arraySpeciesCreate$2 = arraySpeciesCreate$1$1;

var push$1 = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation
var createMethod$3 = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_OUT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject$3$1($this);
    var self = IndexedObject$1$1(O);
    var boundFunction = bind$5(callbackfn, that, 3);
    var length = toLength$2$1(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate$2;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push$1.call(target, value); // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push$1.call(target, value); // filterOut
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

var arrayIteration$1 = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod$3(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod$3(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod$3(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod$3(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod$3(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod$3(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod$3(6),
  // `Array.prototype.filterOut` method
  // https://github.com/tc39/proposal-array-filtering
  filterOut: createMethod$3(7)
};

var fails$e = fails$k;
var wellKnownSymbol$f = wellKnownSymbol$h;
var V8_VERSION$1$1 = engineV8Version$1;

var SPECIES$4$1 = wellKnownSymbol$f('species');

var arrayMethodHasSpeciesSupport$2 = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION$1$1 >= 51 || !fails$e(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES$4$1] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

var $$i = _export$1;
var $map$1 = arrayIteration$1.map;
var arrayMethodHasSpeciesSupport$1$1 = arrayMethodHasSpeciesSupport$2;

var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$1$1('map');

// `Array.prototype.map` method
// https://tc39.es/ecma262/#sec-array.prototype.map
// with adding support of @@species
$$i({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject$8$1(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/** Detect free variable `global` from Node.js. */
var freeGlobal$1 = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf$1 = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root$1 = freeGlobal$1 || freeSelf$1 || Function('return this')();

/** Built-in value references. */
var Symbol$1$1 = root$1.Symbol;

/** Used for built-in method references. */
var objectProto$d = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$a = objectProto$d.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1$1 = objectProto$d.toString;

/** Built-in value references. */
var symToStringTag$1$1 = Symbol$1$1 ? Symbol$1$1.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag$1(value) {
  var isOwn = hasOwnProperty$a.call(value, symToStringTag$1$1),
      tag = value[symToStringTag$1$1];

  try {
    value[symToStringTag$1$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString$1$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1$1] = tag;
    } else {
      delete value[symToStringTag$1$1];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$c = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$2 = objectProto$c.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString$1$1(value) {
  return nativeObjectToString$2.call(value);
}

/** `Object#toString` result references. */
var nullTag$1 = '[object Null]',
    undefinedTag$1 = '[object Undefined]';

/** Built-in value references. */
var symToStringTag$2 = Symbol$1$1 ? Symbol$1$1.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag$1(value) {
  if (value == null) {
    return value === undefined ? undefinedTag$1 : nullTag$1;
  }
  return (symToStringTag$2 && symToStringTag$2 in Object(value))
    ? getRawTag$1(value)
    : objectToString$1$1(value);
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike$1(value) {
  return value != null && typeof value == 'object';
}

/** `Object#toString` result references. */
var symbolTag$1 = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol$1(value) {
  return typeof value == 'symbol' ||
    (isObjectLike$1(value) && baseGetTag$1(value) == symbolTag$1);
}

components.TextControl;
i18n.__;

components.TextareaControl;
    components.TextControl;
i18n.__;

var requireObjectCoercible$4$1 = requireObjectCoercible$7;

var quot = /"/g;

// `CreateHTML` abstract operation
// https://tc39.es/ecma262/#sec-createhtml
var createHtml = function (string, tag, attribute, value) {
  var S = String(requireObjectCoercible$4$1(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};

var fails$d$1 = fails$k;

// check the existence of a method, lowercase
// of a tag and escaping quotes in arguments
var stringHtmlForced = function (METHOD_NAME) {
  return fails$d$1(function () {
    var test = ''[METHOD_NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  });
};

var $$h = _export$1;
var createHTML = createHtml;
var forcedStringHTMLMethod = stringHtmlForced;

// `String.prototype.small` method
// https://tc39.es/ecma262/#sec-string.prototype.small
$$h({ target: 'String', proto: true, forced: forcedStringHTMLMethod('small') }, {
  small: function small() {
    return createHTML(this, 'small', '', '');
  }
});

/*!
 * Font Awesome Free 5.15.3 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 */

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var noop = function noop() {};

var _WINDOW = {};
var _DOCUMENT = {};
var _MUTATION_OBSERVER = null;
var _PERFORMANCE = {
  mark: noop,
  measure: noop
};

try {
  if (typeof window !== 'undefined') _WINDOW = window;
  if (typeof document !== 'undefined') _DOCUMENT = document;
  if (typeof MutationObserver !== 'undefined') _MUTATION_OBSERVER = MutationObserver;
  if (typeof performance !== 'undefined') _PERFORMANCE = performance;
} catch (e) {}

var _ref = _WINDOW.navigator || {},
    _ref$userAgent = _ref.userAgent,
    userAgent$3 = _ref$userAgent === void 0 ? '' : _ref$userAgent;

var WINDOW = _WINDOW;
var DOCUMENT = _DOCUMENT;
var PERFORMANCE = _PERFORMANCE;
!!WINDOW.document;
var IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && typeof DOCUMENT.addEventListener === 'function' && typeof DOCUMENT.createElement === 'function';
~userAgent$3.indexOf('MSIE') || ~userAgent$3.indexOf('Trident/');

var NAMESPACE_IDENTIFIER = '___FONT_AWESOME___';
var DEFAULT_FAMILY_PREFIX = 'fa';
var DEFAULT_REPLACEMENT_CLASS = 'svg-inline--fa';
(function () {
  try {
    return process.env.NODE_ENV === 'production';
  } catch (e) {
    return false;
  }
})();

var initial = WINDOW.FontAwesomeConfig || {};

function getAttrConfig(attr) {
  var element = DOCUMENT.querySelector('script[' + attr + ']');

  if (element) {
    return element.getAttribute(attr);
  }
}

function coerce(val) {
  // Getting an empty string will occur if the attribute is set on the HTML tag but without a value
  // We'll assume that this is an indication that it should be toggled to true
  // For example <script data-search-pseudo-elements src="..."></script>
  if (val === '') return true;
  if (val === 'false') return false;
  if (val === 'true') return true;
  return val;
}

if (DOCUMENT && typeof DOCUMENT.querySelector === 'function') {
  var attrs = [['data-family-prefix', 'familyPrefix'], ['data-replacement-class', 'replacementClass'], ['data-auto-replace-svg', 'autoReplaceSvg'], ['data-auto-add-css', 'autoAddCss'], ['data-auto-a11y', 'autoA11y'], ['data-search-pseudo-elements', 'searchPseudoElements'], ['data-observe-mutations', 'observeMutations'], ['data-mutate-approach', 'mutateApproach'], ['data-keep-original-source', 'keepOriginalSource'], ['data-measure-performance', 'measurePerformance'], ['data-show-missing-icons', 'showMissingIcons']];
  attrs.forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        attr = _ref2[0],
        key = _ref2[1];

    var val = coerce(getAttrConfig(attr));

    if (val !== undefined && val !== null) {
      initial[key] = val;
    }
  });
}

var _default = {
  familyPrefix: DEFAULT_FAMILY_PREFIX,
  replacementClass: DEFAULT_REPLACEMENT_CLASS,
  autoReplaceSvg: true,
  autoAddCss: true,
  autoA11y: true,
  searchPseudoElements: false,
  observeMutations: true,
  mutateApproach: 'async',
  keepOriginalSource: true,
  measurePerformance: false,
  showMissingIcons: true
};

var _config = _objectSpread$1({}, _default, initial);

if (!_config.autoReplaceSvg) _config.observeMutations = false;

var config = _objectSpread$1({}, _config);

WINDOW.FontAwesomeConfig = config;

var w = WINDOW || {};
if (!w[NAMESPACE_IDENTIFIER]) w[NAMESPACE_IDENTIFIER] = {};
if (!w[NAMESPACE_IDENTIFIER].styles) w[NAMESPACE_IDENTIFIER].styles = {};
if (!w[NAMESPACE_IDENTIFIER].hooks) w[NAMESPACE_IDENTIFIER].hooks = {};
if (!w[NAMESPACE_IDENTIFIER].shims) w[NAMESPACE_IDENTIFIER].shims = [];
var namespace = w[NAMESPACE_IDENTIFIER];

var functions = [];

var listener$1 = function listener() {
  DOCUMENT.removeEventListener('DOMContentLoaded', listener);
  loaded = 1;
  functions.map(function (fn) {
    return fn();
  });
};

var loaded = false;

if (IS_DOM) {
  loaded = (DOCUMENT.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(DOCUMENT.readyState);
  if (!loaded) DOCUMENT.addEventListener('DOMContentLoaded', listener$1);
}

typeof global !== 'undefined' && typeof global.process !== 'undefined' && typeof global.process.emit === 'function';
typeof setImmediate === 'undefined' ? setTimeout : setImmediate;

var noop$1 = function noop() {};

config.measurePerformance && PERFORMANCE && PERFORMANCE.mark && PERFORMANCE.measure ? PERFORMANCE : {
  mark: noop$1,
  measure: noop$1
};

/**
 * Internal helper to bind a function known to have 4 arguments
 * to a given context.
 */

var bindInternal4 = function bindInternal4(func, thisContext) {
  return function (a, b, c, d) {
    return func.call(thisContext, a, b, c, d);
  };
};

/**
 * # Reduce
 *
 * A fast object `.reduce()` implementation.
 *
 * @param  {Object}   subject      The object to reduce over.
 * @param  {Function} fn           The reducer function.
 * @param  {mixed}    initialValue The initial value for the reducer, defaults to subject[0].
 * @param  {Object}   thisContext  The context for the reducer.
 * @return {mixed}                 The final result.
 */


var reduce = function fastReduceObject(subject, fn, initialValue, thisContext) {
  var keys = Object.keys(subject),
      length = keys.length,
      iterator = thisContext !== undefined ? bindInternal4(fn, thisContext) : fn,
      i,
      key,
      result;

  if (initialValue === undefined) {
    i = 1;
    result = subject[keys[0]];
  } else {
    i = 0;
    result = initialValue;
  }

  for (; i < length; i++) {
    key = keys[i];
    result = iterator(result, subject[key], key, subject);
  }

  return result;
};

function defineIcons(prefix, icons) {
  var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var _params$skipHooks = params.skipHooks,
      skipHooks = _params$skipHooks === void 0 ? false : _params$skipHooks;
  var normalized = Object.keys(icons).reduce(function (acc, iconName) {
    var icon = icons[iconName];
    var expanded = !!icon.icon;

    if (expanded) {
      acc[icon.iconName] = icon.icon;
    } else {
      acc[iconName] = icon;
    }

    return acc;
  }, {});

  if (typeof namespace.hooks.addPack === 'function' && !skipHooks) {
    namespace.hooks.addPack(prefix, normalized);
  } else {
    namespace.styles[prefix] = _objectSpread$1({}, namespace.styles[prefix] || {}, normalized);
  }
  /**
   * Font Awesome 4 used the prefix of `fa` for all icons. With the introduction
   * of new styles we needed to differentiate between them. Prefix `fa` is now an alias
   * for `fas` so we'll easy the upgrade process for our users by automatically defining
   * this as well.
   */


  if (prefix === 'fas') {
    defineIcons('fa', icons);
  }
}

var styles = namespace.styles,
    shims = namespace.shims;
var build = function build() {
  var lookup = function lookup(reducer) {
    return reduce(styles, function (o, style, prefix) {
      o[prefix] = reduce(style, reducer, {});
      return o;
    }, {});
  };

  lookup(function (acc, icon, iconName) {
    if (icon[3]) {
      acc[icon[3]] = iconName;
    }

    return acc;
  });
  lookup(function (acc, icon, iconName) {
    var ligatures = icon[2];
    acc[iconName] = iconName;
    ligatures.forEach(function (ligature) {
      acc[ligature] = iconName;
    });
    return acc;
  });
  var hasRegular = 'far' in styles;
  reduce(shims, function (acc, shim) {
    var oldName = shim[0];
    var prefix = shim[1];
    var iconName = shim[2];

    if (prefix === 'far' && !hasRegular) {
      prefix = 'fas';
    }

    acc[oldName] = {
      prefix: prefix,
      iconName: iconName
    };
    return acc;
  }, {});
};
build();

namespace.styles;

function MissingIcon(error) {
  this.name = 'MissingIcon';
  this.message = error || 'Icon unavailable';
  this.stack = new Error().stack;
}
MissingIcon.prototype = Object.create(Error.prototype);
MissingIcon.prototype.constructor = MissingIcon;

var FILL = {
  fill: 'currentColor'
};
var ANIMATION_BASE = {
  attributeType: 'XML',
  repeatCount: 'indefinite',
  dur: '2s'
};
({
  tag: 'path',
  attributes: _objectSpread$1({}, FILL, {
    d: 'M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z'
  })
});

var OPACITY_ANIMATE = _objectSpread$1({}, ANIMATION_BASE, {
  attributeName: 'opacity'
});

({
  tag: 'circle',
  attributes: _objectSpread$1({}, FILL, {
    cx: '256',
    cy: '364',
    r: '28'
  }),
  children: [{
    tag: 'animate',
    attributes: _objectSpread$1({}, ANIMATION_BASE, {
      attributeName: 'r',
      values: '28;14;28;28;14;28;'
    })
  }, {
    tag: 'animate',
    attributes: _objectSpread$1({}, OPACITY_ANIMATE, {
      values: '1;0;1;1;0;1;'
    })
  }]
});
({
  tag: 'path',
  attributes: _objectSpread$1({}, FILL, {
    opacity: '1',
    d: 'M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z'
  }),
  children: [{
    tag: 'animate',
    attributes: _objectSpread$1({}, OPACITY_ANIMATE, {
      values: '1;0;0;0;0;1;'
    })
  }]
});
({
  tag: 'path',
  attributes: _objectSpread$1({}, FILL, {
    opacity: '0',
    d: 'M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z'
  }),
  children: [{
    tag: 'animate',
    attributes: _objectSpread$1({}, OPACITY_ANIMATE, {
      values: '0;0;1;1;0;0;'
    })
  }]
});

namespace.styles;

namespace.styles;

var Library =
/*#__PURE__*/
function () {
  function Library() {
    _classCallCheck(this, Library);

    this.definitions = {};
  }

  _createClass(Library, [{
    key: "add",
    value: function add() {
      var _this = this;

      for (var _len = arguments.length, definitions = new Array(_len), _key = 0; _key < _len; _key++) {
        definitions[_key] = arguments[_key];
      }

      var additions = definitions.reduce(this._pullDefinitions, {});
      Object.keys(additions).forEach(function (key) {
        _this.definitions[key] = _objectSpread$1({}, _this.definitions[key] || {}, additions[key]);
        defineIcons(key, additions[key]);
        build();
      });
    }
  }, {
    key: "reset",
    value: function reset() {
      this.definitions = {};
    }
  }, {
    key: "_pullDefinitions",
    value: function _pullDefinitions(additions, definition) {
      var normalized = definition.prefix && definition.iconName && definition.icon ? {
        0: definition
      } : definition;
      Object.keys(normalized).map(function (key) {
        var _normalized$key = normalized[key],
            prefix = _normalized$key.prefix,
            iconName = _normalized$key.iconName,
            icon = _normalized$key.icon;
        if (!additions[prefix]) additions[prefix] = {};
        additions[prefix][iconName] = icon;
      });
      return additions;
    }
  }]);

  return Library;
}();

new Library();

var faCog$1 = {};

(function (exports) {
Object.defineProperty(exports, '__esModule', { value: true });
var prefix = 'fas';
var iconName = 'cog';
var width = 512;
var height = 512;
var ligatures = [];
var unicode = 'f013';
var svgPathData = 'M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z';

exports.definition = {
  prefix: prefix,
  iconName: iconName,
  icon: [
    width,
    height,
    ligatures,
    unicode,
    svgPathData
  ]};

exports.faCog = exports.definition;
exports.prefix = prefix;
exports.iconName = iconName;
exports.width = width;
exports.height = height;
exports.ligatures = ligatures;
exports.unicode = unicode;
exports.svgPathData = svgPathData;
}(faCog$1));

components.Button;

var internalObjectKeys$2 = objectKeysInternal$1;
var enumBugKeys$1$1 = enumBugKeys$3$1;

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
var objectKeys$4 = Object.keys || function keys(O) {
  return internalObjectKeys$2(O, enumBugKeys$1$1);
};

var DESCRIPTORS$a = descriptors$1;
var definePropertyModule$4 = objectDefineProperty$1;
var anObject$c$1 = anObject$f;
var objectKeys$3 = objectKeys$4;

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
var objectDefineProperties$1 = DESCRIPTORS$a ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject$c$1(O);
  var keys = objectKeys$3(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule$4.f(O, key = keys[index++], Properties[key]);
  return O;
};

var getBuiltIn$4$1 = getBuiltIn$7;

var html$2$1 = getBuiltIn$4$1('document', 'documentElement');

var anObject$b$1 = anObject$f;
var defineProperties$1 = objectDefineProperties$1;
var enumBugKeys$4 = enumBugKeys$3$1;
var hiddenKeys$1$1 = hiddenKeys$5;
var html$1$1 = html$2$1;
var documentCreateElement$2 = documentCreateElement$1$1;
var sharedKey$1$1 = sharedKey$3;

var GT$1 = '>';
var LT$1 = '<';
var PROTOTYPE$1 = 'prototype';
var SCRIPT$1 = 'script';
var IE_PROTO$1 = sharedKey$1$1('IE_PROTO');

var EmptyConstructor$1 = function () { /* empty */ };

var scriptTag$1 = function (content) {
  return LT$1 + SCRIPT$1 + GT$1 + content + LT$1 + '/' + SCRIPT$1 + GT$1;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX$1 = function (activeXDocument) {
  activeXDocument.write(scriptTag$1(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame$1 = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement$2('iframe');
  var JS = 'java' + SCRIPT$1 + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html$1$1.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag$1('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument$1;
var NullProtoObject$1 = function () {
  try {
    /* global ActiveXObject -- old IE */
    activeXDocument$1 = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject$1 = activeXDocument$1 ? NullProtoObjectViaActiveX$1(activeXDocument$1) : NullProtoObjectViaIFrame$1();
  var length = enumBugKeys$4.length;
  while (length--) delete NullProtoObject$1[PROTOTYPE$1][enumBugKeys$4[length]];
  return NullProtoObject$1();
};

hiddenKeys$1$1[IE_PROTO$1] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
var objectCreate$1 = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor$1[PROTOTYPE$1] = anObject$b$1(O);
    result = new EmptyConstructor$1();
    EmptyConstructor$1[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = NullProtoObject$1();
  return Properties === undefined ? result : defineProperties$1(result, Properties);
};

var aFunction$4$1 = aFunction$6;
var isObject$7$1 = isObject$e;

var slice$1 = [].slice;
var factories = {};

var construct = function (C, argsLength, args) {
  if (!(argsLength in factories)) {
    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func -- we have no proper alternatives, IE8- only
    factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
  } return factories[argsLength](C, args);
};

// `Function.prototype.bind` method implementation
// https://tc39.es/ecma262/#sec-function.prototype.bind
var functionBind = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction$4$1(this);
  var partArgs = slice$1.call(arguments, 1);
  var boundFunction = function bound(/* args... */) {
    var args = partArgs.concat(slice$1.call(arguments));
    return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
  };
  if (isObject$7$1(fn.prototype)) boundFunction.prototype = fn.prototype;
  return boundFunction;
};

var $$g = _export$1;
var getBuiltIn$3$1 = getBuiltIn$7;
var aFunction$3$1 = aFunction$6;
var anObject$a$1 = anObject$f;
var isObject$6$1 = isObject$e;
var create$2 = objectCreate$1;
var bind$4 = functionBind;
var fails$c$1 = fails$k;

var nativeConstruct = getBuiltIn$3$1('Reflect', 'construct');

// `Reflect.construct` method
// https://tc39.es/ecma262/#sec-reflect.construct
// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails$c$1(function () {
  function F() { /* empty */ }
  return !(nativeConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails$c$1(function () {
  nativeConstruct(function () { /* empty */ });
});
var FORCED$3 = NEW_TARGET_BUG || ARGS_BUG;

$$g({ target: 'Reflect', stat: true, forced: FORCED$3, sham: FORCED$3 }, {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction$3$1(Target);
    anObject$a$1(args);
    var newTarget = arguments.length < 3 ? Target : aFunction$3$1(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind$4.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create$2(isObject$6$1(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject$6$1(result) ? result : instance;
  }
});

var $$f = _export$1;
var bind$3$1 = functionBind;

// `Function.prototype.bind` method
// https://tc39.es/ecma262/#sec-function.prototype.bind
$$f({ target: 'Function', proto: true }, {
  bind: bind$3$1
});

var $$e = _export$1;
var global$b$1 = global$n;
var userAgent$2$1 = engineUserAgent$1;

var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent$2$1); // <- dirty ie9- check

var wrap$1 = function (scheduler) {
  return function (handler, timeout /* , ...arguments */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : undefined;
    return scheduler(boundArgs ? function () {
      // eslint-disable-next-line no-new-func -- spec requirement
      (typeof handler == 'function' ? handler : Function(handler)).apply(this, args);
    } : handler, timeout);
  };
};

// ie9- setTimeout & setInterval additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
$$e({ global: true, bind: true, forced: MSIE }, {
  // `setTimeout` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
  setTimeout: wrap$1(global$b$1.setTimeout),
  // `setInterval` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
  setInterval: wrap$1(global$b$1.setInterval)
});

var isObject$5$1 = isObject$e;

var aPossiblePrototype$1$1 = function (it) {
  if (!isObject$5$1(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};

/* eslint-disable no-proto -- safe */

var anObject$9$1 = anObject$f;
var aPossiblePrototype$2 = aPossiblePrototype$1$1;

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
var objectSetPrototypeOf$1 = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject$9$1(O);
    aPossiblePrototype$2(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

var isObject$4$1 = isObject$e;
var setPrototypeOf$1 = objectSetPrototypeOf$1;

// makes subclassing work correct for wrapped built-ins
var inheritIfRequired$1 = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf$1 &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject$4$1(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf$1($this, NewTargetPrototype);
  return $this;
};

var isObject$3$1 = isObject$e;
var classof$5$1 = classofRaw$1$1;
var wellKnownSymbol$e = wellKnownSymbol$h;

var MATCH$1 = wellKnownSymbol$e('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
var isRegexp = function (it) {
  var isRegExp;
  return isObject$3$1(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classof$5$1(it) == 'RegExp');
};

var anObject$8$1 = anObject$f;

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
var regexpFlags$1$1 = function () {
  var that = anObject$8$1(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

var regexpStickyHelpers$1 = {};

var fails$b$1 = fails$k;

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
var RE$1 = function (s, f) {
  return RegExp(s, f);
};

regexpStickyHelpers$1.UNSUPPORTED_Y = fails$b$1(function () {
  var re = RE$1('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

regexpStickyHelpers$1.BROKEN_CARET = fails$b$1(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE$1('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});

var getBuiltIn$2$1 = getBuiltIn$7;
var definePropertyModule$3$1 = objectDefineProperty$1;
var wellKnownSymbol$d$1 = wellKnownSymbol$h;
var DESCRIPTORS$9 = descriptors$1;

var SPECIES$3$1 = wellKnownSymbol$d$1('species');

var setSpecies$2 = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn$2$1(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule$3$1.f;

  if (DESCRIPTORS$9 && Constructor && !Constructor[SPECIES$3$1]) {
    defineProperty(Constructor, SPECIES$3$1, {
      configurable: true,
      get: function () { return this; }
    });
  }
};

var fails$a$1 = fails$k;

var regexpUnsupportedDotAll$1 = fails$a$1(function () {
  // babel-minify transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
  var re = RegExp('.', (typeof '').charAt(0));
  return !(re.dotAll && re.exec('\n') && re.flags === 's');
});

var fails$9$1 = fails$k;

var regexpUnsupportedNcg$1 = fails$9$1(function () {
  // babel-minify transpiles RegExp('.', 'g') -> /./g and it causes SyntaxError
  var re = RegExp('(?<a>b)', (typeof '').charAt(5));
  return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc';
});

var DESCRIPTORS$8 = descriptors$1;
var global$a$1 = global$n;
var isForced$1$1 = isForced_1$1;
var inheritIfRequired = inheritIfRequired$1;
var createNonEnumerableProperty$3$1 = createNonEnumerableProperty$8;
var defineProperty$5 = objectDefineProperty$1.f;
var getOwnPropertyNames = objectGetOwnPropertyNames$1.f;
var isRegExp$1 = isRegexp;
var getFlags = regexpFlags$1$1;
var stickyHelpers$1 = regexpStickyHelpers$1;
var redefine$6 = redefine$8.exports;
var fails$8$1 = fails$k;
var has$3$1 = has$a;
var enforceInternalState$2 = internalState$1.enforce;
var setSpecies$1$1 = setSpecies$2;
var wellKnownSymbol$c$1 = wellKnownSymbol$h;
var UNSUPPORTED_DOT_ALL$1 = regexpUnsupportedDotAll$1;
var UNSUPPORTED_NCG$1 = regexpUnsupportedNcg$1;

var MATCH = wellKnownSymbol$c$1('match');
var NativeRegExp = global$a$1.RegExp;
var RegExpPrototype$2 = NativeRegExp.prototype;
// TODO: Use only propper RegExpIdentifierName
var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
var re1 = /a/g;
var re2 = /a/g;

// "new" should create a new object, old webkit bug
var CORRECT_NEW = new NativeRegExp(re1) !== re1;

var UNSUPPORTED_Y$1 = stickyHelpers$1.UNSUPPORTED_Y;

var BASE_FORCED = DESCRIPTORS$8 &&
  (!CORRECT_NEW || UNSUPPORTED_Y$1 || UNSUPPORTED_DOT_ALL$1 || UNSUPPORTED_NCG$1 || fails$8$1(function () {
    re2[MATCH] = false;
    // RegExp constructor can alter flags and IsRegExp works correct with @@match
    return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
  }));

var handleDotAll = function (string) {
  var length = string.length;
  var index = 0;
  var result = '';
  var brackets = false;
  var chr;
  for (; index <= length; index++) {
    chr = string.charAt(index);
    if (chr === '\\') {
      result += chr + string.charAt(++index);
      continue;
    }
    if (!brackets && chr === '.') {
      result += '[\\s\\S]';
    } else {
      if (chr === '[') {
        brackets = true;
      } else if (chr === ']') {
        brackets = false;
      } result += chr;
    }
  } return result;
};

var handleNCG = function (string) {
  var length = string.length;
  var index = 0;
  var result = '';
  var named = [];
  var names = {};
  var brackets = false;
  var ncg = false;
  var groupid = 0;
  var groupname = '';
  var chr;
  for (; index <= length; index++) {
    chr = string.charAt(index);
    if (chr === '\\') {
      chr = chr + string.charAt(++index);
    } else if (chr === ']') {
      brackets = false;
    } else if (!brackets) switch (true) {
      case chr === '[':
        brackets = true;
        break;
      case chr === '(':
        if (IS_NCG.test(string.slice(index + 1))) {
          index += 2;
          ncg = true;
        }
        result += chr;
        groupid++;
        continue;
      case chr === '>' && ncg:
        if (groupname === '' || has$3$1(names, groupname)) {
          throw new SyntaxError('Invalid capture group name');
        }
        names[groupname] = true;
        named.push([groupname, groupid]);
        ncg = false;
        groupname = '';
        continue;
    }
    if (ncg) groupname += chr;
    else result += chr;
  } return [result, named];
};

// `RegExp` constructor
// https://tc39.es/ecma262/#sec-regexp-constructor
if (isForced$1$1('RegExp', BASE_FORCED)) {
  var RegExpWrapper = function RegExp(pattern, flags) {
    var thisIsRegExp = this instanceof RegExpWrapper;
    var patternIsRegExp = isRegExp$1(pattern);
    var flagsAreUndefined = flags === undefined;
    var groups = [];
    var rawPattern = pattern;
    var rawFlags, dotAll, sticky, handled, result, state;

    if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
      return pattern;
    }

    if (patternIsRegExp || pattern instanceof RegExpWrapper) {
      pattern = pattern.source;
      if (flagsAreUndefined) flags = 'flags' in rawPattern ? rawPattern.flags : getFlags.call(rawPattern);
    }

    pattern = pattern === undefined ? '' : String(pattern);
    flags = flags === undefined ? '' : String(flags);
    rawPattern = pattern;

    if (UNSUPPORTED_DOT_ALL$1 && 'dotAll' in re1) {
      dotAll = !!flags && flags.indexOf('s') > -1;
      if (dotAll) flags = flags.replace(/s/g, '');
    }

    rawFlags = flags;

    if (UNSUPPORTED_Y$1 && 'sticky' in re1) {
      sticky = !!flags && flags.indexOf('y') > -1;
      if (sticky) flags = flags.replace(/y/g, '');
    }

    if (UNSUPPORTED_NCG$1) {
      handled = handleNCG(pattern);
      pattern = handled[0];
      groups = handled[1];
    }

    result = inheritIfRequired(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype$2, RegExpWrapper);

    if (dotAll || sticky || groups.length) {
      state = enforceInternalState$2(result);
      if (dotAll) {
        state.dotAll = true;
        state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
      }
      if (sticky) state.sticky = true;
      if (groups.length) state.groups = groups;
    }

    if (pattern !== rawPattern) try {
      // fails in old engines, but we have no alternatives for unsupported regex syntax
      createNonEnumerableProperty$3$1(result, 'source', rawPattern === '' ? '(?:)' : rawPattern);
    } catch (error) { /* empty */ }

    return result;
  };

  var proxy = function (key) {
    key in RegExpWrapper || defineProperty$5(RegExpWrapper, key, {
      configurable: true,
      get: function () { return NativeRegExp[key]; },
      set: function (it) { NativeRegExp[key] = it; }
    });
  };

  for (var keys$1 = getOwnPropertyNames(NativeRegExp), index$3 = 0; keys$1.length > index$3;) {
    proxy(keys$1[index$3++]);
  }

  RegExpPrototype$2.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype$2;
  redefine$6(global$a$1, 'RegExp', RegExpWrapper);
}

// https://tc39.es/ecma262/#sec-get-regexp-@@species
setSpecies$1$1('RegExp');

/* eslint-disable regexp/no-assertion-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var regexpFlags$2 = regexpFlags$1$1;
var stickyHelpers$2 = regexpStickyHelpers$1;
var shared$1$1 = shared$5.exports;
var create$1 = objectCreate$1;
var getInternalState$2$1 = internalState$1.get;
var UNSUPPORTED_DOT_ALL$2 = regexpUnsupportedDotAll$1;
var UNSUPPORTED_NCG$2 = regexpUnsupportedNcg$1;

var nativeExec$1 = RegExp.prototype.exec;
var nativeReplace$1 = shared$1$1('native-string-replace', String.prototype.replace);

var patchedExec$1 = nativeExec$1;

var UPDATES_LAST_INDEX_WRONG$1 = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec$1.call(re1, 'a');
  nativeExec$1.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y$2 = stickyHelpers$2.UNSUPPORTED_Y || stickyHelpers$2.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED$1 = /()??/.exec('')[1] !== undefined;

var PATCH$1 = UPDATES_LAST_INDEX_WRONG$1 || NPCG_INCLUDED$1 || UNSUPPORTED_Y$2 || UNSUPPORTED_DOT_ALL$2 || UNSUPPORTED_NCG$2;

if (PATCH$1) {
  // eslint-disable-next-line max-statements -- TODO
  patchedExec$1 = function exec(str) {
    var re = this;
    var state = getInternalState$2$1(re);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = patchedExec$1.call(raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y$2 && re.sticky;
    var flags = regexpFlags$2.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED$1) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG$1) lastIndex = re.lastIndex;

    match = nativeExec$1.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG$1 && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED$1 && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace$1.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create$1(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

var regexpExec$2$1 = patchedExec$1;

var $$d = _export$1;
var exec$1 = regexpExec$2$1;

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$$d({ target: 'RegExp', proto: true, forced: /./.exec !== exec$1 }, {
  exec: exec$1
});

var redefine$5$1 = redefine$8.exports;
var anObject$7$1 = anObject$f;
var fails$7$1 = fails$k;
var flags = regexpFlags$1$1;

var TO_STRING = 'toString';
var RegExpPrototype$1 = RegExp.prototype;
var nativeToString = RegExpPrototype$1[TO_STRING];

var NOT_GENERIC = fails$7$1(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = nativeToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine$5$1(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject$7$1(this);
    var p = String(R.source);
    var rf = R.flags;
    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype$1) ? flags.call(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}

var $$c = _export$1;
var $filter = arrayIteration$1.filter;
var arrayMethodHasSpeciesSupport$3 = arrayMethodHasSpeciesSupport$2;

var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport$3('filter');

// `Array.prototype.filter` method
// https://tc39.es/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$$c({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// TODO: Remove from `core-js@4` since it's moved to entry points

var redefine$4$1 = redefine$8.exports;
var regexpExec$1$1 = regexpExec$2$1;
var fails$6$1 = fails$k;
var wellKnownSymbol$b$1 = wellKnownSymbol$h;
var createNonEnumerableProperty$2$1 = createNonEnumerableProperty$8;

var SPECIES$2$1 = wellKnownSymbol$b$1('species');
var RegExpPrototype$3 = RegExp.prototype;

var fixRegexpWellKnownSymbolLogic$1 = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol$b$1(KEY);

  var DELEGATES_TO_SYMBOL = !fails$6$1(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$6$1(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES$2$1] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    FORCED
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      var $exec = regexp.exec;
      if ($exec === regexpExec$1$1 || $exec === RegExpPrototype$3.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    });

    redefine$4$1(String.prototype, KEY, methods[0]);
    redefine$4$1(RegExpPrototype$3, SYMBOL, methods[1]);
  }

  if (SHAM) createNonEnumerableProperty$2$1(RegExpPrototype$3[SYMBOL], 'sham', true);
};

// `SameValue` abstract operation
// https://tc39.es/ecma262/#sec-samevalue
// eslint-disable-next-line es/no-object-is -- safe
var sameValue$1$1 = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare -- NaN check
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

var classof$4$1 = classofRaw$1$1;
var regexpExec$3 = regexpExec$2$1;

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
var regexpExecAbstract$1 = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof$4$1(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec$3.call(R, S);
};

var fixRegExpWellKnownSymbolLogic$1$1 = fixRegexpWellKnownSymbolLogic$1;
var anObject$6$1 = anObject$f;
var requireObjectCoercible$3$1 = requireObjectCoercible$7;
var sameValue$2 = sameValue$1$1;
var regExpExec$1$1 = regexpExecAbstract$1;

// @@search logic
fixRegExpWellKnownSymbolLogic$1$1('search', function (SEARCH, nativeSearch, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.es/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = requireObjectCoercible$3$1(this);
      var searcher = regexp == undefined ? undefined : regexp[SEARCH];
      return searcher !== undefined ? searcher.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@search
    function (string) {
      var res = maybeCallNative(nativeSearch, this, string);
      if (res.done) return res.value;

      var rx = anObject$6$1(this);
      var S = String(string);

      var previousLastIndex = rx.lastIndex;
      if (!sameValue$2(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regExpExec$1$1(rx, S);
      if (!sameValue$2(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});

var fails$5$1 = fails$k;

var arrayMethodIsStrict$1 = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails$5$1(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
    method.call(null, argument || function () { throw 1; }, 1);
  });
};

var $forEach$1 = arrayIteration$1.forEach;
var arrayMethodIsStrict = arrayMethodIsStrict$1;

var STRICT_METHOD = arrayMethodIsStrict('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach
var arrayForEach = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
  return $forEach$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
} : [].forEach;

var $$b = _export$1;
var forEach$1 = arrayForEach;

// `Array.prototype.forEach` method
// https://tc39.es/ecma262/#sec-array.prototype.foreach
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
$$b({ target: 'Array', proto: true, forced: [].forEach != forEach$1 }, {
  forEach: forEach$1
});

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

var global$9$1 = global$n;
var DOMIterables = domIterables;
var forEach = arrayForEach;
var createNonEnumerableProperty$1$1 = createNonEnumerableProperty$8;

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global$9$1[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty$1$1(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
}

var DESCRIPTORS$7 = descriptors$1;
var objectKeys$2 = objectKeys$4;
var toIndexedObject$4 = toIndexedObject$8;
var propertyIsEnumerable$2 = objectPropertyIsEnumerable$1.f;

// `Object.{ entries, values }` methods implementation
var createMethod$2$1 = function (TO_ENTRIES) {
  return function (it) {
    var O = toIndexedObject$4(it);
    var keys = objectKeys$2(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!DESCRIPTORS$7 || propertyIsEnumerable$2.call(O, key)) {
        result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};

var objectToArray = {
  // `Object.entries` method
  // https://tc39.es/ecma262/#sec-object.entries
  entries: createMethod$2$1(true),
  // `Object.values` method
  // https://tc39.es/ecma262/#sec-object.values
  values: createMethod$2$1(false)
};

var $$a = _export$1;
var $values = objectToArray.values;

// `Object.values` method
// https://tc39.es/ecma262/#sec-object.values
$$a({ target: 'Object', stat: true }, {
  values: function values(O) {
    return $values(O);
  }
});

components.Button;
    components.TextControl;
i18n.__;
element.Component;

var DEFAULT_ID_ATTRIBUTE_NAME = 'mediaID';
var DEFAULT_URL_ATTRIBUTE_NAME = 'mediaURL';
var DEFAULT_ALT_ATTRIBUTE_NAME = 'mediaAltText';
var DEFAULT_BUTTON_LABEL = 'Upload / Select image';
var DEFAULT_BUTTON_CHANGE_LABEL = 'Change image';

var _excluded = ["open"],
    _excluded2 = ["open"];
var Button$1 = components.Button;
var __$2$1 = i18n.__;
var SelectButton = function SelectButton(_ref) {
  var open = _ref.open,
      props = _objectWithoutProperties(_ref, _excluded);

  var attributes = props.attributes,
      _props$idAttribute = props.idAttribute,
      idAttribute = _props$idAttribute === void 0 ? DEFAULT_ID_ATTRIBUTE_NAME : _props$idAttribute,
      _props$buttonLabel = props.buttonLabel,
      buttonLabel = _props$buttonLabel === void 0 ? DEFAULT_BUTTON_LABEL : _props$buttonLabel,
      _props$buttonChangeLa = props.buttonChangeLabel,
      buttonChangeLabel = _props$buttonChangeLa === void 0 ? DEFAULT_BUTTON_CHANGE_LABEL : _props$buttonChangeLa;
  return /*#__PURE__*/React.createElement(Button$1, {
    isPrimary: true,
    onClick: open
  }, !attributes[idAttribute] ? __$2$1(buttonLabel, 'ghwp') : __$2$1(buttonChangeLabel, 'ghwp'));
};
var SelectButtonWithPreview = function SelectButtonWithPreview(_ref2) {
  var open = _ref2.open,
      props = _objectWithoutProperties(_ref2, _excluded2);

  var attributes = props.attributes,
      imageElementClassName = props.imageElementClassName,
      _props$idAttribute2 = props.idAttribute,
      idAttribute = _props$idAttribute2 === void 0 ? DEFAULT_ID_ATTRIBUTE_NAME : _props$idAttribute2,
      _props$buttonLabel2 = props.buttonLabel,
      buttonLabel = _props$buttonLabel2 === void 0 ? DEFAULT_BUTTON_LABEL : _props$buttonLabel2,
      _props$buttonChangeLa2 = props.buttonChangeLabel,
      buttonChangeLabel = _props$buttonChangeLa2 === void 0 ? DEFAULT_BUTTON_CHANGE_LABEL : _props$buttonChangeLa2,
      _props$urlAttribute = props.urlAttribute,
      urlAttribute = _props$urlAttribute === void 0 ? DEFAULT_URL_ATTRIBUTE_NAME : _props$urlAttribute;
  return /*#__PURE__*/React.createElement(Button$1, {
    className: classnames$1$1([{
      'image-button': Boolean(attributes[idAttribute])
    }]),
    isPrimary: !attributes[idAttribute],
    style: {
      height: 'auto',
      minHeight: '36px'
    },
    onClick: open
  }, !attributes[idAttribute] ? __$2$1(buttonLabel, 'ghwp') : /*#__PURE__*/React.createElement("img", {
    className: imageElementClassName,
    src: attributes[urlAttribute],
    alt: __$2$1(buttonChangeLabel, 'ghwp')
  }));
};
var RemoveButton = function RemoveButton(props) {
  var setAttributes = props.setAttributes,
      _props$idAttribute3 = props.idAttribute,
      idAttribute = _props$idAttribute3 === void 0 ? DEFAULT_ID_ATTRIBUTE_NAME : _props$idAttribute3,
      _props$urlAttribute2 = props.urlAttribute,
      urlAttribute = _props$urlAttribute2 === void 0 ? DEFAULT_URL_ATTRIBUTE_NAME : _props$urlAttribute2,
      _props$altAttribute = props.altAttribute,
      altAttribute = _props$altAttribute === void 0 ? DEFAULT_ALT_ATTRIBUTE_NAME : _props$altAttribute;

  var getOnRemoveImage = function getOnRemoveImage(idAttribute, urlAttribute, altAttribute) {
    return function () {
      var _setAttributes;

      setAttributes((_setAttributes = {}, _defineProperty$1(_setAttributes, urlAttribute, ''), _defineProperty$1(_setAttributes, idAttribute, ''), _defineProperty$1(_setAttributes, altAttribute, ''), _setAttributes));
    };
  };

  return /*#__PURE__*/React.createElement(Button$1, {
    isDestructive: true,
    onClick: getOnRemoveImage(idAttribute, urlAttribute, altAttribute)
  }, __$2$1('Remove image', 'ghwp'));
};

var MediaUpload = blockEditor.MediaUpload;
/**
 * An image selector with optional preview and remove button
 *
 * @param {object}   props
 * @param {object}   props.attributes           Pass down the props of the parent component so attributes can be read
 *                                              and set
 * @param {function} props.setAttributes
 *
 * @param {?string}  props.idAttribute       ['mediaID']
 *                                             Use this to set a different attribute name for the image's media ID. It's
 *                                             where the image ID is read from and written to on change events.
 * @param {?string}  props.urlAttribute      ['mediaURL']
 *                                             Use this to set a different attribute name for the image's URL.
 * @param {?string}  props.altAttribute      ['mediaAltText']
 *                                             Use this to set a different attribute name for the image's alt text.
 * @param {?string}  props.buttonLabel       ['Upload / select image']
 *                                             You can use this option to set a different button text when no image is
 *                                           selected
 * @param {?string}  props.buttonChangeLabel ['Change image']
 *                                             You can use this to change the button text when an image is selected.
 * @param {?string}  props.imageElementClassName  ['']
 *                                             Set a custom class name on the image element when using "withPreview"
 * @param {boolean}  props.removeButton      [true]
 *                                             Set this option to `false` if you don't need the ability to clear the
 *                                             attributes and remove the image
 * @param {boolean}  props.withPreview       [false]
 *                                             Pass this option to enable a preview of the selected image instead of the
 *                                             change button.
 * @return {*}
 * @constructor
 */

var ImageSelect$1 = function ImageSelect(props) {
  var attributes = props.attributes,
      _props$idAttribute = props.idAttribute,
      idAttribute = _props$idAttribute === void 0 ? DEFAULT_ID_ATTRIBUTE_NAME : _props$idAttribute,
      _props$urlAttribute = props.urlAttribute,
      urlAttribute = _props$urlAttribute === void 0 ? DEFAULT_URL_ATTRIBUTE_NAME : _props$urlAttribute,
      _props$altAttribute = props.altAttribute,
      altAttribute = _props$altAttribute === void 0 ? DEFAULT_ALT_ATTRIBUTE_NAME : _props$altAttribute,
      _props$removeButton = props.removeButton,
      removeButton = _props$removeButton === void 0 ? true : _props$removeButton,
      setAttributes = props.setAttributes,
      _props$withPreview = props.withPreview,
      withPreview = _props$withPreview === void 0 ? false : _props$withPreview;

  var getOnSelectImage = function getOnSelectImage(idAttribute, urlAttribute, altAttribute) {
    return function (_ref) {
      var _setAttributes;

      var url = _ref.url,
          id = _ref.id,
          alt = _ref.alt;
      setAttributes((_setAttributes = {}, _defineProperty$1(_setAttributes, idAttribute, id), _defineProperty$1(_setAttributes, urlAttribute, url), _defineProperty$1(_setAttributes, altAttribute, alt), _setAttributes));
    };
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "ghwp-editor-image-select",
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "button-group"
  }, /*#__PURE__*/React.createElement(MediaUpload, {
    onSelect: getOnSelectImage(idAttribute, urlAttribute, altAttribute),
    allowedTypes: "image",
    value: attributes[idAttribute],
    render: function render(_ref2) {
      var open = _ref2.open;
      var SelectButtonComponent = withPreview ? SelectButtonWithPreview : SelectButton;
      return /*#__PURE__*/React.createElement(SelectButtonComponent, _extends({
        open: open
      }, props));
    }
  }), removeButton && (attributes[urlAttribute] || attributes[idAttribute]) && /*#__PURE__*/React.createElement(RemoveButton, props)));
};

var DESCRIPTORS$6 = descriptors$1;
var fails$4$1 = fails$k;
var objectKeys$1$1 = objectKeys$4;
var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols$1;
var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable$1;
var toObject$2$1 = toObject$5;
var IndexedObject$3 = indexedObject$1;

// eslint-disable-next-line es/no-object-assign -- safe
var $assign = Object.assign;
// eslint-disable-next-line es/no-object-defineproperty -- required for testing
var defineProperty$4 = Object.defineProperty;

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
var objectAssign = !$assign || fails$4$1(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS$6 && $assign({ b: 1 }, $assign(defineProperty$4({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty$4(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line es/no-symbol -- safe
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return $assign({}, A)[symbol] != 7 || objectKeys$1$1($assign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
  var T = toObject$2$1(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
  var propertyIsEnumerable = propertyIsEnumerableModule$1.f;
  while (argumentsLength > index) {
    var S = IndexedObject$3(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys$1$1(S).concat(getOwnPropertySymbols(S)) : objectKeys$1$1(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS$6 || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;

var $$9 = _export$1;
var assign = objectAssign;

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
// eslint-disable-next-line es/no-object-assign -- required for testing
$$9({ target: 'Object', stat: true, forced: Object.assign !== assign }, {
  assign: assign
});

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray$1$1 = Array.isArray;

/** Used as references for various `Number` constants. */
var INFINITY$2 = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto$1 = Symbol$1$1 ? Symbol$1$1.prototype : undefined,
    symbolToString = symbolProto$1 ? symbolProto$1.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray$1$1(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol$1(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY$2) ? '-0' : result;
}

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag$1 = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject$8$1(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag$1(value);
  return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/** Used to detect overreaching core-js shims. */
var coreJsData = root$1['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/** Used for built-in method references. */
var funcProto$1 = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto$b = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$9 = objectProto$b.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty$9).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject$8$1(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/* Built-in method references that are verified to be native. */
var WeakMap$3 = getNative(root$1, 'WeakMap');

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

var defineProperty$3 = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty$3 ? identity : function(func, string) {
  return defineProperty$3(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty$3) {
    defineProperty$3(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/** Used for built-in method references. */
var objectProto$a = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$8 = objectProto$a.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$8.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax$1 = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax$1(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax$1(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/** `Object#toString` result references. */
var argsTag$2 = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike$1(value) && baseGetTag$1(value) == argsTag$2;
}

/** Used for built-in method references. */
var objectProto$8 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$8.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable$1 = objectProto$8.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike$1(value) && hasOwnProperty$7.call(value, 'callee') &&
    !propertyIsEnumerable$1.call(value, 'callee');
};

/** Detect free variable `exports`. */
var freeExports$1 = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule$1 = freeExports$1 && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;

/** Built-in value references. */
var Buffer = moduleExports$1 ? root$1.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
Buffer ? Buffer.isBuffer : undefined;

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal$1.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
nodeUtil && nodeUtil.isTypedArray;

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray$1$1(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol$1(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED$2 ? undefined : result;
  }
  return hasOwnProperty$3.call(data, key) ? data[key] : undefined;
}

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty$2.call(data, key);
}

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
  return this;
}

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/* Built-in method references that are verified to be native. */
var Map = getNative(root$1, 'Map');

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/** Error message constants. */
var FUNC_ERROR_TEXT$1 = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString$2(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray$1$1(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString$2(value));
}

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol$1(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/** Built-in value references. */
var spreadableSymbol = Symbol$1$1 ? Symbol$1$1.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray$1$1(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, 1) : [];
}

/**
 * A specialized version of `baseRest` which flattens the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @returns {Function} Returns the new function.
 */
function flatRest(func) {
  return setToString(overRest(func, undefined, flatten), func + '');
}

/* Built-in method references that are verified to be native. */
var DataView = getNative(root$1, 'DataView');

/* Built-in method references that are verified to be native. */
var Promise$2 = getNative(root$1, 'Promise');

/* Built-in method references that are verified to be native. */
var Set = getNative(root$1, 'Set');

/** `Object#toString` result references. */
var mapTag$1 = '[object Map]',
    objectTag$1 = '[object Object]',
    promiseTag = '[object Promise]',
    setTag$1 = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag$1 = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise$2),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap$3);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag$1;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag$1) ||
    (Map && getTag(new Map) != mapTag$1) ||
    (Promise$2 && getTag(Promise$2.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag$1) ||
    (WeakMap$3 && getTag(new WeakMap$3) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag$1(value),
        Ctor = result == objectTag$1 ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag$1;
        case mapCtorString: return mapTag$1;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag$1;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/** Built-in value references. */
root$1.Uint8Array;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol$1$1 ? Symbol$1$1.prototype : undefined;
    symbolProto ? symbolProto.valueOf : undefined;

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray$1$1(object) || isArguments(object));
}

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

/* Node.js helper references. */
nodeUtil && nodeUtil.isRegExp;

/**
 * The base implementation of `_.set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseSet(object, path, value, customizer) {
  if (!isObject$8$1(object)) {
    return object;
  }
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      lastIndex = length - 1,
      nested = object;

  while (nested != null && ++index < length) {
    var key = toKey(path[index]),
        newValue = value;

    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      return object;
    }

    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;
      if (newValue === undefined) {
        newValue = isObject$8$1(objValue)
          ? objValue
          : (isIndex(path[index + 1]) ? [] : {});
      }
    }
    assignValue(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}

/**
 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 */
function basePickBy(object, paths, predicate) {
  var index = -1,
      length = paths.length,
      result = {};

  while (++index < length) {
    var path = paths[index],
        value = baseGet(object, path);

    if (predicate(value, path)) {
      baseSet(result, castPath(path, object), value);
    }
  }
  return result;
}

/**
 * The base implementation of `_.pick` without support for individual
 * property identifiers.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @returns {Object} Returns the new object.
 */
function basePick(object, paths) {
  return basePickBy(object, paths, function(value, path) {
    return hasIn(object, path);
  });
}

/**
 * Creates an object composed of the picked `object` properties.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [paths] The property paths to pick.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.pick(object, ['a', 'c']);
 * // => { 'a': 1, 'c': 3 }
 */
flatRest(function(object, paths) {
  return object == null ? {} : basePick(object, paths);
});

components.RangeControl;
    components.TextControl;
    components.ToggleControl;

components.Icon;

var Spinner = components.Spinner;
var SpinnerOverlay$1 = function SpinnerOverlay() {
  return /*#__PURE__*/React.createElement("div", {
    className: "ghwp-editor-spinner-overlay"
  }, /*#__PURE__*/React.createElement(Spinner, null));
};

data$2.withDispatch;

// a string of all valid unicode whitespaces
var whitespaces$2 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

var requireObjectCoercible$2$1 = requireObjectCoercible$7;
var whitespaces$1 = whitespaces$2;

var whitespace = '[' + whitespaces$1 + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod$1$1 = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible$2$1($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

var stringTrim = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: createMethod$1$1(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: createMethod$1$1(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: createMethod$1$1(3)
};

var global$8$1 = global$n;
var trim = stringTrim.trim;
var whitespaces = whitespaces$2;

var $parseInt = global$8$1.parseInt;
var hex = /^[+-]?0[Xx]/;
var FORCED$2 = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22;

// `parseInt` method
// https://tc39.es/ecma262/#sec-parseint-string-radix
var numberParseInt = FORCED$2 ? function parseInt(string, radix) {
  var S = trim(String(string));
  return $parseInt(S, (radix >>> 0) || (hex.test(S) ? 16 : 10));
} : $parseInt;

var $$8 = _export$1;
var parseIntImplementation = numberParseInt;

// `parseInt` method
// https://tc39.es/ecma262/#sec-parseint-string-radix
$$8({ global: true, forced: parseInt != parseIntImplementation }, {
  parseInt: parseIntImplementation
});

var dedupe = {exports: {}};

/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

(function (module) {
/* global define */

(function () {

	var classNames = (function () {
		// don't inherit from Object so we can skip hasOwnProperty check later
		// http://stackoverflow.com/questions/15518328/creating-js-object-with-object-createnull#answer-21079232
		function StorageObject() {}
		StorageObject.prototype = Object.create(null);

		function _parseArray (resultSet, array) {
			var length = array.length;

			for (var i = 0; i < length; ++i) {
				_parse(resultSet, array[i]);
			}
		}

		var hasOwn = {}.hasOwnProperty;

		function _parseNumber (resultSet, num) {
			resultSet[num] = true;
		}

		function _parseObject (resultSet, object) {
			if (object.toString === Object.prototype.toString) {
				for (var k in object) {
					if (hasOwn.call(object, k)) {
						// set value to false instead of deleting it to avoid changing object structure
						// https://www.smashingmagazine.com/2012/11/writing-fast-memory-efficient-javascript/#de-referencing-misconceptions
						resultSet[k] = !!object[k];
					}
				}
			} else {
				resultSet[object.toString()] = true;
			}
		}

		var SPACE = /\s+/;
		function _parseString (resultSet, str) {
			var array = str.split(SPACE);
			var length = array.length;

			for (var i = 0; i < length; ++i) {
				resultSet[array[i]] = true;
			}
		}

		function _parse (resultSet, arg) {
			if (!arg) return;
			var argType = typeof arg;

			// 'foo bar'
			if (argType === 'string') {
				_parseString(resultSet, arg);

			// ['foo', 'bar', ...]
			} else if (Array.isArray(arg)) {
				_parseArray(resultSet, arg);

			// { 'foo': true, ... }
			} else if (argType === 'object') {
				_parseObject(resultSet, arg);

			// '130'
			} else if (argType === 'number') {
				_parseNumber(resultSet, arg);
			}
		}

		function _classNames () {
			// don't leak arguments
			// https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
			var len = arguments.length;
			var args = Array(len);
			for (var i = 0; i < len; i++) {
				args[i] = arguments[i];
			}

			var classSet = new StorageObject();
			_parseArray(classSet, args);

			var list = [];

			for (var k in classSet) {
				if (classSet[k]) {
					list.push(k);
				}
			}

			return list.join(' ');
		}

		return _classNames;
	})();

	if (module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else {
		window.classNames = classNames;
	}
}());
}(dedupe));

dedupe.exports;

compose.compose;
data$2.withDispatch;
    data$2.withSelect;

/* eslint-disable indent */
components.ToolbarButton;
i18n.__;

var wellKnownSymbol$a$1 = wellKnownSymbol$h;
var create$3 = objectCreate$1;
var definePropertyModule$2$1 = objectDefineProperty$1;

var UNSCOPABLES = wellKnownSymbol$a$1('unscopables');
var ArrayPrototype$1 = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
  definePropertyModule$2$1.f(ArrayPrototype$1, UNSCOPABLES, {
    configurable: true,
    value: create$3(null)
  });
}

// add a key to Array.prototype[@@unscopables]
var addToUnscopables$1 = function (key) {
  ArrayPrototype$1[UNSCOPABLES][key] = true;
};

var $$7 = _export$1;
var $findIndex = arrayIteration$1.findIndex;
var addToUnscopables = addToUnscopables$1;

var FIND_INDEX = 'findIndex';
var SKIPS_HOLES = true;

// Shouldn't skip holes
if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () { SKIPS_HOLES = false; });

// `Array.prototype.findIndex` method
// https://tc39.es/ecma262/#sec-array.prototype.findindex
$$7({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND_INDEX);

var DESCRIPTORS$5$1 = descriptors$1;
var defineProperty$2 = objectDefineProperty$1.f;

var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// Function instances `.name` property
// https://tc39.es/ecma262/#sec-function-instances-name
if (DESCRIPTORS$5$1 && !(NAME in FunctionPrototype)) {
  defineProperty$2(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}

var $$6 = _export$1;
var toObject$1$1 = toObject$5;
var nativeKeys$1 = objectKeys$4;
var fails$3$1 = fails$k;

var FAILS_ON_PRIMITIVES$1 = fails$3$1(function () { nativeKeys$1(1); });

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
$$6({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$1 }, {
  keys: function keys(it) {
    return nativeKeys$1(toObject$1$1(it));
  }
});

var objectGetOwnPropertyNamesExternal = {};

/* eslint-disable es/no-object-getownpropertynames -- safe */

var toIndexedObject$3$1 = toIndexedObject$8;
var $getOwnPropertyNames$1 = objectGetOwnPropertyNames$1.f;

var toString$1$1 = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return $getOwnPropertyNames$1(it);
  } catch (error) {
    return windowNames.slice();
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
  return windowNames && toString$1$1.call(it) == '[object Window]'
    ? getWindowNames(it)
    : $getOwnPropertyNames$1(toIndexedObject$3$1(it));
};

var wellKnownSymbolWrapped = {};

var wellKnownSymbol$9$1 = wellKnownSymbol$h;

wellKnownSymbolWrapped.f = wellKnownSymbol$9$1;

var path$3 = path$2;
var has$2$1 = has$a;
var wrappedWellKnownSymbolModule$1 = wellKnownSymbolWrapped;
var defineProperty$1 = objectDefineProperty$1.f;

var defineWellKnownSymbol$1 = function (NAME) {
  var Symbol = path$3.Symbol || (path$3.Symbol = {});
  if (!has$2$1(Symbol, NAME)) defineProperty$1(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule$1.f(NAME)
  });
};

var defineProperty$6 = objectDefineProperty$1.f;
var has$1$1 = has$a;
var wellKnownSymbol$8$1 = wellKnownSymbol$h;

var TO_STRING_TAG$2$1 = wellKnownSymbol$8$1('toStringTag');

var setToStringTag$2 = function (it, TAG, STATIC) {
  if (it && !has$1$1(it = STATIC ? it : it.prototype, TO_STRING_TAG$2$1)) {
    defineProperty$6(it, TO_STRING_TAG$2$1, { configurable: true, value: TAG });
  }
};

var $$5 = _export$1;
var global$7$1 = global$n;
var getBuiltIn$1$1 = getBuiltIn$7;
var DESCRIPTORS$4$1 = descriptors$1;
var NATIVE_SYMBOL$3 = nativeSymbol$1;
var USE_SYMBOL_AS_UID$2 = useSymbolAsUid$1;
var fails$2$1 = fails$k;
var has$b = has$a;
var isArray$5 = isArray$4;
var isObject$2$1 = isObject$e;
var anObject$5$1 = anObject$f;
var toObject$6 = toObject$5;
var toIndexedObject$2$1 = toIndexedObject$8;
var toPrimitive$1$1 = toPrimitive$4;
var createPropertyDescriptor$1$1 = createPropertyDescriptor$4;
var nativeObjectCreate = objectCreate$1;
var objectKeys$5 = objectKeys$4;
var getOwnPropertyNamesModule$2 = objectGetOwnPropertyNames$1;
var getOwnPropertyNamesExternal = objectGetOwnPropertyNamesExternal;
var getOwnPropertySymbolsModule$3 = objectGetOwnPropertySymbols$1;
var getOwnPropertyDescriptorModule$1 = objectGetOwnPropertyDescriptor$1;
var definePropertyModule$1$1 = objectDefineProperty$1;
var propertyIsEnumerableModule$3 = objectPropertyIsEnumerable$1;
var createNonEnumerableProperty$9 = createNonEnumerableProperty$8;
var redefine$3$1 = redefine$8.exports;
var shared$6 = shared$5.exports;
var sharedKey$4 = sharedKey$3;
var hiddenKeys$6 = hiddenKeys$5;
var uid$4 = uid$3;
var wellKnownSymbol$7$1 = wellKnownSymbol$h;
var wrappedWellKnownSymbolModule = wellKnownSymbolWrapped;
var defineWellKnownSymbol = defineWellKnownSymbol$1;
var setToStringTag$1$1 = setToStringTag$2;
var InternalStateModule$1$1 = internalState$1;
var $forEach = arrayIteration$1.forEach;

var HIDDEN = sharedKey$4('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE$2 = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol$7$1('toPrimitive');
var setInternalState$1 = InternalStateModule$1$1.set;
var getInternalState$1$1 = InternalStateModule$1$1.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE$2];
var $Symbol = global$7$1.Symbol;
var $stringify = getBuiltIn$1$1('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor$1 = getOwnPropertyDescriptorModule$1.f;
var nativeDefineProperty = definePropertyModule$1$1.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule$3.f;
var AllSymbols = shared$6('symbols');
var ObjectPrototypeSymbols = shared$6('op-symbols');
var StringToSymbolRegistry = shared$6('string-to-symbol-registry');
var SymbolToStringRegistry = shared$6('symbol-to-string-registry');
var WellKnownSymbolsStore$2 = shared$6('wks');
var QObject = global$7$1.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS$4$1 && fails$2$1(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE$2]);
  setInternalState$1(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS$4$1) symbol.description = description;
  return symbol;
};

var isSymbol$2 = USE_SYMBOL_AS_UID$2 ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return Object(it) instanceof $Symbol;
};

var $defineProperty$2 = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty$2(ObjectPrototypeSymbols, P, Attributes);
  anObject$5$1(O);
  var key = toPrimitive$1$1(P, true);
  anObject$5$1(Attributes);
  if (has$b(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has$b(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor$1$1(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has$b(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor$1$1(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject$5$1(O);
  var properties = toIndexedObject$2$1(Properties);
  var keys = objectKeys$5(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS$4$1 || $propertyIsEnumerable$2.call(properties, key)) $defineProperty$2(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable$2 = function propertyIsEnumerable(V) {
  var P = toPrimitive$1$1(V, true);
  var enumerable = nativePropertyIsEnumerable.call(this, P);
  if (this === ObjectPrototype && has$b(AllSymbols, P) && !has$b(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has$b(this, P) || !has$b(AllSymbols, P) || has$b(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor$2 = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject$2$1(O);
  var key = toPrimitive$1$1(P, true);
  if (it === ObjectPrototype && has$b(AllSymbols, key) && !has$b(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);
  if (descriptor && has$b(AllSymbols, key) && !(has$b(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject$2$1(O));
  var result = [];
  $forEach(names, function (key) {
    if (!has$b(AllSymbols, key) && !has$b(hiddenKeys$6, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject$2$1(O));
  var result = [];
  $forEach(names, function (key) {
    if (has$b(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has$b(ObjectPrototype, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.es/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL$3) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
    var tag = uid$4(description);
    var setter = function (value) {
      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
      if (has$b(this, HIDDEN) && has$b(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor$1$1(1, value));
    };
    if (DESCRIPTORS$4$1 && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  redefine$3$1($Symbol[PROTOTYPE$2], 'toString', function toString() {
    return getInternalState$1$1(this).tag;
  });

  redefine$3$1($Symbol, 'withoutSetter', function (description) {
    return wrap(uid$4(description), description);
  });

  propertyIsEnumerableModule$3.f = $propertyIsEnumerable$2;
  definePropertyModule$1$1.f = $defineProperty$2;
  getOwnPropertyDescriptorModule$1.f = $getOwnPropertyDescriptor$2;
  getOwnPropertyNamesModule$2.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule$3.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol$7$1(name), name);
  };

  if (DESCRIPTORS$4$1) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty($Symbol[PROTOTYPE$2], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState$1$1(this).description;
      }
    });
    {
      redefine$3$1(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable$2, { unsafe: true });
    }
  }
}

$$5({ global: true, wrap: true, forced: !NATIVE_SYMBOL$3, sham: !NATIVE_SYMBOL$3 }, {
  Symbol: $Symbol
});

$forEach(objectKeys$5(WellKnownSymbolsStore$2), function (name) {
  defineWellKnownSymbol(name);
});

$$5({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL$3 }, {
  // `Symbol.for` method
  // https://tc39.es/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = String(key);
    if (has$b(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.es/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol$2(sym)) throw TypeError(sym + ' is not a symbol');
    if (has$b(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$$5({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL$3, sham: !DESCRIPTORS$4$1 }, {
  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty$2,
  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor$2
});

$$5({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL$3 }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
$$5({ target: 'Object', stat: true, forced: fails$2$1(function () { getOwnPropertySymbolsModule$3.f(1); }) }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return getOwnPropertySymbolsModule$3.f(toObject$6(it));
  }
});

// `JSON.stringify` method behavior with symbols
// https://tc39.es/ecma262/#sec-json.stringify
if ($stringify) {
  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL$3 || fails$2$1(function () {
    var symbol = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    return $stringify([symbol]) != '[null]'
      // WebKit converts symbol values to JSON as null
      || $stringify({ a: symbol }) != '{}'
      // V8 throws on boxed symbols
      || $stringify(Object(symbol)) != '{}';
  });

  $$5({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      var args = [it];
      var index = 1;
      var $replacer;
      while (arguments.length > index) args.push(arguments[index++]);
      $replacer = replacer;
      if (!isObject$2$1(replacer) && it === undefined || isSymbol$2(it)) return; // IE8 returns string on undefined
      if (!isArray$5(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol$2(value)) return value;
      };
      args[1] = replacer;
      return $stringify.apply(null, args);
    }
  });
}

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
if (!$Symbol[PROTOTYPE$2][TO_PRIMITIVE]) {
  createNonEnumerableProperty$9($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
}
// `Symbol.prototype[@@toStringTag]` property
// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag$1$1($Symbol, SYMBOL);

hiddenKeys$6[HIDDEN] = true;

var $$4 = _export$1;
var fails$1$1 = fails$k;
var toIndexedObject$1$1 = toIndexedObject$8;
var nativeGetOwnPropertyDescriptor = objectGetOwnPropertyDescriptor$1.f;
var DESCRIPTORS$3$1 = descriptors$1;

var FAILS_ON_PRIMITIVES$2 = fails$1$1(function () { nativeGetOwnPropertyDescriptor(1); });
var FORCED$1 = !DESCRIPTORS$3$1 || FAILS_ON_PRIMITIVES$2;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
$$4({ target: 'Object', stat: true, forced: FORCED$1, sham: !DESCRIPTORS$3$1 }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor(toIndexedObject$1$1(it), key);
  }
});

var toPrimitive$5 = toPrimitive$4;
var definePropertyModule$7 = objectDefineProperty$1;
var createPropertyDescriptor$5 = createPropertyDescriptor$4;

var createProperty$1 = function (object, key, value) {
  var propertyKey = toPrimitive$5(key);
  if (propertyKey in object) definePropertyModule$7.f(object, propertyKey, createPropertyDescriptor$5(0, value));
  else object[propertyKey] = value;
};

var $$3$1 = _export$1;
var DESCRIPTORS$2$1 = descriptors$1;
var ownKeys$1$1 = ownKeys$3;
var toIndexedObject$9 = toIndexedObject$8;
var getOwnPropertyDescriptorModule$3 = objectGetOwnPropertyDescriptor$1;
var createProperty = createProperty$1;

// `Object.getOwnPropertyDescriptors` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
$$3$1({ target: 'Object', stat: true, sham: !DESCRIPTORS$2$1 }, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject$9(object);
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule$3.f;
    var keys = ownKeys$1$1(O);
    var result = {};
    var index = 0;
    var key, descriptor;
    while (keys.length > index) {
      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
      if (descriptor !== undefined) createProperty(result, key, descriptor);
    }
    return result;
  }
});

var $$2$1 = _export$1;
var DESCRIPTORS$1$1 = descriptors$1;
var defineProperties$2 = objectDefineProperties$1;

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
$$2$1({ target: 'Object', stat: true, forced: !DESCRIPTORS$1$1, sham: !DESCRIPTORS$1$1 }, {
  defineProperties: defineProperties$2
});

var $$1$1 = _export$1;
var DESCRIPTORS$f = descriptors$1;
var objectDefinePropertyModile = objectDefineProperty$1;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
$$1$1({ target: 'Object', stat: true, forced: !DESCRIPTORS$f, sham: !DESCRIPTORS$f }, {
  defineProperty: objectDefinePropertyModile.f
});
element.cloneElement;
    element.Children.map;
hooks.addFilter;

blocks.registerBlockStyle;
i18n.__;

var toInteger$5 = toInteger$4$1;
var requireObjectCoercible$1$1 = requireObjectCoercible$7;

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod$5 = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible$1$1($this));
    var position = toInteger$5(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

var stringMultibyte$1 = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod$5(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod$5(true)
};

var charAt$1 = stringMultibyte$1.charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
var advanceStringIndex$1$1 = function (S, index, unicode) {
  return index + (unicode ? charAt$1(S, index).length : 1);
};

var fixRegExpWellKnownSymbolLogic$2 = fixRegexpWellKnownSymbolLogic$1;
var anObject$4$1 = anObject$f;
var toLength$1$1 = toLength$4$1;
var requireObjectCoercible$8 = requireObjectCoercible$7;
var advanceStringIndex$2 = advanceStringIndex$1$1;
var regExpExec$2 = regexpExecAbstract$1;

// @@match logic
fixRegExpWellKnownSymbolLogic$2('match', function (MATCH, nativeMatch, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.es/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible$8(this);
      var matcher = regexp == undefined ? undefined : regexp[MATCH];
      return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
    function (string) {
      var res = maybeCallNative(nativeMatch, this, string);
      if (res.done) return res.value;

      var rx = anObject$4$1(this);
      var S = String(string);

      if (!rx.global) return regExpExec$2(rx, S);

      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec$2(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex$2(S, toLength$1$1(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});

var wellKnownSymbol$6$1 = wellKnownSymbol$h;

var TO_STRING_TAG$1$1 = wellKnownSymbol$6$1('toStringTag');
var test$1 = {};

test$1[TO_STRING_TAG$1$1] = 'z';

var toStringTagSupport$1 = String(test$1) === '[object z]';

var TO_STRING_TAG_SUPPORT$2$1 = toStringTagSupport$1;
var classofRaw$2 = classofRaw$1$1;
var wellKnownSymbol$5$1 = wellKnownSymbol$h;

var TO_STRING_TAG$3 = wellKnownSymbol$5$1('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS$1 = classofRaw$2(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet$1 = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
var classof$3$1 = TO_STRING_TAG_SUPPORT$2$1 ? classofRaw$2 : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet$1(O = Object(it), TO_STRING_TAG$3)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS$1 ? classofRaw$2(O)
    // ES3 arguments fallback
    : (result = classofRaw$2(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};

var TO_STRING_TAG_SUPPORT$1$1 = toStringTagSupport$1;
var classof$2$1 = classof$3$1;

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
var objectToString$2 = TO_STRING_TAG_SUPPORT$1$1 ? {}.toString : function toString() {
  return '[object ' + classof$2$1(this) + ']';
};

var TO_STRING_TAG_SUPPORT$3 = toStringTagSupport$1;
var redefine$2$1 = redefine$8.exports;
var toString$4 = objectToString$2;

// `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT$3) {
  redefine$2$1(Object.prototype, 'toString', toString$4, { unsafe: true });
}

var global$6$1 = global$n;

var nativePromiseConstructor$1 = global$6$1.Promise;

var redefine$1$1 = redefine$8.exports;

var redefineAll$1$1 = function (target, src, options) {
  for (var key in src) redefine$1$1(target, key, src[key], options);
  return target;
};

var anInstance$1$1 = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};

var iterators$1 = {};

var wellKnownSymbol$4$1 = wellKnownSymbol$h;
var Iterators$1$1 = iterators$1;

var ITERATOR$2$1 = wellKnownSymbol$4$1('iterator');
var ArrayPrototype$2 = Array.prototype;

// check on default Array iterator
var isArrayIteratorMethod$1$1 = function (it) {
  return it !== undefined && (Iterators$1$1.Array === it || ArrayPrototype$2[ITERATOR$2$1] === it);
};

var classof$1$1 = classof$3$1;
var Iterators$2 = iterators$1;
var wellKnownSymbol$3$1 = wellKnownSymbol$h;

var ITERATOR$1$1 = wellKnownSymbol$3$1('iterator');

var getIteratorMethod$1$1 = function (it) {
  if (it != undefined) return it[ITERATOR$1$1]
    || it['@@iterator']
    || Iterators$2[classof$1$1(it)];
};

var anObject$3$1 = anObject$f;

var iteratorClose$1$1 = function (iterator) {
  var returnMethod = iterator['return'];
  if (returnMethod !== undefined) {
    return anObject$3$1(returnMethod.call(iterator)).value;
  }
};

var anObject$2$1 = anObject$f;
var isArrayIteratorMethod$2 = isArrayIteratorMethod$1$1;
var toLength$5 = toLength$4$1;
var bind$2$1 = functionBindContext$1;
var getIteratorMethod$2 = getIteratorMethod$1$1;
var iteratorClose$2 = iteratorClose$1$1;

var Result$1 = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate$1$1 = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind$2$1(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose$2(iterator);
    return new Result$1(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject$2$1(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod$2(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod$2(iterFn)) {
      for (index = 0, length = toLength$5(iterable.length); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && result instanceof Result$1) return result;
      } return new Result$1(false);
    }
    iterator = iterFn.call(iterable);
  }

  next = iterator.next;
  while (!(step = next.call(iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose$2(iterator);
      throw error;
    }
    if (typeof result == 'object' && result && result instanceof Result$1) return result;
  } return new Result$1(false);
};

var wellKnownSymbol$2$1 = wellKnownSymbol$h;

var ITERATOR$3 = wellKnownSymbol$2$1('iterator');
var SAFE_CLOSING$1 = false;

try {
  var called$1 = 0;
  var iteratorWithReturn$1 = {
    next: function () {
      return { done: !!called$1++ };
    },
    'return': function () {
      SAFE_CLOSING$1 = true;
    }
  };
  iteratorWithReturn$1[ITERATOR$3] = function () {
    return this;
  };
  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn$1, function () { throw 2; });
} catch (error) { /* empty */ }

var checkCorrectnessOfIteration$1$1 = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING$1) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR$3] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};

var anObject$1$1 = anObject$f;
var aFunction$2$1 = aFunction$6;
var wellKnownSymbol$1$1 = wellKnownSymbol$h;

var SPECIES$1$1 = wellKnownSymbol$1$1('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
var speciesConstructor$1$1 = function (O, defaultConstructor) {
  var C = anObject$1$1(O).constructor;
  var S;
  return C === undefined || (S = anObject$1$1(C)[SPECIES$1$1]) == undefined ? defaultConstructor : aFunction$2$1(S);
};

var userAgent$1$1 = engineUserAgent$1;

var engineIsIos$1 = /(?:iphone|ipod|ipad).*applewebkit/i.test(userAgent$1$1);

var classof$8 = classofRaw$1$1;
var global$5$1 = global$n;

var engineIsNode$1 = classof$8(global$5$1.process) == 'process';

var global$4$1 = global$n;
var fails$l = fails$k;
var bind$1$1 = functionBindContext$1;
var html$3 = html$2$1;
var createElement$2 = documentCreateElement$1$1;
var IS_IOS$1$1 = engineIsIos$1;
var IS_NODE$2$1 = engineIsNode$1;

var location$1 = global$4$1.location;
var set$2 = global$4$1.setImmediate;
var clear$1 = global$4$1.clearImmediate;
var process$3$1 = global$4$1.process;
var MessageChannel$1 = global$4$1.MessageChannel;
var Dispatch$1 = global$4$1.Dispatch;
var counter$1 = 0;
var queue$1 = {};
var ONREADYSTATECHANGE$1 = 'onreadystatechange';
var defer$1, channel$1, port$1;

var run$1 = function (id) {
  // eslint-disable-next-line no-prototype-builtins -- safe
  if (queue$1.hasOwnProperty(id)) {
    var fn = queue$1[id];
    delete queue$1[id];
    fn();
  }
};

var runner$1 = function (id) {
  return function () {
    run$1(id);
  };
};

var listener$2 = function (event) {
  run$1(event.data);
};

var post$1 = function (id) {
  // old engines have not location.origin
  global$4$1.postMessage(id + '', location$1.protocol + '//' + location$1.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set$2 || !clear$1) {
  set$2 = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue$1[++counter$1] = function () {
      // eslint-disable-next-line no-new-func -- spec requirement
      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
    };
    defer$1(counter$1);
    return counter$1;
  };
  clear$1 = function clearImmediate(id) {
    delete queue$1[id];
  };
  // Node.js 0.8-
  if (IS_NODE$2$1) {
    defer$1 = function (id) {
      process$3$1.nextTick(runner$1(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch$1 && Dispatch$1.now) {
    defer$1 = function (id) {
      Dispatch$1.now(runner$1(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel$1 && !IS_IOS$1$1) {
    channel$1 = new MessageChannel$1();
    port$1 = channel$1.port2;
    channel$1.port1.onmessage = listener$2;
    defer$1 = bind$1$1(port$1.postMessage, port$1, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global$4$1.addEventListener &&
    typeof postMessage == 'function' &&
    !global$4$1.importScripts &&
    location$1 && location$1.protocol !== 'file:' &&
    !fails$l(post$1)
  ) {
    defer$1 = post$1;
    global$4$1.addEventListener('message', listener$2, false);
  // IE8-
  } else if (ONREADYSTATECHANGE$1 in createElement$2('script')) {
    defer$1 = function (id) {
      html$3.appendChild(createElement$2('script'))[ONREADYSTATECHANGE$1] = function () {
        html$3.removeChild(this);
        run$1(id);
      };
    };
  // Rest old browsers
  } else {
    defer$1 = function (id) {
      setTimeout(runner$1(id), 0);
    };
  }
}

var task$1$1 = {
  set: set$2,
  clear: clear$1
};

var userAgent$5 = engineUserAgent$1;

var engineIsWebosWebkit$1 = /web0s(?!.*chrome)/i.test(userAgent$5);

var global$3$1 = global$n;
var getOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor$1.f;
var macrotask$1 = task$1$1.set;
var IS_IOS$2 = engineIsIos$1;
var IS_WEBOS_WEBKIT$1 = engineIsWebosWebkit$1;
var IS_NODE$1$1 = engineIsNode$1;

var MutationObserver$1$1 = global$3$1.MutationObserver || global$3$1.WebKitMutationObserver;
var document$2$1 = global$3$1.document;
var process$2$1 = global$3$1.process;
var Promise$1$1 = global$3$1.Promise;
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor$1 = getOwnPropertyDescriptor$3(global$3$1, 'queueMicrotask');
var queueMicrotask$1 = queueMicrotaskDescriptor$1 && queueMicrotaskDescriptor$1.value;

var flush$1, head$1, last$1, notify$1$1, toggle$1, node$1, promise$1, then$1;

// modern engines have queueMicrotask method
if (!queueMicrotask$1) {
  flush$1 = function () {
    var parent, fn;
    if (IS_NODE$1$1 && (parent = process$2$1.domain)) parent.exit();
    while (head$1) {
      fn = head$1.fn;
      head$1 = head$1.next;
      try {
        fn();
      } catch (error) {
        if (head$1) notify$1$1();
        else last$1 = undefined;
        throw error;
      }
    } last$1 = undefined;
    if (parent) parent.enter();
  };

  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
  if (!IS_IOS$2 && !IS_NODE$1$1 && !IS_WEBOS_WEBKIT$1 && MutationObserver$1$1 && document$2$1) {
    toggle$1 = true;
    node$1 = document$2$1.createTextNode('');
    new MutationObserver$1$1(flush$1).observe(node$1, { characterData: true });
    notify$1$1 = function () {
      node$1.data = toggle$1 = !toggle$1;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise$1$1 && Promise$1$1.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise$1 = Promise$1$1.resolve(undefined);
    // workaround of WebKit ~ iOS Safari 10.1 bug
    promise$1.constructor = Promise$1$1;
    then$1 = promise$1.then;
    notify$1$1 = function () {
      then$1.call(promise$1, flush$1);
    };
  // Node.js without promises
  } else if (IS_NODE$1$1) {
    notify$1$1 = function () {
      process$2$1.nextTick(flush$1);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify$1$1 = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask$1.call(global$3$1, flush$1);
    };
  }
}

var microtask$1$1 = queueMicrotask$1 || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last$1) last$1.next = task;
  if (!head$1) {
    head$1 = task;
    notify$1$1();
  } last$1 = task;
};

var newPromiseCapability$2$1 = {};

var aFunction$1$1 = aFunction$6;

var PromiseCapability$1 = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction$1$1(resolve);
  this.reject = aFunction$1$1(reject);
};

// `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability
newPromiseCapability$2$1.f = function (C) {
  return new PromiseCapability$1(C);
};

var anObject$g = anObject$f;
var isObject$1$1 = isObject$e;
var newPromiseCapability$1$1 = newPromiseCapability$2$1;

var promiseResolve$1$1 = function (C, x) {
  anObject$g(C);
  if (isObject$1$1(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability$1$1.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

var global$2$1 = global$n;

var hostReportErrors$1$1 = function (a, b) {
  var console = global$2$1.console;
  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};

var perform$1$1 = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};

var engineIsBrowser$1 = typeof window == 'object';

var $$k = _export$1;
var global$1$1 = global$n;
var getBuiltIn$8 = getBuiltIn$7;
var NativePromise$1 = nativePromiseConstructor$1;
var redefine$9 = redefine$8.exports;
var redefineAll$2 = redefineAll$1$1;
var setPrototypeOf$2 = objectSetPrototypeOf$1;
var setToStringTag$3 = setToStringTag$2;
var setSpecies$3 = setSpecies$2;
var isObject$f = isObject$e;
var aFunction$8 = aFunction$6;
var anInstance$2 = anInstance$1$1;
var inspectSource$4 = inspectSource$3$1;
var iterate$2 = iterate$1$1;
var checkCorrectnessOfIteration$2 = checkCorrectnessOfIteration$1$1;
var speciesConstructor$2 = speciesConstructor$1$1;
var task$2 = task$1$1.set;
var microtask$2 = microtask$1$1;
var promiseResolve$2 = promiseResolve$1$1;
var hostReportErrors$2 = hostReportErrors$1$1;
var newPromiseCapabilityModule$1 = newPromiseCapability$2$1;
var perform$2 = perform$1$1;
var InternalStateModule$3 = internalState$1;
var isForced$4 = isForced_1$1;
var wellKnownSymbol$i = wellKnownSymbol$h;
var IS_BROWSER$1 = engineIsBrowser$1;
var IS_NODE$3 = engineIsNode$1;
var V8_VERSION$3 = engineV8Version$1;

var SPECIES$6 = wellKnownSymbol$i('species');
var PROMISE$1 = 'Promise';
var getInternalState$4 = InternalStateModule$3.get;
var setInternalState$2 = InternalStateModule$3.set;
var getInternalPromiseState$1 = InternalStateModule$3.getterFor(PROMISE$1);
var NativePromisePrototype$1 = NativePromise$1 && NativePromise$1.prototype;
var PromiseConstructor$1 = NativePromise$1;
var PromiseConstructorPrototype$1 = NativePromisePrototype$1;
var TypeError$1$1 = global$1$1.TypeError;
var document$1$1 = global$1$1.document;
var process$1$1 = global$1$1.process;
var newPromiseCapability$3 = newPromiseCapabilityModule$1.f;
var newGenericPromiseCapability$1 = newPromiseCapability$3;
var DISPATCH_EVENT$1 = !!(document$1$1 && document$1$1.createEvent && global$1$1.dispatchEvent);
var NATIVE_REJECTION_EVENT$1 = typeof PromiseRejectionEvent == 'function';
var UNHANDLED_REJECTION$1 = 'unhandledrejection';
var REJECTION_HANDLED$1 = 'rejectionhandled';
var PENDING$1 = 0;
var FULFILLED$1 = 1;
var REJECTED$1 = 2;
var HANDLED$1 = 1;
var UNHANDLED$1 = 2;
var SUBCLASSING$1 = false;
var Internal$1, OwnPromiseCapability$1, PromiseWrapper$1, nativeThen$1;

var FORCED$4 = isForced$4(PROMISE$1, function () {
  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource$4(PromiseConstructor$1);
  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(PromiseConstructor$1);
  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
  // We can't detect it synchronously, so just check versions
  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION$3 === 66) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (V8_VERSION$3 >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) return false;
  // Detect correctness of subclassing with @@species support
  var promise = new PromiseConstructor$1(function (resolve) { resolve(1); });
  var FakePromise = function (exec) {
    exec(function () { /* empty */ }, function () { /* empty */ });
  };
  var constructor = promise.constructor = {};
  constructor[SPECIES$6] = FakePromise;
  SUBCLASSING$1 = promise.then(function () { /* empty */ }) instanceof FakePromise;
  if (!SUBCLASSING$1) return true;
  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
  return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER$1 && !NATIVE_REJECTION_EVENT$1;
});

var INCORRECT_ITERATION$1 = FORCED$4 || !checkCorrectnessOfIteration$2(function (iterable) {
  PromiseConstructor$1.all(iterable)['catch'](function () { /* empty */ });
});

// helpers
var isThenable$1 = function (it) {
  var then;
  return isObject$f(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify$2 = function (state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask$2(function () {
    var value = state.value;
    var ok = state.state == FULFILLED$1;
    var index = 0;
    // variable length - can't use forEach
    while (chain.length > index) {
      var reaction = chain[index++];
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED$1) onHandleUnhandled$1(state);
            state.rejection = HANDLED$1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // can throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError$1$1('Promise-chain cycle'));
          } else if (then = isThenable$1(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    }
    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled$1(state);
  });
};

var dispatchEvent$1 = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT$1) {
    event = document$1$1.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global$1$1.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (!NATIVE_REJECTION_EVENT$1 && (handler = global$1$1['on' + name])) handler(event);
  else if (name === UNHANDLED_REJECTION$1) hostReportErrors$2('Unhandled promise rejection', reason);
};

var onUnhandled$1 = function (state) {
  task$2.call(global$1$1, function () {
    var promise = state.facade;
    var value = state.value;
    var IS_UNHANDLED = isUnhandled$1(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform$2(function () {
        if (IS_NODE$3) {
          process$1$1.emit('unhandledRejection', value, promise);
        } else dispatchEvent$1(UNHANDLED_REJECTION$1, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE$3 || isUnhandled$1(state) ? UNHANDLED$1 : HANDLED$1;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled$1 = function (state) {
  return state.rejection !== HANDLED$1 && !state.parent;
};

var onHandleUnhandled$1 = function (state) {
  task$2.call(global$1$1, function () {
    var promise = state.facade;
    if (IS_NODE$3) {
      process$1$1.emit('rejectionHandled', promise);
    } else dispatchEvent$1(REJECTION_HANDLED$1, promise, state.value);
  });
};

var bind$6 = function (fn, state, unwrap) {
  return function (value) {
    fn(state, value, unwrap);
  };
};

var internalReject$1 = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED$1;
  notify$2(state, true);
};

var internalResolve$1 = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (state.facade === value) throw TypeError$1$1("Promise can't be resolved itself");
    var then = isThenable$1(value);
    if (then) {
      microtask$2(function () {
        var wrapper = { done: false };
        try {
          then.call(value,
            bind$6(internalResolve$1, wrapper, state),
            bind$6(internalReject$1, wrapper, state)
          );
        } catch (error) {
          internalReject$1(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED$1;
      notify$2(state, false);
    }
  } catch (error) {
    internalReject$1({ done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED$4) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor$1 = function Promise(executor) {
    anInstance$2(this, PromiseConstructor$1, PROMISE$1);
    aFunction$8(executor);
    Internal$1.call(this);
    var state = getInternalState$4(this);
    try {
      executor(bind$6(internalResolve$1, state), bind$6(internalReject$1, state));
    } catch (error) {
      internalReject$1(state, error);
    }
  };
  PromiseConstructorPrototype$1 = PromiseConstructor$1.prototype;
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  Internal$1 = function Promise(executor) {
    setInternalState$2(this, {
      type: PROMISE$1,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING$1,
      value: undefined
    });
  };
  Internal$1.prototype = redefineAll$2(PromiseConstructorPrototype$1, {
    // `Promise.prototype.then` method
    // https://tc39.es/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState$1(this);
      var reaction = newPromiseCapability$3(speciesConstructor$2(this, PromiseConstructor$1));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = IS_NODE$3 ? process$1$1.domain : undefined;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING$1) notify$2(state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.es/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability$1 = function () {
    var promise = new Internal$1();
    var state = getInternalState$4(promise);
    this.promise = promise;
    this.resolve = bind$6(internalResolve$1, state);
    this.reject = bind$6(internalReject$1, state);
  };
  newPromiseCapabilityModule$1.f = newPromiseCapability$3 = function (C) {
    return C === PromiseConstructor$1 || C === PromiseWrapper$1
      ? new OwnPromiseCapability$1(C)
      : newGenericPromiseCapability$1(C);
  };

  if (typeof NativePromise$1 == 'function' && NativePromisePrototype$1 !== Object.prototype) {
    nativeThen$1 = NativePromisePrototype$1.then;

    if (!SUBCLASSING$1) {
      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
      redefine$9(NativePromisePrototype$1, 'then', function then(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor$1(function (resolve, reject) {
          nativeThen$1.call(that, resolve, reject);
        }).then(onFulfilled, onRejected);
      // https://github.com/zloirock/core-js/issues/640
      }, { unsafe: true });

      // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
      redefine$9(NativePromisePrototype$1, 'catch', PromiseConstructorPrototype$1['catch'], { unsafe: true });
    }

    // make `.constructor === Promise` work for native promise-based APIs
    try {
      delete NativePromisePrototype$1.constructor;
    } catch (error) { /* empty */ }

    // make `instanceof Promise` work for native promise-based APIs
    if (setPrototypeOf$2) {
      setPrototypeOf$2(NativePromisePrototype$1, PromiseConstructorPrototype$1);
    }
  }
}

$$k({ global: true, wrap: true, forced: FORCED$4 }, {
  Promise: PromiseConstructor$1
});

setToStringTag$3(PromiseConstructor$1, PROMISE$1, false);
setSpecies$3(PROMISE$1);

PromiseWrapper$1 = getBuiltIn$8(PROMISE$1);

// statics
$$k({ target: PROMISE$1, stat: true, forced: FORCED$4 }, {
  // `Promise.reject` method
  // https://tc39.es/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability$3(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});

$$k({ target: PROMISE$1, stat: true, forced: FORCED$4 }, {
  // `Promise.resolve` method
  // https://tc39.es/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve$2(this, x);
  }
});

$$k({ target: PROMISE$1, stat: true, forced: INCORRECT_ITERATION$1 }, {
  // `Promise.all` method
  // https://tc39.es/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability$3(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform$2(function () {
      var $promiseResolve = aFunction$8(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate$2(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        $promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.es/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability$3(C);
    var reject = capability.reject;
    var result = perform$2(function () {
      var $promiseResolve = aFunction$8(C.resolve);
      iterate$2(iterable, function (promise) {
        $promiseResolve.call(C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

var dispatch$1 = data$2.dispatch; // prettier-ignore

var YT_LONG_REGEX = /https?:\/\/(?:www\.)?youtube\.com\/watch\?(?:[^\s&?]*)*(?:&?v=([^&?\s]*))(?:&[^\s&?]*)*/;
var YT_SHORT_REGEX = /https?:\/\/youtu\.be\/([^\s&?]*)/; // prettier-ignore

var YT_EMBED_REGEX = /https?:\/\/(?:www\.)?youtube\.com\/embed\/(?:([^&?\s]*))(?:&[^\s&?]*)*/;
var VIMEO_REGEX = /https?:\/\/(?:www\.)?vimeo\.com\/(\d*)(?:(?:&|\?|\/)?.*)*/; // prettier-ignore

var VIMEO_EMBED_REGEX = /https?:\/\/(?:www\.)?player\.vimeo\.com\/video\/(?:([^&?\s]*))(?:&[^\s&?]*)*/;
var IFRAME_REGEX = /<iframe.*src="([^"]*)".*><\/iframe>/;
var getYoutubeEmbedUrlFromVideoId = function getYoutubeEmbedUrlFromVideoId(videoId) {
  return "https://www.youtube.com/embed/".concat(videoId);
};
var getVimeoEmbedUrlFromVideoId = function getVimeoEmbedUrlFromVideoId(videoId) {
  return "https://player.vimeo.com/video/".concat(videoId);
};

var isLongYoutubeUrl = function isLongYoutubeUrl(videoUrl) {
  return videoUrl.match(YT_LONG_REGEX);
};

var isShortYoutubeUrl = function isShortYoutubeUrl(videoUrl) {
  return videoUrl.match(YT_SHORT_REGEX);
};

var isEmbedYoutubeUrl = function isEmbedYoutubeUrl(videoUrl) {
  return videoUrl.match(YT_EMBED_REGEX);
};

var isDefaultVimeoUrl = function isDefaultVimeoUrl(videoUrl) {
  return videoUrl.match(VIMEO_REGEX);
};

var isEmbedVimeoUrl = function isEmbedVimeoUrl(videoUrl) {
  return videoUrl.match(VIMEO_EMBED_REGEX);
};

var isIframeString = function isIframeString(videoUrl) {
  return videoUrl.match(IFRAME_REGEX);
};
/*
 ******************************************************************************
 *   Test URLs                                                                *
 ******************************************************************************/


var isYoutubeUrl$1 = function isYoutubeUrl(videoUrl) {
  return !!(isLongYoutubeUrl(videoUrl) || isShortYoutubeUrl(videoUrl) || isEmbedYoutubeUrl(videoUrl));
};
var isVimeoUrl$1 = function isVimeoUrl(videoUrl) {
  return !!(isDefaultVimeoUrl(videoUrl) || isEmbedVimeoUrl(videoUrl));
};
/*
 ******************************************************************************
 *   IDs from URLs                                                            *
 ******************************************************************************/

var getYoutubeVideoIdFromUrl$1 = function getYoutubeVideoIdFromUrl(videoUrl) {
  var isYT = isLongYoutubeUrl(videoUrl);
  var isShortYT = isShortYoutubeUrl(videoUrl);
  var isEmbedYT = isEmbedYoutubeUrl(videoUrl);

  if (isYT && isYT[1]) {
    return isYT[1];
  } else if (isShortYT && isShortYT[1]) {
    return isShortYT[1];
  } else if (isEmbedYT && isEmbedYT[1]) {
    return isEmbedYT[1];
  } else {
    return null;
  }
};
var getVimeoVideoIdFromUrl$1 = function getVimeoVideoIdFromUrl(videoUrl) {
  var isVimeo = isDefaultVimeoUrl(videoUrl);
  var isEmbedVimeo = isEmbedVimeoUrl(videoUrl);

  if (isVimeo && isVimeo[1]) {
    return isVimeo[1];
  } else if (isEmbedVimeo && isEmbedVimeo[1]) {
    return isEmbedVimeo[1];
  } else {
    return null;
  }
};
/*
 ******************************************************************************
 *   Prêt-a-manger embed urls                                                 *
 ******************************************************************************/

var getYoutubeEmbedByUrl = function getYoutubeEmbedByUrl(videoUrl) {
  if (!isYoutubeUrl$1(videoUrl)) return null;else if (isEmbedYoutubeUrl(videoUrl)) return videoUrl;
  var videoId = getYoutubeVideoIdFromUrl$1(videoUrl);
  return getYoutubeEmbedUrlFromVideoId(videoId);
};
var getVimeoEmbedByUrl = function getVimeoEmbedByUrl(videoUrl) {
  if (!isVimeoUrl$1(videoUrl)) return null;else if (isEmbedVimeoUrl(videoUrl)) return videoUrl;
  var videoId = getVimeoVideoIdFromUrl$1(videoUrl);
  return getVimeoEmbedUrlFromVideoId(videoId);
};
/*
 ******************************************************************************
 *   Full service embed URL generator                                         *
 ******************************************************************************/

var getVideoEmbed = function getVideoEmbed(videoUrl) {
  var isIframe = isIframeString(videoUrl);

  if (isIframe && isIframe[1]) {
    return isIframe[1];
  }

  if (isYoutubeUrl$1(videoUrl)) return getYoutubeEmbedByUrl(videoUrl);
  if (isVimeoUrl$1(videoUrl)) return getVimeoEmbedByUrl(videoUrl);
  return videoUrl;
};
/*
 ******************************************************************************
 *   Bonus: Thumbnails                                                        *
 ******************************************************************************/

var getYoutubeThumbnailUrlByVideoId$1 = function getYoutubeThumbnailUrlByVideoId(videoId) {
  dispatch$1('core/notices').createSuccessNotice('Found Youtube video thumbnail.', {
    id: 'videoThumbGetterSuccess',
    isDismissible: true
  });
  return "https://img.youtube.com/vi/".concat(videoId, "/hqdefault.jpg");
};
/**
 * @param {string} videoId
 * @return {Promise<any>}
 */

var getVimeoThumbnailUrlByVideoId$1 = function getVimeoThumbnailUrlByVideoId(videoId) {
  return fetch("https://vimeo.com/api/v2/video/".concat(videoId, ".json")).then(function (response) {
    return response.json();
  }).then(function (result) {
    return result[0];
  }).then(function (result) {
    if (result && result['thumbnail_large']) {
      dispatch$1('core/notices').createSuccessNotice('Found Vimeo thumbnail.', {
        id: 'vimeoThumbGetterSuccess',
        isDismissible: true
      });
      return result['thumbnail_large'];
    } else {
      throw new Error('No matching thumbnail received');
    }
  })["catch"](function (err) {
    dispatch$1('core/notices').createWarningNotice('Fetching Vimeo thumbnail failed: ' + err, {
      id: 'vimeoThumbGetterFailed',
      isDismissible: true
    });
    return '';
  });
};

var index$2 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	getYoutubeEmbedUrlFromVideoId: getYoutubeEmbedUrlFromVideoId,
	getVimeoEmbedUrlFromVideoId: getVimeoEmbedUrlFromVideoId,
	isYoutubeUrl: isYoutubeUrl$1,
	isVimeoUrl: isVimeoUrl$1,
	getYoutubeVideoIdFromUrl: getYoutubeVideoIdFromUrl$1,
	getVimeoVideoIdFromUrl: getVimeoVideoIdFromUrl$1,
	getYoutubeEmbedByUrl: getYoutubeEmbedByUrl,
	getVimeoEmbedByUrl: getVimeoEmbedByUrl,
	getVideoEmbed: getVideoEmbed,
	getYoutubeThumbnailUrlByVideoId: getYoutubeThumbnailUrlByVideoId$1,
	getVimeoThumbnailUrlByVideoId: getVimeoThumbnailUrlByVideoId$1
});

data$2.withSelect;

var ImageSelect = ImageSelect$1,
    SpinnerOverlay = SpinnerOverlay$1;
var videoProviderUtils = index$2;

var attributes = {
  mediaURL: {
    type: 'string',
    "default": null
  },
  mediaID: {
    type: 'number'
  },
  mediaAltText: {
    type: 'string'
  },
  videoUrl: {
    type: 'string'
  },
  videoUrlInput: {
    type: 'string'
  },
  providerThumbnailUrl: {
    type: 'string'
  },
  providerType: {
    type: 'string',
    "default": 'youtube'
  }
};

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var classnames$1 = {exports: {}};

/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

(function (module) {
/* global define */

(function () {

	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString === Object.prototype.toString) {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				} else {
					classes.push(arg.toString());
				}
			}
		}

		return classes.join(' ');
	}

	if (module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else {
		window.classNames = classNames;
	}
}());
}(classnames$1));

var classnames = classnames$1.exports;

var PlayCircle = function PlayCircle(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    className: "icon-play-circle",
    xmlns: "http://www.w3.org/2000/svg",
    width: "100",
    height: "100",
    viewBox: "0 0 100 100"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M50,100a50,50,0,1,1,50-50A50.0575,50.0575,0,0,1,50,100ZM50,6.7754A43.224,43.224,0,1,0,93.2235,50,43.2732,43.2732,0,0,0,50,6.7754Z"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "39.724 67.356 39.72 32.644 69.585 50 39.724 67.356"
  }));
};

function save20210129 (props) {
  var _props$attributes = props.attributes,
      mediaAltText = _props$attributes.mediaAltText,
      mediaID = _props$attributes.mediaID,
      mediaURL = _props$attributes.mediaURL,
      videoUrl = _props$attributes.videoUrl;
  return /*#__PURE__*/React.createElement("div", {
    className: "ghwp-video"
  }, /*#__PURE__*/React.createElement("a", {
    className: "ghwp-video-link",
    href: videoUrl
  }, /*#__PURE__*/React.createElement("img", {
    width: "480",
    height: "270",
    src: mediaURL,
    alt: mediaAltText,
    className: classnames('ghwp-video__thumb', _defineProperty$1({}, "wp-image-".concat(mediaID), mediaID))
  }), /*#__PURE__*/React.createElement(PlayCircle, null)));
}

var attributes20210129 = {
  mediaURL: {
    type: 'string',
    "default": null,
    selector: 'img',
    attribute: 'src'
  },
  mediaID: {
    type: 'number'
  },
  mediaAltText: {
    type: 'string'
  },
  videoUrl: {
    type: 'string',
    selector: 'a',
    attribute: 'href'
  },
  videoUrlInput: {
    type: 'string'
  }
};

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global$i =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

var objectGetOwnPropertyDescriptor = {};

var fails$d = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var fails$c = fails$d;

// Detect IE8's incomplete defineProperty implementation
var descriptors = !fails$c(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

var objectPropertyIsEnumerable = {};

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor$2 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor$2(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

var createPropertyDescriptor$2 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var toString$1 = {}.toString;

var classofRaw$1 = function (it) {
  return toString$1.call(it).slice(8, -1);
};

var fails$b = fails$d;
var classof$6 = classofRaw$1;

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails$b(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof$6(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible$5 = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings
var IndexedObject$1 = indexedObject;
var requireObjectCoercible$4 = requireObjectCoercible$5;

var toIndexedObject$3 = function (it) {
  return IndexedObject$1(requireObjectCoercible$4(it));
};

var isObject$9 = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var isObject$8 = isObject$9;

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var toPrimitive$2 = function (input, PREFERRED_STRING) {
  if (!isObject$8(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$8(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject$8(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$8(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var requireObjectCoercible$3 = requireObjectCoercible$5;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
var toObject$4 = function (argument) {
  return Object(requireObjectCoercible$3(argument));
};

var toObject$3 = toObject$4;

var hasOwnProperty$1 = {}.hasOwnProperty;

var has$7 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty$1.call(toObject$3(it), key);
};

var global$h = global$i;
var isObject$7 = isObject$9;

var document$3 = global$h.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject$7(document$3) && isObject$7(document$3.createElement);

var documentCreateElement$1 = function (it) {
  return EXISTS ? document$3.createElement(it) : {};
};

var DESCRIPTORS$5 = descriptors;
var fails$a = fails$d;
var createElement$1 = documentCreateElement$1;

// Thank's IE8 for his funny defineProperty
var ie8DomDefine = !DESCRIPTORS$5 && !fails$a(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(createElement$1('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

var DESCRIPTORS$4 = descriptors;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var createPropertyDescriptor$1 = createPropertyDescriptor$2;
var toIndexedObject$2 = toIndexedObject$3;
var toPrimitive$1 = toPrimitive$2;
var has$6 = has$7;
var IE8_DOM_DEFINE$1 = ie8DomDefine;

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
objectGetOwnPropertyDescriptor.f = DESCRIPTORS$4 ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject$2(O);
  P = toPrimitive$1(P, true);
  if (IE8_DOM_DEFINE$1) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has$6(O, P)) return createPropertyDescriptor$1(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};

var objectDefineProperty = {};

var isObject$6 = isObject$9;

var anObject$c = function (it) {
  if (!isObject$6(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};

var DESCRIPTORS$3 = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var anObject$b = anObject$c;
var toPrimitive = toPrimitive$2;

// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
objectDefineProperty.f = DESCRIPTORS$3 ? $defineProperty : function defineProperty(O, P, Attributes) {
  anObject$b(O);
  P = toPrimitive(P, true);
  anObject$b(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var DESCRIPTORS$2 = descriptors;
var definePropertyModule$3 = objectDefineProperty;
var createPropertyDescriptor = createPropertyDescriptor$2;

var createNonEnumerableProperty$5 = DESCRIPTORS$2 ? function (object, key, value) {
  return definePropertyModule$3.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var redefine$5 = {exports: {}};

var global$g = global$i;
var createNonEnumerableProperty$4 = createNonEnumerableProperty$5;

var setGlobal$3 = function (key, value) {
  try {
    createNonEnumerableProperty$4(global$g, key, value);
  } catch (error) {
    global$g[key] = value;
  } return value;
};

var global$f = global$i;
var setGlobal$2 = setGlobal$3;

var SHARED = '__core-js_shared__';
var store$3 = global$f[SHARED] || setGlobal$2(SHARED, {});

var sharedStore = store$3;

var store$2 = sharedStore;

var functionToString = Function.toString;

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store$2.inspectSource != 'function') {
  store$2.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

var inspectSource$3 = store$2.inspectSource;

var global$e = global$i;
var inspectSource$2 = inspectSource$3;

var WeakMap$1 = global$e.WeakMap;

var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(inspectSource$2(WeakMap$1));

var shared$4 = {exports: {}};

var store$1 = sharedStore;

(shared$4.exports = function (key, value) {
  return store$1[key] || (store$1[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.15.2',
  mode: 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});

var id = 0;
var postfix = Math.random();

var uid$2 = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

var shared$3 = shared$4.exports;
var uid$1 = uid$2;

var keys = shared$3('keys');

var sharedKey$2 = function (key) {
  return keys[key] || (keys[key] = uid$1(key));
};

var hiddenKeys$4 = {};

var NATIVE_WEAK_MAP = nativeWeakMap;
var global$d = global$i;
var isObject$5 = isObject$9;
var createNonEnumerableProperty$3 = createNonEnumerableProperty$5;
var objectHas = has$7;
var shared$2 = sharedStore;
var sharedKey$1 = sharedKey$2;
var hiddenKeys$3 = hiddenKeys$4;

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var WeakMap = global$d.WeakMap;
var set$1, get, has$5;

var enforce = function (it) {
  return has$5(it) ? get(it) : set$1(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject$5(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared$2.state) {
  var store = shared$2.state || (shared$2.state = new WeakMap());
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set$1 = function (it, metadata) {
    if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has$5 = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey$1('state');
  hiddenKeys$3[STATE] = true;
  set$1 = function (it, metadata) {
    if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$3(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has$5 = function (it) {
    return objectHas(it, STATE);
  };
}

var internalState = {
  set: set$1,
  get: get,
  has: has$5,
  enforce: enforce,
  getterFor: getterFor
};

var global$c = global$i;
var createNonEnumerableProperty$2 = createNonEnumerableProperty$5;
var has$4 = has$7;
var setGlobal$1 = setGlobal$3;
var inspectSource$1 = inspectSource$3;
var InternalStateModule$1 = internalState;

var getInternalState$2 = InternalStateModule$1.get;
var enforceInternalState = InternalStateModule$1.enforce;
var TEMPLATE = String(String).split('String');

(redefine$5.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var state;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has$4(value, 'name')) {
      createNonEnumerableProperty$2(value, 'name', key);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }
  }
  if (O === global$c) {
    if (simple) O[key] = value;
    else setGlobal$1(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty$2(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState$2(this).source || inspectSource$1(this);
});

var global$b = global$i;

var path$1 = global$b;

var path = path$1;
var global$a = global$i;

var aFunction$5 = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

var getBuiltIn$5 = function (namespace, method) {
  return arguments.length < 2 ? aFunction$5(path[namespace]) || aFunction$5(global$a[namespace])
    : path[namespace] && path[namespace][method] || global$a[namespace] && global$a[namespace][method];
};

var objectGetOwnPropertyNames = {};

var ceil = Math.ceil;
var floor$1 = Math.floor;

// `ToInteger` abstract operation
// https://tc39.es/ecma262/#sec-tointeger
var toInteger$4 = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor$1 : ceil)(argument);
};

var toInteger$3 = toInteger$4;

var min$2 = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
var toLength$4 = function (argument) {
  return argument > 0 ? min$2(toInteger$3(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var toInteger$2 = toInteger$4;

var max$1 = Math.max;
var min$1 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex$1 = function (index, length) {
  var integer = toInteger$2(index);
  return integer < 0 ? max$1(integer + length, 0) : min$1(integer, length);
};

var toIndexedObject$1 = toIndexedObject$3;
var toLength$3 = toLength$4;
var toAbsoluteIndex = toAbsoluteIndex$1;

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod$2 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$1($this);
    var length = toLength$3(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod$2(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod$2(false)
};

var has$3 = has$7;
var toIndexedObject = toIndexedObject$3;
var indexOf = arrayIncludes.indexOf;
var hiddenKeys$2 = hiddenKeys$4;

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has$3(hiddenKeys$2, key) && has$3(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has$3(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys$3 = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

var internalObjectKeys$1 = objectKeysInternal;
var enumBugKeys$2 = enumBugKeys$3;

var hiddenKeys$1 = enumBugKeys$2.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys$1(O, hiddenKeys$1);
};

var objectGetOwnPropertySymbols = {};

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

var getBuiltIn$4 = getBuiltIn$5;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var anObject$a = anObject$c;

// all object keys, includes non-enumerable and symbols
var ownKeys$1 = getBuiltIn$4('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject$a(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

var has$2 = has$7;
var ownKeys = ownKeys$1;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var definePropertyModule$2 = objectDefineProperty;

var copyConstructorProperties$1 = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule$2.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has$2(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

var fails$9 = fails$d;

var replacement = /#|\.prototype\./;

var isForced$2 = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails$9(detection)
    : !!detection;
};

var normalize = isForced$2.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced$2.data = {};
var NATIVE = isForced$2.NATIVE = 'N';
var POLYFILL = isForced$2.POLYFILL = 'P';

var isForced_1 = isForced$2;

var global$9 = global$i;
var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$5;
var redefine$4 = redefine$5.exports;
var setGlobal = setGlobal$3;
var copyConstructorProperties = copyConstructorProperties$1;
var isForced$1 = isForced_1;

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global$9;
  } else if (STATIC) {
    target = global$9[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global$9[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor$1(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced$1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty$1(sourceProperty, 'sham', true);
    }
    // extend global
    redefine$4(target, key, sourceProperty, options);
  }
};

var anObject$9 = anObject$c;

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
var regexpFlags$1 = function () {
  var that = anObject$9(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

var regexpStickyHelpers = {};

var fails$8 = fails$d;

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
var RE = function (s, f) {
  return RegExp(s, f);
};

regexpStickyHelpers.UNSUPPORTED_Y = fails$8(function () {
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

regexpStickyHelpers.BROKEN_CARET = fails$8(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});

var internalObjectKeys = objectKeysInternal;
var enumBugKeys$1 = enumBugKeys$3;

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
var objectKeys$1 = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys$1);
};

var DESCRIPTORS$1 = descriptors;
var definePropertyModule$1 = objectDefineProperty;
var anObject$8 = anObject$c;
var objectKeys = objectKeys$1;

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
var objectDefineProperties = DESCRIPTORS$1 ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject$8(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule$1.f(O, key = keys[index++], Properties[key]);
  return O;
};

var getBuiltIn$3 = getBuiltIn$5;

var html$2 = getBuiltIn$3('document', 'documentElement');

var anObject$7 = anObject$c;
var defineProperties = objectDefineProperties;
var enumBugKeys = enumBugKeys$3;
var hiddenKeys = hiddenKeys$4;
var html$1 = html$2;
var documentCreateElement = documentCreateElement$1;
var sharedKey = sharedKey$2;

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html$1.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject -- old IE */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject$7(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};

var fails$7 = fails$d;

var regexpUnsupportedDotAll = fails$7(function () {
  // babel-minify transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
  var re = RegExp('.', (typeof '').charAt(0));
  return !(re.dotAll && re.exec('\n') && re.flags === 's');
});

var fails$6 = fails$d;

var regexpUnsupportedNcg = fails$6(function () {
  // babel-minify transpiles RegExp('.', 'g') -> /./g and it causes SyntaxError
  var re = RegExp('(?<a>b)', (typeof '').charAt(5));
  return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc';
});

/* eslint-disable regexp/no-assertion-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var regexpFlags = regexpFlags$1;
var stickyHelpers = regexpStickyHelpers;
var shared$1 = shared$4.exports;
var create = objectCreate;
var getInternalState$1 = internalState.get;
var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
var UNSUPPORTED_NCG = regexpUnsupportedNcg;

var nativeExec = RegExp.prototype.exec;
var nativeReplace = shared$1('native-string-replace', String.prototype.replace);

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

if (PATCH) {
  // eslint-disable-next-line max-statements -- TODO
  patchedExec = function exec(str) {
    var re = this;
    var state = getInternalState$1(re);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = patchedExec.call(raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

var regexpExec$2 = patchedExec;

var $$3 = _export;
var exec = regexpExec$2;

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$$3({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});

var getBuiltIn$2 = getBuiltIn$5;

var engineUserAgent = getBuiltIn$2('navigator', 'userAgent') || '';

var global$8 = global$i;
var userAgent$2 = engineUserAgent;

var process$4 = global$8.process;
var versions = process$4 && process$4.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] < 4 ? 1 : match[0] + match[1];
} else if (userAgent$2) {
  match = userAgent$2.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent$2.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

var engineV8Version = version && +version;

/* eslint-disable es/no-symbol -- required for testing */

var V8_VERSION$2 = engineV8Version;
var fails$5 = fails$d;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$5(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION$2 && V8_VERSION$2 < 41;
});

/* eslint-disable es/no-symbol -- required for testing */

var NATIVE_SYMBOL$1 = nativeSymbol;

var useSymbolAsUid = NATIVE_SYMBOL$1
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';

var global$7 = global$i;
var shared = shared$4.exports;
var has$1 = has$7;
var uid = uid$2;
var NATIVE_SYMBOL = nativeSymbol;
var USE_SYMBOL_AS_UID = useSymbolAsUid;

var WellKnownSymbolsStore = shared('wks');
var Symbol$2 = global$7.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$2 : Symbol$2 && Symbol$2.withoutSetter || uid;

var wellKnownSymbol$d = function (name) {
  if (!has$1(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    if (NATIVE_SYMBOL && has$1(Symbol$2, name)) {
      WellKnownSymbolsStore[name] = Symbol$2[name];
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
    }
  } return WellKnownSymbolsStore[name];
};

// TODO: Remove from `core-js@4` since it's moved to entry points

var redefine$3 = redefine$5.exports;
var regexpExec$1 = regexpExec$2;
var fails$4 = fails$d;
var wellKnownSymbol$c = wellKnownSymbol$d;
var createNonEnumerableProperty = createNonEnumerableProperty$5;

var SPECIES$5 = wellKnownSymbol$c('species');
var RegExpPrototype = RegExp.prototype;

var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol$c(KEY);

  var DELEGATES_TO_SYMBOL = !fails$4(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$4(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES$5] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    FORCED
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      var $exec = regexp.exec;
      if ($exec === regexpExec$1 || $exec === RegExpPrototype.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    });

    redefine$3(String.prototype, KEY, methods[0]);
    redefine$3(RegExpPrototype, SYMBOL, methods[1]);
  }

  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
};

var toInteger$1 = toInteger$4;
var requireObjectCoercible$2 = requireObjectCoercible$5;

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod$1 = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible$2($this));
    var position = toInteger$1(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod$1(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod$1(true)
};

var charAt = stringMultibyte.charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
var advanceStringIndex$1 = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};

var toObject$2 = toObject$4;

var floor = Math.floor;
var replace = ''.replace;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

// `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution
var getSubstitution$1 = function (matched, str, position, captures, namedCaptures, replacement) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== undefined) {
    namedCaptures = toObject$2(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace.call(replacement, symbols, function (match, ch) {
    var capture;
    switch (ch.charAt(0)) {
      case '$': return '$';
      case '&': return matched;
      case '`': return str.slice(0, position);
      case "'": return str.slice(tailPos);
      case '<':
        capture = namedCaptures[ch.slice(1, -1)];
        break;
      default: // \d\d?
        var n = +ch;
        if (n === 0) return match;
        if (n > m) {
          var f = floor(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
          return match;
        }
        capture = captures[n - 1];
    }
    return capture === undefined ? '' : capture;
  });
};

var classof$5 = classofRaw$1;
var regexpExec = regexpExec$2;

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
var regexpExecAbstract = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof$5(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};

var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
var fails$3 = fails$d;
var anObject$6 = anObject$c;
var toLength$2 = toLength$4;
var toInteger = toInteger$4;
var requireObjectCoercible$1 = requireObjectCoercible$5;
var advanceStringIndex = advanceStringIndex$1;
var getSubstitution = getSubstitution$1;
var regExpExec$1 = regexpExecAbstract;
var wellKnownSymbol$b = wellKnownSymbol$d;

var REPLACE = wellKnownSymbol$b('replace');
var max = Math.max;
var min = Math.min;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
  return 'a'.replace(/./, '$0') === '$0';
})();

// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$3(function () {
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// @@replace logic
fixRegExpWellKnownSymbolLogic$1('replace', function (_, nativeReplace, maybeCallNative) {
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible$1(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
      return replacer !== undefined
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function (string, replaceValue) {
      if (
        typeof replaceValue === 'string' &&
        replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1 &&
        replaceValue.indexOf('$<') === -1
      ) {
        var res = maybeCallNative(nativeReplace, this, string, replaceValue);
        if (res.done) return res.value;
      }

      var rx = anObject$6(this);
      var S = String(string);

      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec$1(rx, S);
        if (result === null) break;

        results.push(result);
        if (!global) break;

        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength$2(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];
}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

var wellKnownSymbol$a = wellKnownSymbol$d;

var TO_STRING_TAG$2 = wellKnownSymbol$a('toStringTag');
var test = {};

test[TO_STRING_TAG$2] = 'z';

var toStringTagSupport = String(test) === '[object z]';

var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
var classofRaw = classofRaw$1;
var wellKnownSymbol$9 = wellKnownSymbol$d;

var TO_STRING_TAG$1 = wellKnownSymbol$9('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
var classof$4 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};

var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
var classof$3 = classof$4;

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
var objectToString$1 = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
  return '[object ' + classof$3(this) + ']';
};

var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var redefine$2 = redefine$5.exports;
var toString = objectToString$1;

// `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine$2(Object.prototype, 'toString', toString, { unsafe: true });
}

var global$6 = global$i;

var nativePromiseConstructor = global$6.Promise;

var redefine$1 = redefine$5.exports;

var redefineAll$1 = function (target, src, options) {
  for (var key in src) redefine$1(target, key, src[key], options);
  return target;
};

var isObject$4 = isObject$9;

var aPossiblePrototype$1 = function (it) {
  if (!isObject$4(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};

/* eslint-disable no-proto -- safe */

var anObject$5 = anObject$c;
var aPossiblePrototype = aPossiblePrototype$1;

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject$5(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

var defineProperty = objectDefineProperty.f;
var has = has$7;
var wellKnownSymbol$8 = wellKnownSymbol$d;

var TO_STRING_TAG = wellKnownSymbol$8('toStringTag');

var setToStringTag$1 = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};

var getBuiltIn$1 = getBuiltIn$5;
var definePropertyModule = objectDefineProperty;
var wellKnownSymbol$7 = wellKnownSymbol$d;
var DESCRIPTORS = descriptors;

var SPECIES$4 = wellKnownSymbol$7('species');

var setSpecies$1 = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn$1(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES$4]) {
    defineProperty(Constructor, SPECIES$4, {
      configurable: true,
      get: function () { return this; }
    });
  }
};

var aFunction$4 = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};

var anInstance$1 = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};

var iterators = {};

var wellKnownSymbol$6 = wellKnownSymbol$d;
var Iterators$1 = iterators;

var ITERATOR$2 = wellKnownSymbol$6('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
var isArrayIteratorMethod$1 = function (it) {
  return it !== undefined && (Iterators$1.Array === it || ArrayPrototype[ITERATOR$2] === it);
};

var aFunction$3 = aFunction$4;

// optional / simple context binding
var functionBindContext = function (fn, that, length) {
  aFunction$3(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var classof$2 = classof$4;
var Iterators = iterators;
var wellKnownSymbol$5 = wellKnownSymbol$d;

var ITERATOR$1 = wellKnownSymbol$5('iterator');

var getIteratorMethod$1 = function (it) {
  if (it != undefined) return it[ITERATOR$1]
    || it['@@iterator']
    || Iterators[classof$2(it)];
};

var anObject$4 = anObject$c;

var iteratorClose$1 = function (iterator) {
  var returnMethod = iterator['return'];
  if (returnMethod !== undefined) {
    return anObject$4(returnMethod.call(iterator)).value;
  }
};

var anObject$3 = anObject$c;
var isArrayIteratorMethod = isArrayIteratorMethod$1;
var toLength$1 = toLength$4;
var bind$3 = functionBindContext;
var getIteratorMethod = getIteratorMethod$1;
var iteratorClose = iteratorClose$1;

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate$1 = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind$3(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject$3(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength$1(iterable.length); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = iterFn.call(iterable);
  }

  next = iterator.next;
  while (!(step = next.call(iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator);
      throw error;
    }
    if (typeof result == 'object' && result && result instanceof Result) return result;
  } return new Result(false);
};

var wellKnownSymbol$4 = wellKnownSymbol$d;

var ITERATOR = wellKnownSymbol$4('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

var checkCorrectnessOfIteration$1 = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};

var anObject$2 = anObject$c;
var aFunction$2 = aFunction$4;
var wellKnownSymbol$3 = wellKnownSymbol$d;

var SPECIES$3 = wellKnownSymbol$3('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
var speciesConstructor$1 = function (O, defaultConstructor) {
  var C = anObject$2(O).constructor;
  var S;
  return C === undefined || (S = anObject$2(C)[SPECIES$3]) == undefined ? defaultConstructor : aFunction$2(S);
};

var userAgent$1 = engineUserAgent;

var engineIsIos = /(?:iphone|ipod|ipad).*applewebkit/i.test(userAgent$1);

var classof$1 = classofRaw$1;
var global$5 = global$i;

var engineIsNode = classof$1(global$5.process) == 'process';

var global$4 = global$i;
var fails$2 = fails$d;
var bind$2 = functionBindContext;
var html = html$2;
var createElement = documentCreateElement$1;
var IS_IOS$1 = engineIsIos;
var IS_NODE$2 = engineIsNode;

var location = global$4.location;
var set = global$4.setImmediate;
var clear = global$4.clearImmediate;
var process$3 = global$4.process;
var MessageChannel = global$4.MessageChannel;
var Dispatch = global$4.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;

var run = function (id) {
  // eslint-disable-next-line no-prototype-builtins -- safe
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global$4.postMessage(id + '', location.protocol + '//' + location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func -- spec requirement
      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (IS_NODE$2) {
    defer = function (id) {
      process$3.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS$1) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind$2(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global$4.addEventListener &&
    typeof postMessage == 'function' &&
    !global$4.importScripts &&
    location && location.protocol !== 'file:' &&
    !fails$2(post)
  ) {
    defer = post;
    global$4.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

var task$1 = {
  set: set,
  clear: clear
};

var userAgent = engineUserAgent;

var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent);

var global$3 = global$i;
var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
var macrotask = task$1.set;
var IS_IOS = engineIsIos;
var IS_WEBOS_WEBKIT = engineIsWebosWebkit;
var IS_NODE$1 = engineIsNode;

var MutationObserver$1 = global$3.MutationObserver || global$3.WebKitMutationObserver;
var document$2 = global$3.document;
var process$2 = global$3.process;
var Promise$1 = global$3.Promise;
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global$3, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify$1, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE$1 && (parent = process$2.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify$1();
        else last = undefined;
        throw error;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
  if (!IS_IOS && !IS_NODE$1 && !IS_WEBOS_WEBKIT && MutationObserver$1 && document$2) {
    toggle = true;
    node = document$2.createTextNode('');
    new MutationObserver$1(flush).observe(node, { characterData: true });
    notify$1 = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise$1 && Promise$1.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise$1.resolve(undefined);
    // workaround of WebKit ~ iOS Safari 10.1 bug
    promise.constructor = Promise$1;
    then = promise.then;
    notify$1 = function () {
      then.call(promise, flush);
    };
  // Node.js without promises
  } else if (IS_NODE$1) {
    notify$1 = function () {
      process$2.nextTick(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify$1 = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global$3, flush);
    };
  }
}

var microtask$1 = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify$1();
  } last = task;
};

var newPromiseCapability$2 = {};

var aFunction$1 = aFunction$4;

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction$1(resolve);
  this.reject = aFunction$1(reject);
};

// `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability
newPromiseCapability$2.f = function (C) {
  return new PromiseCapability(C);
};

var anObject$1 = anObject$c;
var isObject$3 = isObject$9;
var newPromiseCapability$1 = newPromiseCapability$2;

var promiseResolve$1 = function (C, x) {
  anObject$1(C);
  if (isObject$3(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability$1.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

var global$2 = global$i;

var hostReportErrors$1 = function (a, b) {
  var console = global$2.console;
  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};

var perform$1 = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};

var engineIsBrowser = typeof window == 'object';

var $$2 = _export;
var global$1 = global$i;
var getBuiltIn = getBuiltIn$5;
var NativePromise = nativePromiseConstructor;
var redefine = redefine$5.exports;
var redefineAll = redefineAll$1;
var setPrototypeOf = objectSetPrototypeOf;
var setToStringTag = setToStringTag$1;
var setSpecies = setSpecies$1;
var isObject$2 = isObject$9;
var aFunction = aFunction$4;
var anInstance = anInstance$1;
var inspectSource = inspectSource$3;
var iterate = iterate$1;
var checkCorrectnessOfIteration = checkCorrectnessOfIteration$1;
var speciesConstructor = speciesConstructor$1;
var task = task$1.set;
var microtask = microtask$1;
var promiseResolve = promiseResolve$1;
var hostReportErrors = hostReportErrors$1;
var newPromiseCapabilityModule = newPromiseCapability$2;
var perform = perform$1;
var InternalStateModule = internalState;
var isForced = isForced_1;
var wellKnownSymbol$2 = wellKnownSymbol$d;
var IS_BROWSER = engineIsBrowser;
var IS_NODE = engineIsNode;
var V8_VERSION$1 = engineV8Version;

var SPECIES$2 = wellKnownSymbol$2('species');
var PROMISE = 'Promise';
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var NativePromisePrototype = NativePromise && NativePromise.prototype;
var PromiseConstructor = NativePromise;
var PromiseConstructorPrototype = NativePromisePrototype;
var TypeError$1 = global$1.TypeError;
var document$1 = global$1.document;
var process$1 = global$1.process;
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;
var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global$1.dispatchEvent);
var NATIVE_REJECTION_EVENT = typeof PromiseRejectionEvent == 'function';
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var SUBCLASSING = false;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

var FORCED = isForced(PROMISE, function () {
  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(PromiseConstructor);
  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(PromiseConstructor);
  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
  // We can't detect it synchronously, so just check versions
  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION$1 === 66) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (V8_VERSION$1 >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) return false;
  // Detect correctness of subclassing with @@species support
  var promise = new PromiseConstructor(function (resolve) { resolve(1); });
  var FakePromise = function (exec) {
    exec(function () { /* empty */ }, function () { /* empty */ });
  };
  var constructor = promise.constructor = {};
  constructor[SPECIES$2] = FakePromise;
  SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
  if (!SUBCLASSING) return true;
  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
  return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_REJECTION_EVENT;
});

var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
});

// helpers
var isThenable = function (it) {
  var then;
  return isObject$2(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify = function (state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask(function () {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var index = 0;
    // variable length - can't use forEach
    while (chain.length > index) {
      var reaction = chain[index++];
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(state);
            state.rejection = HANDLED;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // can throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError$1('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    }
    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document$1.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global$1.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (!NATIVE_REJECTION_EVENT && (handler = global$1['on' + name])) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (state) {
  task.call(global$1, function () {
    var promise = state.facade;
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process$1.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (state) {
  task.call(global$1, function () {
    var promise = state.facade;
    if (IS_NODE) {
      process$1.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind$1 = function (fn, state, unwrap) {
  return function (value) {
    fn(state, value, unwrap);
  };
};

var internalReject = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(state, true);
};

var internalResolve = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (state.facade === value) throw TypeError$1("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          then.call(value,
            bind$1(internalResolve, wrapper, state),
            bind$1(internalReject, wrapper, state)
          );
        } catch (error) {
          internalReject(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(state, false);
    }
  } catch (error) {
    internalReject({ done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromiseConstructor, PROMISE);
    aFunction(executor);
    Internal.call(this);
    var state = getInternalState(this);
    try {
      executor(bind$1(internalResolve, state), bind$1(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };
  PromiseConstructorPrototype = PromiseConstructor.prototype;
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };
  Internal.prototype = redefineAll(PromiseConstructorPrototype, {
    // `Promise.prototype.then` method
    // https://tc39.es/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = IS_NODE ? process$1.domain : undefined;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING) notify(state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.es/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState(promise);
    this.promise = promise;
    this.resolve = bind$1(internalResolve, state);
    this.reject = bind$1(internalReject, state);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (typeof NativePromise == 'function' && NativePromisePrototype !== Object.prototype) {
    nativeThen = NativePromisePrototype.then;

    if (!SUBCLASSING) {
      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
      redefine(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor(function (resolve, reject) {
          nativeThen.call(that, resolve, reject);
        }).then(onFulfilled, onRejected);
      // https://github.com/zloirock/core-js/issues/640
      }, { unsafe: true });

      // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
      redefine(NativePromisePrototype, 'catch', PromiseConstructorPrototype['catch'], { unsafe: true });
    }

    // make `.constructor === Promise` work for native promise-based APIs
    try {
      delete NativePromisePrototype.constructor;
    } catch (error) { /* empty */ }

    // make `instanceof Promise` work for native promise-based APIs
    if (setPrototypeOf) {
      setPrototypeOf(NativePromisePrototype, PromiseConstructorPrototype);
    }
  }
}

$$2({ global: true, wrap: true, forced: FORCED }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false);
setSpecies(PROMISE);

PromiseWrapper = getBuiltIn(PROMISE);

// statics
$$2({ target: PROMISE, stat: true, forced: FORCED }, {
  // `Promise.reject` method
  // https://tc39.es/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});

$$2({ target: PROMISE, stat: true, forced: FORCED }, {
  // `Promise.resolve` method
  // https://tc39.es/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve(this, x);
  }
});

$$2({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
  // `Promise.all` method
  // https://tc39.es/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        $promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.es/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      iterate(iterable, function (promise) {
        $promiseResolve.call(C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

var getVimeoThumbnailUrlByVideoId = videoProviderUtils.getVimeoThumbnailUrlByVideoId,
    getVimeoVideoIdFromUrl = videoProviderUtils.getVimeoVideoIdFromUrl,
    getYoutubeThumbnailUrlByVideoId = videoProviderUtils.getYoutubeThumbnailUrlByVideoId,
    getYoutubeVideoIdFromUrl = videoProviderUtils.getYoutubeVideoIdFromUrl,
    isVimeoUrl = videoProviderUtils.isVimeoUrl,
    isYoutubeUrl = videoProviderUtils.isYoutubeUrl;
var dispatch = data$2.dispatch;
/**
 * @param videoId
 * @param props
 */

var setYoutubeThumbnailUrl = function setYoutubeThumbnailUrl(videoId, props) {
  var setAttributes = props.setAttributes;
  setAttributes({
    providerThumbnailUrl: getYoutubeThumbnailUrlByVideoId(videoId)
  });
};
/**
 * @param videoId
 * @param props
 */

var setVimeoThumbnailUrl = function setVimeoThumbnailUrl(videoId, props) {
  var setAttributes = props.setAttributes,
      setState = props.setState;
  setState({
    isLoading: true
  });
  getVimeoThumbnailUrlByVideoId(videoId).then(function (mediaURL) {
    if (mediaURL) {
      setAttributes({
        providerThumbnailUrl: mediaURL
      });
    }

    setState({
      isLoading: false
    });
  });
};
/**
 * @param videoUrl
 * @param props
 */

var checkForThumbnailImage = function checkForThumbnailImage(videoUrl, props) {
  var mediaID = props.attributes.mediaID,
      setState = props.setState;

  if (!mediaID) {
    setState({
      isLoading: true
    });

    if (isYoutubeUrl(videoUrl)) {
      var videoId = getYoutubeVideoIdFromUrl(videoUrl);
      setYoutubeThumbnailUrl(videoId, props);
      setState({
        isLoading: false
      });
    } else if (isVimeoUrl(videoUrl)) {
      var _videoId = getVimeoVideoIdFromUrl(videoUrl);

      setVimeoThumbnailUrl(_videoId, props);
    } else {
      setState({
        isLoading: false
      });
    }
  }
};
/**
 * @param videoUrl
 * @param props
 */

var onVideoUrlChanged = function onVideoUrlChanged(videoUrl, props) {
  var setAttributes = props.setAttributes,
      setState = props.setState;
  setState({
    isLoading: true
  });

  if (isYoutubeUrl(videoUrl)) {
    var videoId = getYoutubeVideoIdFromUrl(videoUrl);
    setYoutubeThumbnailUrl(videoId, props); // setAttributes({
    //     videoUrl: videoUrl,
    // });
    // setState({ isLoading: false });
  } else if (isVimeoUrl(videoUrl)) {
    var _videoId2 = getVimeoVideoIdFromUrl(videoUrl);

    setVimeoThumbnailUrl(_videoId2, props); // setAttributes({
    //     videoUrl: videoUrl,
    // });
  } else {
    dispatch('core/notices').createWarningNotice('Could not identify video provider. This URL might not work as expected.', {
      id: 'videoIdentificationFailure',
      isDismissible: true
    });
  }

  setAttributes({
    videoUrl: videoUrl
  });
  setState({
    isLoading: false
  });
};
function convertYoutubeToNoCookieDomain(videoUrl) {
  if (isYoutubeUrl(videoUrl)) {
    var regex = /([^w.]*)((www\.)?\.?youtube\.com)(.*)/;
    videoUrl = videoUrl.replace(regex, '$1www.youtube-nocookie.com$4');
  }

  return videoUrl;
}
function sideloadProviderImage(props) {
  var providerThumbnailUrl = props.attributes.providerThumbnailUrl,
      setAttributes = props.setAttributes,
      setState = props.setState;
  setState({
    isLoading: true
  });
  fetch("".concat(editorData.restCustomUrl, "/sideload"), {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-WP-Nonce': editorData.restApiNonce || ''
    },
    body: JSON.stringify({
      imageUrl: providerThumbnailUrl
    })
  }).then(function (res) {
    return res.json();
  }).then(function (result) {
    if (result.mediaId && result.mediaUrl) {
      setAttributes({
        mediaID: result.mediaId,
        mediaURL: result.mediaUrl
      });
    } else {
      throw 'Image sideload failed. Please check the URL is valid and links directly to a proper image file and retry.';
    }
  })["catch"](function (e) {
    dispatch('core/notices').createWarningNotice(e.toUpperCase ? e : JSON.stringify(e), {
      id: 'videoSideloadFailure',
      isDismissible: true
    });
  }).then(function () {
    setState({
      isLoading: false
    });
  });
}

var save20210310 = (function (props) {
  var _props$attributes = props.attributes,
      mediaAltText = _props$attributes.mediaAltText,
      mediaID = _props$attributes.mediaID,
      mediaURL = _props$attributes.mediaURL,
      videoUrl = _props$attributes.videoUrl;
  var isYoutube = videoProviderUtils.isYoutubeUrl(videoUrl);
  return /*#__PURE__*/React.createElement("div", {
    className: "ghwp-video"
  }, /*#__PURE__*/React.createElement("a", {
    className: "ghwp-video-link",
    "data-ghwp-src": isYoutube ? convertYoutubeToNoCookieDomain(videoUrl) : videoUrl
  }, /*#__PURE__*/React.createElement("img", {
    width: "480",
    height: "270",
    src: mediaURL,
    alt: mediaAltText,
    className: classnames('ghwp-video__thumb', _defineProperty$1({}, "wp-image-".concat(mediaID), mediaID))
  }), /*#__PURE__*/React.createElement(PlayCircle, null)));
});

var attributes20210310 = {
  mediaURL: {
    type: 'string',
    "default": null,
    selector: 'img',
    attribute: 'src'
  },
  mediaID: {
    type: 'number'
  },
  mediaAltText: {
    type: 'string'
  },
  videoUrl: {
    type: 'string',
    selector: 'a',
    attribute: 'href'
  },
  videoUrlInput: {
    type: 'string'
  },
  providerThumbnailUrl: {
    type: 'string'
  }
};

var deprecated = [
/* 2021-03-10: PHP-rendering and UC third-party consent / GDPR */
{
  save: save20210310,
  attributes: attributes20210310
},
/* 2021-01-29: nocookie-domains for youtube */
{
  save: save20210129,
  attributes20210129: attributes20210129,
  migrate: function migrate(attributes) {
    return attributes;
  }
}];

// `SameValue` abstract operation
// https://tc39.es/ecma262/#sec-samevalue
// eslint-disable-next-line es/no-object-is -- safe
var sameValue$1 = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare -- NaN check
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
var anObject = anObject$c;
var requireObjectCoercible = requireObjectCoercible$5;
var sameValue = sameValue$1;
var regExpExec = regexpExecAbstract;

// @@search logic
fixRegExpWellKnownSymbolLogic('search', function (SEARCH, nativeSearch, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.es/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = requireObjectCoercible(this);
      var searcher = regexp == undefined ? undefined : regexp[SEARCH];
      return searcher !== undefined ? searcher.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@search
    function (string) {
      var res = maybeCallNative(nativeSearch, this, string);
      if (res.done) return res.value;

      var rx = anObject(this);
      var S = String(string);

      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regExpExec(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});

var classof = classofRaw$1;

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
var isArray$1 = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};

var isObject$1 = isObject$9;
var isArray = isArray$1;
var wellKnownSymbol$1 = wellKnownSymbol$d;

var SPECIES$1 = wellKnownSymbol$1('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
var arraySpeciesCreate$1 = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject$1(C)) {
      C = C[SPECIES$1];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};

var bind = functionBindContext;
var IndexedObject = indexedObject;
var toObject$1 = toObject$4;
var toLength = toLength$4;
var arraySpeciesCreate = arraySpeciesCreate$1;

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_OUT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject$1($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push.call(target, value); // filterOut
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterOut` method
  // https://github.com/tc39/proposal-array-filtering
  filterOut: createMethod(7)
};

var fails$1 = fails$d;
var wellKnownSymbol = wellKnownSymbol$d;
var V8_VERSION = engineV8Version;

var SPECIES = wellKnownSymbol('species');

var arrayMethodHasSpeciesSupport$1 = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails$1(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

var $$1 = _export;
var $map = arrayIteration.map;
var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$1;

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');

// `Array.prototype.map` method
// https://tc39.es/ecma262/#sec-array.prototype.map
// with adding support of @@species
$$1({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var $ = _export;
var toObject = toObject$4;
var nativeKeys = objectKeys$1;
var fails = fails$d;

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});

/* global editorData */
function getEmbedTypeOptions() {
  if (editorData && editorData.embedTypes) {
    return Object.keys(editorData.embedTypes).map(function (embedType) {
      return {
        label: editorData.embedTypes[embedType].displayName || embedType,
        value: embedType
      };
    });
  } else {
    return null;
  }
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

/** Built-in value references. */
var Symbol$1 = root.Symbol;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto$1.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

var URLInput = blockEditor.URLInput;
var BaseControl = components.BaseControl;
var __$2 = i18n.__;
var VideoSearch = function VideoSearch(props) {
  var search = props.search,
      setState = props.setState;
  var onVideoUrlChangedDebounced = debounce(onVideoUrlChanged, 1000);
  return /*#__PURE__*/React.createElement(BaseControl, {
    className: "editor-url-input block-editor-url-input is-full-width has-border"
  }, /*#__PURE__*/React.createElement(URLInput, {
    label: __$2('Video URL', 'ghwp'),
    value: search,
    onChange: function onChange(videoUrl) {
      setState({
        search: videoUrl
      });
      onVideoUrlChangedDebounced(videoUrl, props);
    }
  }));
};

var Button = components.Button,
    Icon = components.Icon,
    Placeholder = components.Placeholder,
    Popover = components.Popover,
    SelectControl = components.SelectControl;
var withState = compose.withState;
var __$1 = i18n.__;

var HelpPopoverContent = function HelpPopoverContent() {
  return /*#__PURE__*/React.createElement("div", {
    className: "ghwp-editor-help"
  }, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("h6", null, __$1('Retry getting original thumbnail', 'ghwp'), " /", ' ', __$1('Try to get the original thumbnail', 'ghwp')), /*#__PURE__*/React.createElement("p", null, "Attempts to retrieve the thumbnail image from the Video provider (Youtube / Vimeo). You will see a preview of that image above the button.")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("h6", null, __$1('Sideload the provider image', 'ghwp')), /*#__PURE__*/React.createElement("p", null, "Will save the thumbnail retrieved from the video provider to the local media library and set it as the video block's thumbnail image.")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("h6", null, __$1('Change thumbnail image', 'ghwp')), /*#__PURE__*/React.createElement("p", null, "Allows you to pick an existing image or upload an image to use as the thumbnail picture for the video block."))));
};

var VideoEditSettings = function VideoEditSettings(props) {
  var _props$attributes = props.attributes,
      providerThumbnailUrl = _props$attributes.providerThumbnailUrl,
      videoUrl = _props$attributes.videoUrl,
      helpVisible = props.helpVisible,
      isSelected = props.isSelected,
      setState = props.setState;
  return /*#__PURE__*/React.createElement("div", {
    className: classnames('ghwp-video-edit__settings', {
      'ghwp-video-edit__settings--active': isSelected
    })
  }, isSelected && /*#__PURE__*/React.createElement(React.Fragment, null, providerThumbnailUrl && /*#__PURE__*/React.createElement("img", {
    width: "120",
    height: "auto",
    src: providerThumbnailUrl,
    alt: "Provider Thumbnail",
    className: "ghwp-video-edit__provider-thumb"
  }), /*#__PURE__*/React.createElement(Button, {
    isPrimary: true,
    onClick: function onClick() {
      videoUrl && checkForThumbnailImage(videoUrl, props);
    }
  }, __$1(providerThumbnailUrl ? 'Retry getting original thumbnail' : 'Try to get the original thumbnail', 'ghwp')), providerThumbnailUrl && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
    isPrimary: true,
    onClick: function onClick() {
      return sideloadProviderImage(props);
    }
  }, __$1('Sideload the provider image', 'ghwp'))), /*#__PURE__*/React.createElement(ImageSelect, _extends({
    buttonLabel: "Select thumbnail",
    buttonChangeLabel: "Change thumbnail image"
  }, props)), /*#__PURE__*/React.createElement("span", {
    className: "help"
  }, /*#__PURE__*/React.createElement(Button, {
    isSecondary: true,
    onClick: function onClick() {
      setState({
        helpVisible: true
      });
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    icon: "editor-help"
  })), helpVisible && /*#__PURE__*/React.createElement(Popover, {
    onClose: function onClose() {
      setState({
        helpVisible: false
      });
    }
  }, /*#__PURE__*/React.createElement(HelpPopoverContent, null)))));
};

var Edit = function Edit(props) {
  var _props$attributes2 = props.attributes,
      mediaAltText = _props$attributes2.mediaAltText,
      mediaURL = _props$attributes2.mediaURL,
      providerType = _props$attributes2.providerType,
      videoUrl = _props$attributes2.videoUrl,
      isLoading = props.isLoading,
      isSelected = props.isSelected,
      search = props.search,
      setAttributes = props.setAttributes,
      setState = props.setState;

  if (!search && videoUrl) {
    setState({
      search: videoUrl
    });
  }

  var embedTypeOptions = getEmbedTypeOptions();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "ghwp-video-edit"
  }, isLoading && /*#__PURE__*/React.createElement(SpinnerOverlay, null), videoUrl ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "ghwp-video"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ghwp-video-link"
  }, /*#__PURE__*/React.createElement("img", {
    width: "480",
    height: "270",
    src: mediaURL,
    alt: mediaAltText
  }), /*#__PURE__*/React.createElement(PlayCircle, null))), /*#__PURE__*/React.createElement(VideoEditSettings, props), /*#__PURE__*/React.createElement("div", {
    className: classnames('ghwp-video-edit__search', {
      'ghwp-video-edit__search--active': isSelected
    })
  }, isSelected && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(VideoSearch, props), embedTypeOptions && /*#__PURE__*/React.createElement(SelectControl, {
    label: __$1('Consent Typ'),
    value: providerType,
    options: embedTypeOptions,
    onChange: function onChange(providerType) {
      setAttributes({
        providerType: providerType
      });
    }
  })))) : /*#__PURE__*/React.createElement(Placeholder, null, /*#__PURE__*/React.createElement(VideoSearch, props), embedTypeOptions && /*#__PURE__*/React.createElement(SelectControl, {
    label: __$1('Consent Typ'),
    value: providerType,
    options: embedTypeOptions,
    onChange: function onChange(providerType) {
      setAttributes({
        providerType: providerType
      });
    }
  }))));
};

var edit = withState({
  search: '',
  isLoading: false,
  helpVisible: false
})(Edit);

var save = function save() {
  return null;
};

var registerBlockType = blocks.registerBlockType;
var __ = i18n.__;
var VideoOverlayIcon = materialDesignIcons.QueuePlayNext;
function register() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$attributes = options.attributes,
      attributes$1 = _options$attributes === void 0 ? attributes : _options$attributes,
      _options$edit = options.edit,
      edit$1 = _options$edit === void 0 ? edit : _options$edit,
      _options$save = options.save,
      save$1 = _options$save === void 0 ? save : _options$save,
      _options$styles = options.styles,
      styles = _options$styles === void 0 ? [] : _options$styles,
      _options$deprecated = options.deprecated,
      deprecated$1 = _options$deprecated === void 0 ? deprecated : _options$deprecated,
      _options$icon = options.icon,
      icon = _options$icon === void 0 ? /*#__PURE__*/React.createElement(VideoOverlayIcon, null) : _options$icon,
      _options$category = options.category,
      category = _options$category === void 0 ? 'layout' : _options$category,
      _options$supports = options.supports,
      supports = _options$supports === void 0 ? {
    anchor: true
  } : _options$supports;
  registerBlockType('ghwp/video-overlay', {
    title: __('Video Thumbnail & Overlay', 'ghwp'),
    icon: icon,
    description: __('A video thumbnail with a play button opening a video overlay', 'ghwp'),
    styles: styles,
    category: category,
    attributes: attributes$1,
    supports: supports,
    edit: edit$1,
    save: save$1,
    deprecated: deprecated$1
  });
}

export { attributes, edit, register, save };
