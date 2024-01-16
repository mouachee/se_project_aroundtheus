import Popup from "./Popup.js";
class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });

    this._popupImage = this._popupElement.querySelector(".modal__popup-image");
    this._popupCaption = this._popupElement.querySelector(
      ".modal__popup-caption"
    );
  }
  open({ link, name }) {
    this._popupImage.src = link;
    this._popupImage.alt = `Image ${name}`;
    this._popupCaption.textContent = name;

    super.open(); //call the open() from popup to make sure it opens
  }
}
export default PopupWithImage;
