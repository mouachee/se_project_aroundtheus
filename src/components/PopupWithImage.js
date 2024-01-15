import Popup from "./Popup.js";
class PopupWithImage extends Popup {
  open({ link, name }) {
    // take an object with properties link and name
    this._popupElement.querySelector(".modal__popup-caption").textContent =
      name; // find the popup element "modal__popup-caption" and set textcontent to name property
    const image = this._popupElement.querySelector(".modal__popup-image");
    // find element image popup
    image.src = link; // set "src" attribute of image to "link" property
    image.alt = `Image ${name}`;
    super.open(); //call the open() from popup to make sure it opens
  }
}
export default PopupWithImage;
