import React from "react";
import "../styles/auth.css";

export function ProfileView({ user, totalGuesses, streak, averageGuesses, totalWins, totalLosses, winRate, guessesPerWin }) {
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
        <div className="card shadow p-4 rounded-3" style={{ maxWidth: "500px", margin: "2rem auto" }}>
            <h2 className="text-center mb-4">Profile</h2>

            <div className="mb-3 d-flex justify-content-between">
                <strong>Email:</strong>
                <span>{user.email}</span>
            </div>

            {/*<div className="mb-3 d-flex justify-content-between">
                <strong>User ID:</strong>
                <span style={{ wordBreak: "break-all" }}>{user.uid}</span>
            </div>*/}

            <hr />

            <div className="mb-2 d-flex justify-content-between">
                <strong>Total Win Rate</strong>
                <span>{`${winRate}%`}</span>
            </div>

            <div className="mb-2 d-flex justify-content-between">
                <strong>Guesses Per Win</strong>
                <span>{guessesPerWin}</span>
            </div>

            <hr />

            <div className="mb-2 d-flex justify-content-between">
                <strong>Total Guesses</strong>
                <span>{totalGuesses}</span>
            </div>
            <div className="mb-2 d-flex justify-content-between">
                <strong>Total Wins</strong>
                <span>{totalWins}</span>
            </div>
            <div className="mb-2 d-flex justify-content-between">
                <strong>Total Losses</strong>
                <span>{totalLosses}</span>
            </div>

        </div>

    );
}
