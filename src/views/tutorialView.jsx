import React from "react";
import { TutorialContent } from "./TutorialContent"; // adjust the import path as needed

export default function TutorialView() {
  return (
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
            <h5 className="modal-title" id="howToPlayLabel">How To Play</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <TutorialContent />
          </div>
        </div>
      </div>
    </div>
  );
}
