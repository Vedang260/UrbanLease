import axios from 'axios';
import type { LoginData, RegisterData } from '../types/auth';
import { loginSuccess } from '../redux/slice/authSlice';
import { store } from '../redux/store/store';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const registerUser = async (data: RegisterData) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/register`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
};

export const loginUser = async (data: LoginData) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/login`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if(response.data.success){
          store.dispatch(loginSuccess({ user: response.data.user, token: response.data.token }));
      }
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
};