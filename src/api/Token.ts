class TokenService {
  key: string;

  constructor() {
    this.key = 'AUTH_TOKEN_KEY';
  }

  get item() {
    return localStorage.getItem(this.key) || null;
  }

  set item(value) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  getLocalRefreshToken(): string | null {
    if (!this.item) {
      return null;
    }
    const user = JSON.parse(this.item);
    return user?.refreshToken;
  }

  getLocalAccessToken(): string | null {
    if (!this.item) {
      return null;
    }
    const user = JSON.parse(this.item);
    return user?.accessToken;
  }

  updateLocalAccessToken(token): void {
    if (!this.item) {
      return;
    }
    const user = JSON.parse(this.item);
    user.accessToken = token;
    this.item = user;
  }

  getUser(): string | null {
    if (!this.item) {
      return null;
    }
    return JSON.parse(this.item);
  }

  setUser(user) {
    this.item = user;
  }

  // eslint-disable-next-line class-methods-use-this
  removeUser() {
    localStorage.removeItem(this.key);
  }
}
export default new TokenService();
