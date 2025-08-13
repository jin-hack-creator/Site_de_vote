import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Participant } from '../types/participant';
import ParticipantAvatar from './ParticipantAvatar';

interface ParticipantCardProps {
  participant: Participant;
  onVote: (participantId: string) => void;
}

const ParticipantCard: React.FC<ParticipantCardProps> = ({ participant, onVote }) => {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
        {participant.name}
        <Badge bg="primary" pill>
          Rang #{participant.rank}
        </Badge>
      </Card.Header>
      <div style={{ height: '300px', overflow: 'hidden' }}>
        <ParticipantAvatar name={participant.name} />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Text>{participant.description}</Card.Text>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="fw-bold fs-5">{participant.votes.toLocaleString()} Votes</span>
            <Button className="btn-primary-custom" onClick={() => onVote(participant._id)}>
              Voter
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ParticipantCard;
