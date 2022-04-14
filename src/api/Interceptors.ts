import Api from './Api';
import TokenService from './Token';

const setup = (store) => {
  /**
   * Set bearer
   */
  Api.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      console.log(config);
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
      console.log(err);
      /*
      const originalConfig = err.config;
      if (originalConfig.url !== '/auth/signin' && err.response) {
        if (err.response.status === 401 && !originalConfig._retry) {
          console.log('need refresh token');
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
          }
        }
      } */
      return Promise.reject(err);
    },
  );
};

export default setup;
