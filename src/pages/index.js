import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  validationSettings,
  profileEditButton,
  profileTitle,
  profileDescription,
  profileTitleInput,
  profileDescriptionInput,
  profileEditForm,
  addCardForm,
  cardTitleInput,
  cardUrlInput,
  addCardButton,
  cardListEl,
  modals,
} from "../utils/constants.js";
/**
 * =================================================
 *                POPUP
 * =================================================
 */
const cardSection = new Section(
  {
    items: initialCards, // start with initialCards
    renderer: (cardData) => cardSection.addItems(createCard(cardData)),
  }, // use the data to create a card
  ".cards__list" //refer to the (selector) in section class
);
cardSection.renderItems(); // call the renderitems() to show the cards on the page

const addPopupForm = new PopupWithForm("#add-card-modal", handleAddCardSubmit);
addPopupForm.setEventListeners(); // call the event listeners from popupWithForm

const editPopupForm = new PopupWithForm(
  "#profile__edit-modal",
  handleProfileEditSubmit
);
editPopupForm.setEventListeners();

const popupWithImage = new PopupWithImage("#preview-image-modal");
popupWithImage.setEventListeners();
const userInfo = new UserInfo({ profileTitle, profileDescription }); //call the existing variables

/**
 * =================================================
 *                VALIDATION
 * =================================================
 */
const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationSettings, addCardForm);
addFormValidator.enableValidation();
/**
/**
 * =================================================
 *               ESC KEY FUNCTION
 * =================================================
 */
/*function handleEscKey(evt) {
  if (evt.key === "Escape") {
    const currentOpenedPopup = document.querySelector(".modal__opened");
    if (currentOpenedPopup) {
      closePopup(currentOpenedPopup);
    }
  }
}
/**
 * =================================================
 *                CLOSE/OPEN FUNCTION
 * =================================================
 */
/*function openPopup(modal) {
  document.addEventListener("keydown", handleEscKey);
  modal.classList.add("modal__opened");
}
function closePopup(modal) {
  document.removeEventListener("keydown", handleEscKey);
  modal.classList.remove("modal__opened");*/
//}
/*function closePreviewImage() {
  closePopup(previewImageModal);*/
//}
//function closeEditProfile() {
/**
 * =================================================
 *                HANDLERS
 * =================================================
 */
function handleProfileEditSubmit() {
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  editFormValidator.resetValidation();

  editPopupForm.close();
}
function handleAddCardSubmit() {
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  //renderCard({ name, link }, cardListEl);
  // evt.target.reset();
  addPopupForm.close();
  addFormValidator.toggleButtonState(); // disabled the button after adding a new card //
}
function handleImageClick(cardData) {
  popupWithImage.open(cardData);
  /* modalImageEl.src = this._link;
  modalImageEl.alt = `Image${this._name}`;
  modalCaptionEl.textContent = this._name; */
  // openPopup(previewImageModal);
}

//FUNCTION TO RENDER CARD
function createCard(cardData) {
  const cardEl = new Card(cardData, "#card-template", () =>
    handleImageClick(cardData)
  );
  return cardEl.getView();
}
/*function renderCard(cardData) {
  const card = createCard(cardData);
  //wrapper.prepend(card);
}
/**
 * =================================================
 *                EVENT LISTENERS
 * =================================================
 */
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  editPopupForm.open();
});

/**
 * =================================================
 *  COMBINE OVERLAY/BUTTON CLOSE
 * =================================================
 */
/*modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      close(modal);
    }
    if (evt.target.classList.contains("modal__close")) {
      close(modal);
    }
  });
});*/
//initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

addCardButton.addEventListener("click", () => {
  addPopupForm.open();
});
