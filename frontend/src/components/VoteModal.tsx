import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, InputGroup, Alert } from 'react-bootstrap';
import { initiateVote, VoteData } from '../services/api';

interface VoteModalProps {
  show: boolean;
  onHide: () => void;
  participantId: string | null;
}

const VOTE_COST = 225;

const VoteModal: React.FC<VoteModalProps> = ({ show, onHide, participantId }) => {
  const [numberOfVotes, setNumberOfVotes] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [gateway, setGateway] = useState<'lygos' | 'yabe2pay'>('lygos');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (show) {
      setNumberOfVotes(1);
      setFirstName('');
      setLastName('');
      setPhone('');
      setGateway('lygos');
      setError(null);
      setIsSubmitting(false);
    }
  }, [show, participantId]);

  const handleVoteSubmit = async () => {
    if (!participantId) return;

    const voteData: VoteData = {
      voter_name: lastName,
      voter_firstname: firstName,
      voter_phone: phone,
      amount: numberOfVotes * VOTE_COST,
      gateway: gateway,
    };

    if (!voteData.voter_firstname || !voteData.voter_name || !voteData.voter_phone) {
      setError("Veuillez remplir tous les champs d'information.");
      return;
    }
    if (numberOfVotes < 1) {
      setError('Le nombre de votes doit être au moins de 1.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const paymentInfo = await initiateVote(participantId, voteData);
      if (paymentInfo.payment_url) {
        window.location.href = paymentInfo.payment_url;
      } else {
        setError("Erreur lors de l'initiation du paiement: URL de paiement non reçue.");
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors de la soumission du vote.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Voter pour un participant</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <p>Chaque vote coûte <strong>{VOTE_COST} FCFA</strong>.</p>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Vos informations personnelles</Form.Label>
            <InputGroup className="mb-2">
              <InputGroup.Text>Nom</InputGroup.Text>
              <Form.Control type="text" placeholder="Votre nom de famille" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </InputGroup>
            <InputGroup className="mb-2">
              <InputGroup.Text>Prénom</InputGroup.Text>
              <Form.Control type="text" placeholder="Votre prénom" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </InputGroup>
            <InputGroup>
              <InputGroup.Text>Téléphone</InputGroup.Text>
              <Form.Control type="tel" placeholder="Votre numéro de téléphone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nombre de votes</Form.Label>
            <Form.Control
              type="number"
              value={numberOfVotes}
              onChange={(e) => setNumberOfVotes(Math.max(1, parseInt(e.target.value, 10) || 1))}
              min="1"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Moyen de paiement</Form.Label>
            <Form.Select value={gateway} onChange={(e) => setGateway(e.target.value as 'lygos' | 'yabe2pay')}>
              <option value="lygos">Lygos</option>
              <option value="yabe2pay">Yabe2Pay</option>
            </Form.Select>
          </Form.Group>

          <div className="d-grid">
            <Alert variant="info">
              <h5>Total à payer : <strong>{(numberOfVotes * VOTE_COST).toLocaleString()} FCFA</strong></h5>
            </Alert>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={isSubmitting}>
          Annuler
        </Button>
        <Button className="btn-primary-custom" onClick={handleVoteSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Initiation du paiement...' : `Payer et Voter`}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VoteModal;
