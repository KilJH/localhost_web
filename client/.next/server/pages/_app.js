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

module.exports = require("next/dist/next-server/lib/utils.js");

/***/ }),

/***/ "../node_modules/next/app.js":
/*!***********************************!*\
  !*** ../node_modules/next/app.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/pages/_app */ "../node_modules/next/dist/pages/_app.js")


/***/ }),

/***/ "../node_modules/next/dist/pages/_app.js":
/*!***********************************************!*\
  !*** ../node_modules/next/dist/pages/_app.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.Container = Container;
exports.createUrl = createUrl;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _utils = __webpack_require__(/*! ../next-server/lib/utils */ "../next-server/lib/utils");

exports.AppInitialProps = _utils.AppInitialProps;
exports.NextWebVitalsMetric = _utils.NextWebVitalsMetric;
/**
* `App` component is used for initialize of pages. It allows for overwriting and full control of the `page` initialization.
* This allows for keeping state between navigation, custom error handling, injecting additional data.
*/

async function appGetInitialProps({
  Component,
  ctx
}) {
  const pageProps = await (0, _utils.loadGetInitialProps)(Component, ctx);
  return {
    pageProps
  };
}

class App extends _react.default.Component {
  // Kept here for backwards compatibility.
  // When someone ended App they could call `super.componentDidCatch`.
  // @deprecated This method is no longer needed. Errors are caught at the top level
  componentDidCatch(error, _errorInfo) {
    throw error;
  }

  render() {
    const {
      router,
      Component,
      pageProps,
      __N_SSG,
      __N_SSP
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(Component, Object.assign({}, pageProps, // we don't add the legacy URL prop if it's using non-legacy
    // methods like getStaticProps and getServerSideProps
    !(__N_SSG || __N_SSP) ? {
      url: createUrl(router)
    } : {}));
  }

}

exports.default = App;
App.origGetInitialProps = appGetInitialProps;
App.getInitialProps = appGetInitialProps;
let warnContainer;
let warnUrl;

if (true) {
  warnContainer = (0, _utils.execOnce)(() => {
    console.warn(`Warning: the \`Container\` in \`_app\` has been deprecated and should be removed. https://err.sh/vercel/next.js/app-container-deprecated`);
  });
  warnUrl = (0, _utils.execOnce)(() => {
    console.error(`Warning: the 'url' property is deprecated. https://err.sh/vercel/next.js/url-deprecated`);
  });
} // @deprecated noop for now until removal


function Container(p) {
  if (true) warnContainer();
  return p.children;
}

function createUrl(router) {
  // This is to make sure we don't references the router object at call time
  const {
    pathname,
    asPath,
    query
  } = router;
  return {
    get query() {
      if (true) warnUrl();
      return query;
    },

    get pathname() {
      if (true) warnUrl();
      return pathname;
    },

    get asPath() {
      if (true) warnUrl();
      return asPath;
    },

    back: () => {
      if (true) warnUrl();
      router.back();
    },
    push: (url, as) => {
      if (true) warnUrl();
      return router.push(url, as);
    },
    pushTo: (href, as) => {
      if (true) warnUrl();
      const pushRoute = as ? href : '';
      const pushUrl = as || href;
      return router.push(pushRoute, pushUrl);
    },
    replace: (url, as) => {
      if (true) warnUrl();
      return router.replace(url, as);
    },
    replaceTo: (href, as) => {
      if (true) warnUrl();
      const replaceRoute = as ? href : '';
      const replaceUrl = as || href;
      return router.replace(replaceRoute, replaceUrl);
    }
  };
}

/***/ }),

/***/ "../node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!*****************************************************************************************!*\
  !*** ../node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "./context/scroll.js":
/*!***************************!*\
  !*** ./context/scroll.js ***!
  \***************************/
/*! exports provided: ScrollProvider, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScrollProvider", function() { return ScrollProvider; });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

var _jsxFileName = "C:\\Users\\hby84\\OneDrive\\\uBC14\uD0D5 \uD654\uBA74\\210428\\localhost_web\\client\\context\\scroll.js";

const ScrollContext = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_1__["createContext"])({
  state: {
    isUp: true
  },
  actions: {
    setIsUp: bool => {}
  }
});

const ScrollProvider = ({
  children
}) => {
  const {
    0: isUp,
    1: setIsUp
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(true);
  const value = {
    state: {
      isUp
    },
    actions: {
      setIsUp
    }
  };
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(ScrollContext.Provider, {
    value: value,
    children: children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 19,
    columnNumber: 3
  }, undefined);
};


/* harmony default export */ __webpack_exports__["default"] = (ScrollContext);

/***/ }),

/***/ "./context/user.js":
/*!*************************!*\
  !*** ./context/user.js ***!
  \*************************/
/*! exports provided: UserStateContext, UserSetterContext, UserContextProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserStateContext", function() { return UserStateContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserSetterContext", function() { return UserSetterContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserContextProvider", function() { return UserContextProvider; });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

var _jsxFileName = "C:\\Users\\hby84\\OneDrive\\\uBC14\uD0D5 \uD654\uBA74\\210428\\localhost_web\\client\\context\\user.js";

const UserStateContext = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_1__["createContext"])({
  id: 0,
  email: '',
  password: '',
  name: '',
  nickname: '',
  phone: '',
  address: '',
  photo: ''
}); // type UserSetter = Dispatch<SetStateAction<User>>;

const UserSetterContext = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_1__["createContext"])(user => {
  console.log('setUser() is default');
});
const UserContextProvider = ({
  value,
  children
}) => {
  const {
    0: user,
    1: setUser
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])({
    id: 0,
    email: '',
    password: '',
    name: '',
    nickname: '',
    phone: '',
    address: '',
    photo: ''
  });
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(UserSetterContext.Provider, {
    value: value.setUser || setUser,
    children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(UserStateContext.Provider, {
      value: value.user || user,
      children: children
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 4
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 32,
    columnNumber: 3
  }, undefined);
}; // export const useUserState = () => {
// 	const state = useContext(UserStateContext);
// 	return state;
// };
// export const useUserDispatch = () => {
// 	const dispatch = useContext(UserSetterContext);
// 	// if (!dispatch) throw new Error('UserProvider not found');
// 	return dispatch;
// };

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_reset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/reset */ "./styles/reset.ts");
/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/app */ "../node_modules/next/app.js");
/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_app__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_url__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/url */ "./utils/url.ts");
/* harmony import */ var _context_scroll__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../context/scroll */ "./context/scroll.js");
/* harmony import */ var _context_user__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../context/user */ "./context/user.js");

var _jsxFileName = "C:\\Users\\hby84\\OneDrive\\\uBC14\uD0D5 \uD654\uBA74\\210428\\localhost_web\\client\\pages\\_app.tsx";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }









const _app = props => {
  const {
    Component,
    title
  } = props,
        others = _objectWithoutProperties(props, ["Component", "title"]); // const setUser = useContext(UserSetterContext);
  // setUser(props.loginProps.user);
  // console.log('실행...');


  const {
    0: user,
    1: setUser
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(props.loginProps.user);
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
    children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_context_user__WEBPACK_IMPORTED_MODULE_7__["UserContextProvider"], {
      value: {
        user,
        setUser
      },
      children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_context_scroll__WEBPACK_IMPORTED_MODULE_6__["ScrollProvider"], {
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_styles_reset__WEBPACK_IMPORTED_MODULE_2__["default"], {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 24,
          columnNumber: 6
        }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(Component, _objectSpread({}, others), void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 25,
          columnNumber: 6
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 23,
        columnNumber: 5
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 4
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 20,
    columnNumber: 3
  }, undefined);
}; // Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//


_app.getInitialProps = async appContext => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await next_app__WEBPACK_IMPORTED_MODULE_3___default.a.getInitialProps(appContext);
  const {
    ctx
  } = appContext;
  const cookie = ctx.isServer ? ctx.req.cookies.token : '';

  if (ctx.isServer && cookie) {
    const token = appContext.ctx.req.cookies.token || '';
    const res = await axios__WEBPACK_IMPORTED_MODULE_4___default.a.post(`${_utils_url__WEBPACK_IMPORTED_MODULE_5__["default"]}/api/auth/check`, {
      token
    });
    const isLogined = res.data.success;
    const user = res.data.user || {};
    const loginProps = {
      isLogined,
      user
    };
    return _objectSpread(_objectSpread({}, appProps), {}, {
      loginProps
    });
  }

  return _objectSpread(_objectSpread({}, appProps), {}, {
    loginProps: {
      isLogined: false,
      user: {}
    }
  });
};

/* harmony default export */ __webpack_exports__["default"] = (_app);

/***/ }),

/***/ "./styles/reset.ts":
/*!*************************!*\
  !*** ./styles/reset.ts ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);
// import reset from "./reset.css";

const GlobalStyle = styled_components__WEBPACK_IMPORTED_MODULE_0__["createGlobalStyle"]`
  * {
    /* box-sizing: border-box; */
    }
  body{
    font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif !important;
    margin: 0;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  input, button {
    background-color: transparent;
    padding: .5rem;
    border: 1px solid #aaaaaa;
    border-radius: .25rem;
    outline: none;
    box-sizing: border-box;
    font-size: 0.8em;
  }
  h1, h2, h3, h4, h5, h6{
    font-family:'Maven Pro', sans-serif;
  }
  button{
    cursor: pointer;
  }
  button:hover{
    background-color: linear-gradient(#ffffff,#aaaaaa)
  }
  input:disabled{
    background-color: #e5e7e9;
  }

  @media only screen and (max-width: 768px) {
    body {
      font-size: 14px;
    }
  }

  @media only screen and (max-width: 576px) {
    body {
      font-size: 12px;
    }
  }
`;
/* harmony default export */ __webpack_exports__["default"] = (GlobalStyle);

/***/ }),

/***/ "./utils/url.ts":
/*!**********************!*\
  !*** ./utils/url.ts ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const SERVER = 'http://localhost:5000';
/* harmony default export */ __webpack_exports__["default"] = (SERVER);

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

module.exports = require("axios");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "styled-components":
/*!************************************!*\
  !*** external "styled-components" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmV4dC9kaXN0L25leHQtc2VydmVyL2xpYi91dGlscy5qc1wiIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvbmV4dC9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL3BhZ2VzL19hcHAudHN4Iiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvbmV4dC9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHQuanMiLCJ3ZWJwYWNrOi8vLy4vY29udGV4dC9zY3JvbGwuanMiLCJ3ZWJwYWNrOi8vLy4vY29udGV4dC91c2VyLmpzIiwid2VicGFjazovLy8uL3BhZ2VzL19hcHAudHN4Iiwid2VicGFjazovLy8uL3N0eWxlcy9yZXNldC50cyIsIndlYnBhY2s6Ly8vLi91dGlscy91cmwudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXhpb3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInN0eWxlZC1jb21wb25lbnRzXCIiXSwibmFtZXMiOlsicGFnZVByb3BzIiwiUmVhY3QiLCJDb21wb25lbnQiLCJjb21wb25lbnREaWRDYXRjaCIsInJlbmRlciIsIl9fTl9TU0ciLCJ1cmwiLCJjcmVhdGVVcmwiLCJBcHAiLCJvcmlnR2V0SW5pdGlhbFByb3BzIiwiYXBwR2V0SW5pdGlhbFByb3BzIiwiZ2V0SW5pdGlhbFByb3BzIiwid2FybkNvbnRhaW5lciIsImNvbnNvbGUiLCJ3YXJuVXJsIiwicCIsImJhY2siLCJyb3V0ZXIiLCJwdXNoIiwicHVzaFRvIiwicHVzaFJvdXRlIiwiYXMiLCJwdXNoVXJsIiwicmVwbGFjZSIsInJlcGxhY2VUbyIsInJlcGxhY2VSb3V0ZSIsInJlcGxhY2VVcmwiLCJTY3JvbGxDb250ZXh0IiwiY3JlYXRlQ29udGV4dCIsInN0YXRlIiwiaXNVcCIsImFjdGlvbnMiLCJzZXRJc1VwIiwiYm9vbCIsIlNjcm9sbFByb3ZpZGVyIiwiY2hpbGRyZW4iLCJ1c2VTdGF0ZSIsInZhbHVlIiwiVXNlclN0YXRlQ29udGV4dCIsImlkIiwiZW1haWwiLCJwYXNzd29yZCIsIm5hbWUiLCJuaWNrbmFtZSIsInBob25lIiwiYWRkcmVzcyIsInBob3RvIiwiVXNlclNldHRlckNvbnRleHQiLCJ1c2VyIiwibG9nIiwiVXNlckNvbnRleHRQcm92aWRlciIsInNldFVzZXIiLCJfYXBwIiwicHJvcHMiLCJ0aXRsZSIsIm90aGVycyIsImxvZ2luUHJvcHMiLCJhcHBDb250ZXh0IiwiYXBwUHJvcHMiLCJjdHgiLCJjb29raWUiLCJpc1NlcnZlciIsInJlcSIsImNvb2tpZXMiLCJ0b2tlbiIsInJlcyIsImF4aW9zIiwicG9zdCIsIlNFUlZFUiIsImlzTG9naW5lZCIsImRhdGEiLCJzdWNjZXNzIiwiR2xvYmFsU3R5bGUiLCJjcmVhdGVHbG9iYWxTdHlsZSJdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLElBQUk7UUFDSjtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7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O0FBQXRCO0FBQ0E7O0FBQ0QseUNBQVlFLFFBQVo7QUFBc0JGLGNBQVUsRUFBRTtBQUFFYSxlQUFTLEVBQUUsS0FBYjtBQUFvQnJCLFVBQUksRUFBRTtBQUExQjtBQUFsQztBQUNBLENBakJEOztBQW1CZUksbUVBQWYsRTs7Ozs7Ozs7Ozs7O0FDdkRBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFFQSxNQUFNb0IsV0FBVyxHQUFHQyxtRUFBa0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBN0NBO0FBK0NlRCwwRUFBZixFOzs7Ozs7Ozs7Ozs7QUNsREE7QUFBQSxNQUFNSixNQUFNLEdBQUcsdUJBQWY7QUFFZUEscUVBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGQSxrQzs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSxrRDs7Ozs7Ozs7Ozs7QUNBQSw4QyIsImZpbGUiOiJwYWdlcy9fYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSByZXF1aXJlKCcuLi9zc3ItbW9kdWxlLWNhY2hlLmpzJyk7XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdHZhciB0aHJldyA9IHRydWU7XG4gXHRcdHRyeSB7XG4gXHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4gXHRcdFx0dGhyZXcgPSBmYWxzZTtcbiBcdFx0fSBmaW5hbGx5IHtcbiBcdFx0XHRpZih0aHJldykgZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHR9XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L25leHQtc2VydmVyL2xpYi91dGlscy5qc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGlzdC9wYWdlcy9fYXBwJylcbiIsImltcG9ydCBSZWFjdCwgeyBFcnJvckluZm8gfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7XG4gIGV4ZWNPbmNlLFxuICBsb2FkR2V0SW5pdGlhbFByb3BzLFxuICBBcHBDb250ZXh0VHlwZSxcbiAgQXBwSW5pdGlhbFByb3BzLFxuICBBcHBQcm9wc1R5cGUsXG4gIE5leHRXZWJWaXRhbHNNZXRyaWMsXG59IGZyb20gJy4uL25leHQtc2VydmVyL2xpYi91dGlscydcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJy4uL2NsaWVudC9yb3V0ZXInXG5cbmV4cG9ydCB7IEFwcEluaXRpYWxQcm9wcyB9XG5cbmV4cG9ydCB7IE5leHRXZWJWaXRhbHNNZXRyaWMgfVxuXG5leHBvcnQgdHlwZSBBcHBDb250ZXh0ID0gQXBwQ29udGV4dFR5cGU8Um91dGVyPlxuXG5leHBvcnQgdHlwZSBBcHBQcm9wczxQID0ge30+ID0gQXBwUHJvcHNUeXBlPFJvdXRlciwgUD5cblxuLyoqXG4gKiBgQXBwYCBjb21wb25lbnQgaXMgdXNlZCBmb3IgaW5pdGlhbGl6ZSBvZiBwYWdlcy4gSXQgYWxsb3dzIGZvciBvdmVyd3JpdGluZyBhbmQgZnVsbCBjb250cm9sIG9mIHRoZSBgcGFnZWAgaW5pdGlhbGl6YXRpb24uXG4gKiBUaGlzIGFsbG93cyBmb3Iga2VlcGluZyBzdGF0ZSBiZXR3ZWVuIG5hdmlnYXRpb24sIGN1c3RvbSBlcnJvciBoYW5kbGluZywgaW5qZWN0aW5nIGFkZGl0aW9uYWwgZGF0YS5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gYXBwR2V0SW5pdGlhbFByb3BzKHtcbiAgQ29tcG9uZW50LFxuICBjdHgsXG59OiBBcHBDb250ZXh0KTogUHJvbWlzZTxBcHBJbml0aWFsUHJvcHM+IHtcbiAgY29uc3QgcGFnZVByb3BzID0gYXdhaXQgbG9hZEdldEluaXRpYWxQcm9wcyhDb21wb25lbnQsIGN0eClcbiAgcmV0dXJuIHsgcGFnZVByb3BzIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwPFAgPSB7fSwgQ1AgPSB7fSwgUyA9IHt9PiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxcbiAgUCAmIEFwcFByb3BzPENQPixcbiAgU1xuPiB7XG4gIHN0YXRpYyBvcmlnR2V0SW5pdGlhbFByb3BzID0gYXBwR2V0SW5pdGlhbFByb3BzXG4gIHN0YXRpYyBnZXRJbml0aWFsUHJvcHMgPSBhcHBHZXRJbml0aWFsUHJvcHNcblxuICAvLyBLZXB0IGhlcmUgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LlxuICAvLyBXaGVuIHNvbWVvbmUgZW5kZWQgQXBwIHRoZXkgY291bGQgY2FsbCBgc3VwZXIuY29tcG9uZW50RGlkQ2F0Y2hgLlxuICAvLyBAZGVwcmVjYXRlZCBUaGlzIG1ldGhvZCBpcyBubyBsb25nZXIgbmVlZGVkLiBFcnJvcnMgYXJlIGNhdWdodCBhdCB0aGUgdG9wIGxldmVsXG4gIGNvbXBvbmVudERpZENhdGNoKGVycm9yOiBFcnJvciwgX2Vycm9ySW5mbzogRXJyb3JJbmZvKTogdm9pZCB7XG4gICAgdGhyb3cgZXJyb3JcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHJvdXRlciwgQ29tcG9uZW50LCBwYWdlUHJvcHMsIF9fTl9TU0csIF9fTl9TU1AgfSA9IHRoaXNcbiAgICAgIC5wcm9wcyBhcyBBcHBQcm9wczxDUD5cblxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHsuLi5wYWdlUHJvcHN9XG4gICAgICAgIHtcbiAgICAgICAgICAvLyB3ZSBkb24ndCBhZGQgdGhlIGxlZ2FjeSBVUkwgcHJvcCBpZiBpdCdzIHVzaW5nIG5vbi1sZWdhY3lcbiAgICAgICAgICAvLyBtZXRob2RzIGxpa2UgZ2V0U3RhdGljUHJvcHMgYW5kIGdldFNlcnZlclNpZGVQcm9wc1xuICAgICAgICAgIC4uLighKF9fTl9TU0cgfHwgX19OX1NTUCkgPyB7IHVybDogY3JlYXRlVXJsKHJvdXRlcikgfSA6IHt9KVxuICAgICAgICB9XG4gICAgICAvPlxuICAgIClcbiAgfVxufVxuXG5sZXQgd2FybkNvbnRhaW5lcjogKCkgPT4gdm9pZFxubGV0IHdhcm5Vcmw6ICgpID0+IHZvaWRcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgd2FybkNvbnRhaW5lciA9IGV4ZWNPbmNlKCgpID0+IHtcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICBgV2FybmluZzogdGhlIFxcYENvbnRhaW5lclxcYCBpbiBcXGBfYXBwXFxgIGhhcyBiZWVuIGRlcHJlY2F0ZWQgYW5kIHNob3VsZCBiZSByZW1vdmVkLiBodHRwczovL2Vyci5zaC92ZXJjZWwvbmV4dC5qcy9hcHAtY29udGFpbmVyLWRlcHJlY2F0ZWRgXG4gICAgKVxuICB9KVxuXG4gIHdhcm5VcmwgPSBleGVjT25jZSgoKSA9PiB7XG4gICAgY29uc29sZS5lcnJvcihcbiAgICAgIGBXYXJuaW5nOiB0aGUgJ3VybCcgcHJvcGVydHkgaXMgZGVwcmVjYXRlZC4gaHR0cHM6Ly9lcnIuc2gvdmVyY2VsL25leHQuanMvdXJsLWRlcHJlY2F0ZWRgXG4gICAgKVxuICB9KVxufVxuXG4vLyBAZGVwcmVjYXRlZCBub29wIGZvciBub3cgdW50aWwgcmVtb3ZhbFxuZXhwb3J0IGZ1bmN0aW9uIENvbnRhaW5lcihwOiBhbnkpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHdhcm5Db250YWluZXIoKVxuICByZXR1cm4gcC5jaGlsZHJlblxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVXJsKHJvdXRlcjogUm91dGVyKSB7XG4gIC8vIFRoaXMgaXMgdG8gbWFrZSBzdXJlIHdlIGRvbid0IHJlZmVyZW5jZXMgdGhlIHJvdXRlciBvYmplY3QgYXQgY2FsbCB0aW1lXG4gIGNvbnN0IHsgcGF0aG5hbWUsIGFzUGF0aCwgcXVlcnkgfSA9IHJvdXRlclxuICByZXR1cm4ge1xuICAgIGdldCBxdWVyeSgpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB3YXJuVXJsKClcbiAgICAgIHJldHVybiBxdWVyeVxuICAgIH0sXG4gICAgZ2V0IHBhdGhuYW1lKCkge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHdhcm5VcmwoKVxuICAgICAgcmV0dXJuIHBhdGhuYW1lXG4gICAgfSxcbiAgICBnZXQgYXNQYXRoKCkge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHdhcm5VcmwoKVxuICAgICAgcmV0dXJuIGFzUGF0aFxuICAgIH0sXG4gICAgYmFjazogKCkgPT4ge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHdhcm5VcmwoKVxuICAgICAgcm91dGVyLmJhY2soKVxuICAgIH0sXG4gICAgcHVzaDogKHVybDogc3RyaW5nLCBhcz86IHN0cmluZykgPT4ge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHdhcm5VcmwoKVxuICAgICAgcmV0dXJuIHJvdXRlci5wdXNoKHVybCwgYXMpXG4gICAgfSxcbiAgICBwdXNoVG86IChocmVmOiBzdHJpbmcsIGFzPzogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgd2FyblVybCgpXG4gICAgICBjb25zdCBwdXNoUm91dGUgPSBhcyA/IGhyZWYgOiAnJ1xuICAgICAgY29uc3QgcHVzaFVybCA9IGFzIHx8IGhyZWZcblxuICAgICAgcmV0dXJuIHJvdXRlci5wdXNoKHB1c2hSb3V0ZSwgcHVzaFVybClcbiAgICB9LFxuICAgIHJlcGxhY2U6ICh1cmw6IHN0cmluZywgYXM/OiBzdHJpbmcpID0+IHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB3YXJuVXJsKClcbiAgICAgIHJldHVybiByb3V0ZXIucmVwbGFjZSh1cmwsIGFzKVxuICAgIH0sXG4gICAgcmVwbGFjZVRvOiAoaHJlZjogc3RyaW5nLCBhcz86IHN0cmluZykgPT4ge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHdhcm5VcmwoKVxuICAgICAgY29uc3QgcmVwbGFjZVJvdXRlID0gYXMgPyBocmVmIDogJydcbiAgICAgIGNvbnN0IHJlcGxhY2VVcmwgPSBhcyB8fCBocmVmXG5cbiAgICAgIHJldHVybiByb3V0ZXIucmVwbGFjZShyZXBsYWNlUm91dGUsIHJlcGxhY2VVcmwpXG4gICAgfSxcbiAgfVxufVxuIiwiZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICBcImRlZmF1bHRcIjogb2JqXG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdDsiLCJpbXBvcnQgUmVhY3QsIHsgY3JlYXRlQ29udGV4dCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcblxyXG5jb25zdCBTY3JvbGxDb250ZXh0ID0gY3JlYXRlQ29udGV4dCh7XHJcblx0c3RhdGU6IHsgaXNVcDogdHJ1ZSB9LFxyXG5cdGFjdGlvbnM6IHtcclxuXHRcdHNldElzVXA6IGJvb2wgPT4ge30sXHJcblx0fSxcclxufSk7XHJcblxyXG5jb25zdCBTY3JvbGxQcm92aWRlciA9ICh7IGNoaWxkcmVuIH0pID0+IHtcclxuXHRjb25zdCBbaXNVcCwgc2V0SXNVcF0gPSB1c2VTdGF0ZSh0cnVlKTtcclxuXHJcblx0Y29uc3QgdmFsdWUgPSB7XHJcblx0XHRzdGF0ZTogeyBpc1VwIH0sXHJcblx0XHRhY3Rpb25zOiB7IHNldElzVXAgfSxcclxuXHR9O1xyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PFNjcm9sbENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3ZhbHVlfT57Y2hpbGRyZW59PC9TY3JvbGxDb250ZXh0LlByb3ZpZGVyPlxyXG5cdCk7XHJcbn07XHJcblxyXG5leHBvcnQgeyBTY3JvbGxQcm92aWRlciB9O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2Nyb2xsQ29udGV4dDtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZUNvbnRleHQsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5cclxuZXhwb3J0IGNvbnN0IFVzZXJTdGF0ZUNvbnRleHQgPSBjcmVhdGVDb250ZXh0KHtcclxuXHRpZDogMCxcclxuXHRlbWFpbDogJycsXHJcblx0cGFzc3dvcmQ6ICcnLFxyXG5cdG5hbWU6ICcnLFxyXG5cdG5pY2tuYW1lOiAnJyxcclxuXHRwaG9uZTogJycsXHJcblx0YWRkcmVzczogJycsXHJcblx0cGhvdG86ICcnLFxyXG59KTtcclxuXHJcbi8vIHR5cGUgVXNlclNldHRlciA9IERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPFVzZXI+PjtcclxuXHJcbmV4cG9ydCBjb25zdCBVc2VyU2V0dGVyQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQodXNlciA9PiB7XHJcblx0Y29uc29sZS5sb2coJ3NldFVzZXIoKSBpcyBkZWZhdWx0Jyk7XHJcbn0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IFVzZXJDb250ZXh0UHJvdmlkZXIgPSAoeyB2YWx1ZSwgY2hpbGRyZW4gfSkgPT4ge1xyXG5cdGNvbnN0IFt1c2VyLCBzZXRVc2VyXSA9IHVzZVN0YXRlKHtcclxuXHRcdGlkOiAwLFxyXG5cdFx0ZW1haWw6ICcnLFxyXG5cdFx0cGFzc3dvcmQ6ICcnLFxyXG5cdFx0bmFtZTogJycsXHJcblx0XHRuaWNrbmFtZTogJycsXHJcblx0XHRwaG9uZTogJycsXHJcblx0XHRhZGRyZXNzOiAnJyxcclxuXHRcdHBob3RvOiAnJyxcclxuXHR9KTtcclxuXHRyZXR1cm4gKFxyXG5cdFx0PFVzZXJTZXR0ZXJDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt2YWx1ZS5zZXRVc2VyIHx8IHNldFVzZXJ9PlxyXG5cdFx0XHQ8VXNlclN0YXRlQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17dmFsdWUudXNlciB8fCB1c2VyfT5cclxuXHRcdFx0XHR7Y2hpbGRyZW59XHJcblx0XHRcdDwvVXNlclN0YXRlQ29udGV4dC5Qcm92aWRlcj5cclxuXHRcdDwvVXNlclNldHRlckNvbnRleHQuUHJvdmlkZXI+XHJcblx0KTtcclxufTtcclxuXHJcbi8vIGV4cG9ydCBjb25zdCB1c2VVc2VyU3RhdGUgPSAoKSA9PiB7XHJcbi8vIFx0Y29uc3Qgc3RhdGUgPSB1c2VDb250ZXh0KFVzZXJTdGF0ZUNvbnRleHQpO1xyXG4vLyBcdHJldHVybiBzdGF0ZTtcclxuLy8gfTtcclxuXHJcbi8vIGV4cG9ydCBjb25zdCB1c2VVc2VyRGlzcGF0Y2ggPSAoKSA9PiB7XHJcbi8vIFx0Y29uc3QgZGlzcGF0Y2ggPSB1c2VDb250ZXh0KFVzZXJTZXR0ZXJDb250ZXh0KTtcclxuLy8gXHQvLyBpZiAoIWRpc3BhdGNoKSB0aHJvdyBuZXcgRXJyb3IoJ1VzZXJQcm92aWRlciBub3QgZm91bmQnKTtcclxuLy8gXHRyZXR1cm4gZGlzcGF0Y2g7XHJcbi8vIH07XHJcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VDb250ZXh0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEdsb2JhbFN0eWxlIGZyb20gJy4uL3N0eWxlcy9yZXNldCc7XHJcbmltcG9ydCBBcHAsIHsgQXBwQ29udGV4dCB9IGZyb20gJ25leHQvYXBwJztcclxuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcclxuaW1wb3J0IFNFUlZFUiBmcm9tICcuLi91dGlscy91cmwnO1xyXG5pbXBvcnQgeyBTY3JvbGxQcm92aWRlciB9IGZyb20gJy4uL2NvbnRleHQvc2Nyb2xsJztcclxuaW1wb3J0IHsgVXNlckNvbnRleHRQcm92aWRlciwgVXNlclNldHRlckNvbnRleHQgfSBmcm9tICcuLi9jb250ZXh0L3VzZXInO1xyXG5pbXBvcnQgeyBjb250ZXh0VHlwZSB9IGZyb20gJ2dvb2dsZS1tYXAtcmVhY3QnO1xyXG5cclxuY29uc3QgX2FwcCA9IChwcm9wczogYW55KSA9PiB7XHJcblx0Y29uc3QgeyBDb21wb25lbnQsIHRpdGxlLCAuLi5vdGhlcnMgfSA9IHByb3BzO1xyXG5cclxuXHQvLyBjb25zdCBzZXRVc2VyID0gdXNlQ29udGV4dChVc2VyU2V0dGVyQ29udGV4dCk7XHJcblx0Ly8gc2V0VXNlcihwcm9wcy5sb2dpblByb3BzLnVzZXIpO1xyXG5cdC8vIGNvbnNvbGUubG9nKCfsi6TtlokuLi4nKTtcclxuXHJcblx0Y29uc3QgW3VzZXIsIHNldFVzZXJdID0gdXNlU3RhdGUocHJvcHMubG9naW5Qcm9wcy51c2VyKTtcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxkaXY+XHJcblx0XHRcdHsvKiDsoITsl60gY3NzICovfVxyXG5cdFx0XHQ8VXNlckNvbnRleHRQcm92aWRlciB2YWx1ZT17eyB1c2VyLCBzZXRVc2VyIH19PlxyXG5cdFx0XHRcdDxTY3JvbGxQcm92aWRlcj5cclxuXHRcdFx0XHRcdDxHbG9iYWxTdHlsZSAvPlxyXG5cdFx0XHRcdFx0PENvbXBvbmVudCB7Li4ub3RoZXJzfSAvPlxyXG5cdFx0XHRcdDwvU2Nyb2xsUHJvdmlkZXI+XHJcblx0XHRcdDwvVXNlckNvbnRleHRQcm92aWRlcj5cclxuXHRcdDwvZGl2PlxyXG5cdCk7XHJcbn07XHJcblxyXG4vLyBPbmx5IHVuY29tbWVudCB0aGlzIG1ldGhvZCBpZiB5b3UgaGF2ZSBibG9ja2luZyBkYXRhIHJlcXVpcmVtZW50cyBmb3JcclxuLy8gZXZlcnkgc2luZ2xlIHBhZ2UgaW4geW91ciBhcHBsaWNhdGlvbi4gVGhpcyBkaXNhYmxlcyB0aGUgYWJpbGl0eSB0b1xyXG4vLyBwZXJmb3JtIGF1dG9tYXRpYyBzdGF0aWMgb3B0aW1pemF0aW9uLCBjYXVzaW5nIGV2ZXJ5IHBhZ2UgaW4geW91ciBhcHAgdG9cclxuLy8gYmUgc2VydmVyLXNpZGUgcmVuZGVyZWQuXHJcbi8vXHJcbl9hcHAuZ2V0SW5pdGlhbFByb3BzID0gYXN5bmMgKGFwcENvbnRleHQ6IGFueSkgPT4ge1xyXG5cdC8vIGNhbGxzIHBhZ2UncyBgZ2V0SW5pdGlhbFByb3BzYCBhbmQgZmlsbHMgYGFwcFByb3BzLnBhZ2VQcm9wc2BcclxuXHRjb25zdCBhcHBQcm9wcyA9IGF3YWl0IEFwcC5nZXRJbml0aWFsUHJvcHMoYXBwQ29udGV4dCk7XHJcblx0Y29uc3QgeyBjdHggfSA9IGFwcENvbnRleHQ7XHJcblx0Y29uc3QgY29va2llID0gY3R4LmlzU2VydmVyID8gY3R4LnJlcS5jb29raWVzLnRva2VuIDogJyc7XHJcblx0aWYgKGN0eC5pc1NlcnZlciAmJiBjb29raWUpIHtcclxuXHRcdGNvbnN0IHRva2VuID0gYXBwQ29udGV4dC5jdHgucmVxLmNvb2tpZXMudG9rZW4gfHwgJyc7XHJcblx0XHRjb25zdCByZXMgPSBhd2FpdCBheGlvcy5wb3N0KGAke1NFUlZFUn0vYXBpL2F1dGgvY2hlY2tgLCB7XHJcblx0XHRcdHRva2VuLFxyXG5cdFx0fSk7XHJcblx0XHRjb25zdCBpc0xvZ2luZWQgPSByZXMuZGF0YS5zdWNjZXNzO1xyXG5cdFx0Y29uc3QgdXNlciA9IHJlcy5kYXRhLnVzZXIgfHwge307XHJcblx0XHRjb25zdCBsb2dpblByb3BzID0geyBpc0xvZ2luZWQsIHVzZXIgfTtcclxuXHJcblx0XHRyZXR1cm4geyAuLi5hcHBQcm9wcywgbG9naW5Qcm9wcyB9O1xyXG5cdH1cclxuXHRyZXR1cm4geyAuLi5hcHBQcm9wcywgbG9naW5Qcm9wczogeyBpc0xvZ2luZWQ6IGZhbHNlLCB1c2VyOiB7fSB9IH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfYXBwO1xyXG4iLCIvLyBpbXBvcnQgcmVzZXQgZnJvbSBcIi4vcmVzZXQuY3NzXCI7XHJcbmltcG9ydCB7IGNyZWF0ZUdsb2JhbFN0eWxlIH0gZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xyXG5cclxuY29uc3QgR2xvYmFsU3R5bGUgPSBjcmVhdGVHbG9iYWxTdHlsZWBcclxuICAqIHtcclxuICAgIC8qIGJveC1zaXppbmc6IGJvcmRlci1ib3g7ICovXHJcbiAgICB9XHJcbiAgYm9keXtcclxuICAgIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLHN5c3RlbS11aSxCbGlua01hY1N5c3RlbUZvbnQsXCJTZWdvZSBVSVwiLFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsQXJpYWwsc2Fucy1zZXJpZiAhaW1wb3J0YW50O1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gIH1cclxuICBhIHtcclxuICAgIGNvbG9yOiBpbmhlcml0O1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gIH1cclxuICBpbnB1dCwgYnV0dG9uIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gICAgcGFkZGluZzogLjVyZW07XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjYWFhYWFhO1xyXG4gICAgYm9yZGVyLXJhZGl1czogLjI1cmVtO1xyXG4gICAgb3V0bGluZTogbm9uZTtcclxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICBmb250LXNpemU6IDAuOGVtO1xyXG4gIH1cclxuICBoMSwgaDIsIGgzLCBoNCwgaDUsIGg2e1xyXG4gICAgZm9udC1mYW1pbHk6J01hdmVuIFBybycsIHNhbnMtc2VyaWY7XHJcbiAgfVxyXG4gIGJ1dHRvbntcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICB9XHJcbiAgYnV0dG9uOmhvdmVye1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogbGluZWFyLWdyYWRpZW50KCNmZmZmZmYsI2FhYWFhYSlcclxuICB9XHJcbiAgaW5wdXQ6ZGlzYWJsZWR7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTVlN2U5O1xyXG4gIH1cclxuXHJcbiAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjhweCkge1xyXG4gICAgYm9keSB7XHJcbiAgICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNTc2cHgpIHtcclxuICAgIGJvZHkge1xyXG4gICAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICB9XHJcbiAgfVxyXG5gO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2xvYmFsU3R5bGU7XHJcbiIsImNvbnN0IFNFUlZFUiA9ICdodHRwOi8vbG9jYWxob3N0OjUwMDAnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU0VSVkVSO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic3R5bGVkLWNvbXBvbmVudHNcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==