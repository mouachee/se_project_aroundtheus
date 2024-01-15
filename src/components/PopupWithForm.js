import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });

    this._popupForm = this._popupElement.querySelector(".modal__form.form");
    this._handleFormSubmit = handleFormSubmit; // a callback function pass as an argument
    this._inputList = this._popupForm.querySelectorAll(".form__input");
  }
  close() {
    this._popupForm.reset();
    super.close();
  }
  _getInputValue() {
    const inputValues = {}; // an object to store all the input values
    this._inputList.forEach((input) => {
      // go through each input in the _inputList which store all the inputs
      inputValues[input.name] = input.value; //take the name of the input field like (title/description/url)
      // and get the value that entered from the users and store them in the inputValues object
    });
    return inputValues; //it return back all the name and values to the inputValues object
  }
  setEventListeners() {
    super.setEventListeners(); // get the setEventListeners from parent class to close the popup
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault(); // prevent page refreshing
      this._handleFormSubmit(this._getInputValue()); // call the function and give it the values from the form(_getInputValue)
    });
  }
}
export default PopupWithForm;
