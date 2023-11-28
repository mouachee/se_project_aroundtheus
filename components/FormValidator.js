class FormValidator {
  constructor(formEl, settings) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formEl;
  }
  _showInputError(inputEl) {
    const errorEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorEl.textContent = inputEl.validationMessage;
    errorEl.classList.add(this._errorClass);
  }
  _hideInputError(inputEl) {
    const errorEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorEl.textContent = "";
    errorEl.classList.remove(this._errorClass);
  }
  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(this._form, inputEl);
    } else {
      this._hideInputError(this._form, inputEl);
    }
  }
  _hasInvalidInput(inputEls) {
    return !inputEls.every((inputEl) => inputEl.validity.valid);
  }
  _disableButton(buttonEl) {
    buttonEl.classList.add(this._inactiveButtonClass);
    buttonEl.disabled = true;
  }
  _enableButton() {
    buttonEl.classList.remove(this._inactiveButtonClass);
    buttonEl.disabled = false;
  }

  _toggleButtonState(inputEls, buttonEl) {
    if (this._hasInvalidInput(inputEls)) {
      this._disableButton(buttonEl, this._inactiveButtonClass);
    } else {
      this._enableButton(buttonEl, this._inactiveButtonClass);
    }
  }

  _setEventListeners() {
    inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    buttonEl = this._form.querySelector(this._submitButtonSelector);

    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }
  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
