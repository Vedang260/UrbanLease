export interface UpcomingPaymentTenant {
  paymentId: string;
  agreementId: number;
  amount: string;
  status: 'pending' | 'paid' | 'failed';
  paymentMethod: string;
  dueDate: string;
  propertyTitle: string;
}