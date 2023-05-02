import axios, { AxiosInstance } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.BASE_URL
});

export default axiosInstance;
