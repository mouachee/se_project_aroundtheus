class Card {
  constructor(cardData, cardSelector, handleImageClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }
  // Clone the card template and its card content //
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }
  _handlePreviewPicture() {
    this._handleImageClick();
  }
  _handleLike() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }
  _handleDelete() {
    this._element.remove();
    this._element = null;
  }
  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLike();
      });
    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDelete();
      });
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handlePreviewPicture();
      });
  }
  // Get the view of the images and titles //
  getView() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;
    this._setEventListeners();

    return this._element;
  }
}
export default Card;
