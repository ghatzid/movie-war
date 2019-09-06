import React from 'react';
import DeckContainer from './containers/DeckContainer'
import GameContainer from './containers/GameContainer'
import './App.css';

class App extends React.Component {
  state = {
    deck: [],
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

  componentDidMount(){
    fetch('http://localhost:3000/api/v1/cards')
    .then(resp => resp.json())
    .then(data => this.setState({deck: data}))
  }

  render() {
    console.log("deck:", this.state.deck)
    return (
      <div className="app">
        {/* <div id="header-contaner" name="header-container">
          <HeaderContainer />
        </div> */}
        <div>
          <GameContainer
            cards={this.state}
          />
        </div>
        <div>
          <DeckContainer
            deck={this.state.deck}
          />
        </div>
      </div>
    );
  }
}

export default App;
