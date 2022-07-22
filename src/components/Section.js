class Section {
  constructor(containerSelector, renderer) {
    this._containerSelector = containerSelector;
    this._renderer = renderer;
  }

  addElement(element) {
    document.querySelector(this._containerSelector).prepend(element);
  }

  renderElements(elements) {
    elements.reverse().forEach(element => {
      this._renderer(element);
    });
  }
}

export { Section }