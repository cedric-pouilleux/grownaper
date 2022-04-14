import Api from './Api';
import TokenService from './Token';

const setup = (store) => {
  /**
   * Set bearer
   */
  Api.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      if (token) {
        if (config.headers?.Authorization) {
          // eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  /**
   * Refresh Bearer
   */
  Api.interceptors.response.use(
    (res) => res,
    async (err) => {
      const originalConfig = err.config;
      if (originalConfig.url !== '/auth/signin' && err.response) {
        // If not authorized, refresh token
        if (err.response.status === 401 && !originalConfig._retry) {
          console.log('need refresh token');
          /*
          originalConfig._retry = true;
          try {
            const rs = await Api.post('/auth/refreshtoken', {
              refreshToken: TokenService.getLocalRefreshToken(),
            });
            const { accessToken } = rs.data;
            store.dispatch('auth/refreshToken', accessToken);
            TokenService.updateLocalAccessToken(accessToken);
            return Api(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          } */
        }
      }
      return Promise.reject(err);
    },
  );
};

export default setup;
