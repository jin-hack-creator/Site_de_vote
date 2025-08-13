const supabase = require('../config/supabase');
const paymentService = require('../services/payment.service');

// Get all participants with their rank
exports.getParticipants = async (req, res) => {
  try {
    const { data: participants, error } = await supabase
      .from('participants')
      .select('*')
      .order('votes', { ascending: false });

    if (error) throw error;

    const rankedParticipants = participants.map((participant, index) => ({
      ...participant,
      rank: index + 1,
    }));

    res.json(rankedParticipants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new participant
exports.createParticipant = async (req, res) => {
  const { name, photo, description } = req.body;

  try {
    const { data, error } = await supabase
      .from('participants')
      .insert([{ name, photo, description }])
      .select();

    if (error) throw error;

    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Initiate a vote for a participant
exports.initiateVote = async (req, res) => {
  const { participant_id } = req.params;
  const { voter_name, voter_firstname, voter_phone, amount, gateway } = req.body;

  try {
    // 1. Create a transaction in the database
    const { data: transaction, error: transactionError } = await supabase
      .from('transactions')
      .insert([
        {
          voter_name,
          voter_firstname,
          voter_phone,
          amount,
          participant_id,
          gateway,
        },
      ])
      .select();

    if (transactionError) throw transactionError;

    const newTransaction = transaction[0];

    // 2. Initiate payment with the chosen gateway
    const paymentResponse = await paymentService.initiatePayment({
      amount,
      gateway,
      transaction_id: newTransaction.id,
      voter_email: `${voter_phone}@vote.app`, // Lygos might need an email
      voter_phone,
    });

    // 3. Return the payment URL or other info to the client
    res.json(paymentResponse);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};