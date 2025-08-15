import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CandidatesPage from './pages/CandidatesPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import PaymentFailedPage from './pages/PaymentFailedPage';
import RegulationPage from './pages/RegulationPage';
import ContactPage from './pages/ContactPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="candidats" element={<CandidatesPage />} />
          <Route path="reglement" element={<RegulationPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="payment-failed" element={<PaymentFailedPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
