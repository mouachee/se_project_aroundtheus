export default class Section {
  constructor({ items, renderer }, containerSelector) {
    // take items and renderer as an object, selector as a string
    this._items = items;
    this._renderer = renderer;
    this._element = document.querySelector(containerSelector); // find the HTML element using selector/ ".cards__list"
  }

  renderItems() {
    // method to display cards
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
  addItems(element) {
    //method to add new card to the beginning of the section
    this._element.prepend(element);
  }
}
