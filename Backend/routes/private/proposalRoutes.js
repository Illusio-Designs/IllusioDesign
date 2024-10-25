const express = require('express');
const router = express.Router();
const proposalController = require('../../controller/private/proposalController');
const authenticate = require('../../middleware/auth');

// Define routes with authentication middleware
router.post('/', authenticate, proposalController.createProposal);                 // Create proposal
router.get('/', authenticate, proposalController.getAllProposals);                 // Get all proposals
router.put('/:id/status', authenticate, proposalController.updateProposalStatus);  // Update proposal status
router.post('/:id/transfer', authenticate, proposalController.transferToContract);
router.delete('/:id', authenticate, proposalController.deleteProposal); // Transfer to contract

module.exports = router;
