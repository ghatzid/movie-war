import React from 'react'

function MovieCard(props) {

    // console.log(props)
    return (
        <div onClick={() => props.clickHandler(props)} className="movie-card">
            <img src={`https://img.omdbapi.com/?i=${props.tconst}&h=600&apikey=6a23e601`} alt='' />
            <h4>{props.title}</h4>

            <p>Rating: {props.rating}</p>
        </div>
    )

}

export default MovieCard