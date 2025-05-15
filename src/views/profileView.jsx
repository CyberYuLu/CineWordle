import React from "react";
import "../styles/auth.css"; 

export function ProfileView({ user }) {
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
                        <input type="text" readonly className="form-control-plaintext" id="staticEmail" value={user.email}/>
                </div>
                </div>
                <div className="mb-3 row">
                    <label for="staticuserID" class= "col-sm-label">userID</label>
                    <div className="col-sm-10">
                        <input type="text" readonly className="form-control-plaintext" id="staticuserID" value={user.uid}/>
                </div>
                </div>


                {/* More info here... */}
            </div>
        </div>
    );
}
