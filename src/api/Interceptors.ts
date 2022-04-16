import Api from './Api';
import TokenService from './Token';

const setup = (store) => {
  /**
   * Set bearer
   */
  Api.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      if (token && config.headers) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  /**
   * TODO => Refresh Bearer
   */
  Api.interceptors.response.use(
    (res) => res,
    async (err) => {
      if (err.response.status === 401 && !err.config._retry) {
        TokenService.removeToken();
      }
      return Promise.reject(err);
    },
  );
};

export default setup;
