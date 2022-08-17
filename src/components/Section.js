class Section {
  constructor(containerSelector, renderer) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  addElement(element) {
    const card = this._renderer(element)
    this._container.prepend(card);
  }

  renderElements(elements) {
    elements.reverse().forEach((element) => {
      this.addElement(element);
    });
  }
}

export { Section };
