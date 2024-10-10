import React, { useState } from 'react';

const Referral = () => {
    const [referrerEmail, setReferrerEmail] = useState('');
    const [friendEmail, setFriendEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        // Simple validation
        if (!referrerEmail || !friendEmail) {
            setError('Both email fields are required.');
            return;
        }

        // Simulate a successful referral
        setMessage(`Referral sent from ${referrerEmail} to ${friendEmail}!`);
        // Reset form fields
        setReferrerEmail('');
        setFriendEmail('');
    };

    return (
        <div>
            <h2>Referral</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Your Email:</label>
                    <input type="email" value={referrerEmail} onChange={(e) => setReferrerEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Friend's Email:</label>
                    <input type="email" value={friendEmail} onChange={(e) => setFriendEmail(e.target.value)} required />
                </div>
                <button type="submit">Send Referral</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {message && <p style={{ color: 'green' }}>{message}</p>}
            </form>
        </div>
    );
};

export default Referral;
