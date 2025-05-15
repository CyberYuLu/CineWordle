import React from "react";
import { TutorialContent } from "./TutorialContent"; // Ensure this component is properly defined
import "/src/styles/intro.css";
import "/src/styles/general.css";



export function IntroductionView({ onSolo, onDaily, user }) {
  return (
    <div className="intro-container">
      <section className="intro-hero">
        <h1 className="intro-title">🎬 Welcome to Movie Wordle</h1>
        <p className="intro-subtitle">
          Test your film knowledge by guessing the movie of the day using hints and clues. Compete with friends, climb the leaderboard, and become the ultimate cinephile!
        </p>

        <div className="intro-grid">
          <div className="intro-features">
            <h2>✨ Features</h2>
            <ul>
              <li>📅 Daily movie puzzles to solve</li>
              <li>💡 Contextual hints to help you guess</li>
              <li>🏆 Leaderboard to track your ranking</li>
              <li>🎯 Limited attempts for added challenge</li>
            </ul>
          </div>
          <div className="intro-action">
            
              <button
            onClick={onDaily}
            disabled={!user}
            title={!user ? "Log in to play today’s challenge" : undefined}
            style={{ width: 200, height: 80, fontSize: 20, marginLeft: 20 }}
          >
            Daily Challenge
          </button>
          </div>
        </div>

        <section className="tutorial-section">
          <h2>🎥 How to Play</h2>
          <TutorialContent />
        </section>
      </section>
    </div>
  );
}
