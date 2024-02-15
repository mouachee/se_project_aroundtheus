export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  }

  getCardList() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    })
      .then(this.checkResponse)
      .catch((err) => {
        console.error(err);
      });
  }
  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
      .then(this.checkResponse)
      .catch((err) => {
        console.error(err);
      });
  }
  updateUserInfo() {}
  updateAvatar() {}
  createCard(name, link) {
    fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then(this.checkResponse)
      .catch((err) => {
        console.error(err);
      });
  }
  deleteCard() {}
  likeCard() {}
  dislikeCard() {}
}
