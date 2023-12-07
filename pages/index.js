import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
// Declarations //
// Initial cards data//
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// profile elements //
const profileEditModal = document.getElementById("profile__edit-modal");
const profileEditButton = document.getElementById("profile__edit-button");
const profileCloseButton = document.getElementById("profile-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = document.forms["profile-edit-form"];

// Add cards elements //
const addCardModal = document.getElementById("add-card-modal");
const addCardForm = document.forms["add-card-form"];
const cardTitleInput = addCardForm.querySelector("#add-card-title-input");
const cardUrlInput = addCardForm.querySelector("#add-card-url-input");
const addCardButton = document.querySelector("#add__card-button");
const addCardCloseButton = document.getElementById("add-card-close-button");

//preview Images //
const previewImageModal = document.getElementById("preview-image-modal");
const previewImageCloseButton = document.getElementById(
  "preview-image-close-button"
);
const cardListEl = document.querySelector(".cards__list");
const modalImageEl = previewImageModal.querySelector(".modal__popup-image");
const modalCaptionEl = previewImageModal.querySelector(".modal__popup-caption");
// Validation
const cardSelector = "#card-template";
const validationSettings = {
  inputSelector: ".form__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationSettings, addCardForm);
addFormValidator.enableValidation();

// esc key function
function handleEscKey(evt) {
  if (evt.key === "Escape") {
    const currentOpenedPopup = document.querySelector(".modal_opened");
    if (currentOpenedPopup) {
      closePopup(currentOpenedPopup);
    }
  }
}
// close and open modal functions
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
// submit Handlers //
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  evt.target.reset();
  closeAddCard();
}

//function to render a card
function renderCard(cardData, wrapper) {
  const card = new Card(cardData, cardSelector, handleImageClick);
  wrapper.prepend(card.getView());

  function handleImageClick() {
    modalImageEl.src = this._link;
    modalImageEl.alt = `Image${this._name}`;
    modalCaptionEl.textContent = this._name;
    openPopup(previewImageModal);
  }
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImageEl.addEventListener("click", () => {
    modalImageEl.src = cardData.link;
    modalImageEl.alt = cardData.name;
    modalCaptionEl.textContent = cardData.name;
    openPopup(previewImageModal);
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}
// Event Listeners
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);
// Combine closing overlay and close buttons popup
const modals = document.querySelectorAll(".modal");
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
