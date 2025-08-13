import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import PaymentFailedPage from './pages/PaymentFailedPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="payment-failed" element={<PaymentFailedPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
