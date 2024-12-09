export interface Registration {
  id: string;
  eventId: string;
  name: string;
  email: string;
  phone: string;
  requirements: string;
  timestamp: string;
  paymentStatus: 'pending' | 'completed';
  paymentAmount: number;
  transactionId?: string;
  paymentProofUrl?: string; // Base64 string of the uploaded image
  paymentSubmittedAt?: string;
}
