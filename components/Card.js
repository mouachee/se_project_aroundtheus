const previewImageModal = document.getElementById("preview-image-modal");
const modalImageEl = previewImageModal.querySelector(".modal__popup-image");
const modalCaptionEl = previewImageModal.querySelector(".modal__popup-caption");
function handleEscKey(evt) {
  if (evt.key === "Escape") {
    const currentOpenedPopup = document.querySelector(".modal_opened");
    if (currentOpenedPopup) {
      closePopup(currentOpenedPopup);
    }
  }
}
function closePopup(modal) {
  document.removeEventListener("keydown", handleEscKey);
  previewImageModal.classList.remove("modal_opened");
}
class Card {
  constructor(cardData, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
  }
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }
  _handlePreviewPicture() {
    modalImageEl.src = this._link;
    modalImageEl.alt = `Image${this._name}`;
    modalCaptionEl.textContent = this._name;
    openPopup(previewImageModal);
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
  getView() {
    this._element = this._getTemplate();
    this._element.querySelector(
      ".card__image"
    ).style.backgroundImage = `url(${this._link})`;
    this._element.querySelector(".card__title").textContent = this._name;
    this._setEventListeners();

    return this._element;
  }
}
export default Card;
