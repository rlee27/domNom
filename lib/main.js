const DOMNodeCollection = require('./dom_node_collection');

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
