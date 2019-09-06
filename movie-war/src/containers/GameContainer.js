import React from 'react'
import MovieCard from '../components/MovieCard';
import HouseCard from '../components/HouseCard';

function GameContainer(props) {
        console.log('Game Container Props:', props)
        return(
            <div>
            <h3>Player's Card</h3>
            <MovieCard
                id={props.cards.playerCard.id}
                title={props.cards.playerCard.title}
                rating={props.cards.playerCard.rating}
            />  
            <h3>House's Card</h3>     
            <HouseCard
                id={props.cards.AICard.id}
                title={props.cards.AICard.title}
            /> 
            </div>
        )
}

export default GameContainer