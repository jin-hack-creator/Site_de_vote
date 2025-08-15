import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Participant } from '../types/participant';

interface ParticipantCardProps {
  participant: Participant;
  onVote: (participantId: string) => void;
}

const ParticipantCard: React.FC<ParticipantCardProps> = ({ participant, onVote }) => {
  return (
    <Card className="h-100 border-0 participant-card-glass">
      <div className="card-img-container">
        <Card.Img
          variant="top"
          src={participant.photo}
          alt={`Photo de ${participant.name}`}
          className="participant-photo"
        />
        <Badge bg="primary" pill className="rank-badge">
          Rang #{participant.rank}
        </Badge>
      </div>
      <Card.Body className="d-flex flex-column p-4">
        <Card.Title as="h4" className="fw-bold mb-2 card-title">{participant.name}</Card.Title>
        <Card.Text className="card-text mb-4">{participant.description}</Card.Text>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-bold fs-5">{participant.votes.toLocaleString()} Votes</span>
            <Button
              className="btn-vote"
              onClick={() => onVote(participant._id)}
            >
              Voter
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ParticipantCard;
