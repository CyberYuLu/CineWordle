import React, { useState } from "react";
import '../styles/auth.css';

export function LoginView({ signIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    async function handleSubmitACB(e) {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
        setLoading(true);

        try {
            await signIn(email, password);
            setSuccessMessage('Sign in successful!');
        } catch (error) {
            setErrorMessage(`Sign in failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmitACB} className="auth-form">
                <h2>Login</h2>
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
                    {loading ? 'Signing in...' : 'Sign In'}
                </button>
                <hr/>
                <p>Don't have an account? <a href="#/register">Sign up</a></p>
            </form>
        </div>
    );
}
