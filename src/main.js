const DOMNodeCollection = require('./dom_node_collection');

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
