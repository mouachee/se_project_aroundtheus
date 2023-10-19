// Declarations //
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

console.log(initialCards);

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
// Modals
const profileEditModal = document.getElementById("profile__edit-modal");
const previewImageModal = document.getElementById("preview-image-modal");
const addCardModal = document.getElementById("add-card-modal");

// buttons and other DOM elements
const profileEditButton = document.getElementById("profile__edit-button");
const modalCloseButton = document.getElementById("modal__close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const previewImageCloseButton = document.getElementById(
  "preview-image-close-button"
);

// add new cards //
const addCardButton = document.querySelector(".profile__add-button");
const addCardCloseButton = document.getElementById("add-card-close-button");
const profileAddCardForm = document.forms["profile-add-form"];
// form data
const profileTitleInput = document.querySelector("#profile__title_input");
const profileDescriptionInput = document.querySelector(
  "#profile__description_input"
);
const cardTitleInput = profileAddCardForm.querySelector(
  "#add-card-title-input"
);
const cardUrlInput = profileAddCardForm.querySelector("#add-card-url-input");

const profileEditForm = document.forms["profile-edit-form"];
const cardListEl = document.querySelector(".cards__list");

// function//
function closePopup() {
  profileEditModal.classList.remove("modal_opened");
}
function closeAddCard() {
  addCardModal.classList.remove("modal_opened");
}
function closePreviewImage() {
  previewImageModal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  cardImageEl.addEventListener("click", () => {
    const modalImageEl = previewImageModal.querySelector(".modal__popup-image");
    const modalCaptionEl = previewImageModal.querySelector(
      ".modal__popup-caption"
    );
    modalImageEl.src = cardData.link;
    modalCaptionEl.textContent = cardData.name;
    previewImageModal.classList.add("modal_opened");
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
previewImageCloseButton.addEventListener("click", closePreviewImage);
function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup();
}
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closeAddCard();
}
// form listeners//
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
});

modalCloseButton.addEventListener("click", closePopup);
// form submit
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
profileAddCardForm.addEventListener("submit", handleAddCardSubmit);
initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

addCardButton.addEventListener("click", () => {
  addCardModal.classList.add("modal_opened");
});
addCardCloseButton.addEventListener("click", closeAddCard);
const likeButtons = document.querySelectorAll(".card__like-button");
likeButtons.forEach((likeButton) => {});
