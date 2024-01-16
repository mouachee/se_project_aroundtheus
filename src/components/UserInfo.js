export default class UserInfo {
  constructor({ profileNameSelector, profileDescriptionSelector }) {
    this._profileNameEl = profileNameSelector;
    this._profileDescriptionEl = profileDescriptionSelector;
  }
  getUserInfo() {
    //method to get user information
    return {
      //an object to store user info // name/description that user type there
      userProfileName: this._profileNameEl.textContent,
      userProfileDescription: this._profileDescriptionEl.textContent,
    };
  }
  setUserInfo({ userProfileName, userProfileDescription }) {
    // method to update the user information on the page
    this._profileNameEl.textContent = userProfileName;
    this._profileDescriptionEl.textContent = userProfileDescription;
  }
}
