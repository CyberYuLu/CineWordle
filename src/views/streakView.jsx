import React from "react";


export default function StreakView(props) {
  return (
    <div
      className="modal fade"
      id="streakModal"
      tabIndex="-1"
      aria-labelledby="streakLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="streakLabel">Streak</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="streak-content">
              <h5>Current Streak: {props.model.streak}</h5>
              <p>Keep playing to increase your streak!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
