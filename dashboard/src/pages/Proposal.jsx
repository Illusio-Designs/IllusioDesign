import React, { useEffect, useState } from 'react';
import { getAllProposals, createProposal, deleteProposal, updateProposalStatus } from '../services/proposalApi';
import DOMPurify from 'dompurify';

const Proposal = () => {
    const [proposals, setProposals] = useState([]);
    const [newProposal, setNewProposal] = useState({
        typeOfWork: 'Design',
        duration: '',
        price: '',
        clientName: '',
        address: '',
        status: 'pending'
    });
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editProposalId, setEditProposalId] = useState(null);

    // Fetch proposals when the component mounts
    useEffect(() => {
        const fetchProposals = async () => {
            try {
                const response = await getAllProposals();
                setProposals(response);
            } catch (error) {
                console.error('Error fetching proposals:', error);
            }
        };

        fetchProposals();
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProposal((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            let response;
            if (isEditing) {
                await updateProposalStatus(editProposalId, newProposal.status);
                response = await getAllProposals(); // Refresh the proposals after edit
                setIsEditing(false);
            } else {
                response = await createProposal(newProposal);
                // Assuming createProposal returns the newly created proposal including the pdfPath
                setProposals((prev) => [...prev, response.proposal]);
                alert(`Proposal created! Download it here: ${response.pdfPath}`); // Alert or provide a direct link
            }

            // Reset the form
            setNewProposal({
                typeOfWork: 'Design',
                duration: '',
                price: '',
                clientName: '',
                address: '',
                status: 'pending'
            });
            setShowForm(false);
        } catch (error) {
            console.error('Error submitting proposal:', error);
        }
    };

    // Handle edit button click
    const handleEdit = (proposal) => {
        setIsEditing(true);
        setEditProposalId(proposal.id);
        setNewProposal({
            typeOfWork: proposal.typeOfWork,
            duration: proposal.duration,
            price: proposal.price,
            clientName: proposal.clientName,
            address: proposal.address,
            status: proposal.status
        });
        setShowForm(true);
    };

    // Handle delete button click
    const handleDelete = async (proposalId) => {
        try {
            await deleteProposal(proposalId);
            setProposals((prev) => prev.filter((proposal) => proposal.id !== proposalId));
        } catch (error) {
            console.error('Error deleting proposal:', error);
        }
    };

    return (
        <div>
            <h1>Proposal Management</h1>
            <button onClick={() => setShowForm(true)}>Add New Proposal</button>

            {showForm && (
                <form onSubmit={handleSubmit}>
                    <select name="typeOfWork" value={newProposal.typeOfWork} onChange={handleInputChange} required>
                        <option value="Design">Design</option>
                        <option value="Development">Development</option>
                        <option value="Marketing">Marketing</option>
                    </select>
                    <input
                        type="text"
                        name="duration"
                        placeholder="Duration"
                        value={newProposal.duration}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={newProposal.price}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="clientName"
                        placeholder="Client Name"
                        value={newProposal.clientName}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={newProposal.address}
                        onChange={handleInputChange}
                        required
                    />
                    <select name="status" value={newProposal.status} onChange={handleInputChange} required>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                    <button type="submit">{isEditing ? 'Update' : 'Create'} Proposal</button>
                </form>
            )}

            {/* Proposal List */}
            <ul>
                {proposals.map((proposal) => (
                    <li key={proposal.id}>
                        <h2>{proposal.clientName}</h2>
                        <p>Type of Work: {proposal.typeOfWork}</p>
                        <p>Duration: {proposal.duration}</p>
                        <p>Price: ${proposal.price}</p>
                        <p>Status: {proposal.status}</p>
                        {/* Add a download link if PDF path exists */}
                        {proposal.pdfPath && (
                            <a href={proposal.pdfPath} target="_blank" rel="noopener noreferrer">Download Proposal PDF</a>
                        )}
                        <button onClick={() => handleEdit(proposal)}>Edit</button>
                        <button onClick={() => handleDelete(proposal.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Proposal;
