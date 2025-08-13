import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import ParticipantCard from '../components/ParticipantCard';
import VoteModal from '../components/VoteModal';
import { getParticipants } from '../services/api';
import { Participant } from '../types/participant';

const HomePage = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedParticipantId, setSelectedParticipantId] = useState<string | null>(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        setLoading(true);
        const data = await getParticipants();
        setParticipants(data);
      } catch (err) {
        setError('Impossible de charger les participants. Veuillez réessayer plus tard.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, []);

  const handleVoteClick = (participantId: string) => {
    setSelectedParticipantId(participantId);
    setShowModal(true);
  };

  const handleModalHide = () => {
    setShowModal(false);
    setSelectedParticipantId(null);
  };

  return (
    <Container className="py-4">
      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && (
        <Row xs={1} md={2} lg={3} className="g-4">
          {participants.map((participant, index) => (
            <Col key={participant._id} className="fade-in-card" style={{ animationDelay: `${index * 100}ms` }}>
              <ParticipantCard participant={participant} onVote={handleVoteClick} />
            </Col>
          ))}
        </Row>
      )}

      <VoteModal
        show={showModal}
        onHide={handleModalHide}
        participantId={selectedParticipantId}
      />
    </Container>
  );
};

export default HomePage;
