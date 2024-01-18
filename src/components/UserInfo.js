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
  } // method to update the user information on the page
  setUserInfo({ title, description }) {
    //use the name attribute to access the value
    this._profileNameEl.textContent = title;
    this._profileDescriptionEl.textContent = description;
  }
}
