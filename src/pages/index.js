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
const userInfo = new UserInfo({
  profileNameSelector: profileTitle,
  profileDescriptionSelector: profileDescription,
}); //call the existing variables

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
/*
 * =================================================
 *                HANDLERS
 * =================================================
 */
function handleProfileEditSubmit(inputValues) {
  //profileTitle.textContent = profileTitleInput.value;
  //profileDescription.textContent = profileDescriptionInput.value;
  userInfo.setUserInfo(inputValues);
  editFormValidator.resetValidation();
  editPopupForm.close();
}
function handleAddCardSubmit({ link, name }) {
  //const name = cardTitleInput.value;
  //const link = cardUrlInput.value;
  renderCard({ link, name }, cardListEl);
  addPopupForm.close();
  addFormValidator.toggleButtonState(); // disabled the button after adding a new card //
}
function handleImageClick(cardData) {
  popupWithImage.open(cardData);
}

//FUNCTION TO RENDER CARD
function createCard(cardData) {
  const cardEl = new Card(cardData, "#card-template", () =>
    handleImageClick(cardData)
  );
  return cardEl.getView();
}
function renderCard(cardData) {
  const card = createCard(cardData);
  cardSection.addItems(card);
  //wrapper.prepend(card);
}
/**
 * =================================================
 *                EVENT LISTENERS
 * =================================================
 */
profileEditButton.addEventListener("click", () => {
  const userInformation = userInfo.getUserInfo();
  profileTitleInput.value = userInformation.userProfileName;
  profileDescriptionInput.value = userInformation.userProfileDescription;
  editPopupForm.open();
});

//initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

addCardButton.addEventListener("click", () => {
  addPopupForm.open();
});
