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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../next-server/lib/constants":
/*!*********************************************************!*\
  !*** external "next/dist/next-server/lib/constants.js" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/constants.js");

/***/ }),

/***/ "../next-server/lib/document-context":
/*!****************************************************************!*\
  !*** external "next/dist/next-server/lib/document-context.js" ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/document-context.js");

/***/ }),

/***/ "../next-server/lib/utils":
/*!*****************************************************!*\
  !*** external "next/dist/next-server/lib/utils.js" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/utils.js");

/***/ }),

/***/ "../next-server/server/get-page-files":
/*!*****************************************************************!*\
  !*** external "next/dist/next-server/server/get-page-files.js" ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/server/get-page-files.js");

/***/ }),

/***/ "../next-server/server/utils":
/*!********************************************************!*\
  !*** external "next/dist/next-server/server/utils.js" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/server/utils.js");

/***/ }),

/***/ "../node_modules/next/dist/pages/_document.js":
/*!****************************************************!*\
  !*** ../node_modules/next/dist/pages/_document.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.__esModule = true;
exports.Html = Html;
exports.Main = Main;
exports.NextScript = exports.Head = exports.default = void 0;

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

var _server = _interopRequireDefault(__webpack_require__(/*! styled-jsx/server */ "styled-jsx/server"));

var _constants = __webpack_require__(/*! ../next-server/lib/constants */ "../next-server/lib/constants");

var _documentContext = __webpack_require__(/*! ../next-server/lib/document-context */ "../next-server/lib/document-context");

var _utils = __webpack_require__(/*! ../next-server/lib/utils */ "../next-server/lib/utils");

exports.DocumentContext = _utils.DocumentContext;
exports.DocumentInitialProps = _utils.DocumentInitialProps;
exports.DocumentProps = _utils.DocumentProps;

var _getPageFiles = __webpack_require__(/*! ../next-server/server/get-page-files */ "../next-server/server/get-page-files");

var _utils2 = __webpack_require__(/*! ../next-server/server/utils */ "../next-server/server/utils");

var _htmlescape = __webpack_require__(/*! ../server/htmlescape */ "../node_modules/next/dist/server/htmlescape.js");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function () {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

function dedupe(bundles) {
  const files = new Set();
  const kept = [];

  for (const bundle of bundles) {
    if (files.has(bundle.file)) continue;
    files.add(bundle.file);
    kept.push(bundle);
  }

  return kept;
}

function getDocumentFiles(buildManifest, pathname, inAmpMode) {
  const sharedFiles = (0, _getPageFiles.getPageFiles)(buildManifest, '/_app');
  const pageFiles = inAmpMode ? [] : (0, _getPageFiles.getPageFiles)(buildManifest, pathname);
  return {
    sharedFiles,
    pageFiles,
    allFiles: [...new Set([...sharedFiles, ...pageFiles])]
  };
}
/**
* `Document` component handles the initial `document` markup and renders only on the server side.
* Commonly used for implementing server side rendering for `css-in-js` libraries.
*/


class Document extends _react.Component {
  /**
  * `getInitialProps` hook returns the context object with the addition of `renderPage`.
  * `renderPage` callback executes `React` rendering logic synchronously to support server-rendering wrappers
  */
  static async getInitialProps(ctx) {
    const enhanceApp = App => {
      return props => /*#__PURE__*/_react.default.createElement(App, props);
    };

    const {
      html,
      head
    } = await ctx.renderPage({
      enhanceApp
    });
    const styles = [...(0, _server.default)()];
    return {
      html,
      head,
      styles
    };
  }

  static renderDocument(DocumentComponent, props) {
    return /*#__PURE__*/_react.default.createElement(_documentContext.DocumentContext.Provider, {
      value: props
    }, /*#__PURE__*/_react.default.createElement(DocumentComponent, props));
  }

  render() {
    return /*#__PURE__*/_react.default.createElement(Html, null, /*#__PURE__*/_react.default.createElement(Head, null), /*#__PURE__*/_react.default.createElement("body", null, /*#__PURE__*/_react.default.createElement(Main, null), /*#__PURE__*/_react.default.createElement(NextScript, null)));
  }

}

exports.default = Document;
Document.headTagsMiddleware =  false ? undefined : () => [];

function Html(props) {
  const {
    inAmpMode,
    docComponentsRendered,
    locale
  } = (0, _react.useContext)(_documentContext.DocumentContext);
  docComponentsRendered.Html = true;
  return /*#__PURE__*/_react.default.createElement("html", Object.assign({}, props, {
    lang: props.lang || locale || undefined,
    amp: inAmpMode ? '' : undefined,
    "data-ampdevmode": inAmpMode && true ? '' : undefined
  }));
}

class Head extends _react.Component {
  constructor(...args) {
    super(...args);
    this.context = void 0;
  }

  getCssLinks(files) {
    const {
      assetPrefix,
      devOnlyCacheBusterQueryString,
      dynamicImports
    } = this.context;
    const cssFiles = files.allFiles.filter(f => f.endsWith('.css'));
    const sharedFiles = new Set(files.sharedFiles); // Unmanaged files are CSS files that will be handled directly by the
    // webpack runtime (`mini-css-extract-plugin`).

    let unmangedFiles = new Set([]);
    let dynamicCssFiles = dedupe(dynamicImports.filter(f => f.file.endsWith('.css'))).map(f => f.file);

    if (dynamicCssFiles.length) {
      const existing = new Set(cssFiles);
      dynamicCssFiles = dynamicCssFiles.filter(f => !(existing.has(f) || sharedFiles.has(f)));
      unmangedFiles = new Set(dynamicCssFiles);
      cssFiles.push(...dynamicCssFiles);
    }

    let cssLinkElements = [];
    cssFiles.forEach(file => {
      const isSharedFile = sharedFiles.has(file);

      if (true) {
        cssLinkElements.push( /*#__PURE__*/_react.default.createElement("link", {
          key: `${file}-preload`,
          nonce: this.props.nonce,
          rel: "preload",
          href: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
          as: "style",
          crossOrigin: this.props.crossOrigin || undefined
        }));
      }

      const isUnmanagedFile = unmangedFiles.has(file);
      cssLinkElements.push( /*#__PURE__*/_react.default.createElement("link", {
        key: file,
        nonce: this.props.nonce,
        rel: "stylesheet",
        href: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
        crossOrigin: this.props.crossOrigin || undefined,
        "data-n-g": isUnmanagedFile ? undefined : isSharedFile ? '' : undefined,
        "data-n-p": isUnmanagedFile ? undefined : isSharedFile ? undefined : ''
      }));
    });

    if (false) {}

    return cssLinkElements.length === 0 ? null : cssLinkElements;
  }

  getPreloadDynamicChunks() {
    const {
      dynamicImports,
      assetPrefix,
      devOnlyCacheBusterQueryString
    } = this.context;
    return dedupe(dynamicImports).map(bundle => {
      if (!bundle.file.endsWith('.js')) {
        return null;
      }

      return /*#__PURE__*/_react.default.createElement("link", {
        rel: "preload",
        key: bundle.file,
        href: `${assetPrefix}/_next/${encodeURI(bundle.file)}${devOnlyCacheBusterQueryString}`,
        as: "script",
        nonce: this.props.nonce,
        crossOrigin: this.props.crossOrigin || undefined
      });
    }) // Filter out nulled scripts
    .filter(Boolean);
  }

  getPreloadMainLinks(files) {
    const {
      assetPrefix,
      devOnlyCacheBusterQueryString,
      scriptLoader
    } = this.context;
    const preloadFiles = files.allFiles.filter(file => {
      return file.endsWith('.js');
    });
    return [...(scriptLoader.eager || []).map(file => /*#__PURE__*/_react.default.createElement("link", {
      key: file.src,
      nonce: this.props.nonce,
      rel: "preload",
      href: file.src,
      as: "script",
      crossOrigin: this.props.crossOrigin || undefined
    })), ...preloadFiles.map(file => /*#__PURE__*/_react.default.createElement("link", {
      key: file,
      nonce: this.props.nonce,
      rel: "preload",
      href: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
      as: "script",
      crossOrigin: this.props.crossOrigin || undefined
    })), ...(scriptLoader.defer || []).map(file => /*#__PURE__*/_react.default.createElement("link", {
      key: file,
      nonce: this.props.nonce,
      rel: "preload",
      href: file,
      as: "script",
      crossOrigin: this.props.crossOrigin || undefined
    }))];
  }

  makeStylesheetInert(node) {
    return _react.default.Children.map(node, c => {
      if (c.type === 'link' && c.props['href'] && _constants.OPTIMIZED_FONT_PROVIDERS.some(url => c.props['href'].startsWith(url))) {
        const newProps = _objectSpread({}, c.props || {});

        newProps['data-href'] = newProps['href'];
        newProps['href'] = undefined;
        return /*#__PURE__*/_react.default.cloneElement(c, newProps);
      } else if (c.props && c.props['children']) {
        c.props['children'] = this.makeStylesheetInert(c.props['children']);
      }

      return c;
    });
  }

  render() {
    var _this$props$nonce, _this$props$nonce2;

    const {
      styles,
      ampPath,
      inAmpMode,
      hybridAmp,
      canonicalBase,
      __NEXT_DATA__,
      dangerousAsPath,
      headTags,
      unstable_runtimeJS,
      unstable_JsPreload
    } = this.context;
    const disableRuntimeJS = unstable_runtimeJS === false;
    const disableJsPreload = unstable_JsPreload === false;
    this.context.docComponentsRendered.Head = true;
    let {
      head
    } = this.context;
    let cssPreloads = [];
    let otherHeadElements = [];

    if (head) {
      head.forEach(c => {
        if (c && c.type === 'link' && c.props['rel'] === 'preload' && c.props['as'] === 'style') {
          cssPreloads.push(c);
        } else {
          c && otherHeadElements.push(c);
        }
      });
      head = cssPreloads.concat(otherHeadElements);
    }

    let children = this.props.children; // show a warning if Head contains <title> (only in development)

    if (true) {
      children = _react.default.Children.map(children, child => {
        var _child$props;

        const isReactHelmet = child == null ? void 0 : (_child$props = child.props) == null ? void 0 : _child$props['data-react-helmet'];

        if (!isReactHelmet) {
          var _child$props2;

          if ((child == null ? void 0 : child.type) === 'title') {
            console.warn("Warning: <title> should not be used in _document.js's <Head>. https://err.sh/next.js/no-document-title");
          } else if ((child == null ? void 0 : child.type) === 'meta' && (child == null ? void 0 : (_child$props2 = child.props) == null ? void 0 : _child$props2.name) === 'viewport') {
            console.warn("Warning: viewport meta tags should not be used in _document.js's <Head>. https://err.sh/next.js/no-document-viewport-meta");
          }
        }

        return child;
      });
      if (this.props.crossOrigin) console.warn('Warning: `Head` attribute `crossOrigin` is deprecated. https://err.sh/next.js/doc-crossorigin-deprecated');
    }

    if (false) {}

    let hasAmphtmlRel = false;
    let hasCanonicalRel = false; // show warning and remove conflicting amp head tags

    head = _react.default.Children.map(head || [], child => {
      if (!child) return child;
      const {
        type,
        props
      } = child;

      if (inAmpMode) {
        let badProp = '';

        if (type === 'meta' && props.name === 'viewport') {
          badProp = 'name="viewport"';
        } else if (type === 'link' && props.rel === 'canonical') {
          hasCanonicalRel = true;
        } else if (type === 'script') {
          // only block if
          // 1. it has a src and isn't pointing to ampproject's CDN
          // 2. it is using dangerouslySetInnerHTML without a type or
          // a type of text/javascript
          if (props.src && props.src.indexOf('ampproject') < -1 || props.dangerouslySetInnerHTML && (!props.type || props.type === 'text/javascript')) {
            badProp = '<script';
            Object.keys(props).forEach(prop => {
              badProp += ` ${prop}="${props[prop]}"`;
            });
            badProp += '/>';
          }
        }

        if (badProp) {
          console.warn(`Found conflicting amp tag "${child.type}" with conflicting prop ${badProp} in ${__NEXT_DATA__.page}. https://err.sh/next.js/conflicting-amp-tag`);
          return null;
        }
      } else {
        // non-amp mode
        if (type === 'link' && props.rel === 'amphtml') {
          hasAmphtmlRel = true;
        }
      }

      return child;
    }); // try to parse styles from fragment for backwards compat

    const curStyles = Array.isArray(styles) ? styles : [];

    if (inAmpMode && styles && // @ts-ignore Property 'props' does not exist on type ReactElement
    styles.props && // @ts-ignore Property 'props' does not exist on type ReactElement
    Array.isArray(styles.props.children)) {
      const hasStyles = el => {
        var _el$props, _el$props$dangerously;

        return el == null ? void 0 : (_el$props = el.props) == null ? void 0 : (_el$props$dangerously = _el$props.dangerouslySetInnerHTML) == null ? void 0 : _el$props$dangerously.__html;
      }; // @ts-ignore Property 'props' does not exist on type ReactElement


      styles.props.children.forEach(child => {
        if (Array.isArray(child)) {
          child.forEach(el => hasStyles(el) && curStyles.push(el));
        } else if (hasStyles(child)) {
          curStyles.push(child);
        }
      });
    }

    const files = getDocumentFiles(this.context.buildManifest, this.context.__NEXT_DATA__.page, inAmpMode);
    return /*#__PURE__*/_react.default.createElement("head", this.props, this.context.isDevelopment && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("style", {
      "data-next-hide-fouc": true,
      "data-ampdevmode": inAmpMode ? 'true' : undefined,
      dangerouslySetInnerHTML: {
        __html: `body{display:none}`
      }
    }), /*#__PURE__*/_react.default.createElement("noscript", {
      "data-next-hide-fouc": true,
      "data-ampdevmode": inAmpMode ? 'true' : undefined
    }, /*#__PURE__*/_react.default.createElement("style", {
      dangerouslySetInnerHTML: {
        __html: `body{display:block}`
      }
    }))), children, head, /*#__PURE__*/_react.default.createElement("meta", {
      name: "next-head-count",
      content: _react.default.Children.count(head || []).toString()
    }), inAmpMode && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("meta", {
      name: "viewport",
      content: "width=device-width,minimum-scale=1,initial-scale=1"
    }), !hasCanonicalRel && /*#__PURE__*/_react.default.createElement("link", {
      rel: "canonical",
      href: canonicalBase + (0, _utils2.cleanAmpPath)(dangerousAsPath)
    }), /*#__PURE__*/_react.default.createElement("link", {
      rel: "preload",
      as: "script",
      href: "https://cdn.ampproject.org/v0.js"
    }), styles && /*#__PURE__*/_react.default.createElement("style", {
      "amp-custom": "",
      dangerouslySetInnerHTML: {
        __html: curStyles.map(style => style.props.dangerouslySetInnerHTML.__html).join('').replace(/\/\*# sourceMappingURL=.*\*\//g, '').replace(/\/\*@ sourceURL=.*?\*\//g, '')
      }
    }), /*#__PURE__*/_react.default.createElement("style", {
      "amp-boilerplate": "",
      dangerouslySetInnerHTML: {
        __html: `body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}`
      }
    }), /*#__PURE__*/_react.default.createElement("noscript", null, /*#__PURE__*/_react.default.createElement("style", {
      "amp-boilerplate": "",
      dangerouslySetInnerHTML: {
        __html: `body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}`
      }
    })), /*#__PURE__*/_react.default.createElement("script", {
      async: true,
      src: "https://cdn.ampproject.org/v0.js"
    })), !inAmpMode && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !hasAmphtmlRel && hybridAmp && /*#__PURE__*/_react.default.createElement("link", {
      rel: "amphtml",
      href: canonicalBase + getAmpPath(ampPath, dangerousAsPath)
    }),  true && this.getCssLinks(files),  true && /*#__PURE__*/_react.default.createElement("noscript", {
      "data-n-css": (_this$props$nonce = this.props.nonce) != null ? _this$props$nonce : ''
    }), !disableRuntimeJS && !disableJsPreload && this.getPreloadDynamicChunks(), !disableRuntimeJS && !disableJsPreload && this.getPreloadMainLinks(files),  false && false,  false && /*#__PURE__*/false, this.context.isDevelopment &&
    /*#__PURE__*/
    // this element is used to mount development styles so the
    // ordering matches production
    // (by default, style-loader injects at the bottom of <head />)
    _react.default.createElement("noscript", {
      id: "__next_css__DO_NOT_USE__"
    }), styles || null), /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {}, ...(headTags || [])));
  }

}

exports.Head = Head;
Head.contextType = _documentContext.DocumentContext;
Head.propTypes = {
  nonce: _propTypes.default.string,
  crossOrigin: _propTypes.default.string
};

function Main() {
  const {
    inAmpMode,
    html,
    docComponentsRendered
  } = (0, _react.useContext)(_documentContext.DocumentContext);
  docComponentsRendered.Main = true;
  if (inAmpMode) return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, _constants.AMP_RENDER_TARGET);
  return /*#__PURE__*/_react.default.createElement("div", {
    id: "__next",
    dangerouslySetInnerHTML: {
      __html: html
    }
  });
}

class NextScript extends _react.Component {
  constructor(...args) {
    super(...args);
    this.context = void 0;
  }

  getDynamicChunks(files) {
    const {
      dynamicImports,
      assetPrefix,
      isDevelopment,
      devOnlyCacheBusterQueryString
    } = this.context;
    return dedupe(dynamicImports).map(bundle => {
      if (!bundle.file.endsWith('.js') || files.allFiles.includes(bundle.file)) return null;
      return /*#__PURE__*/_react.default.createElement("script", {
        async: !isDevelopment,
        key: bundle.file,
        src: `${assetPrefix}/_next/${encodeURI(bundle.file)}${devOnlyCacheBusterQueryString}`,
        nonce: this.props.nonce,
        crossOrigin: this.props.crossOrigin || undefined
      });
    });
  }

  getPreNextScripts() {
    const {
      scriptLoader
    } = this.context;
    return (scriptLoader.eager || []).map(file => {
      return /*#__PURE__*/_react.default.createElement("script", Object.assign({}, file, {
        nonce: this.props.nonce,
        crossOrigin: this.props.crossOrigin || undefined
      }));
    });
  }

  getScripts(files) {
    var _buildManifest$lowPri;

    const {
      assetPrefix,
      buildManifest,
      isDevelopment,
      devOnlyCacheBusterQueryString
    } = this.context;
    const normalScripts = files.allFiles.filter(file => file.endsWith('.js'));
    const lowPriorityScripts = (_buildManifest$lowPri = buildManifest.lowPriorityFiles) == null ? void 0 : _buildManifest$lowPri.filter(file => file.endsWith('.js'));
    return [...normalScripts, ...lowPriorityScripts].map(file => {
      return /*#__PURE__*/_react.default.createElement("script", {
        key: file,
        src: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
        nonce: this.props.nonce,
        async: !isDevelopment,
        crossOrigin: this.props.crossOrigin || undefined
      });
    });
  }

  getPolyfillScripts() {
    // polyfills.js has to be rendered as nomodule without async
    // It also has to be the first script to load
    const {
      assetPrefix,
      buildManifest,
      devOnlyCacheBusterQueryString
    } = this.context;
    return buildManifest.polyfillFiles.filter(polyfill => polyfill.endsWith('.js') && !polyfill.endsWith('.module.js')).map(polyfill => /*#__PURE__*/_react.default.createElement("script", {
      key: polyfill,
      nonce: this.props.nonce,
      crossOrigin: this.props.crossOrigin || undefined,
      noModule: true,
      src: `${assetPrefix}/_next/${polyfill}${devOnlyCacheBusterQueryString}`
    }));
  }

  static getInlineScriptSource(documentProps) {
    const {
      __NEXT_DATA__
    } = documentProps;

    try {
      const data = JSON.stringify(__NEXT_DATA__);
      return (0, _htmlescape.htmlEscapeJsonString)(data);
    } catch (err) {
      if (err.message.indexOf('circular structure')) {
        throw new Error(`Circular structure in "getInitialProps" result of page "${__NEXT_DATA__.page}". https://err.sh/vercel/next.js/circular-structure`);
      }

      throw err;
    }
  }

  render() {
    const {
      assetPrefix,
      inAmpMode,
      buildManifest,
      unstable_runtimeJS,
      docComponentsRendered,
      devOnlyCacheBusterQueryString
    } = this.context;
    const disableRuntimeJS = unstable_runtimeJS === false;
    docComponentsRendered.NextScript = true;

    if (inAmpMode) {
      if (false) {}

      const ampDevFiles = [...buildManifest.devFiles, ...buildManifest.polyfillFiles, ...buildManifest.ampDevFiles];
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, disableRuntimeJS ? null : /*#__PURE__*/_react.default.createElement("script", {
        id: "__NEXT_DATA__",
        type: "application/json",
        nonce: this.props.nonce,
        crossOrigin: this.props.crossOrigin || undefined,
        dangerouslySetInnerHTML: {
          __html: NextScript.getInlineScriptSource(this.context)
        },
        "data-ampdevmode": true
      }), ampDevFiles.map(file => /*#__PURE__*/_react.default.createElement("script", {
        key: file,
        src: `${assetPrefix}/_next/${file}${devOnlyCacheBusterQueryString}`,
        nonce: this.props.nonce,
        crossOrigin: this.props.crossOrigin || undefined,
        "data-ampdevmode": true
      })));
    }

    if (true) {
      if (this.props.crossOrigin) console.warn('Warning: `NextScript` attribute `crossOrigin` is deprecated. https://err.sh/next.js/doc-crossorigin-deprecated');
    }

    const files = getDocumentFiles(this.context.buildManifest, this.context.__NEXT_DATA__.page, inAmpMode);
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !disableRuntimeJS && buildManifest.devFiles ? buildManifest.devFiles.map(file => /*#__PURE__*/_react.default.createElement("script", {
      key: file,
      src: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
      nonce: this.props.nonce,
      crossOrigin: this.props.crossOrigin || undefined
    })) : null, disableRuntimeJS ? null : /*#__PURE__*/_react.default.createElement("script", {
      id: "__NEXT_DATA__",
      type: "application/json",
      nonce: this.props.nonce,
      crossOrigin: this.props.crossOrigin || undefined,
      dangerouslySetInnerHTML: {
        __html: NextScript.getInlineScriptSource(this.context)
      }
    }), !disableRuntimeJS && this.getPolyfillScripts(), !disableRuntimeJS && this.getPreNextScripts(), disableRuntimeJS ? null : this.getDynamicChunks(files), disableRuntimeJS ? null : this.getScripts(files));
  }

}

exports.NextScript = NextScript;
NextScript.contextType = _documentContext.DocumentContext;
NextScript.propTypes = {
  nonce: _propTypes.default.string,
  crossOrigin: _propTypes.default.string
};
NextScript.safariNomoduleFix = '!function(){var e=document,t=e.createElement("script");if(!("noModule"in t)&&"onbeforeload"in t){var n=!1;e.addEventListener("beforeload",function(e){if(e.target===t)n=!0;else if(!e.target.hasAttribute("nomodule")||!n)return;e.preventDefault()},!0),t.type="module",t.src=".",e.head.appendChild(t),t.remove()}}();';

function getAmpPath(ampPath, asPath) {
  return ampPath || `${asPath}${asPath.includes('?') ? '&' : '?'}amp=1`;
}

/***/ }),

/***/ "../node_modules/next/dist/server/htmlescape.js":
/*!******************************************************!*\
  !*** ../node_modules/next/dist/server/htmlescape.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
exports.__esModule=true;exports.htmlEscapeJsonString=htmlEscapeJsonString;// This utility is based on https://github.com/zertosh/htmlescape
// License: https://github.com/zertosh/htmlescape/blob/0527ca7156a524d256101bb310a9f970f63078ad/LICENSE
const ESCAPE_LOOKUP={'&':'\\u0026','>':'\\u003e','<':'\\u003c','\u2028':'\\u2028','\u2029':'\\u2029'};const ESCAPE_REGEX=/[&><\u2028\u2029]/g;function htmlEscapeJsonString(str){return str.replace(ESCAPE_REGEX,match=>ESCAPE_LOOKUP[match]);}
//# sourceMappingURL=htmlescape.js.map

/***/ }),

/***/ "../node_modules/next/document.js":
/*!****************************************!*\
  !*** ../node_modules/next/document.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/pages/_document */ "../node_modules/next/dist/pages/_document.js")


/***/ }),

/***/ "./pages/_document.tsx":
/*!*****************************!*\
  !*** ./pages/_document.tsx ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MyDocument; });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/document */ "../node_modules/next/document.js");
/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_document__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/styles */ "@material-ui/styles");
/* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_styles__WEBPACK_IMPORTED_MODULE_4__);


var _jsxFileName = "C:\\Users\\hby84\\OneDrive\\\uBC14\uD0D5 \uD654\uBA74\\210428\\localhost_web\\client\\pages\\_document.tsx";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import { GetStaticProps } from 'next';


 // styled-components SSR 제공


// 클래스형
class MyDocument extends next_document__WEBPACK_IMPORTED_MODULE_1___default.a {
  static async getInitialProps(ctx) {
    const styledComponentSheet = new styled_components__WEBPACK_IMPORTED_MODULE_3__["ServerStyleSheet"]();
    const materialSheets = new _material_ui_styles__WEBPACK_IMPORTED_MODULE_4__["ServerStyleSheets"]();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () => originalRenderPage({
        enhanceApp: App => props => styledComponentSheet.collectStyles(materialSheets.collect( /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(App, _objectSpread({}, props), void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 24,
          columnNumber: 31
        }, this)))
      });

      const initialProps = await next_document__WEBPACK_IMPORTED_MODULE_1___default.a.getInitialProps(ctx);
      return _objectSpread(_objectSpread({}, initialProps), {}, {
        styles: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
          children: [initialProps.styles, materialSheets.getStyleElement(), styledComponentSheet.getStyleElement()]
        }, void 0, true)
      });
    } finally {
      styledComponentSheet.seal();
    }
  }

  render() {
    return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(next_document__WEBPACK_IMPORTED_MODULE_1__["Html"], {
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(next_document__WEBPACK_IMPORTED_MODULE_1__["Head"], {
        children: this.props.styleTags
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 46,
        columnNumber: 5
      }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("body", {
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(next_document__WEBPACK_IMPORTED_MODULE_1__["Main"], {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 51,
          columnNumber: 6
        }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(next_document__WEBPACK_IMPORTED_MODULE_1__["NextScript"], {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 52,
          columnNumber: 6
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 50,
        columnNumber: 5
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 4
    }, this);
  }

}

/***/ }),

/***/ 1:
/*!**********************************************!*\
  !*** multi private-next-pages/_document.tsx ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! private-next-pages/_document.tsx */"./pages/_document.tsx");


/***/ }),

/***/ "@material-ui/styles":
/*!**************************************!*\
  !*** external "@material-ui/styles" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/styles");

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prop-types");

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

/***/ }),

/***/ "styled-jsx/server":
/*!************************************!*\
  !*** external "styled-jsx/server" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("styled-jsx/server");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmV4dC9kaXN0L25leHQtc2VydmVyL2xpYi9jb25zdGFudHMuanNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXh0L2Rpc3QvbmV4dC1zZXJ2ZXIvbGliL2RvY3VtZW50LWNvbnRleHQuanNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXh0L2Rpc3QvbmV4dC1zZXJ2ZXIvbGliL3V0aWxzLmpzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmV4dC9kaXN0L25leHQtc2VydmVyL3NlcnZlci9nZXQtcGFnZS1maWxlcy5qc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5leHQvZGlzdC9uZXh0LXNlcnZlci9zZXJ2ZXIvdXRpbHMuanNcIiIsIndlYnBhY2s6Ly8vLi4vLi4vcGFnZXMvX2RvY3VtZW50LnRzeCIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9zZXJ2ZXIvaHRtbGVzY2FwZS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL25leHQvZG9jdW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvX2RvY3VtZW50LnRzeCIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbWF0ZXJpYWwtdWkvc3R5bGVzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicHJvcC10eXBlc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QvanN4LWRldi1ydW50aW1lXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic3R5bGVkLWNvbXBvbmVudHNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzdHlsZWQtanN4L3NlcnZlclwiIl0sIm5hbWVzIjpbImZpbGVzIiwia2VwdCIsImJ1bmRsZSIsInNoYXJlZEZpbGVzIiwicGFnZUZpbGVzIiwiaW5BbXBNb2RlIiwiYWxsRmlsZXMiLCJDb21wb25lbnQiLCJlbmhhbmNlQXBwIiwiQXBwIiwicHJvcHMiLCJjdHgiLCJzdHlsZXMiLCJyZW5kZXIiLCJEb2N1bWVudCIsImhlYWRUYWdzTWlkZGxld2FyZSIsInByb2Nlc3MiLCJEb2N1bWVudENvbXBvbmVudENvbnRleHQiLCJkb2NDb21wb25lbnRzUmVuZGVyZWQiLCJnZXRDc3NMaW5rcyIsImNzc0ZpbGVzIiwiZiIsInVubWFuZ2VkRmlsZXMiLCJkeW5hbWljQ3NzRmlsZXMiLCJkZWR1cGUiLCJkeW5hbWljSW1wb3J0cyIsImV4aXN0aW5nIiwiY3NzTGlua0VsZW1lbnRzIiwiZmlsZSIsImlzU2hhcmVkRmlsZSIsImFzc2V0UHJlZml4IiwiZW5jb2RlVVJJIiwiZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmciLCJpc1VubWFuYWdlZEZpbGUiLCJnZXRQcmVsb2FkRHluYW1pY0NodW5rcyIsImdldFByZWxvYWRNYWluTGlua3MiLCJwcmVsb2FkRmlsZXMiLCJzY3JpcHRMb2FkZXIiLCJtYWtlU3R5bGVzaGVldEluZXJ0IiwiUmVhY3QiLCJjIiwiT1BUSU1JWkVEX0ZPTlRfUFJPVklERVJTIiwidXJsIiwibmV3UHJvcHMiLCJkaXNhYmxlUnVudGltZUpTIiwidW5zdGFibGVfcnVudGltZUpTIiwiZGlzYWJsZUpzUHJlbG9hZCIsInVuc3RhYmxlX0pzUHJlbG9hZCIsImNzc1ByZWxvYWRzIiwib3RoZXJIZWFkRWxlbWVudHMiLCJoZWFkIiwiY2hpbGRyZW4iLCJjaGlsZCIsImlzUmVhY3RIZWxtZXQiLCJjb25zb2xlIiwiaGFzQW1waHRtbFJlbCIsImhhc0Nhbm9uaWNhbFJlbCIsImJhZFByb3AiLCJ0eXBlIiwiT2JqZWN0IiwicHJvcCIsIl9fTkVYVF9EQVRBX18iLCJwYWdlIiwiY3VyU3R5bGVzIiwiQXJyYXkiLCJoYXNTdHlsZXMiLCJlbCIsImdldERvY3VtZW50RmlsZXMiLCJfX2h0bWwiLCJjYW5vbmljYWxCYXNlIiwic3R5bGUiLCJnZXRBbXBQYXRoIiwiaGVhZFRhZ3MiLCJIZWFkIiwiY29udGV4dFR5cGUiLCJwcm9wVHlwZXMiLCJub25jZSIsIlByb3BUeXBlcyIsImNyb3NzT3JpZ2luIiwiQU1QX1JFTkRFUl9UQVJHRVQiLCJnZXREeW5hbWljQ2h1bmtzIiwiZ2V0UHJlTmV4dFNjcmlwdHMiLCJnZXRTY3JpcHRzIiwibm9ybWFsU2NyaXB0cyIsImxvd1ByaW9yaXR5U2NyaXB0cyIsImJ1aWxkTWFuaWZlc3QiLCJnZXRQb2x5ZmlsbFNjcmlwdHMiLCJwb2x5ZmlsbCIsImRhdGEiLCJKU09OIiwiZXJyIiwiYW1wRGV2RmlsZXMiLCJOZXh0U2NyaXB0Iiwic2FmYXJpTm9tb2R1bGVGaXgiLCJhbXBQYXRoIiwiYXNQYXRoIiwiTXlEb2N1bWVudCIsImdldEluaXRpYWxQcm9wcyIsInN0eWxlZENvbXBvbmVudFNoZWV0IiwiU2VydmVyU3R5bGVTaGVldCIsIm1hdGVyaWFsU2hlZXRzIiwiU2VydmVyU3R5bGVTaGVldHMiLCJvcmlnaW5hbFJlbmRlclBhZ2UiLCJyZW5kZXJQYWdlIiwiY29sbGVjdFN0eWxlcyIsImNvbGxlY3QiLCJpbml0aWFsUHJvcHMiLCJnZXRTdHlsZUVsZW1lbnQiLCJzZWFsIiwic3R5bGVUYWdzIl0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlD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O0FBQUEsY0FMRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFERDtBQVlBOztBQTNDc0QsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNaeEQsZ0Q7Ozs7Ozs7Ozs7O0FDQUEsdUM7Ozs7Ozs7Ozs7O0FDQUEsa0M7Ozs7Ozs7Ozs7O0FDQUEsa0Q7Ozs7Ozs7Ozs7O0FDQUEsOEM7Ozs7Ozs7Ozs7O0FDQUEsOEMiLCJmaWxlIjoicGFnZXMvX2RvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSByZXF1aXJlKCcuLi9zc3ItbW9kdWxlLWNhY2hlLmpzJyk7XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdHZhciB0aHJldyA9IHRydWU7XG4gXHRcdHRyeSB7XG4gXHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4gXHRcdFx0dGhyZXcgPSBmYWxzZTtcbiBcdFx0fSBmaW5hbGx5IHtcbiBcdFx0XHRpZih0aHJldykgZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHR9XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L25leHQtc2VydmVyL2xpYi9jb25zdGFudHMuanNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L25leHQtc2VydmVyL2xpYi9kb2N1bWVudC1jb250ZXh0LmpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvZGlzdC9uZXh0LXNlcnZlci9saWIvdXRpbHMuanNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L25leHQtc2VydmVyL3NlcnZlci9nZXQtcGFnZS1maWxlcy5qc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3QvbmV4dC1zZXJ2ZXIvc2VydmVyL3V0aWxzLmpzXCIpOyIsImltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFJlYWN0RWxlbWVudCwgUmVhY3ROb2RlLCB1c2VDb250ZXh0IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgZmx1c2ggZnJvbSAnc3R5bGVkLWpzeC9zZXJ2ZXInXG5pbXBvcnQge1xuICBBTVBfUkVOREVSX1RBUkdFVCxcbiAgT1BUSU1JWkVEX0ZPTlRfUFJPVklERVJTLFxufSBmcm9tICcuLi9uZXh0LXNlcnZlci9saWIvY29uc3RhbnRzJ1xuaW1wb3J0IHsgRG9jdW1lbnRDb250ZXh0IGFzIERvY3VtZW50Q29tcG9uZW50Q29udGV4dCB9IGZyb20gJy4uL25leHQtc2VydmVyL2xpYi9kb2N1bWVudC1jb250ZXh0J1xuaW1wb3J0IHtcbiAgRG9jdW1lbnRDb250ZXh0LFxuICBEb2N1bWVudEluaXRpYWxQcm9wcyxcbiAgRG9jdW1lbnRQcm9wcyxcbn0gZnJvbSAnLi4vbmV4dC1zZXJ2ZXIvbGliL3V0aWxzJ1xuaW1wb3J0IHtcbiAgQnVpbGRNYW5pZmVzdCxcbiAgZ2V0UGFnZUZpbGVzLFxufSBmcm9tICcuLi9uZXh0LXNlcnZlci9zZXJ2ZXIvZ2V0LXBhZ2UtZmlsZXMnXG5pbXBvcnQgeyBjbGVhbkFtcFBhdGggfSBmcm9tICcuLi9uZXh0LXNlcnZlci9zZXJ2ZXIvdXRpbHMnXG5pbXBvcnQgeyBodG1sRXNjYXBlSnNvblN0cmluZyB9IGZyb20gJy4uL3NlcnZlci9odG1sZXNjYXBlJ1xuXG5leHBvcnQgeyBEb2N1bWVudENvbnRleHQsIERvY3VtZW50SW5pdGlhbFByb3BzLCBEb2N1bWVudFByb3BzIH1cblxuZXhwb3J0IHR5cGUgT3JpZ2luUHJvcHMgPSB7XG4gIG5vbmNlPzogc3RyaW5nXG4gIGNyb3NzT3JpZ2luPzogc3RyaW5nXG59XG5cbmZ1bmN0aW9uIGRlZHVwZTxUIGV4dGVuZHMgeyBmaWxlOiBzdHJpbmcgfT4oYnVuZGxlczogVFtdKTogVFtdIHtcbiAgY29uc3QgZmlsZXMgPSBuZXcgU2V0PHN0cmluZz4oKVxuICBjb25zdCBrZXB0OiBUW10gPSBbXVxuXG4gIGZvciAoY29uc3QgYnVuZGxlIG9mIGJ1bmRsZXMpIHtcbiAgICBpZiAoZmlsZXMuaGFzKGJ1bmRsZS5maWxlKSkgY29udGludWVcbiAgICBmaWxlcy5hZGQoYnVuZGxlLmZpbGUpXG4gICAga2VwdC5wdXNoKGJ1bmRsZSlcbiAgfVxuICByZXR1cm4ga2VwdFxufVxuXG50eXBlIERvY3VtZW50RmlsZXMgPSB7XG4gIHNoYXJlZEZpbGVzOiByZWFkb25seSBzdHJpbmdbXVxuICBwYWdlRmlsZXM6IHJlYWRvbmx5IHN0cmluZ1tdXG4gIGFsbEZpbGVzOiByZWFkb25seSBzdHJpbmdbXVxufVxuXG5mdW5jdGlvbiBnZXREb2N1bWVudEZpbGVzKFxuICBidWlsZE1hbmlmZXN0OiBCdWlsZE1hbmlmZXN0LFxuICBwYXRobmFtZTogc3RyaW5nLFxuICBpbkFtcE1vZGU6IGJvb2xlYW5cbik6IERvY3VtZW50RmlsZXMge1xuICBjb25zdCBzaGFyZWRGaWxlczogcmVhZG9ubHkgc3RyaW5nW10gPSBnZXRQYWdlRmlsZXMoYnVpbGRNYW5pZmVzdCwgJy9fYXBwJylcbiAgY29uc3QgcGFnZUZpbGVzOiByZWFkb25seSBzdHJpbmdbXSA9IGluQW1wTW9kZVxuICAgID8gW11cbiAgICA6IGdldFBhZ2VGaWxlcyhidWlsZE1hbmlmZXN0LCBwYXRobmFtZSlcblxuICByZXR1cm4ge1xuICAgIHNoYXJlZEZpbGVzLFxuICAgIHBhZ2VGaWxlcyxcbiAgICBhbGxGaWxlczogWy4uLm5ldyBTZXQoWy4uLnNoYXJlZEZpbGVzLCAuLi5wYWdlRmlsZXNdKV0sXG4gIH1cbn1cblxuLyoqXG4gKiBgRG9jdW1lbnRgIGNvbXBvbmVudCBoYW5kbGVzIHRoZSBpbml0aWFsIGBkb2N1bWVudGAgbWFya3VwIGFuZCByZW5kZXJzIG9ubHkgb24gdGhlIHNlcnZlciBzaWRlLlxuICogQ29tbW9ubHkgdXNlZCBmb3IgaW1wbGVtZW50aW5nIHNlcnZlciBzaWRlIHJlbmRlcmluZyBmb3IgYGNzcy1pbi1qc2AgbGlicmFyaWVzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N1bWVudDxQID0ge30+IGV4dGVuZHMgQ29tcG9uZW50PERvY3VtZW50UHJvcHMgJiBQPiB7XG4gIHN0YXRpYyBoZWFkVGFnc01pZGRsZXdhcmUgPSBwcm9jZXNzLmVudi5fX05FWFRfUExVR0lOU1xuICAgID8gaW1wb3J0KFxuICAgICAgICAvLyBAdHMtaWdub3JlIGxvYWRlciBzeW50YXhcbiAgICAgICAgJ25leHQtcGx1Z2luLWxvYWRlcj9taWRkbGV3YXJlPWRvY3VtZW50LWhlYWQtdGFncy1zZXJ2ZXIhJ1xuICAgICAgKVxuICAgIDogKCkgPT4gW11cblxuICAvKipcbiAgICogYGdldEluaXRpYWxQcm9wc2AgaG9vayByZXR1cm5zIHRoZSBjb250ZXh0IG9iamVjdCB3aXRoIHRoZSBhZGRpdGlvbiBvZiBgcmVuZGVyUGFnZWAuXG4gICAqIGByZW5kZXJQYWdlYCBjYWxsYmFjayBleGVjdXRlcyBgUmVhY3RgIHJlbmRlcmluZyBsb2dpYyBzeW5jaHJvbm91c2x5IHRvIHN1cHBvcnQgc2VydmVyLXJlbmRlcmluZyB3cmFwcGVyc1xuICAgKi9cbiAgc3RhdGljIGFzeW5jIGdldEluaXRpYWxQcm9wcyhcbiAgICBjdHg6IERvY3VtZW50Q29udGV4dFxuICApOiBQcm9taXNlPERvY3VtZW50SW5pdGlhbFByb3BzPiB7XG4gICAgY29uc3QgZW5oYW5jZUFwcCA9IChBcHA6IGFueSkgPT4ge1xuICAgICAgcmV0dXJuIChwcm9wczogYW55KSA9PiA8QXBwIHsuLi5wcm9wc30gLz5cbiAgICB9XG5cbiAgICBjb25zdCB7IGh0bWwsIGhlYWQgfSA9IGF3YWl0IGN0eC5yZW5kZXJQYWdlKHsgZW5oYW5jZUFwcCB9KVxuICAgIGNvbnN0IHN0eWxlcyA9IFsuLi5mbHVzaCgpXVxuICAgIHJldHVybiB7IGh0bWwsIGhlYWQsIHN0eWxlcyB9XG4gIH1cblxuICBzdGF0aWMgcmVuZGVyRG9jdW1lbnQ8UD4oXG4gICAgRG9jdW1lbnRDb21wb25lbnQ6IG5ldyAoKSA9PiBEb2N1bWVudDxQPixcbiAgICBwcm9wczogRG9jdW1lbnRQcm9wcyAmIFBcbiAgKTogUmVhY3QuUmVhY3RFbGVtZW50IHtcbiAgICByZXR1cm4gKFxuICAgICAgPERvY3VtZW50Q29tcG9uZW50Q29udGV4dC5Qcm92aWRlciB2YWx1ZT17cHJvcHN9PlxuICAgICAgICA8RG9jdW1lbnRDb21wb25lbnQgey4uLnByb3BzfSAvPlxuICAgICAgPC9Eb2N1bWVudENvbXBvbmVudENvbnRleHQuUHJvdmlkZXI+XG4gICAgKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8SHRtbD5cbiAgICAgICAgPEhlYWQgLz5cbiAgICAgICAgPGJvZHk+XG4gICAgICAgICAgPE1haW4gLz5cbiAgICAgICAgICA8TmV4dFNjcmlwdCAvPlxuICAgICAgICA8L2JvZHk+XG4gICAgICA8L0h0bWw+XG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBIdG1sKFxuICBwcm9wczogUmVhY3QuRGV0YWlsZWRIVE1MUHJvcHM8XG4gICAgUmVhY3QuSHRtbEhUTUxBdHRyaWJ1dGVzPEhUTUxIdG1sRWxlbWVudD4sXG4gICAgSFRNTEh0bWxFbGVtZW50XG4gID5cbikge1xuICBjb25zdCB7IGluQW1wTW9kZSwgZG9jQ29tcG9uZW50c1JlbmRlcmVkLCBsb2NhbGUgfSA9IHVzZUNvbnRleHQoXG4gICAgRG9jdW1lbnRDb21wb25lbnRDb250ZXh0XG4gIClcblxuICBkb2NDb21wb25lbnRzUmVuZGVyZWQuSHRtbCA9IHRydWVcblxuICByZXR1cm4gKFxuICAgIDxodG1sXG4gICAgICB7Li4ucHJvcHN9XG4gICAgICBsYW5nPXtwcm9wcy5sYW5nIHx8IGxvY2FsZSB8fCB1bmRlZmluZWR9XG4gICAgICBhbXA9e2luQW1wTW9kZSA/ICcnIDogdW5kZWZpbmVkfVxuICAgICAgZGF0YS1hbXBkZXZtb2RlPXtcbiAgICAgICAgaW5BbXBNb2RlICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyAnJyA6IHVuZGVmaW5lZFxuICAgICAgfVxuICAgIC8+XG4gIClcbn1cblxuZXhwb3J0IGNsYXNzIEhlYWQgZXh0ZW5kcyBDb21wb25lbnQ8XG4gIE9yaWdpblByb3BzICZcbiAgICBSZWFjdC5EZXRhaWxlZEhUTUxQcm9wczxcbiAgICAgIFJlYWN0LkhUTUxBdHRyaWJ1dGVzPEhUTUxIZWFkRWxlbWVudD4sXG4gICAgICBIVE1MSGVhZEVsZW1lbnRcbiAgICA+XG4+IHtcbiAgc3RhdGljIGNvbnRleHRUeXBlID0gRG9jdW1lbnRDb21wb25lbnRDb250ZXh0XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBub25jZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjcm9zc09yaWdpbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgfVxuXG4gIGNvbnRleHQhOiBSZWFjdC5Db250ZXh0VHlwZTx0eXBlb2YgRG9jdW1lbnRDb21wb25lbnRDb250ZXh0PlxuXG4gIGdldENzc0xpbmtzKGZpbGVzOiBEb2N1bWVudEZpbGVzKTogSlNYLkVsZW1lbnRbXSB8IG51bGwge1xuICAgIGNvbnN0IHtcbiAgICAgIGFzc2V0UHJlZml4LFxuICAgICAgZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmcsXG4gICAgICBkeW5hbWljSW1wb3J0cyxcbiAgICB9ID0gdGhpcy5jb250ZXh0XG4gICAgY29uc3QgY3NzRmlsZXMgPSBmaWxlcy5hbGxGaWxlcy5maWx0ZXIoKGYpID0+IGYuZW5kc1dpdGgoJy5jc3MnKSlcbiAgICBjb25zdCBzaGFyZWRGaWxlczogU2V0PHN0cmluZz4gPSBuZXcgU2V0KGZpbGVzLnNoYXJlZEZpbGVzKVxuXG4gICAgLy8gVW5tYW5hZ2VkIGZpbGVzIGFyZSBDU1MgZmlsZXMgdGhhdCB3aWxsIGJlIGhhbmRsZWQgZGlyZWN0bHkgYnkgdGhlXG4gICAgLy8gd2VicGFjayBydW50aW1lIChgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5gKS5cbiAgICBsZXQgdW5tYW5nZWRGaWxlczogU2V0PHN0cmluZz4gPSBuZXcgU2V0KFtdKVxuICAgIGxldCBkeW5hbWljQ3NzRmlsZXMgPSBkZWR1cGUoXG4gICAgICBkeW5hbWljSW1wb3J0cy5maWx0ZXIoKGYpID0+IGYuZmlsZS5lbmRzV2l0aCgnLmNzcycpKVxuICAgICkubWFwKChmKSA9PiBmLmZpbGUpXG4gICAgaWYgKGR5bmFtaWNDc3NGaWxlcy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGV4aXN0aW5nID0gbmV3IFNldChjc3NGaWxlcylcbiAgICAgIGR5bmFtaWNDc3NGaWxlcyA9IGR5bmFtaWNDc3NGaWxlcy5maWx0ZXIoXG4gICAgICAgIChmKSA9PiAhKGV4aXN0aW5nLmhhcyhmKSB8fCBzaGFyZWRGaWxlcy5oYXMoZikpXG4gICAgICApXG4gICAgICB1bm1hbmdlZEZpbGVzID0gbmV3IFNldChkeW5hbWljQ3NzRmlsZXMpXG4gICAgICBjc3NGaWxlcy5wdXNoKC4uLmR5bmFtaWNDc3NGaWxlcylcbiAgICB9XG5cbiAgICBsZXQgY3NzTGlua0VsZW1lbnRzOiBKU1guRWxlbWVudFtdID0gW11cbiAgICBjc3NGaWxlcy5mb3JFYWNoKChmaWxlKSA9PiB7XG4gICAgICBjb25zdCBpc1NoYXJlZEZpbGUgPSBzaGFyZWRGaWxlcy5oYXMoZmlsZSlcblxuICAgICAgaWYgKCFwcm9jZXNzLmVudi5fX05FWFRfT1BUSU1JWkVfQ1NTKSB7XG4gICAgICAgIGNzc0xpbmtFbGVtZW50cy5wdXNoKFxuICAgICAgICAgIDxsaW5rXG4gICAgICAgICAgICBrZXk9e2Ake2ZpbGV9LXByZWxvYWRgfVxuICAgICAgICAgICAgbm9uY2U9e3RoaXMucHJvcHMubm9uY2V9XG4gICAgICAgICAgICByZWw9XCJwcmVsb2FkXCJcbiAgICAgICAgICAgIGhyZWY9e2Ake2Fzc2V0UHJlZml4fS9fbmV4dC8ke2VuY29kZVVSSShcbiAgICAgICAgICAgICAgZmlsZVxuICAgICAgICAgICAgKX0ke2Rldk9ubHlDYWNoZUJ1c3RlclF1ZXJ5U3RyaW5nfWB9XG4gICAgICAgICAgICBhcz1cInN0eWxlXCJcbiAgICAgICAgICAgIGNyb3NzT3JpZ2luPXtcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy5jcm9zc09yaWdpbiB8fCBwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOXG4gICAgICAgICAgICB9XG4gICAgICAgICAgLz5cbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBpc1VubWFuYWdlZEZpbGUgPSB1bm1hbmdlZEZpbGVzLmhhcyhmaWxlKVxuICAgICAgY3NzTGlua0VsZW1lbnRzLnB1c2goXG4gICAgICAgIDxsaW5rXG4gICAgICAgICAga2V5PXtmaWxlfVxuICAgICAgICAgIG5vbmNlPXt0aGlzLnByb3BzLm5vbmNlfVxuICAgICAgICAgIHJlbD1cInN0eWxlc2hlZXRcIlxuICAgICAgICAgIGhyZWY9e2Ake2Fzc2V0UHJlZml4fS9fbmV4dC8ke2VuY29kZVVSSShcbiAgICAgICAgICAgIGZpbGVcbiAgICAgICAgICApfSR7ZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmd9YH1cbiAgICAgICAgICBjcm9zc09yaWdpbj17XG4gICAgICAgICAgICB0aGlzLnByb3BzLmNyb3NzT3JpZ2luIHx8IHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU5cbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YS1uLWc9e2lzVW5tYW5hZ2VkRmlsZSA/IHVuZGVmaW5lZCA6IGlzU2hhcmVkRmlsZSA/ICcnIDogdW5kZWZpbmVkfVxuICAgICAgICAgIGRhdGEtbi1wPXtpc1VubWFuYWdlZEZpbGUgPyB1bmRlZmluZWQgOiBpc1NoYXJlZEZpbGUgPyB1bmRlZmluZWQgOiAnJ31cbiAgICAgICAgLz5cbiAgICAgIClcbiAgICB9KVxuXG4gICAgaWYgKFxuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdkZXZlbG9wbWVudCcgJiZcbiAgICAgIHByb2Nlc3MuZW52Ll9fTkVYVF9PUFRJTUlaRV9GT05UU1xuICAgICkge1xuICAgICAgY3NzTGlua0VsZW1lbnRzID0gdGhpcy5tYWtlU3R5bGVzaGVldEluZXJ0KFxuICAgICAgICBjc3NMaW5rRWxlbWVudHNcbiAgICAgICkgYXMgUmVhY3RFbGVtZW50W11cbiAgICB9XG5cbiAgICByZXR1cm4gY3NzTGlua0VsZW1lbnRzLmxlbmd0aCA9PT0gMCA/IG51bGwgOiBjc3NMaW5rRWxlbWVudHNcbiAgfVxuXG4gIGdldFByZWxvYWREeW5hbWljQ2h1bmtzKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGR5bmFtaWNJbXBvcnRzLFxuICAgICAgYXNzZXRQcmVmaXgsXG4gICAgICBkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZyxcbiAgICB9ID0gdGhpcy5jb250ZXh0XG5cbiAgICByZXR1cm4gKFxuICAgICAgZGVkdXBlKGR5bmFtaWNJbXBvcnRzKVxuICAgICAgICAubWFwKChidW5kbGUpID0+IHtcbiAgICAgICAgICBpZiAoIWJ1bmRsZS5maWxlLmVuZHNXaXRoKCcuanMnKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGxpbmtcbiAgICAgICAgICAgICAgcmVsPVwicHJlbG9hZFwiXG4gICAgICAgICAgICAgIGtleT17YnVuZGxlLmZpbGV9XG4gICAgICAgICAgICAgIGhyZWY9e2Ake2Fzc2V0UHJlZml4fS9fbmV4dC8ke2VuY29kZVVSSShcbiAgICAgICAgICAgICAgICBidW5kbGUuZmlsZVxuICAgICAgICAgICAgICApfSR7ZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmd9YH1cbiAgICAgICAgICAgICAgYXM9XCJzY3JpcHRcIlxuICAgICAgICAgICAgICBub25jZT17dGhpcy5wcm9wcy5ub25jZX1cbiAgICAgICAgICAgICAgY3Jvc3NPcmlnaW49e1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuY3Jvc3NPcmlnaW4gfHwgcHJvY2Vzcy5lbnYuX19ORVhUX0NST1NTX09SSUdJTlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIClcbiAgICAgICAgfSlcbiAgICAgICAgLy8gRmlsdGVyIG91dCBudWxsZWQgc2NyaXB0c1xuICAgICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgKVxuICB9XG5cbiAgZ2V0UHJlbG9hZE1haW5MaW5rcyhmaWxlczogRG9jdW1lbnRGaWxlcyk6IEpTWC5FbGVtZW50W10gfCBudWxsIHtcbiAgICBjb25zdCB7XG4gICAgICBhc3NldFByZWZpeCxcbiAgICAgIGRldk9ubHlDYWNoZUJ1c3RlclF1ZXJ5U3RyaW5nLFxuICAgICAgc2NyaXB0TG9hZGVyLFxuICAgIH0gPSB0aGlzLmNvbnRleHRcbiAgICBjb25zdCBwcmVsb2FkRmlsZXMgPSBmaWxlcy5hbGxGaWxlcy5maWx0ZXIoKGZpbGU6IHN0cmluZykgPT4ge1xuICAgICAgcmV0dXJuIGZpbGUuZW5kc1dpdGgoJy5qcycpXG4gICAgfSlcblxuICAgIHJldHVybiBbXG4gICAgICAuLi4oc2NyaXB0TG9hZGVyLmVhZ2VyIHx8IFtdKS5tYXAoKGZpbGUpID0+IChcbiAgICAgICAgPGxpbmtcbiAgICAgICAgICBrZXk9e2ZpbGUuc3JjfVxuICAgICAgICAgIG5vbmNlPXt0aGlzLnByb3BzLm5vbmNlfVxuICAgICAgICAgIHJlbD1cInByZWxvYWRcIlxuICAgICAgICAgIGhyZWY9e2ZpbGUuc3JjfVxuICAgICAgICAgIGFzPVwic2NyaXB0XCJcbiAgICAgICAgICBjcm9zc09yaWdpbj17XG4gICAgICAgICAgICB0aGlzLnByb3BzLmNyb3NzT3JpZ2luIHx8IHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU5cbiAgICAgICAgICB9XG4gICAgICAgIC8+XG4gICAgICApKSxcbiAgICAgIC4uLnByZWxvYWRGaWxlcy5tYXAoKGZpbGU6IHN0cmluZykgPT4gKFxuICAgICAgICA8bGlua1xuICAgICAgICAgIGtleT17ZmlsZX1cbiAgICAgICAgICBub25jZT17dGhpcy5wcm9wcy5ub25jZX1cbiAgICAgICAgICByZWw9XCJwcmVsb2FkXCJcbiAgICAgICAgICBocmVmPXtgJHthc3NldFByZWZpeH0vX25leHQvJHtlbmNvZGVVUkkoXG4gICAgICAgICAgICBmaWxlXG4gICAgICAgICAgKX0ke2Rldk9ubHlDYWNoZUJ1c3RlclF1ZXJ5U3RyaW5nfWB9XG4gICAgICAgICAgYXM9XCJzY3JpcHRcIlxuICAgICAgICAgIGNyb3NzT3JpZ2luPXtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuY3Jvc3NPcmlnaW4gfHwgcHJvY2Vzcy5lbnYuX19ORVhUX0NST1NTX09SSUdJTlxuICAgICAgICAgIH1cbiAgICAgICAgLz5cbiAgICAgICkpLFxuICAgICAgLi4uKHNjcmlwdExvYWRlci5kZWZlciB8fCBbXSkubWFwKChmaWxlOiBzdHJpbmcpID0+IChcbiAgICAgICAgPGxpbmtcbiAgICAgICAgICBrZXk9e2ZpbGV9XG4gICAgICAgICAgbm9uY2U9e3RoaXMucHJvcHMubm9uY2V9XG4gICAgICAgICAgcmVsPVwicHJlbG9hZFwiXG4gICAgICAgICAgaHJlZj17ZmlsZX1cbiAgICAgICAgICBhcz1cInNjcmlwdFwiXG4gICAgICAgICAgY3Jvc3NPcmlnaW49e1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5jcm9zc09yaWdpbiB8fCBwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOXG4gICAgICAgICAgfVxuICAgICAgICAvPlxuICAgICAgKSksXG4gICAgXVxuICB9XG5cbiAgbWFrZVN0eWxlc2hlZXRJbmVydChub2RlOiBSZWFjdE5vZGUpOiBSZWFjdE5vZGVbXSB7XG4gICAgcmV0dXJuIFJlYWN0LkNoaWxkcmVuLm1hcChub2RlLCAoYzogYW55KSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIGMudHlwZSA9PT0gJ2xpbmsnICYmXG4gICAgICAgIGMucHJvcHNbJ2hyZWYnXSAmJlxuICAgICAgICBPUFRJTUlaRURfRk9OVF9QUk9WSURFUlMuc29tZSgodXJsKSA9PiBjLnByb3BzWydocmVmJ10uc3RhcnRzV2l0aCh1cmwpKVxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IG5ld1Byb3BzID0geyAuLi4oYy5wcm9wcyB8fCB7fSkgfVxuICAgICAgICBuZXdQcm9wc1snZGF0YS1ocmVmJ10gPSBuZXdQcm9wc1snaHJlZiddXG4gICAgICAgIG5ld1Byb3BzWydocmVmJ10gPSB1bmRlZmluZWRcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChjLCBuZXdQcm9wcylcbiAgICAgIH0gZWxzZSBpZiAoYy5wcm9wcyAmJiBjLnByb3BzWydjaGlsZHJlbiddKSB7XG4gICAgICAgIGMucHJvcHNbJ2NoaWxkcmVuJ10gPSB0aGlzLm1ha2VTdHlsZXNoZWV0SW5lcnQoYy5wcm9wc1snY2hpbGRyZW4nXSlcbiAgICAgIH1cbiAgICAgIHJldHVybiBjXG4gICAgfSlcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBzdHlsZXMsXG4gICAgICBhbXBQYXRoLFxuICAgICAgaW5BbXBNb2RlLFxuICAgICAgaHlicmlkQW1wLFxuICAgICAgY2Fub25pY2FsQmFzZSxcbiAgICAgIF9fTkVYVF9EQVRBX18sXG4gICAgICBkYW5nZXJvdXNBc1BhdGgsXG4gICAgICBoZWFkVGFncyxcbiAgICAgIHVuc3RhYmxlX3J1bnRpbWVKUyxcbiAgICAgIHVuc3RhYmxlX0pzUHJlbG9hZCxcbiAgICB9ID0gdGhpcy5jb250ZXh0XG4gICAgY29uc3QgZGlzYWJsZVJ1bnRpbWVKUyA9IHVuc3RhYmxlX3J1bnRpbWVKUyA9PT0gZmFsc2VcbiAgICBjb25zdCBkaXNhYmxlSnNQcmVsb2FkID0gdW5zdGFibGVfSnNQcmVsb2FkID09PSBmYWxzZVxuXG4gICAgdGhpcy5jb250ZXh0LmRvY0NvbXBvbmVudHNSZW5kZXJlZC5IZWFkID0gdHJ1ZVxuXG4gICAgbGV0IHsgaGVhZCB9ID0gdGhpcy5jb250ZXh0XG4gICAgbGV0IGNzc1ByZWxvYWRzOiBBcnJheTxKU1guRWxlbWVudD4gPSBbXVxuICAgIGxldCBvdGhlckhlYWRFbGVtZW50czogQXJyYXk8SlNYLkVsZW1lbnQ+ID0gW11cbiAgICBpZiAoaGVhZCkge1xuICAgICAgaGVhZC5mb3JFYWNoKChjKSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBjICYmXG4gICAgICAgICAgYy50eXBlID09PSAnbGluaycgJiZcbiAgICAgICAgICBjLnByb3BzWydyZWwnXSA9PT0gJ3ByZWxvYWQnICYmXG4gICAgICAgICAgYy5wcm9wc1snYXMnXSA9PT0gJ3N0eWxlJ1xuICAgICAgICApIHtcbiAgICAgICAgICBjc3NQcmVsb2Fkcy5wdXNoKGMpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYyAmJiBvdGhlckhlYWRFbGVtZW50cy5wdXNoKGMpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBoZWFkID0gY3NzUHJlbG9hZHMuY29uY2F0KG90aGVySGVhZEVsZW1lbnRzKVxuICAgIH1cbiAgICBsZXQgY2hpbGRyZW4gPSB0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgLy8gc2hvdyBhIHdhcm5pbmcgaWYgSGVhZCBjb250YWlucyA8dGl0bGU+IChvbmx5IGluIGRldmVsb3BtZW50KVxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBjaGlsZHJlbiA9IFJlYWN0LkNoaWxkcmVuLm1hcChjaGlsZHJlbiwgKGNoaWxkOiBhbnkpID0+IHtcbiAgICAgICAgY29uc3QgaXNSZWFjdEhlbG1ldCA9IGNoaWxkPy5wcm9wcz8uWydkYXRhLXJlYWN0LWhlbG1ldCddXG4gICAgICAgIGlmICghaXNSZWFjdEhlbG1ldCkge1xuICAgICAgICAgIGlmIChjaGlsZD8udHlwZSA9PT0gJ3RpdGxlJykge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICBcIldhcm5pbmc6IDx0aXRsZT4gc2hvdWxkIG5vdCBiZSB1c2VkIGluIF9kb2N1bWVudC5qcydzIDxIZWFkPi4gaHR0cHM6Ly9lcnIuc2gvbmV4dC5qcy9uby1kb2N1bWVudC10aXRsZVwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIGNoaWxkPy50eXBlID09PSAnbWV0YScgJiZcbiAgICAgICAgICAgIGNoaWxkPy5wcm9wcz8ubmFtZSA9PT0gJ3ZpZXdwb3J0J1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICBcIldhcm5pbmc6IHZpZXdwb3J0IG1ldGEgdGFncyBzaG91bGQgbm90IGJlIHVzZWQgaW4gX2RvY3VtZW50LmpzJ3MgPEhlYWQ+LiBodHRwczovL2Vyci5zaC9uZXh0LmpzL25vLWRvY3VtZW50LXZpZXdwb3J0LW1ldGFcIlxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hpbGRcbiAgICAgIH0pXG4gICAgICBpZiAodGhpcy5wcm9wcy5jcm9zc09yaWdpbilcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICdXYXJuaW5nOiBgSGVhZGAgYXR0cmlidXRlIGBjcm9zc09yaWdpbmAgaXMgZGVwcmVjYXRlZC4gaHR0cHM6Ly9lcnIuc2gvbmV4dC5qcy9kb2MtY3Jvc3NvcmlnaW4tZGVwcmVjYXRlZCdcbiAgICAgICAgKVxuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAnZGV2ZWxvcG1lbnQnICYmXG4gICAgICBwcm9jZXNzLmVudi5fX05FWFRfT1BUSU1JWkVfRk9OVFMgJiZcbiAgICAgICFpbkFtcE1vZGVcbiAgICApIHtcbiAgICAgIGNoaWxkcmVuID0gdGhpcy5tYWtlU3R5bGVzaGVldEluZXJ0KGNoaWxkcmVuKVxuICAgIH1cblxuICAgIGxldCBoYXNBbXBodG1sUmVsID0gZmFsc2VcbiAgICBsZXQgaGFzQ2Fub25pY2FsUmVsID0gZmFsc2VcblxuICAgIC8vIHNob3cgd2FybmluZyBhbmQgcmVtb3ZlIGNvbmZsaWN0aW5nIGFtcCBoZWFkIHRhZ3NcbiAgICBoZWFkID0gUmVhY3QuQ2hpbGRyZW4ubWFwKGhlYWQgfHwgW10sIChjaGlsZCkgPT4ge1xuICAgICAgaWYgKCFjaGlsZCkgcmV0dXJuIGNoaWxkXG4gICAgICBjb25zdCB7IHR5cGUsIHByb3BzIH0gPSBjaGlsZFxuICAgICAgaWYgKGluQW1wTW9kZSkge1xuICAgICAgICBsZXQgYmFkUHJvcDogc3RyaW5nID0gJydcblxuICAgICAgICBpZiAodHlwZSA9PT0gJ21ldGEnICYmIHByb3BzLm5hbWUgPT09ICd2aWV3cG9ydCcpIHtcbiAgICAgICAgICBiYWRQcm9wID0gJ25hbWU9XCJ2aWV3cG9ydFwiJ1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdsaW5rJyAmJiBwcm9wcy5yZWwgPT09ICdjYW5vbmljYWwnKSB7XG4gICAgICAgICAgaGFzQ2Fub25pY2FsUmVsID0gdHJ1ZVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdzY3JpcHQnKSB7XG4gICAgICAgICAgLy8gb25seSBibG9jayBpZlxuICAgICAgICAgIC8vIDEuIGl0IGhhcyBhIHNyYyBhbmQgaXNuJ3QgcG9pbnRpbmcgdG8gYW1wcHJvamVjdCdzIENETlxuICAgICAgICAgIC8vIDIuIGl0IGlzIHVzaW5nIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MIHdpdGhvdXQgYSB0eXBlIG9yXG4gICAgICAgICAgLy8gYSB0eXBlIG9mIHRleHQvamF2YXNjcmlwdFxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIChwcm9wcy5zcmMgJiYgcHJvcHMuc3JjLmluZGV4T2YoJ2FtcHByb2plY3QnKSA8IC0xKSB8fFxuICAgICAgICAgICAgKHByb3BzLmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MICYmXG4gICAgICAgICAgICAgICghcHJvcHMudHlwZSB8fCBwcm9wcy50eXBlID09PSAndGV4dC9qYXZhc2NyaXB0JykpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBiYWRQcm9wID0gJzxzY3JpcHQnXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhwcm9wcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuICAgICAgICAgICAgICBiYWRQcm9wICs9IGAgJHtwcm9wfT1cIiR7cHJvcHNbcHJvcF19XCJgXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgYmFkUHJvcCArPSAnLz4nXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGJhZFByb3ApIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICBgRm91bmQgY29uZmxpY3RpbmcgYW1wIHRhZyBcIiR7Y2hpbGQudHlwZX1cIiB3aXRoIGNvbmZsaWN0aW5nIHByb3AgJHtiYWRQcm9wfSBpbiAke19fTkVYVF9EQVRBX18ucGFnZX0uIGh0dHBzOi8vZXJyLnNoL25leHQuanMvY29uZmxpY3RpbmctYW1wLXRhZ2BcbiAgICAgICAgICApXG4gICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gbm9uLWFtcCBtb2RlXG4gICAgICAgIGlmICh0eXBlID09PSAnbGluaycgJiYgcHJvcHMucmVsID09PSAnYW1waHRtbCcpIHtcbiAgICAgICAgICBoYXNBbXBodG1sUmVsID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gY2hpbGRcbiAgICB9KVxuXG4gICAgLy8gdHJ5IHRvIHBhcnNlIHN0eWxlcyBmcm9tIGZyYWdtZW50IGZvciBiYWNrd2FyZHMgY29tcGF0XG4gICAgY29uc3QgY3VyU3R5bGVzOiBSZWFjdC5SZWFjdEVsZW1lbnRbXSA9IEFycmF5LmlzQXJyYXkoc3R5bGVzKVxuICAgICAgPyAoc3R5bGVzIGFzIFJlYWN0LlJlYWN0RWxlbWVudFtdKVxuICAgICAgOiBbXVxuICAgIGlmIChcbiAgICAgIGluQW1wTW9kZSAmJlxuICAgICAgc3R5bGVzICYmXG4gICAgICAvLyBAdHMtaWdub3JlIFByb3BlcnR5ICdwcm9wcycgZG9lcyBub3QgZXhpc3Qgb24gdHlwZSBSZWFjdEVsZW1lbnRcbiAgICAgIHN0eWxlcy5wcm9wcyAmJlxuICAgICAgLy8gQHRzLWlnbm9yZSBQcm9wZXJ0eSAncHJvcHMnIGRvZXMgbm90IGV4aXN0IG9uIHR5cGUgUmVhY3RFbGVtZW50XG4gICAgICBBcnJheS5pc0FycmF5KHN0eWxlcy5wcm9wcy5jaGlsZHJlbilcbiAgICApIHtcbiAgICAgIGNvbnN0IGhhc1N0eWxlcyA9IChlbDogUmVhY3QuUmVhY3RFbGVtZW50KSA9PlxuICAgICAgICBlbD8ucHJvcHM/LmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPy5fX2h0bWxcbiAgICAgIC8vIEB0cy1pZ25vcmUgUHJvcGVydHkgJ3Byb3BzJyBkb2VzIG5vdCBleGlzdCBvbiB0eXBlIFJlYWN0RWxlbWVudFxuICAgICAgc3R5bGVzLnByb3BzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkOiBSZWFjdC5SZWFjdEVsZW1lbnQpID0+IHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGQpKSB7XG4gICAgICAgICAgY2hpbGQuZm9yRWFjaCgoZWwpID0+IGhhc1N0eWxlcyhlbCkgJiYgY3VyU3R5bGVzLnB1c2goZWwpKVxuICAgICAgICB9IGVsc2UgaWYgKGhhc1N0eWxlcyhjaGlsZCkpIHtcbiAgICAgICAgICBjdXJTdHlsZXMucHVzaChjaGlsZClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBmaWxlczogRG9jdW1lbnRGaWxlcyA9IGdldERvY3VtZW50RmlsZXMoXG4gICAgICB0aGlzLmNvbnRleHQuYnVpbGRNYW5pZmVzdCxcbiAgICAgIHRoaXMuY29udGV4dC5fX05FWFRfREFUQV9fLnBhZ2UsXG4gICAgICBpbkFtcE1vZGVcbiAgICApXG5cbiAgICByZXR1cm4gKFxuICAgICAgPGhlYWQgey4uLnRoaXMucHJvcHN9PlxuICAgICAgICB7dGhpcy5jb250ZXh0LmlzRGV2ZWxvcG1lbnQgJiYgKFxuICAgICAgICAgIDw+XG4gICAgICAgICAgICA8c3R5bGVcbiAgICAgICAgICAgICAgZGF0YS1uZXh0LWhpZGUtZm91Y1xuICAgICAgICAgICAgICBkYXRhLWFtcGRldm1vZGU9e2luQW1wTW9kZSA/ICd0cnVlJyA6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3tcbiAgICAgICAgICAgICAgICBfX2h0bWw6IGBib2R5e2Rpc3BsYXk6bm9uZX1gLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxub3NjcmlwdFxuICAgICAgICAgICAgICBkYXRhLW5leHQtaGlkZS1mb3VjXG4gICAgICAgICAgICAgIGRhdGEtYW1wZGV2bW9kZT17aW5BbXBNb2RlID8gJ3RydWUnIDogdW5kZWZpbmVkfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8c3R5bGVcbiAgICAgICAgICAgICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTD17e1xuICAgICAgICAgICAgICAgICAgX19odG1sOiBgYm9keXtkaXNwbGF5OmJsb2NrfWAsXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvbm9zY3JpcHQ+XG4gICAgICAgICAgPC8+XG4gICAgICAgICl9XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAge2hlYWR9XG4gICAgICAgIDxtZXRhXG4gICAgICAgICAgbmFtZT1cIm5leHQtaGVhZC1jb3VudFwiXG4gICAgICAgICAgY29udGVudD17UmVhY3QuQ2hpbGRyZW4uY291bnQoaGVhZCB8fCBbXSkudG9TdHJpbmcoKX1cbiAgICAgICAgLz5cbiAgICAgICAge2luQW1wTW9kZSAmJiAoXG4gICAgICAgICAgPD5cbiAgICAgICAgICAgIDxtZXRhXG4gICAgICAgICAgICAgIG5hbWU9XCJ2aWV3cG9ydFwiXG4gICAgICAgICAgICAgIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsbWluaW11bS1zY2FsZT0xLGluaXRpYWwtc2NhbGU9MVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgeyFoYXNDYW5vbmljYWxSZWwgJiYgKFxuICAgICAgICAgICAgICA8bGlua1xuICAgICAgICAgICAgICAgIHJlbD1cImNhbm9uaWNhbFwiXG4gICAgICAgICAgICAgICAgaHJlZj17Y2Fub25pY2FsQmFzZSArIGNsZWFuQW1wUGF0aChkYW5nZXJvdXNBc1BhdGgpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHsvKiBodHRwczovL3d3dy5hbXBwcm9qZWN0Lm9yZy9kb2NzL2Z1bmRhbWVudGFscy9vcHRpbWl6ZV9hbXAjb3B0aW1pemUtdGhlLWFtcC1ydW50aW1lLWxvYWRpbmcgKi99XG4gICAgICAgICAgICA8bGlua1xuICAgICAgICAgICAgICByZWw9XCJwcmVsb2FkXCJcbiAgICAgICAgICAgICAgYXM9XCJzY3JpcHRcIlxuICAgICAgICAgICAgICBocmVmPVwiaHR0cHM6Ly9jZG4uYW1wcHJvamVjdC5vcmcvdjAuanNcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIHsvKiBBZGQgY3VzdG9tIHN0eWxlcyBiZWZvcmUgQU1QIHN0eWxlcyB0byBwcmV2ZW50IGFjY2lkZW50YWwgb3ZlcnJpZGVzICovfVxuICAgICAgICAgICAge3N0eWxlcyAmJiAoXG4gICAgICAgICAgICAgIDxzdHlsZVxuICAgICAgICAgICAgICAgIGFtcC1jdXN0b209XCJcIlxuICAgICAgICAgICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7XG4gICAgICAgICAgICAgICAgICBfX2h0bWw6IGN1clN0eWxlc1xuICAgICAgICAgICAgICAgICAgICAubWFwKChzdHlsZSkgPT4gc3R5bGUucHJvcHMuZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwuX19odG1sKVxuICAgICAgICAgICAgICAgICAgICAuam9pbignJylcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcL1xcKiMgc291cmNlTWFwcGluZ1VSTD0uKlxcKlxcLy9nLCAnJylcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcL1xcKkAgc291cmNlVVJMPS4qP1xcKlxcLy9nLCAnJyksXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8c3R5bGVcbiAgICAgICAgICAgICAgYW1wLWJvaWxlcnBsYXRlPVwiXCJcbiAgICAgICAgICAgICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3tcbiAgICAgICAgICAgICAgICBfX2h0bWw6IGBib2R5ey13ZWJraXQtYW5pbWF0aW9uOi1hbXAtc3RhcnQgOHMgc3RlcHMoMSxlbmQpIDBzIDEgbm9ybWFsIGJvdGg7LW1vei1hbmltYXRpb246LWFtcC1zdGFydCA4cyBzdGVwcygxLGVuZCkgMHMgMSBub3JtYWwgYm90aDstbXMtYW5pbWF0aW9uOi1hbXAtc3RhcnQgOHMgc3RlcHMoMSxlbmQpIDBzIDEgbm9ybWFsIGJvdGg7YW5pbWF0aW9uOi1hbXAtc3RhcnQgOHMgc3RlcHMoMSxlbmQpIDBzIDEgbm9ybWFsIGJvdGh9QC13ZWJraXQta2V5ZnJhbWVzIC1hbXAtc3RhcnR7ZnJvbXt2aXNpYmlsaXR5OmhpZGRlbn10b3t2aXNpYmlsaXR5OnZpc2libGV9fUAtbW96LWtleWZyYW1lcyAtYW1wLXN0YXJ0e2Zyb217dmlzaWJpbGl0eTpoaWRkZW59dG97dmlzaWJpbGl0eTp2aXNpYmxlfX1ALW1zLWtleWZyYW1lcyAtYW1wLXN0YXJ0e2Zyb217dmlzaWJpbGl0eTpoaWRkZW59dG97dmlzaWJpbGl0eTp2aXNpYmxlfX1ALW8ta2V5ZnJhbWVzIC1hbXAtc3RhcnR7ZnJvbXt2aXNpYmlsaXR5OmhpZGRlbn10b3t2aXNpYmlsaXR5OnZpc2libGV9fUBrZXlmcmFtZXMgLWFtcC1zdGFydHtmcm9te3Zpc2liaWxpdHk6aGlkZGVufXRve3Zpc2liaWxpdHk6dmlzaWJsZX19YCxcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8bm9zY3JpcHQ+XG4gICAgICAgICAgICAgIDxzdHlsZVxuICAgICAgICAgICAgICAgIGFtcC1ib2lsZXJwbGF0ZT1cIlwiXG4gICAgICAgICAgICAgICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3tcbiAgICAgICAgICAgICAgICAgIF9faHRtbDogYGJvZHl7LXdlYmtpdC1hbmltYXRpb246bm9uZTstbW96LWFuaW1hdGlvbjpub25lOy1tcy1hbmltYXRpb246bm9uZTthbmltYXRpb246bm9uZX1gLFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L25vc2NyaXB0PlxuICAgICAgICAgICAgPHNjcmlwdCBhc3luYyBzcmM9XCJodHRwczovL2Nkbi5hbXBwcm9qZWN0Lm9yZy92MC5qc1wiIC8+XG4gICAgICAgICAgPC8+XG4gICAgICAgICl9XG4gICAgICAgIHshaW5BbXBNb2RlICYmIChcbiAgICAgICAgICA8PlxuICAgICAgICAgICAgeyFoYXNBbXBodG1sUmVsICYmIGh5YnJpZEFtcCAmJiAoXG4gICAgICAgICAgICAgIDxsaW5rXG4gICAgICAgICAgICAgICAgcmVsPVwiYW1waHRtbFwiXG4gICAgICAgICAgICAgICAgaHJlZj17Y2Fub25pY2FsQmFzZSArIGdldEFtcFBhdGgoYW1wUGF0aCwgZGFuZ2Vyb3VzQXNQYXRoKX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7IXByb2Nlc3MuZW52Ll9fTkVYVF9PUFRJTUlaRV9DU1MgJiYgdGhpcy5nZXRDc3NMaW5rcyhmaWxlcyl9XG4gICAgICAgICAgICB7IXByb2Nlc3MuZW52Ll9fTkVYVF9PUFRJTUlaRV9DU1MgJiYgKFxuICAgICAgICAgICAgICA8bm9zY3JpcHQgZGF0YS1uLWNzcz17dGhpcy5wcm9wcy5ub25jZSA/PyAnJ30gLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7IWRpc2FibGVSdW50aW1lSlMgJiZcbiAgICAgICAgICAgICAgIWRpc2FibGVKc1ByZWxvYWQgJiZcbiAgICAgICAgICAgICAgdGhpcy5nZXRQcmVsb2FkRHluYW1pY0NodW5rcygpfVxuICAgICAgICAgICAgeyFkaXNhYmxlUnVudGltZUpTICYmXG4gICAgICAgICAgICAgICFkaXNhYmxlSnNQcmVsb2FkICYmXG4gICAgICAgICAgICAgIHRoaXMuZ2V0UHJlbG9hZE1haW5MaW5rcyhmaWxlcyl9XG4gICAgICAgICAgICB7cHJvY2Vzcy5lbnYuX19ORVhUX09QVElNSVpFX0NTUyAmJiB0aGlzLmdldENzc0xpbmtzKGZpbGVzKX1cbiAgICAgICAgICAgIHtwcm9jZXNzLmVudi5fX05FWFRfT1BUSU1JWkVfQ1NTICYmIChcbiAgICAgICAgICAgICAgPG5vc2NyaXB0IGRhdGEtbi1jc3M9e3RoaXMucHJvcHMubm9uY2UgPz8gJyd9IC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge3RoaXMuY29udGV4dC5pc0RldmVsb3BtZW50ICYmIChcbiAgICAgICAgICAgICAgLy8gdGhpcyBlbGVtZW50IGlzIHVzZWQgdG8gbW91bnQgZGV2ZWxvcG1lbnQgc3R5bGVzIHNvIHRoZVxuICAgICAgICAgICAgICAvLyBvcmRlcmluZyBtYXRjaGVzIHByb2R1Y3Rpb25cbiAgICAgICAgICAgICAgLy8gKGJ5IGRlZmF1bHQsIHN0eWxlLWxvYWRlciBpbmplY3RzIGF0IHRoZSBib3R0b20gb2YgPGhlYWQgLz4pXG4gICAgICAgICAgICAgIDxub3NjcmlwdCBpZD1cIl9fbmV4dF9jc3NfX0RPX05PVF9VU0VfX1wiIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge3N0eWxlcyB8fCBudWxsfVxuICAgICAgICAgIDwvPlxuICAgICAgICApfVxuICAgICAgICB7UmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwge30sIC4uLihoZWFkVGFncyB8fCBbXSkpfVxuICAgICAgPC9oZWFkPlxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gTWFpbigpIHtcbiAgY29uc3QgeyBpbkFtcE1vZGUsIGh0bWwsIGRvY0NvbXBvbmVudHNSZW5kZXJlZCB9ID0gdXNlQ29udGV4dChcbiAgICBEb2N1bWVudENvbXBvbmVudENvbnRleHRcbiAgKVxuXG4gIGRvY0NvbXBvbmVudHNSZW5kZXJlZC5NYWluID0gdHJ1ZVxuXG4gIGlmIChpbkFtcE1vZGUpIHJldHVybiA8PntBTVBfUkVOREVSX1RBUkdFVH08Lz5cbiAgcmV0dXJuIDxkaXYgaWQ9XCJfX25leHRcIiBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IGh0bWwgfX0gLz5cbn1cblxuZXhwb3J0IGNsYXNzIE5leHRTY3JpcHQgZXh0ZW5kcyBDb21wb25lbnQ8T3JpZ2luUHJvcHM+IHtcbiAgc3RhdGljIGNvbnRleHRUeXBlID0gRG9jdW1lbnRDb21wb25lbnRDb250ZXh0XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBub25jZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjcm9zc09yaWdpbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgfVxuXG4gIGNvbnRleHQhOiBSZWFjdC5Db250ZXh0VHlwZTx0eXBlb2YgRG9jdW1lbnRDb21wb25lbnRDb250ZXh0PlxuXG4gIC8vIFNvdXJjZTogaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vc2FtdGhvci82NGIxMTRlNGE0ZjUzOTkxNWE5NWI5MWZmZDM0MGFjY1xuICBzdGF0aWMgc2FmYXJpTm9tb2R1bGVGaXggPVxuICAgICchZnVuY3Rpb24oKXt2YXIgZT1kb2N1bWVudCx0PWUuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtpZighKFwibm9Nb2R1bGVcImluIHQpJiZcIm9uYmVmb3JlbG9hZFwiaW4gdCl7dmFyIG49ITE7ZS5hZGRFdmVudExpc3RlbmVyKFwiYmVmb3JlbG9hZFwiLGZ1bmN0aW9uKGUpe2lmKGUudGFyZ2V0PT09dCluPSEwO2Vsc2UgaWYoIWUudGFyZ2V0Lmhhc0F0dHJpYnV0ZShcIm5vbW9kdWxlXCIpfHwhbilyZXR1cm47ZS5wcmV2ZW50RGVmYXVsdCgpfSwhMCksdC50eXBlPVwibW9kdWxlXCIsdC5zcmM9XCIuXCIsZS5oZWFkLmFwcGVuZENoaWxkKHQpLHQucmVtb3ZlKCl9fSgpOydcblxuICBnZXREeW5hbWljQ2h1bmtzKGZpbGVzOiBEb2N1bWVudEZpbGVzKSB7XG4gICAgY29uc3Qge1xuICAgICAgZHluYW1pY0ltcG9ydHMsXG4gICAgICBhc3NldFByZWZpeCxcbiAgICAgIGlzRGV2ZWxvcG1lbnQsXG4gICAgICBkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZyxcbiAgICB9ID0gdGhpcy5jb250ZXh0XG5cbiAgICByZXR1cm4gZGVkdXBlKGR5bmFtaWNJbXBvcnRzKS5tYXAoKGJ1bmRsZSkgPT4ge1xuICAgICAgaWYgKCFidW5kbGUuZmlsZS5lbmRzV2l0aCgnLmpzJykgfHwgZmlsZXMuYWxsRmlsZXMuaW5jbHVkZXMoYnVuZGxlLmZpbGUpKVxuICAgICAgICByZXR1cm4gbnVsbFxuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8c2NyaXB0XG4gICAgICAgICAgYXN5bmM9eyFpc0RldmVsb3BtZW50fVxuICAgICAgICAgIGtleT17YnVuZGxlLmZpbGV9XG4gICAgICAgICAgc3JjPXtgJHthc3NldFByZWZpeH0vX25leHQvJHtlbmNvZGVVUkkoXG4gICAgICAgICAgICBidW5kbGUuZmlsZVxuICAgICAgICAgICl9JHtkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZ31gfVxuICAgICAgICAgIG5vbmNlPXt0aGlzLnByb3BzLm5vbmNlfVxuICAgICAgICAgIGNyb3NzT3JpZ2luPXtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuY3Jvc3NPcmlnaW4gfHwgcHJvY2Vzcy5lbnYuX19ORVhUX0NST1NTX09SSUdJTlxuICAgICAgICAgIH1cbiAgICAgICAgLz5cbiAgICAgIClcbiAgICB9KVxuICB9XG5cbiAgZ2V0UHJlTmV4dFNjcmlwdHMoKSB7XG4gICAgY29uc3QgeyBzY3JpcHRMb2FkZXIgfSA9IHRoaXMuY29udGV4dFxuXG4gICAgcmV0dXJuIChzY3JpcHRMb2FkZXIuZWFnZXIgfHwgW10pLm1hcCgoZmlsZTogc3RyaW5nKSA9PiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8c2NyaXB0XG4gICAgICAgICAgey4uLmZpbGV9XG4gICAgICAgICAgbm9uY2U9e3RoaXMucHJvcHMubm9uY2V9XG4gICAgICAgICAgY3Jvc3NPcmlnaW49e1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5jcm9zc09yaWdpbiB8fCBwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOXG4gICAgICAgICAgfVxuICAgICAgICAvPlxuICAgICAgKVxuICAgIH0pXG4gIH1cblxuICBnZXRTY3JpcHRzKGZpbGVzOiBEb2N1bWVudEZpbGVzKSB7XG4gICAgY29uc3Qge1xuICAgICAgYXNzZXRQcmVmaXgsXG4gICAgICBidWlsZE1hbmlmZXN0LFxuICAgICAgaXNEZXZlbG9wbWVudCxcbiAgICAgIGRldk9ubHlDYWNoZUJ1c3RlclF1ZXJ5U3RyaW5nLFxuICAgIH0gPSB0aGlzLmNvbnRleHRcblxuICAgIGNvbnN0IG5vcm1hbFNjcmlwdHMgPSBmaWxlcy5hbGxGaWxlcy5maWx0ZXIoKGZpbGUpID0+IGZpbGUuZW5kc1dpdGgoJy5qcycpKVxuICAgIGNvbnN0IGxvd1ByaW9yaXR5U2NyaXB0cyA9IGJ1aWxkTWFuaWZlc3QubG93UHJpb3JpdHlGaWxlcz8uZmlsdGVyKChmaWxlKSA9PlxuICAgICAgZmlsZS5lbmRzV2l0aCgnLmpzJylcbiAgICApXG5cbiAgICByZXR1cm4gWy4uLm5vcm1hbFNjcmlwdHMsIC4uLmxvd1ByaW9yaXR5U2NyaXB0c10ubWFwKChmaWxlKSA9PiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8c2NyaXB0XG4gICAgICAgICAga2V5PXtmaWxlfVxuICAgICAgICAgIHNyYz17YCR7YXNzZXRQcmVmaXh9L19uZXh0LyR7ZW5jb2RlVVJJKFxuICAgICAgICAgICAgZmlsZVxuICAgICAgICAgICl9JHtkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZ31gfVxuICAgICAgICAgIG5vbmNlPXt0aGlzLnByb3BzLm5vbmNlfVxuICAgICAgICAgIGFzeW5jPXshaXNEZXZlbG9wbWVudH1cbiAgICAgICAgICBjcm9zc09yaWdpbj17XG4gICAgICAgICAgICB0aGlzLnByb3BzLmNyb3NzT3JpZ2luIHx8IHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU5cbiAgICAgICAgICB9XG4gICAgICAgIC8+XG4gICAgICApXG4gICAgfSlcbiAgfVxuXG4gIGdldFBvbHlmaWxsU2NyaXB0cygpIHtcbiAgICAvLyBwb2x5ZmlsbHMuanMgaGFzIHRvIGJlIHJlbmRlcmVkIGFzIG5vbW9kdWxlIHdpdGhvdXQgYXN5bmNcbiAgICAvLyBJdCBhbHNvIGhhcyB0byBiZSB0aGUgZmlyc3Qgc2NyaXB0IHRvIGxvYWRcbiAgICBjb25zdCB7XG4gICAgICBhc3NldFByZWZpeCxcbiAgICAgIGJ1aWxkTWFuaWZlc3QsXG4gICAgICBkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZyxcbiAgICB9ID0gdGhpcy5jb250ZXh0XG5cbiAgICByZXR1cm4gYnVpbGRNYW5pZmVzdC5wb2x5ZmlsbEZpbGVzXG4gICAgICAuZmlsdGVyKFxuICAgICAgICAocG9seWZpbGwpID0+XG4gICAgICAgICAgcG9seWZpbGwuZW5kc1dpdGgoJy5qcycpICYmICFwb2x5ZmlsbC5lbmRzV2l0aCgnLm1vZHVsZS5qcycpXG4gICAgICApXG4gICAgICAubWFwKChwb2x5ZmlsbCkgPT4gKFxuICAgICAgICA8c2NyaXB0XG4gICAgICAgICAga2V5PXtwb2x5ZmlsbH1cbiAgICAgICAgICBub25jZT17dGhpcy5wcm9wcy5ub25jZX1cbiAgICAgICAgICBjcm9zc09yaWdpbj17XG4gICAgICAgICAgICB0aGlzLnByb3BzLmNyb3NzT3JpZ2luIHx8IHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU5cbiAgICAgICAgICB9XG4gICAgICAgICAgbm9Nb2R1bGU9e3RydWV9XG4gICAgICAgICAgc3JjPXtgJHthc3NldFByZWZpeH0vX25leHQvJHtwb2x5ZmlsbH0ke2Rldk9ubHlDYWNoZUJ1c3RlclF1ZXJ5U3RyaW5nfWB9XG4gICAgICAgIC8+XG4gICAgICApKVxuICB9XG5cbiAgc3RhdGljIGdldElubGluZVNjcmlwdFNvdXJjZShkb2N1bWVudFByb3BzOiBSZWFkb25seTxEb2N1bWVudFByb3BzPik6IHN0cmluZyB7XG4gICAgY29uc3QgeyBfX05FWFRfREFUQV9fIH0gPSBkb2N1bWVudFByb3BzXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnN0cmluZ2lmeShfX05FWFRfREFUQV9fKVxuICAgICAgcmV0dXJuIGh0bWxFc2NhcGVKc29uU3RyaW5nKGRhdGEpXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBpZiAoZXJyLm1lc3NhZ2UuaW5kZXhPZignY2lyY3VsYXIgc3RydWN0dXJlJykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBDaXJjdWxhciBzdHJ1Y3R1cmUgaW4gXCJnZXRJbml0aWFsUHJvcHNcIiByZXN1bHQgb2YgcGFnZSBcIiR7X19ORVhUX0RBVEFfXy5wYWdlfVwiLiBodHRwczovL2Vyci5zaC92ZXJjZWwvbmV4dC5qcy9jaXJjdWxhci1zdHJ1Y3R1cmVgXG4gICAgICAgIClcbiAgICAgIH1cbiAgICAgIHRocm93IGVyclxuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBhc3NldFByZWZpeCxcbiAgICAgIGluQW1wTW9kZSxcbiAgICAgIGJ1aWxkTWFuaWZlc3QsXG4gICAgICB1bnN0YWJsZV9ydW50aW1lSlMsXG4gICAgICBkb2NDb21wb25lbnRzUmVuZGVyZWQsXG4gICAgICBkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZyxcbiAgICB9ID0gdGhpcy5jb250ZXh0XG4gICAgY29uc3QgZGlzYWJsZVJ1bnRpbWVKUyA9IHVuc3RhYmxlX3J1bnRpbWVKUyA9PT0gZmFsc2VcblxuICAgIGRvY0NvbXBvbmVudHNSZW5kZXJlZC5OZXh0U2NyaXB0ID0gdHJ1ZVxuXG4gICAgaWYgKGluQW1wTW9kZSkge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH1cblxuICAgICAgY29uc3QgYW1wRGV2RmlsZXMgPSBbXG4gICAgICAgIC4uLmJ1aWxkTWFuaWZlc3QuZGV2RmlsZXMsXG4gICAgICAgIC4uLmJ1aWxkTWFuaWZlc3QucG9seWZpbGxGaWxlcyxcbiAgICAgICAgLi4uYnVpbGRNYW5pZmVzdC5hbXBEZXZGaWxlcyxcbiAgICAgIF1cblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPD5cbiAgICAgICAgICB7ZGlzYWJsZVJ1bnRpbWVKUyA/IG51bGwgOiAoXG4gICAgICAgICAgICA8c2NyaXB0XG4gICAgICAgICAgICAgIGlkPVwiX19ORVhUX0RBVEFfX1wiXG4gICAgICAgICAgICAgIHR5cGU9XCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgICAgICAgbm9uY2U9e3RoaXMucHJvcHMubm9uY2V9XG4gICAgICAgICAgICAgIGNyb3NzT3JpZ2luPXtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmNyb3NzT3JpZ2luIHx8IHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTD17e1xuICAgICAgICAgICAgICAgIF9faHRtbDogTmV4dFNjcmlwdC5nZXRJbmxpbmVTY3JpcHRTb3VyY2UodGhpcy5jb250ZXh0KSxcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgZGF0YS1hbXBkZXZtb2RlXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAge2FtcERldkZpbGVzLm1hcCgoZmlsZSkgPT4gKFxuICAgICAgICAgICAgPHNjcmlwdFxuICAgICAgICAgICAgICBrZXk9e2ZpbGV9XG4gICAgICAgICAgICAgIHNyYz17YCR7YXNzZXRQcmVmaXh9L19uZXh0LyR7ZmlsZX0ke2Rldk9ubHlDYWNoZUJ1c3RlclF1ZXJ5U3RyaW5nfWB9XG4gICAgICAgICAgICAgIG5vbmNlPXt0aGlzLnByb3BzLm5vbmNlfVxuICAgICAgICAgICAgICBjcm9zc09yaWdpbj17XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5jcm9zc09yaWdpbiB8fCBwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZGF0YS1hbXBkZXZtb2RlXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkpfVxuICAgICAgICA8Lz5cbiAgICAgIClcbiAgICB9XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKHRoaXMucHJvcHMuY3Jvc3NPcmlnaW4pXG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAnV2FybmluZzogYE5leHRTY3JpcHRgIGF0dHJpYnV0ZSBgY3Jvc3NPcmlnaW5gIGlzIGRlcHJlY2F0ZWQuIGh0dHBzOi8vZXJyLnNoL25leHQuanMvZG9jLWNyb3Nzb3JpZ2luLWRlcHJlY2F0ZWQnXG4gICAgICAgIClcbiAgICB9XG5cbiAgICBjb25zdCBmaWxlczogRG9jdW1lbnRGaWxlcyA9IGdldERvY3VtZW50RmlsZXMoXG4gICAgICB0aGlzLmNvbnRleHQuYnVpbGRNYW5pZmVzdCxcbiAgICAgIHRoaXMuY29udGV4dC5fX05FWFRfREFUQV9fLnBhZ2UsXG4gICAgICBpbkFtcE1vZGVcbiAgICApXG5cbiAgICByZXR1cm4gKFxuICAgICAgPD5cbiAgICAgICAgeyFkaXNhYmxlUnVudGltZUpTICYmIGJ1aWxkTWFuaWZlc3QuZGV2RmlsZXNcbiAgICAgICAgICA/IGJ1aWxkTWFuaWZlc3QuZGV2RmlsZXMubWFwKChmaWxlOiBzdHJpbmcpID0+IChcbiAgICAgICAgICAgICAgPHNjcmlwdFxuICAgICAgICAgICAgICAgIGtleT17ZmlsZX1cbiAgICAgICAgICAgICAgICBzcmM9e2Ake2Fzc2V0UHJlZml4fS9fbmV4dC8ke2VuY29kZVVSSShcbiAgICAgICAgICAgICAgICAgIGZpbGVcbiAgICAgICAgICAgICAgICApfSR7ZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmd9YH1cbiAgICAgICAgICAgICAgICBub25jZT17dGhpcy5wcm9wcy5ub25jZX1cbiAgICAgICAgICAgICAgICBjcm9zc09yaWdpbj17XG4gICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmNyb3NzT3JpZ2luIHx8IHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApKVxuICAgICAgICAgIDogbnVsbH1cbiAgICAgICAge2Rpc2FibGVSdW50aW1lSlMgPyBudWxsIDogKFxuICAgICAgICAgIDxzY3JpcHRcbiAgICAgICAgICAgIGlkPVwiX19ORVhUX0RBVEFfX1wiXG4gICAgICAgICAgICB0eXBlPVwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgICAgICBub25jZT17dGhpcy5wcm9wcy5ub25jZX1cbiAgICAgICAgICAgIGNyb3NzT3JpZ2luPXtcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy5jcm9zc09yaWdpbiB8fCBwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTD17e1xuICAgICAgICAgICAgICBfX2h0bWw6IE5leHRTY3JpcHQuZ2V0SW5saW5lU2NyaXB0U291cmNlKHRoaXMuY29udGV4dCksXG4gICAgICAgICAgICB9fVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICAgIHshZGlzYWJsZVJ1bnRpbWVKUyAmJiB0aGlzLmdldFBvbHlmaWxsU2NyaXB0cygpfVxuICAgICAgICB7IWRpc2FibGVSdW50aW1lSlMgJiYgdGhpcy5nZXRQcmVOZXh0U2NyaXB0cygpfVxuICAgICAgICB7ZGlzYWJsZVJ1bnRpbWVKUyA/IG51bGwgOiB0aGlzLmdldER5bmFtaWNDaHVua3MoZmlsZXMpfVxuICAgICAgICB7ZGlzYWJsZVJ1bnRpbWVKUyA/IG51bGwgOiB0aGlzLmdldFNjcmlwdHMoZmlsZXMpfVxuICAgICAgPC8+XG4gICAgKVxuICB9XG59XG5cbmZ1bmN0aW9uIGdldEFtcFBhdGgoYW1wUGF0aDogc3RyaW5nLCBhc1BhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBhbXBQYXRoIHx8IGAke2FzUGF0aH0ke2FzUGF0aC5pbmNsdWRlcygnPycpID8gJyYnIDogJz8nfWFtcD0xYFxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7ZXhwb3J0cy5fX2VzTW9kdWxlPXRydWU7ZXhwb3J0cy5odG1sRXNjYXBlSnNvblN0cmluZz1odG1sRXNjYXBlSnNvblN0cmluZzsvLyBUaGlzIHV0aWxpdHkgaXMgYmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL3plcnRvc2gvaHRtbGVzY2FwZVxuLy8gTGljZW5zZTogaHR0cHM6Ly9naXRodWIuY29tL3plcnRvc2gvaHRtbGVzY2FwZS9ibG9iLzA1MjdjYTcxNTZhNTI0ZDI1NjEwMWJiMzEwYTlmOTcwZjYzMDc4YWQvTElDRU5TRVxuY29uc3QgRVNDQVBFX0xPT0tVUD17JyYnOidcXFxcdTAwMjYnLCc+JzonXFxcXHUwMDNlJywnPCc6J1xcXFx1MDAzYycsJ1xcdTIwMjgnOidcXFxcdTIwMjgnLCdcXHUyMDI5JzonXFxcXHUyMDI5J307Y29uc3QgRVNDQVBFX1JFR0VYPS9bJj48XFx1MjAyOFxcdTIwMjldL2c7ZnVuY3Rpb24gaHRtbEVzY2FwZUpzb25TdHJpbmcoc3RyKXtyZXR1cm4gc3RyLnJlcGxhY2UoRVNDQVBFX1JFR0VYLG1hdGNoPT5FU0NBUEVfTE9PS1VQW21hdGNoXSk7fVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aHRtbGVzY2FwZS5qcy5tYXAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGlzdC9wYWdlcy9fZG9jdW1lbnQnKVxuIiwiLy8gaW1wb3J0IHsgR2V0U3RhdGljUHJvcHMgfSBmcm9tICduZXh0JztcclxuaW1wb3J0IERvY3VtZW50LCB7IEhlYWQsIEh0bWwsIE1haW4sIE5leHRTY3JpcHQgfSBmcm9tICduZXh0L2RvY3VtZW50JztcclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgU2VydmVyU3R5bGVTaGVldCB9IGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJzsgLy8gc3R5bGVkLWNvbXBvbmVudHMgU1NSIOygnOqztVxyXG5pbXBvcnQgeyBTZXJ2ZXJTdHlsZVNoZWV0cyB9IGZyb20gJ0BtYXRlcmlhbC11aS9zdHlsZXMnO1xyXG5pbXBvcnQgeyBVc2VyQ29udGV4dFByb3ZpZGVyIH0gZnJvbSAnLi4vY29udGV4dC91c2VyJztcclxuXHJcbmludGVyZmFjZSBQcm9wcyB7XHJcblx0c3R5bGVUYWdzOiBBcnJheTxSZWFjdC5SZWFjdEVsZW1lbnQ8e30+PjtcclxufVxyXG5cclxuLy8g7YG0656Y7Iqk7ZiVXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE15RG9jdW1lbnQgZXh0ZW5kcyBEb2N1bWVudDxQcm9wcz4ge1xyXG5cdHN0YXRpYyBhc3luYyBnZXRJbml0aWFsUHJvcHMoY3R4OiBhbnkpIHtcclxuXHRcdGNvbnN0IHN0eWxlZENvbXBvbmVudFNoZWV0ID0gbmV3IFNlcnZlclN0eWxlU2hlZXQoKTtcclxuXHRcdGNvbnN0IG1hdGVyaWFsU2hlZXRzID0gbmV3IFNlcnZlclN0eWxlU2hlZXRzKCk7XHJcblx0XHRjb25zdCBvcmlnaW5hbFJlbmRlclBhZ2UgPSBjdHgucmVuZGVyUGFnZTtcclxuXHJcblx0XHR0cnkge1xyXG5cdFx0XHRjdHgucmVuZGVyUGFnZSA9ICgpID0+XHJcblx0XHRcdFx0b3JpZ2luYWxSZW5kZXJQYWdlKHtcclxuXHRcdFx0XHRcdGVuaGFuY2VBcHA6IChBcHA6IGFueSkgPT4gKHByb3BzOiBhbnkpID0+XHJcblx0XHRcdFx0XHRcdHN0eWxlZENvbXBvbmVudFNoZWV0LmNvbGxlY3RTdHlsZXMoXHJcblx0XHRcdFx0XHRcdFx0bWF0ZXJpYWxTaGVldHMuY29sbGVjdCg8QXBwIHsuLi5wcm9wc30gLz4pLFxyXG5cdFx0XHRcdFx0XHQpLFxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Y29uc3QgaW5pdGlhbFByb3BzID0gYXdhaXQgRG9jdW1lbnQuZ2V0SW5pdGlhbFByb3BzKGN0eCk7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0Li4uaW5pdGlhbFByb3BzLFxyXG5cdFx0XHRcdHN0eWxlczogKFxyXG5cdFx0XHRcdFx0PD5cclxuXHRcdFx0XHRcdFx0e2luaXRpYWxQcm9wcy5zdHlsZXN9XHJcblx0XHRcdFx0XHRcdHttYXRlcmlhbFNoZWV0cy5nZXRTdHlsZUVsZW1lbnQoKX1cclxuXHRcdFx0XHRcdFx0e3N0eWxlZENvbXBvbmVudFNoZWV0LmdldFN0eWxlRWxlbWVudCgpfVxyXG5cdFx0XHRcdFx0PC8+XHJcblx0XHRcdFx0KSxcclxuXHRcdFx0fTtcclxuXHRcdH0gZmluYWxseSB7XHJcblx0XHRcdHN0eWxlZENvbXBvbmVudFNoZWV0LnNlYWwoKTtcclxuXHRcdH1cclxuXHR9XHJcblx0cmVuZGVyKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEh0bWw+XHJcblx0XHRcdFx0PEhlYWQ+XHJcblx0XHRcdFx0XHR7LyogU1NSIOyLnCBzdHlsZWQtY29tcG9uZW50c+qwgCDsoIHsmqnrkJjrj4TroZ0g7ZWoICovfVxyXG5cdFx0XHRcdFx0e3RoaXMucHJvcHMuc3R5bGVUYWdzfVxyXG5cdFx0XHRcdDwvSGVhZD5cclxuXHRcdFx0XHQ8Ym9keT5cclxuXHRcdFx0XHRcdDxNYWluIC8+XHJcblx0XHRcdFx0XHQ8TmV4dFNjcmlwdCAvPlxyXG5cdFx0XHRcdDwvYm9keT5cclxuXHRcdFx0PC9IdG1sPlxyXG5cdFx0KTtcclxuXHR9XHJcbn1cclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG1hdGVyaWFsLXVpL3N0eWxlc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwcm9wLXR5cGVzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzdHlsZWQtY29tcG9uZW50c1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzdHlsZWQtanN4L3NlcnZlclwiKTsiXSwic291cmNlUm9vdCI6IiJ9