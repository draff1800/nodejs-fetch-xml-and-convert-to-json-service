import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://vpic.nhtsa.dot.gov/api/vehicles'
});

export default axiosInstance;
