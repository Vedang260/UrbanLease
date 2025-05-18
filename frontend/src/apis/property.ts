import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchProperties = async (token: string) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/properties`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
};

export const fetchPropertyRequests = async (token: string) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/properties/requests`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch the properties requests');
    }
};

export const fetchPropertyDetails = async (propertyId: string, token: string) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/properties/${propertyId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch the property details');
    }
};

export const approveProperty = async (propertyId: string, token: string) => {
    try {
      const response = await axios.put(`${BACKEND_URL}/api/properties/approve/${propertyId}`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to approve the property');
    }
};