import React from 'react'

function PlayerCard(props) {

    let emptyPoster = () => {
        return(<h3>Poster Not Found</h3>)
    }


    console.log(props)
    return (
        <div className="player-card">
            <img height="300" src={`https://img.omdbapi.com/?i=${props.tconst}&h=600&apikey=6a23e601`} alt='' onerror='emptyPoster()' />
            <h4>{props.title}</h4>
            <p>Rating: {props.rating}</p>
        </div>
    )

}

export default PlayerCard