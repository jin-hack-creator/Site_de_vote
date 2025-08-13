const express = require('express');
const router = express.Router();
const participantController = require('../controllers/participant.controller');

// @route   GET api/participants
// @desc    Get all participants
// @access  Public
router.get('/', participantController.getParticipants);

// @route   POST api/participants
// @desc    Create a participant
// @access  Private (for admin)
router.post('/', participantController.createParticipant);

// @route   POST api/participants/:id/vote
// @desc    Vote for a participant
// @access  Public
router.post('/:participant_id/vote', participantController.initiateVote);

module.exports = router;
