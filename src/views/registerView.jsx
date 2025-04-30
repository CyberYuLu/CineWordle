import React, { useState } from 'react';
import '../styles/auth.css';

export function RegisterView({ register }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    async function handleSubmitACB(e) {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            await register(email, password);
            setSuccessMessage('Registration successful!');
        } catch (error) {
            setErrorMessage(`Registration failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        
        <div className="auth-container">
            <form onSubmit={handleSubmitACB} className="auth-form">
                <h2>Register</h2>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {errorMessage && <div className="error-message">{errorMessage}</div>}
                {successMessage && <div className="success-message">{successMessage}</div>}

                <button className="auth-button" type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
                <hr/>
                <p>Already have an account? <a href="#/login">Login</a></p>
            </form>
        </div>
    );
}
