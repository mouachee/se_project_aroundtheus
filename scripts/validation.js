// enabling validation by calling enableValidation()
// pass all the settings on call
// function to show and hide the error message
function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorEl.textContent = inputEl.validationMessage;
  errorEl.classList.add(errorClass);
}
function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorEl.textContent = "";
  errorEl.classList.remove(errorClass);
}
// check if the input is invalid if not then show error message
function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, options);
  } else {
    hideInputError(formEl, inputEl, options);
  }
}
// check if all input are valid for the submit button
function hasInvalidInput(inputEls) {
  return !inputEls.every((inputEl) => inputEl.validity.valid);
}
// disable function
function disableButton(buttonEl, { inactiveButtonClass }) {
  buttonEl.classList.add(inactiveButtonClass);
  buttonEl.disabled = true;
}
// enable function
function enableButton(buttonEl, { inactiveButtonClass }) {
  buttonEl.classList.remove(inactiveButtonClass);
  buttonEl.disabled = false;
}
// if there's at least 1 invalid input, disable the button
function toggleButtonState(inputEls, buttonEl, { inactiveButtonClass }) {
  if (hasInvalidInput(inputEls)) {
    disableButton(buttonEl, { inactiveButtonClass });
  } else {
    enableButton(buttonEl, { inactiveButtonClass });
  }
}

function setEventListeners(formEl, options) {
  const { inputSelector, submitButtonSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const buttonEl = formEl.querySelector(submitButtonSelector);
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, buttonEl, options);
    });
  });
}
function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formEl, options);
  });
}

const config = {
  formSelector: ".modal__form.form",
  inputSelector: ".form__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};
enableValidation(config);
