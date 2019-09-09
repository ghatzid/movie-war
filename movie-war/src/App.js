import React from 'react';
import DeckContainer from './containers/DeckContainer'
import GameContainer from './containers/GameContainer'
import DeckBuilderContainer from './containers/DeckBuilderContainer'

import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

import './App.css';

class App extends React.Component {
  state = {
    round: 1,
    comparatorHigher: true,
    playerDeck: [],
    AIDeck: [],
    playerCard: {
    },
    AICard: {
    }
  }

  componentDidMount() {
    this.newGame()
  }

  newGame = () => {
    console.log('starting new game')
    this.setState({ playerCard: {} })
    fetch('http://localhost:3000/api/v1/cards')
      .then(resp => resp.json())
      .then(data => this.setState({ playerDeck: data.slice(1, 10), AIDeck: data.slice(11, 20), AICard: data[Math.floor(Math.random() * data.length)] }))
  }

  newRound = () => {
    console.log('starting new round')
    this.setState({
      comparatorHigher: !this.state.comparatorHigher,
      playerCard: {},
      AICard: this.state.AIDeck[Math.floor(Math.random() * this.state.AIDeck.length)]
    })
  }

  checkWinCondition = () => {
    // console.log('checking win condition')
    // console.log("house deck cards:", this.state.AIDeck.length)
    console.log("Player Deck:", this.state.playerDeck.length, "AIDeck:", this.state.AIDeck.length)
    if (this.state.playerDeck.length === 0) {
      alert('Player loses, starting new game')
      this.newGame()
    }
    else if (this.state.AIDeck.length === 0) {
      this.newGame()
      alert('House loses, starting new game')

    }
    else {
      this.newRound()
    }
  }

  commitHandler = (playerCard = this.state.playerCard, AICard = this.state.AICard) => {
    //if comparator is set to higher, victory condition is to possess higher rating
    if (this.state.comparatorHigher === true) {
      if (playerCard.rating > AICard.rating) {
        let newArray = this.state.AIDeck.filter(movie => movie !== AICard)
        this.setState({ AIDeck: newArray }, () => this.checkWinCondition())
        console.log('player wins')
      }
      else if (playerCard.rating < AICard.rating) {
        let newArray = this.state.playerDeck.filter(movie => movie.tconst !== playerCard.tconst)
        this.setState({ playerDeck: newArray }, () => this.checkWinCondition())
        console.log('player loses')
      }
      else {
        console.log('tie!')
        this.checkWinCondition()
      }
    }
    //if comparator is set to lower, victory condition is to possess lower rating
    else if (this.state.comparatorHigher === false) {
      if (playerCard.rating < AICard.rating) {
        let newArray = this.state.AIDeck.filter(movie => movie.tconst !== AICard.tconst)
        this.setState({ AIDeck: newArray }, () => this.checkWinCondition())
        console.log('player wins')
      }
      else if (playerCard.rating > AICard.rating) {
        let newArray = this.state.playerDeck.filter(movie => movie.tconst !== playerCard.tconst)
        this.setState({ playerDeck: newArray }, () => this.checkWinCondition())
        console.log('player loses')

      }
      else {
        console.log('tie!')
        this.checkWinCondition()
      }
    }
  }

  slamHandler = (movie) => {
    this.setState({ playerCard: movie })
  }

  render() {
    return (
      <Router>
        <Route exact path="/" render={() => {
          return (
            <div className="app">
              <div>
                <GameContainer
                  clickHandler={this.commitHandler}
                  cards={this.state}
                  comparatorHigher={this.state.comparatorHigher}
                />
              </div>
              <div>
                <DeckContainer
                  clickHandler={this.slamHandler}
                  deck={this.state.playerDeck}
                />
              </div>

            </div>)
        }} />
        <Route exact path="/deckbuilder" render={() => {
          return (
            <div className="app">
              <div>
                <DeckBuilderContainer
                />
              </div>
              <div>
                <DeckContainer
                  clickHandler={this.slamHandler}
                  deck={[]}
                />
              </div>
            </div>
          )
        }} />
      </Router>
    );
  }
}

export default App;
