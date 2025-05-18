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

export const getOwnerProperties = async (token: string) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/properties/owner`, {
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

export const uploadPropertyImages = async (images: File[], token: string) => {
  try {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append('image', image); // must match 'files' in FilesInterceptor('files')
      });
      const response = await axios.post(`${BACKEND_URL}/api/properties/upload-image`,  formData , {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to approve the property');
  }
}