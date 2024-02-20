import { data } from "jquery";

class Card {
  constructor(cardData, cardSelector, handleImageClick, handleDeleteClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
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
    this._likeButton.classList.toggle("card__like-button_active");
  }
  handleDelete() {
    this._element.remove();
    this._element = null;
  }
  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLike();
    });
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this._id);
    });
    this._cardImage.addEventListener("click", () => {
      this._handlePreviewPicture();
    });
  }
  // Get the view of the images and titles //
  getView() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".card__like-button");
    this._cardImage = this._element.querySelector(".card__image");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._cardTitle = this._element.querySelector(".card__title");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
export default Card;
