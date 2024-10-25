const { Proposal } = require('../../models');
const fs = require('fs');
const path = require('path');
const generateProposalPDF = require('../../utils/generateProposalPDF');

exports.createProposal = async (req, res) => {
    try {
        const { typeOfWork, duration, price, clientName, address } = req.body;

        const proposal = await Proposal.create({
            typeOfWork,
            duration,
            price,
            clientName,
            address,
            status: 'pending'
        });

        // Prepare the path for saving the PDF
        const pdfDirectory = path.join(__dirname, '../pdfs'); // Adjust the path as needed
        const filePath = path.join(pdfDirectory, `proposal_${proposal.id}.pdf`);

        // Check if the directory exists, if not, create it
        if (!fs.existsSync(pdfDirectory)) {
            fs.mkdirSync(pdfDirectory, { recursive: true }); // Create directory recursively
        }

        // Generate PDF
        await generateProposalPDF(proposal, filePath);

        res.status(201).json({ proposal, pdfPath: filePath });
    } catch (error) {
        console.error("Error creating proposal:", error);
        res.status(500).json({ error: 'Error creating proposal' });
    }
};



// Get all proposals
exports.getAllProposals = async (req, res) => {
    try {
        const proposals = await Proposal.findAll();
        res.json(proposals);
    } catch (error) {
        console.error("Error fetching proposals:", error);
        res.status(500).json({ error: 'Error fetching proposals' });
    }
};

// Update proposal status
exports.updateProposalStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    // Check if the status is a valid ENUM value
    if (!['pending', 'approved', 'rejected'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status value' });
    }

    try {
        const proposal = await Proposal.findByPk(id);
        
        if (proposal) {
            proposal.status = status;
            await proposal.save();
            res.json(proposal);
        } else {
            res.status(404).json({ error: "Proposal not found" });
        }
    } catch (error) {
        console.error("Error updating proposal status:", error);
        res.status(500).json({ error: 'Error updating proposal status' });
    }
};

// Transfer an approved proposal to a contract
exports.transferToContract = async (req, res) => {
    const { id } = req.params;

    try {
        const proposal = await Proposal.findByPk(id);
        
        if (!proposal) {
            return res.status(404).json({ error: "Proposal not found" });
        }

        if (proposal.status !== 'approved') {
            return res.status(400).json({ error: "Only approved proposals can be transferred to a contract" });
        }

        // Create contract based on proposal details (this assumes you have a Contract model set up)
        const contract = await Contract.create({
            typeOfWork: proposal.typeOfWork,
            duration: proposal.duration,
            price: proposal.price,
            clientName: proposal.clientName,
            address: proposal.address,
            proposalId: proposal.id, // Linking to proposal
            // Add additional contract-specific fields if needed
        });

        res.status(201).json(contract);
    } catch (error) {
        console.error("Error transferring to contract:", error);
        res.status(500).json({ error: 'Error transferring proposal to contract' });
    }
};

exports.deleteProposal = async (req, res) => {
    const { id } = req.params;

    try {
        const proposal = await Proposal.findByPk(id);

        if (!proposal) {
            return res.status(404).json({ error: "Proposal not found" });
        }

        await proposal.destroy();
        res.status(200).json({ message: "Proposal deleted successfully" });
    } catch (error) {
        console.error("Error deleting proposal:", error);
        res.status(500).json({ error: 'Error deleting proposal' });
    }
};