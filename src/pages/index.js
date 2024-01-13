import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  cardTemplate,
  cardSelector,
  validationSettings,
  profileEditModal,
  profileEditButton,
  profileCloseButton,
  profileTitle,
  profileDescription,
  profileTitleInput,
  profileDescriptionInput,
  profileEditForm,
  addCardModal,
  addCardForm,
  cardTitleInput,
  cardUrlInput,
  addCardButton,
  addCardCloseButton,
  previewImageModal,
  previewImageCloseButton,
  cardListEl,
  modalImageEl,
  modalCaptionEl,
  modals,
} from "../utils/constants.js";
/**
 * =================================================
 *                POPUP
 * =================================================
 */
const popup = new Popup({});
const cardSection = new Section(
  {
    renderer: (item) => {
      const cardEl = new Card(item, cardSelector);
      cardSection.addItems(cardEl.getView());
    },
  },
  cardSelector.cardSection
);
cardSection.renderItems(initialCards);
const popupWithForm = new PopupWithForm("#add-card-modal", () => {});
const popupWithImage = new PopupWithImage();
const userInfo = new UserInfo();

/**
 * =================================================
 *                Validation
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
 *               esc key function
 * =================================================
 */
function handleEscKey(evt) {
  if (evt.key === "Escape") {
    const currentOpenedPopup = document.querySelector(".modal_opened");
    if (currentOpenedPopup) {
      closePopup(currentOpenedPopup);
    }
  }
}
/**
 * =================================================
 *                close and open modal functions
 * =================================================
 */
function openPopup(modal) {
  document.addEventListener("keydown", handleEscKey);
  modal.classList.add("modal_opened");
}
function closePopup(modal) {
  document.removeEventListener("keydown", handleEscKey);
  modal.classList.remove("modal_opened");
}
function closeAddCard() {
  closePopup(addCardModal);
}
function closePreviewImage() {
  closePopup(previewImageModal);
}
function closeEditProfile() {
  closePopup(profileEditModal);
}
/**
 * =================================================
 *                submit Handlers
 * =================================================
 */
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  editFormValidator.resetValidation();

  closePopup(profileEditModal);
}
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  evt.target.reset();
  closeAddCard();
  addFormValidator.toggleButtonState(); // disabled the button after adding a new card //
}

//function to render a card
function createCard(cardData) {
  const cardEl = new Card(cardData, cardSelector, handleImageClick);
  return cardEl.getView();
}
function renderCard(cardData, wrapper) {
  const card = createCard(cardData);
  wrapper.prepend(card);
}
function handleImageClick() {
  modalImageEl.src = this._link;
  modalImageEl.alt = `Image${this._name}`;
  modalCaptionEl.textContent = this._name;
  openPopup(previewImageModal);
}
/**
 * =================================================
 *                Event Listeners
 * =================================================
 */
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

/**
 * =================================================
 *  Combine closing overlay and close buttons popup
 * =================================================
 */
modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      closePopup(modal);
    }
    if (evt.target.classList.contains("modal__close")) {
      closePopup(modal);
    }
  });
});
initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

addCardButton.addEventListener("click", () => {
  openPopup(addCardModal);
});
