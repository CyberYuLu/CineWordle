import "../styles/leaderboard.css";

export function LeaderboardView({ entries }) {
    return (
        <div className="leaderboard-container">
            <h2>Leaderboard</h2>
            <table className="leaderboard-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User</th>
                        <th>Guesses</th>
                    </tr>
                </thead>
      <tbody>
        {entries.length
          ? entries.map((e,i) => (
              <tr key={e.uid}>
                <td>{i+1}</td>
                <td>{e.name}</td>
                <td>{e.score}</td>
              </tr>
            ))
          : <tr><td colSpan={3}>No entries yet.</td></tr>}
      </tbody>
            </table>
        </div>
    );
}
