import React from "react";

export default function TutorialView() {
  return (
    <>
      <div
        className="modal fade"
        id="howToPlayModal"
        tabIndex="-1"
        aria-labelledby="howToPlayLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="howToPlayLabel">
                How To Play
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-start">
              <p>Guess the movie in 5 tries.</p>
              <ul>
                <li>Each guess must be a real movie title.</li>
                <li>
                  Tiles will change color to show how close the guess is to the
                  correct movie.
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
                <span style={{ backgroundColor: "gray", color: "white", padding: "6px 10px", borderRadius: "4px" }}>
                  ⬛ Not in the target movie
                </span>
              </div>

              <p className="mt-3">🎬 Good luck and have fun!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/*export default function TutorialView() {
    return (
      <div style={{ padding: "30px", maxWidth: "600px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "1.8rem", fontWeight: "bold" }}>How To Play</h2>
        <p>Guess the movie in 5 tries.</p>
        <ul>
          <li>Each guess must be a real movie title.</li>
          <li>After each guess, tiles will change color to show similarity with the correct movie.</li>
        </ul>
  
        <h3 style={{ marginTop: "20px" }}>Examples</h3>
  
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <div style={{ backgroundColor: "green", color: "white", padding: "10px" }}>Past Lives</div>
          <span>✅ Correct name</span>
        </div>
  
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <div style={{ backgroundColor: "yellow", color: "black", padding: "10px" }}>2008</div>
          <span>🟡 Correct year, but not correct movie</span>
        </div>
  
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <div style={{ backgroundColor: "gray", color: "white", padding: "10px" }}>Anatomie d'une chute</div>
          <span>⬛ Not in the target movie</span>
        </div>
  
        <p style={{ marginTop: "30px" }}>Good luck and have fun!</p>
      </div>
    );
  }//*/