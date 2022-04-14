class TokenService {
  key: string;

  constructor() {
    this.key = 'AUTH_TOKEN_KEY';
  }

  get item() {
    return localStorage.getItem(this.key) || null;
  }

  set item(value) {
    if (value) {
      localStorage.setItem(this.key, value);
    }
  }

  setLocalToken(value) {
    this.item = value;
  }

  getLocalAccessToken(): string | null {
    if (!this.item) {
      return null;
    }
    return this.item;
  }
}
export default new TokenService();
