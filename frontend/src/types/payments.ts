export interface UpcomingPaymentTenant {
  paymentId: string;
  agreementId: number;
  amount: string;
  status: 'pending' | 'paid' | 'failed';
  paymentMethod: string;
  dueDate: string;
  propertyTitle: string;
}

export interface PaymentHistoryTenant extends UpcomingPaymentTenant{
  transactionId: string;
  paidDate: string;
}