import React from 'react'
import { Link } from "react-router-dom"


function WelcomeContainer() {

    return (
        <div>
            <h1>THIS IS MOVIE WAR</h1>
            <div className="welcome-container">
                <div><h2></h2></div>
                <Link to={"/game"}><h3>Play with a random deck</h3></Link>
                <Link to={"/deckbuilder"}><h3>Generate your own deck</h3></Link>
            </div>
        </div>
    )
}

export default WelcomeContainer