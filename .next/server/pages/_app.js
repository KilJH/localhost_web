module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ ({

/***/ "../next-server/lib/utils":
/*!*****************************************************!*\
  !*** external "next/dist/next-server/lib/utils.js" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"next/dist/next-server/lib/utils.js\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXh0L2Rpc3QvbmV4dC1zZXJ2ZXIvbGliL3V0aWxzLmpzXCI/MzI2ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiIuLi9uZXh0LXNlcnZlci9saWIvdXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3QvbmV4dC1zZXJ2ZXIvbGliL3V0aWxzLmpzXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///../next-server/lib/utils\n");

/***/ }),

/***/ "./client/styles/reset.ts":
/*!********************************!*\
  !*** ./client/styles/reset.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);\n// import reset from \"./reset.css\";\n\nconst GlobalStyle = styled_components__WEBPACK_IMPORTED_MODULE_0__[\"createGlobalStyle\"]`\n  * {\n    /* box-sizing: border-box; */\n    }\n  body{\n    font-family: -apple-system,system-ui,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif !important;\n    margin: 0;\n  }\n  a {\n    color: inherit;\n    text-decoration: none;\n  }\n  input, button {\n    background-color: transparent;\n    padding: .5rem;\n    border: 1px solid #aaaaaa;\n    border-radius: .25rem;\n    outline: none;\n    box-sizing: border-box;\n    font-size: 0.8em;\n  }\n  h1, h2, h3, h4, h5, h6{\n    font-family:'Maven Pro', sans-serif;\n  }\n  button{\n    cursor: pointer;\n  }\n  button:hover{\n    background-color: linear-gradient(#ffffff,#aaaaaa)\n  }\n  input:disabled{\n    background-color: #e5e7e9;\n  }\n\n  @media only screen and (max-width: 768px) {\n    body {\n      font-size: 14px;\n    }\n  }\n\n  @media only screen and (max-width: 576px) {\n    body {\n      font-size: 12px;\n    }\n  }\n`;\n/* harmony default export */ __webpack_exports__[\"default\"] = (GlobalStyle);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jbGllbnQvc3R5bGVzL3Jlc2V0LnRzP2U4MDciXSwibmFtZXMiOlsiR2xvYmFsU3R5bGUiLCJjcmVhdGVHbG9iYWxTdHlsZSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUVBLE1BQU1BLFdBQVcsR0FBR0MsbUVBQWtCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQTdDQTtBQStDZUQsMEVBQWYiLCJmaWxlIjoiLi9jbGllbnQvc3R5bGVzL3Jlc2V0LnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IHJlc2V0IGZyb20gXCIuL3Jlc2V0LmNzc1wiO1xuaW1wb3J0IHsgY3JlYXRlR2xvYmFsU3R5bGUgfSBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmNvbnN0IEdsb2JhbFN0eWxlID0gY3JlYXRlR2xvYmFsU3R5bGVgXG4gICoge1xuICAgIC8qIGJveC1zaXppbmc6IGJvcmRlci1ib3g7ICovXG4gICAgfVxuICBib2R5e1xuICAgIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLHN5c3RlbS11aSxCbGlua01hY1N5c3RlbUZvbnQsXCJTZWdvZSBVSVwiLFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsQXJpYWwsc2Fucy1zZXJpZiAhaW1wb3J0YW50O1xuICAgIG1hcmdpbjogMDtcbiAgfVxuICBhIHtcbiAgICBjb2xvcjogaW5oZXJpdDtcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIH1cbiAgaW5wdXQsIGJ1dHRvbiB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgcGFkZGluZzogLjVyZW07XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2FhYWFhYTtcbiAgICBib3JkZXItcmFkaXVzOiAuMjVyZW07XG4gICAgb3V0bGluZTogbm9uZTtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIGZvbnQtc2l6ZTogMC44ZW07XG4gIH1cbiAgaDEsIGgyLCBoMywgaDQsIGg1LCBoNntcbiAgICBmb250LWZhbWlseTonTWF2ZW4gUHJvJywgc2Fucy1zZXJpZjtcbiAgfVxuICBidXR0b257XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICB9XG4gIGJ1dHRvbjpob3ZlcntcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBsaW5lYXItZ3JhZGllbnQoI2ZmZmZmZiwjYWFhYWFhKVxuICB9XG4gIGlucHV0OmRpc2FibGVke1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNlNWU3ZTk7XG4gIH1cblxuICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gICAgYm9keSB7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgfVxuICB9XG5cbiAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA1NzZweCkge1xuICAgIGJvZHkge1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgIH1cbiAgfVxuYDtcblxuZXhwb3J0IGRlZmF1bHQgR2xvYmFsU3R5bGU7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./client/styles/reset.ts\n");

/***/ }),

/***/ "./client/utils/url.ts":
/*!*****************************!*\
  !*** ./client/utils/url.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// const SERVER = 'http://localhost:5000';\nconst SERVER = 'http://localhost:3000'; // const SERVER =\n// \t'http://ec2-13-124-129-55.ap-northeast-2.compute.amazonaws.com:5000';\n// const SERVER = 'http://13.124.129.55:5000';\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (SERVER);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMvdXJsLnRzPzM2OTUiXSwibmFtZXMiOlsiU0VSVkVSIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQ0EsTUFBTUEsTUFBTSxHQUFHLHVCQUFmLEMsQ0FDQTtBQUNBO0FBQ0E7O0FBRWVBLHFFQUFmIiwiZmlsZSI6Ii4vY2xpZW50L3V0aWxzL3VybC50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGNvbnN0IFNFUlZFUiA9ICdodHRwOi8vbG9jYWxob3N0OjUwMDAnO1xuY29uc3QgU0VSVkVSID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCc7XG4vLyBjb25zdCBTRVJWRVIgPVxuLy8gXHQnaHR0cDovL2VjMi0xMy0xMjQtMTI5LTU1LmFwLW5vcnRoZWFzdC0yLmNvbXB1dGUuYW1hem9uYXdzLmNvbTo1MDAwJztcbi8vIGNvbnN0IFNFUlZFUiA9ICdodHRwOi8vMTMuMTI0LjEyOS41NTo1MDAwJztcblxuZXhwb3J0IGRlZmF1bHQgU0VSVkVSO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./client/utils/url.ts\n");

/***/ }),

/***/ "./context/scroll.js":
/*!***************************!*\
  !*** ./context/scroll.js ***!
  \***************************/
/*! exports provided: ScrollProvider, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ScrollProvider\", function() { return ScrollProvider; });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\nvar _jsxFileName = \"/Users/zknock/Develop/localhost_web/context/scroll.js\";\n\nconst ScrollContext = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_1__[\"createContext\"])({\n  state: {\n    isUp: true\n  },\n  actions: {\n    setIsUp: bool => {}\n  }\n});\n\nconst ScrollProvider = ({\n  children\n}) => {\n  const {\n    0: isUp,\n    1: setIsUp\n  } = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useState\"])(true);\n  const value = {\n    state: {\n      isUp\n    },\n    actions: {\n      setIsUp\n    }\n  };\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(ScrollContext.Provider, {\n    value: value,\n    children: children\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 19,\n    columnNumber: 3\n  }, undefined);\n};\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ScrollContext);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb250ZXh0L3Njcm9sbC5qcz9lY2Q0Il0sIm5hbWVzIjpbIlNjcm9sbENvbnRleHQiLCJjcmVhdGVDb250ZXh0Iiwic3RhdGUiLCJpc1VwIiwiYWN0aW9ucyIsInNldElzVXAiLCJib29sIiwiU2Nyb2xsUHJvdmlkZXIiLCJjaGlsZHJlbiIsInVzZVN0YXRlIiwidmFsdWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFFQSxNQUFNQSxhQUFhLGdCQUFHQywyREFBYSxDQUFDO0FBQ25DQyxPQUFLLEVBQUU7QUFBRUMsUUFBSSxFQUFFO0FBQVIsR0FENEI7QUFFbkNDLFNBQU8sRUFBRTtBQUNSQyxXQUFPLEVBQUVDLElBQUksSUFBSSxDQUFFO0FBRFg7QUFGMEIsQ0FBRCxDQUFuQzs7QUFPQSxNQUFNQyxjQUFjLEdBQUcsQ0FBQztBQUFFQztBQUFGLENBQUQsS0FBa0I7QUFDeEMsUUFBTTtBQUFBLE9BQUNMLElBQUQ7QUFBQSxPQUFPRTtBQUFQLE1BQWtCSSxzREFBUSxDQUFDLElBQUQsQ0FBaEM7QUFFQSxRQUFNQyxLQUFLLEdBQUc7QUFDYlIsU0FBSyxFQUFFO0FBQUVDO0FBQUYsS0FETTtBQUViQyxXQUFPLEVBQUU7QUFBRUM7QUFBRjtBQUZJLEdBQWQ7QUFLQSxzQkFDQyxxRUFBQyxhQUFELENBQWUsUUFBZjtBQUF3QixTQUFLLEVBQUVLLEtBQS9CO0FBQUEsY0FBdUNGO0FBQXZDO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFERDtBQUdBLENBWEQ7O0FBYUE7QUFFZVIsNEVBQWYiLCJmaWxlIjoiLi9jb250ZXh0L3Njcm9sbC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBjcmVhdGVDb250ZXh0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuY29uc3QgU2Nyb2xsQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQoe1xuXHRzdGF0ZTogeyBpc1VwOiB0cnVlIH0sXG5cdGFjdGlvbnM6IHtcblx0XHRzZXRJc1VwOiBib29sID0+IHt9LFxuXHR9LFxufSk7XG5cbmNvbnN0IFNjcm9sbFByb3ZpZGVyID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xuXHRjb25zdCBbaXNVcCwgc2V0SXNVcF0gPSB1c2VTdGF0ZSh0cnVlKTtcblxuXHRjb25zdCB2YWx1ZSA9IHtcblx0XHRzdGF0ZTogeyBpc1VwIH0sXG5cdFx0YWN0aW9uczogeyBzZXRJc1VwIH0sXG5cdH07XG5cblx0cmV0dXJuIChcblx0XHQ8U2Nyb2xsQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17dmFsdWV9PntjaGlsZHJlbn08L1Njcm9sbENvbnRleHQuUHJvdmlkZXI+XG5cdCk7XG59O1xuXG5leHBvcnQgeyBTY3JvbGxQcm92aWRlciB9O1xuXG5leHBvcnQgZGVmYXVsdCBTY3JvbGxDb250ZXh0O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./context/scroll.js\n");

/***/ }),

/***/ "./context/user.js":
/*!*************************!*\
  !*** ./context/user.js ***!
  \*************************/
/*! exports provided: UserStateContext, UserSetterContext, UserContextProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UserStateContext\", function() { return UserStateContext; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UserSetterContext\", function() { return UserSetterContext; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UserContextProvider\", function() { return UserContextProvider; });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\nvar _jsxFileName = \"/Users/zknock/Develop/localhost_web/context/user.js\";\n\nconst UserStateContext = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_1__[\"createContext\"])({\n  id: 0,\n  email: '',\n  password: '',\n  name: '',\n  nickname: '',\n  phone: '',\n  address: '',\n  photo: ''\n}); // type UserSetter = Dispatch<SetStateAction<User>>;\n\nconst UserSetterContext = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_1__[\"createContext\"])(user => {\n  console.log('setUser() is default');\n});\nconst UserContextProvider = ({\n  value,\n  children\n}) => {\n  const {\n    0: user,\n    1: setUser\n  } = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useState\"])({\n    id: 0,\n    email: '',\n    password: '',\n    name: '',\n    nickname: '',\n    phone: '',\n    address: '',\n    photo: ''\n  });\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(UserSetterContext.Provider, {\n    value: value.setUser || setUser,\n    children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(UserStateContext.Provider, {\n      value: value.user || user,\n      children: children\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 33,\n      columnNumber: 4\n    }, undefined)\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 32,\n    columnNumber: 3\n  }, undefined);\n}; // export const useUserState = () => {\n// \tconst state = useContext(UserStateContext);\n// \treturn state;\n// };\n// export const useUserDispatch = () => {\n// \tconst dispatch = useContext(UserSetterContext);\n// \t// if (!dispatch) throw new Error('UserProvider not found');\n// \treturn dispatch;\n// };//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb250ZXh0L3VzZXIuanM/MTYwNiJdLCJuYW1lcyI6WyJVc2VyU3RhdGVDb250ZXh0IiwiY3JlYXRlQ29udGV4dCIsImlkIiwiZW1haWwiLCJwYXNzd29yZCIsIm5hbWUiLCJuaWNrbmFtZSIsInBob25lIiwiYWRkcmVzcyIsInBob3RvIiwiVXNlclNldHRlckNvbnRleHQiLCJ1c2VyIiwiY29uc29sZSIsImxvZyIsIlVzZXJDb250ZXh0UHJvdmlkZXIiLCJ2YWx1ZSIsImNoaWxkcmVuIiwic2V0VXNlciIsInVzZVN0YXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFFTyxNQUFNQSxnQkFBZ0IsZ0JBQUdDLDJEQUFhLENBQUM7QUFDN0NDLElBQUUsRUFBRSxDQUR5QztBQUU3Q0MsT0FBSyxFQUFFLEVBRnNDO0FBRzdDQyxVQUFRLEVBQUUsRUFIbUM7QUFJN0NDLE1BQUksRUFBRSxFQUp1QztBQUs3Q0MsVUFBUSxFQUFFLEVBTG1DO0FBTTdDQyxPQUFLLEVBQUUsRUFOc0M7QUFPN0NDLFNBQU8sRUFBRSxFQVBvQztBQVE3Q0MsT0FBSyxFQUFFO0FBUnNDLENBQUQsQ0FBdEMsQyxDQVdQOztBQUVPLE1BQU1DLGlCQUFpQixnQkFBR1QsMkRBQWEsQ0FBQ1UsSUFBSSxJQUFJO0FBQ3REQyxTQUFPLENBQUNDLEdBQVIsQ0FBWSxzQkFBWjtBQUNBLENBRjZDLENBQXZDO0FBSUEsTUFBTUMsbUJBQW1CLEdBQUcsQ0FBQztBQUFFQyxPQUFGO0FBQVNDO0FBQVQsQ0FBRCxLQUF5QjtBQUMzRCxRQUFNO0FBQUEsT0FBQ0wsSUFBRDtBQUFBLE9BQU9NO0FBQVAsTUFBa0JDLHNEQUFRLENBQUM7QUFDaENoQixNQUFFLEVBQUUsQ0FENEI7QUFFaENDLFNBQUssRUFBRSxFQUZ5QjtBQUdoQ0MsWUFBUSxFQUFFLEVBSHNCO0FBSWhDQyxRQUFJLEVBQUUsRUFKMEI7QUFLaENDLFlBQVEsRUFBRSxFQUxzQjtBQU1oQ0MsU0FBSyxFQUFFLEVBTnlCO0FBT2hDQyxXQUFPLEVBQUUsRUFQdUI7QUFRaENDLFNBQUssRUFBRTtBQVJ5QixHQUFELENBQWhDO0FBVUEsc0JBQ0MscUVBQUMsaUJBQUQsQ0FBbUIsUUFBbkI7QUFBNEIsU0FBSyxFQUFFTSxLQUFLLENBQUNFLE9BQU4sSUFBaUJBLE9BQXBEO0FBQUEsMkJBQ0MscUVBQUMsZ0JBQUQsQ0FBa0IsUUFBbEI7QUFBMkIsV0FBSyxFQUFFRixLQUFLLENBQUNKLElBQU4sSUFBY0EsSUFBaEQ7QUFBQSxnQkFDRUs7QUFERjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUREO0FBT0EsQ0FsQk0sQyxDQW9CUDtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiLi9jb250ZXh0L3VzZXIuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgY3JlYXRlQ29udGV4dCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBjb25zdCBVc2VyU3RhdGVDb250ZXh0ID0gY3JlYXRlQ29udGV4dCh7XG5cdGlkOiAwLFxuXHRlbWFpbDogJycsXG5cdHBhc3N3b3JkOiAnJyxcblx0bmFtZTogJycsXG5cdG5pY2tuYW1lOiAnJyxcblx0cGhvbmU6ICcnLFxuXHRhZGRyZXNzOiAnJyxcblx0cGhvdG86ICcnLFxufSk7XG5cbi8vIHR5cGUgVXNlclNldHRlciA9IERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPFVzZXI+PjtcblxuZXhwb3J0IGNvbnN0IFVzZXJTZXR0ZXJDb250ZXh0ID0gY3JlYXRlQ29udGV4dCh1c2VyID0+IHtcblx0Y29uc29sZS5sb2coJ3NldFVzZXIoKSBpcyBkZWZhdWx0Jyk7XG59KTtcblxuZXhwb3J0IGNvbnN0IFVzZXJDb250ZXh0UHJvdmlkZXIgPSAoeyB2YWx1ZSwgY2hpbGRyZW4gfSkgPT4ge1xuXHRjb25zdCBbdXNlciwgc2V0VXNlcl0gPSB1c2VTdGF0ZSh7XG5cdFx0aWQ6IDAsXG5cdFx0ZW1haWw6ICcnLFxuXHRcdHBhc3N3b3JkOiAnJyxcblx0XHRuYW1lOiAnJyxcblx0XHRuaWNrbmFtZTogJycsXG5cdFx0cGhvbmU6ICcnLFxuXHRcdGFkZHJlc3M6ICcnLFxuXHRcdHBob3RvOiAnJyxcblx0fSk7XG5cdHJldHVybiAoXG5cdFx0PFVzZXJTZXR0ZXJDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt2YWx1ZS5zZXRVc2VyIHx8IHNldFVzZXJ9PlxuXHRcdFx0PFVzZXJTdGF0ZUNvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3ZhbHVlLnVzZXIgfHwgdXNlcn0+XG5cdFx0XHRcdHtjaGlsZHJlbn1cblx0XHRcdDwvVXNlclN0YXRlQ29udGV4dC5Qcm92aWRlcj5cblx0XHQ8L1VzZXJTZXR0ZXJDb250ZXh0LlByb3ZpZGVyPlxuXHQpO1xufTtcblxuLy8gZXhwb3J0IGNvbnN0IHVzZVVzZXJTdGF0ZSA9ICgpID0+IHtcbi8vIFx0Y29uc3Qgc3RhdGUgPSB1c2VDb250ZXh0KFVzZXJTdGF0ZUNvbnRleHQpO1xuLy8gXHRyZXR1cm4gc3RhdGU7XG4vLyB9O1xuXG4vLyBleHBvcnQgY29uc3QgdXNlVXNlckRpc3BhdGNoID0gKCkgPT4ge1xuLy8gXHRjb25zdCBkaXNwYXRjaCA9IHVzZUNvbnRleHQoVXNlclNldHRlckNvbnRleHQpO1xuLy8gXHQvLyBpZiAoIWRpc3BhdGNoKSB0aHJvdyBuZXcgRXJyb3IoJ1VzZXJQcm92aWRlciBub3QgZm91bmQnKTtcbi8vIFx0cmV0dXJuIGRpc3BhdGNoO1xuLy8gfTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./context/user.js\n");

/***/ }),

/***/ "./node_modules/next/app.js":
/*!**********************************!*\
  !*** ./node_modules/next/app.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./dist/pages/_app */ \"./node_modules/next/dist/pages/_app.js\")\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmV4dC9hcHAuanM/ZjAxNiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxpQkFBaUIsbUJBQU8sQ0FBQyxpRUFBbUIiLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvbmV4dC9hcHAuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGlzdC9wYWdlcy9fYXBwJylcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/next/app.js\n");

/***/ }),

/***/ "./node_modules/next/dist/pages/_app.js":
/*!**********************************************!*\
  !*** ./node_modules/next/dist/pages/_app.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports.Container = Container;\nexports.createUrl = createUrl;\nexports.default = void 0;\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"react\"));\n\nvar _utils = __webpack_require__(/*! ../next-server/lib/utils */ \"../next-server/lib/utils\");\n\nexports.AppInitialProps = _utils.AppInitialProps;\nexports.NextWebVitalsMetric = _utils.NextWebVitalsMetric;\n/**\n* `App` component is used for initialize of pages. It allows for overwriting and full control of the `page` initialization.\n* This allows for keeping state between navigation, custom error handling, injecting additional data.\n*/\n\nasync function appGetInitialProps({\n  Component,\n  ctx\n}) {\n  const pageProps = await (0, _utils.loadGetInitialProps)(Component, ctx);\n  return {\n    pageProps\n  };\n}\n\nclass App extends _react.default.Component {\n  // Kept here for backwards compatibility.\n  // When someone ended App they could call `super.componentDidCatch`.\n  // @deprecated This method is no longer needed. Errors are caught at the top level\n  componentDidCatch(error, _errorInfo) {\n    throw error;\n  }\n\n  render() {\n    const {\n      router,\n      Component,\n      pageProps,\n      __N_SSG,\n      __N_SSP\n    } = this.props;\n    return /*#__PURE__*/_react.default.createElement(Component, Object.assign({}, pageProps, // we don't add the legacy URL prop if it's using non-legacy\n    // methods like getStaticProps and getServerSideProps\n    !(__N_SSG || __N_SSP) ? {\n      url: createUrl(router)\n    } : {}));\n  }\n\n}\n\nexports.default = App;\nApp.origGetInitialProps = appGetInitialProps;\nApp.getInitialProps = appGetInitialProps;\nlet warnContainer;\nlet warnUrl;\n\nif (true) {\n  warnContainer = (0, _utils.execOnce)(() => {\n    console.warn(`Warning: the \\`Container\\` in \\`_app\\` has been deprecated and should be removed. https://err.sh/vercel/next.js/app-container-deprecated`);\n  });\n  warnUrl = (0, _utils.execOnce)(() => {\n    console.error(`Warning: the 'url' property is deprecated. https://err.sh/vercel/next.js/url-deprecated`);\n  });\n} // @deprecated noop for now until removal\n\n\nfunction Container(p) {\n  if (true) warnContainer();\n  return p.children;\n}\n\nfunction createUrl(router) {\n  // This is to make sure we don't references the router object at call time\n  const {\n    pathname,\n    asPath,\n    query\n  } = router;\n  return {\n    get query() {\n      if (true) warnUrl();\n      return query;\n    },\n\n    get pathname() {\n      if (true) warnUrl();\n      return pathname;\n    },\n\n    get asPath() {\n      if (true) warnUrl();\n      return asPath;\n    },\n\n    back: () => {\n      if (true) warnUrl();\n      router.back();\n    },\n    push: (url, as) => {\n      if (true) warnUrl();\n      return router.push(url, as);\n    },\n    pushTo: (href, as) => {\n      if (true) warnUrl();\n      const pushRoute = as ? href : '';\n      const pushUrl = as || href;\n      return router.push(pushRoute, pushUrl);\n    },\n    replace: (url, as) => {\n      if (true) warnUrl();\n      return router.replace(url, as);\n    },\n    replaceTo: (href, as) => {\n      if (true) warnUrl();\n      const replaceRoute = as ? href : '';\n      const replaceUrl = as || href;\n      return router.replace(replaceRoute, replaceUrl);\n    }\n  };\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vLi4vcGFnZXMvX2FwcC50c3g/MmMzNSJdLCJuYW1lcyI6WyJwYWdlUHJvcHMiLCJSZWFjdCIsIkNvbXBvbmVudCIsImNvbXBvbmVudERpZENhdGNoIiwicmVuZGVyIiwiX19OX1NTRyIsInVybCIsImNyZWF0ZVVybCIsIkFwcCIsIm9yaWdHZXRJbml0aWFsUHJvcHMiLCJhcHBHZXRJbml0aWFsUHJvcHMiLCJnZXRJbml0aWFsUHJvcHMiLCJ3YXJuQ29udGFpbmVyIiwiY29uc29sZSIsIndhcm5VcmwiLCJwIiwiYmFjayIsInJvdXRlciIsInB1c2giLCJwdXNoVG8iLCJwdXNoUm91dGUiLCJhcyIsInB1c2hVcmwiLCJyZXBsYWNlIiwicmVwbGFjZVRvIiwicmVwbGFjZVJvdXRlIiwicmVwbGFjZVVybCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFrQkE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0Esa0NBQWtDO0FBQUE7QUFBbEM7QUFBa0MsQ0FBbEMsRUFHeUM7QUFDdkMsUUFBTUEsU0FBUyxHQUFHLE1BQU0sMkNBQXhCLEdBQXdCLENBQXhCO0FBQ0EsU0FBTztBQUFQO0FBQU8sR0FBUDtBQUdhOztBQUFBLGtCQUEyQ0MsZUFBTUMsU0FBakQsQ0FHYjtBQUlBO0FBQ0E7QUFDQTtBQUNBQyxtQkFBaUIsb0JBQTRDO0FBQzNEO0FBR0ZDOztBQUFBQSxRQUFNLEdBQUc7QUFDUCxVQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBQXFELEtBQTNEO0FBR0Esd0JBQ0UscUVBR0k7QUFDQTtBQUNJLE1BQUVDLE9BQU8sSUFBVCxXQUF3QjtBQUFFQyxTQUFHLEVBQUVDLFNBQVMsQ0FBeEMsTUFBd0M7QUFBaEIsS0FBeEIsR0FOVixFQUNFLEVBREY7QUFmRjs7QUFBQTs7O0FBSG1CQyxHLENBSVpDLG1CQUpZRCxHQUlVRSxrQkFKVkY7QUFBQUEsRyxDQUtaRyxlQUxZSCxHQUtNRSxrQkFMTkY7QUErQnJCO0FBQ0E7O0FBRUEsVUFBMkM7QUFDekNJLGVBQWEsR0FBRyxxQkFBUyxNQUFNO0FBQzdCQyxXQUFPLENBQVBBO0FBREZELEdBQWdCLENBQWhCQTtBQU1BRSxTQUFPLEdBQUcscUJBQVMsTUFBTTtBQUN2QkQsV0FBTyxDQUFQQTtBQURGQyxHQUFVLENBQVZBO0FBT0YsQyxDQUFBOzs7QUFDTyxzQkFBMkI7QUFDaEMsWUFBMkNGLGFBQWE7QUFDeEQsU0FBT0csQ0FBQyxDQUFSO0FBR0s7O0FBQUEsMkJBQW1DO0FBQ3hDO0FBQ0EsUUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BQU47QUFDQSxTQUFPO0FBQ0wsZ0JBQVk7QUFDVixnQkFBMkNELE9BQU87QUFDbEQ7QUFIRzs7QUFLTCxtQkFBZTtBQUNiLGdCQUEyQ0EsT0FBTztBQUNsRDtBQVBHOztBQVNMLGlCQUFhO0FBQ1gsZ0JBQTJDQSxPQUFPO0FBQ2xEO0FBWEc7O0FBYUxFLFFBQUksRUFBRSxNQUFNO0FBQ1YsZ0JBQTJDRixPQUFPO0FBQ2xERyxZQUFNLENBQU5BO0FBZkc7QUFpQkxDLFFBQUksRUFBRSxhQUE4QjtBQUNsQyxnQkFBMkNKLE9BQU87QUFDbEQsYUFBT0csTUFBTSxDQUFOQSxVQUFQLEVBQU9BLENBQVA7QUFuQkc7QUFxQkxFLFVBQU0sRUFBRSxjQUErQjtBQUNyQyxnQkFBMkNMLE9BQU87QUFDbEQsWUFBTU0sU0FBUyxHQUFHQyxFQUFFLFVBQXBCO0FBQ0EsWUFBTUMsT0FBTyxHQUFHRCxFQUFFLElBQWxCO0FBRUEsYUFBT0osTUFBTSxDQUFOQSxnQkFBUCxPQUFPQSxDQUFQO0FBMUJHO0FBNEJMTSxXQUFPLEVBQUUsYUFBOEI7QUFDckMsZ0JBQTJDVCxPQUFPO0FBQ2xELGFBQU9HLE1BQU0sQ0FBTkEsYUFBUCxFQUFPQSxDQUFQO0FBOUJHO0FBZ0NMTyxhQUFTLEVBQUUsY0FBK0I7QUFDeEMsZ0JBQTJDVixPQUFPO0FBQ2xELFlBQU1XLFlBQVksR0FBR0osRUFBRSxVQUF2QjtBQUNBLFlBQU1LLFVBQVUsR0FBR0wsRUFBRSxJQUFyQjtBQUVBLGFBQU9KLE1BQU0sQ0FBTkEsc0JBQVAsVUFBT0EsQ0FBUDtBQXJDSjtBQUFPLEdBQVA7QUF3Q0QiLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L3BhZ2VzL19hcHAuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgRXJyb3JJbmZvIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQge1xuICBleGVjT25jZSxcbiAgbG9hZEdldEluaXRpYWxQcm9wcyxcbiAgQXBwQ29udGV4dFR5cGUsXG4gIEFwcEluaXRpYWxQcm9wcyxcbiAgQXBwUHJvcHNUeXBlLFxuICBOZXh0V2ViVml0YWxzTWV0cmljLFxufSBmcm9tICcuLi9uZXh0LXNlcnZlci9saWIvdXRpbHMnXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICcuLi9jbGllbnQvcm91dGVyJ1xuXG5leHBvcnQgeyBBcHBJbml0aWFsUHJvcHMgfVxuXG5leHBvcnQgeyBOZXh0V2ViVml0YWxzTWV0cmljIH1cblxuZXhwb3J0IHR5cGUgQXBwQ29udGV4dCA9IEFwcENvbnRleHRUeXBlPFJvdXRlcj5cblxuZXhwb3J0IHR5cGUgQXBwUHJvcHM8UCA9IHt9PiA9IEFwcFByb3BzVHlwZTxSb3V0ZXIsIFA+XG5cbi8qKlxuICogYEFwcGAgY29tcG9uZW50IGlzIHVzZWQgZm9yIGluaXRpYWxpemUgb2YgcGFnZXMuIEl0IGFsbG93cyBmb3Igb3ZlcndyaXRpbmcgYW5kIGZ1bGwgY29udHJvbCBvZiB0aGUgYHBhZ2VgIGluaXRpYWxpemF0aW9uLlxuICogVGhpcyBhbGxvd3MgZm9yIGtlZXBpbmcgc3RhdGUgYmV0d2VlbiBuYXZpZ2F0aW9uLCBjdXN0b20gZXJyb3IgaGFuZGxpbmcsIGluamVjdGluZyBhZGRpdGlvbmFsIGRhdGEuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGFwcEdldEluaXRpYWxQcm9wcyh7XG4gIENvbXBvbmVudCxcbiAgY3R4LFxufTogQXBwQ29udGV4dCk6IFByb21pc2U8QXBwSW5pdGlhbFByb3BzPiB7XG4gIGNvbnN0IHBhZ2VQcm9wcyA9IGF3YWl0IGxvYWRHZXRJbml0aWFsUHJvcHMoQ29tcG9uZW50LCBjdHgpXG4gIHJldHVybiB7IHBhZ2VQcm9wcyB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcDxQID0ge30sIENQID0ge30sIFMgPSB7fT4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8XG4gIFAgJiBBcHBQcm9wczxDUD4sXG4gIFNcbj4ge1xuICBzdGF0aWMgb3JpZ0dldEluaXRpYWxQcm9wcyA9IGFwcEdldEluaXRpYWxQcm9wc1xuICBzdGF0aWMgZ2V0SW5pdGlhbFByb3BzID0gYXBwR2V0SW5pdGlhbFByb3BzXG5cbiAgLy8gS2VwdCBoZXJlIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eS5cbiAgLy8gV2hlbiBzb21lb25lIGVuZGVkIEFwcCB0aGV5IGNvdWxkIGNhbGwgYHN1cGVyLmNvbXBvbmVudERpZENhdGNoYC5cbiAgLy8gQGRlcHJlY2F0ZWQgVGhpcyBtZXRob2QgaXMgbm8gbG9uZ2VyIG5lZWRlZC4gRXJyb3JzIGFyZSBjYXVnaHQgYXQgdGhlIHRvcCBsZXZlbFxuICBjb21wb25lbnREaWRDYXRjaChlcnJvcjogRXJyb3IsIF9lcnJvckluZm86IEVycm9ySW5mbyk6IHZvaWQge1xuICAgIHRocm93IGVycm9yXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyByb3V0ZXIsIENvbXBvbmVudCwgcGFnZVByb3BzLCBfX05fU1NHLCBfX05fU1NQIH0gPSB0aGlzXG4gICAgICAucHJvcHMgYXMgQXBwUHJvcHM8Q1A+XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICB7Li4ucGFnZVByb3BzfVxuICAgICAgICB7XG4gICAgICAgICAgLy8gd2UgZG9uJ3QgYWRkIHRoZSBsZWdhY3kgVVJMIHByb3AgaWYgaXQncyB1c2luZyBub24tbGVnYWN5XG4gICAgICAgICAgLy8gbWV0aG9kcyBsaWtlIGdldFN0YXRpY1Byb3BzIGFuZCBnZXRTZXJ2ZXJTaWRlUHJvcHNcbiAgICAgICAgICAuLi4oIShfX05fU1NHIHx8IF9fTl9TU1ApID8geyB1cmw6IGNyZWF0ZVVybChyb3V0ZXIpIH0gOiB7fSlcbiAgICAgICAgfVxuICAgICAgLz5cbiAgICApXG4gIH1cbn1cblxubGV0IHdhcm5Db250YWluZXI6ICgpID0+IHZvaWRcbmxldCB3YXJuVXJsOiAoKSA9PiB2b2lkXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHdhcm5Db250YWluZXIgPSBleGVjT25jZSgoKSA9PiB7XG4gICAgY29uc29sZS53YXJuKFxuICAgICAgYFdhcm5pbmc6IHRoZSBcXGBDb250YWluZXJcXGAgaW4gXFxgX2FwcFxcYCBoYXMgYmVlbiBkZXByZWNhdGVkIGFuZCBzaG91bGQgYmUgcmVtb3ZlZC4gaHR0cHM6Ly9lcnIuc2gvdmVyY2VsL25leHQuanMvYXBwLWNvbnRhaW5lci1kZXByZWNhdGVkYFxuICAgIClcbiAgfSlcblxuICB3YXJuVXJsID0gZXhlY09uY2UoKCkgPT4ge1xuICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICBgV2FybmluZzogdGhlICd1cmwnIHByb3BlcnR5IGlzIGRlcHJlY2F0ZWQuIGh0dHBzOi8vZXJyLnNoL3ZlcmNlbC9uZXh0LmpzL3VybC1kZXByZWNhdGVkYFxuICAgIClcbiAgfSlcbn1cblxuLy8gQGRlcHJlY2F0ZWQgbm9vcCBmb3Igbm93IHVudGlsIHJlbW92YWxcbmV4cG9ydCBmdW5jdGlvbiBDb250YWluZXIocDogYW55KSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB3YXJuQ29udGFpbmVyKClcbiAgcmV0dXJuIHAuY2hpbGRyZW5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVVybChyb3V0ZXI6IFJvdXRlcikge1xuICAvLyBUaGlzIGlzIHRvIG1ha2Ugc3VyZSB3ZSBkb24ndCByZWZlcmVuY2VzIHRoZSByb3V0ZXIgb2JqZWN0IGF0IGNhbGwgdGltZVxuICBjb25zdCB7IHBhdGhuYW1lLCBhc1BhdGgsIHF1ZXJ5IH0gPSByb3V0ZXJcbiAgcmV0dXJuIHtcbiAgICBnZXQgcXVlcnkoKSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgd2FyblVybCgpXG4gICAgICByZXR1cm4gcXVlcnlcbiAgICB9LFxuICAgIGdldCBwYXRobmFtZSgpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB3YXJuVXJsKClcbiAgICAgIHJldHVybiBwYXRobmFtZVxuICAgIH0sXG4gICAgZ2V0IGFzUGF0aCgpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB3YXJuVXJsKClcbiAgICAgIHJldHVybiBhc1BhdGhcbiAgICB9LFxuICAgIGJhY2s6ICgpID0+IHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB3YXJuVXJsKClcbiAgICAgIHJvdXRlci5iYWNrKClcbiAgICB9LFxuICAgIHB1c2g6ICh1cmw6IHN0cmluZywgYXM/OiBzdHJpbmcpID0+IHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB3YXJuVXJsKClcbiAgICAgIHJldHVybiByb3V0ZXIucHVzaCh1cmwsIGFzKVxuICAgIH0sXG4gICAgcHVzaFRvOiAoaHJlZjogc3RyaW5nLCBhcz86IHN0cmluZykgPT4ge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHdhcm5VcmwoKVxuICAgICAgY29uc3QgcHVzaFJvdXRlID0gYXMgPyBocmVmIDogJydcbiAgICAgIGNvbnN0IHB1c2hVcmwgPSBhcyB8fCBocmVmXG5cbiAgICAgIHJldHVybiByb3V0ZXIucHVzaChwdXNoUm91dGUsIHB1c2hVcmwpXG4gICAgfSxcbiAgICByZXBsYWNlOiAodXJsOiBzdHJpbmcsIGFzPzogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgd2FyblVybCgpXG4gICAgICByZXR1cm4gcm91dGVyLnJlcGxhY2UodXJsLCBhcylcbiAgICB9LFxuICAgIHJlcGxhY2VUbzogKGhyZWY6IHN0cmluZywgYXM/OiBzdHJpbmcpID0+IHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB3YXJuVXJsKClcbiAgICAgIGNvbnN0IHJlcGxhY2VSb3V0ZSA9IGFzID8gaHJlZiA6ICcnXG4gICAgICBjb25zdCByZXBsYWNlVXJsID0gYXMgfHwgaHJlZlxuXG4gICAgICByZXR1cm4gcm91dGVyLnJlcGxhY2UocmVwbGFjZVJvdXRlLCByZXBsYWNlVXJsKVxuICAgIH0sXG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/next/dist/pages/_app.js\n");

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _interopRequireDefault(obj) {\n  return obj && obj.__esModule ? obj : {\n    \"default\": obj\n  };\n}\n\nmodule.exports = _interopRequireDefault;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmV4dC9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHQuanM/MDJiYSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6Ii4vbm9kZV9tb2R1bGVzL25leHQvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICBcImRlZmF1bHRcIjogb2JqXG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdDsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js\n");

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _client_styles_reset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../client/styles/reset */ \"./client/styles/reset.ts\");\n/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/app */ \"./node_modules/next/app.js\");\n/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_app__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _client_utils_url__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../client/utils/url */ \"./client/utils/url.ts\");\n/* harmony import */ var _context_scroll__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../context/scroll */ \"./context/scroll.js\");\n/* harmony import */ var _context_user__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../context/user */ \"./context/user.js\");\n\nvar _jsxFileName = \"/Users/zknock/Develop/localhost_web/pages/_app.tsx\";\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }\n\nfunction _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }\n\n\n\n\n\n\n\n\n\nconst _app = props => {\n  const {\n    Component,\n    title\n  } = props,\n        others = _objectWithoutProperties(props, [\"Component\", \"title\"]); // const setUser = useContext(UserSetterContext);\n  // setUser(props.loginProps.user);\n  // console.log('실행...');\n\n\n  const {\n    0: user,\n    1: setUser\n  } = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useState\"])(props.loginProps.user);\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n    children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_context_user__WEBPACK_IMPORTED_MODULE_7__[\"UserContextProvider\"], {\n      value: {\n        user,\n        setUser\n      },\n      children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_context_scroll__WEBPACK_IMPORTED_MODULE_6__[\"ScrollProvider\"], {\n        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_client_styles_reset__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 23,\n          columnNumber: 6\n        }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(Component, _objectSpread({}, others), void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 24,\n          columnNumber: 6\n        }, undefined)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 22,\n        columnNumber: 5\n      }, undefined)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 21,\n      columnNumber: 4\n    }, undefined)\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 19,\n    columnNumber: 3\n  }, undefined);\n}; // Only uncomment this method if you have blocking data requirements for\n// every single page in your application. This disables the ability to\n// perform automatic static optimization, causing every page in your app to\n// be server-side rendered.\n//\n\n\n_app.getInitialProps = async appContext => {\n  var _ctx$req;\n\n  // calls page's `getInitialProps` and fills `appProps.pageProps`\n  const appProps = await next_app__WEBPACK_IMPORTED_MODULE_3___default.a.getInitialProps(appContext);\n  const {\n    ctx\n  } = appContext;\n  const cookie = ((_ctx$req = ctx.req) === null || _ctx$req === void 0 ? void 0 : _ctx$req.headers.cookie) || '';\n  let loginProps = {}; // SSR\n\n  if (ctx.isServer) {\n    axios__WEBPACK_IMPORTED_MODULE_4___default.a.defaults.headers.cookie = cookie;\n  }\n\n  const res = await axios__WEBPACK_IMPORTED_MODULE_4___default.a.get(`${_client_utils_url__WEBPACK_IMPORTED_MODULE_5__[\"default\"]}/api/auth/check`, {\n    withCredentials: true,\n    headers: {\n      cookie\n    }\n  });\n  const isLogined = res.data.success;\n  const user = res.data.user || {}; // const isLogined = false;\n  // const user = {};\n\n  loginProps = {\n    isLogined,\n    user\n  };\n  return _objectSpread(_objectSpread({}, appProps), {}, {\n    loginProps\n  }); // return {};\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_app);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9fYXBwLnRzeD83MjE2Il0sIm5hbWVzIjpbIl9hcHAiLCJwcm9wcyIsIkNvbXBvbmVudCIsInRpdGxlIiwib3RoZXJzIiwidXNlciIsInNldFVzZXIiLCJ1c2VTdGF0ZSIsImxvZ2luUHJvcHMiLCJnZXRJbml0aWFsUHJvcHMiLCJhcHBDb250ZXh0IiwiYXBwUHJvcHMiLCJBcHAiLCJjdHgiLCJjb29raWUiLCJyZXEiLCJoZWFkZXJzIiwiaXNTZXJ2ZXIiLCJheGlvcyIsImRlZmF1bHRzIiwicmVzIiwiZ2V0IiwiU0VSVkVSIiwid2l0aENyZWRlbnRpYWxzIiwiaXNMb2dpbmVkIiwiZGF0YSIsInN1Y2Nlc3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTUEsSUFBSSxHQUFJQyxLQUFELElBQWdCO0FBQzVCLFFBQU07QUFBRUMsYUFBRjtBQUFhQztBQUFiLE1BQWtDRixLQUF4QztBQUFBLFFBQTZCRyxNQUE3Qiw0QkFBd0NILEtBQXhDLDBCQUQ0QixDQUc1QjtBQUNBO0FBQ0E7OztBQUVBLFFBQU07QUFBQSxPQUFDSSxJQUFEO0FBQUEsT0FBT0M7QUFBUCxNQUFrQkMsc0RBQVEsQ0FBQ04sS0FBSyxDQUFDTyxVQUFOLENBQWlCSCxJQUFsQixDQUFoQztBQUVBLHNCQUNDO0FBQUEsMkJBRUMscUVBQUMsaUVBQUQ7QUFBcUIsV0FBSyxFQUFFO0FBQUVBLFlBQUY7QUFBUUM7QUFBUixPQUE1QjtBQUFBLDZCQUNDLHFFQUFDLDhEQUFEO0FBQUEsZ0NBQ0MscUVBQUMsNERBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFERCxlQUVDLHFFQUFDLFNBQUQsb0JBQWVGLE1BQWY7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFGRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRkQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUREO0FBV0EsQ0FwQkQsQyxDQXNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQUosSUFBSSxDQUFDUyxlQUFMLEdBQXVCLE1BQU9DLFVBQVAsSUFBMkI7QUFBQTs7QUFDakQ7QUFDQSxRQUFNQyxRQUFRLEdBQUcsTUFBTUMsK0NBQUcsQ0FBQ0gsZUFBSixDQUFvQkMsVUFBcEIsQ0FBdkI7QUFDQSxRQUFNO0FBQUVHO0FBQUYsTUFBVUgsVUFBaEI7QUFDQSxRQUFNSSxNQUFNLEdBQUcsYUFBQUQsR0FBRyxDQUFDRSxHQUFKLHNEQUFTQyxPQUFULENBQWlCRixNQUFqQixLQUEyQixFQUExQztBQUNBLE1BQUlOLFVBQVUsR0FBRyxFQUFqQixDQUxpRCxDQU1qRDs7QUFDQSxNQUFJSyxHQUFHLENBQUNJLFFBQVIsRUFBa0I7QUFDakJDLGdEQUFLLENBQUNDLFFBQU4sQ0FBZUgsT0FBZixDQUF1QkYsTUFBdkIsR0FBZ0NBLE1BQWhDO0FBQ0E7O0FBQ0QsUUFBTU0sR0FBRyxHQUFHLE1BQU1GLDRDQUFLLENBQUNHLEdBQU4sQ0FBVyxHQUFFQyx5REFBTyxpQkFBcEIsRUFBc0M7QUFDdkRDLG1CQUFlLEVBQUUsSUFEc0M7QUFFdkRQLFdBQU8sRUFBRTtBQUNSRjtBQURRO0FBRjhDLEdBQXRDLENBQWxCO0FBTUEsUUFBTVUsU0FBUyxHQUFHSixHQUFHLENBQUNLLElBQUosQ0FBU0MsT0FBM0I7QUFDQSxRQUFNckIsSUFBSSxHQUFHZSxHQUFHLENBQUNLLElBQUosQ0FBU3BCLElBQVQsSUFBaUIsRUFBOUIsQ0FqQmlELENBa0JqRDtBQUNBOztBQUNBRyxZQUFVLEdBQUc7QUFBRWdCLGFBQUY7QUFBYW5CO0FBQWIsR0FBYjtBQUNBLHlDQUFZTSxRQUFaO0FBQXNCSDtBQUF0QixLQXJCaUQsQ0FzQmpEO0FBQ0EsQ0F2QkQ7O0FBeUJlUixtRUFBZiIsImZpbGUiOiIuL3BhZ2VzL19hcHAudHN4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IEdsb2JhbFN0eWxlIGZyb20gJy4uL2NsaWVudC9zdHlsZXMvcmVzZXQnO1xuaW1wb3J0IEFwcCBmcm9tICduZXh0L2FwcCc7XG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IFNFUlZFUiBmcm9tICcuLi9jbGllbnQvdXRpbHMvdXJsJztcbmltcG9ydCB7IFNjcm9sbFByb3ZpZGVyIH0gZnJvbSAnLi4vY29udGV4dC9zY3JvbGwnO1xuaW1wb3J0IHsgVXNlckNvbnRleHRQcm92aWRlciB9IGZyb20gJy4uL2NvbnRleHQvdXNlcic7XG5cbmNvbnN0IF9hcHAgPSAocHJvcHM6IGFueSkgPT4ge1xuXHRjb25zdCB7IENvbXBvbmVudCwgdGl0bGUsIC4uLm90aGVycyB9ID0gcHJvcHM7XG5cblx0Ly8gY29uc3Qgc2V0VXNlciA9IHVzZUNvbnRleHQoVXNlclNldHRlckNvbnRleHQpO1xuXHQvLyBzZXRVc2VyKHByb3BzLmxvZ2luUHJvcHMudXNlcik7XG5cdC8vIGNvbnNvbGUubG9nKCfsi6TtlokuLi4nKTtcblxuXHRjb25zdCBbdXNlciwgc2V0VXNlcl0gPSB1c2VTdGF0ZShwcm9wcy5sb2dpblByb3BzLnVzZXIpO1xuXG5cdHJldHVybiAoXG5cdFx0PGRpdj5cblx0XHRcdHsvKiDsoITsl60gY3NzICovfVxuXHRcdFx0PFVzZXJDb250ZXh0UHJvdmlkZXIgdmFsdWU9e3sgdXNlciwgc2V0VXNlciB9fT5cblx0XHRcdFx0PFNjcm9sbFByb3ZpZGVyPlxuXHRcdFx0XHRcdDxHbG9iYWxTdHlsZSAvPlxuXHRcdFx0XHRcdDxDb21wb25lbnQgey4uLm90aGVyc30gLz5cblx0XHRcdFx0PC9TY3JvbGxQcm92aWRlcj5cblx0XHRcdDwvVXNlckNvbnRleHRQcm92aWRlcj5cblx0XHQ8L2Rpdj5cblx0KTtcbn07XG5cbi8vIE9ubHkgdW5jb21tZW50IHRoaXMgbWV0aG9kIGlmIHlvdSBoYXZlIGJsb2NraW5nIGRhdGEgcmVxdWlyZW1lbnRzIGZvclxuLy8gZXZlcnkgc2luZ2xlIHBhZ2UgaW4geW91ciBhcHBsaWNhdGlvbi4gVGhpcyBkaXNhYmxlcyB0aGUgYWJpbGl0eSB0b1xuLy8gcGVyZm9ybSBhdXRvbWF0aWMgc3RhdGljIG9wdGltaXphdGlvbiwgY2F1c2luZyBldmVyeSBwYWdlIGluIHlvdXIgYXBwIHRvXG4vLyBiZSBzZXJ2ZXItc2lkZSByZW5kZXJlZC5cbi8vXG5fYXBwLmdldEluaXRpYWxQcm9wcyA9IGFzeW5jIChhcHBDb250ZXh0OiBhbnkpID0+IHtcblx0Ly8gY2FsbHMgcGFnZSdzIGBnZXRJbml0aWFsUHJvcHNgIGFuZCBmaWxscyBgYXBwUHJvcHMucGFnZVByb3BzYFxuXHRjb25zdCBhcHBQcm9wcyA9IGF3YWl0IEFwcC5nZXRJbml0aWFsUHJvcHMoYXBwQ29udGV4dCk7XG5cdGNvbnN0IHsgY3R4IH0gPSBhcHBDb250ZXh0O1xuXHRjb25zdCBjb29raWUgPSBjdHgucmVxPy5oZWFkZXJzLmNvb2tpZSB8fCAnJztcblx0bGV0IGxvZ2luUHJvcHMgPSB7fTtcblx0Ly8gU1NSXG5cdGlmIChjdHguaXNTZXJ2ZXIpIHtcblx0XHRheGlvcy5kZWZhdWx0cy5oZWFkZXJzLmNvb2tpZSA9IGNvb2tpZTtcblx0fVxuXHRjb25zdCByZXMgPSBhd2FpdCBheGlvcy5nZXQoYCR7U0VSVkVSfS9hcGkvYXV0aC9jaGVja2AsIHtcblx0XHR3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG5cdFx0aGVhZGVyczoge1xuXHRcdFx0Y29va2llLFxuXHRcdH0sXG5cdH0pO1xuXHRjb25zdCBpc0xvZ2luZWQgPSByZXMuZGF0YS5zdWNjZXNzO1xuXHRjb25zdCB1c2VyID0gcmVzLmRhdGEudXNlciB8fCB7fTtcblx0Ly8gY29uc3QgaXNMb2dpbmVkID0gZmFsc2U7XG5cdC8vIGNvbnN0IHVzZXIgPSB7fTtcblx0bG9naW5Qcm9wcyA9IHsgaXNMb2dpbmVkLCB1c2VyIH07XG5cdHJldHVybiB7IC4uLmFwcFByb3BzLCBsb2dpblByb3BzIH07XG5cdC8vIHJldHVybiB7fTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IF9hcHA7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ 0:
/*!*****************************************!*\
  !*** multi private-next-pages/_app.tsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! private-next-pages/_app.tsx */"./pages/_app.tsx");


/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"axios\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJheGlvc1wiPzcwYzYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiYXhpb3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///axios\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiPzU4OGUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoicmVhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react\n");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react/jsx-dev-runtime\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIj9jZDkwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6InJlYWN0L2pzeC1kZXYtcnVudGltZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react/jsx-dev-runtime\n");

/***/ }),

/***/ "styled-components":
/*!************************************!*\
  !*** external "styled-components" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"styled-components\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzdHlsZWQtY29tcG9uZW50c1wiP2Y1YWQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoic3R5bGVkLWNvbXBvbmVudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzdHlsZWQtY29tcG9uZW50c1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///styled-components\n");

/***/ })

/******/ });