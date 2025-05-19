export interface Payment {
  paymentId: string;
  tenantId: string;
  agreementId: number;
  transactionId: string | null;
  amount: string;
  status: 'pending' | 'paid' | 'failed';
  paymentMethod: string;
  paidDate: string | null;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}