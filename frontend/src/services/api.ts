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

// --- MOCK DATA ---
const mockParticipants: Participant[] = [
  { _id: '1', name: 'Grace Mabiala', photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: 'Étudiante en art, sa créativité est sa plus grande force.', votes: 12500, rank: 1 },
  { _id: '2', name: 'Elodie Okemba', photo: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: 'Musicienne talentueuse, elle joue du piano depuis son enfance.', votes: 11200, rank: 2 },
  { _id: '3', name: 'Cynthia Nkouka', photo: 'https://images.pexels.com/photos/1848565/pexels-photo-1848565.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: 'Passionnée de danse, elle maîtrise les styles traditionnels et modernes.', votes: 9800, rank: 3 },
  { _id: '4', name: 'Brenda Massengo', photo: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: 'Poétesse engagée, ses mots touchent le cœur et l\'esprit.', votes: 8500, rank: 4 },
  { _id: '5', name: 'Axelle Ngoma', photo: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: 'Future ingénieure, elle veut construire le Congo de demain.', votes: 7600, rank: 5 },
  { _id: '6', name: 'Ornella Samba', photo: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: 'Sportive de haut niveau, elle rêve des Jeux Olympiques.', votes: 6400, rank: 6 },
];
// --- END MOCK DATA ---

// Function to fetch all participants
export const getParticipants = async (): Promise<Participant[]> => {
  console.log('%cMODE DÉMO: Données simulées activées.', 'color: #ffc107; font-weight: bold;');
  // Simulate network delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockParticipants);
    }, 1000);
  });

  /*
  // Original fetch call
  const response = await fetch(`${API_BASE_URL}/participants`);
  if (!response.ok) {
    throw new Error('Failed to fetch participants');
  }
  const participants = await response.json();
  return participants;
  */
};

// Function to initiate a vote and get payment URL
export const initiateVote = async (participantId: string, voteData: VoteData): Promise<PaymentInfo> => {
  console.log('Initiating vote (simulation)...', { participantId, voteData });
  // Simulate a successful payment initiation
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ payment_url: '#' }); // Returns a dummy URL
    }, 1500);
  });

  /*
  // Original fetch call
  const response = await fetch(`${API_BASE_URL}/participants/${participantId}/vote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(voteData),
  });

  if (!response.ok) {
    const errorInfo = await response.json().catch(() => null);
    console.error('Error initiating payment:', errorInfo);
    throw new Error(errorInfo?.message || 'Failed to initiate vote');
  }

  const paymentInfo = await response.json();
  return paymentInfo;
  */
};