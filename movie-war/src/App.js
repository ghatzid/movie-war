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
          {/* <div>
            <GameContainer />
          </div> */}
          <div>
            <GameContainer
              cards={this.state}
            />          
            <DeckContainer
              // cardsInPlay={this.state.cardsInPlay}
            />
           
          </div>
      </div>
    );
  }
}

export default App;
