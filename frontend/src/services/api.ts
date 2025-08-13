import { Participant } from '../types/participant';

const API_BASE_URL = 'http://localhost:5000/api';

export interface VoteData {
  voter_name: string;
  voter_firstname: string;
  voter_phone: string;
  amount: number;
  gateway: 'lygos' | 'yabe2pay';
}

export interface PaymentInfo {
  payment_url?: string;
  // Add any other properties the backend might return
}

// Function to fetch all participants
export const getParticipants = async (): Promise<Participant[]> => {
  const response = await fetch(`${API_BASE_URL}/participants`);
  if (!response.ok) {
    throw new Error('Failed to fetch participants');
  }
  const participants = await response.json();
  return participants;
};

// Function to initiate a vote and get payment URL
export const initiateVote = async (participantId: string, voteData: VoteData): Promise<PaymentInfo> => {
  const response = await fetch(`${API_BASE_URL}/participants/${participantId}/vote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(voteData),
  });

  if (!response.ok) {
    // Try to parse error response from the backend
    const errorInfo = await response.json().catch(() => null);
    console.error('Error initiating payment:', errorInfo);
    throw new Error(errorInfo?.message || 'Failed to initiate vote');
  }

  const paymentInfo = await response.json();
  return paymentInfo;
};
