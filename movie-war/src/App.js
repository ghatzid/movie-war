import React from 'react';
import DeckContainer from './containers/DeckContainer'
import GameContainer from './containers/GameContainer'
import './App.css';

class App extends React.Component {
  state={
      playerCard: {
        id: 'tt0047478',
        title: 'Seven Samurai',
        rating: 10
      },
      AICard: {
        id: 'tt0032138',
        title: 'The Wizard of Oz', 
        rating: 8
      }
    }

  render(){
    return (
      <div className="app">
          <div id="game-container" name="game-container" className="game-container">
            <GameContainer
              cards={this.state}
            />
            </div>        
            <div id="deck-container" name="deck-container" className="deck-container">  
            <DeckContainer
            />
          </div>
      </div>
    );
  }
}

export default App;
