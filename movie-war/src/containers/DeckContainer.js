import React from 'react'
import MovieCard from '../components/MovieCard';

class DeckContainer extends React.Component {
    state = {
        inDeck: [{ id: 'tt0033870', title: 'The Maltese Falcon', rating: 7 }, { id: "tt0120201", title: 'Starship Troopers', rating: 11 }, { id: "tt0120207", title: 'Steel', rating: 2 }, { id: "tt0120202", title: 'State and Main', rating: 4 }, { id: "tt0120200", title: 'Star Quest II', rating: 7.5 }]
    }

    render() {
        let deckComponents = this.props.deck.map(movie =>
            <MovieCard
                key={movie.tconst}
                clickHandler = {this.props.clickHandler}
                tconst={movie.tconst}
                title={movie.title}
                rating={movie.rating}
            />
        )
        return (
            <div>
                <h1>Your deck</h1>
                <div className="deck-container">
                    {deckComponents}
                </div>
            </div>
        )
    }



}

export default DeckContainer