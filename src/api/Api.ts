import axios from 'axios';

const Api = axios.create({
  baseURL: `${process.env.VUE_APP_SERVER_ADDRESS}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default Api;
