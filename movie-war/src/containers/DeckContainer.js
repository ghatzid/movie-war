import React from 'react'
import MovieCard from '../components/MovieCard';

class DeckContainer extends React.Component {
    state = {
        inDeck: []
    }

    render() {
        let deckComponents = this.props.deck.map(movie =>
            <MovieCard
                key={movie.tconst}
                clickHandler={this.props.clickHandler}
                tconst={movie.tconst}
                title={movie.title}
                rating={movie.rating}
            />
        )
        return (
            <div>
                <h1>{this.props.header}</h1>
                <div className="deck-container">
                    {deckComponents}
                </div>
            </div>
        )
    }



}

export default DeckContainer