const axios = require('axios');
require('dotenv').config();

const initiatePayment = async (options) => {
  const { gateway, amount, transaction_id, voter_email, voter_phone } = options;

  console.log(`Initiating payment of ${amount} via ${gateway} for transaction ${transaction_id}`);

  switch (gateway) {
    case 'lygos':
      try {
        const response = await axios.post('https://api.lygosapp.com/v1/gateway', 
          {
            amount,
            currency: 'XOF', // Assuming CFA Franc
            transaction_id: transaction_id,
            customer_email: voter_email,
            customer_phone: voter_phone,
            redirect_url: 'http://localhost:3000/payment-callback' // Placeholder URL
          },
          {
            headers: {
              'api-key': process.env.LYGOS_API_KEY,
            }
          }
        );

        return {
          success: true,
          message: 'Lygos payment initiated',
          payment_url: response.data.checkout_url, // Assuming the response has a checkout_url
          gateway_transaction_id: response.data.transaction_id // Assuming the response has a transaction_id
        };

      } catch (error) {
        console.error('Lygos API Error:', error.response.data);
        throw new Error('Failed to initiate Lygos payment');
      }

    case 'yabetootplay':
      // TODO: Implement YabeTootPlay payment initiation logic here
      return {
        success: true,
        message: 'YabeTootPlay payment initiated (simulation)',
        payment_url: `https://yabetootplay.com/pay?transaction_id=${transaction_id}`,
        gateway_transaction_id: `yabe2_${transaction_id}`
      };

    default:
      throw new Error('Invalid payment gateway');
  }
};

module.exports = {
  initiatePayment,
};
