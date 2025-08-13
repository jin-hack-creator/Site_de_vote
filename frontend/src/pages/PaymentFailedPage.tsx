import React from 'react';
import { Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PaymentFailedPage = () => {
  return (
    <Container className="text-center py-5">
      <Alert variant="danger">
        <Alert.Heading>Le paiement a échoué</Alert.Heading>
        <p>
          Nous n'avons pas pu traiter votre paiement. Aucuns frais n'ont été débités. Veuillez réessayer.
        </p>
      </Alert>
      <Link to="/" className="btn btn-primary">Retour à la page d'accueil</Link>
    </Container>
  );
};

export default PaymentFailedPage;
