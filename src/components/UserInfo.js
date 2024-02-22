export default class UserInfo {
  constructor({
    profileNameSelector,
    profileDescriptionSelector,
    AvatarSelector,
  }) {
    this._profileNameEl = profileNameSelector;
    this._profileDescriptionEl = profileDescriptionSelector;
    this._profileAvatarEl = document.querySelector(AvatarSelector);
  }
  getUserInfo() {
    //method to get user information
    return {
      //an object to store user info // name/description that user type there
      userProfileName: this._profileNameEl.textContent,
      userProfileDescription: this._profileDescriptionEl.textContent,
    };
  } // method to update the user information on the page
  setUserInfo({ title, description }) {
    //use the name attribute to access the value
    this._profileNameEl.textContent = title;
    this._profileDescriptionEl.textContent = description;
  }
  setAvatarImage({ link }) {
    this._profileAvatarEl.src = link;
  }
}
