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

$d = (arg) => {
  const funcs = [];

  if (typeof arg === "string") {
    const nodeList = document.querySelectorAll(arg);
    const nodeArray = Array.from(nodeList);
    return new DOMNodeCollection(nodeArray);

  } else if (arg instanceof HTMLElement) {
    return new DOMNodeCollection([arg]);

  } else {
    document.addEventListener("DOMContentLoaded", arg);
  }
};

window.$d = $d;

window.$d.extend = function (target, obj1, ...objs) {
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

window.$d.ajax = function(option) {
  const xhr = new XMLHttpRequest();
  if (!option) {
    option = {};
  }
  const defaults = {
    url: "/",
    method: "GET",
    contentType: "JSON",
    data: {},
    success: () => console.log(xhr.status),
    error: () => console.log("There was an error")
  };
  const request = $d.extend(defaults, option);
  xhr.open(request.method, request.url);
  xhr.onload = function () {
    if (xhr.status === 200) {
      request.success(JSON.parse(xhr.response));
    } else if (xhr.status > 399) {
      request.error();
    }

    // return JSON.parse(xhr.response);
  };

  xhr.send(request.data);
};

// $d( () => alert('the document is ready'));


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
      this.domEls.forEach((el) => {
        return el.innerHTML += content;
      });
    }

    if (content instanceof HTMLElement) {
      this.domEls.forEach((el) => {
        el.innerHTML += content.outerHTML;
      });
    }
  }

  attr(attribute, content) {
    if (!content) {
      return this.domEls[0].attributes[attribute];
    } else {
      this.domEls.forEach( (el) => {
        el.attributes[attribute] = content;
      });
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
    this.attr(e, callback);
    this.domEls.forEach((el) => {
      // el.attributes.e = `${callback}`;
      el.addEventListener(e, callback);
    });
  }

  off(e) {
    this.domEls.forEach((el) => {
      const callback = this.attr(e);
      this.attr(e, "");
      el.removeEventListener(e, callback);
    });
  }



}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);