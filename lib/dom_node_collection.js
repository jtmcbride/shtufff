class DOMNodeCollection {

  constructor(arr){
    this.arr = arr;
  }

  html(arg) {
    if (arg === undefined) {
      return this.arr[0].innerHTML;
    } else {
      this.arr.forEach((el) => {
        el.innerHTML = arg;
      });
    }
  }

  empty() {
    this.arr.forEach((el) => {
      el.innerHTML = "";
    });
  }

  append(element) {
    if (typeof element === "string"){
      this.arr.forEach((el) => {
        let content = el.innerHTML;
        content += element;
        el.innerHTML = content;
      });
    } else if (element instanceof HTMLElement) {
      this.arr.forEach((el) => {
        let content = el.innerHTML;
        content += element.outerHTML;
        el.innerHTML = content;
      });
    } else if (element instanceof DOMNodeCollection) {
      let newContent = "";

      element.arr.forEach((elEl) => {
        newContent += elEl.outerHTML;
      });

      this.arr.forEach((el) => {
        let content = el.innerHTML;
        content += newContent;
        el.innerHTML = content;
      });
    }
  }

  attr(name, value){
    if (value === undefined){
      return this.arr[0].getAttribute(name);
    } else {
      this.arr.forEach((el) => {
        el.setAttribute(name, value);
      });
    }
  }

  addClass(cName) {
    this.arr.forEach((el) => {
      let content = el.className;
      if (!content.includes(cName)){
        content += " " + cName;
      }
      el.className = content;
    });
  }

  removeClass(name) {
    this.arr.forEach((el) => {
      let content = el.className.split(" ");
      let idx = content.indexOf(name);
      while (idx !== -1) {
        content.splice(idx, 1);
        idx = content.indexOf(name);
      }
      el.className = content.join(" ");
    });
  }

  children() {
    let childs = [];
    this.arr.forEach((el) => {
      Array.from(el.children).forEach((child) => {
        childs.push(child);
      });
    });
    return new DOMNodeCollection(childs);
  }

  parent() {
    let parents = [];
    this.arr.forEach((el) => {
      parents.push(el.parentNode);
    });
    return new DOMNodeCollection(parents);
  }

  find(element) {
    let result = [];
    this.arr.forEach((el) => {
      let elArray = Array.from(el.querySelectorAll(element));
      result = result.concat(elArray);
    });
    return new DOMNodeCollection(result);
  }

  remove() {
    this.arr.forEach((el) => {
      el.parentNode.removeChild(el);
    });
  }

  on(type, cb) {
    this.arr.forEach((el) => {
      el.addEventListener(type, cb);
    });
  }

  off(type) {
    this.arr.forEach((el) => {
      let eventFunction = window.getEventListeners(el)[type][0].listener;
      el.removeEventListener(type, eventFunction);
    });
  }
}

module.exports = DOMNodeCollection;
