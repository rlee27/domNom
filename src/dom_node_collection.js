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
