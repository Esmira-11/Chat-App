import React, { useState, useEffect } from "react";
import './welcome.css'

function Welcome() {

    const [userName, setUserName] = useState("");
    useEffect(async () => {
      setUserName(
        await JSON.parse(
          localStorage.getItem("chat-app-current-user")
        ).username
      );
    }, []);

  return (
    <div className="welcome-container">
        <h1>
            Welcome, <span>{userName}!</span>
        </h1>
        <h3>Please select a chat to Start messaging.</h3>
    </div>
  )
}

export default Welcome