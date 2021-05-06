webpackHotUpdate_N_E("pages/login",{

/***/ "./components/main/hoc/withAuth.tsx":
/*!******************************************!*\
  !*** ./components/main/hoc/withAuth.tsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"../node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Users_zknock_Develop_localhost_web_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/next/node_modules/@babel/runtime/regenerator */ \"../node_modules/next/node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _Users_zknock_Develop_localhost_web_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Users_zknock_Develop_localhost_web_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Users_zknock_Develop_localhost_web_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"../node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ \"../node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ \"../node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _utils_url__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils/url */ \"./utils/url.ts\");\n/* harmony import */ var react_async__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-async */ \"../node_modules/react-async/dist-web/index.js\");\n\n\n\n\nvar _jsxFileName = \"/Users/zknock/Develop/localhost_web/client/components/main/hoc/withAuth.tsx\",\n    _this = undefined;\n\n\n\n\n // isLogined\n// 0: 아무나 볼 수 있음, 1: 로그인한 회원만 볼 수 있음, 2: 게스트만 볼 수 있음\n// grade\n// 0: 아무나 볼 수 있음, 2: 호스트회원만 볼 수 있음, 3: 관리자회원만 볼 수 있음\n\nvar getAuth = /*#__PURE__*/function () {\n  var _ref = Object(_Users_zknock_Develop_localhost_web_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[\"default\"])( /*#__PURE__*/_Users_zknock_Develop_localhost_web_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee() {\n    var res;\n    return _Users_zknock_Develop_localhost_web_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.next = 2;\n            return axios__WEBPACK_IMPORTED_MODULE_3___default.a.get(\"\".concat(_utils_url__WEBPACK_IMPORTED_MODULE_5__[\"default\"], \"/api/auth/check\"), {\n              withCredentials: true\n            });\n\n          case 2:\n            res = _context.sent;\n            return _context.abrupt(\"return\", res.data);\n\n          case 4:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function getAuth() {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nvar withAuth = function withAuth(isLogined, grade) {\n  return function (Component) {\n    var _s = $RefreshSig$();\n\n    return _s(function () {\n      _s();\n\n      var _useAsync = Object(react_async__WEBPACK_IMPORTED_MODULE_6__[\"useAsync\"])({\n        promiseFn: getAuth\n      }),\n          data = _useAsync.data,\n          isLoading = _useAsync.isLoading,\n          error = _useAsync.error;\n\n      if (isLoading) return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n        children: \"\\uB85C\\uB529\\uC911...\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 30,\n        columnNumber: 25\n      }, _this);\n      if (error) return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n        children: \"\\uC5D0\\uB7EC!\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 31,\n        columnNumber: 21\n      }, _this);\n      if (!data) return null;\n      var user = data.user;\n\n      if (data.success) {\n        console.log('로그인되어있습니다.');\n\n        if (isLogined === 2) {\n          alert('이미 로그인되어있습니다.');\n          location.href = '/';\n        }\n\n        switch (grade) {\n          // 아무나\n          case 0:\n            return {\n              Component: Component\n            };\n          // 호스트\n\n          case 1:\n            if (user.isHost) return Component;\n            alert('접근할 수 없는 페이지 입니다.');\n            location.href = '/';\n          // 관리자\n\n          case 2:\n            if (user.isAdmin) return Component;\n            alert('접근할 수 없는 페이지 입니다.');\n            location.href = '/';\n        }\n      } else {\n        // 로그인되지않음\n        console.log('로그인을 해주세요.');\n\n        if (isLogined === 1) {\n          alert('로그인을 해주세요.');\n          location.href = '/login';\n        } else {\n          return Component;\n        }\n      }\n\n      return Component;\n    }, \"DWInu5ZRLtSFS71MtZ8FtZQJLeg=\", false, function () {\n      return [react_async__WEBPACK_IMPORTED_MODULE_6__[\"useAsync\"]];\n    }); // axios\n    // \t.get(`${SERVER}/api/auth/check`, { withCredentials: true })\n    // \t.then(res => {\n    // \t\tconst user: User = res.data.user;\n    // \t\tif (res.data.success) {\n    // \t\t\tconsole.log('로그인되어있습니다.');\n    // \t\t\tif (isLogined === 2) {\n    // \t\t\t\talert('이미 로그인되어있습니다.');\n    // \t\t\t\tlocation.href = '/';\n    // \t\t\t}\n    // \t\t\tswitch (grade) {\n    // \t\t\t\t// 아무나\n    // \t\t\t\tcase 0:\n    // \t\t\t\t\treturn Component;\n    // \t\t\t\t// 호스트\n    // \t\t\t\tcase 1:\n    // \t\t\t\t\tif (user.isHost) return Component;\n    // \t\t\t\t\talert('접근할 수 없는 페이지 입니다.');\n    // \t\t\t\t\tlocation.href = '/';\n    // \t\t\t\t// 관리자\n    // \t\t\t\tcase 2:\n    // \t\t\t\t\tif (user.isAdmin) return Component;\n    // \t\t\t\t\talert('접근할 수 없는 페이지 입니다.');\n    // \t\t\t\t\tlocation.href = '/';\n    // \t\t\t}\n    // \t\t} else {\n    // \t\t\t// 로그인되지않음\n    // \t\t\tconsole.log('로그인을 해주세요.');\n    // \t\t\tconsole.log(res.data.message, '이것은 에러');\n    // \t\t\tif (isLogined === 1) {\n    // \t\t\t\talert('로그인을 해주세요.');\n    // \t\t\t\tlocation.href = '/login';\n    // \t\t\t} else {\n    // \t\t\t\treturn Component;\n    // \t\t\t}\n    // \t\t}\n    // \t});\n    // return Component;\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (withAuth);\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/next/dist/compiled/webpack/harmony-module.js */ \"../node_modules/next/dist/compiled/webpack/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9tYWluL2hvYy93aXRoQXV0aC50c3g/MDZmOSJdLCJuYW1lcyI6WyJnZXRBdXRoIiwiYXhpb3MiLCJnZXQiLCJTRVJWRVIiLCJ3aXRoQ3JlZGVudGlhbHMiLCJyZXMiLCJkYXRhIiwid2l0aEF1dGgiLCJpc0xvZ2luZWQiLCJncmFkZSIsIkNvbXBvbmVudCIsInVzZUFzeW5jIiwicHJvbWlzZUZuIiwiaXNMb2FkaW5nIiwiZXJyb3IiLCJ1c2VyIiwic3VjY2VzcyIsImNvbnNvbGUiLCJsb2ciLCJhbGVydCIsImxvY2F0aW9uIiwiaHJlZiIsImlzSG9zdCIsImlzQWRtaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7Q0FLQTtBQUNBO0FBRUE7QUFDQTs7QUFFQSxJQUFNQSxPQUFPO0FBQUEsa1VBQUc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFDR0MsNENBQUssQ0FBQ0MsR0FBTixXQUFhQyxrREFBYixzQkFBc0M7QUFDdkRDLDZCQUFlLEVBQUU7QUFEc0MsYUFBdEMsQ0FESDs7QUFBQTtBQUNUQyxlQURTO0FBQUEsNkNBS1JBLEdBQUcsQ0FBQ0MsSUFMSTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFIOztBQUFBLGtCQUFQTixPQUFPO0FBQUE7QUFBQTtBQUFBLEdBQWI7O0FBUUEsSUFBTU8sUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBQ0MsU0FBRCxFQUFvQkMsS0FBcEI7QUFBQSxTQUFzQyxVQUN0REMsU0FEc0QsRUFFbEQ7QUFBQTs7QUFDSixjQUFPLFlBQU07QUFBQTs7QUFBQSxzQkFDdUJDLDREQUFRLENBQUM7QUFDM0NDLGlCQUFTLEVBQUVaO0FBRGdDLE9BQUQsQ0FEL0I7QUFBQSxVQUNKTSxJQURJLGFBQ0pBLElBREk7QUFBQSxVQUNFTyxTQURGLGFBQ0VBLFNBREY7QUFBQSxVQUNhQyxLQURiLGFBQ2FBLEtBRGI7O0FBS1osVUFBSUQsU0FBSixFQUFlLG9CQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQVA7QUFDZixVQUFJQyxLQUFKLEVBQVcsb0JBQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBUDtBQUNYLFVBQUksQ0FBQ1IsSUFBTCxFQUFXLE9BQU8sSUFBUDtBQUVYLFVBQU1TLElBQVUsR0FBR1QsSUFBSSxDQUFDUyxJQUF4Qjs7QUFDQSxVQUFJVCxJQUFJLENBQUNVLE9BQVQsRUFBa0I7QUFDakJDLGVBQU8sQ0FBQ0MsR0FBUixDQUFZLFlBQVo7O0FBQ0EsWUFBSVYsU0FBUyxLQUFLLENBQWxCLEVBQXFCO0FBQ3BCVyxlQUFLLENBQUMsZUFBRCxDQUFMO0FBQ0FDLGtCQUFRLENBQUNDLElBQVQsR0FBZ0IsR0FBaEI7QUFDQTs7QUFDRCxnQkFBUVosS0FBUjtBQUNDO0FBQ0EsZUFBSyxDQUFMO0FBQ0MsbUJBQU87QUFBRUMsdUJBQVMsRUFBVEE7QUFBRixhQUFQO0FBQ0Q7O0FBQ0EsZUFBSyxDQUFMO0FBQ0MsZ0JBQUlLLElBQUksQ0FBQ08sTUFBVCxFQUFpQixPQUFPWixTQUFQO0FBQ2pCUyxpQkFBSyxDQUFDLG1CQUFELENBQUw7QUFDQUMsb0JBQVEsQ0FBQ0MsSUFBVCxHQUFnQixHQUFoQjtBQUNEOztBQUNBLGVBQUssQ0FBTDtBQUNDLGdCQUFJTixJQUFJLENBQUNRLE9BQVQsRUFBa0IsT0FBT2IsU0FBUDtBQUNsQlMsaUJBQUssQ0FBQyxtQkFBRCxDQUFMO0FBQ0FDLG9CQUFRLENBQUNDLElBQVQsR0FBZ0IsR0FBaEI7QUFiRjtBQWVBLE9BckJELE1BcUJPO0FBQ047QUFDQUosZUFBTyxDQUFDQyxHQUFSLENBQVksWUFBWjs7QUFFQSxZQUFJVixTQUFTLEtBQUssQ0FBbEIsRUFBcUI7QUFDcEJXLGVBQUssQ0FBQyxZQUFELENBQUw7QUFDQUMsa0JBQVEsQ0FBQ0MsSUFBVCxHQUFnQixRQUFoQjtBQUNBLFNBSEQsTUFHTztBQUNOLGlCQUFPWCxTQUFQO0FBQ0E7QUFDRDs7QUFFRCxhQUFPQSxTQUFQO0FBQ0EsS0E1Q0Q7QUFBQSxjQUNvQ0Msb0RBRHBDO0FBQUEsT0FESSxDQStDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0EsR0F6RmdCO0FBQUEsQ0FBakI7O0FBMkZlSix1RUFBZiIsImZpbGUiOiIuL2NvbXBvbmVudHMvbWFpbi9ob2Mvd2l0aEF1dGgudHN4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcbmltcG9ydCBSZWFjdCwgeyBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU0VSVkVSIGZyb20gJy4uLy4uLy4uL3V0aWxzL3VybCc7XG5pbXBvcnQgUm91dGVyIGZyb20gJ25leHQvcm91dGVyJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi8uLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IHVzZUFzeW5jIH0gZnJvbSAncmVhY3QtYXN5bmMnO1xuXG4vLyBpc0xvZ2luZWRcbi8vIDA6IOyVhOustOuCmCDrs7wg7IiYIOyeiOydjCwgMTog66Gc6re47J247ZWcIO2ajOybkOunjCDrs7wg7IiYIOyeiOydjCwgMjog6rKM7Iqk7Yq466eMIOuzvCDsiJgg7J6I7J2MXG5cbi8vIGdyYWRlXG4vLyAwOiDslYTrrLTrgpgg67O8IOyImCDsnojsnYwsIDI6IO2YuOyKpO2KuO2ajOybkOunjCDrs7wg7IiYIOyeiOydjCwgMzog6rSA66as7J6Q7ZqM7JuQ66eMIOuzvCDsiJgg7J6I7J2MXG5cbmNvbnN0IGdldEF1dGggPSBhc3luYyAoKSA9PiB7XG5cdGNvbnN0IHJlcyA9IGF3YWl0IGF4aW9zLmdldChgJHtTRVJWRVJ9L2FwaS9hdXRoL2NoZWNrYCwge1xuXHRcdHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcblx0fSk7XG5cblx0cmV0dXJuIHJlcy5kYXRhO1xufTtcblxuY29uc3Qgd2l0aEF1dGggPSAoaXNMb2dpbmVkOiBudW1iZXIsIGdyYWRlOiBudW1iZXIpID0+IChcblx0Q29tcG9uZW50OiBSZWFjdE5vZGUsXG4pID0+IHtcblx0cmV0dXJuICgpID0+IHtcblx0XHRjb25zdCB7IGRhdGEsIGlzTG9hZGluZywgZXJyb3IgfSA9IHVzZUFzeW5jKHtcblx0XHRcdHByb21pc2VGbjogZ2V0QXV0aCxcblx0XHR9KTtcblxuXHRcdGlmIChpc0xvYWRpbmcpIHJldHVybiA8ZGl2PuuhnOuUqeykkS4uLjwvZGl2Pjtcblx0XHRpZiAoZXJyb3IpIHJldHVybiA8ZGl2PuyXkOufrCE8L2Rpdj47XG5cdFx0aWYgKCFkYXRhKSByZXR1cm4gbnVsbDtcblxuXHRcdGNvbnN0IHVzZXI6IFVzZXIgPSBkYXRhLnVzZXI7XG5cdFx0aWYgKGRhdGEuc3VjY2Vzcykge1xuXHRcdFx0Y29uc29sZS5sb2coJ+uhnOq3uOyduOuQmOyWtOyeiOyKteuLiOuLpC4nKTtcblx0XHRcdGlmIChpc0xvZ2luZWQgPT09IDIpIHtcblx0XHRcdFx0YWxlcnQoJ+ydtOuvuCDroZzqt7jsnbjrkJjslrTsnojsirXri4jri6QuJyk7XG5cdFx0XHRcdGxvY2F0aW9uLmhyZWYgPSAnLyc7XG5cdFx0XHR9XG5cdFx0XHRzd2l0Y2ggKGdyYWRlKSB7XG5cdFx0XHRcdC8vIOyVhOustOuCmFxuXHRcdFx0XHRjYXNlIDA6XG5cdFx0XHRcdFx0cmV0dXJuIHsgQ29tcG9uZW50IH07XG5cdFx0XHRcdC8vIO2YuOyKpO2KuFxuXHRcdFx0XHRjYXNlIDE6XG5cdFx0XHRcdFx0aWYgKHVzZXIuaXNIb3N0KSByZXR1cm4gQ29tcG9uZW50O1xuXHRcdFx0XHRcdGFsZXJ0KCfsoJHqt7ztlaAg7IiYIOyXhuuKlCDtjpjsnbTsp4Ag7J6F64uI64ukLicpO1xuXHRcdFx0XHRcdGxvY2F0aW9uLmhyZWYgPSAnLyc7XG5cdFx0XHRcdC8vIOq0gOumrOyekFxuXHRcdFx0XHRjYXNlIDI6XG5cdFx0XHRcdFx0aWYgKHVzZXIuaXNBZG1pbikgcmV0dXJuIENvbXBvbmVudDtcblx0XHRcdFx0XHRhbGVydCgn7KCR6re87ZWgIOyImCDsl4bripQg7Y6Y7J207KeAIOyeheuLiOuLpC4nKTtcblx0XHRcdFx0XHRsb2NhdGlvbi5ocmVmID0gJy8nO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyDroZzqt7jsnbjrkJjsp4DslYrsnYxcblx0XHRcdGNvbnNvbGUubG9nKCfroZzqt7jsnbjsnYQg7ZW07KO87IS47JqULicpO1xuXG5cdFx0XHRpZiAoaXNMb2dpbmVkID09PSAxKSB7XG5cdFx0XHRcdGFsZXJ0KCfroZzqt7jsnbjsnYQg7ZW07KO87IS47JqULicpO1xuXHRcdFx0XHRsb2NhdGlvbi5ocmVmID0gJy9sb2dpbic7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gQ29tcG9uZW50O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBDb21wb25lbnQ7XG5cdH07XG5cblx0Ly8gYXhpb3Ncblx0Ly8gXHQuZ2V0KGAke1NFUlZFUn0vYXBpL2F1dGgvY2hlY2tgLCB7IHdpdGhDcmVkZW50aWFsczogdHJ1ZSB9KVxuXHQvLyBcdC50aGVuKHJlcyA9PiB7XG5cdC8vIFx0XHRjb25zdCB1c2VyOiBVc2VyID0gcmVzLmRhdGEudXNlcjtcblx0Ly8gXHRcdGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG5cdC8vIFx0XHRcdGNvbnNvbGUubG9nKCfroZzqt7jsnbjrkJjslrTsnojsirXri4jri6QuJyk7XG5cdC8vIFx0XHRcdGlmIChpc0xvZ2luZWQgPT09IDIpIHtcblx0Ly8gXHRcdFx0XHRhbGVydCgn7J2066+4IOuhnOq3uOyduOuQmOyWtOyeiOyKteuLiOuLpC4nKTtcblx0Ly8gXHRcdFx0XHRsb2NhdGlvbi5ocmVmID0gJy8nO1xuXHQvLyBcdFx0XHR9XG5cdC8vIFx0XHRcdHN3aXRjaCAoZ3JhZGUpIHtcblx0Ly8gXHRcdFx0XHQvLyDslYTrrLTrgphcblx0Ly8gXHRcdFx0XHRjYXNlIDA6XG5cdC8vIFx0XHRcdFx0XHRyZXR1cm4gQ29tcG9uZW50O1xuXHQvLyBcdFx0XHRcdC8vIO2YuOyKpO2KuFxuXHQvLyBcdFx0XHRcdGNhc2UgMTpcblx0Ly8gXHRcdFx0XHRcdGlmICh1c2VyLmlzSG9zdCkgcmV0dXJuIENvbXBvbmVudDtcblx0Ly8gXHRcdFx0XHRcdGFsZXJ0KCfsoJHqt7ztlaAg7IiYIOyXhuuKlCDtjpjsnbTsp4Ag7J6F64uI64ukLicpO1xuXHQvLyBcdFx0XHRcdFx0bG9jYXRpb24uaHJlZiA9ICcvJztcblx0Ly8gXHRcdFx0XHQvLyDqtIDrpqzsnpBcblx0Ly8gXHRcdFx0XHRjYXNlIDI6XG5cdC8vIFx0XHRcdFx0XHRpZiAodXNlci5pc0FkbWluKSByZXR1cm4gQ29tcG9uZW50O1xuXHQvLyBcdFx0XHRcdFx0YWxlcnQoJ+ygkeq3vO2VoCDsiJgg7JeG64qUIO2OmOydtOyngCDsnoXri4jri6QuJyk7XG5cdC8vIFx0XHRcdFx0XHRsb2NhdGlvbi5ocmVmID0gJy8nO1xuXHQvLyBcdFx0XHR9XG5cdC8vIFx0XHR9IGVsc2Uge1xuXHQvLyBcdFx0XHQvLyDroZzqt7jsnbjrkJjsp4DslYrsnYxcblx0Ly8gXHRcdFx0Y29uc29sZS5sb2coJ+uhnOq3uOyduOydhCDtlbTso7zshLjsmpQuJyk7XG5cdC8vIFx0XHRcdGNvbnNvbGUubG9nKHJlcy5kYXRhLm1lc3NhZ2UsICfsnbTqsoPsnYAg7JeQ65+sJyk7XG5cblx0Ly8gXHRcdFx0aWYgKGlzTG9naW5lZCA9PT0gMSkge1xuXHQvLyBcdFx0XHRcdGFsZXJ0KCfroZzqt7jsnbjsnYQg7ZW07KO87IS47JqULicpO1xuXHQvLyBcdFx0XHRcdGxvY2F0aW9uLmhyZWYgPSAnL2xvZ2luJztcblx0Ly8gXHRcdFx0fSBlbHNlIHtcblx0Ly8gXHRcdFx0XHRyZXR1cm4gQ29tcG9uZW50O1xuXHQvLyBcdFx0XHR9XG5cdC8vIFx0XHR9XG5cdC8vIFx0fSk7XG5cblx0Ly8gcmV0dXJuIENvbXBvbmVudDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhBdXRoO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/main/hoc/withAuth.tsx\n");

/***/ })

})