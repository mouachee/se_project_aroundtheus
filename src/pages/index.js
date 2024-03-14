import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import {
  validationSettings,
  profileEditButton,
  profileTitle,
  profileDescription,
  profileTitleInput,
  profileDescriptionInput,
  profileEditForm,
  addCardForm,
  addCardButton,
  avatarForm,
  avatarButton,
} from "../utils/constants.js";

// API
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "beff3ef6-54fc-4029-9809-d6cc7f6fad90",
    "Content-Type": "application/json",
  },
});
let cardSection;
api
  .getCardList()
  .then((cards) => {
    cardSection = new Section(
      {
        items: cards, // start with initialCards
        renderer: (cardData) => cardSection.addItems(createCard(cardData)),
      }, // use the data to create a card
      ".cards__list" //refer to the (selector) in section class
    );
    cardSection.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

api
  .getProfileInfo()
  .then((userData) => {
    userInfo.setUserInfo({
      title: userData.name,
      description: userData.about,
    });
    userInfo.setAvatarImage({ avatar: userData.avatar });
  })
  .catch((err) => {
    console.error(err);
  });

// INSTANCE CLASS
const popupWithConfirm = new PopupWithConfirm("#delete-popup-modal");
popupWithConfirm.setEventListeners();

const addPopupForm = new PopupWithForm("#add-card-modal", handleAddCardSubmit);
addPopupForm.setEventListeners(); // call the event listeners from popupWithForm

const editPopupForm = new PopupWithForm(
  "#profile__edit-modal",
  handleProfileEditSubmit
);
editPopupForm.setEventListeners();

const avatarPopupForm = new PopupWithForm(
  "#update-avatar-modal",
  handleUpdatingAvatar
);
avatarPopupForm.setEventListeners();

const userInfo = new UserInfo({
  profileNameSelector: profileTitle,
  profileDescriptionSelector: profileDescription,
  avatarSelector: ".profile__avatar-image",
});
const popupWithImage = new PopupWithImage("#preview-image-modal");
popupWithImage.setEventListeners();

// FORM VALIDATION
const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
editFormValidator.enableValidation();
editFormValidator.resetValidation();

const addFormValidator = new FormValidator(validationSettings, addCardForm);
addFormValidator.enableValidation();

const avatarValidator = new FormValidator(validationSettings, avatarForm);
avatarValidator.enableValidation();

// FUNCTION HANDLERS
function handleUpdatingAvatar(inputValues) {
  avatarPopupForm.renderLoading(true);
  api
    .updateAvatar(inputValues)
    .then((data) => {
      userInfo.setAvatarImage({
        avatar: data.avatar,
      });
      avatarValidator.resetValidation();
      avatarPopupForm.close();
    })
    .catch((err) => {
      console.error("error updating profile image", err);
    })
    .finally(() => {
      avatarPopupForm.renderLoading(false);
    });
}

function handleProfileEditSubmit(inputValues) {
  editPopupForm.renderLoading(true);
  api
    .updateProfileInfo(inputValues)
    .then((userData) => {
      userInfo.setUserInfo({
        title: userData.name,
        description: userData.about,
      });
      editPopupForm.close();
    })
    .catch((err) => {
      console.error("error", err);
    })
    .finally(() => {
      editPopupForm.renderLoading(false);
    });
}

function handleAddCardSubmit(data) {
  addPopupForm.renderLoading(true);
  api
    .addCard({ name: data.title, link: data.url })
    .then((newCard) => {
      cardSection.addItems(createCard(newCard));
      addPopupForm.close();
      addFormValidator.toggleButtonState(); // disabled the button after adding a new card //
    })
    .catch((err) => {
      console.error("error add a new card", err);
    })
    .finally(() => {
      addPopupForm.renderLoading(false);
    });
}

function handleImageClick(cardData) {
  popupWithImage.open(cardData);
}

function handleDeleteClick(cardEl) {
  popupWithConfirm.open(cardEl);
  popupWithConfirm.setSubmitAction(() => {
    api
      .deleteCard(cardEl._id)
      .then(() => {
        cardEl.handleDelete();
        popupWithConfirm.close();
      })
      .catch((err) => {
        console.error("error deleting card", err);
      });
  });
}
function handleLikeImage(cardEl) {
  if (cardEl.isLiked) {
    return api
      .dislikeCard(cardEl._id)
      .then((res) => {
        cardEl.handleLike(res.isLiked);
      })
      .catch((err) => {
        console.error("Failed to like the card");
      });
  } else {
    return api
      .likeCard(cardEl._id)
      .then((res) => {
        cardEl.handleLike(res.isLiked);
      })
      .catch((err) => {
        console.error("Failed to dislike");
      });
  }
}
//FUNCTION TO RENDER CARD

function createCard(cardData) {
  const cardEl = new Card(
    cardData,
    "#card-template",
    () => handleImageClick(cardData),
    handleDeleteClick,
    handleLikeImage
  );
  return cardEl.getView();
}
// EVENT LISTENERS

profileEditButton.addEventListener("click", () => {
  const userInformation = userInfo.getUserInfo();
  profileTitleInput.value = userInformation.userProfileName;
  profileDescriptionInput.value = userInformation.userProfileDescription;
  editPopupForm.open();
});
addCardButton.addEventListener("click", () => {
  addPopupForm.open();
});
avatarButton.addEventListener("click", () => {
  avatarPopupForm.open();
});
//comment
