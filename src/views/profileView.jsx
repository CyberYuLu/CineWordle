import React from "react";
import "../styles/auth.css"; 

export function ProfileView({ user }) {
    if (!user) {
        return (
            <div className="auth-container">
                <div className="auth-form">
                    <p>You are not signed in.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Profile</h2>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" value={user.email} readOnly disabled/>
                </div>
                {/* More info here... */}
            </div>
        </div>
    );
}
