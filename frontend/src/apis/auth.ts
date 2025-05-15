import axios from 'axios';
import type { RegisterData } from '../types/auth';

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