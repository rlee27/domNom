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
    this.domEls.forEach((el) => {
      el.innerHTML += content.outerHTML;
    });
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
