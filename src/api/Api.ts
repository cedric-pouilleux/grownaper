import axios from 'axios';

const Api = axios.create({
  baseURL: `${process.env.BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default Api;
