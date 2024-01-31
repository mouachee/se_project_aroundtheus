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
      headers: this._headers,
    })
      .then(this.checkResponse)
      .catch((err) => {
        console.error(err);
      });
  }
  getUserInfo() {}
  updateUserInfo() {}
  updateAvatar() {}
  createCard() {}
  deleteCard() {}
  likeCard() {}
  dislikeCard() {}
}
