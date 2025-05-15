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
                            .sort((a,b) => a.score - b.score) // fewer guesses is “better”
                            .map((entry, i) => (
                                <tr key={entry.uid + entry.timestamp}>
                                <td>{i+1}</td>
                                <td>{entry.name}</td>
                                <td>{entry.score}</td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="3">No entries yet.</td></tr>
                        )}
                        </tbody>
            </table>
        </div>
    );
}
