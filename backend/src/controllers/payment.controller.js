const supabase = require('../config/supabase');

const handlePaymentCallback = async (req, res) => {
  const { gateway } = req.params;
  const callbackData = req.body;

  console.log(`Received callback from ${gateway}:`, callbackData);

  try {
    // TODO: Implement the logic to verify the callback from the payment gateway.
    // This will involve checking a signature or making a request back to the gateway.

    // For now, we'll assume the payment is successful if the callback is received.
    const isPaymentSuccessful = true; // Simulation

    const { transaction_id, status } = parseGatewayCallback(gateway, callbackData);

    if (isPaymentSuccessful && status === 'success') {
      // 1. Update the transaction status in the database
      const { data: updatedTransaction, error: updateError } = await supabase
        .from('transactions')
        .update({ payment_status: 'success', gateway_transaction_id: transaction_id })
        .eq('id', callbackData.transaction_id) // Assuming the gateway sends back our internal transaction ID
        .select();

      if (updateError) throw updateError;

      // 2. Increment the vote count for the participant
      const participant_id = updatedTransaction[0].participant_id;
      const { data: participant, error: participantError } = await supabase
        .rpc('increment_votes', { participant_id_in: participant_id, vote_count: 1 }); // Assuming 1 vote per transaction for now

      if (participantError) throw participantError;

    }

    res.status(200).send('Callback received');

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Helper function to parse data from different gateways
const parseGatewayCallback = (gateway, data) => {
  // TODO: Implement the actual parsing logic based on the gateway's documentation
  switch (gateway) {
    case 'lygos':
      return {
        transaction_id: data.transaction_id,
        status: data.status === 'completed' ? 'success' : 'failed',
      };
    case 'yabe2pay':
      return {
        transaction_id: data.tx_ref,
        status: data.status === 'successful' ? 'success' : 'failed',
      };
    default:
      return {};
  }
}

// We also need a function in Supabase to increment votes atomically
// Go to SQL Editor and run:
/*
CREATE OR REPLACE FUNCTION increment_votes (participant_id_in UUID, vote_count INT)
RETURNS void AS $$
BEGIN
  UPDATE participants
  SET votes = votes + vote_count
  WHERE id = participant_id_in;
END;
$$ LANGUAGE plpgsql;
*/

module.exports = {
  handlePaymentCallback,
};
