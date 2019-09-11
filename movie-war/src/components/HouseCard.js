import React from 'react'

function HouseCard(props) {

    let emptyPoster = () => {
        return(<h3>Poster Not Found</h3>)
    }

    // console.log(props)
    return (
        <div>
            <img height="300" src={`https://img.omdbapi.com/?i=${props.tconst}&h=600&apikey=6a23e601`} alt='' onerror='emptyPoster()'/>
            <h4>{props.title}</h4>
            {props.showRating ? <h2>{props.rating}</h2> : null}
        </div>
    )

}

export default HouseCard