export default class Section {
  constructor({ items, renderer }, cardContainer) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._cardContainer = cardContainer;
  }

  renderItems() {
    this._renderedItems.forEach(item => this._renderer(item));
  }

  addItem(item) {
    this._cardContainer.append(item);
  }
}
