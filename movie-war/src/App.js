import React from 'react';
import DeckContainer from './containers/DeckContainer'
import GameContainer from './containers/GameContainer'
import DeckBuilderContainer from './containers/DeckBuilderContainer'
import WelcomeContainer from './containers/WelcomeContainer'

import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom'

import './App.css';

class App extends React.Component {
  state = {
    showRating: false,
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
    this.setState({playerCard:{} })
    // if(this.state.playerDeck === []) {
    fetch('http://localhost:3000/api/v1/cards/random/10')
    .then(resp => resp.json())
    .then(data => this.setState({playerDeck: data}, () => console.log("Player Deck:", this.state.playerDeck)))
    // .then(data => this.setState({playerDeck: data.slice(0,10), AIDeck: data.slice(12,22), AICard: data[Math.floor(Math.random()*data.length)]}, () =>     console.log("Player Deck:", this.state.playerDeck.length, "AIDeck:", this.state.AIDeck.length)
    // }
    fetch('http://localhost:3000/api/v1/cards/random/10')
    .then(resp => resp.json())
    .then(data => this.setState({AIDeck: data}, () => this.newRound()))
  }



  newRound = () => {
    console.log('starting new round')
    console.log("AI deck:", this.state.AIDeck)
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
      window.location.href = "/"
      // this.newGame()
    }
    else if (this.state.AIDeck.length === 0) {
      // this.newGame()
      window.location.href = "/"
      alert('House loses, starting new game')

    }
    else {
      this.newRound()
    }
  }

  commitHandler = (playerCard = this.state.playerCard, AICard = this.state.AICard) => {
    this.setState({showRating: true})
    //if comparator is set to higher, victory condition is to possess higher rating
    if (this.state.comparatorHigher === true) {
      if (playerCard.rating > AICard.rating) {
        let newArray = this.state.AIDeck.filter(movie => movie !== AICard)
        this.setState({AIDeck: newArray}, () => this.checkWinCondition())
        alert(`You're right! With a rating of ${this.state.AICard.rating} ${this.state.playerCard.title} is a better movie than ${this.state.AICard.title}. House has ${this.state.AIDeck.length} cards left`)
      }
      else if (playerCard.rating < AICard.rating) {
        let newArray = this.state.playerDeck.filter(movie => movie.tconst !== playerCard.tconst)
        this.setState({playerDeck: newArray}, () => this.checkWinCondition())
        alert(`Sorry! While you might think ${this.state.playerCard.title} is a great movie, but given ${this.state.AICard.title}'s rating of ${this.state.AICard.rating}, IMDb disagress with you. House has ${this.state.AIDeck.length} cards left`)
      }
      else {
        alert('tie!')
        this.checkWinCondition()
      }
    }
    //if comparator is set to lower, victory condition is to possess lower rating
    else if (this.state.comparatorHigher === false) {
      if (playerCard.rating < AICard.rating) {
        let newArray = this.state.AIDeck.filter(movie => movie.tconst !== AICard.tconst)
        this.setState({AIDeck: newArray}, () => this.checkWinCondition())
        alert(`You're right! With a ${this.state.AICard.title}'s rating of ${this.state.AICard.rating}, ${this.state.playerCard.title} is definitely a worse movie. House has ${this.state.AIDeck.length} cards left`)
      }
      else if (playerCard.rating > AICard.rating) {
        let newArray = this.state.playerDeck.filter(movie => movie.tconst !== playerCard.tconst)
        this.setState({playerDeck: newArray}, () => this.checkWinCondition())
        alert(`Sorry, but with a rating of With a rating of ${this.state.AICard.rating}, it looks like everyone else thinks ${this.state.AICard.title} is a better movie than ${this.state.playerCard.title}. House has ${this.state.AIDeck.length} cards left`)
    
      }
      else {
        alert('tie!')
        this.checkWinCondition()
      }
    }
  }

  slamHandler = (movie) => {
    this.setState({ playerCard: movie })
  }

  newDeckHandler = (array) => {
    if(array.length === 10) {
      this.setState({playerDeck: array}, console.log("player deck set to:", array))
      // return <Redirect to='/' />
    }
    else {
      alert("not enough movies yet!")
    }
  }

  render() {
    return (
      <Router>
        <Route exact path="/" render={() => {
          return (
            <div className="app">
              <div>
                <WelcomeContainer />
              </div>

            </div>)
        }} />
        <Route exact path="/game" render={() => {
          return (
            <div className="app">
              <div>
                <GameContainer
                  clickHandler={this.commitHandler}
                  cards={this.state}
                  comparatorHigher={this.state.comparatorHigher}
                  showRating ={this.state.showRating}
                />
              </div>
              <div>
                <DeckContainer
                  clickHandler={this.slamHandler}
                  deck={this.state.playerDeck}
                  showRating = {this.state.showRating}
                  header="Your deck"
                />
              </div>

            </div>)
        }} />
        <Route exact path="/deckbuilder" render={() => {
          return (
            <div className="app">
              <div>
                <DeckBuilderContainer
                  newDeckHandler = {this.newDeckHandler}
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
