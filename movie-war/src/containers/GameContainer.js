import React from 'react'
import PlayerCard from '../components/PlayerCard';
import HouseCard from '../components/HouseCard';

function GameContainer(props) {
    // console.log('Game Container Props:', props)
    let comparator; 
    if(props.comparatorHigher === true) {
        comparator = "You want to be higher than the house"
    }
    else {
        comparator = "You want to be lower than the house"
    }
    return (
        <div>
            <h1>Your match</h1>
            <div className="game-container">
                <div className="house-card">
                    <h3>House's Card</h3>
                    <HouseCard
                        tconst={props.cards.AICard.tconst}
                        title={props.cards.AICard.title}
                    />
                </div>
                <div className="comparator">
                    <h1></h1>
                    <button onClick={() => props.clickHandler()}>Commit</button>
                </div>
                <div className="player-card">
                    <h3>Player's Card</h3>
                    <PlayerCard
                        tconst={props.cards.playerCard.tconst}
                        title={props.cards.playerCard.title}
                        rating={props.cards.playerCard.rating}
                    />
                </div>
            </div>
        </div>
    )
}

export default GameContainer