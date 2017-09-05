# DomNom
DomNom is a JavaScript DOM interaction inspired by jQuery. DomNom users can:
* Select a single DOM element or multiple
* Manipulate DOM elements
* Create DOM elements
* Create DOM event handlers
* Add queue to functions until DOM has fully loaded

## Getting Started
To get started with DomNom, download this library into your project and include the webpack output dom_nom.js in your source code.

```html
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="./css/reset.css">
  <script type="text/javascript" src="../dist/dom_nom.js"></script>
  ...
</head>
```

## `$d`
DomNom utilizes a global variable `$d` as a wrapper for all the methods in the library.

`$d` can be used to select elements using CSS selectors and `HTMLElement`s. The result will be a `DOMNodeCollection` object which will have access to DomNom methods.

`$d` can also be used to build `HTMLElement`(s) by passing in a string of HTML code as an argument.

`$d` is also a tool for queuing functions to run once the DOM is fully loaded.

## DOM Traversal
Navigating DOM elements:
#### `children()`
Returns a `DOMNodeCollection` object containing only direct children of every `HTMLElement` in the original `DOMNodeCollection`

#### `parent()`
Returns a `DOMNodeCollection` object of the parent elements of every `HTMLElement` in the original `DOMNodeCollection`

#### `find(selector)`
Takes a CSS selector as an argument and returns a `DOMNodeCollection` object containing the `HTMLElement` with the `selector` argument in the original `DOMNodeCollection`.

## DOM Manipulation
Manipulating DOM elements:
#### `html([string])`
Returns the `innerHTML` of the first element in the DOMNodeCollection if no argument is provided. With an argument, `innerHTML` is changed for each of the nodes in the `DOMNodeCollection`.

#### `empty`
Empties the `innerHTML` of each of the `DOMNodeCollection`

#### `append(content)`
`content` can be a single `string`, `HTMLElement`, or `DOMNodeCollection` and will append value of `content` to each node of the original `DOMNodeCollection`.

#### `attr(attributeName, [value])`
If no `value` is provided, the attribute value is returned for the first element in the `DOMNodeCollection`. If a `value` is provided, the `attributeName` is given to each `DOMNodeCollection` with the value of `value`.

#### `addClass(name)`
Adds class of value `name` to each of the nodes in the `DOMNodeCollection`.

#### `removeClass(name)`
Removes class of value `name` in each of the nodes in the `DOMNodeCollection`.

## `$d.ajax`
Sends HTTP Request and returns a `Promise` object. Accepts an object as an argument with these attributes:
* method (default: to 'GET'): HTTP Request method or type
* url (default: '/'): URL for HTTP Request
* success: success callback
* error: error callback
* contentType (default: 'application/x-www-form-urlencoded; charset=UTF-8'): content type of HTTP Request
