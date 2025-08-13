import React from 'react';
import { Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PaymentSuccessPage = () => {
  return (
    <Container className="text-center py-5">
      <Alert variant="success">
        <Alert.Heading>Paiement validé !</Alert.Heading>
        <p>
          Merci, votre paiement a été traité avec succès et vos votes ont été comptabilisés.
        </p>
      </Alert>
      <Link to="/" className="btn btn-primary">Retour à la page d'accueil</Link>
    </Container>
  );
};

export default PaymentSuccessPage;
