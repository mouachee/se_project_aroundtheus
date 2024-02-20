import Popup from "./Popup";
class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form.form");
  }
  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }
  setEventListeners() {
    super.setEventListeners;
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }
}
export default PopupWithConfirm;
