import React from 'react'

function MovieCard(props) {

    console.log(props)
    return (
        <div className="deck-card">
            <img src={`https://img.omdbapi.com/?i=${props.id}&h=600&apikey=6a23e601`} alt='' />
            <h4>Title: {props.title}</h4>

            <p>Rating: {props.rating}</p>
        </div>
    )

}

export default MovieCard