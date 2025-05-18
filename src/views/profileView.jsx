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
        <div className="auth-container">
            <div className="auth-form">
                <h2>Profile</h2>
                <div className="mb-3 row">
                    <label for="staticEmail" class= "col-sm-label">Email</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={user.email}/>
                </div>
                </div>

                <div className="mb-3 row">
                    <label for="staticuserID" class= "col-sm-label">userID</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" id="staticuserID" value={user.uid}/>
                </div>
                </div>

                <div className="mb-3 row">
                    <label for="staticTotalGuesses" class= "col-sm-label">Total Guesses</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" id="staticTotalGuesses" value={totalGuesses ?? 0}/>
                </div>
                </div>
            {/*
               <div className="mb-3 row">
                //    <label for="staticAverageGuesses" class= "col-sm-label">Average Guesses</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" id="staticAverageGuesses" value={averageGuesses ?? 0}/>
                </div>
                </div>
                */}
                
                <div className="mb-3 row">
                    <label for="staticTotalWins" class= "col-sm-label">Total Wins</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" id="staticTotalWins" value={totalWins ?? 0}/>
                </div>
                </div>

                <div className="mb-3 row">
                    <label for="staticTotalLosses" class= "col-sm-label">Total Losses</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" id="staticTotalLosses" value={totalLosses ?? 0}/>
                </div>
                </div>
                
                <div className="mb-3 row">
                    <label for="staticWinRate" class= "col-sm-label">Win Rate</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" id="staticWinRate" value={winRate}/>
                </div>
                </div>

                <div className="mb-3 row">
                    <label for="staticGuessesPerWin" class= "col-sm-label">Guesses Per Win</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" id="staticGuessesPerWin" value={guessesPerWin}/>
                </div>
                </div>
                {/* More info here... */}
            </div>
        </div>
    );
}
