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
const months = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

const days = {
  1: "Sunday",
  2: "Monday",
  3: "Tuesday",
  4: "Wednesday",
  5: "Thursday",
  6: "Friday",
  7: "Saturday",
};

const ending = {
  0: "th",
  1: "st",
  2: "nd",
  3: "rd",
  4: 'th'
};

const date = new Date();

function addEnding () {
  const calDate = date.getDate();
  if (calDate < 5) {
    return ending[calDate];
  } else if (calDate >= 5 && calDate < 21) {
    return ending[4];
  } else {
    return ending[calDate % 5];
  }
}

$d(() => {

  // DEMOS THE AJAX CALL, WITH PROMISE, ALSO APPEND FUNCTION
  $d.ajax({
    url: "http://ron-swanson-quotes.herokuapp.com/v2/quotes",
    contentType: 'JSONP',
  }).then((res) => {
    $d(".quote").append(`"${JSON.parse(res)[0]}"`);
  });

  $d(".day").append(days[date.getDay()]);
  $d(".month").append(`${months[date.getMonth()]}`);
  $d(".date").append(`${date.getDate()}${addEnding()}`);

  // DEMOS EVENT HANDLER
  $d(".to-do-submit").on('click', (e) => {
    e.preventDefault();
    let value = $d(".to-do-text").domEls[0].value;
    createTodo(value);
    $d('.to-do-text').domEls[0].value = "";
  });
});

const createTodo = (value) => {
  $d(".to-do-list-container").append(`<li class="todo-item">${value}</li>`);
  $d(".todo-item").on('click', (e) => {
      $d(e.target).addClass("done");
    });
};
