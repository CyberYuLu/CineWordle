import React from "react";

export function TutorialContent() {
  return (
    <div className="text-start">
      <p>Guess the movie in 7 tries.</p>
      <ul>
        <li>Each guess must be a real movie title.</li>
        <li>
          Tiles will change color to show how close the guess is to the correct movie.
        </li>
      </ul>

      <hr />

      <p><strong>Color Patch Meaning:</strong></p>
      <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "8px" }}>
        <span style={{ backgroundColor: "green", color: "white", padding: "6px 10px", borderRadius: "4px" }}>
          ✅ Correct name
        </span>
      </div>
      <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "8px" }}>
        <span style={{ backgroundColor: "yellow", color: "black", padding: "6px 10px", borderRadius: "4px" }}>
          🟡 Correct year, but not correct movie
        </span>
      </div>
      <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "8px" }}>
        <span style={{ backgroundColor: "red", color: "white", padding: "6px 10px", borderRadius: "4px" }}>
          ⬛ Not in the target movie
        </span>
      </div>

      <p className="mt-3">🎬 Good luck and have fun!</p>
    </div>
  );
}
