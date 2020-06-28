export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach(item => this._renderer(item))
  }

  appendItem(element) { // добавить в конец
    this._container.append(element);
  }

  prependItem(element) { // добавить в начало
    this._container.prepend(element);
  }
}
