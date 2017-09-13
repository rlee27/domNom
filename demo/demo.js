const DOMNodeCollection = require('../src/dom_node_collection');

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

// DEMO CODE STARTS HERE
$d(() => {

  // DEMOS THE AJAX CALL, WITH PROMISE, ALSO APPEND FUNCTION
  $d.ajax({
    url: 'http://calapi.inadiutorium.cz/api/v0/en/calendars/default/today',
    contentType: 'JSONP',
  }).then((res) => {
    $d(".day").append(JSON.parse(res).weekday);
    $d(".date").append(JSON.parse(res).date);
  });

  // DEMOS EVENT HANDLER
  $d(".to-do-submit").on('click', (e) => {
    e.preventDefault();
    let value = $d(".to-do-text").domEls[0].value;
    createTodo(value);
    $d('.to-do-text').domEls[0].value = "";
  });
});

const createTodo = (value) => {
  return $d(".to-do-list-container").append(`<li>${value}</li>`);
};
