import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchUpcomingPaymentsForTenant = async (token: string) => {
    try{
        const response = await axios.get(`${BACKEND_URL}/api/payments/upcoming/tenant`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        console.log(response.data);
        return response.data;
    }catch(error: any){
        throw new Error(error.response?.data?.message || 'Failed to fetch the Upcoming Payments for Tenant');
    }
}

export const fetchPaymentHistoryForTenant = async (token: string) => {
    try{
        const response = await axios.get(`${BACKEND_URL}/api/payments/history/tenant`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        console.log(response.data);
        return response.data;
    }catch(error: any){
        throw new Error(error.response?.data?.message || 'Failed to fetch the Payment History for Tenant');
    }
}