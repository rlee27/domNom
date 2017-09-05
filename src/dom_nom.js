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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

$d = function (arg) {
  const funcs = [];

  if (typeof arg === "string") {
    const nodeList = document.querySelectorAll(arg);
    const nodeArray = Array.from(nodeList);
    return new DOMNodeCollection(nodeArray);

  } else if (arg instanceof HTMLElement) {
    return new DOMNodeCollection([arg]);

  } else if (typeof arg === "function"){
    document.addEventListener("DOMContentLoaded", arg);
  }
};

window.$d = $d;

$d.extend = function (target, obj1, ...objs) {
  if (!objs) {
    objs = [];
  }
  objs.unshift(obj1);

  for (let i = 0; i < objs.length; i++) {
    const objKeys = Object.keys(objs[i]);

    for (let j = 0; j < objKeys.length; j++) {
      target[objKeys[j]] = objs[i][objKeys[j]];
    }
  }

  return target;
};

$d.ajax = function(options = {}) {
  return new Promise(function(resolve, reject) {
    const defaults = {
      url: "/",
      method: "GET",
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: {},
      success: () => {},
      error: () => {},
    };

    const xhr = new XMLHttpRequest();
    const request = $d.extend(defaults, options);
    request.method = request.method.toUpperCase();

    xhr.open(request.method, request.url);
    xhr.onload = function () {
      if (xhr.status === 200) {
        request.success(xhr.response);
        resolve(xhr.response);
      } else {
        request.error(xhr.response);
        reject(xhr.response);
      }
    };

    xhr.send(JSON.stringify(request.data));
  });
};

window.$d.ajax = $d.ajax;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(domEls) {
    this.domEls = domEls;
  }

  html(string) {
    if (string) {
      this.domEls.forEach((el) => {
        el.innerHTML = string;
      });
    } else {
      return this.domEls[0].innerHTML;
    }
  }

  empty() {
    this.html(" ");
  }

  append(content) {
    if (typeof content === "string") {
      return this.domEls.forEach((el) => {
        return el.innerHTML += content;
      });
    }
    if (content instanceof HTMLElement) {
      return this.domEls.forEach((el) => {
        return el.innerHTML += content.outerHTML;
      });
    }
    if (content instanceof DOMNodeCollection) {
      return this.domEls.forEach((el) => {
        return content.domEls.forEach((contentEl) => {
          return el.innerHTML += contentEl.outerHTML;
        });
      });
    }
  }

  attr(attributeName, value) {
    if (typeof value === "string") {
      this.domEls.forEach( (el) => {
        el.setAttribute(attributeName, value);
      });
    } else {
      return this.domEls[0].getAttribute(attributeName);
    }
  }

  addClass(name) {
    this.domEls.forEach( (el) => {
      if (el.className) {
        el.className += ` ${name}`;
      } else {
        el.className = name;
      }
    });
  }

  removeClass(name) {
    if (!name) {
      this.domEls.forEach((el) => {
        el.className = "";
      });
    } else {
      this.domEls.forEach((el) => {
        const classes = el.className.split(" ");
        const target = classes.indexOf(name);
        classes.splice(target, 1);
        el.className = classes.join(" ");
      });
    }
  }

  children() {
    const chilly = [];
    this.domEls.forEach((el) => {
      for (let i = 0; i < el.children.length; i++) {
        chilly.push(el.children[i]);
      }
    });

    return new DOMNodeCollection(chilly);
  }

  parent() {
    const parents = [];
    this.domEls.forEach((el) => {
      parents.push(el.parentNode);
    });
    return new DOMNodeCollection(parents);
  }

  find(selector) {
    let nodes = [];
    this.domEls.forEach((el) => {
      nodes = nodes.concat(Array.from(el.querySelectorAll(selector)));
    });
    return new DOMNodeCollection(nodes);
  }

  remove() {
    this.domEls.forEach((el) => {
      el.outerHTML = "";
    });
    this.domEls = [];
  }

  on(e, callback) {
    this.domEls.forEach((el) => {
      el.addEventListener(e, callback);
      el.e = callback;
    });
  }

  off(e) {
    this.domEls.forEach((el) => {
      const callback = el.e;
      el.e = "";
      el.removeEventListener(e, callback);
    });
  }



}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);