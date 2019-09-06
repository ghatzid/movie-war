import React from 'react'
import MovieCard from '../components/MovieCard';

class DeckContainer extends React.Component {
    state = {
        inDeck: [{ id: 'tt0033870', title: 'Casablanca', rating: 7 }, { id: "tt0120201", title: 'Starship Troopers', rating: 11 }]
    }

    render() {
        let deckComponents = this.state.inDeck.map(movie =>
            <MovieCard
                id={movie.id}
                title={movie.title}
                rating={movie.rating}
            />
        )
        return (
            <div className="deck-container">{deckComponents}</div>
        )
    }



}

export default DeckContainer