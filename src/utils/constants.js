export const initialCards = [
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

export const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

export const cardSelector = "#card-template";

export const validationSettings = {
  inputSelector: ".form__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

/**
 * =================================================
 *                profile elements
 * =================================================
 */
export const profileEditModal = document.getElementById("profile__edit-modal");
export const profileEditButton = document.getElementById(
  "profile__edit-button"
);
export const profileCloseButton = document.getElementById(
  "profile-close-button"
);
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
export const profileEditForm = document.forms["profile-edit-form"];

/**
 * =================================================
 *                Add cards elements
 * =================================================
 */
export const addCardModal = document.getElementById("add-card-modal");
export const addCardForm = document.forms["add-card-form"];
export const cardTitleInput = addCardForm.querySelector(
  "#add-card-title-input"
);
export const cardUrlInput = addCardForm.querySelector("#add-card-url-input");
export const addCardButton = document.querySelector("#add__card-button");
export const addCardCloseButton = document.getElementById(
  "add-card-close-button"
);

/**
 * =================================================
 *                preview Images
 * =================================================
 */
export const previewImageModal = document.getElementById("preview-image-modal");
export const previewImageCloseButton = document.getElementById(
  "preview-image-close-button"
);
export const cardListEl = document.querySelector(".cards__list");
export const modalImageEl = previewImageModal.querySelector(
  ".modal__popup-image"
);
export const modalCaptionEl = previewImageModal.querySelector(
  ".modal__popup-caption"
);
export const modals = document.querySelectorAll(".modal");
