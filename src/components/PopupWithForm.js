import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);

    this.__popupForm = this._popupElement.querySelector(".modal__form.form");
    this._handleFormSubmit = handleFormSubmit;
  }
  close() {
    this.__popupForm.reset();
    super.close();
  }
  _getInputValue() {}
  setEventListeners() {}
}
export default PopupWithForm;
2;
