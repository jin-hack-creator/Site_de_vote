import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ParticipantCard from '../components/ParticipantCard';
import VoteModal from '../components/VoteModal';
import { getParticipants } from '../services/api';
import { Participant } from '../types/participant';

const CandidatesPage = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedParticipantId, setSelectedParticipantId] = useState<string | null>(null);

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

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

  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const listItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="candidates-section py-5">
        <Container>
          <h1 className="text-center mb-5">Les Candidats</h1>
          {loading && (
            <div className="text-center py-5">
              <Spinner animation="border" role="status" style={{ width: '3rem', height: '3rem' }}>
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
          {error && <Alert variant="danger">{error}</Alert>}
          {!loading && !error && (
            <Row
              ref={ref}
              as={motion.div}
              variants={listContainerVariants}
              initial="hidden"
              animate={controls}
              xs={1}
              md={2}
              lg={3}
              className="g-4"
            >
              {participants.map((participant) => (
                <Col as={motion.div} variants={listItemVariants} key={participant._id}>
                  <ParticipantCard
                    participant={participant}
                    onVote={handleVoteClick}
                  />
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </div>

      <VoteModal
        show={showModal}
        onHide={handleModalHide}
        participantId={selectedParticipantId}
      />
    </>
  );
};

export default CandidatesPage;
