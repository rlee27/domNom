class Router {

  constructor(node) {
    this.node = node;
  }

  start() {
    this.render();
    this.node.addEventListener("hashchange", () => {
      this.render();
    });
  }

  render() {
    this.node.innerHTML = "";
    const route = this.activeRoute();
    const p = document.createElement("p");
    p.innerHTML = route;
    this.node.appendChild(p);
  }

  activeRoute() {
    return window.location.hash.slice(1);
  }

}

module.exports = Router;
