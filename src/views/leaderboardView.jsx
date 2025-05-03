import React from "react";
import "../styles/leaderboard.css";

export function LeaderboardView({ leaderBoard }) {
    return (
        <div className="leaderboard-container">
            <h2>Leaderboard</h2>
            <table className="leaderboard-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderBoard?.length > 0 ? (
                        leaderBoard
                            .sort((a, b) => b.score - a.score)
                            .map((entry, index) => (
                                <tr key={entry.uid}>
                                    <td>{index + 1}</td>
                                    <td>{entry.name || entry.email || "Anonymous"}</td>
                                    <td>{entry.score}</td>
                                </tr>
                            ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="empty-message">No entries yet.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
